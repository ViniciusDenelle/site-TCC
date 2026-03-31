import {useEffect} from 'react'
import BotaoSimples from "../../../componentes/BotaoSimples"
import InputSimples from "../../../componentes/InputSimples"
import RadioCustomizado from "../../../componentes/radioCustomizado"
import { motion } from 'motion/react'
import SliderCustomizado from '../../../componentes/SliderCustomizado'

const Informações = ({mudarDados, info}) => {
    const {
        peso, 
        tipoPeso,
        altura,
        tipoAltura,
        dataDeNascimento
    } = info

    const minPeso = tipoPeso === 'kilos' ? 20 : 40
    const maxPeso = tipoPeso === 'kilos' ? 400 : 800

    function alterarPeso(peso)
    {
        if(tipoPeso !== 'kilos'){
            mudarDados('peso', Math.round(peso / 2.20462))
        } else {
            mudarDados('peso', Math.round(peso / 0.453591830542594))
        }
    }

    // useEffect(() => {
    //     if (altura == '') return

    //     if(tipoAltura === 'cm'){
    //         let [pes, polegadas] = String(altura).split(".")
    //         let alturaFinal = `${Math.round((pes * 30.48) + (polegadas * 2.54))}`
    //         mudarDados('altura', alturaFinal)
    //     } else {
    //         mudarDados('altura', Math.round(10 * (altura * 0.0328084)) / 10)
    //     }
    // }, [tipoAltura])

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
                            seu peso em {tipoPeso}
                        </label>
                        <div className="flex w-full gap-2">

                            {/* slider peso */}
                            <div className="relative w-2/3 h-full">
                                <SliderCustomizado
                                mudarValor={value => mudarDados('peso', value)}
                                valor={peso}
                                min={minPeso}
                                max={maxPeso}
                                />

                                <div className="absolute -bottom-3 let-0 
                                flex justify-between w-full">
                                    <span> {minPeso}  </span>
                                    <span> {maxPeso / 2}  </span>
                                    <span> {maxPeso}  </span>
                                </div>
                            </div>

                            {/* input peso e btn mudar tipo peso */}
                            <div className="flex gap-1 w-1/3">
                            
                                <InputSimples 
                                classeAdcional="w-full"
                                type="number"
                                value={peso}
                                dataBinding={ev => mudarDados('peso', ev.target.value)}
                                />


                                <BotaoSimples
                                classeAdcional="w-full"
                                tipo="cheio"
                                onClick={() => {
                                    mudarDados('tipoPeso', tipoPeso === 'kilos' ? 'libras' : 'kilos')
                                    alterarPeso(peso)
                                }}>
                                    {tipoPeso}    
                                </BotaoSimples>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">
                            sua altura
                        </label>
                        <div className="flex w-full gap-2">
                            {tipoAltura === 'cm' ? (
                                <div className="relative w-3/4 h-full">
                                    <SliderCustomizado
                                    mudarValor={value => mudarDados('altura', value)}
                                    valor={altura}
                                    min={80}
                                    max={250}
                                    />

                                    <div className="absolute -bottom-3 let-0 
                                    flex justify-between w-full">
                                        <span> 80  </span>
                                        <span> 160  </span>
                                        <span> 250 </span>
                                    </div>
                                </div>
                            ) : (
                                <InputSimples
                                classeAdcional="w-full"
                                placeholder="pes"
                                value={altura}
                                dataBinding={ev => mudarDados('altura', ev.target.value)}
                                />
                            )}
                            
                            <div className={`flex gap-1 ${tipoAltura === 'cm' ? `w-1/3` : `w-1/4`}`}>

                                {tipoAltura === 'cm' ? (
                                    <InputSimples 
                                    classeAdcional="w-full"
                                    type="number"
                                    value={altura}
                                    dataBinding={ev => mudarDados('altura', ev.target.value)}
                                />
                                ) : ''}
                                

                                <BotaoSimples
                                classeAdcional="w-full"
                                tipo="cheio"
                                onClick={ev => mudarDados(
                                    'tipoAltura', tipoAltura === 'cm' ? 'pês' : 'cm'
                                    )}>
                                    {tipoAltura}    
                                </BotaoSimples>
                                
                            </div>
                            
                        </div>
                    </div>
            </motion.div>
        </>
    )
}

export default Informações