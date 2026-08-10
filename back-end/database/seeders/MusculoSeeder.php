<?php

namespace Database\Seeders;

use App\Models\Musculo;
use Illuminate\Database\Seeder;

class MusculoSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            'Peitoral',
            'Dorsais',
            'Trapézio',
            'Deltoide anterior',
            'Deltoide lateral',
            'Deltoide posterior',
            'Bíceps',
            'Tríceps',
            'Antebraço',
            'Quadríceps',
            'Posteriores',
            'Glúteos',
            'Panturrilhas',
            'Abdômen',
            'Oblíquos',
            'Lombar',
            'Adutores',
            'Abdutores',
        ] as $musculo) {
            Musculo::firstOrCreate([
                'nome' => $musculo
            ]);
        }
    }
}