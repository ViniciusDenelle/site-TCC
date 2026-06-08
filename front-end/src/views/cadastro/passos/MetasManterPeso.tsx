import { useContext, useEffect, useMemo } from 'react'
import { motion } from 'motion/react'
import { CalendarClock, Flame } from 'lucide-react'
import type { ChangeEvent } from 'react'

import InputSimples from '../../../componentes/InputSimples'
import SliderCustomizado from '../../../componentes/InputRange'
import RadioCustomizado from '../../../componentes/RadioCustomizado'

import CadastroContext from '../../../contextos/CadastroContexto'
import useMetas from '../../../logicas/cadastro/useMetas'
import type { UseCadastroReturn } from '../../../logicas/cadastro/useCadastro'
import useCadastroContexto from '../../../contextos/CadastroContexto'
import InputRangeMinMax from '../../../componentes/InputRangeMinMax'
import InputRange from '../../../componentes/InputRange'

const MetasManterPeso = () => {
    const {
        dados,
        mudarDados,
        GET,
        errosCampo
    } = useCadastroContexto()

    const {
        minMaxPeso
    } = useMetas(dados, mudarDados, GET)

    const {
        peso,
        pesoIdeal,
        pesoMaximo,
        pesoMinimo
    } = dados

    const varianciaPeso = useMemo(() => {
        if (!pesoIdeal || !peso) return
        const min = Number((pesoIdeal * 0.98).toFixed(1))
        const max = Number(( pesoIdeal * 1.02).toFixed(1))

        return {
            minPeso: min,
            maxPeso: max
        }
    }, [pesoIdeal, peso])

    useEffect(() => {
        if (!varianciaPeso) return

        mudarDados('pesoMinimo', varianciaPeso.minPeso)
        mudarDados('pesoMaximo', varianciaPeso.maxPeso)
    }, [varianciaPeso])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col w-full gap-4"
        >
            <h2 className="mx-auto text-lg text-t-primaria font-semibold">
                defina suas metas
            </h2>


            {/* Meta de Peso */}
            <div className="flex flex-col gap-4 w-full mb-5">
                <div className="relative flex justify-between items-center w-full">
                    <h2 className="text-lg text-t-secundaria">
                        peso ideal:
                    </h2>

                    <InputSimples
                        valor={pesoIdeal}
                        tipo='number'
                        onChange={ev => mudarDados('pesoIdeal', Number(ev.target.value))}
                        classeAdicional='w-12'
                    />

                </div>

                <div className="relative w-full">
                    <InputRange
                        valor={pesoIdeal}
                        onChange={valor => mudarDados('pesoIdeal', valor)}
                        min={peso - 3}
                        max={peso + 3}
                    />

                    <div className="absolute -bottom-8 left-0 flex justify-between w-full">
                        <span>{peso - 3}kg</span>
                        <span>{peso}kg</span>
                        <span>{peso + 3}kg</span>
                    </div>
                </div>
            </div>

            <h2 className="text-lg text-t-secundaria">
                variancia de peso:
            </h2>
            
            <div className="flex sm:flex-row gap-2 w-full">
                
                <div className="flex items-center gap-1 p-2 h-20 sm:h-25 
                rounded-lg bg-base-terciaria w-full ring-2 ring-base-terciaria">
                    
                    <h2 className="text-t-secundaria">
                        peso minimo:
                    </h2>
                    <div className="flex gap-1 items-center">
                        <h1 className='text-lg text-t-primaria font-bold'>
                            {varianciaPeso.minPeso}
                        </h1>
                        <span>
                            kg
                        </span>
                    </div>
                    
                </div>

                
                <div className="flex items-center gap-1 px-2 h-20 sm:h-25 
                rounded-lg bg-base-terciaria w-full ring-2 ring-base-terciaria">
                    
                    <h2 className="text-t-secundaria">
                        peso maximo:
                    </h2>
                    <div className="flex gap-1 items-center">
                        <h1 className='text-lg text-t-primaria font-bold'>
                            {varianciaPeso.maxPeso}
                        </h1>
                        <span>
                            kg
                        </span>
                    </div>
                </div>
            </div>

        </motion.div>
    )
}

export default MetasManterPeso