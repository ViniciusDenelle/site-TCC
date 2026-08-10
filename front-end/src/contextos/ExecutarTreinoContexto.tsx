import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import useCadastro, { UseCadastroReturn } from '../logicas/cadastro/useCadastro.js'
import { ExecutarTreinoType } from '../logicas/dashboard/treinos/execução/ExercutarTreinoProps.js'
import useExecutarTreino from '../logicas/dashboard/treinos/execução/ExecutarSerie.js'
import useExercuçãoTreino from '../logicas/dashboard/treinos/execução/useExercuçãoTreino.js'

interface TreinoProviderProps {
  children: ReactNode
}

const ExecutarTreino = createContext<ExecutarTreinoType | null>(null)

export const TreinoProvider = ({
  children
}: TreinoProviderProps) => {
    const [treino, setTreino] = useState<number>(1)
    const {
        treinoQuery,
        exercicioData,
        exercicioExecucao,
        ordem,
        setOrdem
    } = useExercuçãoTreino(treino)
    const {treino: treinoData, ...query} = treinoQuery

  return (
    <ExecutarTreino.Provider value={{
        exercicioData: exercicioData,
        exercicioExecucao: exercicioExecucao,
        ordem,
        setOrdem,
        treinoQuery: query,
        treino: treinoData,
        treinoAtual: treino,
        setTreinoAtual: setTreino

    }}>
      {children}
    </ExecutarTreino.Provider>
  )
}

export default function useExecutarTreinoContext() {
  const dados = useContext(ExecutarTreino) as ExecutarTreinoType | null
  return dados
}