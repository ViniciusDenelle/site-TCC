import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { paraFormData } from '../../../paraFormData';

type DiaSemana = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

export type FichaPayload = {
    nome: string;
    descricao: string;
    divisoes: { nome: string; treino_ids: number[] }[];
    dias: Partial<Record<DiaSemana, number | null>>;
};

const useCriarFicha = () => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        mutate,
        isSuccess,
        isError,
        isPending,
        error,
    } = useMutation<AxiosResponse, AxiosError, FichaPayload>({
        mutationFn: async (dados: FichaPayload) => {
            const res = await api.post('/dashboard/treinos/ficha', paraFormData(dados))
            return res.data
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['fichas'] })
            toast.success('Ficha criada com sucesso')
            navigate(`/dashboard/treino/verFicha/${res.data.id}`)
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