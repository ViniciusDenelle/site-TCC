import { Apple, Flame } from "lucide-react"
import CardHorizontal from "../CardHorizontal"
import { Alimento } from "../../logicas/dashboard/dieta/DietaProps"
import Texto from "../organizacao/Texto"

const AlimentoCard = ({
  alimento,
  onSelecionar,
}: {
  alimento: Alimento
  onSelecionar?: (alimento: Alimento) => void
}) => {

  return (
    <button
      onClick={() => onSelecionar?.(alimento)}
      className="w-full text-left"
      disabled={!onSelecionar}
    >
      <CardHorizontal className={onSelecionar ? 'hover:bg-base-terciaria/60' : ''}>
        <div className="flex justify-between items-center gap-2 text-base">

           <div className="size-10 rounded-md overflow-hidden bg-base-terciaria/40 flex items-center justify-center relative">
              {alimento.imagem ? (
                <img src={alimento.imagem} alt="" className="size-full object-cover" />
              ) : (
                <Apple className='size-full' strokeWidth={2} />
              )}
            </div>

          <div className="flex flex-col min-w-0 gap-0.5 flex-1">
            <Texto tipo="paragrafo" className="font-semibold">
              {alimento.nome}
            </Texto>

            <Texto tipo="subtexto" className="opacity-60">
              {alimento.porcao_descricao}
              {alimento.porcao_gramas ? ` (${alimento.porcao_gramas}g)` : ''}
            </Texto>

            <div className="flex gap-2 text-xs items-center mt-0.5">
              <div className="flex items-center gap-0.5">
                <Flame className="size-3 text-destaque-p-claro" />
                <Texto tipo="subtexto">{alimento.calorias} kcal</Texto>
              </div>
              <Texto tipo="subtexto" className="opacity-60">
                P: {alimento.proteinas}g
              </Texto>
              <Texto tipo="subtexto" className="opacity-60">
                C: {alimento.carboidratos}g
              </Texto>
              <Texto tipo="subtexto" className="opacity-60">
                G: {alimento.gorduras}g
              </Texto>
            </div>
          </div>

        </div>
      </CardHorizontal>
    </button>
  )
}

export default AlimentoCard