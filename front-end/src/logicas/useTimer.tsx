import { useCallback, useEffect, useMemo, useState } from "react";

export type UseTimerProps = {
    tempoInicial: number; // segundos
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
}

const useTimer = ({
    tempoInicial,
    autoStart = false,
    onFinish,
}: UseTimerProps): UseTimerReturn => {
    const [tempo, setTempo] = useState<number>(tempoInicial);
    const [rodando, setRodando] = useState(autoStart);

    

    useEffect(() => {
        if (!rodando) return;

        if (tempo <= 0) {
            setRodando(false);
            onFinish?.();
            return;
        }

        const interval = setInterval(() => {
            setTempo(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [tempo, rodando, onFinish]);

    useEffect(() => {
        setTempo(tempoInicial);
    }, [tempoInicial]);

    const ativo = useMemo(() => {
        if(tempo === tempoInicial || (tempo === 0 && !rodando)){
            return false 
        } else {
            return true
        }
    }, [tempo, rodando, tempoInicial])

    const iniciar = useCallback(() => {
        setRodando(true);
    }, []);

    const pausar = useCallback(() => {
        setRodando(false);
    }, []);

    const parar = useCallback(() => {
        setRodando(false);
        setTempo(tempoInicial);
    }, [tempoInicial]);

    const finalizar = useCallback(() => {
        setTempo(0);
    }, [tempoInicial]);

    const reiniciar = useCallback(() => {
        setTempo(tempoInicial);
        setRodando(true);
    }, [tempoInicial]);

    const definirTempo = useCallback((novoTempo: number) => {
        setTempo(novoTempo);
    }, []);

    return {
        tempo,
        rodando,
        ativo,

        iniciar,
        pausar,
        parar,
        reiniciar,
        finalizar,
        definirTempo,
    };
};

export default useTimer;