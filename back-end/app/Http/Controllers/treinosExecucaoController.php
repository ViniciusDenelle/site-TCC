<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExecutarTreinoRequest;
use App\Models\Treino;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class treinosExecucaoController extends Controller
{
    public function executarTreino(Treino $treino, ExecutarTreinoRequest $request)
    {
        $dados = $request->validated();
        $usuario = $request->user();

        $sessao = DB::transaction(function() use ( $dados, $treino, $usuario ) {

            $sessao = $treino->sessoes()->create([
                'user_id' => $usuario->id,
                'iniciado_em' => now(),
                'finalizado_em' => now(),
                'duracao' => $dados['duracao'],
            ]);

            foreach ($dados['seriesExecutadas'] as $serie) {
                $sessao->series()->create([
                    'exercicio_treino_id' => $serie['exercicioTreinoId'],
                    'serie' => $serie['serie'],
                    'peso' => $serie['peso'],
                    'repeticoes' => $serie['repeticoes'],
                    'concluida' => $serie['concluida']
                ]);
            }

            return $sessao;
        });

        return response($sessao->load(['series']));
    }

}
