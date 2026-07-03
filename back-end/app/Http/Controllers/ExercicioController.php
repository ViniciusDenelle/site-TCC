<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExercicioRequest;
use App\Http\Resources\ExercicioResource;
use App\Models\Exercicio;
use Illuminate\Support\Facades\DB;

class ExercicioController extends Controller
{
    public function create(ExercicioRequest $request)
    {
        $dados = $request->validated();

        $exercicio = Exercicio::create([
                'nome' => $dados['nome'],
                'descricao' => $dados['descricao'] ?? null,
            ]);


        return new ExercicioResource($exercicio);
    }

    public function show(Exercicio $exercicio)
    {
        return new ExercicioResource($exercicio);
    }

    public function fetch()
    {
        $exercicios = Exercicio::with([
            'nivel', 
            'categoria', 
            'tipo', 
            'musculos', 
            'equipamentos'
        ])->limit(20)->get();

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