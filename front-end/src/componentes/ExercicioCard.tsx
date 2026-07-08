import { NavLink } from "react-router-dom"
import { ResExercicioProps } from "../logicas/dashboard/treinos/exercicios/FetchExercicio"
import CardHorizontal from "./CardHorizontal"
import { Dumbbell, Plus } from "lucide-react"
import Texto from "./Texto"
import BotaoPrimario from "./BotaoPrimario"

const ExercicioCard = ({
    exercicio
} :{
    exercicio : ResExercicioProps
}) => {
  
  const obterCorNivel = {
    'Iniciante': 'border-green-600 text-green-600',
    'Intermediário': 'border-yellow-600 text-yellow-600',
    'Avançado': 'border-red-600 text-red-600'
  }

  const corNivel = obterCorNivel[exercicio.nivel.nome]
  
  return (
    <NavLink to={''}>
      <CardHorizontal className='hover:bg-base-terciaria/60'>
        <div className="flex justify-between items-center gap-2 text-base h-10">
          
          <div className="flex gap-1 items-center">

            <div className="size-10 rounded-md overflow-hidden">
              <Dumbbell className='size-full' strokeWidth={1}/>
            </div>

            <div className="flex flex-col min-w-0 gap-1 flex-1">

              <div className="flex flex-row gap-2 items-baseline">

                <Texto tipo='paragrafo' className='font-semibold'>
                  {exercicio.nome}
                </Texto>

              </div>
              <div className="flex flex-row gap-1 text-xs items-center">
                
                <div className={`rounded-full border-2 px-1 opacity-80 ${corNivel}`}>
                  <Texto tipo='subtexto'>
                    {exercicio.nivel.nome}
                  </Texto>
                </div>

                {exercicio.musculos.map(musculo => (
                  musculo.tipo.nome === 'Primário' && (
                    <Texto tipo='subtexto'>
                      {musculo.nome}
                    </Texto>
                  )
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 items-center">
            {/* <BotaoPrimario tipo='vazio' redondo classeAdicional='ring-transparent'>
                ver
            </BotaoPrimario> */}

            <BotaoPrimario
              tipo='cheio' 
              icone={Plus}
            />
          </div>
        </div>
      </CardHorizontal>
    </NavLink>
  )
}

export default ExercicioCard