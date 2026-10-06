import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../../api';
import { ObjetivoDieta } from '../DietaProps';

const useShowObjetivoDieta = (id?: number) => {

    const {
        data: objetivo,
        isPending,
        isSuccess,
        isError,
        error
    } = useQuery<
        AxiosResponse,
        AxiosError,
        ObjetivoDieta
    >({
        queryKey: ['objetivo-dieta', id],

        queryFn: async () => {
            const res = await api.get(`/dashboard/dietas/dieta/objetivos/${id}`)
            return res.data
        },

        enabled: !!id
    })

    return {
        objetivo,
        isPending,
        isSuccess,
        isError,
        error
    }
}

export default useShowObjetivoDieta