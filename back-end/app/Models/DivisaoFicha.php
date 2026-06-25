<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DivisaoFicha extends Model
{
    protected $table = 'divisoes_ficha';

    protected $fillable = [
        'ficha_treino_id',
        'divisao'
    ];

    public function ficha()
    {
        return $this->belongsTo(FichaTreino::class);
    }
}
