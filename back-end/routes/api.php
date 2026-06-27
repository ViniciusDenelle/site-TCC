<?php

use App\Http\Controllers\FichaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsuarioController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/usuario', [UsuarioController::class, 'fetch']);
    Route::get('/usuario', [UsuarioController::class, 'logout']);

    Route::prefix('dashboard')->group(function() {
        // treinos 
        Route::prefix('treinos')->group(function() {

            // ficha 
            Route::prefix('ficha')->controller(FichaController::class)->group(function() {
                Route::post('/', 'create');
                Route::get('/{ficha}', 'show');
                Route::get('/', 'fetch');
                Route::put('/{ficha}', 'update');
                Route::delete('/{ficha}', 'delete');
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