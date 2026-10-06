import { Dispatch, ReactNode, SetStateAction } from "react"
import { Badge } from "../exercicios/FetchExercicio"

export type Filtros = {
    badges?: {
        musculos?: number[]
        equipamentos?: number[]
        focos?: number[]
        tipos?: number[]
        niveis?: number[]
    }
    duracao?: [
        min: number,
        max: number
    ]
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

export type TipoFiltros =  'musculos' | 'equipamentos' | 'focos' | 'tipos' | 'niveis' | 'duracao'

export type SecaoFiltro = {
    titulo: string,
    tipo: TipoFiltros,
    dados?: Badge[] 
    componente?: ReactNode
}

