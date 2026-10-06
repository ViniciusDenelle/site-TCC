<?php

namespace Database\Seeders;

use App\Models\Alimento;
use App\Models\Dieta;
use Illuminate\Database\Seeder;

class RefeicaoSeeder extends Seeder
{
    private const DIAS = [
        'domingo' => 0, 'segunda' => 1, 'terca' => 2, 'quarta' => 3,
        'quinta' => 4, 'sexta' => 5, 'sabado' => 6,
    ];

    public function run(): void
    {
        $dieta = Dieta::where('nome', 'Dieta de ganho de massa')->first();

        if (!$dieta) {
            return; // DietaSeeder precisa rodar antes
        }

        $refeicoesDados = [
            [
                'nome' => 'Café da manhã', 'dia' => 'segunda', 'horario' => '07:00', 'ordem' => 1,
                'alimentos' => [
                    ['nome' => 'Pão francês', 'gramas' => 100],
                    ['nome' => 'Queijo minas', 'gramas' => 30],
                    ['nome' => 'Ovo cozido', 'gramas' => 100],
                ],
            ],
            [
                'nome' => 'Shake proteico', 'dia' => 'segunda', 'horario' => '12:00', 'ordem' => 2,
                'alimentos' => [
                    ['nome' => 'Whey protein (pó)', 'gramas' => 30],
                    ['nome' => 'Leite desnatado', 'gramas' => 200],
                    ['nome' => 'Banana', 'gramas' => 100],
                ],
            ],
            [
                'nome' => 'Almoço', 'dia' => 'segunda', 'horario' => '13:00', 'ordem' => 3,
                'alimentos' => [
                    ['nome' => 'Peito de frango grelhado', 'gramas' => 150],
                    ['nome' => 'Arroz branco cozido', 'gramas' => 200],
                    ['nome' => 'Feijão carioca cozido', 'gramas' => 80],
                ],
            ],
            [
                'nome' => 'Pós-treino', 'dia' => 'segunda', 'horario' => '18:30', 'ordem' => 4,
                'alimentos' => [
                    ['nome' => 'Whey protein (pó)', 'gramas' => 30],
                    ['nome' => 'Batata doce cozida', 'gramas' => 260],
                ],
            ],
            [
                'nome' => 'Jantar', 'dia' => 'segunda', 'horario' => '20:00', 'ordem' => 5,
                'alimentos' => [
                    ['nome' => 'Peito de frango grelhado', 'gramas' => 150],
                    ['nome' => 'Batata doce cozida', 'gramas' => 130],
                ],
            ],
            [
                'nome' => 'Café da manhã', 'dia' => 'terca', 'horario' => '07:00', 'ordem' => 1,
                'alimentos' => [
                    ['nome' => 'Aveia em flocos', 'gramas' => 45],
                    ['nome' => 'Leite desnatado', 'gramas' => 200],
                    ['nome' => 'Banana', 'gramas' => 100],
                ],
            ],
            [
                'nome' => 'Almoço', 'dia' => 'terca', 'horario' => '13:00', 'ordem' => 2,
                'alimentos' => [
                    ['nome' => 'Peito de frango grelhado', 'gramas' => 150],
                    ['nome' => 'Arroz branco cozido', 'gramas' => 200],
                    ['nome' => 'Azeite de oliva', 'gramas' => 13],
                ],
            ],
            [
                'nome' => 'Jantar', 'dia' => 'terca', 'horario' => '20:00', 'ordem' => 3,
                'alimentos' => [
                    ['nome' => 'Ovo cozido', 'gramas' => 150],
                    ['nome' => 'Batata doce cozida', 'gramas' => 130],
                ],
            ],
        ];

        foreach ($refeicoesDados as $dadosRefeicao) {
            $alimentosDaRefeicao = $dadosRefeicao['alimentos'];
            $diaNumero = self::DIAS[$dadosRefeicao['dia']];

            $refeicao = $dieta->refeicoes()->firstOrCreate(
                [
                    'nome' => $dadosRefeicao['nome'],
                    'dia_semana' => $diaNumero,
                ],
                [
                    'horario' => $dadosRefeicao['horario'],
                    'ordem' => $dadosRefeicao['ordem'],
                ]
            );

            foreach ($alimentosDaRefeicao as $itemAlimento) {
                $alimento = Alimento::where('nome', $itemAlimento['nome'])->first();

                if (!$alimento) {
                    continue; // AlimentoSeeder precisa rodar antes
                }

                $refeicao->alimentos()->syncWithoutDetaching([
                    $alimento->id => ['quantidade_gramas' => $itemAlimento['gramas']],
                ]);
            }
        }
    }
}