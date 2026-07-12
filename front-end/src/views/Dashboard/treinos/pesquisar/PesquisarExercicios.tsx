import React, { useEffect, useMemo, useState } from 'react'
import Texto from '../../../../componentes/organizacao/Texto'
import useFetchBadge from '../../../../logicas/dashboard/treinos/FetchBadge'
import useFetchExercicios, { Badge, Filtros, TipoFiltros } from '../../../../logicas/dashboard/treinos/exercicios/FetchExercicio'
import Paginacao from '../../../../componentes/outros/Paginacao'
import useFiltrosTreinos from '../../../../logicas/dashboard/treinos/useFiltrosTreinos'
import ExercicioCard from '../../../../componentes/ExercicioCard'
import FiltrosPesquisa from '../../../../componentes/outros/FiltrosPesquisa'
import FiltrosChips from '../../../../componentes/outros/FiltrosChips'
import FiltroTreinoModal from '../../../../componentes/outros/FiltroTreinoModal'
import useDebounce from '../../../../logicas/useDebounce'

const PesquisarExercicios = () => {

    const filtros = useFiltrosTreinos()

    const { data: musculos } = useFetchBadge('musculos')
    const { data: equipamentos } = useFetchBadge('equipamentos')
    const { data: tipos } = useFetchBadge('tipos')
    const { data: niveis } = useFetchBadge('niveis')
    const { data: focos } = useFetchBadge('focos')

    const [pagina, setPagina] = useState<number>(1)

    const secoes = [
        {
            titulo: 'Músculos',
            tipo: 'musculos' as const,
            dados: musculos,
        },
        {
            titulo: 'Equipamentos',
            tipo: 'equipamentos' as const,
            dados: equipamentos,
        },
        {
            titulo: 'Tipos',
            tipo: 'tipos' as const,
            dados: tipos,
        },
        {
            titulo: 'Níveis',
            tipo: 'niveis' as const,
            dados: niveis,
        },
        {
            titulo: 'Focos',
            tipo: 'focos' as const,
            dados: focos,
        },
    ]

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
        <>
            <div className="flex flex-col gap-2 w-full">

                <FiltrosPesquisa
                    {...filtros}
                />

                <FiltrosChips
                    secoes={secoes}
                    filtros={filtros.filtros}
                    removerFiltro={filtros.removerFiltro}
                />

                <FiltroTreinoModal
                    secoes={secoes}
                    {...filtros}
                />


                {!isPending ? (
                    <>
                        <div className="flex w-full justify-center items-center">
                            <div className="grid grid-rows-5 gap-y-2 w-full">
                                {exercicios?.data.map(exercicio => (
                                    <ExercicioCard
                                        key={exercicio.id}
                                        exercicio={exercicio}
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




        </>
    )
}

export default PesquisarExercicios