<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDietaRequest;
use App\Models\Dieta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DietaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $dietas = Dieta::where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($dietas);
    }

    public function store(StoreDietaRequest $request): JsonResponse
    {
        $dados = $request->validated();

        $dieta = DB::transaction(function () use ($dados, $request) {
            $refeicoes = $dados['refeicoes'] ?? [];
            unset($dados['refeicoes']);

            $dieta = Dieta::create([...$dados, 'user_id' => $request->user()->id]);

            foreach ($refeicoes as $indice => $dadosRefeicao) {
                $alimentos = $dadosRefeicao['alimentos'] ?? [];
                unset($dadosRefeicao['alimentos']);

                $refeicao = $dieta->refeicoes()->create([
                    ...$dadosRefeicao,
                    'ordem' => $dadosRefeicao['ordem'] ?? $indice,
                ]);

                if ($alimentos) {
                    $refeicao->alimentos()->createMany($alimentos);
                }
            }

            return $dieta;
        });

        return response()->json(
            $dieta->load('refeicoes.alimentos'),
            201
        );
    }

    public function show(Request $request, Dieta $dieta): JsonResponse
    {
        abort_unless($dieta->user_id === $request->user()->id, 403);

        return response()->json($dieta->load('refeicoes.alimentos'));
    }
}