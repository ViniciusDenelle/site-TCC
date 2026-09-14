// logicas/dashboard/treinos/selecionaveis/useRange.ts
import { useState } from 'react';

type Range = { min: number | null; max: number | null };

function useRange() {
    const [range, setRange] = useState<Range>({ min: null, max: null });

    function atualizar(chave: 'min' | 'max', valor: number | null) {
        setRange(prev => ({ ...prev, [chave]: valor }));
    }

    function limpar() {
        setRange({ min: null, max: null });
    }

    return { range, atualizar, limpar };
}

export default useRange;