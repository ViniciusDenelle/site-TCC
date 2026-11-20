import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Texto from '../../../componentes/organizacao/Texto'



export const NavegacaoSuperiorDieta = ({
  nome,
  to = '/'
}) => {
  return (
    <NavLink to={to} end>
      {({ isActive }) => (
        <div
          className={`
            ${
              isActive
                ? 'border-text-destaque-s-escuro text-destaque-s-escuro border-b-2 font-semibold'
                : 'text-t-terciaria/80'
            }
          `}
        >
          <Texto tipo="subtexto" className="truncate">
            {nome}
          </Texto>
        </div>
      )}
    </NavLink>
  )
}

const DietaLayout = () => {

  const navegacaoSuperior = [
    {
      nome: 'Minhas dietas',
      to: '/dashboard/dieta',
    },
    {
      nome: 'Pesquisar',
      to: 'pesquisarPrincipal',
    },
    {
      nome: 'Criar',
      to: 'criarPrincipal',
    },
  ]

  return (
    <>
      <div className="mt-12 w-full">
        <div className="container mx-auto px-4">

          <div
            className="
              flex
              gap-2
              justify-around
              items-center
              w-full
              bg-base-secundaria
              rounded-lg
              p-2
              text-t-terciaria/80
            "
          >
            {navegacaoSuperior.map((link) => (
              <NavegacaoSuperiorDieta
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
          <div className="flex min-h-screen w-full px-4 pb-37 pt-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default DietaLayout