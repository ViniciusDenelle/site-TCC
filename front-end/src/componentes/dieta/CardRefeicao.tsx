import { Clock, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import Texto from '../organizacao/Texto'
import InputSimples from '../inputs/InputSimples'
import BotaoTerciario from '../botoes/BotaoTerciario'
import WrapperIcone from '../organizacao/WrapperIcone'
import { ItemAlimento } from './ItemAlimento'
import { RefeicaoFormulario, AlimentoFormulario } from '../dieta/types'

interface CardRefeicaoProps {
  refeicao: RefeicaoFormulario
  estaAberta: boolean
  onToggleAberta: () => void
  onAtualizarRefeicao: (campo: 'nome' | 'horario', valor: string) => void
  onRemoverRefeicao: () => void
  onAdicionarAlimento: () => void
  onRemoverAlimento: (alimentoId: string) => void
  onAtualizarAlimento: (alimentoId: string, campo: keyof AlimentoFormulario, valor: string) => void
}

export const CardRefeicao = ({
  refeicao,
  estaAberta,
  onToggleAberta,
  onAtualizarRefeicao,
  onRemoverRefeicao,
  onAdicionarAlimento,
  onRemoverAlimento,
  onAtualizarAlimento,
}: CardRefeicaoProps) => {
  const totalRefeicao = refeicao.alimentos.reduce(
    (acc, item) => {
      acc.calorias += Number(item.calorias) || 0
      acc.proteinas += Number(item.proteinas) || 0
      acc.carboidratos += Number(item.carboidratos) || 0
      acc.gorduras += Number(item.gorduras) || 0
      return acc
    },
    { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 }
  )

  return (
    <div className="w-full p-4 rounded-2xl bg-base-terciaria/70 shadow-md shadow-gray-900/20 flex flex-col gap-3">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-full pr-2">
          <WrapperIcone>
            <Clock className="size-full" />
          </WrapperIcone>
          <div className="flex flex-1 gap-2 flex-col sm:flex-row">
            <InputSimples
              tipo="text"
              valor={refeicao.nome}
              onChange={e => onAtualizarRefeicao('nome', e.target.value)}
              placeholder="Nome da refeição"
              classeAdicional="w-full sm:w-1/2"
            />
            <InputSimples
              tipo="time"
              valor={refeicao.horario}
              onChange={e => onAtualizarRefeicao('horario', e.target.value)}
              classeAdicional="w-full sm:w-32"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onRemoverRefeicao}
          title="Remover Refeição"
          className="p-1.5 hover:text-red-500 transition-colors"
        >
          <Trash2 className="size-5 opacity-70" />
        </button>
      </div>

      {/* Resumo rápido */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-base-secundaria p-2.5 rounded-xl text-xs border border-base-terciaria/30">
        <span className="opacity-70">
          Total: <strong>{totalRefeicao.calorias} kcal</strong>
        </span>
        <div className="flex gap-3 opacity-80">
          <span>🥩 {totalRefeicao.proteinas}g</span>
          <span>🍞 {totalRefeicao.carboidratos}g</span>
          <span>🥑 {totalRefeicao.gorduras}g</span>
        </div>
      </div>

      <BotaoTerciario
        texto={
          estaAberta
            ? 'ocultar alimentos'
            : `ver/editar alimentos (${refeicao.alimentos.length})`
        }
        icone={estaAberta ? ChevronUp : ChevronDown}
        onClick={onToggleAberta}
        classeAdicional="w-full"
      />

      {/* Lista de Alimentos Accordion */}
      {estaAberta && (
        <div className="flex flex-col gap-3 mt-2 pt-2 border-t border-base-terciaria/40">
          <Texto tipo="subtexto" className="opacity-60">
            Alimentos Cadastrados
          </Texto>

          {refeicao.alimentos.length === 0 && (
            <p className="text-xs opacity-40 italic text-center py-2">
              Nenhum alimento adicionado nesta refeição ainda.
            </p>
          )}

          {refeicao.alimentos.map(alimento => (
            <ItemAlimento
              key={alimento.id}
              alimento={alimento}
              onAtualizar={(campo, valor) =>
                onAtualizarAlimento(alimento.id, campo, valor)
              }
              onRemover={() => onRemoverAlimento(alimento.id)}
            />
          ))}

          <BotaoTerciario
            texto="adicionar alimento"
            icone={Plus}
            onClick={onAdicionarAlimento}
            classeAdicional="flex items-center justify-center gap-2 mt-1"
          />
        </div>
      )}
    </div>
  )
}