import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import api from '@/api';

import { ResTreinoProps } from './FetchTreino';

const useShowTreino = (id: number) => {
  const {
    data: treino,
    isPending,
    isSuccess,
    isError,
    error,
  } = useQuery<ResTreinoProps, AxiosError>({
    queryKey: ['treino', id],

    queryFn: async () => {
      const res = await api.get(
        `/dashboard/treinos/treino/${id}`
      );

      return res.data.data;
    },

    enabled: !!id,
  });

  return {
    treino,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export default useShowTreino;