// logicas/dashboard/treinos/useFetchMeusItens.ts
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api';

type TipoItem = 'treinos' | 'exercicios' | 'fichas';
type RelacaoItem = 'criados' | 'adicionados';

const rotasPorTipo: Record<TipoItem, string> = {
    treinos: '/dashboard/treinos/treino',
    exercicios: '/dashboard/treinos/exercicio',
    fichas: '/dashboard/treinos/ficha',
};

function useFetchMeusItens<T>(tipo: TipoItem, relacao: RelacaoItem, pagina: number) {
    const sufixo = relacao === 'criados' ? 'meus-criados' : 'meus-adicionados';

    return useQuery<{ data: T[]; meta: any }>({
        queryKey: [tipo, relacao, pagina],
        queryFn: async () => {
            const res = await api.get(`${rotasPorTipo[tipo]}/${sufixo}`, {
                params: { page: pagina },
            });
            return res.data;
        },
    });
}

export default useFetchMeusItens;