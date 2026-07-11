import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavegacaoSuperiorTreinos } from './TreinosLayout'

const PesquisarTreinosLayout = () => {

    const navPesquisa = ['ficha', 'treino', 'exercicio']

  return (
    <>
        <div className="absolute top-22 left-0 w-full">
            <div className="container mx-auto px-4">
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
    
    </>
  )
}

export default PesquisarTreinosLayout