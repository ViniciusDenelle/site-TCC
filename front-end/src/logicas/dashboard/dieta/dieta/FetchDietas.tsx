import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Paginacao } from '../../../tipagens/PaginacaoProps';
import Dieta from '../DietaProps';
import api from '../../../../api';

type Filtros = Partial<Record<'objetivos' | 'niveis', number[]>> & { nome?: string };

const useFetchDietas = (filtros: Filtros, pagina: number) => {

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
        queryKey: ['dietas', filtros, pagina],

        queryFn: async () => {
            const res = await api.get('dashboard/dietas/dieta', {
                params: { ...filtros, page: pagina }
            })
            return res.data
        }
    })

    return { dietas, isPending, isSuccess, isError, error }
}

export default useFetchDietas