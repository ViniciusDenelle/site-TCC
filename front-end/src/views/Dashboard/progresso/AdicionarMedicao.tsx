import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Scale, Ruler, Dumbbell, Save, Loader2, CheckCircle2 } from 'lucide-react'

import CardHorizontal from '../../../componentes/CardHorizontal'
import Texto from '../../../componentes/organizacao/Texto'
import BotaoPrimario from '../../../componentes/botoes/BotaoPrimario'
import InputSimples from '../../../componentes/inputs/InputSimples'

import useFetchUsuario from '../../../logicas/usuario/FetchUsuario'
import { useRegistrarPeso } from '../../../logicas/dashboard/treinos/treino/Fetchprogresso'
import {
    useRegistrarMedidas,
    MEDIDAS_CONFIG,
    TIPOS_MEDIDA,
    TipoMedida,
} from '../../../logicas/Progresso/Medidas'

const valoresIniciais = (): Record<TipoMedida, string> => ({
    cintura: '',
    peito: '',
    braco: '',
    coxa: '',
    quadril: '',
    gordura: '',
})

const AdicionarMedicao = () => {
    const { dadosUsuario } = useFetchUsuario()
    const unidadePeso = dadosUsuario?.tipoPeso === 'libras' ? 'lb' : 'kg'

    /* ---------- PESO ---------- */
    const [pesoInput, setPesoInput] = useState('')
    const [dataPeso, setDataPeso] = useState('')
    const [pesoRegistrado, setPesoRegistrado] = useState(false)

    const {
        registrarPeso,
        isPending: registrandoPeso,
        isError: erroPeso,
    } = useRegistrarPeso()

    const salvarPeso = () => {
        const valor = Number(pesoInput.replace(',', '.'))

        if (!valor || valor <= 0 || registrandoPeso) return

        setPesoRegistrado(false)

        registrarPeso(
            { peso: valor, data: dataPeso || undefined },
            {
                onSuccess: () => {
                    setPesoInput('')
                    setDataPeso('')
                    setPesoRegistrado(true)
                },
            }
        )
    }

    /* ---------- MEDIDAS ---------- */
    const [valores, setValores] = useState<Record<TipoMedida, string>>(valoresIniciais)
    const [dataMedidas, setDataMedidas] = useState('')
    const [medidasRegistradas, setMedidasRegistradas] = useState(false)

    const {
        registrarMedidas,
        isPending: registrandoMedidas,
        isError: erroMedidas,
    } = useRegistrarMedidas()

    const alterarMedida = (tipo: TipoMedida, valor: string) => {
        setValores((prev) => ({ ...prev, [tipo]: valor }))
    }

    const salvarMedidas = () => {
        const preenchidas = TIPOS_MEDIDA
            .map((tipo) => ({ tipo, valor: Number(valores[tipo].replace(',', '.')) }))
            .filter((medida) => medida.valor > 0)

        if (preenchidas.length === 0 || registrandoMedidas) return

        setMedidasRegistradas(false)

        registrarMedidas(
            { data: dataMedidas || undefined, medidas: preenchidas },
            {
                onSuccess: () => {
                    setValores(valoresIniciais())
                    setDataMedidas('')
                    setMedidasRegistradas(true)
                },
            }
        )
    }

    return (
        <div className="w-full min-h-screen bg-base-primaria p-4 sm:p-6 md:p-8 text-white font-poppins space-y-6 pt-6">

            {/* Cabeçalho */}
            <div className="flex flex-col gap-4 pt-12 md:pt-10">
                <Texto tipo="subtitulo" className="text-t-primaria text-lg md:text-xl font-medium max-w-2xl">
                    Preencha só o que você quer registrar e toque em salvar.
                </Texto>
            </div>

            {/* 1. PESO */}
            <CardHorizontal className="flex flex-col gap-5 p-6">

                <div className="flex items-center gap-2 border-b border-base-terciaria pb-4">
                    <Scale size={18} className="text-t-secundaria" />
                    <Texto tipo="subtitulo" className="text-t-primaria text-sm font-semibold">
                        Peso
                    </Texto>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <Texto tipo="subtitulo" className="text-xs text-t-secundaria">
                            Peso ({unidadePeso})
                        </Texto>
                        <InputSimples
                            tipo="number"
                            name="peso"
                            valor={pesoInput}
                            minimo={1}
                            onChange={(e) => setPesoInput(e.target.value)}
                            placeholder="ex: 82.5"
                            classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Texto tipo="subtitulo" className="text-xs text-t-secundaria">
                            Data (opcional, padrão: hoje)
                        </Texto>
                        <InputSimples
                            tipo="date"
                            name="dataPeso"
                            valor={dataPeso}
                            onChange={(e) => setDataPeso(e.target.value)}
                            classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-base-terciaria">
                    {pesoRegistrado && (
                        <div className="flex items-center gap-1 text-emerald-400">
                            <CheckCircle2 size={16} />
                            <Texto tipo="subtexto">Peso registrado!</Texto>
                        </div>
                    )}

                    {erroPeso && (
                        <Texto tipo="subtexto" className="text-red-400">
                            Não foi possível registrar o peso.
                        </Texto>
                    )}

                    <BotaoPrimario
                        tipo="cheio"
                        icone={registrandoPeso ? Loader2 : Save}
                        texto={registrandoPeso ? 'Salvando...' : 'Registrar peso'}
                        onClick={salvarPeso}
                    />
                </div>

            </CardHorizontal>

            {/* 2. MEDIDAS CORPORAIS */}
            <CardHorizontal className="flex flex-col gap-5 p-6">

                <div className="flex items-center gap-2 border-b border-base-terciaria pb-4">
                    <Ruler size={18} className="text-t-secundaria" />
                    <Texto tipo="subtitulo" className="text-t-primaria text-sm font-semibold">
                        Medidas corporais
                    </Texto>
                </div>

                <div className="flex flex-col gap-1 md:max-w-xs">
                    <Texto tipo="subtitulo" className="text-xs text-t-secundaria">
                        Data (opcional, padrão: hoje)
                    </Texto>
                    <InputSimples
                        tipo="date"
                        name="dataMedidas"
                        valor={dataMedidas}
                        onChange={(e) => setDataMedidas(e.target.value)}
                        classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {TIPOS_MEDIDA.map((tipo) => (
                        <div key={tipo} className="flex flex-col gap-1">
                            <Texto tipo="subtitulo" className="text-xs text-t-secundaria">
                                {MEDIDAS_CONFIG[tipo].nome} ({MEDIDAS_CONFIG[tipo].unidade})
                            </Texto>
                            <InputSimples
                                tipo="number"
                                name={tipo}
                                valor={valores[tipo]}
                                minimo={0}
                                onChange={(e) => alterarMedida(tipo, e.target.value)}
                                placeholder={MEDIDAS_CONFIG[tipo].placeholder}
                                classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                            />
                        </div>
                    ))}
                </div>

                <Texto tipo="subtexto" className="text-t-terciaria">
                    Preencha só o que você mediu. Os campos vazios são ignorados.
                </Texto>

                <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-base-terciaria">
                    {medidasRegistradas && (
                        <div className="flex items-center gap-1 text-emerald-400">
                            <CheckCircle2 size={16} />
                            <Texto tipo="subtexto">Medidas registradas!</Texto>
                        </div>
                    )}

                    {erroMedidas && (
                        <Texto tipo="subtexto" className="text-red-400">
                            Não foi possível registrar as medidas.
                        </Texto>
                    )}

                    <BotaoPrimario
                        tipo="cheio"
                        icone={registrandoMedidas ? Loader2 : Save}
                        texto={registrandoMedidas ? 'Salvando...' : 'Registrar medidas'}
                        onClick={salvarMedidas}
                    />
                </div>

            </CardHorizontal>

            {/* 3. O QUE É AUTOMÁTICO */}
            <CardHorizontal className="flex items-start gap-4 p-6">
                <div className="p-3.5 rounded-xl bg-base-terciaria text-blue-400 shrink-0">
                    <Dumbbell size={24} />
                </div>

                <div className="flex flex-col gap-1">
                    <Texto tipo="subtitulo" className="text-t-primaria text-sm font-semibold">
                        Cargas, frequência e repetições
                    </Texto>
                    <Texto tipo="subtexto" className="text-t-terciaria">
                        Esses gráficos são preenchidos sozinhos, a partir dos treinos que você executa.
                        Não precisam ser digitados aqui.
                    </Texto>
                    <NavLink to="/dashboard/treino" className="w-fit mt-1">
                        <Texto tipo="subtexto" className="text-destaque-p-medio font-bold hover:underline">
                            Ir para treinos
                        </Texto>
                    </NavLink>
                </div>
            </CardHorizontal>

        </div>
    )
}

export default AdicionarMedicao