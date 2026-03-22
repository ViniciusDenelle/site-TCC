import React, { useEffect, useState } from 'react'
import LinkSimples from '../../componentes/LinkSimples'
import Informações from './passos/informações'
import BotaoSimples from '../../componentes/BotaoSimples'
import { ArrowLeft, PenLine } from 'lucide-react'
import BotaoPrimario from '../../componentes/BotaoPrimario'

const Cadastro = () => {
    const [dados, setDados] = useState({
        genero: '',
        peso: '',
        tipoPeso: 'kilos',
        altura: '',
        tipoAltura: 'cm',
    })
    
    const validacoes = {
        1: () => dados.genero !== '' && dados.peso > 0 && dados.altura !== ''
    }
    const [passo, setPasso] = useState(1)
    const podeProximo = validacoes[passo]?.() ?? false

    function proximoPasso()
    {
        if(!podeProximo) return

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

    useEffect(() => {
        if(dados.peso == 0) return

        if(dados.tipoPeso === 'kilos'){
            mudarDados('peso', parseInt(dados.peso / 2.2))
        } else {
            mudarDados('peso', parseInt(dados.peso / 0.45))
        }
    }, [dados.tipoPeso])

    useEffect(() => {
        if (dados.altura == '') return

        if(dados.tipoAltura === 'cm'){
            let [pes, polegadas] = String(dados.altura).split(".")
            let alturaFinal = `${Math.round((pes * 30.48) + (polegadas * 2.54))}`
            mudarDados('altura', alturaFinal)
        } else {
            mudarDados('altura', Math.round(10 * (dados.altura * 0.0328084)) / 10)
        }
    }, [dados.tipoAltura])

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
                return <LinkSimples>pagina 2</LinkSimples>
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
                 w-9/10 lg:w-120 md:px-10 shadow-md shadow-base-quaternaria/50">
                    
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

                    <div className="flex w-full h-full flex-col gap-2">
                        
                        {renderizarPasso()}

                        <BotaoPrimario
                        onClick={proximoPasso}
                        disabled={!podeProximo}
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