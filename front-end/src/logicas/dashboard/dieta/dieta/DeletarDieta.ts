import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../../../api';

const useDeletarDieta = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, isError, error } = useMutation<
        AxiosResponse,
        AxiosError,
        number
    >({
        mutationFn: (id: number) => api.delete(`/dashboard/dietas/dieta/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => String(query.queryKey[0]).startsWith('dieta'),
            });
        },
    });

    return { deletar: mutateAsync, isPending, isError, error };
};

export default useDeletarDieta;