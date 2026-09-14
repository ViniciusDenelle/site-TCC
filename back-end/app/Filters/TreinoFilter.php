<?php

namespace App\Filters;

use Illuminate\Http\Request;

class TreinoFilter
{
    public static function apply($query, Request $request)
    {
        return $query

            ->when($request->nome, function ($q, $nome) {
                $q->where('nome', 'like', "%{$nome}%");
            })

            ->when($request->niveis, function ($q, $niveis) {
                $q->whereIn('nivel_id', $niveis);
            })

            ->when($request->tipos, function ($q, $tipos) {
                $q->whereIn('tipo_id', $tipos);
            })

            ->when($request->focos, function ($q, $focos) {
                $q->whereIn('foco_id', $focos);
            })

            ->when($request->calorias_min, function ($q, $min) {
                $q->where('calorias_medias', '>=', $min);
            })

            ->when($request->calorias_max, function ($q, $max) {
                $q->where('calorias_medias', '<=', $max);
            })

            ->when($request->tempo_min, function ($q, $min) {
                $q->where('tempo_medio', '>=', $min);
            })

            ->when($request->tempo_max, function ($q, $max) {
                $q->where('tempo_medio', '<=', $max);
            })

            ->when($request->musculos, function ($q, $musculos) {
                $q->whereHas('exercicios.exercicio.musculos', function ($q2) use ($musculos) {
                    $q2->whereIn('musculos.id', $musculos);
                });
            })

            ->when($request->equipamentos, function ($q, $equipamentos) {
                $q->whereHas('exercicios.exercicio.equipamentos', function ($q2) use ($equipamentos) {
                    $q2->whereIn('equipamentos.id', $equipamentos);
                });
            });
    }
}