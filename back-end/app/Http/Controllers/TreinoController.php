<?php

namespace App\Http\Controllers;

use App\Enums\NivelTreino;
use App\Filters\TreinoFilter;
use App\Http\Requests\TreinoRequest;
use App\Http\Resources\SessaoTreinoResource;
use App\Http\Resources\TreinoResource;
use App\Models\FichaTreino;
use App\Models\SessaoTreino;
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
        calcularNivelPorPontuacao $calculadoraDeNivel
    ) {
        $dados = $request->validated();

        $dadosCalculados = $calculadora->calcularTempoECalorias($dados['exercicios'], $request->user());
        $nivelTreino = $calculadoraDeNivel->calcularNivelPorPontuacao($dados['exercicios']);

        $treino = DB::transaction(function () use ($dados, $dadosCalculados, $nivelTreino, $request) {

            // 2. Cria o registro principal do Treino
            $treino = Treino::create([
                'user_id' => $request->user()->id,
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

            return $treino->load([
                'criador',
                'exercicios.exercicio',
                'nivel',
                'foco',
                'tipo'
            ]);
        });

        return new TreinoResource($treino);
    }

    public function show(Treino $treino)
    {
        return new TreinoResource($treino->load(['exercicios.exercicio', 'nivel', 'foco', 'tipo']));
    }

    public function fetch(Request $request)
    {
        $treinos = TreinoFilter::apply(
            Treino::query()->with([
                'criador',
                'exercicios.exercicio',
                'nivel',
                'foco',
                'tipo'
            ]),
            $request
        )
            ->latest()
            ->paginate(10);

        return TreinoResource::collection($treinos);
    }

    // TreinoController
    public function historico(Request $request, Treino $treino)
    {
        $sessoes = SessaoTreino::where('treino_id', $treino->id)
            ->where('user_id', $request->user()->id)
            ->whereNotNull('finalizado_em') // só sessões concluídas
            ->with(['series.exercicioTreino.exercicio'])
            ->orderByDesc('iniciado_em')
            ->paginate(10);

        return SessaoTreinoResource::collection($sessoes);
    }


    public function update(
        TreinoRequest $request,
        Treino $treino,
        CalcularTreinoService $calculadora,
        CalcularNivelPorPontuacao $calculadoraDeNivel
    ) {
        $dados = $request->validated();

        // 1. Recalcula tempo, calorias e nível com base nos novos exercícios
        $dadosCalculados = $calculadora->calcularTempoECalorias($dados['exercicios'], $request->user());
        $nivelTreino = $calculadoraDeNivel->calcularNivelPorPontuacao($dados['exercicios']);

        DB::transaction(function () use ($dados, $treino, $dadosCalculados, $nivelTreino) {

            // 2. Atualiza os dados do treino principal
            $treino->update([
                'nome' => $dados['nome'],
                'descricao' => $dados['descricao'] ?? null,
                'foco_id' => $dados['foco_id'],
                'tipo_id' => $dados['tipo_id'],
                'nivel_id' => NivelTreino::from($nivelTreino)->id(),
                'tempo_medio' => $dadosCalculados['tempoEstimado'],
                'calorias_medias' => $dadosCalculados['caloriasEstimadas'],
            ]);

            // 3. Remove os relacionamentos antigos de exercícios
            $treino->exercicios()->delete();

            // 4. Recreia a lista de exercícios com a estrutura padronizada
            foreach ($dados['exercicios'] as $exercicio) {
                $treino->exercicios()->create([
                    'exercicio_id' => $exercicio['exercicio_id'],
                    'ordem' => $exercicio['ordem'],
                    'tipo_execucao' => $exercicio['tipo_execucao'],
                    'sets' => $exercicio['sets'],
                    'repeticoes_minimas' => $exercicio['repeticoes_minimas'],
                    'repeticoes_maximas' => $exercicio['repeticoes_maximas'],
                    'duracao_segundos' => $exercicio['duracao_segundos'],
                    'peso' => $exercicio['peso'],
                    'descanso' => $exercicio['descanso'],
                ]);
            }
        });

        // 5. Carrega todos os relacionamentos para retornar no Resource
        $treino->load(['exercicios.exercicio', 'nivel', 'foco', 'tipo']);

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

    public function meusCriados(Request $request)
    {
        $treinos = $request->user()
            ->treinosCriados()
            ->with(['foco', 'nivel', 'tipo'])
            ->latest()
            ->paginate(10);

        return TreinoResource::collection($treinos);
    }

    public function meusAdicionados(Request $request)
    {
        $treinos = $request->user()
            ->treinosAdicionados()
            ->with(['foco', 'nivel', 'tipo'])
            ->latest()
            ->paginate(10);

        return TreinoResource::collection($treinos);
    }

}
