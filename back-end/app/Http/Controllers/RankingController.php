<?php

namespace App\Http\Controllers;

use App\Models\Exercicio;
use App\Models\SerieExecutada;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class RankingController extends Controller
{
    /**
     * CONFIRA estas constantes no seu projeto:
     * - COLUNA_USUARIO_SESSAO: coluna da tabela de sessões que guarda o dono do treino
     * - COLUNA_NOME_USUARIO: coluna da tabela de usuários com o nome de exibição
     * - COLUNA_TEMPO_SERIE: coluna da série executada que guarda o tempo (em segundos).
     *   Se a coluna não existir, o tempo passa a ser lido da coluna "repeticoes".
     */
    private const COLUNA_USUARIO_SESSAO = 'user_id';
    private const COLUNA_NOME_USUARIO = 'name';
    private const COLUNA_TEMPO_SERIE = 'duracao';

    /**
     * Palavras (sem acento, minúsculas) que FORÇAM o tipo pelo nome do exercício.
     * Esses exercícios aparecem sempre no seletor, mesmo que ninguém tenha feito ainda.
     */
    private const PALAVRAS_TEMPO = ['prancha'];
    private const PALAVRAS_REPETICOES = ['flexao', 'flexoes'];

    /**
     * Tipo definido apenas pelo nome (ou null se o nome não define).
     */
    private function tipoPorNome(string $nome): ?string
    {
        $nome = Str::lower(Str::ascii($nome));

        if (Str::contains($nome, self::PALAVRAS_TEMPO)) {
            return 'TEMPO';
        }

        if (Str::contains($nome, self::PALAVRAS_REPETICOES)) {
            return 'REPETICOES';
        }

        return null;
    }

    /**
     * Tipo final: o nome manda; se não definir, descobre pelos dados já registrados.
     */
    private function tipoDoExercicio(string $nome, float $maxPeso = 0, float $maxTempo = 0): string
    {
        $porNome = $this->tipoPorNome($nome);

        if ($porNome !== null) {
            return $porNome;
        }

        if ($maxPeso > 0) {
            return 'PESO';
        }

        if ($maxTempo > 0) {
            return 'TEMPO';
        }

        return 'REPETICOES';
    }

    /**
     * Coluna usada para o tempo (cai para "repeticoes" se a coluna de tempo não existir).
     */
    private function colunaTempo(SerieExecutada $serie): string
    {
        return Schema::hasColumn($serie->getTable(), self::COLUNA_TEMPO_SERIE)
            ? self::COLUNA_TEMPO_SERIE
            : 'repeticoes';
    }

    /**
     * Maior peso e maior tempo já registrados (de qualquer usuário) em séries concluídas,
     * agrupados por exercício. Se $exercicioId for informado, só daquele exercício.
     */
    private function agregadosPorExercicio(?int $exercicioId = null): Collection
    {
        $serie = new SerieExecutada();
        $relExercicioTreino = $serie->exercicioTreino();
        $exercicioTreinoTabela = $relExercicioTreino->getRelated()->getTable();

        $colunaExercicio = "{$exercicioTreinoTabela}.exercicio_id";

        $selecao = "{$colunaExercicio} as exercicio_id, MAX(".$serie->qualifyColumn('peso').') as max_peso';
        $selecao .= Schema::hasColumn($serie->getTable(), self::COLUNA_TEMPO_SERIE)
            ? ', MAX('.$serie->qualifyColumn(self::COLUNA_TEMPO_SERIE).') as max_tempo'
            : ', 0 as max_tempo';

        return SerieExecutada::query()
            ->join(
                $exercicioTreinoTabela,
                $relExercicioTreino->getQualifiedOwnerKeyName(),
                '=',
                $relExercicioTreino->getQualifiedForeignKeyName()
            )
            ->where($serie->qualifyColumn('concluida'), true)
            ->when($exercicioId !== null, fn ($consulta) => $consulta->where($colunaExercicio, $exercicioId))
            ->groupBy($colunaExercicio)
            ->selectRaw($selecao)
            ->get()
            ->keyBy('exercicio_id');
    }

    /**
     * Exercícios do seletor:
     * - todo exercício que já teve ao menos uma série concluída (de qualquer usuário)
     * - + flexão e prancha, que ficam sempre disponíveis
     */
    public function exercicios(): JsonResponse
    {
        abort_if(auth()->id() === null, 401, 'Não autenticado.');

        $agregados = $this->agregadosPorExercicio();

        $exercicios = Exercicio::orderBy('nome')
            ->get(['id', 'nome'])
            ->filter(fn ($e) => $agregados->has($e->id) || $this->tipoPorNome($e->nome) !== null)
            ->map(function ($e) use ($agregados) {
                $agregado = $agregados->get($e->id);

                return [
                    'id' => $e->id,
                    'nome' => $e->nome,
                    'tipo' => $this->tipoDoExercicio(
                        $e->nome,
                        (float) ($agregado->max_peso ?? 0),
                        (float) ($agregado->max_tempo ?? 0)
                    ),
                ];
            })
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

        $agregado = $this->agregadosPorExercicio($exercicio->id)->get($exercicio->id);

        $tipo = $this->tipoDoExercicio(
            $exercicio->nome,
            (float) ($agregado->max_peso ?? 0),
            (float) ($agregado->max_tempo ?? 0)
        );

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
            'TEMPO' => $serie->qualifyColumn($this->colunaTempo($serie)),
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