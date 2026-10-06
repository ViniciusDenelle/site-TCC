<?php

namespace App\Http\Controllers;

use App\Models\Exercicio;
use App\Models\SerieExecutada;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class RankingController extends Controller
{
    /**
     * CONFIRA estas constantes no seu projeto:
     * - COLUNA_USUARIO_SESSAO: coluna da tabela de sessões que guarda o dono do treino
     * - COLUNA_NOME_USUARIO: coluna da tabela de usuários com o nome de exibição
     * - COLUNA_TEMPO_SERIE: coluna da série executada que guarda o tempo (em segundos)
     */
    private const COLUNA_USUARIO_SESSAO = 'user_id';
    private const COLUNA_NOME_USUARIO = 'name';
    private const COLUNA_TEMPO_SERIE = 'duracao';

    /**
     * Palavras (sem acento, minúsculas) que definem o tipo de competição pelo nome do exercício.
     */
    private const PALAVRAS_TEMPO = ['prancha'];
    private const PALAVRAS_REPETICOES = ['flexao', 'flexoes'];

    private function tipoDoExercicio(string $nome): string
    {
        $nome = Str::lower(Str::ascii($nome));

        if (Str::contains($nome, self::PALAVRAS_TEMPO)) {
            return 'TEMPO';
        }

        if (Str::contains($nome, self::PALAVRAS_REPETICOES)) {
            return 'REPETICOES';
        }

        return 'PESO';
    }

    /**
     * Exercícios do seletor:
     * - os que qualquer usuário já executou com carga (peso > 0)
     * - + flexão e prancha, que ficam sempre disponíveis
     */
    public function exercicios(): JsonResponse
    {
        abort_if(auth()->id() === null, 401, 'Não autenticado.');

        $serie = new SerieExecutada();
        $relExercicioTreino = $serie->exercicioTreino();

        $exercicioTreinoTabela = $relExercicioTreino->getRelated()->getTable();

        $idsComPeso = SerieExecutada::query()
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

        $exercicios = Exercicio::orderBy('nome')
            ->get(['id', 'nome'])
            ->filter(fn ($e) => $idsComPeso->contains($e->id)
                || $this->tipoDoExercicio($e->nome) !== 'PESO')
            ->map(fn ($e) => [
                'id' => $e->id,
                'nome' => $e->nome,
                'tipo' => $this->tipoDoExercicio($e->nome),
            ])
            ->values();

        return response()->json(['data' => $exercicios]);
    }

    /**
     * Ranking de um exercício: melhor resultado de cada usuário.
     */
    public function exercicio(Exercicio $exercicio): JsonResponse
    {
        $userId = auth()->id();
        abort_if($userId === null, 401, 'Não autenticado.');

        $tipo = $this->tipoDoExercicio($exercicio->nome);

        $serie = new SerieExecutada();
        $relSessao = $serie->sessao();
        $relExercicioTreino = $serie->exercicioTreino();
        $usuario = new User();

        $sessaoTabela = $relSessao->getRelated()->getTable();
        $exercicioTreinoTabela = $relExercicioTreino->getRelated()->getTable();
        $usuarioTabela = $usuario->getTable();

        $colunaUsuarioSessao = "{$sessaoTabela}.".self::COLUNA_USUARIO_SESSAO;

        // Coluna que define quem vence neste exercício
        $colunaValor = match ($tipo) {
            'REPETICOES' => $serie->qualifyColumn('repeticoes'),
            'TEMPO' => $serie->qualifyColumn(self::COLUNA_TEMPO_SERIE),
            default => $serie->qualifyColumn('peso'),
        };

        $consulta = SerieExecutada::query()
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
            ->where($colunaValor, '>', 0)
            ->orderByDesc($colunaValor);

        // No peso, desempata por repetições
        if ($tipo === 'PESO') {
            $consulta->orderByDesc($serie->qualifyColumn('repeticoes'));
        }

        // Em último caso, quem fez primeiro fica na frente
        $series = $consulta
            ->orderBy("{$sessaoTabela}.iniciado_em")
            ->get([
                "{$colunaUsuarioSessao} as user_id",
                "{$usuarioTabela}.".self::COLUNA_NOME_USUARIO.' as nome',
                "{$colunaValor} as valor",
                $serie->qualifyColumn('repeticoes').' as repeticoes',
                "{$sessaoTabela}.iniciado_em as data",
            ]);

        // Já está ordenado: o primeiro registro de cada usuário é o melhor dele
        $todos = $series
            ->unique('user_id')
            ->values()
            ->map(fn ($r, $i) => [
                'posicao' => $i + 1,
                'user_id' => (int) $r->user_id,
                'nome' => $r->nome,
                'valor' => (float) $r->valor,
                'repeticoes' => (int) $r->repeticoes,
                'data' => $r->data,
                'voce' => (int) $r->user_id === (int) $userId,
            ]);

        return response()->json([
            'data' => [
                'exercicio' => [
                    'id' => $exercicio->id,
                    'nome' => $exercicio->nome,
                    'tipo' => $tipo,
                ],
                'total_participantes' => $todos->count(),
                'ranking' => $todos->take(50)->values(),
                'minha_posicao' => $todos->firstWhere('voce', true),
            ],
        ]);
    }
}
