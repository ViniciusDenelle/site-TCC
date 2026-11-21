<?php

namespace App\Http\Controllers;

use App\Models\Exercicio;
use App\Models\RegistroPeso;
use App\Models\SerieExecutada;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProgressoController extends Controller
{
    // CONFIRA: coluna da tabela de sessões que guarda o dono do treino
    private const COLUNA_USUARIO_SESSAO = 'user_id';

    private string $serie;
    private string $sessao;
    private string $exTreino;
    private string $exercicio;

    /**
     * Séries concluídas do usuário logado, com joins já feitos.
     */
    private function base(?Carbon $desde = null, ?Carbon $ate = null): Builder
    {
        $userId = auth()->id();
        abort_if($userId === null, 401, 'Não autenticado.');

        $serie = new SerieExecutada();
        $relSessao = $serie->sessao();
        $relExTreino = $serie->exercicioTreino();

        $this->serie = $serie->getTable();
        $this->sessao = $relSessao->getRelated()->getTable();
        $this->exTreino = $relExTreino->getRelated()->getTable();
        $this->exercicio = (new Exercicio())->getTable();

        $q = SerieExecutada::query()
            ->join(
                $this->exTreino,
                $relExTreino->getQualifiedOwnerKeyName(),
                '=',
                $relExTreino->getQualifiedForeignKeyName()
            )
            ->join(
                $this->sessao,
                $relSessao->getQualifiedOwnerKeyName(),
                '=',
                $relSessao->getQualifiedForeignKeyName()
            )
            ->join(
                $this->exercicio,
                "{$this->exTreino}.exercicio_id",
                '=',
                "{$this->exercicio}.id"
            )
            ->where("{$this->sessao}.".self::COLUNA_USUARIO_SESSAO, $userId)
            ->where("{$this->serie}.concluida", true);

        if ($desde) {
            $q->where("{$this->sessao}.iniciado_em", '>=', $desde);
        }
        if ($ate) {
            $q->where("{$this->sessao}.iniciado_em", '<', $ate);
        }

        return $q;
    }

    private function dias(Request $request): int
    {
        return min(max((int) $request->query('dias', 30), 1), 366);
    }

    private function contarTreinos(?Carbon $desde, ?Carbon $ate): int
    {
        $q = $this->base($desde, $ate);

        return (int) $q->distinct()->count("{$this->sessao}.id");
    }

    private function cargaMaxima(?Carbon $desde, ?Carbon $ate): ?float
    {
        $q = $this->base($desde, $ate);
        $max = $q->max("{$this->serie}.peso");

        return $max !== null && $max > 0 ? (float) $max : null;
    }

    /**
     * Por exercício: primeira x última sessão do período.
     */
    private function evolucaoPorExercicio(int $dias)
    {
        $inicio = now()->subDays($dias);

        $q = $this->base($inicio);
        $linhas = $q->get([
            "{$this->sessao}.id as sessao_id",
            "{$this->sessao}.iniciado_em as data",
            "{$this->exTreino}.exercicio_id as exercicio_id",
            "{$this->exercicio}.nome as nome",
            "{$this->serie}.peso as peso",
            "{$this->serie}.repeticoes as repeticoes",
        ]);

        return $linhas
            ->groupBy('exercicio_id')
            ->map(function ($grupo) {
                $sessoes = $grupo->groupBy('sessao_id')
                    ->sortBy(fn ($s) => $s->first()->data);

                $primeira = $sessoes->first();
                $ultima = $sessoes->last();

                return [
                    'nome' => $grupo->first()->nome,
                    'sessoes' => $sessoes->count(),
                    'cargaInicial' => (float) $primeira->max('peso'),
                    'cargaAtual' => (float) $ultima->max('peso'),
                    'seriesIniciais' => (int) $primeira->count(),
                    'seriesAtuais' => (int) $ultima->count(),
                    'repeticoesIniciais' => (int) $primeira->sum('repeticoes'),
                    'repeticoesAtuais' => (int) $ultima->sum('repeticoes'),
                ];
            })
            ->sortByDesc('sessoes')
            ->values();
    }

    /* =====================================================
       GET /progresso/resumo?dias=30
    ===================================================== */
    public function resumo(Request $request): JsonResponse
    {
        $userId = auth()->id();
        abort_if($userId === null, 401, 'Não autenticado.');

        $dias = $this->dias($request);
        $agora = now();
        $inicio = $agora->copy()->subDays($dias);
        $inicioAnterior = $inicio->copy()->subDays($dias);

        // Treinos
        $treinosAtual = $this->contarTreinos($inicio, null);
        $treinosAnterior = $this->contarTreinos($inicioAnterior, $inicio);
        $totalTreinos = $this->contarTreinos(null, null);

        // Carga máxima
        $cargaAtual = $this->cargaMaxima($inicio, null);
        $cargaAnterior = $this->cargaMaxima($inicioAnterior, $inicio);
        $variacaoCarga = ($cargaAtual !== null && $cargaAnterior !== null)
            ? round($cargaAtual - $cargaAnterior, 1)
            : null;

        // Peso
        $registros = RegistroPeso::where('user_id', $userId)
            ->where('registrado_em', '>=', $inicio->toDateString())
            ->orderBy('registrado_em')
            ->get();

        $ultimo = RegistroPeso::where('user_id', $userId)
            ->orderByDesc('registrado_em')
            ->first();

        // Peso inicial = primeiro registro de todos os tempos (não só do período)
        $primeiroRegistro = RegistroPeso::where('user_id', $userId)
            ->orderBy('registrado_em')
            ->orderBy('id')
            ->first();

        $variacaoPeso = null;
        $mediaSemanal = null;

        if ($registros->count() >= 2) {
            $primeiro = $registros->first();
            $final = $registros->last();

            $variacaoPeso = round($final->peso - $primeiro->peso, 1);

            $diasEntre = $primeiro->registrado_em->diffInDays($final->registrado_em);
            $semanas = max($diasEntre / 7, 1);
            $mediaSemanal = round($variacaoPeso / $semanas, 2);
        }

        $tendencia = match (true) {
            $variacaoPeso === null => 'Sem dados',
            $variacaoPeso < -0.2 => 'Em queda',
            $variacaoPeso > 0.2 => 'Em alta',
            default => 'Estável',
        };

        return response()->json([
            'data' => [
                'pesoAtual' => $ultimo?->peso,
                'inicioPeso' => $primeiroRegistro?->peso,
                'variacaoPeso' => $variacaoPeso,
                'mediaSemanal' => $mediaSemanal,
                'tendencia' => $tendencia,
                'treinosNoMes' => $treinosAtual,
                'variacaoTreinos' => $treinosAtual - $treinosAnterior,
                'totalTreinos' => $totalTreinos,
                'cargaMaxima' => $cargaAtual,
                'variacaoCarga' => $variacaoCarga,
            ],
        ]);
    }

    /* =====================================================
       GET /progresso/peso?dias=30
    ===================================================== */
    public function peso(Request $request): JsonResponse
    {
        $userId = auth()->id();
        abort_if($userId === null, 401, 'Não autenticado.');

        $inicio = now()->subDays($this->dias($request))->toDateString();

        $registros = RegistroPeso::where('user_id', $userId)
            ->where('registrado_em', '>=', $inicio)
            ->orderBy('registrado_em')
            ->get();

        // Ponto de partida: último registro ANTES do período. Assim a linha do
        // gráfico se forma mesmo quando há só um registro dentro do período.
        $anterior = RegistroPeso::where('user_id', $userId)
            ->where('registrado_em', '<', $inicio)
            ->orderByDesc('registrado_em')
            ->first();

        if ($anterior) {
            $registros->prepend($anterior);
        }

        $historico = $registros
            ->map(fn ($r) => [
                'data' => $r->registrado_em->format('d/m'),
                'valor' => $r->peso,
            ])
            ->values();

        return response()->json(['data' => $historico]);
    }

    /* =====================================================
       GET /progresso/frequencia?dias=7
    ===================================================== */
    public function frequencia(Request $request): JsonResponse
    {
        $dias = min(max((int) $request->query('dias', 7), 1), 31);
        $inicio = today()->subDays($dias - 1);

        $q = $this->base($inicio);
        $sessoes = $q->distinct()->get([
            "{$this->sessao}.id as sessao_id",
            "{$this->sessao}.iniciado_em as data",
        ]);

        $porDia = $sessoes
            ->groupBy(fn ($s) => Carbon::parse($s->data)->toDateString())
            ->map->count();

        $nomes = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

        $resultado = [];
        for ($i = 0; $i < $dias; $i++) {
            $d = $inicio->copy()->addDays($i);
            $resultado[] = [
                'dia' => $nomes[$d->dayOfWeek],
                'qtd' => $porDia[$d->toDateString()] ?? 0,
            ];
        }

        return response()->json(['data' => $resultado]);
    }

    /* =====================================================
       GET /progresso/cargas?dias=30
    ===================================================== */
    public function cargas(Request $request): JsonResponse
    {
        $dados = $this->evolucaoPorExercicio($this->dias($request))
            ->filter(fn ($e) => $e['cargaAtual'] > 0)
            ->take(6)
            ->map(fn ($e) => [
                'nome' => $e['nome'],
                'cargaInicial' => $e['cargaInicial'],
                'cargaAtual' => $e['cargaAtual'],
            ])
            ->values();

        return response()->json(['data' => $dados]);
    }

    /* =====================================================
       GET /progresso/series?dias=30
       Quantidade de séries concluídas: primeira x última sessão do período
    ===================================================== */
    public function series(Request $request): JsonResponse
    {
        $dados = $this->evolucaoPorExercicio($this->dias($request))
            ->take(6)
            ->map(fn ($e) => [
                'nome' => $e['nome'],
                'seriesIniciais' => $e['seriesIniciais'],
                'seriesAtuais' => $e['seriesAtuais'],
            ])
            ->values();

        return response()->json(['data' => $dados]);
    }

    /* =====================================================
       GET /progresso/repeticoes?dias=30
    ===================================================== */
    public function repeticoes(Request $request): JsonResponse
    {
        $dados = $this->evolucaoPorExercicio($this->dias($request))
            ->take(6)
            ->map(fn ($e) => [
                'nome' => $e['nome'],
                'repeticoesIniciais' => $e['repeticoesIniciais'],
                'repeticoesAtuais' => $e['repeticoesAtuais'],
            ])
            ->values();

        return response()->json(['data' => $dados]);
    }

    /* =====================================================
       POST /progresso/peso   { peso: 82.5, data?: "2026-10-01" }
    ===================================================== */
    public function registrarPeso(Request $request): JsonResponse
    {
        $userId = auth()->id();
        abort_if($userId === null, 401, 'Não autenticado.');

        $validado = $request->validate([
            'peso' => ['required', 'numeric', 'min:1', 'max:700'],
            'data' => ['nullable', 'date', 'before_or_equal:today'],
        ]);

        $data = isset($validado['data'])
            ? Carbon::parse($validado['data'])->toDateString()
            : today()->toDateString();

        // Primeiro registro do usuário: guarda antes o peso do cadastro (perfil)
        // como ponto de partida, numa data anterior. Esse vira o "peso inicial".
        $primeiroRegistro = ! RegistroPeso::where('user_id', $userId)->exists();
        $pesoCadastro = auth()->user()->perfil?->peso;

        if ($primeiroRegistro && $pesoCadastro) {
            $dataBase = auth()->user()->created_at?->toDateString() ?? $data;

            if ($dataBase >= $data) {
                $dataBase = Carbon::parse($data)->subDay()->toDateString();
            }

            RegistroPeso::create([
                'user_id' => $userId,
                'peso' => $pesoCadastro,
                'registrado_em' => $dataBase,
            ]);
        }

        // 1 registro por dia: se já existe, atualiza
        $registro = RegistroPeso::updateOrCreate(
            ['user_id' => $userId, 'registrado_em' => $data],
            ['peso' => $validado['peso']]
        );

        // Mantém o peso do perfil igual ao registro MAIS RECENTE. Um registro com
        // data antiga não mexe no perfil. A home (/api/usuario) lê perfil_usuarios.peso,
        // que é uma coluna inteira, por isso o arredondamento.
        $maisRecente = RegistroPeso::where('user_id', $userId)
            ->orderByDesc('registrado_em')
            ->orderByDesc('id')
            ->first();

        if ($maisRecente && $maisRecente->id === $registro->id) {
            auth()->user()->perfil()->update([
                'peso' => (int) round($registro->peso),
            ]);
        }

        return response()->json(['data' => $registro], 201);
    }
}