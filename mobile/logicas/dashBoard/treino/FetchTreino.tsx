import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import api from '@/api';

import { filtros } from '../useFiltrosTreinos';

export type Exercicio = {
  id: number;
  nome: string;
  descricao: string;
};

export type ResExercicioTreinoProps = {
  id: number;
  ordem: number;
  repsMin: number;
  repsMax: number;
  sets: number;
  peso: number;
  descanso: number;
  exercicio: Exercicio;
};

export type ResTreinoProps = {
  id: number;
  nome: string;
  nomeCriador: string;
  descricao: string | null;
  exercicios: ResExercicioTreinoProps[];
};

const useFetchTreinos = (
  filtros: filtros,
  pagina: number
) => {
  const {
    data: treinos,
    isPending,
    isSuccess,
    isError,
    error,
  } = useQuery<
    ResTreinoProps[],
    AxiosError
  >({
    queryKey: ['treinos', filtros, pagina],

    queryFn: async () => {
      const res = await api.get(
        '/dashboard/treinos/treino',
        {
          params: {
            ...filtros,
            page: pagina,
          },
        }
      );

      return res.data;
    },
  });

  return {
    treinos,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export default useFetchTreinos;