import React from 'react'
import CardHorizontal from '../../CardHorizontal'
import InputSimples from '../../inputs/InputSimples'
import Texto from '../../organizacao/Texto'
import useExecutarTreinoContext from '../../../contextos/ExecutarTreinoContexto'
import BotaoPrimario from '../../botoes/BotaoPrimario'
import { Check, RotateCcw } from 'lucide-react-native'
import WrapperIcone from '../../organizacao/WrapperIcone'
import BotaoSecundario from '../../botoes/BotaoSecundario'
import { View } from 'react-native'

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
            <View className="flex flex-col gap-2">

                <label className='flex gap-1 items-center'>
                    <Texto tipo='subtitulo'>
                        Peso:
                    </Texto>

                    <InputSimples
                        className='w-full'
                        tipo='number'
                        placeholder='peso'
                        valor={
                            serieCompleta?.concluida 
                            ? serieCompleta?.Peso
                            : String(exercicioExecucao.peso)
                        }
                        abilitado={!serieCompleta?.concluida}
                        onChange={valor => exercicioExecucao.setPeso(Number(valor))}
                    />

                </label>

                <label className='flex gap-1 items-center'>
                    <Texto tipo='subtitulo'>
                        Reps:
                    </Texto>

                    <InputSimples
                        className='w-full'
                        tipo='number'
                        placeholder='repetições'
                        valor={
                            serieCompleta?.concluida 
                            ? serieCompleta?.Peso
                            : String(exercicioExecucao.reps)
                        }
                        abilitado={!serieCompleta?.concluida}
                        onChange={valor => exercicioExecucao.setReps(Number(valor))}
                    />

                </label>

                {éSerieAtual && (
                    <BotaoPrimario 
                        icone={Check}
                        onClick={exercicioExecucao.timer.reiniciar}
                    />
                )}


            </View>
                {serieCompleta?.concluida && (
                    <>
                        <View className="absolute top-1/2 left-1/2 -translate-1/2">
                            <WrapperIcone tamanho='xl'>
                                <Check className='size-full' />
                            </WrapperIcone>
                        </View>

                        <View className="absolute right-1 top-1">
                            <BotaoSecundario 
                                icone={RotateCcw}
                                onClick={() => exercicioExecucao.refazerSerie(serie)}
                            />
                        </View>
                    </>


                )}
        </CardHorizontal>
    )
}

export default InfoCarga
