import { useQueryClient } from '@tanstack/react-query'
import api from '../../../api'
import Dieta from '../../../logicas/dashboard/dieta/DietaProps'
import Texto from '../../../componentes/organizacao/Texto'
import DietaCard from '../../../componentes/dieta/DIetaCard'
import useFetchMeusItens from '../../../logicas/dashboard/treinos/meusItens/FetchMeusItens'

const Secao = ({
    titulo,
    dietas,
    onRemover
}: {
    titulo: string
    dietas: Dieta[]
    onRemover?: (dieta: Dieta) => Promise<void>
}) => {
    if (dietas.length === 0) return null

    return (
        <div className="flex flex-col gap-3">
            <Texto tipo="subtitulo" className="text-t-secundaria">
                {titulo}
            </Texto>

            <div className="flex flex-col gap-3">
                {dietas.map(dieta => (
                    <DietaCard
                        key={dieta.id}
                        dieta={dieta}
                        onRemover={onRemover}
                    />
                ))}
            </div>
        </div>
    )
}

const MinhasDietas = () => {
    const pagina = 1
    const queryClient = useQueryClient()

    const { data: dietasCriadas, isPending } = useFetchMeusItens<Dieta>(
        'dietas',
        'criados',
        pagina
    )

    const { data: dietasAdicionadas } = useFetchMeusItens<Dieta>(
        'dietas',
        'adicionados',
        pagina
    )

    // Tira a dieta das "Adicionadas" e atualiza a lista
    const removerDieta = async (dieta: Dieta) => {
        await api.delete(`/dashboard/dietas/dieta/${dieta.id}/adicionar`)
        queryClient.invalidateQueries({ queryKey: ['dietas', 'adicionados'] })
    }

    if (isPending) {
        return <Texto className="animate-pulse">carregando dietas...</Texto>
    }

    const criadas = dietasCriadas?.data ?? []
    const adicionadas = dietasAdicionadas?.data ?? []

    if (criadas.length === 0 && adicionadas.length === 0) {
        return (
            <div className="w-full rounded-3xl bg-base-secundaria border border-base-terciaria/30 px-6 py-8 text-center">
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
                <Secao titulo="Adicionadas" dietas={adicionadas} onRemover={removerDieta} />
            </div>
        </div>
    )
}

export default MinhasDietas