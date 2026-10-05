import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../api';
import { NivelDieta } from './DietaProps';

const useShowNivelDieta = (id?: number) => {

    const {
        data: nivel,
        isPending,
        isSuccess,
        isError,
        error
    } = useQuery<
        AxiosResponse,
        AxiosError,
        NivelDieta
    >({
        queryKey: ['nivel-dieta', id],

        queryFn: async () => {
            const res = await api.get(`/dashboard/dietas/niveis/${id}`)
            return res.data
        },

        enabled: !!id
    })

    return {
        nivel,
        isPending,
        isSuccess,
        isError,
        error
    }
}

export default useShowNivelDieta