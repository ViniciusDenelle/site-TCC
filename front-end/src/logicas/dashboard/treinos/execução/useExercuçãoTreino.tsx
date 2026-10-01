import React, { useMemo, useState } from 'react'
import useShowTreino from '../treino/ShowTreino'
import { ResExercicioTreinoProps } from '../treino/FetchTreinos'
import { SerieExecutada } from './ExercutarTreinoProps'
import useExecuçãoExercicio from './useExecuçãoExercicio'

const useExercuçãoTreino = (id) => {

  const treinoQuery = useShowTreino(id)
  const [ordem, setOrdem] = useState<number>(1)

  const [seriesExecutadas, setSeriesExecutadas] = useState<{}[]>([])

  const adcionarSerieExecutada = (serieExecutada:SerieExecutada) => {

    setSeriesExecutadas(prev => {
      return [
        ...prev,
        serieExecutada
      ]
    })
  }

  const removerSerieExecutada = (serieExecutada:SerieExecutada) => {

    setSeriesExecutadas(prev => {
      return prev.filter(serieE => serieE !== serieExecutada)
    })
  }

  const exercicioData = useMemo(() => {
    if (!ordem || !treinoQuery.treino) return {}

    return treinoQuery.treino.exercicios.find(
      exercicio => exercicio.ordem === ordem
    )
  }, [ordem, treinoQuery.treino])

  const exercicioExecucao = useExecuçãoExercicio(
                              exercicioData, 
                              adcionarSerieExecutada,
                              removerSerieExecutada
                            )

  

  return {
    treinoQuery,
    exercicioData,
    exercicioExecucao,
    ordem,
    setOrdem
  }
}

export default useExercuçãoTreino