import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Texto from '../../../componentes/organizacao/Texto'

export const NavegacaoSuperiorTreinos = ({
  nome,
  to = '/'
}) => {

  return (
    <NavLink end to={to}>
      {({isActive}) => (
        <div className={`
          ${isActive 
            ? `border-text-destaque-s-escuro text-destaque-s-escuro border-b-2 font-semibold` 
            : ` text-t-terciaria/80`}
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
      nome: 'Treinar',
      to: '.',
    },
    {
      nome: 'Meus Treinos',
      to: 'meusTreinos',
    },
    {
      nome: 'Pesquisar',
      to: 'pesquisar',
    },
    {
      nome: 'criar',
      to: 'criarPrincipal',
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
                    key={link.nome}
                    nome={link.nome}
                    to={link.to}
                  />
                ))}
          </div>

        </div>

      </div>

      <div className="bg-base-primaria">
        <div className="container mx-auto">
          <div className="flex min-h-screen w-full px-4 pb-37 pt-27">

            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default TreinosLayout
