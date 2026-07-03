<?php

namespace Database\Seeders;

use App\Models\NivelExercicio;
use Illuminate\Database\Seeder;

class NivelExercicioSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            'Iniciante',
            'Intermediário',
            'Avançado',
        ] as $nivel) {
            NivelExercicio::firstOrCreate([
                'nome' => $nivel
            ]);
        }
    }
}