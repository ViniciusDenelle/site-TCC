import React, { useState } from 'react'
import InputSimples from '../../../../componentes/InputSimples'
import BotaoSecundario from '../../../../componentes/BotaoSecundario'
import { Filter, Search, X } from 'lucide-react'
import WrapperIcone from '../../../../componentes/WrapperIcone'
import CardHorizontal from '../../../../componentes/CardHorizontal'
import Texto from '../../../../componentes/Texto'
import RadioCustomizado from '../../../../componentes/RadioCustomizado'
import useFetchBadge from '../../../../logicas/dashboard/treinos/FetchBadge'
import InputCheckbox from '../../../../componentes/InputCheckbox'
import { Badge } from '../../../../logicas/dashboard/treinos/exercicios/FetchExercicio'
import BotaoPrimario from '../../../../componentes/BotaoPrimario'

type Filtros = {
    musculos?: Badge[]
    equipamentos?: Badge[]
    tipos?: Badge[]
    categorias?: Badge[]
    niveis?: Badge[]
}

type TipoFiltros = keyof Filtros

const PesquisarExercicios = () => {

    const [menuFiltroAberto, setMenuFiltroAberto] = useState<boolean>(false)

    const [pesquisa, setPesquisa] = useState<string>('')

    const [filtros, setFiltros] = useState<Filtros>({})
    const [filtrosTemp, setFiltrosTemp] = useState<Filtros>({})

    const { data: musculos } = useFetchBadge('musculos')
    const { data: equipamentos } = useFetchBadge('equipamentos')
    const { data: categorias } = useFetchBadge('categorias')
    const { data: niveis } = useFetchBadge('niveis')
    const { data: tipos } = useFetchBadge('tipos')

    const adicionarFiltro = (filtroNovo: Badge, tipo: TipoFiltros) => {
        setFiltrosTemp(prev => {
            const items = prev[tipo] ?? [];

            return {
                ...prev,
                [tipo]: items.includes(filtroNovo)
                    ? items.filter(item => item !== filtroNovo)
                    : [...items, filtroNovo],
            };
        });
    }

    const removerFiltro = (filtroRemovido:Badge, tipo:TipoFiltros) => {
        setFiltros(prev => {
            return {
                ...prev,
                [tipo]: prev[tipo]?.filter(item => item !== filtroRemovido)
            }

        })
        setFiltrosTemp(prev => {
            return {
                ...prev,
                [tipo]: prev[tipo]?.filter(item => item !== filtroRemovido)
            }

        })

    }

    const secoes = [
        {
            titulo: 'Músculos',
            tipo: 'musculos' as const,
            dados: musculos,
        },
        {
            titulo: 'Equipamentos',
            tipo: 'equipamentos' as const,
            dados: equipamentos,
        },
        {
            titulo: 'Categorias',
            tipo: 'categorias' as const,
            dados: categorias,
        },
        {
            titulo: 'Níveis',
            tipo: 'niveis' as const,
            dados: niveis,
        },
        {
            titulo: 'Tipos',
            tipo: 'tipos' as const,
            dados: tipos,
        },
    ]

    const quantidadeFiltros = Object.values(filtros)
    .flat()
    .length

    return (
        <>
            <div className="flex flex-col gap-2 w-full">
                <div className="relative flex items-center w-full mt-4 h-8">

                    <div className="relative">
                        <BotaoSecundario
                            icone={Filter}
                            classeAdicional=' rounded-r-none'
                            onClick={() => setMenuFiltroAberto(prev => !prev)}
                        />

                        {quantidadeFiltros > 0 && (
                            <span className="absolute -top-1 -right-1 bg-destaque-p-claro/80 
                            rounded-full size-4 flex justify-center items-center">
                                {quantidadeFiltros}
                            </span>
                        )}

                    </div>

                    <InputSimples
                        classeAdicional='w-full rounded-l-none h-8'
                        placeholder='pesquisar'
                        valor={pesquisa}
                        onChange={ev => setPesquisa(ev.target.value)}
                    />

                    <div className="absolute top-1/2 -translate-y-1/2 right-3">
                        <WrapperIcone tamanho='sm'>
                            <Search className='w-full text-t-terciaria/80' />
                        </WrapperIcone>
                    </div>
                </div>

                {filtros && (
                    <div className="flex gap-1 overflow-x-scroll pb-2">
                        {secoes.map(secao => (
                            filtros[secao.tipo]?.map(filtro => (
                                <div key={filtro.id}
                                    className="flex gap-1 items-center 
                            bg-base-secundaria rounded-full px-1 overflow-x-hidden shrink-0">

                                    <button onClick={() => removerFiltro(filtro, secao.tipo)}>
                                        <WrapperIcone tamanho='xs'>
                                            <X className='size-full' />
                                        </WrapperIcone>
                                    </button>
                                    <Texto tipo='subtexto' className='truncate'>
                                        {filtro.nome}
                                    </Texto>
                                </div>
                            ))
                        ))}
                    </div>
                )}
            </div>

            {menuFiltroAberto && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-1100"
                        onClick={() => setMenuFiltroAberto(false)} />


                    <div className="fixed bottom-0 left-0 w-full z-1200">
                        <CardHorizontal className='relative not-first:h-100 rounded-b-none text-slate-200'>

                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={() => setMenuFiltroAberto(false)}
                                >
                                    <WrapperIcone tamanho='sm'>
                                        <X className='w-full' />
                                    </WrapperIcone>
                                </button>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Texto tipo='subtitulo' className='mx-auto'>
                                    filtros
                                </Texto>
                                <div className="flex flex-col gap-2 h-80 overflow-y-scroll">
                                    {secoes.map(secao => (
                                        <div key={secao.tipo}>
                                            <Texto>
                                                {secao.titulo}:
                                            </Texto>

                                            <div className="grid grid-cols-2 gap-y-1">
                                                {secao.dados.map(item => (
                                                    <InputCheckbox
                                                        key={item.id}
                                                        name={secao.tipo}
                                                        valor={item.id}
                                                        checked={filtrosTemp[secao.tipo]?.includes(item)}
                                                        onChange={() =>
                                                            adicionarFiltro(item, secao.tipo)
                                                        }
                                                    >
                                                        {item.nome}
                                                    </InputCheckbox>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <BotaoPrimario
                                    texto='aplicar filtros'
                                    onClick={() => setFiltros(filtrosTemp)}
                                />
                                <BotaoPrimario
                                    tipo='vazio'
                                    texto='limpar filtros'
                                    onClick={() => {
                                        setFiltrosTemp({})
                                        setFiltros({})
                                    }}
                                />
                            </div>
                        </CardHorizontal>
                    </div>
                </>
            )}

        </>
    )
}

export default PesquisarExercicios