<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\TipoTreino;
use App\Models\Treino;
use App\Models\Exercicio;
use App\Models\NivelExercicio;
use App\Models\Foco;
use App\Models\ExercicioTreino;
use Illuminate\Database\Seeder;

class TreinoSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'vinicius@gmail.com')->firstOrFail();

        $treinos = [

            [
                'nome' => 'Push A',
                'descricao' => 'Treino para peitoral, ombros e tríceps.',
                'foco' => 'Hipertrofia',
                'nivel' => 'Intermediário',
                'tipo' => 'Musculação',

                'exercicios' => [
                    [
                        'nome' => 'Supino reto',
                        'sets' => 4,
                        'reps' => [6, 8],
                        'peso' => 40,
                        'descanso' => 120,
                    ],
                    [
                        'nome' => 'Desenvolvimento militar',
                        'sets' => 3,
                        'reps' => [8, 10],
                        'peso' => 22,
                        'descanso' => 90,
                    ],
                    [
                        'nome' => 'Tríceps pulley',
                        'sets' => 3,
                        'reps' => [10, 12],
                        'peso' => 25,
                        'descanso' => 60,
                    ],
                ],
            ],

            [
                'nome' => 'Pull A',
                'descricao' => 'Treino para costas e bíceps.',
                'foco' => 'Hipertrofia',
                'nivel' => 'Intermediário',
                'tipo' => 'Musculação',

                'exercicios' => [
                    [
                        'nome' => 'Puxada frontal',
                        'sets' => 4,
                        'reps' => [8, 10],
                        'peso' => 45,
                        'descanso' => 90,
                    ],
                    [
                        'nome' => 'Remada curvada',
                        'sets' => 4,
                        'reps' => [6, 8],
                        'peso' => 55,
                        'descanso' => 120,
                    ],
                    [
                        'nome' => 'Rosca direta',
                        'sets' => 3,
                        'reps' => [10, 12],
                        'peso' => 18,
                        'descanso' => 60,
                    ],
                ],
            ],

            [
                'nome' => 'Leg Day',
                'descricao' => 'Treino completo para pernas.',
                'foco' => 'Hipertrofia',
                'nivel' => 'Intermediário',
                'tipo' => 'Musculação',

                'exercicios' => [
                    [
                        'nome' => 'Agachamento livre',
                        'sets' => 4,
                        'reps' => [5, 8],
                        'peso' => 70,
                        'descanso' => 180,
                    ],
                    [
                        'nome' => 'Leg press',
                        'sets' => 4,
                        'reps' => [10, 12],
                        'peso' => 180,
                        'descanso' => 120,
                    ],
                    [
                        'nome' => 'Levantamento terra',
                        'sets' => 3,
                        'reps' => [6, 8],
                        'peso' => 80,
                        'descanso' => 180,
                    ],
                ],
            ],

            [
                'nome' => 'Full Body',
                'descricao' => 'Treino para o corpo inteiro.',
                'foco' => 'Condicionamento',
                'nivel' => 'Iniciante',
                'tipo' => 'Musculação',

                'exercicios' => [
                    [
                        'nome' => 'Agachamento livre',
                        'sets' => 3,
                        'reps' => [10, 12],
                        'peso' => 30,
                        'descanso' => 90,
                    ],
                    [
                        'nome' => 'Supino reto',
                        'sets' => 3,
                        'reps' => [10, 12],
                        'peso' => 25,
                        'descanso' => 90,
                    ],
                    [
                        'nome' => 'Puxada frontal',
                        'sets' => 3,
                        'reps' => [10, 12],
                        'peso' => 30,
                        'descanso' => 90,
                    ],
                ],
            ],
        ];

        foreach ($treinos as $dadosTreino) {

            $treino = Treino::create([
                'user_id' => $user->id,

                'nome' => $dadosTreino['nome'],
                'descricao' => $dadosTreino['descricao'],

                'foco_id' => Foco::where(
                    'nome',
                    $dadosTreino['foco']
                )->value('id'),

                'nivel_id' => NivelExercicio::where(
                    'nome',
                    $dadosTreino['nivel']
                )->value('id'),

                'tipo_id' => TipoTreino::where(
                    'nome',
                    $dadosTreino['tipo']
                )->value('id'),
            ]);

            foreach ($dadosTreino['exercicios'] as $ordem => $dadosExercicio) {

                $exercicio = Exercicio::where(
                    'nome',
                    $dadosExercicio['nome']
                )->firstOrFail();

                ExercicioTreino::create([
                    'treino_id' => $treino->id,
                    'exercicio_id' => $exercicio->id,

                    'ordem' => $ordem + 1,

                    'sets' => $dadosExercicio['sets'],
                    'repeticoes_minimas' => $dadosExercicio['reps'][0],
                    'repeticoes_maximas' => $dadosExercicio['reps'][1],
                    'peso' => $dadosExercicio['peso'],
                    'descanso' => $dadosExercicio['descanso'],
                ]);
            }
        }
    }
}
