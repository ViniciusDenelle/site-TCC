<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exercicio;

class ExercicioSeeder extends Seeder
{
    public function run(): void
    {
        $exercicios = [
            [
                'nome' => 'Supino reto',
                'descricao' => 'Exercício composto para peitoral, tríceps e deltoide anterior.'
            ],
            [
                'nome' => 'Agachamento livre',
                'descricao' => 'Exercício composto para quadríceps, glúteos e posteriores.'
            ],
            [
                'nome' => 'Levantamento terra',
                'descricao' => 'Exercício composto para costas, glúteos e posteriores de coxa.'
            ],
            [
                'nome' => 'Desenvolvimento militar',
                'descricao' => 'Exercício para ombros com foco no deltoide.'
            ],
            [
                'nome' => 'Remada curvada',
                'descricao' => 'Exercício para dorsais, trapézio e bíceps.'
            ],
            [
                'nome' => 'Puxada frontal',
                'descricao' => 'Exercício para dorsais realizado na polia alta.'
            ],
            [
                'nome' => 'Rosca direta',
                'descricao' => 'Exercício isolado para bíceps.'
            ],
            [
                'nome' => 'Tríceps pulley',
                'descricao' => 'Exercício isolado para tríceps na polia.'
            ],
            [
                'nome' => 'Elevação lateral',
                'descricao' => 'Exercício para deltoide lateral.'
            ],
            [
                'nome' => 'Leg press',
                'descricao' => 'Exercício para quadríceps, glúteos e posteriores.'
            ],
        ];

        foreach ($exercicios as $exercicio) {
            Exercicio::create($exercicio);
        }
    }
}