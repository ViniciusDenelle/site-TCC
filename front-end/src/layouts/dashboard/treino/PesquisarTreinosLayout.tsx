import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavegacaoSuperiorTreinos } from './TreinosLayout'

const PesquisarTreinosLayout = () => {

    const navPesquisa = ['ficha', 'treino', 'exercicio']

  return (
    <>
    <div className="flex flex-col w-full">

        <div className="w-full -mt-8">
            <div className="container mx-auto">
                <nav className='w-full flex justify-around items-center 
                bg-base-terciaria rounded-lg p-1'>
                    {navPesquisa.map(link => (
                        <NavegacaoSuperiorTreinos
                            key={link}
                            nome={link}
                            to={link}
                        />
                    ))}
                </nav>
            </div>
        </div>
        <Outlet/>
    </div>
    
    </>
  )
}

export default PesquisarTreinosLayout