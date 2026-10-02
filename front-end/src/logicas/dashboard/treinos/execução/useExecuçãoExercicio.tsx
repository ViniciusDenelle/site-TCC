import { useEffect, useState } from "react";
import { SerieExecutada, UseExecucaoExercicio } from "./ExercutarTreinoProps";
import useTimer from "../../../useTimer";
import { ExercicioDoTreino } from "../treino/TreinoProps";

const useExecuçãoExercicio = (
    exercicio: Partial<ExercicioDoTreino>,
    adicionarSerieExecutada: (serie: SerieExecutada) => void,
    removerSerieExecutada: (serie: SerieExecutada) => void
): UseExecucaoExercicio => {

    const [serieAtual, setSerieAtual] = useState(1);
    const [peso, setPeso] = useState(0);
    const [reps, setReps] = useState(0);
    const [series, setSeries] = useState<SerieExecutada[]>([]);

    const timer = useTimer({
        tempoInicial: exercicio.descanso ?? 0,
        onFinish: () => executarSerie(),
    });

    /**
     * Reinicia as séries e dados sempre que o exercício mudar
     */
    useEffect(() => {
        if (!exercicio.id) return;

        setPeso(exercicio.peso ?? 0);
        setReps(exercicio.repeticoes_minimas ?? 0);
        setSerieAtual(1);

        setSeries(
            Array.from(
                { length: exercicio.sets ?? 0 },
                (_, index): SerieExecutada => ({
                    exercicioTreinoId: exercicio.id!,
                    serie: index + 1,
                    repeticoes: exercicio.repeticoes_maximas ?? 0,
                    peso: exercicio.peso ?? 0,
                    concluida: false,
                })
            )
        );

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
            }

            return novasSeries;
        });
    };

    const refazerSerie = (numeroSerie: number) => {
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
    };
};

export default useExecuçãoExercicio;