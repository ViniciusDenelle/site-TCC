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

const FiltroRange = ({ min, max, valor1, valor2, onChange }) => {
  return (
    <div className="relative flex flex-col gap-2 mb-2">
      <div className="flex gap-4 items-center">

        <div className="flex gap-1 items-center">
          <Texto>
            Mínimo:
          </Texto>

          <InputSimples
            valor={valor1}
            onChange={ev => onChange(ev.target.value, valor2)}
            tipo='number'
            classeAdicional='w-15'
            minimo={min}
          />
        </div>

        <div className="flex gap-1 items-center">
          <Texto>
            Máximo:
          </Texto>
          <InputSimples
            valor={valor2}
            onChange={ev => onChange(valor1, ev.target.value)}
            tipo='number'
            classeAdicional='w-15'
            maximo={max}
          />
        </div>
      </div>

      <InputRangeMinMax
        valor={[valor1 ?? 1, valor2 ?? 120]}
        onChange={([val1, val2]) => onChange(val1, val2)}
        min={min}
        max={max}
      />

      <div className="absolute top-full pt-1 left-0 w-full 
                flex justify-between">
        <Texto tipo='subtexto'>
          1
        </Texto>
        <Texto tipo='subtexto'>
          60
        </Texto>
        <Texto tipo='subtexto'>
          120
        </Texto>

      </div>

    </div>
  )
}

const PesquisarTreino = () => {
  // secoes usadas para organizar o modal de filtros, tambem no caso das badges usadas para saber qual o nome do chip
  // secoes serve para saber qual tipo de filtro é e como deve ser renderizado, tanto no modal quanto nos chips
  // titulo, tipo(badge, range etc.), campo(musculos, duracao etc.), 
  const filtros = useFiltrosTreinos()
  const { secoes } = useFetchBadgesCompartilhadas()
  const { data: tipoTreino } = useFetchBadge('tiposTreino')
  const [pagina, setPagina] = useState<number>(1)
  const [min, setMin] = useState<number>(null)
  const [Max, setMax] = useState<number>(null)

  const secoesCompletas: SecaoFiltro[] = useMemo(() => {
    if (!secoes || !tipoTreino) return []

    return [
      {
        titulo: 'Tipos',
        tipo: 'tipos' as const,
        dados: tipoTreino,
        render: 'checkbox' as const
      },

      ...secoes
    ]

  }, [secoes, tipoTreino])

  console.log(filtros)

  // const pesquisaDebounce = useDebounce(filtros.pesquisa, 500)

  // const filtrosPesquisa = useMemo(() => {
  //   return {
  //     ...filtros.filtros,
  //     nome: pesquisaDebounce
  //   }
  // }, [pesquisaDebounce, filtros.filtros])

  // const {
  //   treinos,
  //   isPending
  // } = useFetchTreinos(filtrosPesquisa, pagina)



  return (
    <div className='flex flex-col gap-2 w-full'>

      <FiltrosPesquisa
        {...filtros}
      />

      <FiltrosChips
        secoes={secoesCompletas}
        filtros={filtros.filtros}
        removerFiltro={filtros.removerBadgeFiltro}
      />

      <FiltroTreinoModal
        {...filtros}

      >
        {secoesCompletas.length < 1 ? (
          <Texto className='animate-pulse'>
            procurando filtros
          </Texto>
        ) : (
          <>
            <FiltroRange
              valor1={filtros.filtrosTemp.duracao?.[0] ?? 1}
              valor2={filtros.filtrosTemp.duracao?.[1] ?? 120}
              min={1}
              max={120}
              onChange={(minimo, maximo) => filtros.setFiltrosTemp(prev => {
                return {
                  ...prev,
                  duracao: [minimo, maximo]
                }
              })}
            />,
            {secoesCompletas.map(secao => (
              <div key={secao.tipo}>
                <Texto>
                  {secao.titulo}:
                </Texto>
                {secao.render === 'checkbox' ? (
                  <div className="grid grid-cols-2 gap-y-1">
                    {secao.dados.map(item => (
                      <InputCheckbox
                        key={item.id}
                        name={secao.tipo}
                        valor={item.id}
                        checked={filtros.filtrosTemp[secao.tipo]?.includes(item.id)}
                        onChange={() =>
                          filtros.adicionarBadgeFiltro(item.id, secao.tipo)
                        }
                      >
                        {item.nome}
                      </InputCheckbox>
                    ))}
                  </div>

                ) : (
                  secao.componente
                )}t

              </div>
            ))}
          </>
        )}
      </FiltroTreinoModal>

    </div>
  )
}

export default PesquisarTreino