<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validado = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);

        $usuario = User::create($validado);

        $usuarioToken = $usuario->createToken('main')->plainTextToken;

        return response()->json([
            'usuario' => $usuario,
            'usuarioToken' => $usuarioToken
        ]);
    }

    public function logout(Request $request)
    {
        // Auth::user()->currentAccessToken()->delete();

        return response([
            'mensagem' => 'sucesso'
        ]);
    }
}
