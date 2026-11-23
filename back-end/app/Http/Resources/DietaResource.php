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
            'user_id' => $this->user_id,
            'nome' => $this->nome,
            'descricao' => $this->descricao,
            'imagem' => $this->imagem ? asset('storage/' . $this->imagem) : null,

            'refeicoes' => $this->whenLoaded(
                'refeicoes',
                fn() =>
                    $this->refeicoes
                        ->sortBy(['dia_semana', 'ordem'])
                        ->values()
                        ->map(fn($refeicao) => [
                            'id' => $refeicao->id,
                            'nome' => $refeicao->nome,
                            'dia_semana' => $refeicao->dia_semana,
                            'horario' => $refeicao->horario?->format('H:i'),
                            'alimentos' => $refeicao->relationLoaded('alimentos')
                                ? $refeicao->alimentos->map(function ($alimento) {
                                    $fator = $alimento->pivot->quantidade_gramas / $alimento->porcao_gramas;

                                    return [
                                        'id' => $alimento->id,
                                        'nome' => $alimento->nome,
                                        'porcao_descricao' => $alimento->porcao_descricao,
                                        'porcao_gramas' => $alimento->porcao_gramas,
                                        'quantidade_gramas' => $alimento->pivot->quantidade_gramas,
                                        'calorias' => round($alimento->calorias * $fator),
                                        'proteinas' => round($alimento->proteinas * $fator, 1),
                                        'carboidratos' => round($alimento->carboidratos * $fator, 1),
                                        'gorduras' => round($alimento->gorduras * $fator, 1),
                                    ];
                                })
                                : [],
                        ])
            ),
        ];
    }
}