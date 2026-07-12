<?php

namespace App\Http\Controllers;

use App\Http\Resources\BadgeResource;
use App\Models\CategoriaExercicio;
use App\Models\Equipamento;
use App\Models\Foco;
use App\Models\Musculo;
use App\Models\NivelExercicio;
use App\Models\TipoExercicio;
use Illuminate\Http\Request;

class BadgeTreinoController extends Controller
{
    public function musculos()
    {
        $musculos = Musculo::limit(18)->get();

        return BadgeResource::collection($musculos);
    }

    public function equipamentos()
    {
        $equipamentos = Equipamento::limit(12)->get();

        return BadgeResource::collection($equipamentos);
    }

    public function tipos()
    {
        $tipos = TipoExercicio::limit(12)->get();

        return BadgeResource::collection($tipos);
    }

    public function niveis()
    {
        $niveis = NivelExercicio::limit(12)->get();

        return BadgeResource::collection($niveis);
    }

    public function focos()
    {
        $focos = Foco::limit(12)->get();

        return BadgeResource::collection($focos);
    }
}
