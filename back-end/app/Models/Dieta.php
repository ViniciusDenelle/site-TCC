<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dieta extends Model
{
    protected $fillable = [
        'user_id',
        'objetivo_id',
        'nivel_id',
        'nome',
        'descricao',
        'imagem',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function objetivo()
    {
        return $this->belongsTo(ObjetivoDieta::class, 'objetivo_id');
    }

    public function nivel()
    {
        return $this->belongsTo(NivelDieta::class, 'nivel_id');
    }

    public function refeicoes()
    {
        return $this->hasMany(Refeicao::class);
    }

    public function usuariosQueAdicionaram()
    {
        return $this->belongsToMany(User::class, 'dieta_usuario', 'dieta_id', 'user_id')
            ->withTimestamps();
    }
}