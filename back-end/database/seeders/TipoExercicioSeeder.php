<?php

namespace Database\Seeders;

use App\Models\TipoExercicio;
use Illuminate\Database\Seeder;

class TipoExercicioSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            'Composto',
            'Isolado',
        ] as $tipo) {
            TipoExercicio::firstOrCreate([
                'nome' => $tipo
            ]);
        }
    }
}