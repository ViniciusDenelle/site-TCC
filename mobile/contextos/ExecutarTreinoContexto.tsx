import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

import { ExecutarTreinoType } from '../logicas/dashBoard/treino/execução/ExercutarTreinoProps'
import useExercuçãoTreino from '../logicas/dashBoard/treinos/execução/useExercuçãoTreino'

interface TreinoProviderProps {
    children: ReactNode
}

const ExecutarTreino = createContext<ExecutarTreinoType | null>(null)

export const TreinoProvider = ({ children }: TreinoProviderProps) => {
    const [treino, setTreino] = useState<number>(1)

    const {
        treinoQuery,
        exercicioData,
        exercicioExecucao,
        ordem,
        setOrdem
    } = useExercuçãoTreino(treino)

    const {
        treino: treinoData,
        ...query
    } = treinoQuery

    return (
        <ExecutarTreino.Provider
            value={{
                exercicioData,
                exercicioExecucao,
                ordem,
                setOrdem,
                treinoQuery: query,
                treino: treinoData,
                treinoAtual: treino,
                setTreinoAtual: setTreino
            }}
        >
            {children}
        </ExecutarTreino.Provider>
    )
}

export default function useExecutarTreinoContext() {
    const contexto = useContext(ExecutarTreino)

    if (!contexto) {
        throw new Error(
            'useExecutarTreinoContext deve ser usado dentro do TreinoProvider'
        )
    }

    return contexto
}