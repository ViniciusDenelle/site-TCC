<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExercicioRequest;
use App\Http\Resources\ExercicioResource;
use App\Models\Exercicio;
use ExercicioFilter;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ExercicioController extends Controller
{
    public function create(ExercicioRequest $request)
    {
        $dados = $request->validated();

        $exercicio = DB::transaction(function () use ($dados) {
            $exercicio = Exercicio::create([
                'nome' => $dados['nome'],
                'descricao' => $dados['descricao'] ?? null,
                'tipo_id' => $dados['tipo_id'],
                'nivel_id' => $dados['nivel_id'],
                'foco_id' => $dados['foco_id'],
            ]);

            foreach ($dados['musculos'] as $musculo) {
                $exercicio->musculos()->attach($musculo['id'], ['tipo' => $musculo['tipo']]);
            }

            if (!empty($dados['equipamentos'])) {
                $exercicio->equipamentos()->attach($dados['equipamentos']);
            }

            return $exercicio;
        });

        return new ExercicioResource($exercicio->load('tipo', 'nivel', 'foco', 'musculos', 'equipamentos'));
    }

    public function show(Exercicio $exercicio)
    {
        return new ExercicioResource($exercicio->load('tipo', 'nivel', 'foco', 'musculos', 'equipamentos'));
    }

    public function fetch(Request $request)
    {
        $query = Exercicio::query()
            ->with([
                'nivel',
                'foco',
                'tipo',
                'musculos',
                'equipamentos'
            ]);

        $query = \App\Filters\ExercicioFilter::apply($query, $request);

        $exercicios = $query->paginate(5);

        return ExercicioResource::collection($exercicios);
    }

    public function update(ExercicioRequest $request, Exercicio $exercicio)
    {
        $dados = $request->validated();


        $exercicio->update([
            'nome' => $dados['nome'],
            'descricao' => $dados['descricao'] ?? null,
        ]);


        return new ExercicioResource($exercicio);
    }

    public function delete(Exercicio $exercicio)
    {

        $exercicio->delete();


        return response()->json([
            'message' => 'Exercício deletado com sucesso.'
        ]);
    }
}