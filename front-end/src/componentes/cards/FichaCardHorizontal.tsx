import { NavLink } from "react-router-dom"
import { Layers, Calendar, EllipsisVertical, Clipboard } from "lucide-react"
import { Ficha, TreinoResumido } from "../../logicas/dashboard/treinos/fichas/FichaProps"
import { useState } from "react"
import CardHorizontal from "../CardHorizontal"
import Texto from "../organizacao/Texto"
import BotaoTerciario from "../botoes/BotaoTerciario"
import MenuFicha from "../dashboard/player/menus/MenuFicha"

const FichaCardHorizontal = ({
  ficha,
  adicionarFicha
}: {
  ficha: Ficha
  adicionarFicha?: (ficha: Ficha) => void
}) => {

  const [menuAberto, setMenuAberto] = useState<boolean>(false)

  const totalTreinos = ficha.divisoes.reduce((soma, d) => soma + d.treinos.length, 0)

  const frequenciaSemanal = Object.values(ficha.dias).filter(
    (item): item is TreinoResumido => item !== null
  ).length

  return (
    <>
      {menuAberto && (
        <MenuFicha
          menuAberto={menuAberto}
          setMenuAberto={setMenuAberto}
          ficha={ficha}
          adicionar={adicionarFicha ?? null}
        />
      )}
      <CardHorizontal className='relative overflow-hidden hover:bg-base-terciaria/60'>
      <div className="absolute inset-0 -z-90 bg-linear-to-b from-base-secundaria to-transparent"/>
        <div className="absolute inset-0 -z-100 opacity-30">
          {ficha?.imagem && (
                <img src={ficha.imagem} alt="" className="size-full object-cover" />
          )}
        </div>

        <div className="flex justify-between items-center gap-2 text-base h-12">

          <div className="flex gap-1 items-center">

           

            <div className="flex flex-col min-w-0 gap-1 flex-1">

              <div className="flex flex-row gap-2 items-baseline">
                <NavLink to={`/dashboard/treino/verFicha/${ficha.id}`}>
                  <Texto tipo='paragrafo' className='font-semibold'>
                    {ficha.nome}
                  </Texto>
                </NavLink>
              </div>

              <div className="flex flex-row gap-2 text-xs items-center">

                <Texto tipo='subtexto'>
                  {ficha.criador.nome}
                </Texto>

                <div className="flex items-center gap-0.5">
                  <Calendar className="size-3 text-destaque-s-medio" />
                  <Texto tipo='subtexto'>{frequenciaSemanal}x semana</Texto>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex gap-2 items-center">
            <BotaoTerciario
              icone={EllipsisVertical}
              tamanhoIcone="md"
              onClick={() => setMenuAberto(prev => !prev)}
            />
          </div>

        </div>
      </CardHorizontal>
    </>
  )
}

export default FichaCardHorizontal