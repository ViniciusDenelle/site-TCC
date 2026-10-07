import { useEffect, useState } from "react";
import { SerieExecutada, UseExecucaoExercicio } from "./ExercutarTreinoProps";
import useTimer from "../../../useTimer";
import { ExercicioDoTreino } from "../treino/TreinoProps";

const useExecuçãoExercicio = (
    exercicio: Partial<ExercicioDoTreino>,
    adicionarSerieExecutada: (serie: SerieExecutada) => void,
    removerSerieExecutada: (serie: SerieExecutada) => void,
    seriesExecutadas: SerieExecutada[],
    onExercicioConcluido?: () => void
): UseExecucaoExercicio => {

    const isometrico = exercicio.tipo_execucao === 'tempo';
    console.log(exercicio, isometrico);

    const [serieAtual, setSerieAtual] = useState(1);
    const [peso, setPeso] = useState(0);
    const [reps, setReps] = useState(0);
    const [duracaoAlvo, setDuracaoAlvo] = useState(0); // duração planejada da série atual
    const [series, setSeries] = useState<SerieExecutada[]>([]);
    const [concluida, setConcluida] = useState<boolean>(false);

    // timer de DESCANSO entre séries — contrato já estabelecido: ao zerar, executa a série
    const timer = useTimer({
        tempoInicial: exercicio.descanso ?? 0,
        onFinish: () => executarSerie(),
    });

    // timer de EXECUÇÃO — só usado em exercícios isométricos (prancha). Ao zerar,
    // a posição foi sustentada pelo tempo-alvo inteiro: inicia o descanso, que por sua
    // vez (pelo contrato acima) marca a série como concluída.
    const timerExecucao = useTimer({
        tempoInicial: exercicio.duracao_segundos ?? 0,
        onFinish: () => {
            timer.iniciar();
        },
    });

    useEffect(() => {
        if (!exercicio.id) return;

        const salvasDoExercicio = seriesExecutadas.filter(
            sr => sr.exercicioTreinoId === exercicio.id
        );

        const totalSets = exercicio.sets ?? 0;
        const seriesMontadas: SerieExecutada[] = Array.from(
            { length: totalSets },
            (_, index): SerieExecutada => {
                const numeroSerie = index + 1;
                const serieSalva = salvasDoExercicio.find(s => s.serie === numeroSerie);

                if (serieSalva) {
                    return { ...serieSalva };
                }

                return {
                    exercicioTreinoId: exercicio.id!,
                    serie: numeroSerie,
                    repeticoes: isometrico ? null : (exercicio.repeticoes_maximas ?? 0),
                    duracaoSegundos: isometrico ? (exercicio.duracao_segundos ?? 0) : null,
                    peso: exercicio.peso ?? 0,
                    concluida: false,
                };
            }
        );

        setSeries(seriesMontadas);

        const proximaPendente = seriesMontadas.find(s => !s.concluida);

        if (proximaPendente) {
            setConcluida(false);
            setSerieAtual(proximaPendente.serie);
            setPeso(proximaPendente.peso);
            setReps(proximaPendente.repeticoes ?? 0);
            setDuracaoAlvo(proximaPendente.duracaoSegundos ?? 0);
        } else {
            setConcluida(true);
            const ultimaSerie = seriesMontadas[seriesMontadas.length - 1];
            if (ultimaSerie) {
                setSerieAtual(ultimaSerie.serie);
                setPeso(ultimaSerie.peso);
                setReps(ultimaSerie.repeticoes ?? 0);
                setDuracaoAlvo(ultimaSerie.duracaoSegundos ?? 0);
            }
        }

        timer.parar();
        timerExecucao.parar();
    }, [exercicio.id]);

    // dispara o timer de execução (prancha) — chamado pelo botão "iniciar" no comando
    const iniciarExecucaoTempo = () => {
        timerExecucao.iniciar();
    };

    // caso o usuário não consiga segurar até o fim e queira encerrar antes:
    // registra o tempo realmente sustentado (alvo - restante) em vez do alvo cheio
    // caso o usuário não consiga segurar até o fim: registra o tempo realmente sustentado
    const encerrarExecucaoAntecipada = () => {
        const tempoSustentado = Math.max(duracaoAlvo - timerExecucao.tempo, 0);

        // parar() (e não pausar) reseta o timer, então ele não fica "ativo" pendurado
        timerExecucao.parar();

        setSeries(prev => prev.map(serie =>
            serie.serie === serieAtual
                ? { ...serie, duracaoSegundos: tempoSustentado }
                : serie
        ));

        timer.iniciar(); // descanso → ao zerar, executarSerie() conclui a série
    };

    const executarSerie = () => {
        // sem efeitos colaterais dentro do updater: calcula a partir do state atual
        const novasSeries = series.map(serie =>
            serie.serie === serieAtual
                ? {
                    ...serie,
                    peso,
                    repeticoes: isometrico ? null : reps,
                    duracaoSegundos: isometrico ? serie.duracaoSegundos : null,
                    concluida: true,
                }
                : serie
        );

        setSeries(novasSeries);

        const serieConcluida = novasSeries.find(s => s.serie === serieAtual);
        if (serieConcluida) {
            adicionarSerieExecutada(serieConcluida);
        }

        // sempre reseta o timer de execução (antes só acontecia quando havia próxima série)
        timerExecucao.parar();

        const proxima =
            novasSeries.find(s => !s.concluida && s.serie > serieAtual) ??
            novasSeries.find(s => !s.concluida);

        if (proxima) {
            setSerieAtual(proxima.serie);
            setPeso(proxima.peso);
            setReps(proxima.repeticoes ?? 0);
            setDuracaoAlvo(proxima.duracaoSegundos ?? 0);
        } else {
            setConcluida(true);
            onExercicioConcluido?.();
        }
    };

    const refazerSerie = (numeroSerie: number) => {
        setConcluida(false);

        const serieAlvo = series.find(s => s.serie === numeroSerie);
        if (serieAlvo) {
            removerSerieExecutada(serieAlvo);

            // volta a duração para o alvo do exercício (pode ter sido encurtada)
            setDuracaoAlvo(exercicio.duracao_segundos ?? 0);
        }

        setSeries(prev =>
            prev.map(serie =>
                serie.serie === numeroSerie
                    ? {
                        ...serie,
                        concluida: false,
                        duracaoSegundos: isometrico ? (exercicio.duracao_segundos ?? 0) : null,
                    }
                    : serie
            )
        );

        setSerieAtual(numeroSerie);
        timer.parar();
        timerExecucao.parar();
    };

    return {
        peso,
        setPeso,
        reps,
        setReps,
        duracaoAlvo,
        serieAtual,
        setSerieAtual,
        executarSerie,
        refazerSerie,
        isometrico,
        iniciarExecucaoTempo,
        encerrarExecucaoAntecipada,
        timerExecucao,
        series,
        timer,
        concluida
    };
};

export default useExecuçãoExercicio;