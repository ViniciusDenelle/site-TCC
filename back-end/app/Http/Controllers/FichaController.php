<?php

namespace App\Http\Controllers;

use App\Filters\FichaFilter;
use App\Http\Requests\CreateFichaRequest;
use App\Http\Resources\FichaResource;
use App\Models\FichaTreino;
use App\Models\Treino;
use App\Services\ImagemService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FichaController extends Controller
{
    private const RELACOES = ['criador', 'dias.treino', 'divisoes.treinos'];

    private const DIAS_SEMANA = [
        'domingo' => 0,
        'segunda' => 1,
        'terca' => 2,
        'quarta' => 3,
        'quinta' => 4,
        'sexta' => 5,
        'sabado' => 6,
    ];

    public function create(CreateFichaRequest $request, ImagemService $imagens)
    {
        $dados = $request->validated();

        // o arquivo é salvo antes da transação; se ela falhar, ele é apagado
        $caminhoImagem = $request->hasFile('imagem')
            ? $imagens->salvar($request->file('imagem'), 'fichas')
            : null;

        try {
            $ficha = DB::transaction(function () use ($dados, $request, $caminhoImagem) {
                $ficha = FichaTreino::create([
                    'user_id'   => $request->user()->id,
                    'nome'      => $dados['nome'],
                    'descricao' => $dados['descricao'] ?? null,
                    'imagem'    => $caminhoImagem,
                ]);

                $this->salvarDivisoesEDias($ficha, $dados);

                return $ficha;
            });
        } catch (\Throwable $e) {
            $imagens->remover($caminhoImagem);
            throw $e;
        }

        return new FichaResource($ficha->load(self::RELACOES));
    }

    public function show(FichaTreino $ficha)
    {
        return new FichaResource($ficha->load(self::RELACOES));
    }

    public function fetch(Request $request)
    {
        $fichas = FichaFilter::apply(
            FichaTreino::query()
                ->where('user_id', $request->user()->id)
                ->with(self::RELACOES),
            $request
        )
            ->latest()
            ->paginate(5);

        return FichaResource::collection($fichas);
    }

    public function update(CreateFichaRequest $request, FichaTreino $ficha, ImagemService $imagens)
    {
        $this->autorizarCriador($request, $ficha);

        $dados = $request->validated();

        $imagemAntiga = $ficha->imagem;

        $novaImagem = $request->hasFile('imagem')
            ? $imagens->salvar($request->file('imagem'), 'fichas')
            : null;

        $apagarImagem = !$novaImagem && $request->boolean('remover_imagem');

        $campos = [
            'nome'      => $dados['nome'],
            'descricao' => $dados['descricao'] ?? null,
        ];

        // sem arquivo novo e sem pedido de remoção, a imagem atual não é tocada
        if ($novaImagem) $campos['imagem'] = $novaImagem;
        elseif ($apagarImagem) $campos['imagem'] = null;

        try {
            DB::transaction(function () use ($dados, $ficha, $campos) {
                $ficha->update($campos);

                // desvincula treinos das divisões antigas antes de apagar as divisões
                Treino::whereIn('divisao_ficha_id', $ficha->divisoes()->pluck('id'))
                    ->update(['divisao_ficha_id' => null]);

                $ficha->divisoes()->delete();
                $ficha->dias()->delete();

                $this->salvarDivisoesEDias($ficha, $dados);
            });
        } catch (\Throwable $e) {
            $imagens->remover($novaImagem);   // desfaz o upload novo
            throw $e;
        }

        // só apaga o arquivo antigo depois que o banco foi salvo com sucesso
        if ($novaImagem || $apagarImagem) {
            $imagens->remover($imagemAntiga);
        }

        return new FichaResource($ficha->load(self::RELACOES));
    }

    public function delete(Request $request, FichaTreino $ficha, ImagemService $imagens)
    {
        $this->autorizarCriador($request, $ficha);

        $caminho = $ficha->imagem;

        DB::transaction(function () use ($ficha) {
            Treino::whereIn('divisao_ficha_id', $ficha->divisoes()->pluck('id'))
                ->update(['divisao_ficha_id' => null]);

            $ficha->dias()->delete();
            $ficha->divisoes()->delete();
            $ficha->delete();
        });

        $imagens->remover($caminho);

        return response()->json(['mensagem' => 'ficha deletada com sucesso']);
    }

    public function meusCriados(Request $request)
    {
        $fichas = $request->user()
            ->fichasCriadas()
            ->with(self::RELACOES)
            ->latest()
            ->paginate(10);

        return FichaResource::collection($fichas);
    }

    public function meusAdicionados(Request $request)
    {
        $fichas = $request->user()
            ->fichasAdicionadas()
            ->with(self::RELACOES)
            ->latest()
            ->paginate(10);

        return FichaResource::collection($fichas);
    }

    /**
     * Mesma lógica no create e no update.
     * ?? [] porque o multipart não envia arrays vazios.
     */
    private function salvarDivisoesEDias(FichaTreino $ficha, array $dados): void
    {
        foreach ($dados['divisoes'] ?? [] as $ordem => $divisaoDados) {
            $divisao = $ficha->divisoes()->create([
                'divisao' => $divisaoDados['nome'],
                'ordem'   => $ordem,
            ]);

            Treino::whereIn('id', $divisaoDados['treino_ids'] ?? [])
                ->update(['divisao_ficha_id' => $divisao->id]);
        }

        foreach ($dados['dias'] ?? [] as $diaSemana => $treinoId) {
            $ficha->dias()->create([
                'dia_semana' => self::DIAS_SEMANA[$diaSemana],
                'treino_id'  => $treinoId,
            ]);
        }
    }

    private function autorizarCriador(Request $request, FichaTreino $ficha): void
    {
        abort_if(
            $ficha->user_id !== $request->user()->id,
            403,
            'Você não pode alterar esta ficha.'
        );
    }
}