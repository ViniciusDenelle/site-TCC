<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function() {
    Route::post('/login', 'login')
    ->name('login');
    Route::post('/cadastro', 'cadastro')
    ->name('cadastro');
    Route::post('/cadastroEmail', 'cadastroEmail')
    ->name('cadastroEmail');
});
