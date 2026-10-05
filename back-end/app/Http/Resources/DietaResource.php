<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DietaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'descricao' => $this->descricao,

            'objetivo' => $this->whenLoaded('objetivo', fn () => [
                'id' => $this->objetivo->id,
                'nome' => $this->objetivo->nome,
            ]),

            'nivel' => $this->whenLoaded('nivel', fn () => [
                'id' => $this->nivel->id,
                'nome' => $this->nivel->nome,
            ]),

            'refeicoes' => $this->whenLoaded('refeicoes', fn () =>
                $this->refeicoes
                    ->sortBy(['dia_semana', 'ordem'])
                    ->values()
                    ->map(fn ($refeicao) => [
                        'id' => $refeicao->id,
                        'nome' => $refeicao->nome,
                        'dia_semana' => $refeicao->dia_semana,
                        'horario' => $refeicao->horario,
                        'alimentos' => $refeicao->relationLoaded('alimentos')
                            ? $refeicao->alimentos->map(fn ($alimento) => [
                                'id' => $alimento->id,
                                'nome' => $alimento->nome,
                                'porcao_descricao' => $alimento->porcao_descricao,
                                'quantidade_porcoes' => $alimento->pivot->quantidade_porcoes,
                                'calorias' => round($alimento->calorias * $alimento->pivot->quantidade_porcoes),
                                'proteinas' => round($alimento->proteinas * $alimento->pivot->quantidade_porcoes, 1),
                                'carboidratos' => round($alimento->carboidratos * $alimento->pivot->quantidade_porcoes, 1),
                                'gorduras' => round($alimento->gorduras * $alimento->pivot->quantidade_porcoes, 1),
                            ])
                            : [],
                    ])
            ),
        ];
    }
}