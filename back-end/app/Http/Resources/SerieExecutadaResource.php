<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SerieExecutadaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'serie' => $this->serie,
            'peso' => $this->peso,
            'repeticoes' => $this->repeticoes,
            'concluida' => $this->concluida,

            'sessao' => [
                'id' => $this->sessao->id,

                'iniciado_em' => $this->sessao->iniciado_em,
                'finalizado_em' => $this->sessao->finalizado_em,

                'duracao' => [
                    'total_segundos' => $this->sessao->duracao,
                    'minutos' => floor($this->sessao->duracao / 60),
                    'segundos' => $this->sessao->duracao % 60,
                ],

                'treino' => [
                    'id' => $this->sessao->treino->id,
                    'nome' => $this->sessao->treino->nome,
                ],
            ],

            'exercicioTreino' => [
                'id' => $this->exercicioTreino->id,

                'ordem' => $this->exercicioTreino->ordem,

                'repsMin' => $this->exercicioTreino->repeticoes_minimas,
                'repsMax' => $this->exercicioTreino->repeticoes_maximas,

                'sets' => $this->exercicioTreino->sets,
                'peso' => $this->exercicioTreino->peso,
                'descanso' => $this->exercicioTreino->descanso,

                'exercicio' => [
                    'id' => $this->exercicioTreino->exercicio->id,
                    'nome' => $this->exercicioTreino->exercicio->nome,
                    'descricao' => $this->exercicioTreino->exercicio->descricao,
                ],
            ],
        ];
    }
}