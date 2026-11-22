import { NavLink } from "react-router-dom"
import { Layers, Plus, Flame, Clock, EllipsisVertical } from "lucide-react"
import { ResTreinoProps } from "../../logicas/dashboard/treinos/treino/TreinoProps"
import { useState } from "react"
import MenuPlayer from "../dashboard/player/menus/MenuPlayer"
import CardHorizontal from "../CardHorizontal"
import Texto from "../organizacao/Texto"
import BotaoPrimario from "../botoes/BotaoPrimario"
import MenuTreino from "../dashboard/player/menus/MenuTreino"
import BotaoTerciario from "../botoes/BotaoTerciario"

const TreinoCard = ({
  treino,
  adicionarTreino
}: {
  treino: ResTreinoProps
  adicionarTreino?: (treino: ResTreinoProps) => void
}) => {

  const [menuAdcionar, setMenuAdcionar] = useState<boolean>(false)
  console.log(treino.imagem)
  
  return (
    <>
      {menuAdcionar && (
        <MenuTreino
          menuAberto={menuAdcionar}
          setMenuAberto={setMenuAdcionar}
          treino={treino}
          adicionar={adicionarTreino ?? null}
        />
      )}
      <CardHorizontal className='hover:bg-base-terciaria/60'>
        <div className="flex justify-between items-center gap-2 text-base h-10">

          <div className="flex gap-1 items-center">

            <div className="size-10 rounded-md bg-base-terciaria/40 flex items-center justify-center relative">
              {treino.imagem ? (
                <img src={treino.imagem} alt="" className="size-full object-cover" />
              ) : (
                <Layers className='size-full' strokeWidth={1} />
              )}
              <span className="absolute -top-1 -left-1 bg-destaque-s-medio 
              text-[12px] size-4 rounded-full flex items-center justify-center">
                {treino.exercicios.length}
              </span>
            </div>

            <div className="flex flex-col min-w-0 gap-1 flex-1">

              <div className="flex flex-row gap-2 items-baseline">

                <NavLink to={`/dashboard/treino/verTreino/${treino.id}`}>
                  <Texto tipo='paragrafo' className='font-semibold'>
                    {treino.nome}
                  </Texto>
                </NavLink>

              </div>
              <div className="flex flex-row gap-2 text-xs items-center">

                <Texto>
                    {treino.foco?.nome}
                </Texto>

                {/* <div className="flex items-center gap-0.5">
                  <Flame className="size-3 text-destaque-p-claro" />
                  <Texto tipo='subtexto'>{treino.calorias_estimadas} kcal</Texto>
                </div> */}

                <div className="flex items-center gap-0.5">
                  <Clock className="size-3 text-destaque-s-medio" />
                  <Texto tipo='subtexto'>{treino.tempo_estimado.minutos} min</Texto>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex gap-2 items-center">
            <BotaoTerciario
              icone={EllipsisVertical}
              tamanhoIcone="md"
              onClick={() => setMenuAdcionar(prev => !prev)}
            />
          </div>

        </div>
      </CardHorizontal>
    </>
  )
}

export default TreinoCard