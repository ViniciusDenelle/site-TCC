import React from 'react'
import CardHorizontal from '../../CardHorizontal'
import InputSimples from '../../inputs/InputSimples'
import Texto from '../../organizacao/Texto'
import useExecutarTreinoContext from '../../../contextos/ExecutarTreinoContexto'
import BotaoPrimario from '../../botoes/BotaoPrimario'
import { Check, CircleChevronLeft, Redo, RotateCcw } from 'lucide-react'
import WrapperIcone from '../../organizacao/WrapperIcone'
import BotaoSecundario from '../../botoes/BotaoSecundario'

const InfoCarga = ({
    éSerieAtual,
    serie,
    serieCompleta
}) => {

    const {
        exercicioData,
        exercicioExecucao
    } = useExecutarTreinoContext()

    

    return (
        <CardHorizontal className={`transition-all duration-400
            ${éSerieAtual && ` scale-105`}
            ${serieCompleta?.concluida && `opacity-80 scale-95`}
        `}>


            <Texto tipo='subtitulo' className='text-t-primaria'>
                Serie {serie} {éSerieAtual && '(atual)'} {serieCompleta?.concluida && '(concluida)'}:
            </Texto>
            <div className="flex flex-col gap-2">

                <label className='flex gap-1 items-center'>
                    <Texto tipo='subtitulo'>
                        Peso:
                    </Texto>

                    <InputSimples
                        classeAdicional='w-full'
                        tipo='number'
                        placeholder='peso'
                        valor={
                            serieCompleta?.concluida 
                            ? serieCompleta?.Peso
                            : String(exercicioExecucao.peso)
                        }
                        disabled={serieCompleta?.concluida}
                        onChange={ev => exercicioExecucao.setPeso(Number(ev.target.value))}
                    />

                </label>

                <label className='flex gap-1 items-center'>
                    <Texto tipo='subtitulo'>
                        Reps:
                    </Texto>

                    <InputSimples
                        classeAdicional='w-full'
                        tipo='number'
                        placeholder='repetições'
                        valor={
                            serieCompleta?.concluida 
                            ? serieCompleta?.Peso
                            : String(exercicioExecucao.reps)
                        }
                        disabled={serieCompleta?.concluida}
                        onChange={ev => exercicioExecucao.setReps(Number(ev.target.value))}
                    />

                </label>

                {éSerieAtual && (
                    <>
                        <BotaoPrimario 
                            icone={Check}
                            onClick={exercicioExecucao.timer.reiniciar}
                        />
                        {/* <div className="absolute inset-0 bg-linear-to-b 
                        from-destaque-s-claro/30 to-transparent rounded-xl -z-10"/> */}
                    
                    </>
                )}


            </div>
                {serieCompleta?.concluida && (
                    <>
                        <div className="absolute top-1/2 left-1/2 -translate-1/2">
                            <WrapperIcone tamanho='xl'>
                                <Check className='size-full' />
                            </WrapperIcone>
                        </div>

                        <div className="absolute right-1 top-1">
                            <BotaoSecundario 
                                icone={RotateCcw}
                                onClick={() => exercicioExecucao.refazerSerie(serie)}
                            />
                        </div>
                    </>


                )}
        </CardHorizontal>
    )
}

export default InfoCarga
