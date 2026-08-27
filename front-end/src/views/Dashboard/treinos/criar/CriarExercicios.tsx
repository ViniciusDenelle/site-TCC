import { Image, ImagePlus } from "lucide-react"
import CardHorizontal from "../../../../componentes/CardHorizontal"
import WrapperIcone from "../../../../componentes/organizacao/WrapperIcone"
import Texto from "../../../../componentes/organizacao/Texto"
import InputSimples from "../../../../componentes/inputs/InputSimples"
import InputTextarea from "../../../../componentes/inputs/InputTextarea"

const CriarExercicios = () => {

    return (
        <div className="h-screen w-full">
            <div className="container mx-auto h-full">
                <div className="flex flex-col gap-2 h-full divide-y-2 divide-base-terciaria">
                    
                    <Texto tipo="titulo" className="font-thin">
                        Adcione imagem
                    </Texto>
                    <CardHorizontal>
                        <div className="flex items-center justify-center h-20">
                            <WrapperIcone>
                                <ImagePlus className="size-full"/>
                            </WrapperIcone>
                        </div>
                    </CardHorizontal>

                    <Texto tipo="titulo" className="font-thin">
                        nome do exercicio
                    </Texto>

                    <InputSimples 
                        placeholder="nome do exercicio"
                        
                    />

                    <Texto tipo="titulo" className="font-thin">
                        Descrição
                    </Texto>

                    <InputTextarea 
                        classeAdicional="h-20"
                        placeholder="descrição é opcional"
                    />
                </div>
            </div>
        </div>
    )
}

export default CriarExercicios