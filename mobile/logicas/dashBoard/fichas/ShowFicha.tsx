import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import api from '@/api';

export type ResFichaProps = {
  id: number;
  nome: string;
  descricao?: string;
  diasSemana: number[];
  divisao: string[];
};

const useShowFicha = (id: number) => {
  const {
    data: dadosFicha,
    isSuccess,
    isError,
    isPending,
    error,
  } = useQuery<
    ResFichaProps,
    AxiosError
  >({
    queryKey: ['ficha', id],

    queryFn: async () => {
      const res = await api.get(
        `/dashboard/treinos/ficha/${id}`
      );

      return res.data.data;
    },

    enabled: !!id,
  });

  return {
    dadosFicha,
    isSuccess,
    isError,
    isPending,
    error,
  };
};

export default useShowFicha;