import { useEffect, useState } from 'react';

import { ResExercicioTreinoProps } from '../treino/FetchTreinos';
import {
  SerieExecutada,
  UseExecucaoExercicio,
} from './ExercutarTreinoProps';

import useTimer from '@/hooks/useTimer';

const useExecucaoExercicio = (
  exercicio: Partial<ResExercicioTreinoProps>,
  adicionarSerieExecutada: (serie: SerieExecutada) => void,
  removerSerieExecutada: (serie: SerieExecutada) => void
): UseExecucaoExercicio => {
  const [serieAtual, setSerieAtual] = useState(1);

  const [peso, setPeso] = useState(0);

  const [reps, setReps] = useState(0);

  const [series, setSeries] = useState<SerieExecutada[]>([]);

  const executarSerie = () => {
    console.log('Executando série');

    setSeries((prev) => {
      const novasSeries = prev.map((serie) =>
        serie.serie === serieAtual
          ? {
              ...serie,
              peso: peso,
              repeticoes: reps,
              concluida: true,
            }
          : serie
      );

      // Série que acabou de ser concluída
      const serieConcluida = novasSeries.find(
        (serie) => serie.serie === serieAtual
      );

      if (serieConcluida) {
        adicionarSerieExecutada(serieConcluida);
      }

      // Procura a próxima série
      const proxima =
        novasSeries.find(
          (serie) =>
            !serie.concluida && serie.serie > serieAtual
        ) ??
        novasSeries.find(
          (serie) => !serie.concluida
        );

      if (proxima) {
        setSerieAtual(proxima.serie);
        setPeso(proxima.peso);
        setReps(proxima.repeticoes);
      }

      return novasSeries;
    });
  };

  const timer = useTimer({
    tempoInicial: exercicio.descanso ?? 0,

    onFinish: executarSerie,
  });

  /**
   * Sempre que trocar de exercício,
   * reinicia toda a execução.
   */
  useEffect(() => {
    if (!exercicio.id) return;

    const pesoInicial = exercicio.peso ?? 0;
    const repsInicial = exercicio.repsMin ?? 0;
    const quantidadeSeries = exercicio.sets ?? 0;

    setPeso(pesoInicial);
    setReps(repsInicial);
    setSerieAtual(1);

    setSeries(
      Array.from(
        { length: quantidadeSeries },
        (_, index): SerieExecutada => ({
          exercicioTreinoId: exercicio.id!,
          serie: index + 1,
          repeticoes: repsInicial,
          peso: pesoInicial,
          concluida: false,
        })
      )
    );

    timer.parar();
  }, [exercicio.id]);

  const refazerSerie = (numeroSerie: number) => {
    const serieAlvo = series.find(
      (serie) => serie.serie === numeroSerie
    );

    if (!serieAlvo) return;

    removerSerieExecutada(serieAlvo);

    setSeries((prev) =>
      prev.map((serie) =>
        serie.serie === numeroSerie
          ? {
              ...serie,
              concluida: false,
            }
          : serie
      )
    );

    setSerieAtual(numeroSerie);

    setPeso(serieAlvo.peso);
    setReps(serieAlvo.repeticoes);
  };

  console.log('Séries:', series);

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

export default useExecucaoExercicio;