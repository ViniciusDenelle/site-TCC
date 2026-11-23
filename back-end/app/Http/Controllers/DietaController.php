<?php

namespace App\Http\Controllers;

use App\Filters\DietaFilter;
use App\Http\Requests\DietaRequest;
use App\Http\Resources\DietaResource;
use App\Models\Dieta;
use App\Services\ImagemService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DietaController extends Controller
{
    private const RELACOES = ['refeicoes.alimentos'];

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

    public function store(DietaRequest $request)
    {
        $dados = $request->validated();

        $dieta = DB::transaction(function () use ($dados, $request) {
            $dieta = Dieta::create([
                'user_id' => $request->user()->id,
                'nome' => $dados['nome'],
                'descricao' => $dados['descricao'] ?? null,
            ]);

            $this->salvarRefeicoes($dieta, $dados);

            return $dieta;
        });

        return new DietaResource($dieta->load(self::RELACOES));
    }

    public function update(DietaRequest $request, Dieta $dieta)
    {
        $this->autorizarCriador($request, $dieta);

        $dados = $request->validated();

        DB::transaction(function () use ($dieta, $dados) {
            $dieta->update([
                'nome' => $dados['nome'],
                'descricao' => $dados['descricao'] ?? null,
            ]);

            // Refaz as refeições: remove os vínculos antigos e cria de novo
            $dieta->refeicoes->each(fn ($refeicao) => $refeicao->alimentos()->detach());
            $dieta->refeicoes()->delete();

            $this->salvarRefeicoes($dieta, $dados);
        });

        return new DietaResource($dieta->fresh()->load(self::RELACOES));
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

    /**
     * Cria as refeições (e os alimentos de cada uma) de uma dieta.
     * Usado no store e no update.
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

            // o mesmo alimento não pode aparecer duas vezes na refeição (chave única):
            // se vier repetido, soma as quantidades
            $itens = collect($dadosRefeicao['alimentos'] ?? [])
                ->groupBy('alimento_id')
                ->map(fn ($grupo) => $grupo->sum('quantidade_gramas'));

            foreach ($itens as $alimentoId => $gramas) {
                $refeicao->alimentos()->attach($alimentoId, [
                    'quantidade_gramas' => $gramas,
                ]);
            }
        }
    }

    private function autorizarCriador(Request $request, Dieta $dieta): void
    {
        abort_if(
            $dieta->user_id !== $request->user()->id,
            403,
            'Somente quem criou a dieta pode modificá-la.'
        );
    }
}