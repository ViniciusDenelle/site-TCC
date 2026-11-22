// logicas/dashboard/dietas/useDietaForm.ts
import { useState } from 'react';
import useSelecaoUnica from '../treinos/selecionaveis/useSelecaoUnica';
import Dieta, { Alimento, NivelDieta, ObjetivoDieta } from './DietaProps';

type AlimentoSelecionado = Alimento & { quantidade_gramas: number };

type RefeicaoTemp = {
    id: string; // uuid local
    nome: string;
    dia_semana: number;
    horario: string;
    alimentos: AlimentoSelecionado[];
};

const useDietaForm = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const objetivo = useSelecaoUnica<ObjetivoDieta>();
    const nivel = useSelecaoUnica<NivelDieta>();

    const [refeicoes, setRefeicoes] = useState<RefeicaoTemp[]>([]);

    function adicionarRefeicao(dia: number, nomeRefeicao: string, horario: string) {
        setRefeicoes(prev => [
            ...prev,
            { id: crypto.randomUUID(), nome: nomeRefeicao, dia_semana: dia, horario, alimentos: [] },
        ]);
    }

    function removerRefeicao(id: string) {
        setRefeicoes(prev => prev.filter(r => r.id !== id));
    }

    function adicionarAlimento(refeicaoId: string, alimento: Alimento, quantidadeGramas?: number) {
        setRefeicoes(prev => prev.map(r =>
            r.id === refeicaoId
                ? {
                    ...r,
                    alimentos: [...r.alimentos, {
                        ...alimento,
                        quantidade_gramas: quantidadeGramas ?? alimento.porcao_gramas ?? 0,
                    }],
                }
                : r
        ));
    }

    function removerAlimento(refeicaoId: string, alimentoId: number) {
        setRefeicoes(prev => prev.map(r =>
            r.id === refeicaoId
                ? { ...r, alimentos: r.alimentos.filter(a => a.id !== alimentoId) }
                : r
        ));
    }

    function atualizarQuantidade(refeicaoId: string, alimentoId: number, quantidadeGramas: number) {
        setRefeicoes(prev => prev.map(r =>
            r.id === refeicaoId
                ? { ...r, alimentos: r.alimentos.map(a => a.id === alimentoId ? { ...a, quantidade_gramas: quantidadeGramas } : a) }
                : r
        ));
    }

    /**
     * Preenche o formulário com uma dieta que já existe (usado na edição).
     * A API devolve calorias e macros já calculados para a quantidade em gramas;
     * aqui convertemos de volta para "por porção", que é o que o formulário espera.
     */
    function carregarDieta(dieta: Dieta) {
        setNome(dieta.nome);
        setDescricao(dieta.descricao ?? '');
        objetivo.selecionar(dieta.objetivo);
        nivel.selecionar(dieta.nivel);

        setRefeicoes(
            dieta.refeicoes.map(r => ({
                id: crypto.randomUUID(),
                nome: r.nome,
                dia_semana: r.dia_semana,
                horario: r.horario ?? '',
                alimentos: r.alimentos.map(a => {
                    const quantidade = a.quantidade_gramas;
                    const porcao = a.porcao_gramas || quantidade || 1;
                    const fator = quantidade > 0 ? porcao / quantidade : 1;

                    return {
                        id: a.id,
                        nome: a.nome,
                        porcao_descricao: a.porcao_descricao,
                        porcao_gramas: a.porcao_gramas,
                        calorias: a.calorias * fator,
                        proteinas: a.proteinas * fator,
                        carboidratos: a.carboidratos * fator,
                        gorduras: a.gorduras * fator,
                        quantidade_gramas: quantidade,
                    };
                }),
            }))
        );
    }

    function montarPayload() {
        return {
            nome,
            descricao,
            objetivo_id: objetivo.selecionado?.id ?? null,
            nivel_id: nivel.selecionado?.id ?? null,
            refeicoes: refeicoes.map((r, index) => ({
                nome: r.nome,
                dia_semana: r.dia_semana,
                horario: r.horario || null,
                ordem: index,
                alimentos: r.alimentos.map(a => ({
                    alimento_id: a.id,
                    quantidade_gramas: a.quantidade_gramas, // era quantidade_porcoes
                })),
            })),
        };
    }

    return {
        nome, setNome,
        descricao, setDescricao,
        objetivo, nivel,
        refeicoes, adicionarRefeicao, removerRefeicao,
        adicionarAlimento, removerAlimento, atualizarQuantidade,
        carregarDieta,
        montarPayload,
    };
};

export default useDietaForm;
export type { RefeicaoTemp, AlimentoSelecionado };