import { useMemo, useState } from 'react'
import Texto from '../../../../componentes/organizacao/Texto'
import Paginacao from '../../../../componentes/outros/Paginacao'
import ExercicioCard from '../../../../componentes/ExercicioCard'
import FiltrosPesquisa from '../../../../componentes/filtros/FiltrosPesquisa'
import FiltrosChips from '../../../../componentes/filtros/FiltrosChips'
import FiltroTreinoModal from '../../../../componentes/filtros/FiltroTreinoModal'
import SecaoBadges from '../../../../componentes/SecaoBadges'
import useDebounce from '../../../../logicas/useDebounce'
import useFiltrosExercicio from '../../../../logicas/dashboard/treinos/exercicios/useFiltrosExercicio'
import useFetchBadgesCompartilhadas from '../../../../logicas/dashboard/treinos/FetchBadgesCompartilhadas'
import useFetchExercicios from '../../../../logicas/dashboard/treinos/exercicios/FetchExercicio'
import { ResExercicioProps } from '../../../../logicas/dashboard/treinos/exercicios/FetchExercicio'

type Props = {
    adcionarExercicio: (exercicio: ResExercicioProps) => void;
    exerciciosSelecionadosIds?: number[];
}

const PesquisarExercicios = ({
    adcionarExercicio,
    exerciciosSelecionadosIds = [],
}: Props) => {

    const filtros = useFiltrosExercicio()

    const { secoes, isSuccess: isSuccessBadges } = useFetchBadgesCompartilhadas('exercicio')

    const [pagina, setPagina] = useState<number>(1)

    const pesquisaDebounce = useDebounce(filtros.pesquisa, 500)

    const filtrosPesquisa = useMemo(() => {
        return {
            ...filtros.filtros,
            nome: pesquisaDebounce
        }
    }, [pesquisaDebounce, filtros.filtros])

    const {
        exercicios,
        isPending
    } = useFetchExercicios(filtrosPesquisa, pagina)

    return (
        <div className="flex flex-col gap-2 w-full">

            <FiltrosPesquisa
                abrirMenuFiltro={filtros.abrirMenuFiltro}
                quantidadeFiltros={filtros.quantidadeFiltros}
                pesquisa={filtros.pesquisa}
                setPesquisa={filtros.setPesquisa}
            />

            {/* <FiltrosChips
                secoes={secoes ?? []}
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
                    <Texto className='animate-pulse'>
                        procurando filtros
                    </Texto>
                ) : (
                    secoes?.map(secao => (
                        secao.dados && (
                            <SecaoBadges
                                key={secao.tipo}
                                titulo={secao.titulo}
                                itens={secao.dados}
                                isSelecionado={id => filtros.isBadgeSelecionadoTemp(id, secao.tipo as any)}
                                onToggle={item => filtros.toggleBadgeTemp(item.id, secao.tipo as any)}
                                limiteItems={6}
                            />
                        )
                    ))
                )}
            </FiltroTreinoModal>

            {!isPending ? (
                <>
                    <div className="flex w-full justify-center items-center">
                        <div className="grid grid-rows-5 gap-y-2 w-full">
                            {exercicios?.data.map(exercicio => (
                                <ExercicioCard
                                    key={exercicio.id}
                                    exercicio={exercicio}
                                    adcionarExercicio={adcionarExercicio}
                                    // selecionado={exerciciosSelecionadosIds.includes(exercicio.id)}
                                    // onSelecionar={() => adcionarExercicio(exercicio)}
                                />
                            ))}
                        </div>
                    </div>

                    <Paginacao
                        pagina={pagina}
                        setPagina={setPagina}
                        meta={exercicios?.meta}
                    />
                </>
            ) : (
                <Texto className='animate-pulse'>
                    procurando exercicios...
                </Texto>
            )}

        </div>
    )
}

export default PesquisarExercicios