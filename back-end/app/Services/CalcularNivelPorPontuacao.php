<?php

namespace App\Services;

use App\Models\Exercicio;

class CalcularNivelPorPontuacao
{
    public function calcularNivelPorPontuacao(array $exercicios): string
    {
        if (empty($exercicios)) {
            return 'Iniciante';
        }

        // Extrai apenas os IDs dos exercícios enviando no array do payload
        $ids = array_column($exercicios, 'exercicio_id');

        // Busca os exercícios no banco com o relacionamento 'nivel'
        $exerciciosDoBanco = Exercicio::with('nivel')
            ->whereIn('id', $ids)
            ->get();

        if ($exerciciosDoBanco->isEmpty()) {
            return 'Iniciante';
        }

        $pontuacaoTotal = 0;

        foreach ($exerciciosDoBanco as $exercicio) {
            // Pega o nome do nível associado ao exercício
            $nomeNivel = $exercicio->nivel->nome ?? 'Iniciante';

            $pontos = match ($nomeNivel) {
                'Avançado' => 3,
                'Intermediário' => 2,
                default => 1,
            };

            $pontuacaoTotal += $pontos;
        }

        $media = $pontuacaoTotal / $exerciciosDoBanco->count();

        if ($media >= 2.5) {
            return 'Avançado';
        }

        if ($media >= 1.5) {
            return 'Intermediário';
        }

        return 'Iniciante';
    }
}