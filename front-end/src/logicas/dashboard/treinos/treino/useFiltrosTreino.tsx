// logicas/dashboard/treinos/treino/useFiltrosTreino.ts
import { useMemo, useState } from 'react';
import { Badge } from '../exercicios/FetchExercicio';
import useRange from '../selecionaveis/useRange';

type Filtros = Partial<Record<'foco_id' | 'nivel_id' | 'tipo_id', number[]>>;

const useFiltrosTreino = () => {
    const [pesquisa, setPesquisa] = useState('');
    const [filtros, setFiltros] = useState<Filtros>({});
    const [filtrosTemp, setFiltrosTemp] = useState<Filtros>({});

    const calorias = useRange();
    const tempo = useRange();

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
        calorias.limpar();
        tempo.limpar();
    }

    const quantidadeFiltros = useMemo(() => {
        const totalIds = Object.values(filtros).flat().length;
        const totalRanges = [calorias.range, tempo.range].filter(
            r => r.min != null || r.max != null
        ).length;
        return totalIds + totalRanges;
    }, [filtros, calorias.range, tempo.range]);

    return {
        pesquisa, setPesquisa,
        filtros, filtrosTemp,
        toggleBadgeTemp, isBadgeSelecionadoTemp,
        calorias, tempo,
        menuFiltroAberto, setMenuFiltroAberto, abrirMenuFiltro,
        aplicarFiltros, limparFiltros,
        quantidadeFiltros,
    };
};

export default useFiltrosTreino;