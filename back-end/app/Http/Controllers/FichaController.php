<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateFichaRequest;
use App\Http\Resources\FichaResource;
use App\Models\FichaTreino;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FichaController extends Controller
{
    public function create(CreateFichaRequest $request)
    {   
        $dados= $request->validated();

        $ficha = DB::transaction(function() use ($dados) {
            $ficha = FichaTreino::create([
                'nome' => $dados['nome'],
                'descricao' => $dados['descricao'],
            ]);

            foreach ($dados['diasSemana'] as $dia) {
                
                $ficha->dias()->create([
                    'dia_semana' => $dia
                ]);
            };

            foreach ($dados['divisao'] as $divisao) {
                $ficha->divisoes()->create([
                    'divisao' => $divisao
                ]);
            }
            return $ficha;
        });
        return response($ficha->load(['dias', 'divisoes']));
    }

    public function show(FichaTreino $ficha)
    {
        return new FichaResource($ficha->load(['dias', 'divisoes']));
    }

    public function fetch()
    {
        $fichas = FichaTreino::with(['dias', 'divisoes'])
        ->orderBy('created_at')
        ->limit(5)
        ->get();

        return FichaResource::collection($fichas);
        
    }

    public function update(CreateFichaRequest $request ,FichaTreino $ficha){
        
        $dados = $request->validated();

        $novaFicha = DB::transaction(function () use ($dados, $ficha) {
            $ficha->update([
                'nome' => $dados['nome'],
                'descricao' => $dados['descricao']
            ]);

            $ficha->dias()->delete();

            foreach ($dados['diasSemana'] as $dia) {
                $ficha->dias()->create([
                    'dia_semana' => $dia
                ]);
            }

            $ficha->divisoes()->delete();

            foreach ($dados['divisao'] as $divisao) {
                $ficha->divisoes()->create([
                    'divisao' => $divisao
                ]);
            }

            return $ficha;
        });

        return new FichaResource($novaFicha);
    }

    public function delete(FichaTreino $ficha)
    {
        $ficha->delete();

        return response([
            'mensagem' => 'ficha deletada com sucesso'
        ]);
    }
}
