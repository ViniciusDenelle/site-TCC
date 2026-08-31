import WrapperIcone from '../organizacao/WrapperIcone'
import { X } from 'lucide-react'
import Texto from '../organizacao/Texto'
import { SecaoFiltro, UseFiltrosProps } from '../../logicas/dashboard/treinos/tipagens/FiltrosProps'

type FiltroChipsProps = UseFiltrosProps & { secoes: SecaoFiltro[] }

const FiltrosChips = ({
    secoes,
    removerFiltro,
    filtros,
}: FiltroChipsProps) => {

    return (
        <div className="flex gap-1 overflow-x-scroll pb-2">
            {secoes.map(secao =>
                filtros[secao.tipo]?.map(id => {
                    const badge = secao.dados?.find(b => b.id === id)
                    if (!badge) return null

                    return (
                        <div
                            key={`${secao.tipo}-${id}`}
                            className="flex gap-1 items-center bg-base-secundaria rounded-full px-1 overflow-x-hidden shrink-0"
                        >
                            <button onClick={() => removerFiltro(id, secao.tipo)}>
                                <WrapperIcone tamanho="xs">
                                    <X className="size-full" />
                                </WrapperIcone>
                            </button>
                            <Texto tipo="subtexto" className="truncate">
                                {badge.nome}
                            </Texto>
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default FiltrosChips