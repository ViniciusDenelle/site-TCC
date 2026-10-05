<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NivelDieta extends Model
{
    protected $table = 'niveis_dieta';
    protected $fillable = ['nome'];

    public function dietas()
    {
        return $this->hasMany(Dieta::class, 'nivel_id');
    }
}