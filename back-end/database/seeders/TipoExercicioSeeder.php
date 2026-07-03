<?php

namespace Database\Seeders;

use App\Models\TipoExercicio;
use Illuminate\Database\Seeder;

class TipoExercicioSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            'Hipertrofia',
            'Força',
            'Resistência',
            'Cardio',
            'Mobilidade',
            'Funcional',
            'Alongamento',
            'Potência',
        ] as $tipo) {
            TipoExercicio::firstOrCreate([
                'nome' => $tipo
            ]);
        }
    }
}