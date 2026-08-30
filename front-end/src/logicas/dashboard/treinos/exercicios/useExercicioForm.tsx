// hooks/forms/useExercicioForm.ts
import { useState } from 'react';
import { Badge } from './FetchExercicio';
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

    return { nome, setNome, descricao, setDescricao, tipo, nivel, foco, equipamentos, musculos, montarPayload };
};

export default useExercicioForm;