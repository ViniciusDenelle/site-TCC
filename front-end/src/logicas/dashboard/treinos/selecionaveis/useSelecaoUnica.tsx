// hooks/selecao/useSelecaoUnica.ts
import { useState } from 'react';

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