import { useParams } from 'react-router-dom';
import { Dumbbell, EllipsisVertical } from 'lucide-react';
import Texto from '../../../../componentes/organizacao/Texto';
import CardHorizontal from '../../../../componentes/CardHorizontal';
import BotaoTerciario from '../../../../componentes/botoes/BotaoTerciario';
import useShowExercicio from '../../../../logicas/dashboard/treinos/exercicios/ShowExercicio';
import MenuPlayer from '../../../../componentes/dashboard/player/menus/MenuPlayer';
import { useState } from 'react';

const VerExercicio = () => {
    const { id } = useParams<{ id: string }>();

    const {
        exercicio,
        isPending,
        isError,
        error
    } = useShowExercicio(id)

    const musculosPrimarios = exercicio?.musculos.filter(m => m.tipo.id === 1);
    const musculosSecundarios = exercicio?.musculos.filter(m => m.tipo.id === 2);

    const [menuAberto, setMenuAberto] = useState<boolean>(false)

    if (isPending) {
        return <Texto className="animate-pulse">carregando exercício...</Texto>;
    }

    if (isError || !exercicio) {
        return <Texto>Exercício não encontrado.</Texto>;
    }


    return (
        <div className="min-h-screen w-full">

            <MenuPlayer 
                menuAberto={menuAberto}
                setMenuAberto={setMenuAberto}
                exercicio={exercicio}
            />

            <div className="container mx-auto flex flex-col gap-3">

                <div className="flex flex-col gap-2">
                    <BotaoTerciario
                        icone={EllipsisVertical}
                        tamanhoIcone="md"
                        classeAdicional="ml-auto"
                        onClick={() => setMenuAberto(true)}
                    />

                    <div className="size-7/10 mx-auto flex items-center justify-center bg-base-terciaria rounded-lg p-2">
                        <Dumbbell className="size-full" strokeWidth={1} />
                    </div>

                    <Texto tipo="titulo" className="text-t-primaria">
                        {exercicio.nome}
                    </Texto>

                    {exercicio.descricao && (
                        <Texto className="opacity-70">{exercicio.descricao}</Texto>
                    )}
                </div>

                <div className="flex gap-2 flex-wrap">
                    <div className="rounded-full bg-base-secundaria px-2">
                        <Texto>{exercicio.tipo.nome}</Texto>
                    </div>
                    <div className="rounded-full bg-base-secundaria px-2">
                        <Texto>{exercicio.nivel.nome}</Texto>
                    </div>
                    <div className="rounded-full bg-base-secundaria px-2">
                        <Texto>{exercicio.foco.nome}</Texto>
                    </div>
                </div>

                <div>
                    <Texto tipo="titulo" className="font-thin mt-2">
                        Músculos
                    </Texto>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {musculosPrimarios.map(musculo => (
                            <div key={musculo.id} className="rounded-full border  bg-base-secundaria border-base-terciaria px-2">
                                <Texto className='text-destaque-s-escuro'>
                                    {musculo.nome}
                                </Texto>
                            </div>
                        ))}
                        {musculosSecundarios.length > 0 && (
                            <div>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {musculosSecundarios.map(musculo => (
                                        <div key={musculo.id} className="rounded-full 
                                        border border-base-terciaria/60 px-2 bg-base-secundaria ">

                                            <Texto tipo="subtexto">{musculo.nome}</Texto>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>



                {exercicio.equipamentos.length > 0 && (
                    <div>
                        <Texto tipo="titulo" className="font-thin mt-2">
                            Equipamentos
                        </Texto>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {exercicio.equipamentos.map(equipamento => (
                                <div key={equipamento.id} className="rounded-full bg-base-secundaria px-2">
                                    <Texto tipo="subtexto">{equipamento.nome}</Texto>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default VerExercicio;