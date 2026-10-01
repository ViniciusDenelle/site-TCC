import { DiaSemana, RefeicaoFormulario } from './types'

interface SeletorDiasProps {
  dias: DiaSemana[]
  diaAtivo: string
  onSelecionarDia: (id: string) => void
  refeicoesPorDia: Record<string, RefeicaoFormulario[]>
}

export const SeletorDias = ({
  dias,
  diaAtivo,
  onSelecionarDia,
  refeicoesPorDia,
}: SeletorDiasProps) => {
  return (
    <div className="flex flex-wrap gap-2 my-1">
      {dias.map(dia => {
        const isSelected = diaAtivo === dia.id
        const qtdRefeicoes = (refeicoesPorDia[dia.id] || []).length

        return (
          <button
            key={dia.id}
            type="button"
            onClick={() => onSelecionarDia(dia.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all border ${
              isSelected
                ? 'bg-base-terciaria border-emerald-500/50 text-white shadow-md'
                : 'bg-base-secundaria/60 border-base-terciaria/30 opacity-70 hover:opacity-100 hover:bg-base-terciaria/40'
            }`}
          >
            <span>{dia.label}</span>
            {qtdRefeicoes > 0 && (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                {qtdRefeicoes} ref
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}