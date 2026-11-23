import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import api from '../../../../api';
import { Paginacao } from '../../../tipagens/PaginacaoProps';
import { Alimento } from '../DietaProps';

type ReqFetchAlimentos = {
    nome?: string;
}

const useFetchAlimentos = (
    filtros: ReqFetchAlimentos,
    pagina: number
) => {

    const {
        data: alimentos,
        isPending,
        isSuccess,
        isError,
        error
    } = useQuery<Paginacao<Alimento>, AxiosError>({
        queryKey: ['alimentos', filtros, pagina],

        queryFn: async () => {
            const res = await api.get('/dashboard/dietas/alimentos', {
                params: {
                    ...filtros,
                    page: pagina
                }
            })
            return res.data
        },

        // mantém a lista anterior na tela enquanto a nova busca carrega
        placeholderData: keepPreviousData,
    })

    return {
        alimentos,
        isPending,
        isSuccess,
        isError,
        error
    }
}

export default useFetchAlimentos