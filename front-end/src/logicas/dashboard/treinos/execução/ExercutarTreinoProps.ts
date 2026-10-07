import { Dispatch, SetStateAction } from "react";

import { UseTimerReturn } from "../../../useTimer";
import { ExercicioDoTreino, ResTreinoProps, TipoExecucao } from "../treino/TreinoProps";

export interface ExecutarTreinoType {
    temTreinoAtivo: boolean;
    modalAberto: boolean;
    setModalAberto: Dispatch<SetStateAction<boolean>>;
    treinoQuery: any;
    treino: ResTreinoProps | undefined;
    treinoAtual: number | null;
    setTreinoAtual: Dispatch<SetStateAction<number | null>>;
    exercicioData: Partial<ExercicioDoTreino>;
    exercicioExecucao: UseExecucaoExercicio;
    seriesExecutadas: SerieExecutada[];
    ordem: number;
    proximoExercicio: () => void;
    exercicioAnterior: () => void;
    cancelarTreino: () => void;
    podeAvancar: boolean;
    podeVoltar: boolean;
    ultimoExercicio: boolean;
    totalExercicios: number;
    treinoFinalizado: boolean;
    tempoGasto: number;
    tempoFormatado: string;
    dataInicio: Date | null;
}

export type SerieExecutada = {
  exercicioTreinoId: number;
  serie: number;
  peso: number;
  repeticoes: number | null;
  duracaoSegundos: number | null;
  concluida: boolean;
};

export type UseExecucaoExercicio = {
  peso: number;
  setPeso: Dispatch<SetStateAction<number>>;
  reps: number;
  setReps: Dispatch<SetStateAction<number>>;
  duracaoAlvo: number;
  serieAtual: number;
  setSerieAtual: Dispatch<SetStateAction<number>>;
  executarSerie: () => void;
  refazerSerie: (serie: number) => void;
  series: SerieExecutada[];
  concluida: boolean;
  timer: UseTimerReturn;
  isometrico: boolean;
  timerExecucao: UseTimerReturn;
  iniciarExecucaoTempo: () => void;
  encerrarExecucaoAntecipada: () => void;
};