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

        $exercicio = DB::transaction(function () use ($dados, $request) {
            $exercicio = Exercicio::create([
                'user_id' => $request->user()->id,
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

        return new ExercicioResource($exercicio->load(
            'criador',
            'tipo', 
            'nivel', 
            'foco', 
            'musculos', 
            'equipamentos'
        ));
    }

    public function show(Exercicio $exercicio)
    {
        return new ExercicioResource($exercicio->load('criador', 'tipo', 'nivel', 'foco', 'musculos', 'equipamentos'));
    }

    public function fetch(Request $request)
    {
        $query = Exercicio::query()
            ->with([
                'criador',
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

        $exercicio = DB::transaction(function () use ($exercicio, $dados) {
            // 1. Atualiza os dados diretos da tabela exercicios
            $exercicio->update([
                'nome' => $dados['nome'],
                'descricao' => $dados['descricao'] ?? null,
                'tipo_id' => $dados['tipo_id'],
                'nivel_id' => $dados['nivel_id'],
                'foco_id' => $dados['foco_id'],
            ]);

            $musculosSync = [];
            if (!empty($dados['musculos'])) {
                foreach ($dados['musculos'] as $musculo) {
                    $musculosSync[$musculo['id']] = ['tipo' => $musculo['tipo']];
                }
            }
            $exercicio->musculos()->sync($musculosSync);

            $exercicio->equipamentos()->sync($dados['equipamentos'] ?? []);

            return $exercicio;
        });

        // Recarrega os relacionamentos para retornar a resposta completa na Resource
        return new ExercicioResource($exercicio->load('tipo', 'nivel', 'foco', 'musculos', 'equipamentos'));
    }

    public function delete(Exercicio $exercicio)
    {

        $exercicio->delete();


        return response()->json([
            'message' => 'Exercício deletado com sucesso.'
        ]);
    }

    public function meusCriados(Request $request)
    {
        $exercicios = $request->user()
            ->exerciciosCriados()
            ->with([
                'criador',
                'nivel',
                'foco',
                'tipo',
                'musculos',
                'equipamentos'
            ])
            ->latest()
            ->paginate(10);

        return ExercicioResource::collection($exercicios);
    }

    public function meusAdicionados(Request $request)
    {
        $exercicios = $request->user()
            ->exerciciosAdicionados()
            ->with([
                'criador',
                'nivel',
                'foco',
                'tipo',
                'musculos',
                'equipamentos'
            ])
            ->latest()
            ->paginate(10);

        return ExercicioResource::collection($exercicios);
    }

    public function adcionar(Exercicio $exercicio, Request $request)
    {  
        $request->user()->exerciciosAdicionados()->attach($exercicio);

        return response()->json([
            'message' => 'Exercício adicionado com sucesso.'
        ]);
    }
}