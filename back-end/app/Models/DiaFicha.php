<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiaFicha extends Model
{
    protected $table = 'dias_ficha';

    protected $fillable = [
        'ficha_treino_id',
        'dia_semana'
    ];

    public function ficha()
    {
        return $this->belongsTo(FichaTreino::class);
    }
}
