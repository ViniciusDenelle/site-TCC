import React from 'react'
import BotaoSecundario from '../botoes/BotaoSecundario'
import { Filter, Search } from 'lucide-react'
import InputSimples from '../inputs/InputSimples'
import WrapperIcone from '../organizacao/WrapperIcone'

type Props = {
    abrirMenuFiltro: () => void;
    quantidadeFiltros: number;
    pesquisa: string;
    setPesquisa: (valor: string) => void;
};

const FiltrosPesquisa = ({
    abrirMenuFiltro,
    quantidadeFiltros,
    pesquisa,
    setPesquisa,
}: Props) => {

    return (
        <div className="relative flex items-center w-full mt-4 h-8">

            <div className="relative">
                <BotaoSecundario
                    tipo='cheio'
                    icone={Filter}
                    classeAdicional=' rounded-r-none h-8'
                    onClick={abrirMenuFiltro}
                />

                {quantidadeFiltros > 0 && (
                    <span className="absolute -top-1 -right-1 bg-destaque-p-claro/80 
                                rounded-full size-4 flex justify-center items-center">
                        {quantidadeFiltros}
                    </span>
                )}
            </div>

            <InputSimples
                classeAdicional='w-full rounded-l-none h-8'
                placeholder='pesquisar'
                valor={pesquisa}
                onChange={ev => setPesquisa(ev.target.value)}
            />

            <div className="absolute top-1/2 -translate-y-1/2 right-3">
                <WrapperIcone tamanho='sm'>
                    <Search className='w-full text-t-terciaria/80' />
                </WrapperIcone>
            </div>
        </div>
    )
}

export default FiltrosPesquisa