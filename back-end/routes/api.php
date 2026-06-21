<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsuarioController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/usuario', [UsuarioController::class, 'fetch']);
    Route::get('/usuario', [UsuarioController::class, 'logout']);
});

Route::controller(AuthController::class)->group(function() {
    Route::post('/login', 'login');
    Route::post('/recuperar-senha', 'recuperarSenha');
    Route::post('/cadastro', 'cadastro');
    Route::post('/cadastroEmail', 'cadastroEmail');
});