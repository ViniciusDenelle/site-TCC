import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { CalendarClock, Flame } from 'lucide-react'
import InputSimples from '../../../componentes/InputSimples'
import SliderCustomizado from '../../../componentes/SliderCustomizado'
import RadioCustomizado from '../../../componentes/radioCustomizado'

const Metas = ({
    info,
    mudarDados,
}) => {

    const {
        genero,
        peso,
        altura,
        idade,
        TMB,
        GET,
        calDiaria,
        mesesEstimados,
        semanasEstimadas,
        veloPerda,
        pesoFinal,
        objetivo,
        previsaoMeta
    } = info

    const [diferencaKcal, setDiferencaKcal] = useState(0)

    useEffect(() => {
        if(!veloPerda) return
        let calD

        const diferencaKcal = (7000 / 7 * veloPerda)

        if(objetivo === 'perder_peso'){
            calD = GET - diferencaKcal 
        } else if(objetivo === 'ganhar_peso'){
            calD = diferencaKcal +  GET
        } else  {
            calD = GET
        }
        
        setDiferencaKcal(diferencaKcal)
        mudarDados('calDiaria', calD)

    }, [veloPerda])

    useEffect(() => {
        if(!pesoFinal || !veloPerda) return

        let difPeso = objetivo === 'perder_peso'
        ? peso - pesoFinal
        : pesoFinal - peso

        let semanasTotais = difPeso / veloPerda

        let meses = Math.floor(semanasTotais / 4)
        let semanasRestantes = Math.round(semanasTotais % 4)

        const hoje = new Date()
        const dias = Math.round(semanasTotais * 7)

        const dataFinal = new Date(hoje)
        dataFinal.setDate(hoje.getDate() + dias)

        mudarDados('previsaoMeta', dataFinal.toLocaleDateString("pt-BR"))
        mudarDados('mesesEstimados', meses)
        mudarDados('semanasEstimadas', semanasRestantes)

    }, [pesoFinal, veloPerda])

    const minPeso = objetivo === 'perder_peso' 
    ? Math.round( peso - (peso * 0.5))
    : peso
    const maxPeso = objetivo === 'perder_peso' 
    ? peso 
    : peso + (peso * 0.7)

    const minRecPeso = objetivo === 'perder_peso' 
    ? Math.round(18.5 * ((altura * altura) / 10000)) 
    : peso

    const maxRecPeso = objetivo === 'perder_peso' 
    ? peso 
    : Math.round(28.9 * ((altura * altura) / 10000))

    const velocidadePerda = [
        {
            nome: 'lento',
            valor: objetivo === 'perder_peso' ? 0.005 : 0.0025,
            cor: 'bg-emerald-400'
        },
        {
            nome: 'moderado',
            valor:objetivo === 'perder_peso' ?0.00675 :0.0035,
            cor: 'bg-indigo-500'
        },
        {
            nome: 'rápido',
            valor:objetivo === 'perder_peso' ?0.0085 :0.0045,
            cor: 'bg-amber-400'
        },
        {
            nome: 'intenso',
            valor:objetivo === 'perder_peso' ?0.01 :0.0050,
            cor: 'bg-rose-500'
        },
    ]

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
                                {mesesEstimados} meses e
                            </span>
                            
                            <span>
                                {semanasEstimadas} semanas
                            </span>
                            
                        </p>
                        <span>
                            previsão: {previsaoMeta}
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
                            {calDiaria} kcal
                        </p>
                        {objetivo !== 'manter_peso' ? (
                            <span className='flex gap-1'>
                                <p>
                                    {objetivo === 'perder_peso' ? 'defict' : 'superavit'}
                                </p>
                                de {diferencaKcal} kcal
                            </span>
                        ) : ''}
                    </div>

                </div>

            </div>

            <div className="flex flex-col gap-4 w-full mb-5">

                <div className="flex justify-between items-center w-full">
                    <h2 className='relative text-lg text-t-secundaria'>
                        meta de peso:
                        {pesoFinal < maxRecPeso && pesoFinal > minRecPeso 
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
                        min={minPeso}
                        max={maxPeso}
                        mudarValor={value => mudarDados('pesoFinal', value)}
                        recomendadoMin={minRecPeso}
                        recomendadoMax={maxRecPeso}
                        classeAdcionalThumb={
                            pesoFinal < maxRecPeso 
                            && pesoFinal > minRecPeso 
                            ? `bg-emerald-500 hover:bg-emerald-600` : ``
                        }
                        classeAdcionalRange={
                            pesoFinal < maxRecPeso 
                            && pesoFinal > minRecPeso 
                            ? `bg-emerald-700/50` : ``}
                    />

                    <div className="absolute -bottom-8 left-0 
                    flex justify-between w-full">
                        <span> {minPeso}  </span>

                        <span> {
                            Math.round((maxPeso + minPeso) /2)
                            }  </span>

                        <span> {maxPeso}  </span>
                        
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
                        radio.valor = (peso * radio.valor ).toFixed(1)

                        return(
                            <RadioCustomizado
                                name="velocidadePerda"
                                valor={radio.valor}
                                dataBinding={ev => mudarDados('veloPerda', ev.target.value)}
                                classeAdcional="w-full flex-col items-start h-15 px-2"
                                semBolinha={true}
                                checked={veloPerda === radio.valor}
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

            {/* <div className="flex flex-col p-2 rounded-lg ring-2 
        ring-base-quaternaria bg-base-terciaria divide-y
        divide-base-quaternaria">

                <div className="flex justify-between pb-2">
                    <h3>peso atual: {peso}</h3>
                    <h3>calorias diarias atuais: {GET}</h3>
                </div>
                <div className="flex justify-between pt-2">
                    <h3>peso final: {pesoFinal}</h3>
                    <h3>calorias diarias finais: {calDiaria}</h3>
                </div>

            </div> */}

        </motion.div>
    )
}

export default Metas