// logicas/dashboard/dietas/useAdicionarDieta.ts
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../../api';

const useAdicionarDieta = () => {
    const { mutate, isPending, isSuccess, isError, error } = useMutation<
        AxiosResponse,
        AxiosError,
        number
    >({
        mutationFn: (dietaId: number) => api.post(`/dietas/${dietaId}/adicionar`),
    });

    return { mutate, isPending, isSuccess, isError, error };
};

export default useAdicionarDieta;