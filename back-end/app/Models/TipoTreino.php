<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoTreino extends Model
{
    protected $table = 'tipos_treino';
    
    public function Treinos()
    {
        return $this->hasMany(
            Treino::class, 
            'tipo_id', 
            'id'
        );
    }
}
