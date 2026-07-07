import React, { useState } from 'react'
import InputSimples from '../../../../componentes/InputSimples'
import BotaoSecundario from '../../../../componentes/BotaoSecundario'
import { Filter, Search, X } from 'lucide-react'
import WrapperIcone from '../../../../componentes/WrapperIcone'
import CardHorizontal from '../../../../componentes/CardHorizontal'
import Texto from '../../../../componentes/Texto'
import RadioCustomizado from '../../../../componentes/RadioCustomizado'

const PesquisarExercicios = () => {

    const [menuFiltroAberto, setMenuFiltroAberto] = useState<boolean>(false)

    const [pesquisa, setPesquisa] = useState<string>('')

    const [filtros, setFiltros] = useState<string[]>([
        'comunidade', 'hipertrofia','comunidade', 'hipertrofia','comunidade', 'hipertrofia',
        'comunidade', 'hipertrofia','comunidade', 'hipertrofia','comunidade', 'hipertrofia',
    ])

    return (
        <>
            <div className="flex flex-col gap-2 w-full">
                <div className="relative flex items-center w-full mt-4 h-8">

                    <BotaoSecundario
                        icone={Filter}
                        classeAdicional=' rounded-r-none'
                        onClick={() => setMenuFiltroAberto(prev => !prev)}
                    />

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

                {filtros.length !== 0 && (
                    <div className="flex gap-1 overflow-x-scroll pb-2">
                        {filtros.map(filtro => (
                            <div className="flex gap-1 items-center 
                            bg-base-secundaria rounded-full px-1">

                                    <WrapperIcone tamanho='xs'>
                                        <X className='size-full'/>
                                    </WrapperIcone>
                                <Texto tipo='subtexto'>
                                    {filtro}
                                </Texto>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {menuFiltroAberto && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-1100"
                        onClick={() => setMenuFiltroAberto(false)} />


                    <div className="fixed bottom-0 left-0 w-full z-1200">
                        <CardHorizontal className='relative not-first:h-100 rounded-b-none'>

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
                                <Texto tipo='subtitulo' className='flex justify-center'>
                                    Filtros
                                </Texto>

                                {/* filtros */}
                                <div className="flex flex-col gap-2 overflow-scroll h-80">
                                    <Texto>
                                        musculos:
                                    </Texto>
                                    <div className="grid grid-cols-2 grid-rows-6 gap-y-1">
                                        {filtros.map(musculo => (
                                            <RadioCustomizado
                                                classeAdicional='w-full h-full bg-transparent border-transparent'
                                                name={'musculos'}
                                                valor={musculo}
                                            >
                                                {musculo}
                                            </RadioCustomizado>
                                        ))}
                                    </div>

                                    <Texto>
                                        equipamentos:
                                    </Texto>
                                    <div className="grid grid-cols-2 grid-rows-6 gap-y-1">
                                        {filtros.map(musculo => (
                                            <RadioCustomizado
                                                classeAdicional='w-full h-full bg-transparent border-transparent'
                                                name={'musculos'}
                                                valor={musculo}
                                            >
                                                {musculo}
                                            </RadioCustomizado>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </CardHorizontal>
                    </div>
                </>
            )}

        </>
    )
}

export default PesquisarExercicios