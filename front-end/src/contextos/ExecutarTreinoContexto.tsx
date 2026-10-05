import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import { ExecutarTreinoType } from '../logicas/dashboard/treinos/execução/ExercutarTreinoProps.js';
import useExecuçãoTreino from '../logicas/dashboard/treinos/execução/useExercuçãoTreino.js';

interface TreinoProviderProps {
    children: ReactNode;
}

const ExecutarTreino = createContext<ExecutarTreinoType | null>(null);

export const TreinoProvider = ({ children }: TreinoProviderProps) => {
    // Permite inicializar sem nenhum treino ativo (null)
    const [treino, setTreino] = useState<number | null>(null);

    const {
        temTreinoAtivo,
        modalAberto,
        setModalAberto,
        treinoQuery,
        exercicioData,
        exercicioExecucao,
        seriesExecutadas,
        ordem,
        proximoExercicio,
        exercicioAnterior,
        cancelarTreino,
        podeAvancar,
        podeVoltar,
        ultimoExercicio,
        totalExercicios,
        treinoFinalizado,
        tempoGasto,
        tempoFormatado,
        dataInicio,
    } = useExecuçãoTreino(treino);

    const { treino: treinoData, ...query } = treinoQuery ?? {};

    return (
        <ExecutarTreino.Provider
            value={{
                temTreinoAtivo,
                modalAberto,
                setModalAberto,
                exercicioData,
                exercicioExecucao,
                seriesExecutadas,
                ordem,
                proximoExercicio,
                exercicioAnterior,
                cancelarTreino,
                podeAvancar,
                podeVoltar,
                ultimoExercicio,
                totalExercicios,
                treinoFinalizado,
                tempoGasto,
                tempoFormatado,
                dataInicio,
                treinoQuery: query,
                treino: treinoData,
                treinoAtual: treino,
                setTreinoAtual: setTreino,
            }}
        >
            {children}
        </ExecutarTreino.Provider>
    );
};

export default function useExecutarTreinoContext() {
    const dados = useContext(ExecutarTreino);
    if (!dados) {
        throw new Error('useExecutarTreinoContext deve ser usado dentro de um TreinoProvider');
    }
    return dados;
}