// logicas/dashboard/dietas/useFiltrosDieta.ts
import { useMemo, useState } from 'react';

type Filtros = Partial<Record<'objetivos' | 'niveis', number[]>>;

const useFiltrosDieta = () => {
    const [pesquisa, setPesquisa] = useState('');
    const [filtros, setFiltros] = useState<Filtros>({});
    const [filtrosTemp, setFiltrosTemp] = useState<Filtros>({});
    const [menuFiltroAberto, setMenuFiltroAberto] = useState(false);

    function toggleBadgeTemp(id: number, tipo: keyof Filtros) {
        setFiltrosTemp(prev => {
            const items = prev[tipo] ?? [];
            return {
                ...prev,
                [tipo]: items.includes(id)
                    ? items.filter(item => item !== id)
                    : [...items, id],
            };
        });
    }

    function isBadgeSelecionadoTemp(id: number, tipo: keyof Filtros) {
        return (filtrosTemp[tipo] ?? []).includes(id);
    }

    function removerBadgeFiltro(id: number, tipo: keyof Filtros) {
        setFiltros(prev => ({ ...prev, [tipo]: prev[tipo]?.filter(item => item !== id) }));
        setFiltrosTemp(prev => ({ ...prev, [tipo]: prev[tipo]?.filter(item => item !== id) }));
    }

    function abrirMenuFiltro() {
        setFiltrosTemp(filtros);
        setMenuFiltroAberto(true);
    }

    function aplicarFiltros() {
        setFiltros(filtrosTemp);
        setMenuFiltroAberto(false);
    }

    function limparFiltros() {
        setFiltros({});
        setFiltrosTemp({});
    }

    const quantidadeFiltros = useMemo(() => Object.values(filtros).flat().length, [filtros]);

    return {
        pesquisa, setPesquisa,
        filtros, filtrosTemp,
        toggleBadgeTemp, isBadgeSelecionadoTemp, removerBadgeFiltro,
        menuFiltroAberto, setMenuFiltroAberto, abrirMenuFiltro,
        aplicarFiltros, limparFiltros,
        quantidadeFiltros,
    };
};

export default useFiltrosDieta;