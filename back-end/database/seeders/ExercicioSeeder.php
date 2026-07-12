<?php

namespace Database\Seeders;

use App\Models\CategoriaExercicio;
use App\Models\Equipamento;
use App\Models\Exercicio;
use App\Models\Foco;
use App\Models\Musculo;
use App\Models\NivelExercicio;
use App\Models\TipoExercicio;
use Illuminate\Database\Seeder;

class ExercicioSeeder extends Seeder
{
    public function run(): void
    {
        $composto = TipoExercicio::where('nome', 'Composto')->first()->id;
        $isolado = TipoExercicio::where('nome', 'Isolado')->first()->id;

        $iniciante = NivelExercicio::where('nome', 'Iniciante')->first()->id;
        $intermediario = NivelExercicio::where('nome', 'Intermediário')->first()->id;

        $hipertrofia = Foco::where('nome', 'Hipertrofia')->first()->id;

        $exercicios = [
            [
                'nome' => 'Supino reto',
                'descricao' => 'Exercício composto para peitoral, tríceps e deltoide anterior.',
                'tipo_id' => $composto,
                'nivel_id' => $iniciante,
                'foco_id' => $hipertrofia,

                'musculos' => [
                    ['Peitoral', 1],
                    ['Tríceps', 2],
                    ['Deltoide anterior', 2],
                ],

                'equipamentos' => [
                    'Barra',
                    'Banco',
                ]
            ],

            [
                'nome' => 'Agachamento livre',
                'descricao' => 'Exercício composto para quadríceps, glúteos e posteriores.',
                'tipo_id' => $composto,
                'nivel_id' => $intermediario,
                'foco_id' => $hipertrofia,

                'musculos' => [
                    ['Quadríceps', 1],
                    ['Glúteos', 2],
                    ['Posteriores', 2],
                ],

                'equipamentos' => [
                    'Barra',
                ]
            ],

            [
                'nome' => 'Levantamento terra',
                'descricao' => 'Exercício composto para costas, glúteos e posteriores.',
                'tipo_id' => $composto,
                'nivel_id' => $intermediario,
                'foco_id' => $hipertrofia,

                'musculos' => [
                    ['Dorsais', 1],
                    ['Glúteos', 2],
                    ['Posteriores', 2],
                    ['Trapézio', 2],
                    ['Lombar', 2],
                ],

                'equipamentos' => [
                    'Barra',
                ]
            ],

            [
                'nome' => 'Desenvolvimento militar',
                'descricao' => 'Exercício para ombros.',
                'tipo_id' => $composto,
                'nivel_id' => $iniciante,
                'foco_id' => $hipertrofia,

                'musculos' => [
                    ['Deltoide anterior', 1],
                    ['Tríceps', 2],
                ],

                'equipamentos' => [
                    'Barra',
                ]
            ],

            [
                'nome' => 'Remada curvada',
                'descricao' => 'Exercício para dorsais.',
                'tipo_id' => $composto,
                'nivel_id' => $intermediario,
                'foco_id' => $hipertrofia,

                'musculos' => [
                    ['Dorsais', 1],
                    ['Trapézio', 2],
                    ['Bíceps', 2],
                ],

                'equipamentos' => [
                    'Barra',
                ]
            ],

            [
                'nome' => 'Puxada frontal',
                'descricao' => 'Exercício para dorsais na polia.',
                'tipo_id' => $composto,
                'nivel_id' => $iniciante,
                'foco_id' => $hipertrofia,

                'musculos' => [
                    ['Dorsais', 1],
                    ['Bíceps', 2],
                ],

                'equipamentos' => [
                    'Polia',
                ]
            ],

            [
                'nome' => 'Rosca direta',
                'descricao' => 'Exercício isolado para bíceps.',
                'tipo_id' => $isolado,
                'nivel_id' => $iniciante,
                'foco_id' => $hipertrofia,

                'musculos' => [
                    ['Bíceps', 1],
                    ['Antebraço', 2],
                ],

                'equipamentos' => [
                    'Barra EZ',
                ]
            ],

            [
                'nome' => 'Tríceps pulley',
                'descricao' => 'Exercício isolado para tríceps.',
                'tipo_id' => $isolado,
                'nivel_id' => $iniciante,
                'foco_id' => $hipertrofia,

                'musculos' => [
                    ['Tríceps', 1],
                ],

                'equipamentos' => [
                    'Polia',
                ]
            ],

            [
                'nome' => 'Elevação lateral',
                'descricao' => 'Exercício para deltoide lateral.',
                'tipo_id' => $isolado,
                'nivel_id' => $iniciante,
                'foco_id' => $hipertrofia,

                'musculos' => [
                    ['Deltoide lateral', 1],
                ],

                'equipamentos' => [
                    'Halter',
                ]
            ],

            [
                'nome' => 'Leg press',
                'descricao' => 'Exercício para quadríceps.',
                'tipo_id' => $composto,
                'nivel_id' => $iniciante,
                'foco_id' => $hipertrofia,

                'musculos' => [
                    ['Quadríceps', 1],
                    ['Glúteos', 2],
                    ['Posteriores', 2],
                ],

                'equipamentos' => [
                    'Máquina',
                ]
            ],
        ];

        foreach ($exercicios as $dados) {

            $musculos = $dados['musculos'];
            $equipamentos = $dados['equipamentos'];

            unset($dados['musculos'], $dados['equipamentos']);

            $exercicio = Exercicio::create($dados);

            foreach ($musculos as [$nome, $tipo]) {

                $musculo = Musculo::where('nome', $nome)->first();

                $exercicio->musculos()->attach(
                    $musculo->id,
                    ['tipo' => $tipo]
                );
            }

            foreach ($equipamentos as $nome) {

                $equipamento = Equipamento::where('nome', $nome)->first();

                $exercicio->equipamentos()->attach($equipamento->id);
            }
        }
    }
}