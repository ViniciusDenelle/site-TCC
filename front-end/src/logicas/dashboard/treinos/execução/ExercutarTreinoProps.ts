import { Dispatch, SetStateAction } from "react";
import { ResExercicioTreinoProps, ResTreinoProps } from "../treino/FetchTreinos";
import { UseTimerReturn } from "../../../useTimer";

export interface ExecutarTreinoType {
  treinoQuery: any
  treino: ResTreinoProps
  treinoAtual: number
  setTreinoAtual: Dispatch<SetStateAction<number>>
  exercicioData:  Partial<ResExercicioTreinoProps>
  exercicioExecucao: UseExecucaoExercicio
  ordem: number
  setOrdem: Dispatch<SetStateAction<number>>
}

export type SerieExecutada = {
  exercicioTreinoId: number,
  serie: number,
  peso: number,
  repeticoes: number,
  concluida: boolean
}

export type UseExecucaoExercicio = {
  peso: number
  setPeso: Dispatch<SetStateAction<number>>
  reps: number
  setReps: Dispatch<SetStateAction<number>>
  serieAtual: number
  setSerieAtual: Dispatch<SetStateAction<number>>
  executarSerie: () => void
  refazerSerie: (serie:number) => void
  series: SerieExecutada[]
  timer: UseTimerReturn
}


