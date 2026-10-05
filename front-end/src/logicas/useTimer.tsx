import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
}

const useTimer = ({
    tempoInicial,
    autoStart = false,
    onFinish,
}: UseTimerProps): UseTimerReturn => {
    const [tempo, setTempo] = useState<number>(tempoInicial);
    const [rodando, setRodando] = useState(autoStart);

    // guarda a versão mais recente de onFinish sem forçar o efeito de baixo a recriar o interval
    const onFinishRef = useRef(onFinish);
    useEffect(() => {
        onFinishRef.current = onFinish;
    }, [onFinish]);

    // um único interval por ciclo de "rodando", não recriado a cada segundo nem a cada render do pai
    useEffect(() => {
        if (!rodando) return;

        const interval = setInterval(() => {
            setTempo(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setRodando(false);
                    onFinishRef.current?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [rodando]); // só reinicia quando rodando muda de fato, nunca por causa de onFinish ou tempo

    useEffect(() => {
        setTempo(tempoInicial);
    }, [tempoInicial]);

    const ativo = useMemo(() => {
        if (tempo === tempoInicial || (tempo === 0 && !rodando)) {
            return false;
        }
        return true;
    }, [tempo, rodando, tempoInicial]);

    const iniciar = useCallback(() => {
        // se o timer já tinha zerado (fim do ciclo anterior com o mesmo tempoInicial),
        // reseta antes de começar — sem isso, "iniciar" de novo cai direto no fim
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