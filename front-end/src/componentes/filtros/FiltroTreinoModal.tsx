import { AnimatePresence } from 'framer-motion'
import {motion} from 'framer-motion'
import React, { ReactNode } from 'react'
import WrapperIcone from '../organizacao/WrapperIcone'
import { X } from 'lucide-react'
import Texto from '../organizacao/Texto'
import InputCheckbox from '../inputs/InputCheckbox'
import BotaoPrimario from '../botoes/BotaoPrimario'
import CardHorizontal from '../CardHorizontal'
import { UseFiltrosProps } from '../../logicas/dashboard/treinos/tipagens/FiltrosProps'

type FiltroModalProps = UseFiltrosProps & {
    children: ReactNode
}

const FiltroTreinoModal = ({
    menuFiltroAberto,
    setMenuFiltroAberto,
    filtrosTemp,
    setFiltros,
    setFiltrosTemp,
    children,
} : FiltroModalProps) => {
    return (
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
                        <CardHorizontal className='relative not-first:h-100 rounded-b-none '>

                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={() => setMenuFiltroAberto(false)}
                                >
                                    <WrapperIcone tamanho='sm'>
                                        <X className='w-full' />
                                    </WrapperIcone>
                                </button>
                            </div>

                            <div className="flex flex-col gap-2 text-slate-200">
                                <Texto tipo='subtitulo' className='mx-auto'>
                                    filtros
                                </Texto>
                                <div className="flex flex-col gap-2 h-80 overflow-y-scroll">
                                    {children}
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
    )
}

export default FiltroTreinoModal