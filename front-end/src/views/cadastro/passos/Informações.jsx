import {useContext, useEffect} from 'react'
import BotaoSimples from "../../../componentes/BotaoSimples"
import InputSimples from "../../../componentes/InputSimples"
import RadioCustomizado from "../../../componentes/radioCustomizado"
import { motion } from 'motion/react'
import SliderCustomizado from '../../../componentes/SliderCustomizado'
import CadastroContext from '../../../contextos/CadastroContexto'

const Informações = () => {
    const {
        dados,
        mudarDados
    } = useContext(CadastroContext)

    const {
        peso,
        tipoPeso,
        genero,
        altura,
        dataNascimento
    } = dados

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

    return (
        <>
            <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0,}}
            transition={{duration: 0.4, ease: "easeOut"}}
            className="grid grid-cols-1 grid-rows-4 
            grid-flow-col w-full mx-auto h-full gap-y-2"
            >
                    {/* genero */}
                    <div className="flex flex-col gap-1">

                        <h2 className="text-t-principal">
                            escolha seu genero:
                        </h2>

                        <div className="flex gap-3">
                            <RadioCustomizado 
                            name="genero" 
                            valor="feminino" 
                            dataBinding={ev => mudarDados('genero', ev.target.value)}
                            checked={genero === 'feminino'}>
                                feminino
                            </RadioCustomizado>
                            <RadioCustomizado 
                            name="genero" 
                            valor="masculino" 
                            dataBinding={ev => mudarDados('genero', ev.target.value)}
                            checked={genero === 'masculino'}>
                                masculino
                            </RadioCustomizado>
                        </div>

                    </div>

                    {/* idade */}
                    <div className="flex flex-col gap-1">

                        <h2 className="text-t-principal">
                            escolha sua data de nascimento:
                        </h2>
                        
                        <InputSimples
                        type="date"
                        classeAdcional="h-10"
                        value={dataNascimento}
                        dataBinding={ev => mudarDados('dataDeNascimento', ev.target.value)}
                        />
                        
                    </div>

                    {/* peso */}
                    <div className="flex flex-col gap-1">

                        <h2>
                            seu peso em {tipoPeso}:
                        </h2>

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
                                dataBinding={ev => mudarDados('peso', parseInt(ev.target.value))}
                                maximo={500}
                                minimo={20}/>


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

                    {/* altura */}
                    <div className="flex flex-col gap-1">

                        <h2>
                            sua altura em centimetros:
                        </h2>

                        <div className="flex w-full gap-2">
                                
                                {/* slider altura */}
                                <div className="relative w-2/3 h-full">
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
                                {/* input altura */}
                                <div className="flex gap-1 items-center w-1/3">
                                    <InputSimples 
                                    classeAdcional="w-full"
                                    type="number"
                                    value={altura}
                                    dataBinding={ev => mudarDados('altura', parseInt(ev.target.value))}
                                    />

                                    <span>
                                        cm
                                    </span>
                                </div>
                            
                        </div>
                    </div>
            </motion.div>
        </>
    )
}

export default Informações