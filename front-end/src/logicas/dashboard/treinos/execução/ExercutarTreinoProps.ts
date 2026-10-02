import { Dispatch, SetStateAction } from "react";

import { UseTimerReturn } from "../../../useTimer";
import { ExercicioDoTreino, ResTreinoProps } from "../treino/TreinoProps";

export interface ExecutarTreinoType {
  treinoQuery: any;
  treino: ResTreinoProps | undefined;
  treinoAtual: number;
  setTreinoAtual: Dispatch<SetStateAction<number>>;
  exercicioData: Partial<ExercicioDoTreino>;
  exercicioExecucao: UseExecucaoExercicio;
  seriesExecutadas: SerieExecutada[];
  ordem: number;
  setOrdem: Dispatch<SetStateAction<number>>;
  proximoExercicio: () => void;
  exercicioAnterior: () => void;
  podeAvancar: boolean;
  podeVoltar: boolean;
  ultimoExercicio: boolean;
  totalExercicios: number;
}

export type SerieExecutada = {
  exercicioTreinoId: number;
  serie: number;
  peso: number;
  repeticoes: number;
  concluida: boolean;
};

export type UseExecucaoExercicio = {
  peso: number;
  setPeso: Dispatch<SetStateAction<number>>;
  reps: number;
  setReps: Dispatch<SetStateAction<number>>;
  serieAtual: number;
  setSerieAtual: Dispatch<SetStateAction<number>>;
  executarSerie: () => void;
  refazerSerie: (serie: number) => void;
  series: SerieExecutada[];
  timer: UseTimerReturn;
};