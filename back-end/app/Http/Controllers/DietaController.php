<?php

namespace App\Http\Controllers;

use App\Http\Requests\DietaRequest;
use App\Http\Resources\DietaResource;
use App\Models\Dieta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DietaController extends Controller
{
    public function fetch(Request $request)
    {
        $dietas = Dieta::with(['objetivo', 'nivel', 'refeicoes.alimentos'])
            ->latest()
            ->paginate(10);

        return DietaResource::collection($dietas);
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
                        'quantidade_porcoes' => $itemAlimento['quantidade_porcoes'],
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
}