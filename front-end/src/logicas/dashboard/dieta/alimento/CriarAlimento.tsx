// logicas/dashboard/dietas/useCriarAlimento.ts
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../../api';
import { paraFormData } from '../../../paraFormData';

type AlimentoPayload = {
    nome: string;
    imagem: File | null;
    remover_imagem: number;
    porcao_descricao: string;
    porcao_gramas: number;
    calorias: number;
    proteinas: number;
    carboidratos: number;
    gorduras: number;
};

const useCriarAlimento = () => {
    const {
        mutate,
        isSuccess,
        isError,
        isPending,
        error
    } = useMutation<
        AxiosResponse,
        AxiosError,
        AlimentoPayload
    >({
        mutationFn: (dados: AlimentoPayload) => api.post('/dashboard/dietas/alimentos', paraFormData(dados)),
    });

    return {
        mutate,
        isSuccess,
        isError,
        isPending,
        error
    };
};

export default useCriarAlimento;