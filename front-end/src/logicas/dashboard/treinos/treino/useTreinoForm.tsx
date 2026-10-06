import { useState, useCallback } from 'react';
import useSelecaoUnica from '../selecionaveis/useSelecaoUnica';
import useSelecaoComDados from '../selecionaveis/useSelecaoComDados';
import { ResExercicioProps } from '../exercicios/FetchExercicio';
import { MetadadoExercicio } from '../exercicios/exercicoProps';

export const useTreinoForm = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const tipo = useSelecaoUnica();
    const foco = useSelecaoUnica();

    const metadadoPadrao: MetadadoExercicio = {
        tipo_execucao: 'repeticoes',
        sets: 3,
        repeticoes_minimas: 8,
        repeticoes_maximas: 12,
        duracao_segundos: null,
        peso: 0,
        descanso: 60,
    };

    const exercicios = useSelecaoComDados<ResExercicioProps, MetadadoExercicio>(metadadoPadrao);

    // Método responsável por popular todo o formulário com dados existentes
    const popularFormulario = useCallback((treino: any) => {
        if (!treino) return;

        setNome(treino.nome || '');
        setDescricao(treino.descricao || '');

        if (treino.tipo) {
            tipo.selecionar(treino.tipo);
        }

        if (treino.foco) {
            foco.selecionar(treino.foco);
        }

        if (Array.isArray(treino.exercicios)) {
            const exerciciosFormatados = [...treino.exercicios]
                .sort((a, b) => a.ordem - b.ordem)
                .filter(item => item.exercicio)
                .map(item => ({
                    ...item.exercicio,
                    metadado: {
                        sets: item.sets,
                        repeticoes_minimas: item.repeticoes_minimas,
                        repeticoes_maximas: item.repeticoes_maximas,
                        peso: item.peso,
                        descanso: item.descanso,
                    },
                }));

            exercicios.setSelecionados(exerciciosFormatados);
        }
    }, []);

    const adicionarExercicio = (item: ResExercicioProps) => {
        exercicios.toggle(item, metadadoPadrao);
    };

    const atualizarMetadadoExercicio = (id: number, campo: keyof MetadadoExercicio, valor: number) => {
        const exercicioAtual = exercicios.selecionados.find(e => e.id === id);
        if (!exercicioAtual) return;

        const novoMetadado = {
            ...exercicioAtual.metadado,
            [campo]: valor,
        };

        exercicios.atualizarDados(id, novoMetadado);
    };

    const montarPayload = () => {
        return {
            nome,
            descricao,
            tipo_id: tipo.selecionado?.id,
            foco_id: foco.selecionado?.id,
            exercicios: exercicios.selecionados.map((item, index) => ({
                exercicio_id: item.id,
                ordem: index + 1,
                sets: item.metadado.sets,
                tipo_execucao: item.metadado.tipo_execucao,
                duracao_segundos: item.metadado.duracao_segundos,
                repeticoes_minimas: item.metadado.repeticoes_minimas,
                repeticoes_maximas: item.metadado.repeticoes_maximas,
                peso: item.metadado.peso,
                descanso: item.metadado.descanso,
            })),
        };
    };

    return {
        nome,
        setNome,
        descricao,
        setDescricao,
        tipo,
        foco,
        exercicios,
        adicionarExercicio,
        atualizarMetadadoExercicio,
        montarPayload,
        popularFormulario,
    };
};

export default useTreinoForm;