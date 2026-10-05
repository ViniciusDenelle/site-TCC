import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../api';
import { Paginacao } from '../../tipagens/PaginacaoProps';
import { Alimento } from './DietaProps';


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
    } = useQuery<
        AxiosResponse,
        AxiosError,
        Paginacao<Alimento>
    >({
        queryKey: ['alimentos', filtros, pagina],

        queryFn: async () => {
            const res = await api.get('/dashboard/dietas/alimentos', {
                params: {
                    ...filtros,
                    page: pagina
                }
            })
            return res.data
        }
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