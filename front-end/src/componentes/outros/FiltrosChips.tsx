import React from 'react'
import { SecaoFiltro, UseFiltrosProps } from '../../logicas/dashboard/treinos/useFiltrosTreinos'
import WrapperIcone from '../organizacao/WrapperIcone'
import { X } from 'lucide-react'
import Texto from '../organizacao/Texto'

type FiltroChipsProps = UseFiltrosProps & { secoes: SecaoFiltro[] }

const FiltrosChips = ({
    secoes,
    removerFiltro,
    filtros
}: FiltroChipsProps) => {
    return (

        <div className="flex gap-1 overflow-x-scroll pb-2">
            {secoes.map(secao => (
                filtros[secao.tipo]?.map(filtro => {
                    const badge = secao.dados.find(badge => badge.id === filtro)

                    return (
                        <div key={badge.id}
                            className="flex gap-1 items-center 
                                        bg-base-secundaria rounded-full px-1 overflow-x-hidden shrink-0">

                            <button onClick={() => removerFiltro(badge.id, secao.tipo)}>
                                <WrapperIcone tamanho='xs'>
                                    <X className='size-full' />
                                </WrapperIcone>
                            </button>
                            <Texto tipo='subtexto' className='truncate'>
                                {badge.nome}
                            </Texto>
                        </div>

                    )
                }))
            )}
        </div>
    )
}

export default FiltrosChips