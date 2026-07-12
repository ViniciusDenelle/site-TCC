import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { Badge, Filtros, TipoFiltros } from './exercicios/FetchExercicio'

export type SecaoFiltro = {
    titulo: string,
    tipo: keyof Filtros,
    dados: Badge[]
}

export interface UseFiltrosProps {
    menuFiltroAberto?: boolean;
    setMenuFiltroAberto?: Dispatch<SetStateAction<boolean>>;

    pesquisa?: string;
    setPesquisa?: Dispatch<SetStateAction<string>>;

    filtros?: Filtros;
    setFiltros?: Dispatch<SetStateAction<Filtros>>;

    filtrosTemp?: Filtros;
    setFiltrosTemp?: Dispatch<SetStateAction<Filtros>>;

    adicionarFiltro?: (id: number, tipo: TipoFiltros) => void;
    removerFiltro?: (id: number, tipo: TipoFiltros) => void;

    quantidadeFiltros?: number;
}

const useFiltrosTreinos = () => {

    const [menuFiltroAberto, setMenuFiltroAberto] = useState<boolean>(false)

    const [pesquisa, setPesquisa] = useState<string>('')

    const [filtros, setFiltros] = useState<Filtros>({})
    const [filtrosTemp, setFiltrosTemp] = useState<Filtros>({})

    const adicionarFiltro = (filtroNovo: number, tipo: TipoFiltros) => {
        setFiltrosTemp(prev => {
            const items = prev[tipo] ?? [];

            return {
                ...prev,
                [tipo]: items.includes(filtroNovo)
                    ? items.filter(item => item !== filtroNovo)
                    : [...items, filtroNovo],
            };
        });
    }

    const removerFiltro = (filtroRemovido: number, tipo: TipoFiltros) => {
        setFiltros(prev => {
            return {
                ...prev,
                [tipo]: prev[tipo]?.filter(item => item !== filtroRemovido)
            }

        })
        setFiltrosTemp(prev => {
            return {
                ...prev,
                [tipo]: prev[tipo]?.filter(item => item !== filtroRemovido)
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
        adicionarFiltro,
        removerFiltro,
        filtros,
        setFiltros,
        filtrosTemp,
        setFiltrosTemp,
        quantidadeFiltros
    }
}

export default useFiltrosTreinos