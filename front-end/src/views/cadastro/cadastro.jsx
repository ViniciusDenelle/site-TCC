import React, { useState } from 'react'
import LinkSimples from '../../componentes/LinkSimples'
import Informações from './passos/informações'

const Cadastro = () => {
    const [passo, setPasso] = useState(1)
    const [genero, setGenero] = useState('')

    function proximoPasso()
    {
        setPasso(prev => prev+1)
    }

    // functions
    function mudarGenero(ev)
    {
        setGenero(ev.target.value)
    }

    function renderizarPasso()
    {
        switch (passo) {
            case 1:
                return (
                <Informações 
                functions={{
                    mudarGenero
                }}/>
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
        <div className="container mx-auto h-full w-full">
            <div className="w-full h-full flex justify-center items-center">

                <div className="relative p-5 rounded-lg bg-base-terciaria/50 ring-2 
                ring-base-terciaria w-full shadow-md shadow-base-quaternaria/50">
                    <div className={`absolute t-0 left-0 h-1 bg-destaque-s-medio`} 
                    style={{ width: `${progresso}%` }}>
                    </div>

                    <div className="flex w-full h-full flex-col gap-2">
                        
                        {renderizarPasso()}

                        <button onClick={proximoPasso}>
                            proximo
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </main>
  )
}

export default Cadastro