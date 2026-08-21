import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import api from '@/api';

import { ResFichaProps } from './ShowFicha';

const useFetchFichas = () => {
  const {
    data: fichas,
    isSuccess,
    isError,
    isPending,
    error,
  } = useQuery<
    ResFichaProps[],
    AxiosError
  >({
    queryKey: ['fichas'],

    queryFn: async () => {
      const res = await api.get(
        '/dashboard/treinos/ficha'
      );

      return res.data.data;
    },
  });

  return {
    fichas,
    isSuccess,
    isError,
    isPending,
    error,
  };
};

export default useFetchFichas;