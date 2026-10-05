<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SessaoTreinoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $exercicios = $this->series
            ->groupBy('exercicio_treino_id')
            ->map(function ($seriesDoExercicio) {
                $primeiraSerie = $seriesDoExercicio->first();
                $exercicioTreino = $primeiraSerie->exercicioTreino;

                return [
                    'exercicio_treino_id' => $exercicioTreino->id,
                    'exercicio' => $exercicioTreino->exercicio ? [
                        'id' => $exercicioTreino->exercicio->id,
                        'nome' => $exercicioTreino->exercicio->nome,
                    ] : null,
                    'ordem' => $exercicioTreino->ordem,
                    'planejado' => [
                        'sets' => $exercicioTreino->sets,
                        'repeticoes_minimas' => $exercicioTreino->repeticoes_minimas,
                        'repeticoes_maximas' => $exercicioTreino->repeticoes_maximas,
                        'peso' => $exercicioTreino->peso,
                    ],
                    'series_executadas' => $seriesDoExercicio
                        ->sortBy('serie')
                        ->values()
                        ->map(fn ($serie) => [
                            'serie' => $serie->serie,
                            'peso' => $serie->peso,
                            'repeticoes' => $serie->repeticoes,
                            'concluida' => $serie->concluida,
                        ]),
                ];
            })
            ->sortBy('ordem')
            ->values();

        return [
            'id' => $this->id,
            'iniciado_em' => $this->iniciado_em,
            'finalizado_em' => $this->finalizado_em,
            'duracao' => $this->duracao,
            'exercicios' => $exercicios,
        ];
    }
}