import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Texto from '../../componentes/Texto'

const NavegacaoSuperiorTreinos = ({
  nome,
  to = '/'
}) => {

  return (
    <NavLink to={to}>
      {({isActive}) => (
        <div className={`border-b-2
          ${isActive 
            ? `border-text-destaque-s-escuro text-destaque-s-escuro` 
            : ` border-text-t-terciaria/80 text-t-terciaria/80`}
        `}>
          <Texto tipo='subtexto' className='truncate'>
            {nome}
          </Texto>
        </div>
      )}
    </NavLink>
  )
}

const TreinosLayout = () => {

  const navegacaoSuperior = [
    {
      nome: 'fichas',
      to: 'treinos',
    },
    {
      nome: 'minha ficha',
      to: '/',
    },
    {
      nome: 'exercicios',
      to: 'exercicios',
    },
    {
      nome: 'em casa',
      to: '/',
    },
  ]

  return (
    <>
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 justify-around items-center w-full 
              bg-base-secundaria rounded-lg p-2 text-t-terciaria/80">
                {navegacaoSuperior.map(link => (
                  <NavegacaoSuperiorTreinos
                    nome={link.nome}
                    to={link.to}
                  />
                ))}
          </div>

        </div>

      </div>

      <div className="bg-base-primaria">
        <div className="container mx-auto">
          <div className="flex min-h-screen w-full justify-center 
          items-center px-4 py-27">

            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default TreinosLayout
