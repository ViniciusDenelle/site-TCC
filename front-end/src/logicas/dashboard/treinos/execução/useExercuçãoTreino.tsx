import { useMemo, useState } from 'react';
import useShowTreino from '../treino/ShowTreino';
import { SerieExecutada } from './ExercutarTreinoProps';
import useExecuçãoExercicio from './useExecuçãoExercicio';

const useExecucaoTreino = (id: number) => {
    const treinoQuery = useShowTreino(id);
    const [ordem, setOrdem] = useState<number>(1);
    const [seriesExecutadas, setSeriesExecutadas] = useState<SerieExecutada[]>([]);

    const adicionarSerieExecutada = (serieExecutada: SerieExecutada) => {
        setSeriesExecutadas(prev => {
            // Remove duplicações da mesma série e adiciona a versão atualizada
            const filtradas = prev.filter(
                s => !(s.exercicioTreinoId === serieExecutada.exercicioTreinoId && s.serie === serieExecutada.serie)
            );
            return [...filtradas, serieExecutada];
        });
    };

    const removerSerieExecutada = (serieExecutada: SerieExecutada) => {
        setSeriesExecutadas(prev =>
            prev.filter(
                s => !(s.exercicioTreinoId === serieExecutada.exercicioTreinoId && s.serie === serieExecutada.serie)
            )
        );
    };

    const totalExercicios = useMemo(() => {
        return treinoQuery.treino?.exercicios?.length ?? 0;
    }, [treinoQuery.treino]);

    const exercicioData = useMemo(() => {
        if (!ordem || !treinoQuery.treino) return {};

        return (
            treinoQuery.treino.exercicios.find(
                exercicio => exercicio.ordem === ordem
            ) ?? {}
        );
    }, [ordem, treinoQuery.treino]);

    const exercicioExecucao = useExecuçãoExercicio(
        exercicioData,
        adicionarSerieExecutada,
        removerSerieExecutada
    );

    // Navegação na sequência de exercícios
    const proximoExercicio = () => {
        if (ordem < totalExercicios) {
            setOrdem(prev => prev + 1);
        }
    };

    const exercicioAnterior = () => {
        if (ordem > 1) {
            setOrdem(prev => prev - 1);
        }
    };

    // Verificadores de estado do treino
    const podeAvancar = ordem < totalExercicios;
    const podeVoltar = ordem > 1;
    const ultimoExercicio = ordem === totalExercicios;

    return {
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
    };
};

export default useExecucaoTreino;