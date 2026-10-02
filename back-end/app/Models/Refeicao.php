<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Refeicao extends Model
{
    protected $table = 'refeicoes';

    protected $fillable = ['dieta_id', 'dia_semana', 'nome', 'horario', 'ordem'];

    public function dieta(): BelongsTo
    {
        return $this->belongsTo(Dieta::class);
    }

    public function alimentos(): HasMany
    {
        return $this->hasMany(Alimento::class);
    }
}