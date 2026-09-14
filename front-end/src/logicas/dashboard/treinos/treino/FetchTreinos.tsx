// logicas/dashboard/treinos/treino/FetchTreinos.ts
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api';

type Filtros = Partial<Record<'foco_id' | 'nivel_id' | 'tipo_id', number[]>>;

function useFetchTreinos(
    filtros: Filtros,
    pesquisa: string,
    caloriasRange: { min: number | null; max: number | null },
    tempoRange: { min: number | null; max: number | null },
    pagina: number
) {
    return useQuery({
        queryKey: ['treinos', filtros, pesquisa, caloriasRange, tempoRange, pagina],
        queryFn: async () => {
            const res = await api.get('/dashboard/treinos/treino', {
                params: {
                    ...filtros,
                    nome: pesquisa || undefined,
                    calorias_min: caloriasRange.min ?? undefined,
                    calorias_max: caloriasRange.max ?? undefined,
                    tempo_min: tempoRange.min ?? undefined,
                    tempo_max: tempoRange.max ?? undefined,
                    page: pagina,
                },
            });
            return res.data;
        },
    });
}

export default useFetchTreinos;