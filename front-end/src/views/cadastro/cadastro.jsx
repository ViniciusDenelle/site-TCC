import React, { useEffect, useState } from 'react'
import LinkSimples from '../../componentes/LinkSimples'
import Informações from './passos/informações'
import NivelAtividade from './passos/NivelAtividade'
import BotaoSimples from '../../componentes/BotaoSimples'
import { ArrowLeft, PenLine } from 'lucide-react'
import BotaoPrimario from '../../componentes/BotaoPrimario'
import { AnimatePresence } from 'motion/react'

const Cadastro = () => {
    const [dados, setDados] = useState({
        genero: '',
        peso: '',
        tipoPeso: 'kilos',
        altura: '',
        tipoAltura: 'cm',
        dataDeNascimento: ''
    })
    
    const validacoes = {
        1: () => (
            dados.genero !== '' 
            && dados.peso > 0 
            && dados.altura !== ''
            && dados.dataDeNascimento !== ''
        )
    }
    const [passo, setPasso] = useState(1)
    const podeProximo = validacoes[passo]?.() ?? false

    function proximoPasso()
    {
        

        setPasso(prev => prev+1)
    }

    function voltarPasso()
    {
        setPasso(prev => prev-1)
    }

    // functions
    function mudarDados(campo, valor)
    {
        setDados(prev => ({
            ...prev, [campo]: valor
        }))
    }

    function renderizarPasso()
    {
        switch (passo) {
            case 1:
                return (
                <Informações 
                mudarDados={mudarDados}
                info={dados}/>
                )
            case 2:
                return <NivelAtividade />
            default:
                break;
        }
    }
    let progresso = passo * 10
  return (
    <main className='h-screen w-full bg-base-primaria'>
        
        <div className="absolute top-0 left-0 w-full h-full 
        bg-radial-[at_90%_90%] from-destaque-p-medio/20 
        to-base-primaria to-75%"/>

        <div className="container mx-auto h-full w-full">
            <div className="w-full h-full flex justify-center items-center">

                <div className="relative p-5 rounded-b-lg
                 bg-base-terciaria/40 backdrop-blur-md ring-1 ring-base-quaternaria 
                 w-9/10 lg:w-120 md:px-10 shadow-md shadow-base-quaternaria/50
                 ">
                    
                    <div className={`absolute -top-1 -left-0.5 h-1 bg-destaque-p-medio 
                    rounded-r-full transiton-all duration-500`} 
                    style={{ width: `${progresso}%` }}>
                    </div>

                    {passo > 1 ? (<BotaoSimples 
                    classeAdcional="absolute top-2 left-2 ring-transparent 
                    hover:ring-transparent"
                    onClick={voltarPasso}>
                        <ArrowLeft/>    
                    </BotaoSimples>) : ""}

                    <div className="flex items-center justify-center w-full p-2">
                        <h1 className="text-lg font-semibold text-t-primaria">
                            crie sua conta
                        </h1>
                    </div>

                    <div className="flex w-full h-full flex-col gap-2 overflow-hidden">
                        
                        <AnimatePresence mode='wait'>
                            {renderizarPasso()}
                        </AnimatePresence>

                        <BotaoPrimario
                        onClick={proximoPasso}
                        
                        tipo="cheio"
                        >
                            proximo    
                        </BotaoPrimario>
                    </div>
                </div>

            </div>
        </div>
    </main>
  )
}

export default Cadastro