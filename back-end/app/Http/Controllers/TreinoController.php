<?php

namespace App\Http\Controllers;

use App\Http\Requests\TreinoRequest;
use App\Http\Resources\TreinoResource;
use App\Models\FichaTreino;
use App\Models\Treino;
use App\services\calcularTreinoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TreinoController extends Controller
{
    public function create(FichaTreino $ficha, TreinoRequest $request, calcularTreinoService $calculadora)
    {
        $dados = $request->validated();

        $dadosCalculados = $calculadora->calcularTempoECalorias($dados['exercicios'], $request->user());

        $treino = DB::transaction(function () use ($dados, $ficha, $dadosCalculados) {

            $treino = $ficha->treinos()->create([
                'nome' => $dados['nome'],
                'descricao' => $dados['descricao'],
                'tempo_medio' => $dadosCalculados['tempoEstimado'],
                'calorias_medias' => $dadosCalculados['caloriasEstimadas']
            ]);

            foreach ($dados['exercicios'] as $ordem => $exercicio) {
                $treino->exercicios()->create([
                    'exercicio_id' => $exercicio['id'],
                    'ordem' => $ordem + 1,
                    'repeticoes_minimas' => $exercicio['repsMin'],
                    'repeticoes_maximas' => $exercicio['repsMax'],
                    'sets' => $exercicio['sets'],
                    'peso' => $exercicio['peso'],
                    'descanso' => $exercicio['descanso'],
                ]);
            }

            return $treino->load('exercicios.exercicio');
        });

        return new TreinoResource($treino);
    }

    public function show(Treino $treino)
    {
        return new TreinoResource($treino->load(['exercicios.exercicio']));
    }

    public function fetch()
    {
        $treinos = Treino::with(['exercicios.exercicio'])
            ->latest()
            ->limit(5)
            ->get();

        return TreinoResource::collection($treinos);
    }

    public function update(TreinoRequest $request, Treino $treino, CalcularTreinoService $calculadora)
    {
        $dados = $request->validated();

        $dadosCalculados = $calculadora->calcularTempoECalorias($dados['exercicios'], $request->user());

        DB::transaction(function () use ($dados, $treino, $dadosCalculados) {

            $treino->update([
                'nome' => $dados['nome'],
                'descricao' => $dados['descricao'],
                'tempo_medio' => $dadosCalculados['tempoEstimado'],
                'calorias_medias' => $dadosCalculados['caloriasEstimadas']
            ]);

            $treino->exercicios()->delete();

            foreach ($dados['exercicios'] as $ordem => $exercicio) {
                $treino->exercicios()->create([
                    'exercicio_id' => $exercicio['id'],
                    'ordem' => $ordem + 1,
                    'repeticoes_minimas' => $exercicio['repsMin'],
                    'repeticoes_maximas' => $exercicio['repsMax'],
                    'sets' => $exercicio['sets'],
                    'peso' => $exercicio['peso'],
                    'descanso' => $exercicio['descanso'],
                ]);
            }
        });

        $treino->load(['exercicios.exercicio']);

        return new TreinoResource($treino);
    }

    public function delete(Treino $treino)
    {
        $treino->delete();

        return response('deu certo');
    }

    
}
