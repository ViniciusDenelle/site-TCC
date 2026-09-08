// hooks/selecao/useSelecaoUnica.ts
import { Dispatch, SetStateAction, useState } from 'react';

export interface UseSelecaoUnicaProps<T extends { id: number }> {
    selecionado: T | null;
    selecionar: (item: T) => void;
    isSelecionado: (id: number) => boolean;
    limpar: () => void;
    setSelecionado: Dispatch<SetStateAction<T | null>>;
}

function useSelecaoUnica<T extends { id: number }>() {
    const [selecionado, setSelecionado] = useState<T | null>(null);

    function selecionar(item: T) {
        setSelecionado(prev => prev?.id === item.id ? null : item);
    }

    function isSelecionado(id: number) {
        return selecionado?.id === id;
    }

    function limpar() {
        setSelecionado(null);
    }

    return { selecionado, selecionar, isSelecionado, limpar, setSelecionado };
}

export default useSelecaoUnica;