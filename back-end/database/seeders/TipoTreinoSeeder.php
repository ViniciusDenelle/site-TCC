<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoTreino;

class TipoTreinoSeeder extends Seeder
{
    public function run(): void
    {
        $tipos = [
            ['nome' => 'Musculação'],
            ['nome' => 'Calistenia'],
            ['nome' => 'CrossFit'],
            ['nome' => 'Powerlifting'],
            ['nome' => 'Levantamento Olímpico'],
            ['nome' => 'Funcional'],
            ['nome' => 'HIIT'],
            ['nome' => 'Cardio'],
            ['nome' => 'Corrida'],
            ['nome' => 'Ciclismo'],
            ['nome' => 'Natação'],
            ['nome' => 'Pilates'],
            ['nome' => 'Yoga'],
            ['nome' => 'Alongamento'],
            ['nome' => 'Mobilidade'],
            ['nome' => 'Treino em Casa'],
            ['nome' => 'Treino ao Ar Livre'],
            ['nome' => 'Reabilitação'],
            ['nome' => 'Esportivo'],
            ['nome' => 'Circuito'],
        ];

        foreach ($tipos as $tipo) {
            TipoTreino::firstOrCreate([
                'nome' => $tipo['nome'],
            ]);
        }
    }
}