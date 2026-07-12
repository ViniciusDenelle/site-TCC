import React from 'react'
import { MetaProps } from '../../logicas/tipagens/PaginacaoProps'
import BotaoSecundario from '../botoes/BotaoSecundario'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Texto from '../organizacao/Texto'

type ComponentePaginacaoProps = {
    pagina: number,
    setPagina: any
    meta: MetaProps
}

const Paginacao = ({
    pagina,
    meta,
    setPagina
}) => {
    return (
        <div className='flex justify-between gap-2'>

            <BotaoSecundario
                disabled={pagina === 1}
                onClick={() => setPagina(p => p - 1)}
                classeAdicional='ring-transparent'
                icone={ArrowLeft}
            />
{/* 
            <div className="flex divide-x divide-base-terciaria rounded-lg overflow-x-scroll">
                {Array.from({ length: 10 },(_, i) => i + 1).map(pagina => (
                    <BotaoSecundario
                        tipo={meta?.current_page === pagina ? 'cheio' : 'vazio'}
                        texto={String(pagina)}
                        onClick={() => setPagina(pagina)}
                        classeAdicional='ring-transparent rounded-none px-2'
                    />
                ))}

            </div> */}

            <Texto>
                pagina {meta?.current_page} de {meta?.last_page}
            </Texto>

            <BotaoSecundario
                disabled={pagina === meta.last_page}
                onClick={() => setPagina(p => p + 1)}
                classeAdicional='ring-transparent'
                icone={ArrowRight}
            />

        </div>
    )
}

export default Paginacao
