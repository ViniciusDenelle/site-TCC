import { useCallback, useEffect, useRef, useState } from "react";

export type UseTimerProps = {
    tempoInicial: number;
    autoStart?: boolean;
    onFinish?: () => void;
};

export type UseTimerReturn = {
    tempo: number;
    rodando: boolean;
    ativo: boolean;
    iniciar: () => void;
    pausar: () => void;
    parar: () => void;
    reiniciar: () => void;
    finalizar: () => void;
    definirTempo: (novoTempo: number) => void;
};

const useTimer = ({
    tempoInicial,
    autoStart = false,
    onFinish,
}: UseTimerProps): UseTimerReturn => {
    const [tempo, setTempo] = useState<number>(tempoInicial);
    const [rodando, setRodando] = useState(autoStart);

    // IMPORTANTE: este efeito precisa ficar ANTES do efeito de fim, para que
    // onFinishRef já esteja atualizado quando o fim for detectado
    const onFinishRef = useRef(onFinish);
    useEffect(() => {
        onFinishRef.current = onFinish;
    }, [onFinish]);

    // tick: só decrementa, sem efeitos colaterais dentro do updater
    useEffect(() => {
        if (!rodando) return;

        const interval = setInterval(() => {
            setTempo(prev => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [rodando]);

    // fim: dispara uma única vez, quando rodando e o tempo chegou a 0
    useEffect(() => {
        if (rodando && tempo <= 0) {
            setRodando(false);
            onFinishRef.current?.();
        }
    }, [tempo, rodando]);

    useEffect(() => {
        setTempo(tempoInicial);
    }, [tempoInicial]);

    // ativo = rodando, ou pausado no meio do caminho
    const ativo = rodando || (tempo > 0 && tempo < tempoInicial);

    const iniciar = useCallback(() => {
        setTempo(prev => (prev <= 0 ? tempoInicial : prev));
        setRodando(true);
    }, [tempoInicial]);

    const pausar = useCallback(() => {
        setRodando(false);
    }, []);

    const parar = useCallback(() => {
        setRodando(false);
        setTempo(tempoInicial);
    }, [tempoInicial]);

    const finalizar = useCallback(() => {
        setRodando(false);
        setTempo(0);
        onFinishRef.current?.();
    }, []);

    const reiniciar = useCallback(() => {
        setTempo(tempoInicial);
        setRodando(true);
    }, [tempoInicial]);

    const definirTempo = useCallback((novoTempo: number) => {
        setTempo(novoTempo);
    }, []);

    return { tempo, rodando, ativo, iniciar, pausar, parar, reiniciar, finalizar, definirTempo };
};

export default useTimer;