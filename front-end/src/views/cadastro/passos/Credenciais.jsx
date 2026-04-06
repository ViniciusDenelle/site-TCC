import React, { useState } from 'react'
import { motion } from 'motion/react'
import InputSimples from '../../../componentes/InputSimples'
import BotaoPrimario from '../../../componentes/BotaoPrimario'
import LinkSimples from '../../../componentes/LinkSimples'
import { Eye, EyeClosed } from 'lucide-react'
import GoogleIcone from '../../../assets/icones/googleIcone.svg'

const Credenciais = ({
    mudarDados, 
    info
}) => {

    const {
        nome,
        email,
        senha
    } = info

    const [senhaVisivel, setSenhaVisivel] = useState(false)

    function mudarVisibilidadeSenha()
    {
        setSenhaVisivel(prev => !prev)
    }

  return (
    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col w-full gap-4"
        >

            <h2 className="mx-auto text-lg text-t-primaria font-semibold">
                suas credenciais {nome} {email} {senha}
            </h2>

            <p className="text-sm mx-auto text-center">
                ultimo passo para começar sua jornada fitness
                lembre-se que sempre pode alterar suas informações depois
            </p>

            <div className=" flex flex-col gap-3.5">

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
                        {senhaVisivel ? <Eye/> : <EyeClosed/>}
                    </div>

                </div>

                <p className='mx-auto'>ou</p>
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
                
              </div>
    </motion.div>
  )
}

export default Credenciais