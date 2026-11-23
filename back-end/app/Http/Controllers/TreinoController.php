<?php

namespace App\Http\Controllers;

use App\Enums\NivelTreino;
use App\Filters\TreinoFilter;
use App\Http\Requests\TreinoRequest;
use App\Http\Resources\SessaoTreinoResource;
use App\Http\Resources\TreinoResource;
use App\Models\SessaoTreino;
use App\Models\Treino;
use App\Services\ImagemService;
use App\Services\CalcularNivelPorPontuacao;
use App\Services\CalcularTreinoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TreinoController extends Controller
{
    private const RELACOES = ['criador', 'exercicios.exercicio', 'nivel', 'foco', 'tipo'];

    public function store(
        TreinoRequest $request,
        calcularTreinoService $calculadora,
        calcularNivelPorPontuacao $calculadoraDeNivel,
        ImagemService $imagens
    ) {
        $dados = $request->validated();

        $dadosCalculados = $calculadora->calcularTempoECalorias($dados['exercicios'], $request->user());
        $nivelTreino = $calculadoraDeNivel->calcularNivelPorPontuacao($dados['exercicios']);

        // o arquivo é salvo antes da transação; se ela falhar, ele é apagado
        $caminhoImagem = $request->hasFile('imagem')
            ? $imagens->salvar($request->file('imagem'), 'treinos')
            : null;

        try {
            $treino = DB::transaction(function () use ($dados, $dadosCalculados, $nivelTreino, $request, $caminhoImagem) {

                $treino = Treino::create([
                    'user_id'         => $request->user()->id,
                    'nome'            => $dados['nome'],
                    'descricao'       => $dados['descricao'] ?? null,
                    'foco_id'         => $dados['foco_id'],
                    'tipo_id'         => $dados['tipo_id'],
                    'nivel_id'        => NivelTreino::from($nivelTreino)->id(),
                    'tempo_medio'     => $dadosCalculados['tempoEstimado'],
                    'calorias_medias' => $dadosCalculados['caloriasEstimadas'],
                    'imagem'          => $caminhoImagem,
                ]);

                $treino->exercicios()->createMany($this->montarExercicios($dados['exercicios']));

                return $treino;
            });
        } catch (\Throwable $e) {
            $imagens->remover($caminhoImagem);
            throw $e;
        }

        return new TreinoResource($treino->load(self::RELACOES));
    }

    public function show(Treino $treino)
    {
        return new TreinoResource($treino->load(self::RELACOES));
    }

    public function fetch(Request $request)
    {
        $treinos = TreinoFilter::apply(
            Treino::query()->with(self::RELACOES),
            $request
        )
            ->latest()
            ->paginate(10);

        return TreinoResource::collection($treinos);
    }

    public function historico(Request $request, Treino $treino)
    {
        $sessoes = SessaoTreino::where('treino_id', $treino->id)
            ->where('user_id', $request->user()->id)
            ->whereNotNull('finalizado_em') // só sessões concluídas
            ->with(['series.exercicioTreino.exercicio'])
            ->orderByDesc('iniciado_em')
            ->paginate(10);

        return SessaoTreinoResource::collection($sessoes);
    }

    public function update(
        TreinoRequest $request,
        Treino $treino,
        calcularTreinoService $calculadora,
        calcularNivelPorPontuacao $calculadoraDeNivel,
        ImagemService $imagens
    ) {
        $this->autorizarCriador($request, $treino);

        $dados = $request->validated();

        // recalcula tempo, calorias e nível com base nos novos exercícios
        $dadosCalculados = $calculadora->calcularTempoECalorias($dados['exercicios'], $request->user());
        $nivelTreino = $calculadoraDeNivel->calcularNivelPorPontuacao($dados['exercicios']);

        $imagemAntiga = $treino->imagem;

        $novaImagem = $request->hasFile('imagem')
            ? $imagens->salvar($request->file('imagem'), 'treinos')
            : null;

        $apagarImagem = !$novaImagem && $request->boolean('remover_imagem');

        $campos = [
            'nome'            => $dados['nome'],
            'descricao'       => $dados['descricao'] ?? null,
            'foco_id'         => $dados['foco_id'],
            'tipo_id'         => $dados['tipo_id'],
            'nivel_id'        => NivelTreino::from($nivelTreino)->id(),
            'tempo_medio'     => $dadosCalculados['tempoEstimado'],
            'calorias_medias' => $dadosCalculados['caloriasEstimadas'],
        ];

        // sem arquivo novo e sem pedido de remoção, a imagem atual não é tocada
        if ($novaImagem) $campos['imagem'] = $novaImagem;
        elseif ($apagarImagem) $campos['imagem'] = null;

        try {
            DB::transaction(function () use ($dados, $treino, $campos) {
                $treino->update($campos);

                $treino->exercicios()->delete();
                $treino->exercicios()->createMany($this->montarExercicios($dados['exercicios']));
            });
        } catch (\Throwable $e) {
            $imagens->remover($novaImagem);   // desfaz o upload novo
            throw $e;
        }

        // só apaga o arquivo antigo depois que o banco foi salvo com sucesso
        if ($novaImagem || $apagarImagem) {
            $imagens->remover($imagemAntiga);
        }

        return new TreinoResource($treino->load(self::RELACOES));
    }

    public function delete(Request $request, Treino $treino, ImagemService $imagens)
    {
        $this->autorizarCriador($request, $treino);

        $caminho = $treino->imagem;

        DB::transaction(function () use ($treino) {
            $treino->exercicios()->delete();
            $treino->sessoes()->delete();
            $treino->delete();
        });

        $imagens->remover($caminho);

        return response()->json([
            'message' => 'Treino deletado com sucesso.'
        ]);
    }

    public function meusCriados(Request $request)
    {
        $treinos = $request->user()
            ->treinosCriados()
            ->with(['foco', 'nivel', 'tipo'])
            ->latest()
            ->paginate(10);

        return TreinoResource::collection($treinos);
    }

    public function meusAdicionados(Request $request)
    {
        $treinos = $request->user()
            ->treinosAdicionados()
            ->with(['foco', 'nivel', 'tipo'])
            ->latest()
            ->paginate(10);

        return TreinoResource::collection($treinos);
    }

    /**
     * Mesma estrutura no store e no update (antes o store não gravava
     * tipo_execucao nem duracao_segundos). Campos opcionais usam ?? null
     * porque o multipart não envia valores nulos.
     */
    private function montarExercicios(array $exercicios): array
    {
        return array_map(fn ($e) => [
            'exercicio_id'       => $e['exercicio_id'],
            'ordem'              => $e['ordem'],
            'tipo_execucao'      => $e['tipo_execucao'] ?? null,
            'sets'               => $e['sets'],
            'repeticoes_minimas' => $e['repeticoes_minimas'] ?? null,
            'repeticoes_maximas' => $e['repeticoes_maximas'] ?? null,
            'duracao_segundos'   => $e['duracao_segundos'] ?? null,
            'peso'               => $e['peso'] ?? null,
            'descanso'           => $e['descanso'] ?? null,
        ], $exercicios);
    }

    private function autorizarCriador(Request $request, Treino $treino): void
    {
        abort_if(
            $treino->user_id !== $request->user()->id,
            403,
            'Você não pode alterar este treino.'
        );
    }
}