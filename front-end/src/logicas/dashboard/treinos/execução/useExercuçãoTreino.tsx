import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useShowTreino from '../treino/ShowTreino';
import { SerieExecutada } from './ExercutarTreinoProps';
import useExecuçãoExercicio from './useExecuçãoExercicio';
import useExecutarTreino from './ExecutarSerie';

const useExecucaoTreino = (id?: number | null) => {
    // Busca dados do backend
    const treinoQuery = useShowTreino(id ?? 0);

    const [modalAberto, setModalAberto] = useState<boolean>(false);
    const [temTreinoAtivo, setTemTreinoAtivo] = useState<boolean>(false);
    const [exercicioIndex, setExercicioIndex] = useState<number>(0);
    const [seriesExecutadas, setSeriesExecutadas] = useState<SerieExecutada[]>([]);
    const [treinoFinalizado, setTreinoFinalizado] = useState<boolean>(false);
    const [tempoGasto, setTempoGasto] = useState<number>(0);
    const [dataInicio, setDataInicio] = useState<Date | null>(null);

    const navegandoRef = useRef(false);
    const tempoGastoRef = useRef(0);
    tempoGastoRef.current = tempoGasto;

    const listaExercicios = useMemo(() => {
        return treinoQuery.treino?.exercicios ?? [];
    }, [treinoQuery.treino]);

    const totalExercicios = listaExercicios.length;

    const { executarTreino } = useExecutarTreino(id);

    // INICIA O TREINO AUTOMATICAMENTE QUANDO O ID É PASSADO E OS EXERCÍCIOS CARREGAM
    useEffect(() => {
        if (id && id > 0 && listaExercicios.length > 0 && !temTreinoAtivo) {
            setTemTreinoAtivo(true);
            setModalAberto(true);
            setDataInicio(new Date());
            setTempoGasto(0);
            setExercicioIndex(0);
            setSeriesExecutadas([]);
            setTreinoFinalizado(false);
        }
    }, [id, listaExercicios.length]);

    // TIMER LEVE (Atualiza a cada 1 segundo sem travar)
    useEffect(() => {
        if (!temTreinoAtivo || treinoFinalizado) return;

        const interval = setInterval(() => {
            setTempoGasto(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [temTreinoAtivo, treinoFinalizado]);

    // RESET QUANDO O ID É LIMPO (EX: FECHAR MODAL / SAIR DO TREINO)
    useEffect(() => {
        if (!id) {
            setTemTreinoAtivo(false);
            setTempoGasto(0);
            setExercicioIndex(0);
            setSeriesExecutadas([]);
            setTreinoFinalizado(false);
            setDataInicio(null);
            setModalAberto(false);
        }
    }, [id]);

    const adicionarSerieExecutada = useCallback((serieExecutada: SerieExecutada) => {
        setSeriesExecutadas(prev => {
            const filtradas = prev.filter(
                s => !(s.exercicioTreinoId === serieExecutada.exercicioTreinoId && s.serie === serieExecutada.serie)
            );
            return [...filtradas, serieExecutada];
        });
    }, []);

    const removerSerieExecutada = useCallback((serieExecutada: SerieExecutada) => {
        setSeriesExecutadas(prev =>
            prev.filter(
                s => !(s.exercicioTreinoId === serieExecutada.exercicioTreinoId && s.serie === serieExecutada.serie)
            )
        );
    }, []);

    const exercicioData = useMemo(() => {
        if (!temTreinoAtivo || listaExercicios.length === 0) return null;
        return listaExercicios[exercicioIndex] ?? null;
    }, [temTreinoAtivo, exercicioIndex, listaExercicios]);

    const proximoExercicio = useCallback(() => {
        if (!temTreinoAtivo || navegandoRef.current) return;
        navegandoRef.current = true;

        setExercicioIndex(prev => {
            if (prev < totalExercicios - 1) {
                return prev + 1;
            } else {
                setTreinoFinalizado(true);
                return prev;
            }
        });

        setTimeout(() => {
            navegandoRef.current = false;
        }, 300);
    }, [temTreinoAtivo, totalExercicios]);

    const exercicioAnterior = useCallback(() => {
        setTreinoFinalizado(false);
        setExercicioIndex(prev => Math.max(0, prev - 1));
    }, []);

    const cancelarTreino = useCallback(() => {
        setTemTreinoAtivo(false);
        setModalAberto(false);
        setExercicioIndex(0);
        setSeriesExecutadas([]);
        setTreinoFinalizado(false);
        setDataInicio(null);
        setTempoGasto(0);
    }, []);

    const exercicioExecucao = useExecuçãoExercicio(
        exercicioData ?? {},
        adicionarSerieExecutada,
        removerSerieExecutada,
        seriesExecutadas,
        proximoExercicio
    );

    const tempoFormatado = useMemo(() => {
        const horas = Math.floor(tempoGasto / 3600);
        const minutos = Math.floor((tempoGasto % 3600) / 60);
        const segundos = tempoGasto % 60;

        const pad = (num: number) => String(num).padStart(2, '0');

        if (horas > 0) {
            return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;
        }
        return `${pad(minutos)}:${pad(segundos)}`;
    }, [tempoGasto]);

    // FINALIZAÇÃO DO TREINO
    useEffect(() => {
        if (!treinoFinalizado || !temTreinoAtivo) return;

        executarTreino({
            seriesExecutadas,
            duracao: tempoGastoRef.current,
            inicio: dataInicio
        });

        setModalAberto(false);
        setTemTreinoAtivo(false);
    }, [treinoFinalizado]);

    return {
        temTreinoAtivo,
        modalAberto,
        setModalAberto,
        treinoQuery,
        exercicioData,
        exercicioExecucao,
        seriesExecutadas,
        ordem: temTreinoAtivo ? exercicioIndex + 1 : 0,
        proximoExercicio,
        exercicioAnterior,
        cancelarTreino,
        podeAvancar: temTreinoAtivo && exercicioIndex < totalExercicios - 1,
        podeVoltar: temTreinoAtivo && exercicioIndex > 0,
        ultimoExercicio: temTreinoAtivo && exercicioIndex === totalExercicios - 1,
        totalExercicios,
        treinoFinalizado,
        tempoGasto,
        tempoFormatado,
        dataInicio
    };
};

export default useExecucaoTreino;