<?php

namespace App\Services;

use App\Models\User;

class CalcularTreinoService
{
    public function calcularTempoECalorias(array $exercicios, User $usuario): array
    {
        $tempoEstimado = 0;

        $tempoPorRepeticao = 3; // segundos
        $tempoTrocaExercicio = 20; // segundos
        $met = 4.5; // Gasto energético médio (METs) para musculação

        foreach ($exercicios as $key => $exercicio) {

            // Suporta as novas chaves `repeticoes_minimas`/`repeticoes_maximas` e mantém fallback para `repsMin`/`repsMax`
            $repsMin = $exercicio['repeticoes_minimas'] ?? $exercicio['repsMin'] ?? 0;
            $repsMax = $exercicio['repeticoes_maximas'] ?? $exercicio['repsMax'] ?? 0;

            // Média de repetições por série
            $mediaReps = ($repsMin + $repsMax) / 2;

            // Tempo total de execução física das repetições
            $tempoExecucao = $mediaReps * $tempoPorRepeticao * $exercicio['sets'];

            // Tempo total de descanso entre as séries do mesmo exercício
            $tempoDescanso = max($exercicio['sets'] - 1, 0) * $exercicio['descanso'];

            $tempoEstimado += $tempoExecucao + $tempoDescanso;

            // Transição entre exercícios diferentes
            if ($key < count($exercicios) - 1) {
                $tempoEstimado += $tempoTrocaExercicio;
            }
        }

        // Recupera o peso do usuário com valor padrão de segurança (70kg) caso não esteja cadastrado
        $peso = $usuario->perfil->peso ?? 70;

        // Converte o tempo total de segundos para horas
        $horas = $tempoEstimado / 3600;

        // Cálculo de calorias baseado na fórmula do MET: MET * Peso (kg) * Duração (horas)
        $caloriasEstimadas = (int) round($met * $peso * $horas);

        return [
            'tempoEstimado' => (int) $tempoEstimado,
            'caloriasEstimadas' => $caloriasEstimadas,
        ];
    }
}