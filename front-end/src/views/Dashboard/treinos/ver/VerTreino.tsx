import { useParams } from 'react-router-dom';
import { Flame, Clock, Dumbbell, Weight, EllipsisVertical } from 'lucide-react';
import Texto from '../../../../componentes/organizacao/Texto';
import CardHorizontal from '../../../../componentes/CardHorizontal';
import useShowTreino from '../../../../logicas/dashboard/treinos/treino/ShowTreino';
import WrapperIcone from '../../../../componentes/organizacao/WrapperIcone';
import BotaoTerciario from '../../../../componentes/botoes/BotaoTerciario';
import { useState } from 'react';
import MenuTreino from '../../../../componentes/dashboard/player/menus/MenuTreino';
import HistoricoTreino from '../../../../componentes/dashboard/treino/HistoricoTreino';

const VerTreino = () => {
    const { id } = useParams<{ id: string }>();
    const {
        treino,
        isPending,
        isError
    } = useShowTreino(id)

    const [menuAberto, setMenuAberto] = useState<boolean>(false)

    if (isPending) {
        return <Texto className="animate-pulse">carregando treino...</Texto>;
    }

    if (isError || !treino) {
        return <Texto>Treino não encontrado.</Texto>;
    }

    console.log(treino)

    return (
        <div className="min-h-screen w-full">

            <MenuTreino 
                menuAberto={menuAberto}
                setMenuAberto={setMenuAberto}
                treino={treino}
            />

            <div className="container mx-auto flex flex-col gap-3">

                <div className='flex flex-col gap-2'>
                        <BotaoTerciario 
                            icone={EllipsisVertical}
                            tamanhoIcone='md'
                            classeAdicional='ml-auto'
                            onClick={() => setMenuAberto(true)}
                        />
                    <div className="size-7/10 md:size-80 mx-auto flex items-center 
                    justify-center bg-base-terciaria rounded-lg p-2">
                        {treino.imagem ? (
                            <img 
                                src={treino.imagem} 
                                alt={treino.nome} 
                                className="size-full rounded-md overflow-hidden shrink-0"
                            />
                        ) : (
                            <Weight className="size-full" strokeWidth={1} />
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Texto tipo="titulo" className='text-t-primaria'>
                            {treino.nome}
                        </Texto>

                        
                    </div>
                    {treino.descricao && (
                        <Texto className="opacity-70">{treino.descricao}</Texto>
                    )}
                </div>

                <div className="flex gap-2 flex-wrap">
                    <div className="rounded-full bg-base-secundaria px-2">
                        <Texto>
                            {treino.nivel.nome}
                        </Texto>
                    </div>

                    <div className="rounded-full bg-base-secundaria px-2">
                        <Texto>
                            {treino.tipo.nome}
                        </Texto>
                    </div>

                    <div className="rounded-full bg-base-secundaria px-2">
                        <Texto>
                            {treino.foco?.nome}
                        </Texto>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                        <WrapperIcone tamanho='sm'>
                            <Flame className="size-full text-destaque-p-claro" />
                        </WrapperIcone>
                        <Texto tipo="subtexto">{treino.calorias_estimadas} kcal</Texto>
                    </div>
                    <div className="flex items-center gap-1">
                        <WrapperIcone tamanho='sm'>
                            <Clock className="size-full text-destaque-s-medio" />
                        </WrapperIcone>
                        <Texto tipo="subtexto">{treino.tempo_estimado.minutos} min</Texto>
                    </div>
                </div>

                <Texto tipo="titulo" className="font-thin mt-2">
                    Exercícios
                </Texto>

                <div className="flex flex-col gap-2">
                    {treino.exercicios
                        .sort((a, b) => a.ordem - b.ordem)
                        .map(item => (
                            <CardHorizontal key={item.id}>
                                <div className="flex gap-2 items-center">
                                    <div className="size-10 rounded-md overflow-hidden shrink-0">
                                        <Dumbbell className="size-full" strokeWidth={1} />
                                    </div>

                                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                                        <Texto tipo="subtitulo">
                                            {item.ordem}. {item.exercicio?.nome ?? 'Exercício removido'}
                                        </Texto>
                                        <Texto tipo="subtexto" className="opacity-70">
                                            {item.sets}x {item.repeticoes_minimas}-{item.repeticoes_maximas} reps
                                            {item.peso > 0 && ` · ${item.peso}kg`}
                                            {' '}· {item.descanso}s descanso
                                        </Texto>
                                    </div>
                                </div>
                            </CardHorizontal>
                        ))}
                </div>

                <HistoricoTreino />

            </div>
        </div>
    );
};

export default VerTreino;