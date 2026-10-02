import { PieChart, Copy } from 'lucide-react'
import Texto from '../organizacao/Texto'

interface Totais {
  calorias: number
  proteinas: number
  carboidratos: number
  gorduras: number
}

interface Metas {
  calorias: number | ''
  proteinas: number | ''
  carboidratos: number | ''
  gorduras: number | ''
}

interface ResumoNutricionalDiaProps {
  labelDia?: string
  totais: Totais
  metas: Metas
  distribuicao: { percProt: number; percCarb: number; percGord: number }
  temRefeicoes: boolean
  onCopiarCardapio: () => void
}

export const ResumoNutricionalDia = ({
  labelDia,
  totais,
  metas,
  distribuicao,
  temRefeicoes,
  onCopiarCardapio,
}: ResumoNutricionalDiaProps) => {
  return (
    <div className="p-4 rounded-2xl bg-base-terciaria/70 shadow-md shadow-gray-900/20 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <Texto tipo="subtitulo" className="flex items-center gap-2 capitalize">
          <PieChart className="size-5 opacity-70" />
          Balanço do Dia: {labelDia}
        </Texto>

        {temRefeicoes && (
          <button
            type="button"
            onClick={onCopiarCardapio}
            className="flex items-center gap-1.5 text-xs opacity-70 hover:opacity-100 bg-base-secundaria px-3 py-1.5 rounded-lg border border-base-terciaria/40 transition-colors"
          >
            <Copy className="size-3.5" />
            Copiar este cardápio para os outros dias
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-3 rounded-xl bg-base-secundaria border border-base-terciaria/40">
          <span className="block opacity-60 mb-0.5">🔥 Calorias</span>
          <strong className="text-sm">{totais.calorias} kcal</strong>
          {metas.calorias && (
            <span className="block text-[10px] opacity-50 mt-0.5">
              Meta: {metas.calorias} kcal ({totais.calorias - Number(metas.calorias)} kcal)
            </span>
          )}
        </div>

        <div className="p-3 rounded-xl bg-base-secundaria border border-base-terciaria/40">
          <span className="block opacity-60 mb-0.5">🥩 Proteínas</span>
          <strong className="text-sm">{totais.proteinas}g</strong>
          {metas.proteinas && (
            <span className="block text-[10px] opacity-50 mt-0.5">
              Meta: {metas.proteinas}g ({totais.proteinas - Number(metas.proteinas)}g)
            </span>
          )}
        </div>

        <div className="p-3 rounded-xl bg-base-secundaria border border-base-terciaria/40">
          <span className="block opacity-60 mb-0.5">🍞 Carboidratos</span>
          <strong className="text-sm">{totais.carboidratos}g</strong>
          {metas.carboidratos && (
            <span className="block text-[10px] opacity-50 mt-0.5">
              Meta: {metas.carboidratos}g ({totais.carboidratos - Number(metas.carboidratos)}g)
            </span>
          )}
        </div>

        <div className="p-3 rounded-xl bg-base-secundaria border border-base-terciaria/40">
          <span className="block opacity-60 mb-0.5">🥑 Gorduras</span>
          <strong className="text-sm">{totais.gorduras}g</strong>
          {metas.gorduras && (
            <span className="block text-[10px] opacity-50 mt-0.5">
              Meta: {metas.gorduras}g ({totais.gorduras - Number(metas.gorduras)}g)
            </span>
          )}
        </div>
      </div>

      {totais.calorias > 0 && (
        <div className="pt-2 border-t border-base-terciaria/40">
          <span className="text-xs opacity-60 block mb-2">
            Divisão Calórica de {labelDia} (%):
          </span>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-base-secundaria">
              <span className="opacity-60">Proteínas:</span> <strong>{distribuicao.percProt}%</strong>
            </div>
            <div className="p-2 rounded-lg bg-base-secundaria">
              <span className="opacity-60">Carboidratos:</span> <strong>{distribuicao.percCarb}%</strong>
            </div>
            <div className="p-2 rounded-lg bg-base-secundaria">
              <span className="opacity-60">Gorduras:</span> <strong>{distribuicao.percGord}%</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}