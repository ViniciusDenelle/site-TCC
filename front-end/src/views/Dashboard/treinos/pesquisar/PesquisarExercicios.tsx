import React, { useEffect, useMemo, useState } from 'react'
import InputSimples from '../../../../componentes/InputSimples'
import BotaoSecundario from '../../../../componentes/BotaoSecundario'
import { Filter, Search, X } from 'lucide-react'
import WrapperIcone from '../../../../componentes/WrapperIcone'
import CardHorizontal from '../../../../componentes/CardHorizontal'
import Texto from '../../../../componentes/Texto'
import RadioCustomizado from '../../../../componentes/RadioCustomizado'
import useFetchBadge from '../../../../logicas/dashboard/treinos/FetchBadge'
import InputCheckbox from '../../../../componentes/InputCheckbox'
import useFetchExercicios, { Badge, Filtros, TipoFiltros } from '../../../../logicas/dashboard/treinos/exercicios/FetchExercicio'
import BotaoPrimario from '../../../../componentes/BotaoPrimario'
import { AnimatePresence, motion } from 'framer-motion'
import ExercicioCard from '../../../../componentes/ExercicioCard'


type ReqFetchExercicios = Filtros & { nome?: string }

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

    const adicionarFiltro = (filtroNovo: number, tipo: TipoFiltros) => {
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

    const removerFiltro = (filtroRemovido: number, tipo: TipoFiltros) => {
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
    const [filtrosNome, setFiltrosNome] = useState({
        ...filtros,
        nome: pesquisa,
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFiltrosNome({
                ...filtros,
                nome: pesquisa,
            })
        }, 300)

        return () => clearTimeout(timeout)
    }, [filtros, pesquisa])

    const { 
        exercicios,
        isPending
     } = useFetchExercicios(filtrosNome)

    return (
        <>
            <div className="flex flex-col gap-2 w-full">
                <div className="relative flex items-center w-full mt-4 h-8">

                    <div className="relative">
                        <BotaoSecundario
                            tipo='cheio'
                            icone={Filter}
                            classeAdicional=' rounded-r-none h-8'
                            onClick={() => {
                                setMenuFiltroAberto(true)
                                setFiltrosTemp(filtros)
                            }}
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
                            filtros[secao.tipo]?.map(filtro => {
                                const badge = secao.dados.find(badge => badge.id === filtro)

                                return (
                                    <div key={badge.id}
                                        className="flex gap-1 items-center 
                                bg-base-secundaria rounded-full px-1 overflow-x-hidden shrink-0">

                                        <button onClick={() => removerFiltro(badge.id, secao.tipo)}>
                                            <WrapperIcone tamanho='xs'>
                                                <X className='size-full' />
                                            </WrapperIcone>
                                        </button>
                                        <Texto tipo='subtexto' className='truncate'>
                                            {badge.nome}
                                        </Texto>
                                    </div>

                                )
                            }))
                        )}
                    </div>
                )}
                <div className="flex w-full justify-center items-center">
                    {!isPending ? (
                        <div className="grid grid-rows-20 gap-y-2 w-full">
                            {exercicios.map(exercicio => (
                                <ExercicioCard
                                    key={exercicio.id}
                                    exercicio={exercicio}
                                />
                            ))}
                        </div>
                    ) : (
                        <Texto>
                            procurando exercicios
                        </Texto>
                    )}
                </div>
            </div>


            <AnimatePresence>
                {menuFiltroAberto && (
                    <>
                        <div className="fixed inset-0 bg-black/50 z-1100"
                            onClick={() => setMenuFiltroAberto(false)} />

                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeOut'
                            }}
                            className="fixed bottom-0 left-0 w-full z-1200"
                        >
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
                                                            checked={filtrosTemp[secao.tipo]?.includes(item.id)}
                                                            onChange={() =>
                                                                adicionarFiltro(item.id, secao.tipo)
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
                                        onClick={() => {
                                            setFiltros(filtrosTemp)
                                            setMenuFiltroAberto(false)
                                        }}
                                    />
                                    <BotaoPrimario
                                        tipo='vazio'
                                        texto='limpar filtros'
                                        onClick={() => {
                                            setFiltrosTemp({})
                                            setFiltros({})
                                            setMenuFiltroAberto(false)
                                        }}
                                    />
                                </div>
                            </CardHorizontal>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </>
    )
}

export default PesquisarExercicios