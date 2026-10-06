// logicas/dashboard/dietas/useFetchDietasAdicionadas.ts
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Paginacao } from '../../../tipagens/PaginacaoProps';
import Dieta from '../DietaProps';
import api from '../../../../api';

const useFetchDietasAdicionadas = (pagina: number) => {

    const { data: dietas, isPending, isSuccess, isError, error } = useQuery<
        AxiosResponse,
        AxiosError,
        Paginacao<Dieta>
    >({
        queryKey: ['dietas-adicionadas', pagina],
        queryFn: async () => {
            const res = await api.get('/dietas/meus-adicionados', { params: { page: pagina } })
            return res.data
        }
    })

    return { dietas, isPending, isSuccess, isError, error }
}

export default useFetchDietasAdicionadas