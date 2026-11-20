import { NavLink } from "react-router-dom"

import CardHorizontal from "./CardHorizontal"
import { ChartArea, ChartLine, Dumbbell, EllipsisVertical, Plus } from "lucide-react"
import { ResExercicioProps } from "../logicas/dashboard/treinos/exercicios/FetchExercicio"
import Texto from "./organizacao/Texto"
import BotaoPrimario from "./botoes/BotaoPrimario"
import { useState } from "react"
import MenuPlayer from "./dashboard/player/menus/MenuPlayer"
import WrapperIcone from "./organizacao/WrapperIcone"
import BotaoTerciario from "./botoes/BotaoTerciario"



const ExercicioCard = ({
  exercicio,
  adcionarExercicio
}: {
  exercicio: ResExercicioProps
  adcionarExercicio?: (exercicio: ResExercicioProps) => void
}) => {

  const obterCorNivel = {
    'Iniciante': ' text-green-600',
    'Intermediário': 'text-yellow-600',
    'Avançado': 'text-red-600'
  }

  const corNivel = obterCorNivel[exercicio.nivel.nome]

  const [menuAdcionar, setMenuAdcionar] = useState<boolean>(false)

  return (
    <>
      {menuAdcionar && (
        <MenuPlayer
          menuAberto={menuAdcionar}
          setMenuAberto={setMenuAdcionar}
          exercicio={exercicio}
          adcionar={adcionarExercicio ?? null}
        />
      )}
      <CardHorizontal className='hover:bg-base-terciaria/60'>
        <div className="flex justify-between items-center gap-2 text-base h-10">

          <div className="flex gap-1 items-center">

            <div className="size-10 rounded-md overflow-hidden">
              {exercicio.imagem ? (
                <img src={exercicio?.imagem} alt="" className="size-full object-cover" />
              ) : (
              <Dumbbell className='size-full' strokeWidth={1} />
              )}
            </div>

            <div className="flex flex-col min-w-0 gap-1 flex-1">

              <div className="flex flex-row gap-2 items-baseline">

                <NavLink to={`/dashboard/treino/verExercicio/${exercicio.id}`}>
                  <Texto tipo='paragrafo' className='font-semibold'>
                    {exercicio.nome}
                  </Texto>
                </NavLink>

              </div>
              <div className="flex flex-row gap-1 text-xs items-center">

                <WrapperIcone>
                  <ChartLine className={corNivel}/>
                </WrapperIcone>

                <Texto className="text-t-secundaria">
                  {exercicio.criador.nome}
                </Texto>

                {exercicio.musculos.map(musculo => (
                  musculo.tipo.nome === 'Primário' && (
                    <Texto tipo='subtexto' key={musculo.id}>
                      {musculo.nome}
                    </Texto>
                  )
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex gap-2 items-center">
            {/* <BotaoPrimario tipo='vazio' redondo classeAdicional='ring-transparent'>
                ver
            </BotaoPrimario> */}

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

export default ExercicioCard