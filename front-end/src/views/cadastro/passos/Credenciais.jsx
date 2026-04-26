import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import InputSimples from '../../../componentes/InputSimples'
import BotaoPrimario from '../../../componentes/BotaoPrimario'
import LinkSimples from '../../../componentes/LinkSimples'
import { Eye, EyeClosed, Mail } from 'lucide-react'
import GoogleIcone from '../../../assets/icones/googleIcone.svg'
import { useContext } from 'react'
import CadastroContext from '../../../contextos/CadastroContexto'
import BotaoSimples from '../../../componentes/BotaoSimples'
import toast from 'react-hot-toast'
import useConfirmacao from '../../../logicas/useConfirmacao'

const Credenciais = () => {
    const {
        dados,
        mudarDados,
        emailMutation,
    } = useContext(CadastroContext)

    const {
        nome,
        email,
        senha,
        codigoConfirmacao,
    } = dados

    const {
        enviarEmailHandler,
        contagem,
        isSuccess,
        isLoading,
        isError,
        erros,
    } = useConfirmacao(emailMutation, {
        email: email,
        tipo: 'cadastro'
    })

    const [senhaVisivel, setSenhaVisivel] = useState(false)

    function mudarVisibilidadeSenha() {
        setSenhaVisivel(prev => !prev)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col w-full gap-1"
        >

            <h2 className="mx-auto text-lg text-t-primaria font-semibold">
                suas credenciais
            </h2>

            <BotaoPrimario
                classeAdcional="gap-4">
                <span className='flex relative'>
                    <img src={GoogleIcone} alt=""
                        className='h-6 absolute -left-7
                                      '
                    />
                    google

                </span>
            </BotaoPrimario>
            <p className='mx-auto'>ou</p>

            <div className=" flex flex-col gap-1">

                <div className="flex flex-col gap-1">
                    <label htmlFor="email">nome:</label>
                    <InputSimples
                        type={"nome"}
                        name={"nome"}
                        value={nome}
                        maximo={30}
                        minimo={2}
                        dataBinding={ev => mudarDados('nome', ev.target.value)}
                        placeholder="seu nome"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email">email:</label>
                    <InputSimples
                        type={"email"}
                        name={"email"}
                        value={email}
                        maximo={30}
                        minimo={7}
                        dataBinding={ev => mudarDados('email', ev.target.value)}
                        placeholder="seu@email"
                    />
                    {erros['email'] && (
                        <span className="text-red-500 text-sm">
                            {erros['email']}
                        </span>
                    )}
                </div>

                <div className="relative flex flex-col gap-1">
                    <label htmlFor="senha">senha:</label>
                    <InputSimples
                        type={senhaVisivel ? 'text' : 'password'}
                        name={"senha"}
                        value={senha}
                        maximo={30}
                        minimo={4}
                        dataBinding={ev => mudarDados('senha', ev.target.value)}
                        placeholder="sua senha deve ter no minimo 4 caracteres"
                    />

                    <div className="absolute bottom-1.5 right-3 text-t-terciaria/70
                    cursor-pointer hover:text-t-terciaria"
                        onClick={mudarVisibilidadeSenha}>
                        {senhaVisivel ? <Eye /> : <EyeClosed />}
                    </div>

                </div>

                <div className="flex flex-col gap-2">
                    <h2 className={`${!isSuccess && 'text-t-terciaria/80'}`}>
                        codigo de confirmação:
                    </h2>

                    <InputSimples
                        type='number'
                        value={codigoConfirmacao}
                        dataBinding={ev => mudarDados('codigoConfirmacao', ev.target.value)}
                        disabled={!isSuccess}
                    />
                            
                    <BotaoSimples
                        tipo='cheio'
                        disabled={contagem > 0}
                        onClick={enviarEmailHandler}>
                        {isLoading ? (
                            <p>carregando</p>
                        ) : contagem > 0 ? (
                            <p>
                                reenviar codigo em {contagem}s
                            </p>
                        ) : (
                            <p className='flex gap-2'>
                                enviar codigo por email <Mail />
                            </p>
                        )}
                        
                    </BotaoSimples>

                </div>



            </div>
        </motion.div>
    )
}

export default Credenciais