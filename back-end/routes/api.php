<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;



Route::group(['middleware' =>'auth:sanctum'], function () {
    Route::get('/user', function(Request $request){
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::group([
        'prefix' => 'dashboard',
        'controller' => DashboardController::class
    ], function () {
        Route::post('/criar', 'criar');
        Route::put('/update/{item}', 'update');
        Route::delete('/delete/{item}', 'delete');
        Route::get('/index', 'index');
    });
});

Route::post('/login', [AuthController::class, 'login']);
