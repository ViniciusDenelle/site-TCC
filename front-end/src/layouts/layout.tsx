import { useContext, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import {
  ArrowDownToLine,
  Flame,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  TextAlignJustify,
  UserLock,
  UserRoundPlus,
} from 'lucide-react'

import { AnimatePresence, motion } from 'framer-motion'

import BotaoPrimario from '../componentes/botoes/BotaoPrimario.js'
import BotaoSecundario from '../componentes/botoes/BotaoSecundario.js'
import LinkQuadrado from '../componentes/links/LinkQuadrado.js'
import LinkSimples from '../componentes/links/LinkSimples.js'
import Texto from '../componentes/organizacao/Texto.js'
import TemaContexto from '../contextos/TemaContexto.js'
import useFetchUsuario from '../logicas/usuario/FetchUsuario.js'
import useLogout from '../logicas/usuario/Logout.js'

function LayoutDefault() {
  const contextoTema = useContext(TemaContexto)

  if (!contextoTema) {
    throw new Error('TemaContexto precisa de um Provider')
  }

  const [tema, alterarTema] = contextoTema
  const [menuAberto, setMenuAberto] = useState<boolean>(false)

  function abrirMenu() {
    setMenuAberto(prev => !prev)
  }

  const animacaoMenu = {
    invisivel: {
      y: -20,
      opacity: 0,
    },
    visivel: {
      y: 0,
      opacity: 1,
    },
  }

  const navMenuAberto = `
    rounded-t-xl border-t-2 border-x-2
    lg:rounded-full lg:border-2
  `

  const { dadosUsuario } = useFetchUsuario()
  const { logout } = useLogout()

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50">
        <div className="container mx-auto px-2">
          <nav
            className={`
              relative flex justify-between items-center
              w-full p-2 px-5 mt-3
              bg-base-terciaria/40 backdrop-blur-md
              text-t-terciaria border-base-terciaria
              transition-all duration-300
              ${menuAberto ? navMenuAberto : 'rounded-full border-2'}
            `}
          >
            {/* Título / Logotipo */}
            <NavLink
              to="/"
              className="
                text-xl font-bold
                flex items-center gap-2 text-t-primaria
                transition-colors duration-200
              "
            >
              <Flame
                className="
                  text-destaque-p-medio
                  hover:text-destaque-p-escuro
                  transition-colors
                "
                strokeWidth={3}
              />
              <Texto tipo="titulo">Fit Forge</Texto>
            </NavLink>

            {/* Menu Desktop */}
            <div className="hidden gap-3 items-center lg:flex">
              {dadosUsuario ? (
                <>
                  <LinkSimples to="/dashboard">Dashboard</LinkSimples>

                  <BotaoPrimario
                    onClick={logout}
                    classeAdicional="bg-red-500 hover:bg-red-600 text-white"
                    icone={LogOut}
                  />
                </>
              ) : (
                <>
                  <LinkSimples to="cadastro">Cadastro</LinkSimples>
                  <LinkSimples to="login">Login</LinkSimples>
                </>
              )}

              <BotaoPrimario
                tipo="cheio"
                classeAdicional="flex items-center justify-center px-3"
                texto="App"
                icone={ArrowDownToLine}
              />

              <BotaoSecundario
                onClick={() => alterarTema()}
                icone={Lightbulb}
              />
            </div>

            {/* Botão Hambúrguer Mobile */}
            <BotaoSecundario
              onClick={abrirMenu}
              classeAdicional="
                ring-transparent
                hover:ring-transparent
                lg:hidden
              "
              icone={TextAlignJustify}
            />

            {/* Menu Suspenso Mobile */}
            <AnimatePresence>
              {menuAberto && (
                <motion.div
                  variants={animacaoMenu}
                  initial="invisivel"
                  animate="visivel"
                  exit="invisivel"
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="
                    absolute top-full -left-[1px]
                    w-[calc(100%+2px)] py-4 px-3
                    bg-base-terciaria/95 backdrop-blur-md
                    rounded-b-2xl border-b-2 border-x-2
                    border-base-terciaria
                    shadow-xl lg:hidden z-50
                  "
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {dadosUsuario ? (
                      <>
                        <LinkQuadrado to="/dashboard" classeAdicional="w-full">
                          <LayoutDashboard size={20} />
                          Dashboard
                        </LinkQuadrado>

                        <BotaoSecundario
                          onClick={logout}
                          classeAdicional="
                            ring-red-500/50 text-red-500
                            hover:bg-red-500/10 hover:ring-red-500
                          "
                          tipo="vazio"
                          icone={LogOut}
                        />
                      </>
                    ) : (
                      <>
                        <LinkQuadrado to="cadastro" classeAdicional="w-full">
                          <UserRoundPlus size={20} />
                          Cadastro
                        </LinkQuadrado>

                        <LinkQuadrado to="login" classeAdicional="w-full">
                          <UserLock size={20} />
                          Login
                        </LinkQuadrado>
                      </>
                    )}

                    <BotaoPrimario
                      tipo="cheio"
                      classeAdicional="
                        flex w-full h-10
                        items-center justify-center
                        gap-2
                      "
                      icone={ArrowDownToLine}
                    />

                    <BotaoSecundario
                      onClick={() => alterarTema()}
                      icone={Lightbulb}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </header>

      <Outlet />
    </>
  )
}

export default LayoutDefault