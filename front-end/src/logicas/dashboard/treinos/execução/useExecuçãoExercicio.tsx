// import React, { useEffect, useMemo, useState } from 'react'
// import { ResExercicioTreinoProps } from '../treino/FetchTreinos'
// import { SerieExecutada, UseExecucaoExercicio } from './ExercutarTreinoProps'
// import useTimer from '../../../useTimer'

// const useExecuçãoExercicio = (
//     exercicio: Partial<ResExercicioTreinoProps>,
//     adcionarSerieExecutada: (serieExecutada: SerieExecutada) => void
// ): UseExecucaoExercicio => {


//     const [serieAtual, setSerieAtual] = useState<number>(1)

//     const [peso, setPeso] = useState<number>(exercicio.peso)
//     const [reps, setReps] = useState<number>(exercicio.repsMin)
//     const [serieCompleta, setSerieCompleta] = useState<boolean>(false)

//     const [series, setSeries] = useState<SerieExecutada[]>([])

//     const timer = useTimer({
//         tempoInicial: exercicio?.descanso ?? 0,
//         onFinish: () => executarSerie()
//     })

//     console.log(series)

//     // const proximaSerie = () => {
//     //     // if (serieAtual >= exercicio?.sets) return
//     //     console.log(series)
//     //     setSerieAtual(prev => {
//     //         let proxima = series.find(
//     //             serie => !serie.concluida && serie.serie > prev
//     //         );

//     //         if (!proxima) {
//     //             proxima = series.find(serie => !serie.concluida);
//     //         }

//     //         return proxima?.serie ?? prev;
//     //     })


//     // }

//     const executarSerie = () => {

//         setSeries(prev => {
//             return [
//                 ...prev,
//                 {
//                     exercicioTreinoId: exercicio?.id,
//                     serie: serieAtual,
//                     repeticoes: reps,
//                     peso: peso,
//                     concluida: true
//                 }
//             ]
//         })

//     }

//     useEffect(() => {
//         let proxima = series.find(
//             serie => !serie.concluida && serie.serie > serieAtual
//         );

//         if (!proxima) {
//             proxima = series.find(serie => !serie.concluida);
//         }

//         if (proxima) {
//             setSerieAtual(proxima.serie);
//         }
//     }, [series]);

//     useEffect(() => {
//         if (!exercicio) return;

//         setPeso(exercicio.peso);
//         setReps(exercicio.repsMin);
//     }, [exercicio]);

//     const refazerSerie = (serie: number) => {
//         setSeries(prev => {
//             return prev.filter(serieA => serieA.serie !== serie)
//         })
//     }

//     return {
//         peso,
//         setPeso,
//         reps,
//         setReps,
//         serieCompleta,
//         setSerieCompleta,
//         serieAtual,
//         setSerieAtual,
//         executarSerie,
//         refazerSerie,
//         series,
//         timer
//     }
// }

// export default useExecuçãoExercicio
import { useEffect, useState } from "react";
import { ResExercicioTreinoProps } from "../treino/FetchTreinos";
import { SerieExecutada, UseExecucaoExercicio } from "./ExercutarTreinoProps";
import useTimer from "../../../useTimer";

const useExecuçãoExercicio = (
    exercicio: Partial<ResExercicioTreinoProps>,
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
     * Sempre que trocar de exercício,
     * reinicia toda a execução.
     */
    useEffect(() => {
        if (!exercicio.id) return;

        setPeso(exercicio.peso ?? 0);
        setReps(exercicio.repsMin ?? 0);

        setSerieAtual(1);

        setSeries(
            Array.from(
                { length: exercicio.sets ?? 0 },
                (_, index): SerieExecutada => ({
                    exercicioTreinoId: exercicio.id!,
                    serie: index + 1,
                    repeticoes: exercicio.repsMin ?? 0,
                    peso: exercicio.peso ?? 0,
                    concluida: false,
                })
            )
        );

        timer.parar();
    }, [exercicio]);

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

            const serieConcluida = novasSeries.find(
                s => s.serie === serieAtual
            );

            if (serieConcluida) {
                adicionarSerieExecutada(serieConcluida);
            }

            const proxima =
                novasSeries.find(
                    s => !s.concluida && s.serie > serieAtual
                ) ??
                novasSeries.find(
                    s => !s.concluida
                );

            if (proxima) {
                setSerieAtual(proxima.serie);

                setPeso(proxima.peso);
                setReps(proxima.repeticoes);

            }

            return novasSeries;
        });
    };

    const refazerSerie = (numeroSerie: number) => {
        const serieAlvo = series.find(serieA => serieA.serie === numeroSerie)
        removerSerieExecutada(serieAlvo)
        
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