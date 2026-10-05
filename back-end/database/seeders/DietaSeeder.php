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
        $hipertrofia = ObjetivoDieta::where('nome', 'Ganho de peso')->value('id');
        $intermediario = NivelDieta::where('nome', 'Intermediário')->value('id');

        Dieta::firstOrCreate(
            ['nome' => 'Dieta de ganho de massa'],
            [
                'objetivo_id' => $hipertrofia,
                'nivel_id' => $intermediario,
                'descricao' => 'Dieta padrão para hipertrofia, nível intermediário.',
            ]
        );
    }
}