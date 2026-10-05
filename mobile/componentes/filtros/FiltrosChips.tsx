import React from 'react'
import WrapperIcone from '../organizacao/WrapperIcone'
import { X } from 'lucide-react'
import Texto from '../organizacao/Texto'
import { SecaoFiltro, UseFiltrosProps } from '../../logicas/dashBoard/treinos/tipagens/FiltrosProps'
import Chip from './Chip'

type FiltroChipsProps = UseFiltrosProps & { secoes: SecaoFiltro[] }

const FiltrosChips = ({
    secoes,
    removerFiltro,
    filtros
}: FiltroChipsProps) => {
    
    const filtrosArray = Object.entries(filtros).map(([campo, valor]) => {
        return {
            campo: campo,
            valor: valor
        }
    })

    return (
        
        <div className="flex gap-1 overflow-x-scroll pb-2">
            {filtrosArray.map(campo => (
                Object.entries(campo.valor).map(([_, id]) => (
                    id
                ))
            ))}
            {/* {secoes.map(secao => (
                filtros.badges?.[secao.tipo]?.map(filtro => {
                    const badge = secao.dados.find(badge => badge.id === filtro)

                    return (
                        <Chip 
                        
                        />
                        // <div key={badge.id}
                        //     className="flex gap-1 items-center 
                        //                 bg-base-secundaria rounded-full px-1 overflow-x-hidden shrink-0">

                        //     <button onClick={() => removerFiltro(badge.id, secao.tipo)}>
                        //         <WrapperIcone tamanho='xs'>
                        //             <X className='size-full' />
                        //         </WrapperIcone>
                        //     </button>
                        //     <Texto tipo='subtexto' className='truncate'>
                        //         {badge.nome}
                        //     </Texto>
                        // </div>

                    )
                }))
            )} */}
        </div>
    )
}

export default FiltrosChips