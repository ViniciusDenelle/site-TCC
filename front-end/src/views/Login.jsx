import React, { useState } from 'react'
import InputSimples from '../componentes/InputSimples'

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  return (
    <main className='h-screen w-full bg-base-primaria'>
        <div className="absolute top-0 left-0 w-full h-full 
        bg-radial-[at_90%_90%] from-destaque-p-medio/20 
        to-base-primaria to-75%"/>

        <div className="container mx-auto h-full w-full">

            <div className="w-full h-full flex flex-col gap-2  justify-center items-center">

              <h1 className='flex  z-10'>
                faça login
              </h1>

             <div className='ring-1 ring-base-quaternaria z-10 p-5 
             bg-base-terciaria/40 backdrop-blur-md rounded-xl'  >

              <div className=" flex flex-col gap-2">

                <div className="flex flex-col gap-1">
                    <label htmlFor="email">coloque seu email</label>
                    <InputSimples
                    type={"text"}
                    name={"email"}
                    value={email}
                    maximo={30}
                    minimo={7}
                    dataBinding={ev => setEmail(ev.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="senha">coloque a sua senha</label>
                    <InputSimples
                    type={"text"}
                    name={"senha"}
                    value={senha}
                    maximo={30}
                    minimo={4}
                    dataBinding={ev => setSenha(ev.target.value)}
                    />
                </div>

              </div>

             </div>
                

            </div>

        </div>
    </main>
  )
}

export default Login