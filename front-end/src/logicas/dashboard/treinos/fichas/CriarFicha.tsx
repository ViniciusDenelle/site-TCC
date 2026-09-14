import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../../api';
import toast from 'react-hot-toast';

type DiaSemana = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

export type FichaPayload = {
    nome: string;
    descricao: string;
    divisoes: { nome: string; treino_ids: number[] }[];
    dias: Partial<Record<DiaSemana, number | null>>;
};

const useCriarFicha = () => {
    const {
        mutate,
        isSuccess,
        isError,
        isPending,
        error,
    } = useMutation<AxiosResponse, AxiosError, FichaPayload>({
        mutationFn: (dados: FichaPayload) => api.post('/dashboard/treinos/ficha', dados),
        onSuccess: (res) => {
            toast.success('Ficha criada com sucesso')
        },
    });

    return {
        mutate,
        isSuccess,
        isError,
        isPending,
        error,
    };
};

export default useCriarFicha;