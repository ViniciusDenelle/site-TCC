import { useState } from 'react';
import Texto from '../../../../componentes/organizacao/Texto';
import InputSimples from '../../../../componentes/inputs/InputSimples';
import Paginacao from '../../../../componentes/outros/Paginacao';
import useFiltrosFicha from '../../../../logicas/dashboard/treinos/fichas/useFichaFiltros';
import useDebounce from '../../../../logicas/useDebounce';
import useFetchFichas from '../../../../logicas/dashboard/treinos/fichas/FetchFichas';
import FichaCard from '../../../../componentes/cards/FichaCard';

const PesquisarFichas = () => {
    const filtros = useFiltrosFicha();
    const [pagina, setPagina] = useState(1);

    const pesquisaDebounce = useDebounce(filtros.pesquisa, 500);

    const {
        fichas,
        isPending,
        isSuccess
    } = useFetchFichas(pesquisaDebounce, pagina);

    console.log(fichas)

    return (
        <div className="flex flex-col gap-2 w-full mt-4">

            <InputSimples
                tipo="text"
                valor={filtros.pesquisa}
                onChange={e => filtros.setPesquisa(e.target.value)}
                placeholder="pesquisar ficha"
            />

            {isSuccess ? (
                <>
                    <div className="grid grid-rows-2 grid-flow-col 
                    auto-cols-max overflow-x-auto gap-4 pb-2 shrink-0">
                        {fichas?.data.map((ficha: any) => (
                            <FichaCard key={ficha.id} ficha={ficha} />
                        ))}
                    </div>

                    <Paginacao pagina={pagina} setPagina={setPagina} meta={fichas?.meta} />
                </>
            ) : (
                <Texto className="animate-pulse">procurando fichas...</Texto>
            )}

        </div>
    );
};

export default PesquisarFichas;