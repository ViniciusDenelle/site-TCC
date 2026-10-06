import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../../api';
import Dieta from '../DietaProps';

const useShowDieta = (id?: string | number) => {

    const {
        data: dieta,
        isPending,
        isSuccess,
        isError,
        error
    } = useQuery<
        AxiosResponse,
        AxiosError,
        Dieta
    >({
        queryKey: ['dieta', id],

        queryFn: async () => {
            const res = await api.get(`dashboard/dietas/dieta/${id}`)
            return res.data.data
        },

        enabled: !!id
    })

    return {
        dieta,
        isPending,
        isSuccess,
        isError,
        error
    }
}

export default useShowDieta