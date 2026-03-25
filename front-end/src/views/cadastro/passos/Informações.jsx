import {useEffect} from 'react'
import BotaoSimples from "../../../componentes/BotaoSimples"
import InputSimples from "../../../componentes/InputSimples"
import RadioCustomizado from "../../../componentes/radioCustomizado"
import { motion } from 'motion/react'

const Informações = ({mudarDados, info}) => {
    const {
        peso, 
        tipoPeso,
        altura,
        tipoAltura,
        dataDeNascimento
    } = info

    function alterarPeso(peso)
    {
        if(tipoPeso !== 'kilos'){
            mudarDados('peso', parseInt(peso / 2.2))
        } else {
            mudarDados('peso', parseInt(peso / 0.45))
        }
    }

    useEffect(() => {
        if (altura == '') return

        if(tipoAltura === 'cm'){
            let [pes, polegadas] = String(altura).split(".")
            let alturaFinal = `${Math.round((pes * 30.48) + (polegadas * 2.54))}`
            mudarDados('altura', alturaFinal)
        } else {
            mudarDados('altura', Math.round(10 * (altura * 0.0328084)) / 10)
        }
    }, [tipoAltura])

    return (
        <>
            <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0,}}
            transition={{duration: 0.4, ease: "easeOut"}}
            className="grid grid-cols-1 grid-rows-4 
             grid-flow-col w-full mx-auto h-full gap-y-2">

                    <div className="flex flex-col gap-1">
                        <h1 className="text-t-principal">
                            escolha seu genero:
                        </h1>
                        <div className="flex gap-3">
                            <RadioCustomizado 
                            name="genero" 
                            valor="feminino" 
                            dataBinding={ev => mudarDados('genero', ev.target.value)}>
                                feminino
                            </RadioCustomizado>
                            <RadioCustomizado 
                            name="genero" 
                            valor="masculino" 
                            dataBinding={ev => mudarDados('genero', ev.target.value)}>
                                masculino
                            </RadioCustomizado>
                        </div>
                    </div>
                    
                    

                    <div className="flex flex-col gap-1">
                        <h1 className="text-t-principal">
                            escolha sua data de nascimento:
                        </h1>
                        
                        <InputSimples
                        type="date"
                        classeAdcional="h-10"
                        dataBinding={ev => mudarDados('dataDeNascimento', ev.target.value)}
                        />
                        
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">
                            seu peso
                        </label>
                        <div className="flex w-full">
                            <InputSimples
                            type="number"
                            name="peso"
                            placeholder={`seu peso ${tipoPeso}`}
                            dataBinding={ev => mudarDados('peso', ev.target.value)}
                            value={peso}
                            maximo={tipoPeso === 'kilos' ? '500' : '1000'}
                            classeAdcional="w-full rounded-r-none border-r-0"
                            />

                            <BotaoSimples
                            classeAdcional="rounded-l-none w-1/5"
                            tipo="cheio"
                            onClick={() => {
                                mudarDados('tipoPeso', tipoPeso === 'kilos' ? 'libras' : 'kilos')
                                alterarPeso(peso)
                            }}>
                                {tipoPeso}    
                            </BotaoSimples>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">
                            sua altura
                        </label>
                        <div className="flex w-full">
                            <InputSimples
                            type="text"
                            name="altura"
                            placeholder={`sua altura ${tipoAltura}`}
                            dataBinding={ev => mudarDados('altura', ev.target.value)}
                            value={altura}
                            classeAdcional="w-full rounded-r-none border-r-0"/>

                            <BotaoSimples
                            classeAdcional="rounded-l-none w-1/5"
                            tipo="cheio"
                            onClick={ev => mudarDados(
                                'tipoAltura', tipoAltura === 'cm' ? 'pês' : 'cm'
                                )}>
                                {tipoAltura}    
                            </BotaoSimples>
                            
                        </div>
                    </div>
            </motion.div>
        </>
    )
}

export default Informações