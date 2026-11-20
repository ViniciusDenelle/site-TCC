import { useState, useCallback } from 'react';
import useSelecaoUnica from '../selecionaveis/useSelecaoUnica';
import useSelecaoComDados from '../selecionaveis/useSelecaoComDados';
import { ResExercicioProps } from '../exercicios/FetchExercicio';
import { MetadadoExercicio } from '../exercicios/exercicoProps';

export const useTreinoForm = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);
    const [imagemAtual, setImagemAtual] = useState<string | null>(null);
    const [removerImagem, setRemoverImagem] = useState(false);

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
        setImagem(null);
        setImagemAtual(treino.imagem ?? null);
        setRemoverImagem(false);

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
                        tipo_execucao: item.tipo_execucao,
                        duracao_segundos: item.duracao_segundos,
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

    function alternarTipoExecucao(id: number, novoTipo: 'tempo' | 'repeticoes') {
        const exercicioAtual = exercicios.selecionados.find(e => e.id === id)
        if (!exercicioAtual) return

        const novoMetadado: MetadadoExercicio = novoTipo === 'tempo'
            ? {
                ...exercicioAtual.metadado,
                tipo_execucao: 'tempo',
                repeticoes_minimas: null,
                repeticoes_maximas: null,
                duracao_segundos: 30,
            }
            : {
                ...exercicioAtual.metadado,
                tipo_execucao: 'repeticoes',
                repeticoes_minimas: 8,
                repeticoes_maximas: 12,
                duracao_segundos: null,
            }

        exercicios.atualizarDados(id, novoMetadado)
    }

     const trocarImagem = (arquivo: File | null) => {
        setImagem(arquivo);
        // lixeira sem arquivo novo = apagar a imagem que já estava salva
        setRemoverImagem(arquivo === null && !!imagemAtual);
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
            imagem,                                  
            remover_imagem: removerImagem ? 1 : 0
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
        alternarTipoExecucao,
        tipo,
        foco,
        popularFormulario,
        montarPayload,
        imagem,
        imagemAtual,
        trocarImagem, 
    }
};

export default useTreinoForm;