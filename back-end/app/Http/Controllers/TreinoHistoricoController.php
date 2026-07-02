<?php

namespace App\Http\Controllers;

use App\Http\Resources\HistoricoTreinoResource;
use App\Http\Resources\SerieExecutadaResource;
use App\Models\Exercicio;
use App\Models\ExercicioTreino;
use App\Models\FichaTreino;
use App\Models\SerieExecutada;
use App\Models\SessaoTreino;
use App\Models\Treino;
use Illuminate\Http\Request;

class TreinoHistoricoController extends Controller
{
    public function ficha(FichaTreino $ficha)
    {
        $historico = SessaoTreino::with('treino')
            ->whereHas('treino', function ($query) use ($ficha) {
                $query->where('ficha_treino_id', $ficha->id);
            })
            ->latest('iniciado_em')
            ->paginate(20);

        return HistoricoTreinoResource::collection($historico);
    }

    public function treino(Treino $treino)
    {
        $historico = SessaoTreino::where('treino_id', $treino->id)
            ->with('treino')
            ->latest('iniciado_em')
            ->paginate(20);

        return HistoricoTreinoResource::collection($historico);
    }

    public function exercicio(Exercicio $exercicio)
    {
        $historico = SerieExecutada::whereHas('exercicioTreino', function ($query) use ($exercicio) {
            $query->where('exercicio_id', $exercicio->id);
        })
            ->with([
                'sessao.treino',
                'exercicioTreino.exercicio',
            ])
            ->latest('created_at')
            ->paginate(20);

        return SerieExecutadaResource::collection($historico);
    }
}
