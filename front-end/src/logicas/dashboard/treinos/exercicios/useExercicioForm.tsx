// hooks/forms/useExercicioForm.ts
import { useState } from 'react';
import { Badge, ResExercicioProps } from './FetchExercicio';
import useSelecaoUnica from '../selecionaveis/useSelecaoUnica';
import useSelecaoMultipla from '../selecionaveis/useSelecaoMultipla';
import useSelecaoComDados from '../selecionaveis/useSelecaoComDados';


const useExercicioForm = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const tipo = useSelecaoUnica<Badge>();
    const nivel = useSelecaoUnica<Badge>();
    const foco = useSelecaoUnica<Badge>();
    const equipamentos = useSelecaoMultipla<Badge>();
    const musculos = useSelecaoComDados<Badge, 1 | 2>(1);

    const preencherFormulario = (dados: ResExercicioProps) => {
        setNome(dados.nome || '');
        setDescricao(dados.descricao || '');

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

    function montarPayload() {
        return {
            nome,
            descricao,
            tipo_id: tipo.selecionado?.id ?? null,
            nivel_id: nivel.selecionado?.id ?? null,
            foco_id: foco.selecionado?.id ?? null,
            musculos: musculos.selecionados.map(({ id, metadado }) => ({ id, tipo: metadado })),
            equipamentos: equipamentos.selecionados.map(e => e.id),
        };
    }

    return {
        nome,
        setNome,
        descricao,
        setDescricao,
        tipo,
        nivel,
        foco,
        equipamentos,
        musculos,
        montarPayload,
        preencherFormulario
    };
};

export default useExercicioForm;