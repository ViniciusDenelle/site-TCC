import RadioCustomizado from "../../../componentes/radioCustomizado"

const Informações = ({functions}) => {
    const {mudarGenero} = functions
    return (
        <>
            <div className="flex gap w-full sm:w-2/3 mx-auto h-full">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-t-principal">
                            escolha seu genero:
                        </h1>
                        <div className="flex gap-1">
                            <RadioCustomizado 
                            name="genero" 
                            valor="feminino" 
                            dataBinding={mudarGenero}>
                                feminino
                            </RadioCustomizado>
                            <RadioCustomizado 
                            name="genero" 
                            valor="masculino" 
                            dataBinding={mudarGenero}>
                                masculino
                            </RadioCustomizado>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-t-principal">
                            escolha sua data de nascimento:
                        </h1>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Informações