import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { Badge } from './exercicios/FetchExercicio'
import { Filtros, TipoFiltros } from './tipagens/FiltrosProps'

const useFiltrosTreinos = () => {

    const [menuFiltroAberto, setMenuFiltroAberto] = useState<boolean>(false)

    const [pesquisa, setPesquisa] = useState<string>('')

    const [filtros, setFiltros] = useState<Filtros>({})
    const [filtrosTemp, setFiltrosTemp] = useState<Filtros>({})

    const adicionarBadgeFiltro = (filtroNovo: number, tipo: TipoFiltros) => {
        setFiltrosTemp(prev => {
            const items = prev[tipo] ?? [];
            console.log(items)

            return {
                ...prev,
                [tipo]: items.includes(filtroNovo)
                    ? items.filter(item => item !== filtroNovo)
                    : [...items, filtroNovo],
            };
        });
    }

    const removerBadgeFiltro = (filtroRemovido: number, tipo: TipoFiltros) => {
        setFiltros(prev => {
            return {
                ...prev,
                [tipo]: prev.badges[tipo]?.filter(item => item !== filtroRemovido)
            }

        })
        setFiltrosTemp(prev => {
            return {
                ...prev,
                [tipo]: prev.badges[tipo]?.filter(item => item !== filtroRemovido)
            }

        })

    }


    const quantidadeFiltros = useMemo(() => {
        return Object.values(filtros)
            .flat()
            .length
    }, [filtros])

    return {
        menuFiltroAberto,
        setMenuFiltroAberto,
        pesquisa,
        setPesquisa,
        adicionarBadgeFiltro,
        removerBadgeFiltro,
        filtros,
        setFiltros,
        filtrosTemp,
        setFiltrosTemp,
        quantidadeFiltros
    }
}

export default useFiltrosTreinos