<?php

use App\Http\Controllers\AlimentoController;
use App\Http\Controllers\BadgeTreinoController;
use App\Http\Controllers\ExercicioController;
use App\Http\Controllers\FichaController;
use App\Http\Controllers\MedidaCorporalController;
use App\Http\Controllers\TreinoController;
use App\Http\Controllers\TreinoHistoricoController;
use App\Http\Controllers\treinosExecucaoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\DietaController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\ProgressoController;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/usuario', [UsuarioController::class, 'fetch']);
    Route::get('/logout', [UsuarioController::class, 'logout']);
    Route::put('/atualizarUsuario', [UsuarioController::class, 'update']);
    Route::apiResource('dietas', DietaController::class)->only(['index', 'store', 'show']);
    Route::prefix('dashboard')->group(function() {

        // progresso (gráficos)
        Route::prefix('progresso')->controller(ProgressoController::class)->group(function() {
            Route::get('resumo', 'resumo');
            Route::get('cargas', 'cargas');
            Route::get('series', 'series');
            Route::get('frequencia', 'frequencia');
            Route::get('peso', 'peso');
            Route::post('peso', 'registrarPeso');

            // medidas corporais (cintura, peito, braço...)
            Route::get('medidas', [MedidaCorporalController::class, 'index']);
            Route::post('medidas', [MedidaCorporalController::class, 'store']);
        });

        // treinos 
        Route::prefix('treinos')->group(function() {

            // ficha 
            Route::prefix('ficha')->controller(FichaController::class)->group(function() {
                Route::post('/', 'create');
                Route::get('/meus-criados', 'meusCriados');
                Route::get('/meus-adicionados', 'meusAdicionados');
                Route::get('/', 'fetch');
                Route::get('/{ficha}', 'show');
                Route::put('/{ficha}', 'update');
                Route::delete('/{ficha}', 'delete');
            });

            //treino 
            Route::prefix('treino')->controller(TreinoController::class)->group(function() {
                Route::post('/', 'store');
                Route::get('/meus-criados', 'meusCriados');
                Route::get('/meus-adicionados', 'meusAdicionados');
                Route::get('/{treino}/historico', 'historico');
                Route::get('/{treino}', 'show');
                Route::get('/', 'fetch');
                Route::put('/{treino}', 'update');
                Route::delete('/{treino}', 'delete');
            });

            Route::prefix('exercicio')->controller(ExercicioController::class)->group(function() {
                Route::post('', 'create');
                Route::get('/meus-criados', 'meusCriados');
                Route::get('/meus-adicionados', 'meusAdicionados');
                Route::get('/{exercicio}', 'show');
                Route::post('/adcionar/{exercicio}', 'adcionar');
                Route::get('/', 'fetch');
                Route::put('/{exercicio}', 'update');
                Route::delete('/{exercicio}', 'delete');
            });

            // execuções
            Route::controller(treinosExecucaoController::class)->group(function() {
                Route::post('executarTreino/{treino}', 'executarTreino');
            });

            // historico
            Route::prefix('historico')->controller(TreinoHistoricoController::class)->group(function() {
                Route::get('ficha/{ficha}', 'ficha');
                Route::get('treino/{treino}', 'treino');
                Route::get('exercicio/{exercicio}', 'exercicio');
            });

            // ranking
            Route::prefix('ranking')->controller(RankingController::class)->group(function() {
                Route::get('exercicios', 'exercicios');
                Route::get('exercicios/{exercicio}', 'exercicio');
            });

            Route::prefix('badges')->controller(BadgeTreinoController::class)->group(function(){
                Route::get('treino', 'treino');
                Route::get('exercicio', 'exercicio');
                Route::get('musculos', 'musculos');
                Route::get('equipamentos', 'equipamentos');
                Route::get('tiposExercicio', 'tiposExercicio');
                Route::get('tiposTreino', 'tiposTreino');
                Route::get('niveis', 'niveis');
                Route::get('focos', 'focos');
            });
        });

        Route::prefix('dietas')->group(function () {

            // badges de filtro (usados pelo front em /dashboard/dietas/niveis e /objetivos)
            Route::get('niveis', [DietaController::class, 'niveis']);
            Route::get('objetivos', [DietaController::class, 'objetivos']);

            Route::prefix('alimentos')->controller(AlimentoController::class)->group(function () {
                Route::get('/', 'fetch');
                Route::post('/', 'store');
                Route::get('/{alimento}', 'show');
            });
            Route::prefix('dieta')->controller(DietaController::class)->group(function () {
                Route::get('/', 'fetch');
                Route::get('/niveis', 'niveis');
                Route::get('/objetivos', 'objetivos');
                Route::post('/' ,'store');
                Route::get('/meus-criados', 'meusCriados');
                Route::get('/meus-adicionados', 'meusAdicionados');
                Route::get('/{dieta}', 'show');
                Route::put('/{dieta}', 'update');
                Route::post('/{dieta}/adicionar', 'adicionar');
                Route::delete('/{dieta}/adicionar', 'remover');
            });

        });
    });
});

Route::controller(AuthController::class)->group(function() {
    Route::post('/login', 'login');
    Route::post('/recuperar-senha', 'recuperarSenha');
    Route::post('/cadastro', 'cadastro');
    Route::post('/cadastroEmail', 'cadastroEmail');
});