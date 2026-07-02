<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TreinoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            
            'descricao' => $this->descricao,
            'tempo_estimado' => [
                'minutos' => floor($this->tempo_medio / 60),
                'segundos' => $this->tempo_medio % 60,
            ],
            'calorias_estimadas' => $this->calorias_medias,

            'exercicios' => $this->exercicios
                ->sortBy('ordem')
                ->values()
                ->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'ordem' => $item->ordem,

                        'repsMin' => $item->repeticoes_minimas,
                        'repsMax' => $item->repeticoes_maximas,
                        'sets' => $item->sets,
                        'peso' => $item->peso,
                        'descanso' => $item->descanso,

                        'exercicio' => [
                            'id' => $item->exercicio->id,
                            'nome' => $item->exercicio->nome,
                            'descricao' => $item->exercicio->descricao,
                        ],
                    ];
                }),
        ];
    }
}