import { useCallback, useState } from "react"
import { MetadadoExercicio, useTreinoFormProps } from "./TreinoProps"
import { Badge, ResExercicioProps } from "../exercicios/FetchExercicio";
import useSelecaoComDados from "../selecionaveis/useSelecaoComDados";
import useSelecaoUnica from "../selecionaveis/useSelecaoUnica";

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
    const tipo = useSelecaoUnica<Badge>();
    const foco = useSelecaoUnica<Badge>();
    // adiciona ou remove (toggle) um exercício do treino
    const adicionarExercicio = (exercicio: ResExercicioProps) => {
        exercicios.toggle(exercicio)
    }

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

    const montarPayload = () => {
        return {
            nome,
            descricao,
            foco_id: foco.selecionado?.id ?? 0,
            tipo_id: tipo.selecionado?.id ?? 0,
            exercicios: exercicios.selecionados.map((exercicio, index) => ({
                exercicio_id: exercicio.id,
                ordem: index + 1,
                sets: exercicio.metadado.sets,
                repeticoes_minimas: exercicio.metadado.repeticoes_minimas,
                repeticoes_maximas: exercicio.metadado.repeticoes_maximas,
                peso: exercicio.metadado.peso,
                descanso: exercicio.metadado.descanso,
            })),
        };
    };

    return {
        nome,
        setNome,
        descricao,
        setDescricao,
        exercicios,
        adicionarExercicio,
        atualizarMetadadoExercicio,
        tipo,
        foco,
        montarPayload
    }
}

export default useTreinoForm
