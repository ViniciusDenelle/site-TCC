import { ArrowRight, X } from "lucide-react"
import CardHorizontal from "../CardHorizontal"
import LinkSimples from "../links/LinkSimples"
import BotaoSecundario from "../botoes/BotaoSecundario"
import CardPaleta from "../CardPaleta"

const DashbaordPaletaModal = ({
    setPaletaAberta,
    alterarTema,
    tema
}) => {

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-2000"
                onClick={() => setPaletaAberta(false)}
            />

            <div className="fixed top-1/2 left-1/2 -translate-1/2
                        z-2010">
                <CardHorizontal>
                    <div className="flex flex-col gap-2 text-slate-200 text-lg">
                        <div className="ml-auto">
                            <X
                                className="cursor-pointer"
                                onClick={() => setPaletaAberta(false)}
                            />
                        </div>
                        <LinkSimples to="/paletas" classeAdicional="flex">
                            escolha mais paletas <ArrowRight />
                        </LinkSimples>

                        <CardHorizontal>
                            <div className="flex items-center justify-between">
                                <BotaoSecundario
                                    onClick={() => alterarTema('light')}
                                    tipo={tema === 'light' ? 'cheio' : 'vazio'}
                                    disabled={tema === 'light'}
                                    redondo
                                    texto="claro"
                                />
                                <BotaoSecundario
                                    onClick={() => alterarTema('dark')}
                                    tipo={tema === 'dark' ? 'cheio' : 'vazio'}
                                    disabled={tema === 'dark'}
                                    redondo
                                    texto="escuro"
                                />
                            </div>
                        </CardHorizontal>

                        <CardPaleta
                            corBase='base-primaria'
                            corComplementar='destaque-s-escuro'
                            corPrimaria='destaque-p-escuro'
                        />
                    </div>
                </CardHorizontal>
            </div>
        </>

    )
}

export default DashbaordPaletaModal