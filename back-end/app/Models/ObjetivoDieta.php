<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ObjetivoDieta extends Model
{
    protected $table = 'objetivos_dieta';
    protected $fillable = ['nome'];

    public function dietas()
    {
        return $this->hasMany(Dieta::class, 'objetivo_id');
    }
}