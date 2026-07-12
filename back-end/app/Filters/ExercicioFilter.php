<?php

namespace App\Filters;

use Illuminate\Http\Request;

class ExercicioFilter
{
    public static function apply($query, Request $request)
    {
        return $query
            ->when($request->nome, function ($q, $nome) {
                $q->where('nome', 'like', "%{$nome}%");
            })
            ->when($request->musculos, function ($q, $musculos) {
                foreach ($musculos as $musculo) {
                    $q->whereHas('musculos', function ($q, ) use ($musculo) {
                        $q->where('musculos.id', '=', $musculo);
                    });
                }
            })
            ->when($request->equipamentos, function ($q, $equipamentos) {
                foreach ($equipamentos as $equipamento) {
                    $q->whereHas('equipamentos', function ($q) use ($equipamento) {
                        $q->where('equipamentos.id', $equipamento);
                    });
                }
            })
            ->when($request->focos, function ($q, $categorias) {
                $q->whereIn('foco_id', $categorias);
            })
            ->when($request->niveis, function ($q, $niveis) {
                $q->whereIn('nivel_id', $niveis);
            })
            ->when($request->tipos, function ($q, $tipos) {
                $q->whereIn('tipo_id', $tipos);
            });
    }
}