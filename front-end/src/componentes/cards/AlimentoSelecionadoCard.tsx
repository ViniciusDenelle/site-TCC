import { Flame } from "lucide-react"
import Texto from "../organizacao/Texto"
import { AlimentoSelecionado } from "../../logicas/dashboard/dieta/useDietaForm"
import usecalcularMacrosPorGramas from "../../logicas/dashboard/dieta/useCalcularMacros"

type Props = {
    alimento: AlimentoSelecionado
    onAtualizarQuantidade: (quantidadeGramas: number) => void
    onRemover: () => void
}

function AlimentoAdicionadoCard({ alimento, onAtualizarQuantidade, onRemover }: Props) {
    const macros = usecalcularMacrosPorGramas(alimento, alimento.quantidade_gramas)

    return (
        <div className="flex flex-col gap-1.5 bg-base-terciaria/20 rounded-lg px-3 py-2">
            <div className="flex items-center justify-between">
                <Texto tipo="subtexto" className="font-medium">{alimento.nome}</Texto>
                <button onClick={onRemover}>
                    <span className="opacity-50 text-xs">remover</span>
                </button>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="number"
                    min={1}
                    value={alimento.quantidade_gramas}
                    onChange={e => onAtualizarQuantidade(Number(e.target.value))}
                    className="w-16 bg-base-secundaria border border-base-terciaria/40 rounded px-1 text-center text-sm"
                />
                <Texto tipo="subtexto" className="opacity-60 text-xs">
                    gramas (porção padrão: {alimento.porcao_descricao}, {alimento.porcao_gramas}g)
                </Texto>
            </div>

            <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                    <Flame className="size-3 text-destaque-p-claro" />
                    <Texto tipo="subtexto">{macros.calorias} kcal</Texto>
                </div>
                <Texto tipo="subtexto" className="opacity-60">P: {macros.proteinas}g</Texto>
                <Texto tipo="subtexto" className="opacity-60">C: {macros.carboidratos}g</Texto>
                <Texto tipo="subtexto" className="opacity-60">G: {macros.gorduras}g</Texto>
            </div>
        </div>
    )
}

export default AlimentoAdicionadoCard