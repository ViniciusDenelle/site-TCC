<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Treino extends Model
{
    protected $fillable = [
        'user_id',
        'foco_id',
        'tipo_id',
        'nivel_id',
        'divisao_ficha_id',
        'nome',
        'descricao',
        'imagem',
        'tempo_medio',
        'calorias_medias',
    ];

    public function criador()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function usuariosQueAdicionaram()
    {
        return $this->belongsToMany(User::class, 'treino_usuario', 'treino_id', 'user_id')
            ->withTimestamps();
    }

    public function foco()
    {
        return $this->belongsTo(Foco::class, 'foco_id', 'id');
    }

    public function nivel()
    {
        return $this->belongsTo(NivelExercicio::class, 'nivel_id', 'id');
    }

    public function tipo()
    {
        return $this->belongsTo(TipoTreino::class, 'tipo_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ficha()
    {
        return $this->belongsTo(FichaTreino::class, 'ficha_treino_id');
    }

    public function exercicios()
    {
        return $this->hasMany(ExercicioTreino::class);
    }

    public function sessoes()
    {
        return $this->hasMany(SessaoTreino::class);
    }

    public function divisao(): BelongsTo
    {
        return $this->belongsTo(DivisaoFicha::class, 'divisao_ficha_id');
    }
}