<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FichaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'descricao' => $this->descricao,
            'criador'   => $this->when($this->relationLoaded('criador'), function () {
                return $this->criador ? [
                    'id'   => $this->criador->id,
                    'nome' => $this->criador->name,
                ] : null;
            }),

            'divisoes' => $this->whenLoaded('divisoes', fn () =>
                $this->divisoes->sortBy('ordem')->values()->map(fn ($divisao) => [
                    'id' => $divisao->id,
                    'nome' => $divisao->divisao,
                    'treinos' => $divisao->treinos->map(fn ($treino) => [
                        'id' => $treino->id,
                        'nome' => $treino->nome,
                    ])->values(),
                ])
            ),

            'dias' => $this->whenLoaded('dias', fn () =>
                $this->dias->mapWithKeys(fn ($dia) => [
                    $dia->dia_semana => $dia->treino ? [
                        'id' => $dia->treino->id,
                        'nome' => $dia->treino->nome,
                    ] : null,
                ])
            ),
        ];
    }
}