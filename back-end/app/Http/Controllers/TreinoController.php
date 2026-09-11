<?php

namespace App\Http\Controllers;

use App\Enums\NivelTreino;
use App\Http\Requests\TreinoRequest;
use App\Http\Resources\TreinoResource;
use App\Models\FichaTreino;
use App\Models\Treino;
use App\services\calcularNivelPorPontuacao;
use App\services\calcularTreinoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TreinoController extends Controller
{
    public function store(
        TreinoRequest $request, 
        calcularTreinoService $calculadora,
        calcularNivelPorPontuacao  $calculadoraDeNivel
    ){
        $dados = $request->validated();

        $dadosCalculados = $calculadora->calcularTempoECalorias($dados['exercicios'], $request->user());
        $nivelTreino = $calculadoraDeNivel->calcularNivelPorPontuacao($dados['exercicios']);

        $treino = DB::transaction(function () use ($dados, $dadosCalculados, $nivelTreino) {

            // 2. Cria o registro principal do Treino
        $treino = Treino::create([
            'nome' => $dados['nome'],
            'descricao' => $dados['descricao'] ?? null,
            'foco_id' => $dados['foco_id'],
            'tipo_id' => $dados['tipo_id'],
            'nivel_id' => NivelTreino::from($nivelTreino)->id(),
            'tempo_medio' => $dadosCalculados['tempoEstimado'],
            'calorias_medias' => $dadosCalculados['caloriasEstimadas'],
        ]);

        // 3. Cadastra a lista de exercícios vinculados ao treino
        foreach ($dados['exercicios'] as $exercicio) {
            $treino->exercicios()->create([
                'exercicio_id' => $exercicio['exercicio_id'],
                'ordem' => $exercicio['ordem'],
                'sets' => $exercicio['sets'],
                'repeticoes_minimas' => $exercicio['repeticoes_minimas'],
                'repeticoes_maximas' => $exercicio['repeticoes_maximas'],
                'peso' => $exercicio['peso'],
                'descanso' => $exercicio['descanso'],
            ]);
        }

            return $treino->load(['exercicios.exercicio', 'nivel' , 'foco', 'tipo']);
        });

        return new TreinoResource($treino);
    }

    public function show(Treino $treino)
    {
        return new TreinoResource($treino->load(['exercicios.exercicio', 'nivel' , 'foco', 'tipo']));
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
        DB::transaction(function () use ($treino) {
            $treino->exercicios()->delete();
            $treino->sessoes()->delete();
            $treino->delete();
        });
    }


}
