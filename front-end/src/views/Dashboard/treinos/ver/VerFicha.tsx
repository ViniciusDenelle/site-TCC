import { useNavigate, useParams } from 'react-router-dom';
import { Layers, EllipsisVertical, ArrowBigLeft, ArrowLeft, Weight } from 'lucide-react';
import Texto from '../../../../componentes/organizacao/Texto';
import CardHorizontal from '../../../../componentes/CardHorizontal';
import BotaoTerciario from '../../../../componentes/botoes/BotaoTerciario';
import { DiaSemana } from '../../../../logicas/dashboard/treinos/fichas/FichaProps';
import useShowFicha from '../../../../logicas/dashboard/treinos/fichas/ShowFicha';
import MenuFicha from '../../../../componentes/dashboard/player/menus/MenuFicha';
import { useState } from 'react';

const nomesDias: Record<DiaSemana, string> = {
    domingo: 'Domingo', segunda: 'Segunda', terca: 'Terça', quarta: 'Quarta',
    quinta: 'Quinta', sexta: 'Sexta', sabado: 'Sábado',
};

const ordemDias: DiaSemana[] = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', ];

const VerFicha = () => {
    const { id } = useParams<{ id: string }>();
    const { 
        ficha, 
        isPending, 
        isError 
    } = useShowFicha(id);

    console.log(ficha)

    const [menuAberto, setMenuAberto] = useState<boolean>(false)
    const navigate = useNavigate()

    if (isPending) {
        return <Texto className="animate-pulse">carregando ficha...</Texto>;
    }

    if (isError || !ficha) {
        return <Texto>Ficha não encontrada.</Texto>;
    }

    console.log(ficha)

    return (
        <div className="min-h-screen w-full">

            <MenuFicha 
                ficha={ficha}
                menuAberto={menuAberto}
                setMenuAberto={setMenuAberto}
            />

            <div className="container mx-auto flex flex-col gap-3">

                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <BotaoTerciario 
                            icone={ArrowLeft}
                            onClick={() => navigate(-1)}
                            tamanhoIcone='md'
                        />

                        <BotaoTerciario
                            icone={EllipsisVertical}
                            tamanhoIcone="md"
                            onClick={() => setMenuAberto(true)}
                        />
                    </div>

                    <div className="size-7/10 md:size-80 mx-auto flex items-center 
                    justify-center bg-base-terciaria rounded-lg p-2">
                        {ficha.imagem ? (
                            <img 
                                src={ficha.imagem} 
                                alt={ficha.nome} 
                                className="size-full rounded-md overflow-hidden shrink-0"
                            />
                        ) : (
                            <Layers className="size-full" strokeWidth={1} />
                        )}
                    </div>
                    <Texto tipo="titulo" className="text-t-primaria">
                        {ficha.nome}
                    </Texto>

                    {ficha.descricao && (
                        <Texto className="opacity-70">{ficha.descricao}</Texto>
                    )}
                </div>

                <Texto tipo="titulo" className="font-thin mt-2">
                    Divisões
                </Texto>
                
                <CardHorizontal>
                    <div className="flex flex-col gap-1">
                        {ficha.divisoes.map(divisao => (
                            <div key={divisao.id} 
                            className="flex gap-2 items-center">
                                <Texto tipo='subtitulo'>
                                    {divisao.nome}
                                </Texto>

                                {divisao.treinos.map(treino => (
                                    
                                    <Texto className='text-t-terciaria/80' key={treino.id}>
                                        {treino.nome}
                                    </Texto>
                                ))}

                            </div>
                        ))}
                    </div>
                </CardHorizontal>

                <Texto tipo="titulo" className="font-thin mt-2">
                    Calendário semanal
                </Texto>

                <div className="flex flex-col gap-2">
                    {ordemDias.map((dia, index) => {
                        const treinoDoDia = ficha.dias[index];

                        return (
                            <div key={dia} className="flex items-center justify-between gap-2 
                            rounded-lg px-2 py-2 bg-base-secundaria/40">
                                <Texto tipo="subtexto" className="w-20 shrink-0">
                                    {nomesDias[dia]}
                                </Texto>

                                {treinoDoDia ? (
                                    <Texto tipo="subtexto">{treinoDoDia.nome}</Texto>
                                ) : (
                                    <Texto tipo="subtexto" className="opacity-40">descanso</Texto>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default VerFicha;