// hooks/selecao/useSelecaoComMetadado.ts
import { useState } from 'react';

function useSelecaoComDados<T extends { id: number }, M>(metadadoPadrao: M) {
    const [selecionados, setSelecionados] = useState<(T & { metadado: M })[]>([]);

    function toggle(item: T, metadado: M = metadadoPadrao) {
        setSelecionados(prev =>
            prev.some(i => i.id === item.id)
                ? prev.filter(i => i.id !== item.id)
                : [...prev, { ...item, metadado }]
        );
    }

    function atualizarDados(id: number, metadado: M) {
        setSelecionados(prev => prev.map(i => i.id === id ? { ...i, metadado } : i));
    }

    function remover(id: number) {
        setSelecionados(prev => prev.filter(i => i.id !== id));
    }

    function isSelecionado(id: number) {
        return selecionados.some(i => i.id === id);
    }

    return { selecionados, toggle, atualizarDados, remover, isSelecionado, setSelecionados };
}

export default useSelecaoComDados;