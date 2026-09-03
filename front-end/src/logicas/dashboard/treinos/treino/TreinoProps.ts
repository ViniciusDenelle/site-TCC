import { Dispatch, SetStateAction } from "react"
import { ResExercicioProps } from "../exercicios/FetchExercicio"

// hooks/formularios/TreinoProps.ts

export type MetadadoExercicio = {
    sets: number;
    repeticoes_minimas: number;
    repeticoes_maximas: number;
    peso: number;
    descanso: number;
};

export type useTreinoFormProps = {
    nome: string
    setNome: Dispatch<SetStateAction<string>>

    descricao: string
    setDescricao: Dispatch<SetStateAction<string>>

    exercicios: {
        selecionados: (ResExercicioProps & { metadado: MetadadoExercicio })[]
        toggle: (item: ResExercicioProps, metadado?: MetadadoExercicio) => void
        atualizarDados: (id: number, metadado: MetadadoExercicio) => void
        remover: (id: number) => void
        isSelecionado: (id: number) => boolean
        setSelecionados: Dispatch<SetStateAction<(ResExercicioProps & { metadado: MetadadoExercicio })[]>>
    }

    adicionarExercicio: (exercicio: ResExercicioProps) => void
    atualizarMetadadoExercicio: (
        id: number,
        campo: keyof MetadadoExercicio,
        valor: number
    ) => void
}