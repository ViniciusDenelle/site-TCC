import { NavLink, Outlet } from 'react-router-dom'
import { useContext, useState } from 'react'

import {
  ArrowDownToLine,
  Lightbulb,
  TextAlignJustify,
  UserLock,
  UserRoundPlus,
  Zap
} from 'lucide-react'

import {
  AnimatePresence,
  motion
} from 'framer-motion'

import BotaoSimples from '../componentes/BotaoSecundario.js'
import LinkQuadrado from '../componentes/LinkQuadrado.js'
import LinkSimples from '../componentes/LinkSimples.js'
import TemaContexto from '../contextos/TemaContexto.js'
import BotaoPrimario from '../componentes/BotaoPrimario.js'

function LayoutDefault() {

  const contextoTema = useContext(TemaContexto)

  if (!contextoTema) {
    throw new Error(
      'TemaContexto precisa de um Provider'
    )
  }

  const [tema, alterarTema] = contextoTema

  const [menuAberto, setMenuAberto] =
    useState<boolean>(false)

  function abrirMenu() {
    setMenuAberto(prev => !prev)
  }

  const animacaoMenu = {

    invisivel: {
      y: -30,
      opacity: 0
    },

    visivel: {
      y: 0,
      opacity: 1
    }
  }

  const navMenuAberto = `
    rounded-t-xl border-t-2 border-x-2
    lg:rounded-full lg:border-2
  `

  return (
    <>

      <header className="absolute top-0 left-0 w-full z-100">

        <div className="container mx-auto px-2">

          <nav
            className={`
              relative flex justify-between
              w-full p-2 px-5 mt-3
              bg-base-terciaria/40 backdrop-blur-md
              text-t-terciaria border-base-terciaria

              ${menuAberto
                ? navMenuAberto
                : 'rounded-full border-2'
              }
            `}
          >

            <NavLink
              to="/"
              className="
                text-xl font-bold
                flex text-t-primaria
                transition-colors duration-200
              "
            >

              <Zap
                className="
                  text-destaque-p-medio
                  hover:text-destaque-p-escuro
                "
                strokeWidth={3}
              />

              ThunderTracker

            </NavLink>

            <div
              className="
                hidden gap-2 items-center lg:flex
              "
            >

              <LinkSimples to="cadastro">
                cadastro
              </LinkSimples>

              <LinkSimples to="login">
                login
              </LinkSimples>

              <BotaoPrimario
                tipo="cheio"
                classeAdicional="
                  flex items-center
                  justify-center px-2
                "
              >
                mobile
                <ArrowDownToLine />
              </BotaoPrimario>

              <BotaoSimples onClick={alterarTema}>
                <Lightbulb />
              </BotaoSimples>

            </div>

            {/* mobile */}

            <BotaoSimples
              onClick={abrirMenu}
              classeAdicional="
                ring-transparent
                hover:ring-transparent
                lg:hidden
              "
            >
              <TextAlignJustify />
            </BotaoSimples>

            <AnimatePresence>

              {menuAberto && (

                <motion.div
                  variants={animacaoMenu}
                  initial="invisivel"
                  animate="visivel"
                  exit="invisivel"
                  transition={{ duration: 0.2 }}
                  className="
                    absolute top-full -left-0.5
                    w-[100.8%] py-5
                    bg-base-terciaria/40
                    backdrop-blur-md
                    rounded-b-xl border-b-2
                    border-base-terciaria border-x-2
                    lg:hidden
                  "
                >

                  <div
                    className="
                      grid grid-rows-2 grid-cols-2
                      sm:grid-rows-1 sm:grid-cols-4
                      gap-2 px-2
                    "
                  >

                    <LinkQuadrado
                      to="cadastro"
                      classeAdicional="w-full"
                    >
                      <UserRoundPlus />
                      cadastro
                    </LinkQuadrado>

                    <LinkQuadrado
                      to="/login"
                      classeAdicional="w-full"
                    >
                      <UserLock />
                      login
                    </LinkQuadrado>

                    <BotaoPrimario
                      tipo="cheio"
                      classeAdicional="
                        flex w-full h-10
                        items-center justify-center
                        gap-2
                      "
                    >
                      <ArrowDownToLine />
                      mobile
                    </BotaoPrimario>

                    <BotaoSimples
                      onClick={alterarTema}
                    >
                      <Lightbulb />
                    </BotaoSimples>

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