// hooks/selecao/useSelecaoMultipla.ts
import { useState } from 'react';

function useSelecaoMultipla<T extends { id: number }>(inicial: T[] = []) {
    const [selecionados, setSelecionados] = useState<T[]>(inicial);

    function toggle(item: T) {
        setSelecionados(prev =>
            prev.some(i => i.id === item.id)
                ? prev.filter(i => i.id !== item.id)
                : [...prev, item]
        );
    }

    function remover(id: number) {
        setSelecionados(prev => prev.filter(i => i.id !== id));
    }

    function isSelecionado(id: number) {
        return selecionados.some(i => i.id === id);
    }

    function limpar() {
        setSelecionados([]);
    }

    return { selecionados, toggle, remover, isSelecionado, limpar, setSelecionados };
}

export default useSelecaoMultipla;