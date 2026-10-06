<?php

namespace App\Http\Controllers;

use App\Models\Exercicio;
use App\Models\HistoricoPeso;
use App\Models\SerieExecutada;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class ProgressoController extends Controller
{
    /**
     * CONFIRA no seu projeto (mesma constante usada no RankingController):
     * coluna da tabela de sessões que guarda o dono do treino.
     */
    private const COLUNA_USUARIO_SESSAO = 'user_id';

    /** Quantos exercícios aparecem nos gráficos de cargas e séries (radar fica ilegível com muitos) */
    private const EXERCICIOS_PADRAO = 6;
    private const EXERCICIOS_MAXIMO = 12;

    private const DIAS_PADRAO = 30;
    private const DIAS_MAXIMO = 730;

    private const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    /* ===================================================== */
    /* RESUMO (cards de métricas e cabeçalho do gráfico peso) */
    /* GET /dashboard/progresso/resumo?dias=30                */
    /* ===================================================== */
    public function resumo(Request $request): JsonResponse
    {
        $userId = $this->usuarioId();
        $dias = $this->dias($request);

        $hoje = Carbon::today();
        $inicioPeriodo = $hoje->copy()->subDays($dias);
        $inicioMes = $hoje->copy()->subDays(30);
        $inicioMesAnterior = $hoje->copy()->subDays(60);

        $series = $this->seriesDoUsuario($userId);

        // ---- Treinos (sessões com ao menos uma série concluída)
        $datasSessoes = $series
            ->unique('sessao_id')
            ->map(fn ($registro) => Carbon::parse($registro->iniciado_em))
            ->values();

        $treinosNoMes = $datasSessoes
            ->filter(fn (Carbon $data) => $data->gte($inicioMes))
            ->count();

        $treinosMesAnterior = $datasSessoes
            ->filter(fn (Carbon $data) => $data->gte($inicioMesAnterior) && $data->lt($inicioMes))
            ->count();

        // ---- Carga máxima (no período x antes do período)
        $cargaNoPeriodo = $series
            ->filter(fn ($registro) => Carbon::parse($registro->iniciado_em)->gte($inicioPeriodo))
            ->max('peso');

        $cargaAntes = $series
            ->filter(fn ($registro) => Carbon::parse($registro->iniciado_em)->lt($inicioPeriodo))
            ->max('peso');

        $cargaMaxima = $cargaNoPeriodo > 0 ? (float) $cargaNoPeriodo : null;
        $variacaoCarga = ($cargaMaxima !== null && $cargaAntes > 0)
            ? round($cargaMaxima - (float) $cargaAntes, 1)
            : null;

        // ---- Peso corporal
        $pesos = HistoricoPeso::where('user_id', $userId)
            ->orderBy('registrado_em')
            ->get();

        $pesoAtual = $pesos->last()?->peso;

        $inicioPeso = $pesos
            ->filter(fn (HistoricoPeso $registro) => $registro->registrado_em->gte($inicioPeriodo))
            ->first()?->peso;

        $variacaoPeso = ($pesoAtual !== null && $inicioPeso !== null)
            ? round($pesoAtual - $inicioPeso, 1)
            : null;

        $mediaSemanal = $pesos
            ->filter(fn (HistoricoPeso $registro) => $registro->registrado_em->gte($hoje->copy()->subDays(7)))
            ->avg('peso');

        $tendencia = match (true) {
            $variacaoPeso === null => 'Sem dados',
            $variacaoPeso < -0.1 => 'Tendência de Queda',
            $variacaoPeso > 0.1 => 'Tendência de Alta',
            default => 'Peso Estável',
        };

        return response()->json([
            'data' => [
                'pesoAtual' => $pesoAtual,
                'variacaoPeso' => $variacaoPeso,
                'inicioPeso' => $inicioPeso,
                'mediaSemanal' => $mediaSemanal !== null ? round($mediaSemanal, 1) : null,
                'tendencia' => $tendencia,
                'treinosNoMes' => $treinosNoMes,
                'variacaoTreinos' => $treinosNoMes - $treinosMesAnterior,
                'cargaMaxima' => $cargaMaxima,
                'variacaoCarga' => $variacaoCarga,
                'totalTreinos' => $datasSessoes->count(),
            ],
        ]);
    }

    /* ===================================================== */
    /* GRÁFICO DE CARGAS (radar)                              */
    /* GET /dashboard/progresso/cargas?dias=30&limite=6       */
    /* Retorna: [{ nome, cargaInicial, cargaAtual }]          */
    /* ===================================================== */
    public function cargas(Request $request): JsonResponse
    {
        $limite = $this->limite($request, self::EXERCICIOS_PADRAO, self::EXERCICIOS_MAXIMO);
        $series = $this->seriesDoUsuario($this->usuarioId(), $this->inicioPeriodo($request));

        $dados = $this->sessoesPorExercicio($series)
            ->map(function (array $exercicio) {
                // Considera só as sessões em que houve carga (ignora flexão, prancha etc.)
                $comCarga = $exercicio['sessoes']
                    ->filter(fn (Collection $sessao) => $sessao->max('peso') > 0)
                    ->values();

                if ($comCarga->isEmpty()) {
                    return null;
                }

                return [
                    'nome' => $exercicio['nome'],
                    'cargaInicial' => (float) $comCarga->first()->max('peso'),
                    'cargaAtual' => (float) $comCarga->last()->max('peso'),
                    'sessoes' => $comCarga->count(),
                ];
            })
            ->filter()
            ->sortByDesc('sessoes')
            ->take($limite)
            ->map(fn (array $item) => Arr::except($item, 'sessoes'))
            ->values();

        return response()->json(['data' => $dados]);
    }

    /* ===================================================== */
    /* GRÁFICO DE SÉRIES (barras)                             */
    /* GET /dashboard/progresso/series?dias=30&limite=6       */
    /* Retorna: [{ nome, seriesIniciais, seriesAtuais }]      */
    /* ===================================================== */
    public function series(Request $request): JsonResponse
    {
        $limite = $this->limite($request, self::EXERCICIOS_PADRAO, self::EXERCICIOS_MAXIMO);
        $series = $this->seriesDoUsuario($this->usuarioId(), $this->inicioPeriodo($request));

        $dados = $this->sessoesPorExercicio($series)
            ->map(fn (array $exercicio) => [
                'nome' => $exercicio['nome'],
                'seriesIniciais' => $exercicio['sessoes']->first()->count(),
                'seriesAtuais' => $exercicio['sessoes']->last()->count(),
                'sessoes' => $exercicio['sessoes']->count(),
            ])
            ->sortByDesc('sessoes')
            ->take($limite)
            ->map(fn (array $item) => Arr::except($item, 'sessoes'))
            ->values();

        return response()->json(['data' => $dados]);
    }

    /* ===================================================== */
    /* GRÁFICO DE FREQUÊNCIA (barras por dia)                 */
    /* GET /dashboard/progresso/frequencia?dias=7             */
    /* Retorna: [{ dia, qtd }]                                */
    /* Até 7 dias o rótulo é o dia da semana (Seg, Ter...);   */
    /* acima disso, a data (dd/mm).                           */
    /* ===================================================== */
    public function frequencia(Request $request): JsonResponse
    {
        $dias = min(max((int) $request->query('dias', 7), 1), 31);

        $series = $this->seriesDoUsuario($this->usuarioId());

        // Sessões com ao menos uma série concluída, contadas por dia
        $sessoesPorDia = $series
            ->unique('sessao_id')
            ->groupBy(fn ($registro) => Carbon::parse($registro->iniciado_em)->toDateString())
            ->map(fn (Collection $sessoes) => $sessoes->count());

        $inicio = Carbon::today()->subDays($dias - 1);
        $dados = collect();

        for ($i = 0; $i < $dias; $i++) {
            $data = $inicio->copy()->addDays($i);

            $dados->push([
                'dia' => $dias <= 7
                    ? self::DIAS_SEMANA[$data->dayOfWeek]
                    : $data->format('d/m'),
                'qtd' => (int) ($sessoesPorDia[$data->toDateString()] ?? 0),
            ]);
        }

        return response()->json(['data' => $dados]);
    }

    /* ===================================================== */
    /* GRÁFICO DE PESO CORPORAL (linha)                       */
    /* GET /dashboard/progresso/peso?dias=30                  */
    /* Retorna: [{ data, valor }]                             */
    /* ===================================================== */
    public function peso(Request $request): JsonResponse
    {
        $dias = $this->dias($request);
        $desde = Carbon::today()->subDays($dias);
        $formato = $dias > 180 ? 'd/m/y' : 'd/m';

        $dados = HistoricoPeso::where('user_id', $this->usuarioId())
            ->whereDate('registrado_em', '>=', $desde->toDateString())
            ->orderBy('registrado_em')
            ->get()
            ->map(fn (HistoricoPeso $registro) => [
                'data' => $registro->registrado_em->format($formato),
                'valor' => (float) $registro->peso,
            ])
            ->values();

        return response()->json(['data' => $dados]);
    }

    /**
     * Registra o peso de hoje (se já houver registro hoje, atualiza).
     * POST /dashboard/progresso/peso   body: { "peso": 82.5 }
     */
    public function registrarPeso(Request $request): JsonResponse
    {
        $dados = $request->validate([
            'peso' => ['required', 'numeric', 'min:1', 'max:500'],
        ]);

        $registro = HistoricoPeso::registrar($this->usuarioId(), (float) $dados['peso']);

        return response()->json([
            'data' => [
                'data' => $registro->registrado_em->format('d/m'),
                'valor' => (float) $registro->peso,
            ],
        ], 201);
    }

    /* ===================================================== */
    /* AUXILIARES                                             */
    /* ===================================================== */

    private function usuarioId(): int
    {
        $id = auth()->id();
        abort_if($id === null, 401, 'Não autenticado.');

        return $id;
    }

    private function limite(Request $request, int $padrao, int $maximo): int
    {
        return min(max((int) $request->query('limite', $padrao), 1), $maximo);
    }

    private function dias(Request $request): int
    {
        return min(max((int) $request->query('dias', self::DIAS_PADRAO), 1), self::DIAS_MAXIMO);
    }

    /** Início do período pedido. Sem o parâmetro "dias", considera todo o histórico. */
    private function inicioPeriodo(Request $request): ?Carbon
    {
        return $request->filled('dias')
            ? Carbon::today()->subDays($this->dias($request))
            : null;
    }

    /**
     * Todas as séries concluídas do usuário, da mais antiga para a mais recente.
     * Os nomes de tabela vêm das relações dos Models (nada fixo).
     */
    private function seriesDoUsuario(int $userId, ?Carbon $desde = null): Collection
    {
        $serie = new SerieExecutada();
        $relSessao = $serie->sessao();
        $relExercicioTreino = $serie->exercicioTreino();
        $exercicio = new Exercicio();

        $sessaoTabela = $relSessao->getRelated()->getTable();
        $exercicioTreinoTabela = $relExercicioTreino->getRelated()->getTable();
        $exercicioTabela = $exercicio->getTable();

        return SerieExecutada::query()
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
                $exercicioTabela,
                $exercicio->getQualifiedKeyName(),
                '=',
                "{$exercicioTreinoTabela}.exercicio_id"
            )
            ->where("{$sessaoTabela}.".self::COLUNA_USUARIO_SESSAO, $userId)
            ->where($serie->qualifyColumn('concluida'), true)
            ->when($desde, fn ($consulta) => $consulta->where("{$sessaoTabela}.iniciado_em", '>=', $desde))
            ->orderBy("{$sessaoTabela}.iniciado_em")
            ->get([
                "{$exercicioTreinoTabela}.exercicio_id as exercicio_id",
                "{$exercicioTabela}.nome as exercicio_nome",
                $relSessao->getQualifiedOwnerKeyName().' as sessao_id',
                "{$sessaoTabela}.iniciado_em as iniciado_em",
                $serie->qualifyColumn('peso').' as peso',
                $serie->qualifyColumn('repeticoes').' as repeticoes',
            ]);
    }

    /**
     * Agrupa as séries por exercício e, dentro de cada um, por sessão (em ordem cronológica).
     * Formato: [exercicio_id => ['nome' => ..., 'sessoes' => [ [séries da sessão 1], [séries da sessão 2], ... ]]]
     */
    private function sessoesPorExercicio(Collection $series): Collection
    {
        return $series
            ->groupBy('exercicio_id')
            ->map(fn (Collection $doExercicio) => [
                'nome' => $doExercicio->first()->exercicio_nome,
                'sessoes' => $doExercicio
                    ->groupBy('sessao_id')
                    ->sortBy(fn (Collection $sessao) => $sessao->first()->iniciado_em)
                    ->values(),
            ]);
    }
}