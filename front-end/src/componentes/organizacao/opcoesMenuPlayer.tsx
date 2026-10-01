import { LucideIcon } from "lucide-react"
import { NavLink } from "react-router-dom"
import Texto from "./Texto"
import WrapperIcone from "./WrapperIcone"
import BotaoTerciario from "../botoes/BotaoTerciario"

type OpcoesProps = {
    tipo?: 'link' | 'botao'
    to?: string
    icone?: LucideIcon
    corIcone?: string
    nome: string
    onclick?: () => void
}

const OpcoesMenuPlayer = ({
    tipo = 'botao',
    to = '',
    icone: Icone,
    corIcone = '',
    nome,
    onclick
} : OpcoesProps) => {

    return (
        <>
            {tipo === 'link' ? (
                <NavLink to={to}>
                    <div className="flex gap-4 items-center">
                        <WrapperIcone tamanho="lg">
                            <Icone className={`size-full ${corIcone}`} />
                        </WrapperIcone>

                        <Texto tipo="titulo" className="text-t-secundaria font-thin">
                            {nome}
                        </Texto>
                    </div>
                </NavLink>
            ) : (
                <BotaoTerciario 
                    onClick={onclick}
                    icone={Icone}
                    texto={nome}
                    classeAdicional="flex items-center gap-4"
                    tamanhoIcone="lg" 
                    tipoFonte="titulo"
                    textoClassName="text-t-secundaria font-thin"
                    iconeClassName={corIcone}
                />
            )}
        </>
    )
}

export default OpcoesMenuPlayer