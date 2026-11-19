import React, { useState } from 'react'
import { Scale, Save, Loader2 } from 'lucide-react'
import CardHorizontal from '../../../componentes/CardHorizontal'
import Texto from '../../../componentes/organizacao/Texto'
import BotaoPrimario from '../../../componentes/botoes/BotaoPrimario'
import InputSimples from '../../../componentes/inputs/InputSimples'
import useFetchUsuario from '../../../logicas/usuario/FetchUsuario'
// Importe aqui o hook/função real de envio de medidas, se houver:
// import { useRegistrarMedidas } from '../../../logicas/dashboard/treinos/treino/Fetchprogresso'

interface AtualizarMedidasProps {
    onSucesso?: () => void
    onCancelar?: () => void
}

export default function AtualizarMedidas({ onSucesso, onCancelar }: AtualizarMedidasProps) {
    const { dadosUsuario } = useFetchUsuario()
    const [isPending, setIsPending] = useState(false)

    // Estados para os campos de medidas corporais
    const [peso, setPeso] = useState(dadosUsuario?.peso ?? '')
    const [cintura, setCintura] = useState('')
    const [braco, setBraco] = useState('')
    const [peito, setPeito] = useState('')
    const [quadril, setQuadril] = useState('')
    const [dataMedicao, setDataMedicao] = useState(new Date().toISOString().split('T')[0])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsPending(true)

        // Aqui você substitui pela chamada da sua mutação/API real (ex: registrarMedidas(...))
        setTimeout(() => {
            setIsPending(false)
            if (onSucesso) onSucesso()
        }, 1000)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6">
            <CardHorizontal className="flex flex-col gap-6 p-6">

                {/* Cabeçalho */}
                <div className="flex items-center justify-between border-b border-base-terciaria pb-4">
                    <div className="flex items-center gap-2">
                        <Scale size={22} className="text-blue-400" />
                        <Texto tipo="titulo" className="text-t-primaria text-xl font-bold">
                            Atualizar Medidas Corporais
                        </Texto>
                    </div>
                </div>

                {/* Data da Medição */}
                <div className="flex flex-col gap-1 max-w-xs">
                    <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Data da Medição</Texto>
                    <InputSimples
                        tipo="date"
                        name="dataMedicao"
                        valor={dataMedicao}
                        onChange={(e) => setDataMedicao(e.target.value)}
                        classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                    />
                </div>

                {/* Grid de Medidas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    
                    <div className="flex flex-col gap-1">
                        <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Peso Atual ({dadosUsuario?.tipoPeso ?? 'kg'})</Texto>
                        <InputSimples
                            tipo="number"
                            name="peso"
                            valor={peso}
                            onChange={(e) => setPeso(e.target.value)}
                            placeholder="Ex: 75.5"
                            classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Cintura (cm)</Texto>
                        <InputSimples
                            tipo="number"
                            name="cintura"
                            valor={cintura}
                            onChange={(e) => setCintura(e.target.value)}
                            placeholder="Ex: 80"
                            classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Braço (cm)</Texto>
                        <InputSimples
                            tipo="number"
                            name="braco"
                            valor={braco}
                            onChange={(e) => setBraco(e.target.value)}
                            placeholder="Ex: 35"
                            classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Peito / Tórax (cm)</Texto>
                        <InputSimples
                            tipo="number"
                            name="peito"
                            valor={peito}
                            onChange={(e) => setPeito(e.target.value)}
                            placeholder="Ex: 100"
                            classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Quadril (cm)</Texto>
                        <InputSimples
                            tipo="number"
                            name="quadril"
                            valor={quadril}
                            onChange={(e) => setQuadril(e.target.value)}
                            placeholder="Ex: 95"
                            classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                        />
                    </div>

                </div>

                {/* Botões de Ação */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-base-terciaria">
                    {onCancelar && (
                        <BotaoPrimario
                            tipo="vazio"
                            onClick={onCancelar}
                            texto="Cancelar"
                        />
                    )}

                    <BotaoPrimario
                        tipo="cheio"
                        icone={isPending ? Loader2 : Save}
                        texto={isPending ? 'Salvando...' : 'Salvar Medidas'}
                    />
                </div>

            </CardHorizontal>
        </form>
    )
}