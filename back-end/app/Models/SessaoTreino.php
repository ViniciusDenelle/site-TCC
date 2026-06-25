<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SessaoTreino extends Model
{
    protected $fillable = [
        'user_id',
        'treino_id',
        'iniciado_em',
        'finalizado_em',
        'duracao'
    ];

    protected $casts = [
        'iniciado_em' => 'datetime',
        'finalizado_em' => 'datetime'
    ];

    public function treino()
    {
        return $this->belongsTo(Treino::class);
    }

    public function usuario()
    {
        return $this->belongsTo(User::class);
    }

    public function series()
    {
        return $this->hasMany(SerieExecutada::class);
    }
}
