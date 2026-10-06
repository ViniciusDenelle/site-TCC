// logicas/dashboard/dietas/useRemoverDietaAdicionada.ts
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../../api';

const useRemoverDietaAdicionada = () => {
    const { mutate, isPending, isSuccess, isError, error } = useMutation<
        AxiosResponse,
        AxiosError,
        number
    >({
        mutationFn: (dietaId: number) => api.delete(`/dietas/${dietaId}/adicionar`),
    });

    return { mutate, isPending, isSuccess, isError, error };
};

export default useRemoverDietaAdicionada;