import { useState } from "react";
import { ResExercicioProps } from "../../../../logicas/dashboard/treinos/exercicios/FetchExercicio";
import { Ficha } from "../../../../logicas/dashboard/treinos/fichas/FichaProps";
import useFetchMeusItens from "../../../../logicas/dashboard/treinos/meusItens/FetchMeusItens";
import { ResTreinoProps } from "../../../../logicas/dashboard/treinos/treino/TreinoProps";
import TreinoCard from "../../../../componentes/cards/TreinoCard";
import ExercicioCard from "../../../../componentes/ExercicioCard";
import Texto from "../../../../componentes/organizacao/Texto";
import FichaCardHorizontal from "../../../../componentes/cards/FichaCardHorizontal";

const BibliotecaTreinosHome = () => {

    const [pagina, setPagina] = useState(1)

    const { data: treinosCriados, isPending } = useFetchMeusItens<ResTreinoProps>(
        'treinos', 
        'criados', 
        pagina
    );
    const { data: treinosAdicionados } = useFetchMeusItens<ResTreinoProps>(
        'treinos', 
        'adicionados', 
        pagina
    );

    const { data: exerciciosCriados } = useFetchMeusItens<ResExercicioProps>(
        'exercicios', 
        'criados', 
        pagina
    );

    const { data: exerciciosAdicionados } = useFetchMeusItens<ResExercicioProps>(
        'exercicios', 
        'adicionados', 
        pagina
    );
    const { data: fichasAdicionadas } = useFetchMeusItens<Ficha>(
        'fichas', 
        'adicionados', 
        pagina
    );

    const {data:fichasCriadas} = useFetchMeusItens<Ficha>('fichas', 'criados', pagina)

    console.log(treinosAdicionados, treinosCriados, )

    return (
        <div className="w-full h-full">
            <div className="flex flex-col gap-2">

                <Texto tipo="subtitulo" className="text-t-secundaria">
                    seus itens
                </Texto>

                {treinosCriados?.data.map(treino => (
                    <TreinoCard 
                        treino={treino}
                    />
                ))}
                {fichasCriadas?.data.map(ficha => (
                    <FichaCardHorizontal 
                        ficha={ficha}
                    />
                ))}
                {exerciciosAdicionados?.data.map(exercicio => (
                    <ExercicioCard 
                        exercicio={exercicio}
                    />
                ))}
            </div>
        </div>
    )
}

export default BibliotecaTreinosHome