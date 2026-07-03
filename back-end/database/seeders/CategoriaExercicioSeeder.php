<?php

namespace Database\Seeders;

use App\Models\CategoriaExercicio;
use Illuminate\Database\Seeder;

class CategoriaExercicioSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            'Composto',
            'Isolado',
        ] as $categoria) {
            CategoriaExercicio::firstOrCreate([
                'nome' => $categoria
            ]);
        }
    }
}