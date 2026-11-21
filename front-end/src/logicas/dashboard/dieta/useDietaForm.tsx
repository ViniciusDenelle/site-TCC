// logicas/dashboard/dietas/useDietaForm.ts
import { useState } from 'react';
import useSelecaoUnica from '../treinos/selecionaveis/useSelecaoUnica';
import { Alimento, NivelDieta, ObjetivoDieta } from './DietaProps';

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
    const [imagem, setImagem] = useState<File | null>(null);
    const [imagemAtual, setImagemAtual] = useState<string | null>(null);
    const [removerImagem, setRemoverImagem] = useState(false);
    const objetivo = useSelecaoUnica<ObjetivoDieta>();
    const nivel = useSelecaoUnica<NivelDieta>();

    const [refeicoes, setRefeicoes] = useState<RefeicaoTemp[]>([]);

    const trocarImagem = (arquivo: File | null) => {
        setImagem(arquivo);
        // lixeira sem arquivo novo = apagar a imagem que já estava salva
        setRemoverImagem(arquivo === null && !!imagemAtual);
    };

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
                    quantidade_gramas: Number(a.quantidade_gramas), // era quantidade_porcoes
                })),
            })),
            imagem,                                  
            remover_imagem: removerImagem ? 1 : 0
        };
    }

    return {
        nome, setNome,
        descricao, setDescricao,
        objetivo, nivel,
        refeicoes, adicionarRefeicao, removerRefeicao,
        adicionarAlimento, removerAlimento, atualizarQuantidade,
        montarPayload,
        imagem,
        imagemAtual,
        trocarImagem, 
    };
};

export default useDietaForm;
export type { RefeicaoTemp, AlimentoSelecionado };