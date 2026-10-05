<?php

namespace Database\Seeders;

use App\Models\ObjetivoDieta;
use Illuminate\Database\Seeder;

class ObjetivoDietaSeeder extends Seeder
{
    public function run(): void
    {
        $objetivos = [
            'Perda de peso',
            'Ganho de peso',
            'Manutenção',
            'Definição',
        ];

        foreach ($objetivos as $nome) {
            ObjetivoDieta::firstOrCreate(['nome' => $nome]);
        }
    }
}