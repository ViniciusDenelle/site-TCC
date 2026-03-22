import BotaoSimples from "../../../componentes/BotaoSimples"
import InputSimples from "../../../componentes/InputSimples"
import RadioCustomizado from "../../../componentes/radioCustomizado"

const Informações = ({mudarDados, info}) => {
    const {
        peso, 
        tipoPeso,
        altura,
        tipoAltura
    } = info

    return (
        <>
            <div className="grid grid-cols-1 grid-rows-4 
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
                            onClick={ev => mudarDados(
                                'tipoPeso', tipoPeso === 'kilos' ? 'libras' : 'kilos'
                            )}>
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
            </div>
        </>
    )
}

export default Informações