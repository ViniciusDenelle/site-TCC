import { useState } from "react"
import { useTreinoFormProps } from "./TreinoProps"
import useSelecaoComDados from "../selecionaveis/useSelecaoComDados"

type MetadadoExercicio = {
    sets: number;
    repeticoes_minimas: number;
    repeticoes_maximas: number;
    peso: number;
    descanso: number;
};

const metadadoPadrao: MetadadoExercicio = {
    sets: 3,
    repeticoes_minimas: 8,
    repeticoes_maximas: 12,
    peso: 0,
    descanso: 60,
};

const useTreinoForm = ():useTreinoFormProps => {

    const [nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const exercicios = useSelecaoComDados({})



    return {
        nome,
        setNome,
        descricao,
        setDescricao,
        exercicios
    }
}

export default useTreinoForm