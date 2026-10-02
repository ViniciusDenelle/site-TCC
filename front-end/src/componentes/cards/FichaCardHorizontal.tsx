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
      <CardHorizontal className='hover:bg-base-terciaria/60'>
        <div className="flex justify-between items-center gap-2 text-base h-10">

          <div className="flex gap-1 items-center">

            <div className="size-10 rounded-md bg-base-terciaria/40 flex items-center justify-center relative">
              <Clipboard className='size-full p-1.5' strokeWidth={1.5} />
              <span className="absolute -top-1 -left-1 bg-destaque-s-medio
              text-[12px] size-4 rounded-full flex items-center justify-center">
                {totalTreinos}
              </span>
            </div>

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