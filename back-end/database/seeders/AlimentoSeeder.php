<?php

namespace Database\Seeders;

use App\Models\Alimento;
use Illuminate\Database\Seeder;

class AlimentoSeeder extends Seeder
{
    public function run(): void
    {
        $alimentos = [
            [
                'nome' => 'Peito de frango grelhado',
                'porcao_descricao' => '1 filé médio',
                'porcao_gramas' => 150,
                'calorias' => 248,
                'proteinas' => 46.5,
                'carboidratos' => 0,
                'gorduras' => 5.4,
            ],
            [
                'nome' => 'Arroz branco cozido',
                'porcao_descricao' => '4 colheres de sopa',
                'porcao_gramas' => 100,
                'calorias' => 130,
                'proteinas' => 2.7,
                'carboidratos' => 28,
                'gorduras' => 0.3,
            ],
            [
                'nome' => 'Feijão carioca cozido',
                'porcao_descricao' => '1 concha média',
                'porcao_gramas' => 80,
                'calorias' => 61,
                'proteinas' => 3.8,
                'carboidratos' => 10.9,
                'gorduras' => 0.4,
            ],
            [
                'nome' => 'Ovo cozido',
                'porcao_descricao' => '1 unidade',
                'porcao_gramas' => 50,
                'calorias' => 78,
                'proteinas' => 6.5,
                'carboidratos' => 0.6,
                'gorduras' => 5.5,
            ],
            [
                'nome' => 'Aveia em flocos',
                'porcao_descricao' => '1 colher de sopa',
                'porcao_gramas' => 15,
                'calorias' => 58,
                'proteinas' => 2.5,
                'carboidratos' => 10,
                'gorduras' => 1,
            ],
            [
                'nome' => 'Banana',
                'porcao_descricao' => '1 unidade média',
                'porcao_gramas' => 100,
                'calorias' => 89,
                'proteinas' => 1.1,
                'carboidratos' => 22.8,
                'gorduras' => 0.3,
            ],
            [
                'nome' => 'Batata doce cozida',
                'porcao_descricao' => '1 unidade média',
                'porcao_gramas' => 130,
                'calorias' => 112,
                'proteinas' => 2.1,
                'carboidratos' => 26.1,
                'gorduras' => 0.1,
            ],
            [
                'nome' => 'Whey protein (pó)',
                'porcao_descricao' => '1 scoop',
                'porcao_gramas' => 30,
                'calorias' => 120,
                'proteinas' => 24,
                'carboidratos' => 2.4,
                'gorduras' => 1.5,
            ],
            [
                'nome' => 'Pão francês',
                'porcao_descricao' => '1 unidade',
                'porcao_gramas' => 50,
                'calorias' => 135,
                'proteinas' => 4.3,
                'carboidratos' => 28,
                'gorduras' => 1.3,
            ],
            [
                'nome' => 'Queijo minas',
                'porcao_descricao' => '1 fatia',
                'porcao_gramas' => 30,
                'calorias' => 72,
                'proteinas' => 5.4,
                'carboidratos' => 1,
                'gorduras' => 5.1,
            ],
            [
                'nome' => 'Leite desnatado',
                'porcao_descricao' => '1 copo',
                'porcao_gramas' => 200,
                'calorias' => 70,
                'proteinas' => 6.8,
                'carboidratos' => 9.8,
                'gorduras' => 0.2,
            ],
            [
                'nome' => 'Azeite de oliva',
                'porcao_descricao' => '1 colher de sopa',
                'porcao_gramas' => 13,
                'calorias' => 115,
                'proteinas' => 0,
                'carboidratos' => 0,
                'gorduras' => 13,
            ],
        ];

        foreach ($alimentos as $dados) {
            Alimento::firstOrCreate(['nome' => $dados['nome']], $dados);
        }
    }
}