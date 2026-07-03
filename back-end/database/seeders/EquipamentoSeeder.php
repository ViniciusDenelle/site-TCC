<?php

namespace Database\Seeders;

use App\Models\Equipamento;
use Illuminate\Database\Seeder;

class EquipamentoSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            'Barra',
            'Barra EZ',
            'Halter',
            'Banco',
            'Máquina',
            'Polia',
            'Smith',
            'Peso corporal',
            'Kettlebell',
            'Elástico',
            'Corda',
            'Medicine Ball',
            'Anilhas',
            'TRX',
            'Step',
            'Caixa',
            'Bola suíça',
        ] as $equipamento) {
            Equipamento::firstOrCreate([
                'nome' => $equipamento
            ]);
        }
    }
}