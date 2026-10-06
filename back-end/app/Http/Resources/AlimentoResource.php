<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AlimentoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'porcao_descricao' => $this->porcao_descricao,
            'porcao_gramas' => $this->porcao_gramas,
            'calorias' => $this->calorias,
            'proteinas' => $this->proteinas,
            'carboidratos' => $this->carboidratos,
            'gorduras' => $this->gorduras,
        ];
    }
}