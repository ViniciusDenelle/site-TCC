<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'nome'               => $this->name,
            'email'              => $this->email,
            // 'senha' removida por segurança!
            
            'genero'             => $this->perfil?->genero,
            'peso'               => $this->perfil?->peso,
            'tipoPeso'           => $this->perfil?->tipo_peso,
            'altura'             => $this->perfil?->altura,
            'data_de_nascimento' => $this->perfil?->data_de_nascimento,
            'nivel_atividade'    => $this->perfil?->nivel_atividade,
            'experiencia'        => $this->perfil?->experiencia,
            'idade'              => $this->perfil?->idade,
            
            'peso_ideal'         => $this->objetivo?->peso_ideal,
            'objetivo'           => $this->objetivo?->objetivo,
            'veloPerda'          => $this->objetivo?->velocidade,
            
            'calDiaria'          => $this->metricas?->cal_diaria,
            'TMB'                => $this->metricas?->TMB,
            'GET'                => $this->metricas?->GET,  
        ];
    }
}