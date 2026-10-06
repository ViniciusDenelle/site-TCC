import { useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import Texto from '../../../../componentes/organizacao/Texto';
import InputSimples from '../../../../componentes/inputs/InputSimples';
import Paginacao from '../../../../componentes/outros/Paginacao';
import BotaoSecundario from '../../../../componentes/botoes/BotaoSecundario';
import useDebounce from '../../../../logicas/useDebounce';
import useFiltrosAlimento from '../../../../logicas/dashboard/dieta/alimento/useFiltrosAlimento';
import useFetchAlimentos from '../../../../logicas/dashboard/dieta/alimento/FetchAlimentos';
import AlimentoCard from '../../../../componentes/cards/AlimentoCard';

function CampoRange({
    titulo, unidade, range, onAtualizar,
}: {
    titulo: string;
    unidade: string;
    range: { min: number | null; max: number | null };
    onAtualizar: (chave: 'min' | 'max', valor: number | null) => void;
}) {
    return (
        <div>
            <Texto tipo="subtexto" className="opacity-60 mb-1">{titulo} ({unidade})</Texto>
            <div className="flex items-center gap-2">
                <InputSimples
                    tipo="number"
                    valor={range.min ?? ''}
                    onChange={e => onAtualizar('min', e.target.value ? Number(e.target.value) : null)}
                    placeholder="mín"
                />
                <Texto className="opacity-50">até</Texto>
                <InputSimples
                    tipo="number"
                    valor={range.max ?? ''}
                    onChange={e => onAtualizar('max', e.target.value ? Number(e.target.value) : null)}
                    placeholder="máx"
                />
            </div>
        </div>
    );
}

const PesquisarAlimentos = () => {
    const filtros = useFiltrosAlimento();
    const [pagina, setPagina] = useState(1);

    const pesquisaDebounce = useDebounce(filtros.pesquisa, 500);

    const params = useMemo(() => ({
        ...filtros.montarParams(),
        nome: pesquisaDebounce || undefined,
    }), [filtros.calorias, filtros.proteinas, filtros.carboidratos, filtros.gorduras, pesquisaDebounce]);

    const { alimentos, isPending } = useFetchAlimentos(params, pagina);

    return (
        <div className="flex flex-col gap-2 w-full">

            <div className="flex gap-2">
                <InputSimples
                    tipo="text"
                    valor={filtros.pesquisa}
                    onChange={e => filtros.setPesquisa(e.target.value)}
                    placeholder="buscar alimento"
                    classeAdicional="w-full"
                />
                <BotaoSecundario
                    icone={SlidersHorizontal}
                    tipo="cheio"
                    onClick={() => filtros.setMenuFiltroAberto(prev => !prev)}
                />
            </div>

            {filtros.quantidadeFiltros > 0 && (
                <div className="flex items-center gap-2">
                    <Texto tipo="subtexto" className="opacity-60">
                        {filtros.quantidadeFiltros} filtro(s) de macro ativo(s)
                    </Texto>
                    <button onClick={filtros.limparFiltros} className="flex items-center gap-0.5">
                        <X className="size-3 opacity-60" />
                        <Texto tipo="subtexto" className="opacity-60">limpar</Texto>
                    </button>
                </div>
            )}

            {filtros.menuFiltroAberto && (
                <div className="rounded-2xl bg-base-secundaria border border-base-terciaria/30 p-3 flex flex-col gap-3">
                    <CampoRange
                        titulo="Calorias"
                        unidade="kcal"
                        range={filtros.calorias}
                        onAtualizar={(chave, valor) => filtros.setCalorias(prev => ({ ...prev, [chave]: valor }))}
                    />
                    <CampoRange
                        titulo="Proteínas"
                        unidade="g"
                        range={filtros.proteinas}
                        onAtualizar={(chave, valor) => filtros.setProteinas(prev => ({ ...prev, [chave]: valor }))}
                    />
                    <CampoRange
                        titulo="Carboidratos"
                        unidade="g"
                        range={filtros.carboidratos}
                        onAtualizar={(chave, valor) => filtros.setCarboidratos(prev => ({ ...prev, [chave]: valor }))}
                    />
                    <CampoRange
                        titulo="Gorduras"
                        unidade="g"
                        range={filtros.gorduras}
                        onAtualizar={(chave, valor) => filtros.setGorduras(prev => ({ ...prev, [chave]: valor }))}
                    />
                </div>
            )}

            {!isPending ? (
                <>
                    <div className="flex flex-col gap-2">
                        {alimentos?.data.map(alimento => (
                            <AlimentoCard key={alimento.id} alimento={alimento} />
                        ))}
                    </div>

                    <Paginacao pagina={pagina} setPagina={setPagina} meta={alimentos?.meta} />
                </>
            ) : (
                <Texto className="animate-pulse">procurando alimentos...</Texto>
            )}

        </div>
    );
};

export default PesquisarAlimentos;