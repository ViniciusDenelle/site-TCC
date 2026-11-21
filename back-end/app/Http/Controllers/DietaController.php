<?php

namespace App\Http\Controllers;

use App\Filters\DietaFilter;
use App\Http\Requests\DietaRequest;
use App\Http\Resources\BadgeResource;
use App\Http\Resources\DietaResource;
use App\Models\Dieta;
use App\Models\NivelDieta;
use App\Models\ObjetivoDieta;
use App\Services\ImagemService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DietaController extends Controller
{
    private const RELACOES = ['objetivo', 'nivel', 'refeicoes.alimentos'];

    public function fetch(Request $request)
    {
        $query = DietaFilter::apply(
            Dieta::query()->with(self::RELACOES),
            $request
        )->latest();

        if ($request->filled('calorias_meta') && $request->filled('tolerancia_kcal')) {
            $meta = (float) $request->calorias_meta;
            $tolerancia = (float) $request->tolerancia_kcal;

            $todasDietas = $query->get();

            $filtradas = $todasDietas->filter(function ($dieta) use ($meta, $tolerancia) {
                $media = $this->calcularMediaCaloriasDia($dieta);
                return abs($media - $meta) <= $tolerancia;
            });

            $pagina = (int) $request->get('page', 1);
            $porPagina = 10;
            $paginadas = $filtradas->slice(($pagina - 1) * $porPagina, $porPagina)->values();

            return DietaResource::collection($paginadas)
                ->additional([
                    'meta' => [
                        'current_page' => $pagina,
                        'total' => $filtradas->count(),
                        'last_page' => (int) ceil($filtradas->count() / $porPagina),
                    ]
                ]);
        }

        $dietas = $query->paginate(10);
        return DietaResource::collection($dietas);
    }

    private function calcularMediaCaloriasDia(Dieta $dieta): float
    {
        $caloriasPorDia = [];

        foreach ($dieta->refeicoes as $refeicao) {
            $caloriasPorDia[$refeicao->dia_semana] ??= 0;

            foreach ($refeicao->alimentos as $alimento) {
                $fator = $alimento->pivot->quantidade_gramas / $alimento->porcao_gramas;
                $caloriasPorDia[$refeicao->dia_semana] += $alimento->calorias * $fator;
            }
        }

        if (empty($caloriasPorDia)) {
            return 0;
        }

        return array_sum($caloriasPorDia) / count($caloriasPorDia);
    }

    public function store(DietaRequest $request, ImagemService $imagens)
    {
        $dados = $request->validated();

        // o arquivo é salvo antes da transação; se ela falhar, ele é apagado
        $caminhoImagem = $request->hasFile('imagem')
            ? $imagens->salvar($request->file('imagem'), 'dietas')
            : null;

        try {
            $dieta = DB::transaction(function () use ($dados, $request, $caminhoImagem) {
                $dieta = Dieta::create([
                    'user_id'     => $request->user()->id,
                    'objetivo_id' => $dados['objetivo_id'],
                    'nivel_id'    => $dados['nivel_id'],
                    'nome'        => $dados['nome'],
                    'descricao'   => $dados['descricao'] ?? null,
                    'imagem'      => $caminhoImagem,
                ]);

                $this->salvarRefeicoes($dieta, $dados);

                return $dieta;
            });
        } catch (\Throwable $e) {
            $imagens->remover($caminhoImagem);
            throw $e;
        }

        return new DietaResource($dieta->load(self::RELACOES));
    }

    public function update(DietaRequest $request, Dieta $dieta, ImagemService $imagens)
    {
        $this->autorizarCriador($request, $dieta);

        $dados = $request->validated();

        $imagemAntiga = $dieta->imagem;

        $novaImagem = $request->hasFile('imagem')
            ? $imagens->salvar($request->file('imagem'), 'dietas')
            : null;

        $apagarImagem = !$novaImagem && $request->boolean('remover_imagem');

        $campos = [
            'objetivo_id' => $dados['objetivo_id'],
            'nivel_id'    => $dados['nivel_id'],
            'nome'        => $dados['nome'],
            'descricao'   => $dados['descricao'] ?? null,
        ];

        // sem arquivo novo e sem pedido de remoção, a imagem atual não é tocada
        if ($novaImagem) $campos['imagem'] = $novaImagem;
        elseif ($apagarImagem) $campos['imagem'] = null;

        try {
            DB::transaction(function () use ($dieta, $dados, $campos) {
                $dieta->update($campos);

                // remove os alimentos de cada refeição (pivô) antes de apagar as refeições
                foreach ($dieta->refeicoes as $refeicao) {
                    $refeicao->alimentos()->detach();
                }
                $dieta->refeicoes()->delete();

                $this->salvarRefeicoes($dieta, $dados);
            });
        } catch (\Throwable $e) {
            $imagens->remover($novaImagem);   // desfaz o upload novo
            throw $e;
        }

        // só apaga o arquivo antigo depois que o banco foi salvo com sucesso
        if ($novaImagem || $apagarImagem) {
            $imagens->remover($imagemAntiga);
        }

        return new DietaResource($dieta->load(self::RELACOES));
    }

    public function delete(Request $request, Dieta $dieta, ImagemService $imagens)
    {
        $this->autorizarCriador($request, $dieta);

        $caminho = $dieta->imagem;

        DB::transaction(function () use ($dieta) {
            foreach ($dieta->refeicoes as $refeicao) {
                $refeicao->alimentos()->detach();
            }
            $dieta->refeicoes()->delete();
            $dieta->delete();
        });

        $imagens->remover($caminho);

        return response()->json(['mensagem' => 'Dieta deletada com sucesso']);
    }

    public function show(Dieta $dieta, Request $request)
    {
        // if ($dieta->user_id !== $request->user()->id) {
        //     abort(403, 'Você não tem permissão para ver esta dieta.');
        // }

        return new DietaResource($dieta->load(self::RELACOES));
    }

    public function adicionar(Request $request, Dieta $dieta)
    {
        $request->user()->dietasAdicionadas()->syncWithoutDetaching([$dieta->id]);

        return response()->json(['mensagem' => 'Dieta adicionada com sucesso']);
    }

    public function remover(Request $request, Dieta $dieta)
    {
        $request->user()->dietasAdicionadas()->detach($dieta->id);

        return response()->json(['mensagem' => 'Dieta removida dos seus itens']);
    }

    public function meusCriados(Request $request)
    {
        $dietas = $request->user()
            ->dietasCriadas()
            ->with(self::RELACOES)
            ->latest()
            ->paginate(10);

        return DietaResource::collection($dietas);
    }

    public function meusAdicionados(Request $request)
    {
        $dietas = $request->user()
            ->dietasAdicionadas()
            ->with(self::RELACOES)
            ->orderByDesc('dieta_usuario.created_at')
            ->paginate(10);

        return DietaResource::collection($dietas);
    }

    public function niveis()
    {
        return BadgeResource::collection(NivelDieta::limit(12)->get());
    }

    public function objetivos()
    {
        return BadgeResource::collection(ObjetivoDieta::limit(12)->get());
    }

    /**
     * Mesma lógica no store e no update.
     * ?? [] / ?? null porque o multipart não envia arrays vazios nem valores nulos.
     */
    private function salvarRefeicoes(Dieta $dieta, array $dados): void
    {
        foreach (($dados['refeicoes'] ?? []) as $ordem => $dadosRefeicao) {
            $refeicao = $dieta->refeicoes()->create([
                'nome'       => $dadosRefeicao['nome'],
                'dia_semana' => $dadosRefeicao['dia_semana'],
                'horario'    => $dadosRefeicao['horario'] ?? null,
                'ordem'      => $dadosRefeicao['ordem'] ?? $ordem,
            ]);

            foreach (($dadosRefeicao['alimentos'] ?? []) as $itemAlimento) {
                $refeicao->alimentos()->attach($itemAlimento['alimento_id'], [
                    'quantidade_gramas' => $itemAlimento['quantidade_gramas'],
                ]);
            }
        }
    }

    private function autorizarCriador(Request $request, Dieta $dieta): void
    {
        abort_if(
            $dieta->user_id !== $request->user()->id,
            403,
            'Você não pode alterar esta dieta.'
        );
    }
}