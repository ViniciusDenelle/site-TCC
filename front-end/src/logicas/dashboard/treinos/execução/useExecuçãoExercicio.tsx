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

    const [serieAtual, setSerieAtual] = useState(1);
    const [peso, setPeso] = useState(0);
    const [reps, setReps] = useState(0);
    const [series, setSeries] = useState<SerieExecutada[]>([]);
    const [concluida, setConcluida] = useState<boolean>(false);

    const timer = useTimer({
        tempoInicial: exercicio.descanso ?? 0,
        onFinish: () => executarSerie(),
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
                    repeticoes: exercicio.repeticoes_maximas ?? 0,
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
            setReps(proximaPendente.repeticoes);
        } else {
            setConcluida(true);
            const ultimaSerie = seriesMontadas[seriesMontadas.length - 1];
            if (ultimaSerie) {
                setSerieAtual(ultimaSerie.serie);
                setPeso(ultimaSerie.peso);
                setReps(ultimaSerie.repeticoes);
            }
        }

        timer.parar();
    }, [exercicio.id]);

    const executarSerie = () => {
        setSeries(prev => {
            const novasSeries = prev.map(serie =>
                serie.serie === serieAtual
                    ? {
                          ...serie,
                          peso: peso,
                          repeticoes: reps,
                          concluida: true,
                      }
                    : serie
            );

            const serieConcluida = novasSeries.find(s => s.serie === serieAtual);

            if (serieConcluida) {
                adicionarSerieExecutada(serieConcluida);
            }

            const proxima =
                novasSeries.find(s => !s.concluida && s.serie > serieAtual) ??
                novasSeries.find(s => !s.concluida);

            if (proxima) {
                setSerieAtual(proxima.serie);
                setPeso(proxima.peso);
                setReps(proxima.repeticoes);
            } else {
                // Se não há mais séries pendentes neste exercício
                setConcluida(true);
                if (onExercicioConcluido) {
                    // Chama a transição diretamente na ação do usuário
                    onExercicioConcluido();
                }
            }

            return novasSeries;
        });
    };

    const refazerSerie = (numeroSerie: number) => {
        setConcluida(false);

        const serieAlvo = series.find(serieA => serieA.serie === numeroSerie);
        if (serieAlvo) {
            removerSerieExecutada(serieAlvo);
        }

        setSeries(prev =>
            prev.map(serie =>
                serie.serie === numeroSerie
                    ? {
                          ...serie,
                          concluida: false,
                      }
                    : serie
            )
        );

        setSerieAtual(numeroSerie);
    };

    return {
        peso,
        setPeso,
        reps,
        setReps,
        serieAtual,
        setSerieAtual,
        executarSerie,
        refazerSerie,
        series,
        timer,
        concluida
    };
};

export default useExecuçãoExercicio;