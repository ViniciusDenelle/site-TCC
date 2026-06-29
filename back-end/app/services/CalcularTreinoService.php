<?php

namespace App\services;

class calcularTreinoService
{
    public function calcularTempoECalorias(array $exercicios, $usuario): array
    {
        $tempoEstimado = 0;

        $tempoPorRepeticao = 3; // segundos
        $tempoTrocaExercicio = 20; // segundos
        $met = 4.5;

        foreach ($exercicios as $key => $exercicio) {

            // Média de repetições
            $mediaReps = (
                $exercicio['repsMin'] +
                $exercicio['repsMax']
            ) / 2;

            // Tempo executando as séries
            $tempoExecucao =
                $mediaReps *
                $tempoPorRepeticao *
                $exercicio['sets'];

            // Descansos entre as séries
            $tempoDescanso =
                max($exercicio['sets'] - 1, 0) *
                $exercicio['descanso'];

            $tempoEstimado += $tempoExecucao + $tempoDescanso;

            // Tempo de troca de exercício
            if ($key < count($exercicios) - 1) {
                $tempoEstimado += $tempoTrocaExercicio;
            }
        }

        // Peso do usuário
        $peso = $usuario->perfil->peso;

        // Segundos -> Horas
        $horas = $tempoEstimado / 3600;

        // Fórmula do MET
        $caloriasEstimadas = round(
            $met * $peso * $horas
        );

        return [
            'tempoEstimado' => $tempoEstimado,
            'caloriasEstimadas' => $caloriasEstimadas,
        ];
    }
}