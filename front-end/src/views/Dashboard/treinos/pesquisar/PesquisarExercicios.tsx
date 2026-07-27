import React, { useEffect, useMemo, useState } from 'react'
import Texto from '../../../../componentes/organizacao/Texto'
import useFetchBadge from '../../../../logicas/dashboard/treinos/FetchBadge'
import Paginacao from '../../../../componentes/outros/Paginacao'
import useFiltrosTreinos from '../../../../logicas/dashboard/treinos/useFiltrosTreinos'
import ExercicioCard from '../../../../componentes/ExercicioCard'
import FiltrosPesquisa from '../../../../componentes/filtros/FiltrosPesquisa'
import FiltrosChips from '../../../../componentes/filtros/FiltrosChips'
import FiltroTreinoModal from '../../../../componentes/filtros/FiltroTreinoModal'
import useDebounce from '../../../../logicas/useDebounce'
import useFetchBadgesCompartilhadas from '../../../../logicas/dashboard/treinos/FetchBadgesCompartilhadas'
import InputCheckbox from '../../../../componentes/inputs/InputCheckbox'
import useFetchExercicios from '../../../../logicas/dashboard/treinos/exercicios/FetchExercicio'

const PesquisarExercicios = () => {

    const filtros = useFiltrosTreinos()

    const { data: tipos } = useFetchBadge('tiposExercicio')

    const { secoes } = useFetchBadgesCompartilhadas()

    const [pagina, setPagina] = useState<number>(1)

    const secoesCompletas = useMemo(() => {
        if (!secoes) return []

        return [
            ...secoes,
            {
                titulo: 'Tipos',
                tipo: 'tipos' as const,
                dados: tipos,
            },
        ]
    }, [secoes])

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
                    secoes={secoesCompletas}
                    filtros={filtros.filtros}
                    removerFiltro={filtros.removerBadgeFiltro}
                />

                <FiltroTreinoModal
                    {...filtros}
                >
                    {secoesCompletas.some(secao => secao.dados === undefined) ? (
                        <Texto className='animate-pulse'>
                            procurando filtros
                        </Texto>
                    ) : (
                        secoesCompletas.map(secao => (
                            <div key={secao.tipo}>
                                <Texto>
                                    {secao.titulo}:
                                </Texto>

                                <div className="grid grid-cols-2 gap-y-1">
                                    {secao.dados.map(item => (
                                        <InputCheckbox
                                            key={item.id}
                                            name={secao.tipo}
                                            valor={item.id}
                                            checked={filtros.filtrosTemp[secao.tipo]?.includes(item.id)}
                                            onChange={() =>
                                                filtros.adicionarBadgeFiltro(item.id, secao.tipo)
                                            }
                                        >
                                            {item.nome}
                                        </InputCheckbox>
                                    ))}
                                </div>
                            </div>
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