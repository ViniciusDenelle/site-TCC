import { Link } from 'react-router-dom'
import { Utensils, Flame, CalendarDays } from 'lucide-react'
import Texto from '../../../../componentes/organizacao/Texto'
import useFetchMeusItens from '../../../../logicas/dashboard/treinos/meusItens/FetchMeusItens'

// Formato mínimo que a página usa (baseado no que o VerDieta lê da dieta)
interface AlimentoResumo {
    id: number
    calorias: number
    proteinas: number
    carboidratos: number
    gorduras: number
}

interface RefeicaoResumo {
    id: number
    dia_semana: number
    alimentos: AlimentoResumo[]
}

interface DietaResumo {
    id: number
    nome: string
    descricao?: string | null
    objetivo?: { nome: string } | null
    nivel?: { nome: string } | null
    refeicoes?: RefeicaoResumo[]
}

function resumirDieta(dieta: DietaResumo) {
    const refeicoes = dieta.refeicoes ?? []
    const dias = new Set(refeicoes.map(r => r.dia_semana)).size
    const alimentos = refeicoes.flatMap(r => r.alimentos ?? [])

    const total = alimentos.reduce(
        (acc, a) => ({
            calorias: acc.calorias + a.calorias,
            proteinas: acc.proteinas + a.proteinas,
            carboidratos: acc.carboidratos + a.carboidratos,
            gorduras: acc.gorduras + a.gorduras,
        }),
        { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 }
    )

    const porDia = dias > 0 ? dias : 1

    return {
        dias,
        refeicoes: refeicoes.length,
        calorias: Math.round(total.calorias / porDia),
        proteinas: Math.round(total.proteinas / porDia),
        carboidratos: Math.round(total.carboidratos / porDia),
        gorduras: Math.round(total.gorduras / porDia),
    }
}

const DietaCard = ({ dieta }: { dieta: DietaResumo }) => {
    const resumo = resumirDieta(dieta)

    return (
        <Link
            to={`/dashboard/dieta/verDieta/${dieta.id}`}
            className="block rounded-3xl bg-base-secundaria border border-base-terciaria/30 overflow-hidden"
        >
            <div className="flex items-center justify-between gap-3 p-4 border-b border-base-terciaria/20">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-destaque-p-claro/10 border border-destaque-p-claro/10">
                        <Utensils className="size-5 text-destaque-p-claro" />
                    </div>

                    <div className="min-w-0">
                        <Texto tipo="subtitulo" className="text-t-primaria truncate">
                            {dieta.nome}
                        </Texto>
                        {dieta.descricao && (
                            <Texto tipo="subtexto" className="text-t-terciaria truncate">
                                {dieta.descricao}
                            </Texto>
                        )}
                    </div>
                </div>

                <div className="rounded-xl bg-destaque-p-claro/10 border border-destaque-p-claro/20 px-3 py-2 shrink-0">
                    <div className="flex items-center gap-1">
                        <Flame className="size-4 text-destaque-p-claro" />
                        <Texto tipo="subtexto" className="text-destaque-p-claro font-semibold">
                            {resumo.calorias} kcal/dia
                        </Texto>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 p-4">
                <div className="flex gap-2 flex-wrap">
                    {dieta.objetivo?.nome && (
                        <div className="rounded-full bg-base-primaria px-3 py-1">
                            <Texto tipo="subtexto" className="text-destaque-p-claro font-medium">
                                {dieta.objetivo.nome}
                            </Texto>
                        </div>
                    )}
                    {dieta.nivel?.nome && (
                        <div className="rounded-full bg-base-primaria border border-base-terciaria/30 px-3 py-1">
                            <Texto tipo="subtexto" className="text-t-primaria font-medium">
                                {dieta.nivel.nome}
                            </Texto>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1 text-t-terciaria">
                        <CalendarDays className="size-4" />
                        <Texto tipo="subtexto">
                            {resumo.dias} dias · {resumo.refeicoes} refeições
                        </Texto>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                        <Texto tipo="subtexto" className="opacity-60">P {resumo.proteinas}g</Texto>
                        <Texto tipo="subtexto" className="opacity-60">C {resumo.carboidratos}g</Texto>
                        <Texto tipo="subtexto" className="opacity-60">G {resumo.gorduras}g</Texto>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const Secao = ({ titulo, dietas }: { titulo: string; dietas: DietaResumo[] }) => {
    if (dietas.length === 0) return null

    return (
        <div className="flex flex-col gap-3">
            <Texto tipo="subtitulo" className="text-t-secundaria">
                {titulo}
            </Texto>

            {dietas.map(dieta => (
                <DietaCard key={dieta.id} dieta={dieta} />
            ))}
        </div>
    )
}

const MinhasDietas = () => {
    const pagina = 1

    const { data: dietasCriadas, isPending } = useFetchMeusItens<DietaResumo>(
        'dietas',
        'criados',
        pagina
    )

    const { data: dietasAdicionadas } = useFetchMeusItens<DietaResumo>(
        'dietas',
        'adicionados',
        pagina
    )

    if (isPending) {
        return <Texto className="animate-pulse">carregando dietas...</Texto>
    }

    const criadas = dietasCriadas?.data ?? []
    const adicionadas = dietasAdicionadas?.data ?? []

    if (criadas.length === 0 && adicionadas.length === 0) {
        return (
            <div className="rounded-3xl bg-base-secundaria border border-base-terciaria/30 p-6 text-center">
                <Texto tipo="subtitulo" className="text-t-primaria">
                    Você ainda não tem dietas
                </Texto>
                <Texto tipo="subtexto" className="text-t-terciaria mt-1">
                    Crie uma dieta ou pesquise planos prontos para adicionar.
                </Texto>
            </div>
        )
    }

    return (
        <div className="w-full h-full pt-5">
            <div className="flex flex-col gap-6">
                <Secao titulo="Criadas por você" dietas={criadas} />
                <Secao titulo="Adicionadas" dietas={adicionadas} />
            </div>
        </div>
    )
}

export default MinhasDietas