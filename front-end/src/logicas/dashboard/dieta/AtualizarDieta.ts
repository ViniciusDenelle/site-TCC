// logicas/dashboard/dieta/AtualizarDieta.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../api';

const useAtualizarDieta = (id: string | number | undefined) => {
    const queryClient = useQueryClient();

    const { mutate, isSuccess, isError, isPending, error } = useMutation<
        AxiosResponse,
        AxiosError,
        any
    >({
        mutationFn: (dados: any) => api.put(`/dashboard/dietas/dieta/${id}`, dados),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => String(query.queryKey[0]).startsWith('dieta'),
            });
        },
    });

    return { mutate, isSuccess, isError, isPending, error };
};

export default useAtualizarDieta;