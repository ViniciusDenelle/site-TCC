import { useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import api from '@/api';

type Tipo =
  | 'ficha'
  | 'treino'
  | 'exercicio';

const useShowHistoricoTreinos = (
  id: number,
  tipo: Tipo
) => {
  const key = {
    ficha: 'ficha-historico',
    treino: 'treino-historico',
    exercicio: 'exercicio-historico',
  };

  const {
    data: historico,
    isSuccess,
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: [key[tipo], id],

    queryFn: async () => {
      const res = await api.get(
        `/dashboard/treinos/historico/${tipo}/${id}`
      );

      return res.data;
    },

    enabled: !!id,
  });

  return {
    historico,
    isSuccess,
    isError,
    isPending,
    error,
  };
};

export default useShowHistoricoTreinos;