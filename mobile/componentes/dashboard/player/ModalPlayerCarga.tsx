import React from 'react'
import CardHorizontal from '../../CardHorizontal'
import Texto from '../../organizacao/Texto'
import useExecutarTreinoContext from '../../../contextos/ExecutarTreinoContexto'
import InfoCarga from './InfoCarga'
import WrapperIcone from '../../organizacao/WrapperIcone'
import { Timer } from 'lucide-react-native'
import { View } from 'react-native'

const ModalPlayerCarga = () => {

    const {
        exercicioData,
        exercicioExecucao
    } = useExecutarTreinoContext()
    const seriesArray = Array.from(
        { length: exercicioData.sets },
        (_, index) => index + 1
    );

    return (
        <CardHorizontal>
            <View className="flex flex-col gap-2">

                {exercicioExecucao.timer.ativo && (
                    <View className="absolute inset-0 bg-black/50 
                    flex justify-center items-center z-100">
                        <WrapperIcone tamanho='xl'>
                            <Timer className='animate-pulse size-full'/>
                        </WrapperIcone>
                    </View>
                )}

                <Texto tipo='titulo' className='text-t-secundaria'>
                    Carga:
                </Texto>

                <View className="flex flex-col gap-2 items-center justify-center">
                    {seriesArray.map(serie => (
                        <InfoCarga
                            key={serie}
                            serie={serie}
                            serieCompleta={exercicioExecucao.series?.find(
                                serieE => serieE.serie === serie  
                            )}
                            éSerieAtual={serie === exercicioExecucao.serieAtual}
                            
                        />
                    ))}
                </View>

            </View>
        </CardHorizontal>
    )
}

export default ModalPlayerCarga
