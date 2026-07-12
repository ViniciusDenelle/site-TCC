<?php

namespace Database\Seeders;

use App\Models\Foco;
use App\Models\TipoExercicio;
use Illuminate\Database\Seeder;

class FocoSeeder extends Seeder
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
            Foco::firstOrCreate([
                'nome' => $tipo
            ]);
        }
    }
}