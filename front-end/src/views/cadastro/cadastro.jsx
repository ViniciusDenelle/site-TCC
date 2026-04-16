import React, { useContext, useEffect, useState } from 'react'
import LinkSimples from '../../componentes/LinkSimples'
import Informações from './passos/informações'
import NivelAtividade from './passos/NivelAtividade'
import BotaoSimples from '../../componentes/BotaoSimples'
import { ArrowLeft, DiamondPlus, Mail, PenLine } from 'lucide-react'
import BotaoPrimario from '../../componentes/BotaoPrimario'
import { AnimatePresence } from 'motion/react'
import Objetivo from './passos/Objetivo'
import Metas from './passos/Metas'
import ExibirInfo from './passos/ExibirInfo'
import Credenciais from './passos/Credenciais'
import ConfirmarEmail from'./passos/ConfirmarEmail'
import useCadastro from '../../logicas/cadastro/useCadastro'
import CadastroContext from '../../contextos/CadastroContexto'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from '../../api'
import { data } from 'react-router-dom'

const Cadastro = () => {
    // dados do cadastro
    const {
        passo,
        setPasso,
        erro,
        setErro,
        podeProximo,
        dados,
        cadastrarMutation,
    } = useContext(CadastroContext)

    const [emailEnviado, setEmailEnviado] = useState(false)

    async function mandarEmail()
    {
        const res = await api.post('/cadastroEmail',{ email: dados.email})
        
        if (res.data.menssagem === 'sucesso'){
            setEmailEnviado(true)
            proximoPasso()
        }

    }

    function cadastro()
    {
        cadastrarMutation.mutate(dados,{
            onSuccess: dados => {
                console.log(dados)
            },
            onError: (error) => {
                console.log(error.response?.data?.errors);
            },
        })

    }

    function proximoPasso()
    {
        if (!podeProximo) {
            setErro(true)
            return
        }

        setErro(false)
        setPasso(prev => prev+1)
    }

    function voltarPasso()
    {
        setPasso(prev => prev-1)
    }

    const passos = {
        1: <Informações/>,
        2: <NivelAtividade/>,
        3: <Objetivo />,
        4: <Metas />,
        5: <ExibirInfo />,
        6: <Credenciais />,
        7: <ConfirmarEmail/>
    }

    // pilulas progresso
    const passoPilula = [1, 2, 3, 4, 5, 6]
  return (
    <main className='pt-20 relative h-screen w-full bg-base-primaria'>
        
        <div className="absolute top-0 left-0 w-full h-full 
        bg-linear-to-t from-destaque-p-escuro/25 
        to-base-primaria to-75%"/>

        <div className="container mx-auto h-full w-full">

            <div className="w-full h-full flex flex-col 
            items-center justify-center">

                <div className="flex gap-2">

                    {passoPilula.map(pilula => (

                        <div 
                        key={pilula}
                        className={`relative rounded-full w-6 h-3 ring-1 ring-contraste-primaria overflow-hidden
                        after:absolute after:left-0 after:top-0 after:h-3 bg-base-secundaria 
                        after:bg-destaque-p-escuro after:w-0 after:transition-all after:duration-500
                        ${passo >= pilula && `after:w-full`}`}
                        />
                            
                    ))}

                </div>

                <div className="flex items-center justify-center w-full p-1 z-10">
                    <h1 className="text-xl font-semibold text-t-primaria">
                        crie sua conta
                    </h1>
                </div>

                <div className="p-5 rounded-xl
                 bg-base-terciaria/40 backdrop-blur-md ring-1 ring-base-quaternaria 
                 w-9/10 md:w-120 md:px-10 shadow-md shadow-base-quaternaria/50">
                    

                    {passo > 1 && (
                        <BotaoSimples 
                        classeAdcional="absolute top-2 left-2 ring-transparent 
                        hover:ring-transparent"
                        onClick={voltarPasso}>
                            <ArrowLeft/>    
                        </BotaoSimples>
                    )}

                    

                    <div className="flex w-full h-full flex-col gap-2 mt-5">
                        
                        {/* passos */}
                        <div className="h-102 relative flex flex-col items-center">
                            {erro && (
                                <span className="absolute -top-5
                                text-sm font-semibold text-red-500 mx-auto">
                                    você tem informações faltando
                                </span>
                            )}
                            <AnimatePresence mode='wait'>
                                {passo == 4 && dados.objetivo === 'manter_peso' ? passos[passo + 1] : passos[passo] }
                            </AnimatePresence>

                        </div>

                        {passo >= 6 ? (
                            <BotaoPrimario
                                tipo="cheio"
                                classeAdcional="gap-1"
                                onClick={emailEnviado ? cadastro : mandarEmail}
                            >
                                {emailEnviado ? (
                                    <>
                                        <p>confirmar</p>    
                                    </>
                                ) : (
                                    <>
                                        <p>mandar email</p>
                                        <Mail/>    
                                    </>
                                )}  
                            </BotaoPrimario>
                        ) : (
                            <BotaoPrimario
                            onClick={proximoPasso}
                            disabled={!podeProximo}
                            tipo="cheio"
                            >
                                proximo 
                            </BotaoPrimario>
                        )}

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