import React, { ReactNode, useContext } from 'react'
import LinkSimples from '../../componentes/links/LinkSimples'
import NivelAtividade from './passos/NivelAtividade'
import BotaoSecundario from '../../componentes/botoes/BotaoSecundario'
import { ArrowLeft } from 'lucide-react'
import BotaoPrimario from '../../componentes/botoes/BotaoPrimario'
import { AnimatePresence } from 'motion/react'
import Objetivo from './passos/Objetivo'
import Metas from './passos/Metas'
import CadastroContext from '../../contextos/CadastroContexto'
import { UseCadastroReturn } from '../../logicas/cadastro/useCadastro'
import useCadastroContexto from '../../contextos/CadastroContexto'
import Informacoes from './passos/Informacoes'
import Credenciais from './passos/Crendenciais'
import ExibirInfo from './passos/ExibirInfo'
import MetasManterPeso from './passos/MetasManterPeso'
import Texto from '../../componentes/organizacao/Texto'

const Cadastro: React.FC = () => {
    const {
        passo,
        setPasso,
        erro,
        setErro,
        podeProximo,
        dados,
        cadastroHandler,
        emailMutation
    } = useCadastroContexto()

    function proximoPasso(): void {
        if (!podeProximo) {
            setErro(true)
            return
        }
        setErro(false)
        setPasso(prev => prev + 1)
    }

    function voltarPasso(): void {
        emailMutation.reset()
        setPasso(prev => prev - 1)
    }

    const passos: Record<number, ReactNode> = {
        1: <Informacoes key="passo-1" />,
        2: <NivelAtividade key="passo-2" />,
        3: <Objetivo key="passo-3" />,
        4: dados.objetivo === 'manter_peso' ? <MetasManterPeso /> : <Metas key="passo-4" />,
        5: <ExibirInfo key="passo-5" />,
        6: <Credenciais key="passo-6" />,
    }

    const passoPilula: number[] = [1, 2, 3, 4, 5, 6]

    // Variável para definir o que vai ser renderizado de forma segura
    

    return (
        <main className='pt-20 relative min-h-screen w-full bg-base-primaria'>

            <div className="absolute top-0 left-0 w-full h-full 
        bg-linear-to-t from-destaque-p-escuro/25 
        to-base-primaria to-75%"/>

            <div className="container mx-auto h-full w-full">

                <div className="w-full h-full flex flex-col items-center">

                    <div className="flex gap-2">
                        {passoPilula.map(pilula => (
                            <div
                                key={pilula}
                                className={`relative rounded-full w-6 h-3 ring-1 ring-contraste-primaria overflow-hidden
                        after:absolute after:left-0 after:top-0 after:h-3 bg-base-secundaria 
                        after:bg-destaque-p-escuro after:w-0 after:transition-all after:duration-500
                        ${passo >= pilula ? 'after:w-full' : ''}`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center justify-center w-full p-1 z-10">
                        <Texto tipo='subtitulo'>
                            Crie sua conta
                        </Texto>
                    </div>

                    <div className="p-5 rounded-xl
                 bg-base-terciaria/40 backdrop-blur-md ring-1 ring-base-quaternaria 
                 w-9/10 md:w-120 md:px-10 shadow-md shadow-base-quaternaria/50">

                        {passo > 1 && (
                            <BotaoSecundario
                                classeAdicional="absolute top-2 left-2 ring-transparent hover:ring-transparent"
                                onClick={voltarPasso}
                                icone={ArrowLeft}    
                            />
                        )}

                        <div className="flex w-full h-full flex-col gap-2 mt-5">

                            <div className=" relative flex flex-col items-center justify-center">
                                {erro && (
                                    <span className="absolute -top-5 text-sm font-semibold text-red-500 mx-auto">
                                        você tem informações faltando
                                    </span>
                                )}

                                <AnimatePresence mode='wait'>
                                    {passos[passo] ?? <React.Fragment key="fallback" />}
                                </AnimatePresence>
                            </div>

                            {passo >= 6 ? (
                                <BotaoPrimario
                                    tipo="cheio"
                                    onClick={cadastroHandler}
                                    disabled={!emailMutation.isSuccess}
                                    texto={emailMutation.isSuccess ? 'confirmar' : 'envie o codigo'}
                                />
                            ) : (
                                <BotaoPrimario
                                    onClick={proximoPasso}
                                    disabled={!podeProximo}
                                    tipo="cheio"
                                    texto='proximo'
                                />
                            )}

                            <div className='flex gap-1 justify-center'>
                                já possui uma conta?
                                <LinkSimples
                                    to="/login"
                                    classeAdicional="text-destaque-s-escuro">
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