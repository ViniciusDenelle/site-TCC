import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import api from '../../../../api';
import Dieta from '../../../../logicas/dashboard/dieta/DietaProps';
import Texto from '../../../../componentes/organizacao/Texto';
import Paginacao from '../../../../componentes/outros/Paginacao';
import FiltrosPesquisa from '../../../../componentes/filtros/FiltrosPesquisa';
import FiltrosChips from '../../../../componentes/filtros/FiltrosChips';
import FiltroTreinoModal from '../../../../componentes/filtros/FiltroTreinoModal';
import SecaoBadges from '../../../../componentes/SecaoBadges';
import useDebounce from '../../../../logicas/useDebounce';
import useFiltrosDieta from '../../../../logicas/dashboard/dieta/dieta/useFIltrosDieta';
import useFetchObjetivosDieta from '../../../../logicas/dashboard/dieta/FetchObjetivosDieta';
import useFetchNiveisDieta from '../../../../logicas/dashboard/dieta/FetchNiveisDieta';
import DietaCard from '../../../../componentes/dieta/DIetaCard';
import useFetchUsuario from '../../../../logicas/usuario/FetchUsuario';
import useFiltroCaloriasMeta from '../../../../logicas/dashboard/dieta/dieta/useFiltroCaloriaMeta';
import useFetchDietas from '../../../../logicas/dashboard/dieta/dieta/FetchDietas';

const PesquisarDietas = () => {
    const filtros = useFiltrosDieta();
    const [pagina, setPagina] = useState(1);
    const queryClient = useQueryClient();

    const { objetivos } = useFetchObjetivosDieta();
    const { niveis } = useFetchNiveisDieta();

    const secoes = useMemo(() => ([
        { titulo: 'Objetivo', tipo: 'objetivos' as const, dados: objetivos },
        { titulo: 'Nível', tipo: 'niveis' as const, dados: niveis },
    ]), [objetivos, niveis]);

    const isSuccessBadges = !!objetivos && !!niveis;

    const pesquisaDebounce = useDebounce(filtros.pesquisa, 500);

    const { dadosUsuario } = useFetchUsuario();
    const filtroCalorias = useFiltroCaloriasMeta(dadosUsuario?.caloriasDiarias);

    const filtrosPesquisa = useMemo(() => ({
        ...filtros.filtros,
        nome: pesquisaDebounce,
        ...filtroCalorias.params(),
    }), [pesquisaDebounce, filtros.filtros, filtroCalorias]);

    const { dietas, isPending } = useFetchDietas(filtrosPesquisa, pagina);

    // Adiciona a dieta às "Minhas dietas" e atualiza a lista de adicionadas
    const adicionarDieta = async (dieta: Dieta) => {
        await api.post(`/dashboard/dietas/dieta/${dieta.id}/adicionar`);
        queryClient.invalidateQueries({ queryKey: ['dietas', 'adicionados'] });
    };

    return (
        <div className="flex flex-col gap-2 w-full">

            <FiltrosPesquisa
                abrirMenuFiltro={filtros.abrirMenuFiltro}
                quantidadeFiltros={filtros.quantidadeFiltros}
                pesquisa={filtros.pesquisa}
                setPesquisa={filtros.setPesquisa}
            />

            {/* <FiltrosChips
                secoes={secoes}
                filtros={filtros.filtros}
                removerFiltro={filtros.removerBadgeFiltro}
            /> */}

            <FiltroTreinoModal
                menuFiltroAberto={filtros.menuFiltroAberto}
                setMenuFiltroAberto={filtros.setMenuFiltroAberto}
                aplicarFiltros={filtros.aplicarFiltros}
                limparFiltros={filtros.limparFiltros}
            >
                {!isSuccessBadges ? (
                    <Texto className="animate-pulse">procurando filtros</Texto>
                ) : secoes.map(secao => (
                    secao.dados && (
                        <SecaoBadges
                            key={secao.tipo}
                            titulo={secao.titulo}
                            itens={secao.dados}
                            isSelecionado={id => filtros.isBadgeSelecionadoTemp(id, secao.tipo)}
                            onToggle={item => filtros.toggleBadgeTemp(item.id, secao.tipo)}
                        />
                    )
                ))}
            </FiltroTreinoModal>

            {!isPending ? (
                <>
                    <div className="flex flex-col gap-3">
                        {dietas?.data.map(dieta => (
                            <DietaCard
                                key={dieta.id}
                                dieta={dieta}
                                onAdicionar={adicionarDieta}
                            />
                        ))}
                    </div>

                    <Paginacao pagina={pagina} setPagina={setPagina} meta={dietas?.meta} />
                </>
            ) : (
                <Texto className="animate-pulse">procurando dietas...</Texto>
            )}

        </div>
    );
};

export default PesquisarDietas;