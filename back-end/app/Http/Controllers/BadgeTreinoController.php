<?php

namespace App\Http\Controllers;

use App\Http\Resources\BadgeResource;
use App\Models\CategoriaExercicio;
use App\Models\Equipamento;
use App\Models\Foco;
use App\Models\Musculo;
use App\Models\NivelExercicio;
use App\Models\TipoExercicio;
use App\Models\TipoTreino;
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

    public function tiposExercicio()
    {
        $tipos = TipoExercicio::limit(12)->get();

        return BadgeResource::collection($tipos);
    }

    public function tiposTreino()
    {
        $tipos = TipoTreino::limit(12)->get();

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

    public function compartilhadas()
    {
        return response()->json([
            'musculos' => BadgeResource::collection(
                Musculo::limit(18)->get()
            ),

            'focos' => BadgeResource::collection(
                Foco::limit(12)->get()
            ),

            'niveis' => BadgeResource::collection(
                NivelExercicio::limit(12)->get()
            ),

            'equipamentos' => BadgeResource::collection(
                Equipamento::limit(12)->get()
            ),

            'tipos' => BadgeResource::collection(
                TipoExercicio::limit(12)->get()
            ),
        ]);
    }
}
