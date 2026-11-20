<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome'               => $this->name,
            'email'              => $this->email,
            // 'senha' removida por segurança!
            
            'genero'             => $this->perfil?->genero,
            'peso'               => $this->perfil?->peso,
            'tipoPeso'           => $this->perfil?->tipo_do_peso,
            'altura'             => $this->perfil?->altura,
            'dataDeNascimento' => $this->perfil?->data_de_nascimento,
            'nivelDeAtividade'    => $this->perfil?->nivel_de_atividade,
            'experiencia'        => $this->perfil?->experiencia,
            'idade'              => $this->perfil?->idade,
            
            'pesoIdeal'         => $this->objetivos?->peso_ideal,
            'pesoMinimo'         => $this->objetivos?->peso_minimo,
            'pesoMaximo'         => $this->objetivos?->peso_maximo,
            'objetivo'           => $this->objetivos?->tipo,
            'veloPerda'          => $this->objetivos?->velocidade,
            'duracao'            => $this->objetivos?->duracao,
            'comeco'             => $this->objetivos?->comeco,
            'termino'            => $this->objetivos?->termino,
            
            'caloriasDiarias'          => $this->metricas?->calorias_diarias,
            'TMB'                => $this->metricas?->TMB,
            'GET'                => $this->metricas?->GET,  
        ];
    }
}