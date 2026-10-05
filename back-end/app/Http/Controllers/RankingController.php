<?php

namespace App\Http\Controllers;

use App\Models\Exercicio;
use App\Models\SerieExecutada;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class RankingController extends Controller
{
    /**
     * CONFIRA estas duas linhas no seu projeto:
     * - COLUNA_USUARIO_SESSAO: coluna da tabela de sessões que guarda o dono do treino
     * - COLUNA_NOME_USUARIO: coluna da tabela de usuários com o nome de exibição
     */
    private const COLUNA_USUARIO_SESSAO = 'user_id';
    private const COLUNA_NOME_USUARIO = 'name';

    /**
     * Exercícios que qualquer usuário já executou (opções do seletor).
     */
    public function exercicios(): JsonResponse
    {
        abort_if(auth()->id() === null, 401, 'Não autenticado.');

        $serie = new SerieExecutada();
        $relExercicioTreino = $serie->exercicioTreino();

        $exercicioTreinoTabela = $relExercicioTreino->getRelated()->getTable();

        $exercicioIds = SerieExecutada::query()
            ->join(
                $exercicioTreinoTabela,
                $relExercicioTreino->getQualifiedOwnerKeyName(),
                '=',
                $relExercicioTreino->getQualifiedForeignKeyName()
            )
            ->where($serie->qualifyColumn('concluida'), true)
            ->where($serie->qualifyColumn('peso'), '>', 0)
            ->distinct()
            ->pluck("{$exercicioTreinoTabela}.exercicio_id");

        $exercicios = Exercicio::whereIn('id', $exercicioIds)
            ->orderBy('nome')
            ->get(['id', 'nome']);

        return response()->json(['data' => $exercicios]);
    }

    /**
     * Ranking de um exercício: melhor série de cada usuário.
     */
    public function exercicio(Exercicio $exercicio): JsonResponse
    {
        $userId = auth()->id();
        abort_if($userId === null, 401, 'Não autenticado.');

        $serie = new SerieExecutada();
        $relSessao = $serie->sessao();
        $relExercicioTreino = $serie->exercicioTreino();
        $usuario = new User();

        $sessaoTabela = $relSessao->getRelated()->getTable();
        $exercicioTreinoTabela = $relExercicioTreino->getRelated()->getTable();
        $usuarioTabela = $usuario->getTable();

        $colunaUsuarioSessao = "{$sessaoTabela}.".self::COLUNA_USUARIO_SESSAO;

        // Todas as séries concluídas deste exercício, da melhor para a pior
        $series = SerieExecutada::query()
            ->join(
                $exercicioTreinoTabela,
                $relExercicioTreino->getQualifiedOwnerKeyName(),
                '=',
                $relExercicioTreino->getQualifiedForeignKeyName()
            )
            ->join(
                $sessaoTabela,
                $relSessao->getQualifiedOwnerKeyName(),
                '=',
                $relSessao->getQualifiedForeignKeyName()
            )
            ->join(
                $usuarioTabela,
                $usuario->qualifyColumn($usuario->getKeyName()),
                '=',
                $colunaUsuarioSessao
            )
            ->where("{$exercicioTreinoTabela}.exercicio_id", $exercicio->id)
            ->where($serie->qualifyColumn('concluida'), true)
            ->where($serie->qualifyColumn('peso'), '>', 0)
            ->orderByDesc($serie->qualifyColumn('peso'))
            ->orderByDesc($serie->qualifyColumn('repeticoes'))
            ->orderBy("{$sessaoTabela}.iniciado_em")
            ->get([
                "{$colunaUsuarioSessao} as user_id",
                "{$usuarioTabela}.".self::COLUNA_NOME_USUARIO." as nome",
                $serie->qualifyColumn('peso').' as peso',
                $serie->qualifyColumn('repeticoes').' as repeticoes',
                "{$sessaoTabela}.iniciado_em as data",
            ]);

        // Como já está ordenado, o primeiro registro de cada usuário é a melhor série dele
        $todos = $series
            ->unique('user_id')
            ->values()
            ->map(fn ($r, $i) => [
                'posicao' => $i + 1,
                'user_id' => (int) $r->user_id,
                'nome' => $r->nome,
                'peso' => (float) $r->peso,
                'repeticoes' => (int) $r->repeticoes,
                'data' => $r->data,
                'voce' => (int) $r->user_id === (int) $userId,
            ]);

        return response()->json([
            'data' => [
                'exercicio' => [
                    'id' => $exercicio->id,
                    'nome' => $exercicio->nome,
                ],
                'total_participantes' => $todos->count(),
                'ranking' => $todos->take(50)->values(),
                'minha_posicao' => $todos->firstWhere('voce', true),
            ],
        ]);
    }
}