// hooks/selecao/useSelecaoComMetadado.ts
import { arrayMove } from '@dnd-kit/sortable';
import { Reorder } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';

export type ItemComDados<T, M> = T & { metadado: M };

export interface UseSelecaoComDadosProps<T extends { id: number }, M> {
    selecionados: ItemComDados<T, M>[];
    toggle: (item: T, metadado?: M) => void;
    atualizarDados: (id: number, metadado: M) => void;
    remover: (id: number) => void;
    isSelecionado: (id: number) => boolean;
    setSelecionados: Dispatch<SetStateAction<ItemComDados<T, M>[]>>;
    reordenar: (oldIndex: number, newIndex: number) => void;
}

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

    function reordenar(oldIndex: number, newIndex: number) {
        setSelecionados(prev => arrayMove(prev, oldIndex, newIndex));
    }

    return { 
        selecionados, 
        toggle, 
        atualizarDados, 
        remover, 
        isSelecionado, 
        setSelecionados,
        reordenar
    };
}

export default useSelecaoComDados;