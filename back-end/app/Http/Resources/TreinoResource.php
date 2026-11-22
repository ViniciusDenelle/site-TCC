<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TreinoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Trata os nomes das colunas com suporte a ambas as nomenclaturas do banco
        $tempoSegundos = $this->tempo_medio ?? $this->tempo_estimado ?? 0;
        $calorias = $this->calorias_medias ?? $this->calorias_estimadas ?? 0;

        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'descricao' => $this->descricao,
            'imagem' => $this->imagem ? asset('storage/' . $this->imagem) : null,
            'criador'   => $this->when($this->relationLoaded('criador'), function () {
                return $this->criador ? [
                    'id'   => $this->criador->id,
                    'nome' => $this->criador->name,
                ] : null;
            }),

            // Relacionamentos adicionados
            'foco' => $this->whenLoaded('foco', fn() => [
                'id' => $this->foco->id,
                'nome' => $this->foco->nome,
            ]),
            'tipo' => $this->whenLoaded('tipo', fn() => [
                'id' => $this->tipo->id,
                'nome' => $this->tipo->nome,
            ]),
            'nivel' => $this->whenLoaded('nivel', fn() => [
                'id' => $this->nivel->id,
                'nome' => $this->nivel->nome,
            ], $this->nivel_id),

            'tempo_estimado' => [
                'segundos_totais' => $tempoSegundos,
                'minutos' => (int) floor($tempoSegundos / 60),
                'segundos' => $tempoSegundos % 60,
            ],
            'calorias_estimadas' => $calorias,

            'exercicios' => $this->whenLoaded('exercicios', function () {
                return $this->exercicios
                    ->sortBy('ordem')
                    ->values()
                    ->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'ordem' => $item->ordem,
                            'sets' => $item->sets,
                            'repeticoes_minimas' => $item->repeticoes_minimas ?? $item->repsMin,
                            'repeticoes_maximas' => $item->repeticoes_maximas ?? $item->repsMax,
                            'duracao_segundos' =>  $item->duracao_segundos ?? $item->duracaoSegundos,
                            'tipo_execucao' => $item->tipo_execucao ?? $item->tipoExecucao,
                            'peso' => $item->peso,
                            'descanso' => $item->descanso,

                            'exercicio' => [                  // ← aninhado aqui
                                'id' => $item->exercicio->id,
                                'nome' => $item->exercicio->nome,
                                'descricao' => $item->exercicio->descricao,
                                'imagem' => $this->imagem ? asset('storage/' . $this->imagem) : null,
                            ],
                        ];
                    });
            }, []),
        ];
    }
}