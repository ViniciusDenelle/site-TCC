import { ResExercicioProps } from "../exercicios/FetchExercicio"
import { Ficha } from "../fichas/FichaProps"
import { ResTreinoProps } from "../treino/TreinoProps"

type ResFetchCompartilhados = {
    exercicios: ResExercicioProps[]
    treinos: ResTreinoProps[]
    fichas: Ficha[]
}