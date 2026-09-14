<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DiaFicha extends Model
{
    protected $table = 'dias_ficha';
    protected $fillable = [
        'ficha_treino_id', 
        'dia_semana', 
        'treino_id'
    ];

    public function ficha(): BelongsTo
    {
        return $this->belongsTo(FichaTreino::class, 'ficha_treino_id');
    }

    public function treino(): BelongsTo
    {
        return $this->belongsTo(Treino::class);
    }
}
