import CardHorizontal from '../../CardHorizontal'
import InputSimples from '../../inputs/InputSimples'
import Texto from '../../organizacao/Texto'
import useExecutarTreinoContext from '../../../contextos/ExecutarTreinoContexto'
import BotaoPrimario from '../../botoes/BotaoPrimario'
import { Check, Play, RotateCcw } from 'lucide-react'
import WrapperIcone from '../../organizacao/WrapperIcone'
import BotaoSecundario from '../../botoes/BotaoSecundario'

type Props = {
    éSerieAtual: boolean;
    serie: number;
    serieCompleta?: { concluida: boolean; peso: number; repeticoes: number | null; duracaoSegundos: number | null };
}

const InfoCarga = ({
    éSerieAtual,
    serie,
    serieCompleta
}: Props) => {

    const {
        exercicioExecucao
    } = useExecutarTreinoContext()

    const isometrico = exercicioExecucao.isometrico

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
                    <Texto tipo='subtitulo'>Peso:</Texto>
                    <InputSimples
                        classeAdicional='w-full'
                        tipo='number'
                        placeholder='peso'
                        valor={
                            serieCompleta?.concluida
                                ? String(serieCompleta.peso)
                                : String(exercicioExecucao.peso)
                        }
                        disabled={serieCompleta?.concluida}
                        onChange={ev => exercicioExecucao.setPeso(Number(ev.target.value))}
                    />
                </label>

                {isometrico ? (
                    <div className='flex gap-1 items-center'>
                        <Texto tipo='subtitulo'>Duração:</Texto>
                        <Texto>
                            {serieCompleta?.concluida
                                ? `${serieCompleta.duracaoSegundos}s`
                                : `alvo: ${exercicioExecucao.duracaoAlvo}s`}
                        </Texto>
                    </div>
                ) : (
                    <label className='flex gap-1 items-center'>
                        <Texto tipo='subtitulo'>Reps:</Texto>
                        <InputSimples
                            classeAdicional='w-full'
                            tipo='number'
                            placeholder='repetições'
                            valor={
                                serieCompleta?.concluida
                                    ? String(serieCompleta.repeticoes ?? '')
                                    : String(exercicioExecucao.reps)
                            }
                            disabled={serieCompleta?.concluida}
                            onChange={ev => exercicioExecucao.setReps(Number(ev.target.value))}
                        />
                    </label>
                )}

                {éSerieAtual && (
                    isometrico ? (
                        <BotaoPrimario
                            icone={Play}
                            onClick={exercicioExecucao.iniciarExecucaoTempo}
                        />
                    ) : (
                        <BotaoPrimario
                            icone={Check}
                            onClick={exercicioExecucao.executarSerie}
                        />
                    )
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