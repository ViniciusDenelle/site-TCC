import React, { useMemo, useState } from 'react'
import useFiltrosTreinos from '../../../../logicas/dashboard/treinos/useFiltrosTreinos'
import useFetchBadgesCompartilhadas from '../../../../logicas/dashboard/treinos/FetchBadgesCompartilhadas'
import FiltrosPesquisa from '../../../../componentes/filtros/FiltrosPesquisa'
import FiltrosChips from '../../../../componentes/filtros/FiltrosChips'
import FiltroTreinoModal from '../../../../componentes/filtros/FiltroTreinoModal'
import useFetchBadge from '../../../../logicas/dashboard/treinos/FetchBadge'
import useDebounce from '../../../../logicas/useDebounce'
import useFetchTreinos from '../../../../logicas/dashboard/treinos/treino/FetchTreinos'
import Texto from '../../../../componentes/organizacao/Texto'
import InputCheckbox from '../../../../componentes/inputs/InputCheckbox'
import InputRangeMinMax from '../../../../componentes/inputs/InputRangeMinMax'
import InputSimples from '../../../../componentes/inputs/InputSimples'
import { SecaoFiltro } from '../../../../logicas/dashboard/treinos/tipagens/FiltrosProps'
import CardHorizontal from '../../../../componentes/CardHorizontal';
import SecaoBadges from '../../../../componentes/SecaoBadges';
import Paginacao from '../../../../componentes/outros/Paginacao';
import useFiltrosTreino from '../../../../logicas/dashboard/treinos/treino/useFiltrosTreino'
import TreinoCard from '../../../../componentes/cards/TreinoCard'

type Props = {
  titulo: string;
  min: number | null;
  max: number | null;
  onAtualizar: (chave: 'min' | 'max', valor: number | null) => void;
  placeholderMin?: string;
  placeholderMax?: string;
};

function FiltroRange({
  titulo,
  min,
  max,
  onAtualizar,
  placeholderMin = 'min',
  placeholderMax = 'max',
}: Props) {
  return (
    <div>
      <Texto tipo='subtitulo' className="font-medium mb-1">{titulo}</Texto>
      <div className="flex items-center gap-2 w-full">
        <InputSimples
          tipo="number"
          valor={min ?? ''}
          onChange={e => onAtualizar('min', e.target.value ? Number(e.target.value) : null)}
          placeholder={placeholderMin}
          classeAdicional='w-1/2'
        />
        <Texto className="opacity-50">até</Texto>
        <InputSimples
          tipo="number"
          valor={max ?? ''}
          onChange={e => onAtualizar('max', e.target.value ? Number(e.target.value) : null)}
          placeholder={placeholderMax}
          classeAdicional='w-1/2'
        />
      </div>
    </div>
  );
}

const PesquisarTreinos = ({
  adicionarTreino
}) => {
  const filtros = useFiltrosTreino();
  const [pagina, setPagina] = useState(1);

  const { secoes, isSuccess: isSuccessBadges } = useFetchBadgesCompartilhadas('treino');

  const pesquisaDebounce = useDebounce(filtros.pesquisa, 500);

  const { data: treinos, isPending } = useFetchTreinos(
    filtros.filtros,
    pesquisaDebounce,
    filtros.calorias.range,
    filtros.tempo.range,
    pagina
  );

  return (
    <div className="flex flex-col gap-2 w-full">

      <FiltrosPesquisa
        abrirMenuFiltro={filtros.abrirMenuFiltro}
        quantidadeFiltros={filtros.quantidadeFiltros}
        pesquisa={filtros.pesquisa}
        setPesquisa={filtros.setPesquisa}
      />

      {filtros.menuFiltroAberto && (
        <FiltroTreinoModal
          menuFiltroAberto={filtros.menuFiltroAberto}
          setMenuFiltroAberto={filtros.setMenuFiltroAberto}
          aplicarFiltros={filtros.aplicarFiltros}
          limparFiltros={filtros.limparFiltros}
        >
            {!isSuccessBadges ? (
              <Texto className="animate-pulse">procurando filtros</Texto>
            ) : secoes.map(secao => (
              secao.dados && (
                <SecaoBadges
                  key={secao.tipo}
                  titulo={secao.titulo}
                  itens={secao.dados}
                  isSelecionado={id => filtros.isBadgeSelecionadoTemp(id, secao.tipo as any)}
                  onToggle={item => filtros.toggleBadgeTemp(item.id, secao.tipo as any)}
                  limiteItems={6}
                />
              )
            ))}

            <FiltroRange
              titulo="Calorias estimadas"
              min={filtros.calorias.range.min}
              max={filtros.calorias.range.max}
              onAtualizar={filtros.calorias.atualizar}
            />

            <FiltroRange
              titulo="Tempo estimado (min)"
              min={filtros.tempo.range.min}
              max={filtros.tempo.range.max}
              onAtualizar={filtros.tempo.atualizar}
            />
        </FiltroTreinoModal>
      )}

      {!isPending ? (
        <>
          <div className="flex flex-col gap-2">
            {treinos?.data.map((treino: any) => (
              <TreinoCard 
                adicionarTreino={adicionarTreino}
                treino={treino}
              />
            ))}
          </div>

          <Paginacao pagina={pagina} setPagina={setPagina} meta={treinos?.meta} />
        </>
      ) : (
        <Texto className="animate-pulse">procurando treinos...</Texto>
      )}

    </div>
  );
};

export default PesquisarTreinos;