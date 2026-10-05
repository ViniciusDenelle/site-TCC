<?php

namespace Database\Seeders;

use App\Models\NivelDieta;
use Illuminate\Database\Seeder;

class NivelDietaSeeder extends Seeder
{
    public function run(): void
    {
        $niveis = [
            'Iniciante',
            'Intermediário',
            'Avançado',
        ];

        foreach ($niveis as $nome) {
            NivelDieta::firstOrCreate(['nome' => $nome]);
        }
    }
}