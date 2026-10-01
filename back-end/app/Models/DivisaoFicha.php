<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DivisaoFicha extends Model
{
    protected $table = 'divisoes_ficha';
    protected $fillable = [
        'ficha_treino_id', 
        'divisao', 
        'ordem'
    ];

    public function ficha(): BelongsTo
    {
        return $this->belongsTo(FichaTreino::class, 'ficha_treino_id');
    }

    public function treinos(): HasMany
    {
        return $this->hasMany(Treino::class, 'divisao_ficha_id');
    }
}
