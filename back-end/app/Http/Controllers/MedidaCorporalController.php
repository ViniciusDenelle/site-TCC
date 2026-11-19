<?php

namespace App\Http\Controllers;

use App\Models\MedidaCorporal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class MedidaCorporalController extends Controller
{
    // Última medição de cada tipo (cintura, peito, braço...)
    public function index(Request $request)
    {
        $medidas = MedidaCorporal::where('user_id', $request->user()->id)
            ->orderByDesc('data')
            ->orderByDesc('id')
            ->get()
            ->unique('tipo')
            ->values();

        return response()->json(['data' => $medidas]);
    }

    // Registra uma ou várias medidas de uma vez, na mesma data
    public function store(Request $request)
    {
        $dados = $request->validate([
            'data' => ['nullable', 'date', 'before_or_equal:today'],
            'medidas' => ['required', 'array', 'min:1'],
            'medidas.*.tipo' => ['required', Rule::in(MedidaCorporal::TIPOS)],
            'medidas.*.valor' => ['required', 'numeric', 'min:0.1', 'max:300'],
        ]);

        $data = $dados['data'] ?? now()->toDateString();

        DB::transaction(function () use ($dados, $request, $data) {
            foreach ($dados['medidas'] as $medida) {
                MedidaCorporal::create([
                    'user_id' => $request->user()->id,
                    'tipo' => $medida['tipo'],
                    'valor' => $medida['valor'],
                    'data' => $data,
                ]);
            }
        });

        return response()->json(['mensagem' => 'Medidas registradas com sucesso'], 201);
    }
}