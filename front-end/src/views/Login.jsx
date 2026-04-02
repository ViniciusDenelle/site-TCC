import React, { useState } from 'react'
import InputSimples from '../componentes/InputSimples'
import BotaoSimples from '../componentes/BotaoSimples'
import BotaoPrimario from '../componentes/BotaoPrimario'
import GoogleIcone from '.././assets/icones/googleIcone.svg'
import LinkSimples from '../componentes/LinkSimples'

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  return (
    <main className='h-screen w-full bg-base-primaria'>

        <div className="absolute top-0 left-0 w-full h-full 
        bg-linear-to-t from-destaque-p-escuro/25 
        to-base-primaria to-75%"/>

        <div className="container mx-auto h-full w-full">

            <div className="w-full h-full flex flex-col gap-2  justify-center items-center">

              <h1 className='text-xl font-semibold text-t-primaria z-10'>
                faça login
              </h1>

             <div className='ring-1 ring-base-quaternaria z-10 p-5 
             bg-base-terciaria/40 backdrop-blur-md rounded-xl w-8/10 md:w-120'  >

              <div className=" flex flex-col gap-2">

                <div className="flex flex-col gap-1">
                    <label htmlFor="email">email:</label>
                    <InputSimples
                    type={"email"}
                    name={"email"}
                    value={email}
                    maximo={30}
                    minimo={7}
                    dataBinding={ev => setEmail(ev.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="senha">senha:</label>
                    <InputSimples
                    type={"password"}
                    name={"senha"}
                    value={senha}
                    maximo={30}
                    minimo={4}
                    dataBinding={ev => setSenha(ev.target.value)}
                    />
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

                <BotaoPrimario
                tipo='cheio'
                classeAdcional="mt-1"
                >
                  entrar 
                </BotaoPrimario>

                <div className='flex flex-col items-center gap-1'>

                  <div className='flex gap-2'>
                    <p>não tem uma conta?</p>
                    <LinkSimples classeAdcional='text-destaque-s-escuro 
                    font-semibold' to='/cadastro'>
                    crie uma conta
                    </LinkSimples>
                  </div>

                  <LinkSimples
                  classeAdcional='text-destaque-s-escuro 
                  font-semibold'
                  to='/'>
                    esqueceu sua senha?
                  </LinkSimples>

                </div>
                
              </div>

             </div>
                

            </div>

        </div>
    </main>
  )
}

export default Login