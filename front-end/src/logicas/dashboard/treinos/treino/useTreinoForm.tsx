import { useCallback, useState } from "react"
import { MetadadoExercicio, useTreinoFormProps } from "./TreinoProps"
import { ResExercicioProps } from "../exercicios/FetchExercicio";
import useSelecaoComDados from "../selecionaveis/useSelecaoComDados";

const metadadoPadrao: MetadadoExercicio = {
    sets: 3,
    repeticoes_minimas: 8,
    repeticoes_maximas: 12,
    peso: 0,
    descanso: 60,
};

const useTreinoForm = (): useTreinoFormProps => {

    const [nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const exercicios = useSelecaoComDados<ResExercicioProps, MetadadoExercicio>(metadadoPadrao)

    // adiciona ou remove (toggle) um exercício do treino
    const adicionarExercicio = useCallback(() => {
        (exercicio: ResExercicioProps) => {
            exercicios.toggle(exercicio)
        }
    }, [])

    // atualiza um campo específico do metadado de um exercício já adicionado,
    // preservando os demais campos
    const atualizarMetadadoExercicio = (
        id: number,
        campo: keyof MetadadoExercicio,
        valor: number
    ) => {
        const exercicioAtual = exercicios.selecionados.find(e => e.id === id)
        if (!exercicioAtual) return

        exercicios.atualizarDados(id, {
            ...exercicioAtual.metadado,
            [campo]: valor
        })
    }

    return {
        nome,
        setNome,
        descricao,
        setDescricao,
        exercicios,
        adicionarExercicio,
        atualizarMetadadoExercicio
    }
}

export default useTreinoForm
