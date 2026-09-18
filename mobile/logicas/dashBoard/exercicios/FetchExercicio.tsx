import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import api from '@/api';

import { Paginacao } from '@/logicas/tipagens/PaginacaoProps';
import { Filtros } from '../tipagens/FiltrosProps';

export type Badge = {
  id: number;
  nome: string;
};

export type Musculo = Badge & {
  tipo: {
    id: number;
    nome: 'Primário' | 'Secundário';
  };
};

export type Equipamento = Badge;

export type ResExercicioProps = {
  id: number;
  nome: string;
  descricao: string | null;

  categoria: Badge;
  nivel: Badge;
  tipo: Badge;

  musculos: Musculo[];
  equipamentos: Equipamento[];
};

type ReqFetchExercicios = Filtros & {
  nome?: string;
};

const useFetchExercicios = (
  filtros: ReqFetchExercicios,
  pagina: number
) => {
  const {
    data: exercicios,
    isPending,
    isSuccess,
    isError,
    error,
  } = useQuery<
    Paginacao<ResExercicioProps>,
    AxiosError
  >({
    queryKey: ['exercicios', filtros, pagina],

    queryFn: async () => {
      const res = await api.get(
        '/dashboard/treinos/exercicio',
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
    exercicios,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export default useFetchExercicios;