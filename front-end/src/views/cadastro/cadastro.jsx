import React, { useEffect, useState } from 'react'
import LinkSimples from '../../componentes/LinkSimples'
import Informações from './passos/informações'
import NivelAtividade from './passos/NivelAtividade'
import BotaoSimples from '../../componentes/BotaoSimples'
import { ArrowLeft, PenLine } from 'lucide-react'
import BotaoPrimario from '../../componentes/BotaoPrimario'
import { AnimatePresence } from 'motion/react'
import Objetivo from './passos/Objetivo'

const Cadastro = () => {
    // dados do cadastro
    const [dados, setDados] = useState({
        genero: '',
        peso: '20',
        tipoPeso: 'kilos',
        altura: '80',
        dataDeNascimento: '',
        nivelAtividade: '',
        Objetivo: ''
    })
    
    const validacoes = {
        1: () => (
            // dados.genero !== '' 
            // && dados.peso > 0       
            // && dados.altura !== ''
            // && dados.dataDeNascimento !== ''
            true
        ),
        2: () => (
            dados.nivelAtividade !== ''
        )
    }
    
    const [passo, setPasso] = useState(1)

    // validar passo
    const podeProximo = validacoes[passo]?.() ?? false

    function proximoPasso()
    {
        if (!podeProximo) return
        setPasso(prev => prev+1)
    }

    function voltarPasso()
    {
        setPasso(prev => prev-1)
    }

    // data binding
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
                return (
                    <NivelAtividade 
                    mudarDados={mudarDados}
                    />
                )
            case 3:
                return (
                    <Objetivo 
                    mudarDados={mudarDados}
                    />
                )
            default:
                break;
        }
    }

    // pilulas progresso
    const passoPilula = [1, 2, 3, 4, 5]
  return (
    <main className='pt-10 h-screen w-full bg-base-primaria'>
        
        <div className="absolute top-0 left-0 w-full h-full 
        bg-linear-to-t from-destaque-p-escuro/25 
        to-base-primaria to-75%"/>

        <div className="container mx-auto h-full w-full">

            <div className="w-full h-full flex flex-col 
            justify-center items-center gap-2">

                <div className="flex gap-2">

                    {passoPilula.map(pilula => (

                        <div className={`relative rounded-full w-6 h-3 ring-1 ring-contraste-primaria overflow-hidden
                        after:absolute after:left-0 after:top-0 after:h-3 bg-base-secundaria 
                        after:bg-destaque-p-escuro after:w-0 after:transition-all after:duration-500
                        ${passo >= pilula ? `after:w-full` : ``}`}
                        />
                            
                    ))}

                </div>

                <div className="flex items-center justify-center w-full p-2 z-10">
                    <h1 className="text-xl font-semibold text-t-primaria">
                        crie sua conta
                    </h1>
                </div>

                <div className="p-10 rounded-xl
                 bg-base-terciaria/40 backdrop-blur-md ring-1 ring-base-quaternaria 
                 w-9/10 md:w-120 md:px-10 shadow-md shadow-base-quaternaria/50">
                    

                    {passo > 1 ? (
                        <BotaoSimples 
                        classeAdcional="absolute top-2 left-2 ring-transparent 
                        hover:ring-transparent"
                        onClick={voltarPasso}>
                            <ArrowLeft/>    
                        </BotaoSimples>
                    ) : ""}

                    

                    <div className="flex w-full h-full flex-col gap-2">
                        
                        {/* passos */}
                        <AnimatePresence mode='wait'>
                            {renderizarPasso()}
                        </AnimatePresence>


                        <BotaoPrimario
                        onClick={proximoPasso}
                        disabled={!podeProximo}
                        tipo="cheio"
                        >
                            proximo    
                        </BotaoPrimario>

                        <div className='flex gap-1 justify-center'>
                            já possui uma conta?
                            <LinkSimples
                            to="/login"
                            classeAdcional="text-destaque-s-escuro">
                                login
                            </LinkSimples>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </main>
  )
}

export default Cadastro