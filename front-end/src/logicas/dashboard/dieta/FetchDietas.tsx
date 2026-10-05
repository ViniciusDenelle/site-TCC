import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../api';
import { Paginacao } from '../../tipagens/PaginacaoProps';
import Dieta from './DietaProps';

const useFetchDietas = (pagina: number) => {

    const {
        data: dietas,
        isPending,
        isSuccess,
        isError,
        error
    } = useQuery<
        AxiosResponse,
        AxiosError,
        Paginacao<Dieta>
    >({
        queryKey: ['dietas', pagina],

        queryFn: async () => {
            const res = await api.get('/dashboard/dietas', { params: { page: pagina } })
            return res.data
        }
    })

    return {
        dietas,
        isPending,
        isSuccess,
        isError,
        error
    }
}

export default useFetchDietas