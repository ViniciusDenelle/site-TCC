import { X } from 'lucide-react'
import InputSimples from '../inputs/InputSimples'
import Texto from '../organizacao/Texto'
import { AlimentoFormulario } from '../dieta/types'

interface ItemAlimentoProps {
  alimento: AlimentoFormulario
  onAtualizar: (campo: keyof AlimentoFormulario, valor: string) => void
  onRemover: () => void
}

export const ItemAlimento = ({ alimento, onAtualizar, onRemover }: ItemAlimentoProps) => {
  return (
    <div className="p-3 rounded-xl bg-base-secundaria border border-base-terciaria/30 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Texto tipo="subtexto" className="text-xs font-semibold">
          Item / Alimento
        </Texto>
        <button
          type="button"
          onClick={onRemover}
          className="p-1 hover:text-red-500 transition-colors"
        >
          <X className="size-4 opacity-60" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <InputSimples
          tipo="text"
          valor={alimento.nome}
          onChange={e => onAtualizar('nome', e.target.value)}
          placeholder="Nome do alimento (ex: Arroz Integral)"
        />
        <InputSimples
          tipo="text"
          valor={alimento.quantidade}
          onChange={e => onAtualizar('quantidade', e.target.value)}
          placeholder="Quantidade (ex: 150g / 2 colheres)"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div>
          <label className="text-[10px] opacity-60 block mb-0.5">Calorias (kcal)</label>
          <InputSimples
            tipo="number"
            valor={alimento.calorias}
            onChange={e => onAtualizar('calorias', e.target.value)}
            placeholder="Kcal"
          />
        </div>
        <div>
          <label className="text-[10px] opacity-60 block mb-0.5">Proteínas (g)</label>
          <InputSimples
            tipo="number"
            valor={alimento.proteinas}
            onChange={e => onAtualizar('proteinas', e.target.value)}
            placeholder="g"
          />
        </div>
        <div>
          <label className="text-[10px] opacity-60 block mb-0.5">Carbs (g)</label>
          <InputSimples
            tipo="number"
            valor={alimento.carboidratos}
            onChange={e => onAtualizar('carboidratos', e.target.value)}
            placeholder="g"
          />
        </div>
        <div>
          <label className="text-[10px] opacity-60 block mb-0.5">Gorduras (g)</label>
          <InputSimples
            tipo="number"
            valor={alimento.gorduras}
            onChange={e => onAtualizar('gorduras', e.target.value)}
            placeholder="g"
          />
        </div>
      </div>
    </div>
  )
}