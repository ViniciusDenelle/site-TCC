// logicas/dashboard/dietas/useFiltrosAlimento.ts
import { useState } from 'react';

type Range = { min: number | null; max: number | null };

const rangeVazio: Range = { min: null, max: null };

const useFiltrosAlimento = () => {
    const [pesquisa, setPesquisa] = useState('');

    const [calorias, setCalorias] = useState<Range>(rangeVazio);
    const [proteinas, setProteinas] = useState<Range>(rangeVazio);
    const [carboidratos, setCarboidratos] = useState<Range>(rangeVazio);
    const [gorduras, setGorduras] = useState<Range>(rangeVazio);

    const [menuFiltroAberto, setMenuFiltroAberto] = useState(false);

    function limparFiltros() {
        setCalorias(rangeVazio);
        setProteinas(rangeVazio);
        setCarboidratos(rangeVazio);
        setGorduras(rangeVazio);
    }

    const quantidadeFiltros = [calorias, proteinas, carboidratos, gorduras]
        .filter(r => r.min != null || r.max != null)
        .length;

    function montarParams() {
        return {
            nome: pesquisa || undefined,
            calorias_min: calorias.min ?? undefined,
            calorias_max: calorias.max ?? undefined,
            proteinas_min: proteinas.min ?? undefined,
            proteinas_max: proteinas.max ?? undefined,
            carboidratos_min: carboidratos.min ?? undefined,
            carboidratos_max: carboidratos.max ?? undefined,
            gorduras_min: gorduras.min ?? undefined,
            gorduras_max: gorduras.max ?? undefined,
        };
    }

    return {
        pesquisa, setPesquisa,
        calorias, setCalorias,
        proteinas, setProteinas,
        carboidratos, setCarboidratos,
        gorduras, setGorduras,
        menuFiltroAberto, setMenuFiltroAberto,
        limparFiltros,
        quantidadeFiltros,
        montarParams,
    };
};

export default useFiltrosAlimento;