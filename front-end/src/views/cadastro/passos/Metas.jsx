import { useContext, useEffect, useMemo, useState } from 'react'
import { motion, number } from 'motion/react'
import { CalendarClock, Flame } from 'lucide-react'
import InputSimples from '../../../componentes/InputSimples'
import SliderCustomizado from '../../../componentes/SliderCustomizado'
import RadioCustomizado from '../../../componentes/radioCustomizado'
import CadastroContext from '../../../contextos/CadastroContexto'
import useMetas from '../../../logicas/cadastro/useMetas'

const Metas = () => {

    const {
        dados,
        mudarDados,
    } = useContext(CadastroContext)

    const {
        calorias,
        tempoEstimado,
        minMaxPeso
    } = useMetas(dados, mudarDados)

    const {
        peso,
        veloPerda,
        pesoFinal,
        objetivo,
    } = dados

    const velocidadePerda = [
        {
            nome: 'lento',
            base: objetivo === 'perder_peso' ? 0.005 : 0.0025,
            cor: 'bg-emerald-400'
        },
        {
            nome: 'moderado',
            base: objetivo === 'perder_peso' ? 0.00675 : 0.0035,
            cor: 'bg-indigo-500'
        },
        {
            nome: 'rápido',
            base: objetivo === 'perder_peso' ? 0.0085 : 0.0045,
            cor: 'bg-amber-400'
        },
        {
            nome: 'intenso',
            base: objetivo === 'perder_peso' ? 0.01 : 0.0050,
            cor: 'bg-rose-500'
        },

    ].map(velo => (
        {...velo, valor: parseFloat((peso * velo.base ).toFixed(2))}
    ))

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col w-full gap-2"
        >

            <h2 className="mx-auto text-lg text-t-primaria font-semibold">
                defina suas metas
            </h2>

            <div className="flex gap-2 w-full">

                <div className="flex items-center gap-1 p-2 h-25 rounded lg 
            bg-base-terciaria w-full
            ring-2 ring-base-terciaria">

                    <CalendarClock />

                    <div className="flex flex-col justify-baseline text-sm">
                        <h2 className='text-t-secundaria'>
                            tempo estimado
                        </h2>
                        <p className='flex flex-col text-base h-12'>

                            <span>
                                {tempoEstimado.meses} meses e
                            </span>

                            <span>
                                {tempoEstimado.semanas} semanas
                            </span>

                        </p>
                        <span>
                            previsão: {tempoEstimado.previsao}
                        </span>
                    </div>

                </div>

                <div className="flex items-center gap-1 px-2 h-25 rounded lg 
            bg-base-terciaria w-full
            ring-2 ring-base-terciaria">

                    <Flame />

                    <div className="flex flex-col text-sm">
                        <h2 className='text-t-secundaria'>
                            calorias diarias
                        </h2>
                        <p className='text-base'>
                            {calorias.calorias} kcal
                        </p>
                        {objetivo !== 'manter_peso' ? (
                            <span className='flex gap-1'>
                                <p>
                                    {objetivo === 'perder_peso' ? 'defict' : 'superavit'}
                                </p>
                                de {calorias.diff} kcal
                            </span>
                        ) : ''}
                    </div>

                </div>

            </div>

            <div className="flex flex-col gap-4 w-full mb-5">

                <div className="relative flex justify-between items-center w-full">
                    <h2 className='text-lg text-t-secundaria'>
                        meta de peso:
                        {pesoFinal < minMaxPeso.maxRec && pesoFinal > minMaxPeso.minRec
                            ? (
                                <span className="absolute -bottom-4 left-0 text-sm text-emerald-500">
                                    recomendado
                                </span>
                            ) : (
                                <span className="absolute -bottom-4 left-0 text-sm text-red-500">
                                    não recomendado
                                </span>
                            )}
                    </h2>

                    <InputSimples
                        classeAdcional="w-20"
                        type='number'
                        name="pesoFinal"
                        value={pesoFinal}
                        dataBinding={ev => mudarDados('pesoFInal', ev.target.value)}
                    />
                </div>

                <div className="relative w-full">

                    <SliderCustomizado
                        valor={pesoFinal}
                        min={minMaxPeso.min}
                        max={minMaxPeso.max}
                        mudarValor={value => mudarDados('pesoFinal', value)}
                        recomendadoMin={minMaxPeso.minRec}
                        recomendadoMax={minMaxPeso.maxRec}
                        classeAdcionalThumb={
                            pesoFinal < minMaxPeso.maxRec
                                && pesoFinal > minMaxPeso.minRec
                                ? `bg-emerald-500 hover:bg-emerald-600` : ``
                        }
                        classeAdcionalRange={
                            pesoFinal < minMaxPeso.maxRec
                                && pesoFinal > minMaxPeso.minRec
                                ? `bg-emerald-700/50` : ``}
                    />

                    <div className="absolute -bottom-8 left-0 
                    flex justify-between w-full">
                        <span> {minMaxPeso.min}  </span>

                        <span> {
                            Math.round((minMaxPeso.max + minMaxPeso.min) / 2)
                        }  </span>

                        <span> {minMaxPeso.max}  </span>

                    </div>
                </div>

            </div>

            <div className="flex flex-col gap-4">

                <h2 className="text-lg text-t-secundaria">
                    velocidade de {objetivo === 'perder_peso' ? 'perda' : 'ganho'}
                </h2>

                <div className="grid grid-rows-2 grid-cols-2 
            gap-2 w-full">

                    {velocidadePerda.map(radio => {
                        
                        return (
                            <RadioCustomizado
                                name="velocidadePerda"
                                valor={radio.valor}
                                dataBinding={ev => mudarDados('veloPerda', ev.target.value)}
                                classeAdcional="w-full flex-col items-start h-15 px-2"
                                semBolinha={true}
                                checked={(veloPerda == radio.valor)}
                            >
                                <h3 className='flex items-center gap-1'>
                                    <span
                                        className={`block size-3 rounded-full ${radio.cor}`}
                                    />
                                    {radio.valor}kg/sem
                                </h3>

                                <p className='text-sm'>
                                    {radio.nome}
                                </p>

                            </RadioCustomizado>

                        )
                    })}

                </div>
            </div>

        </motion.div>
    )
}

export default Metas