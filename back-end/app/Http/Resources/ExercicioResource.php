<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExercicioResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'criador'   => $this->when($this->relationLoaded('criador'), function () {
                return $this->criador ? [
                    'id'   => $this->criador->id,
                    'nome' => $this->criador->name,
                ] : null;
            }),

            'nome' => $this->nome,
            'descricao' => $this->descricao,

            'foco' => [
                'id' => $this->foco?->id,
                'nome' => $this->foco?->nome,
            ],

            'nivel' => [
                'id' => $this->nivel->id,
                'nome' => $this->nivel->nome,
            ],

            'tipo' => [
                'id' => $this->tipo->id,
                'nome' => $this->tipo->nome,
            ],

            'musculos' => $this->musculos
                ->map(function ($musculo) {
                    return [
                        'id' => $musculo->id,
                        'nome' => $musculo->nome,

                        'tipo' => [
                            'id' => $musculo->pivot->tipo,
                            'nome' => $musculo->pivot->tipo == 1
                                ? 'Primário'
                                : 'Secundário',
                        ],
                    ];
                })
                ->sortBy('tipo.id')
                ->values(),

            'equipamentos' => $this->equipamentos
                ->map(function ($equipamento) {
                    return [
                        'id' => $equipamento->id,
                        'nome' => $equipamento->nome,
                    ];
                })
                ->values(),
        ];
    }
}