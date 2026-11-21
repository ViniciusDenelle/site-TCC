import { NavLink, useNavigate } from "react-router-dom"
import { Ficha, TreinoResumido } from "../../logicas/dashboard/treinos/fichas/FichaProps"
import CardHorizontal from "../CardHorizontal"
import { Layers } from "lucide-react"
import Texto from "../organizacao/Texto"
import BotaoPrimario from "../botoes/BotaoPrimario"


const nomesDiasAbrev: Record<number, string> = {
    0: 'Dom', 1: 'Seg', 2: 'Ter', 3: 'Qua', 4: 'Qui', 5: 'Sex', 6: 'Sab',
}

const FichaCard = ({ ficha }: { ficha: Ficha }) => {

    const totalTreinos = ficha.divisoes.reduce((soma, d) => soma + d.treinos.length, 0)

    const frequenciaSemanal = Object.values(ficha.dias).filter(
        (item): item is TreinoResumido => item !== null
    ).length;

    const navigate = useNavigate()

    
    return (
            <CardHorizontal className='hover:bg-base-terciaria/60 h-80 w-full overflow-hidden relative'>
                <div className="absolute inset-0 -z-90 bg-linear-to-b from-base-secundaria to-transparent"/>
                <div className="absolute inset-0 -z-100 opacity-40">
                    {ficha.imagem && (
                        <img src={ficha.imagem} alt="" className="size-full object-cover rounded-lg" />
                    )}
                </div>
                <div className="flex flex-col gap-5 text-base h-full py-4">

                    <div className="flex justify-between items-center gap-2 h-10">

                        <div className="flex flex-col min-w-0 gap-1 flex-1">
                            <Texto tipo='titulo' className='font-medium text-t-primaria'>
                                {ficha.nome}
                            </Texto>

                            <Texto tipo='titulo' className='font-medium text-t-primaria'>
                                {ficha.criador.nome}
                            </Texto>
                        </div>

                    </div>

                    <div className="flex gap-1">
                        {Object.entries(ficha.dias)
                            .sort(([a], [b]) => Number(a) - Number(b))
                            .map(([indice, dia]) => (
                                <div className="flex flex-col w-full">
                                    <div
                                        key={indice}
                                        title={dia?.nome ?? 'Descanso'}
                                        className={` h-1.5 w-full rounded-full ${dia ? 'bg-destaque-s-medio' : 'bg-base-terciaria/40'}`}
                                    />
                                    <Texto tipo="subtexto">
                                        {nomesDiasAbrev[indice]}
                                    </Texto>
                                </div>

                            ))}
                    </div>

                    <CardHorizontal>
                        <div className="flex flex-col divide-y divide-t-terciaria/50">
                            <div className="flex flex-col py-2  max-h-25 overflow-auto">
                                <Texto tipo="subtitulo"  className="text-destaque-p-medio">
                                    Divisões:
                                </Texto>
                                {ficha.divisoes.map(divisao => (
                                    <>
                                        <div className="flex gap-2 items-center ">
                                            <Texto >{divisao.nome}</Texto>

                                            <Texto tipo="subtexto" className="opacity-80">
                                                {divisao.treinos.map(treino => treino.nome)}
                                            </Texto>
                                        </div>
                                        
                                    </>
                                ))}
                            </div>
                            <div className="flex gap-1 py-2">
                                <Texto tipo="subtitulo" className="text-destaque-p-medio">
                                    frequencia:
                                </Texto>
                                <Texto>
                                    {String(frequenciaSemanal)} x semana
                                </Texto>
                            </div>
                        </div>
                    </CardHorizontal>

                    

                    <BotaoPrimario
                        texto="vizualizar ficha"
                        onClick={() => navigate(`/dashboard/treino/verFicha/${ficha.id}`)}
                    />

                </div>
            </CardHorizontal>
    )
}

export default FichaCard