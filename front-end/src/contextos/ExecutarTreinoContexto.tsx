import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import { ExecutarTreinoType } from '../logicas/dashboard/treinos/execução/ExercutarTreinoProps.js'
import useExecuçãoTreino from '../logicas/dashboard/treinos/execução/useExercuçãoTreino.js'

interface TreinoProviderProps {
    children: ReactNode
}

const ExecutarTreino = createContext<ExecutarTreinoType | null>(null)

export const TreinoProvider = ({ children }: TreinoProviderProps) => {
    // ID do treino selecionado para execução
    const [treino, setTreino] = useState<number>(1)

    const {
        treinoQuery,
        exercicioData,
        exercicioExecucao,
        seriesExecutadas,
        ordem,
        setOrdem,
        proximoExercicio,
        exercicioAnterior,
        podeAvancar,
        podeVoltar,
        ultimoExercicio,
        totalExercicios
    } = useExecuçãoTreino(treino)

    const { treino: treinoData, ...query } = treinoQuery

    return (
        <ExecutarTreino.Provider
            value={{
                exercicioData,
                exercicioExecucao,
                seriesExecutadas,
                ordem,
                setOrdem,
                proximoExercicio,
                exercicioAnterior,
                podeAvancar,
                podeVoltar,
                ultimoExercicio,
                totalExercicios,
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
    const dados = useContext(ExecutarTreino)
    if (!dados) {
        throw new Error('useExecutarTreinoContext deve ser usado dentro de um TreinoProvider')
    }
    return dados
}