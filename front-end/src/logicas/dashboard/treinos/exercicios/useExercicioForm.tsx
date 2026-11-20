// hooks/forms/useExercicioForm.ts
import { useState } from 'react';
import { Badge, ResExercicioProps } from './FetchExercicio';
import useSelecaoUnica from '../selecionaveis/useSelecaoUnica';
import useSelecaoMultipla from '../selecionaveis/useSelecaoMultipla';
import useSelecaoComDados from '../selecionaveis/useSelecaoComDados';


const useExercicioForm = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);
    const [imagemAtual, setImagemAtual] = useState<string | null>(null);
    const [removerImagem, setRemoverImagem] = useState(false);

    const tipo = useSelecaoUnica<Badge>();
    const nivel = useSelecaoUnica<Badge>();
    const foco = useSelecaoUnica<Badge>();
    const equipamentos = useSelecaoMultipla<Badge>();
    const musculos = useSelecaoComDados<Badge, 1 | 2>(1);

    const preencherFormulario = (dados: ResExercicioProps) => {
        setNome(dados.nome || '');
        setDescricao(dados.descricao || '');

        setImagem(null);
        setImagemAtual(dados.imagem ?? null);
        setRemoverImagem(false);

        if (dados.tipo) tipo.selecionar(dados.tipo);
        if (dados.nivel) nivel.selecionar(dados.nivel);
        if (dados.foco) foco.selecionar(dados.foco);

        // Seta a lista direta de equipamentos
        if (dados.equipamentos) {
            equipamentos.setSelecionados(dados.equipamentos);
        }

        // Para os músculos, mapeia para a estrutura que o useSelecaoComDados espera
        if (dados.musculos) {
            const musculosFormatados = dados.musculos.map((m) => ({
                ...m,
                metadado: m.tipo.id as 1 | 2
            }));

            musculos.setSelecionados(musculosFormatados);
        }
    };

    const trocarImagem = (arquivo: File | null) => {
        setImagem(arquivo);
        // lixeira sem arquivo novo = apagar a imagem que já estava salva
        setRemoverImagem(arquivo === null && !!imagemAtual);
    };

    function montarPayload() {
        return {
            nome,
            descricao,
            tipo_id: tipo.selecionado?.id ?? null,
            nivel_id: nivel.selecionado?.id ?? null,
            foco_id: foco.selecionado?.id ?? null,
            musculos: musculos.selecionados.map(({ id, metadado }) => ({ id, tipo: metadado })),
            equipamentos: equipamentos.selecionados.map(e => e.id),
            imagem,                                  // File | null
            remover_imagem: removerImagem ? 1 : 0
        };
    }

    return {
        nome,
        setNome,
        descricao,
        setDescricao,
        imagem,
        imagemAtual,
        trocarImagem, 
        montarPayload,
        preencherFormulario,
        tipo,
        nivel,
        foco,
        equipamentos,
        musculos,
    };
};

export default useExercicioForm;