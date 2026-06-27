<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FichaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'nome' => $this->nome,
            'descricao' => $this->descricao,
            
            'diasSemana'=> $this->dias->pluck('dia_semana')->values(),
            'divisoes'=> $this->divisoes->pluck('divisao')->values(), 
        ];
    }
}
