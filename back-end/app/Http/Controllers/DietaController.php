<?php

namespace App\Http\Controllers;

use App\Filters\DietaFilter;
use App\Http\Requests\DietaRequest;
use App\Http\Resources\BadgeResource;
use App\Http\Resources\DietaResource;
use App\Models\Dieta;
use App\Models\NivelDieta;
use App\Models\ObjetivoDieta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DietaController extends Controller
{
    // DietaController.php

    public function fetch(Request $request)
    {
        $query = DietaFilter::apply(
            Dieta::query()
                ->with(['objetivo', 'nivel', 'refeicoes.alimentos']),
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
                'objetivo_id' => $dados['objetivo_id'],
                'nivel_id' => $dados['nivel_id'],
                'nome' => $dados['nome'],
                'descricao' => $dados['descricao'] ?? null,
            ]);

            foreach (($dados['refeicoes'] ?? []) as $ordem => $dadosRefeicao) {
                $refeicao = $dieta->refeicoes()->create([
                    'nome' => $dadosRefeicao['nome'],
                    'dia_semana' => $dadosRefeicao['dia_semana'],
                    'horario' => $dadosRefeicao['horario'] ?? null,
                    'ordem' => $dadosRefeicao['ordem'] ?? $ordem,
                ]);

                foreach (($dadosRefeicao['alimentos'] ?? []) as $itemAlimento) {
                    $refeicao->alimentos()->attach($itemAlimento['alimento_id'], [
                        'quantidade_gramas' => $itemAlimento['quantidade_gramas'],
                    ]);
                }
            }

            return $dieta;
        });

        return new DietaResource($dieta->load(['objetivo', 'nivel', 'refeicoes.alimentos']));
    }

    public function show(Dieta $dieta, Request $request)
    {
        // if ($dieta->user_id !== $request->user()->id) {
        //     abort(403, 'Você não tem permissão para ver esta dieta.');
        // }

        return new DietaResource($dieta->load(['objetivo', 'nivel', 'refeicoes.alimentos']));
    }

    public function niveis()
    {
        return BadgeResource::collection(NivelDieta::limit(12)->get());
    }

    public function objetivos()
    {
        return BadgeResource::collection(ObjetivoDieta::limit(12)->get());
    }
}