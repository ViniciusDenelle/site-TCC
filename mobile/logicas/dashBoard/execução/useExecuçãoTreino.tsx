import { useMemo, useState } from 'react'

import useShowTreino from '@/hooks/useShowTreino'

import {
    ResExercicioTreinoProps,
} from '@/types/treino'

import {
    SerieExecutada,
} from '@/types/executarTreino'

import useExecucaoExercicio from '@/hooks/useExecucaoExercicio'

const useExecucaoTreino = (id: number) => {

    const treinoQuery = useShowTreino(id)

    const [ordem, setOrdem] = useState<number>(1)

    const [
        seriesExecutadas,
        setSeriesExecutadas,
    ] = useState<SerieExecutada[]>([])

    const adicionarSerieExecutada = (
        serieExecutada: SerieExecutada
    ) => {

        setSeriesExecutadas(prev => [
            ...prev,
            serieExecutada,
        ])
    }

    const removerSerieExecutada = (
        serieExecutada: SerieExecutada
    ) => {

        setSeriesExecutadas(prev =>
            prev.filter(
                serie => serie !== serieExecutada
            )
        )
    }

    const exercicioData = useMemo<
        Partial<ResExercicioTreinoProps>
    >(() => {

        if (!ordem || !treinoQuery.treino) {
            return {}
        }

        return (
            treinoQuery.treino.exercicios.find(
                exercicio =>
                    exercicio.ordem === ordem
            ) ?? {}
        )

    }, [
        ordem,
        treinoQuery.treino,
    ])

    const exercicioExecucao =
        useExecucaoExercicio(
            exercicioData,
            adicionarSerieExecutada,
            removerSerieExecutada
        )

    return {

        treinoQuery,

        exercicioData,

        exercicioExecucao,

        ordem,

        setOrdem,

        seriesExecutadas,
    }
}

export default useExecucaoTreino