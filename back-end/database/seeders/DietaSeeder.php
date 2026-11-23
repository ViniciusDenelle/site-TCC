<?php

namespace Database\Seeders;

use App\Models\Dieta;
use App\Models\NivelDieta;
use App\Models\ObjetivoDieta;
use Illuminate\Database\Seeder;

class DietaSeeder extends Seeder
{
    public function run(): void
    {
        $intermediario = NivelDieta::where('nome', 'Intermediário')->value('id');

        Dieta::firstOrCreate(
            ['nome' => 'Dieta de ganho de massa'],
            [
                'nivel_id' => $intermediario,
                'descricao' => 'Dieta padrão para hipertrofia, nível intermediário.',
            ]
        );
    }
}