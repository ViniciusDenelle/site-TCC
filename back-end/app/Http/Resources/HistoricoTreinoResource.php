<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HistoricoTreinoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'iniciado_em' => $this->iniciado_em,
            'finalizado_em' => $this->finalizado_em,

            'duracao' => [
                'total_segundos' => $this->duracao,
                'minutos' => intdiv($this->duracao, 60),
                'segundos' => $this->duracao % 60,
            ],

            'treino' => [
                'id' => $this->treino->id,
                'nome' => $this->treino->nome,
                'descricao' => $this->treino->descricao,

                'tempo_estimado' => [
                    'total_segundos' => $this->treino->tempo_medio,
                    'minutos' => intdiv($this->treino->tempo_medio, 60),
                    'segundos' => $this->treino->tempo_medio % 60,
                ],

                'calorias_estimadas' => $this->treino->calorias_medias,
            ],
        ];
    }
}