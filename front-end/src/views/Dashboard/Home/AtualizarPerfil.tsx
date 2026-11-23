import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'motion/react'
import {
    Activity, Eye, EyeOff, Flame, Loader2, Save, Scale, Target, User, X, Zap
} from 'lucide-react'

import CardHorizontal from '../../../componentes/CardHorizontal'
import Texto from '../../../componentes/organizacao/Texto'
import WrapperIcone from '../../../componentes/organizacao/WrapperIcone'
import BotaoPrimario from '../../../componentes/botoes/BotaoPrimario'
import InputSimples from '../../../componentes/inputs/InputSimples'
import InputImagem from '../../../componentes/inputs/InputImagem'

// mesmos passos do cadastro, sem alteração
import Informacoes from '../../cadastro/passos/Informacoes'
import NivelAtividade from '../../cadastro/passos/NivelAtividade'
import Objetivo from '../../cadastro/passos/Objetivo'
import Metas from '../../cadastro/passos/Metas'
import MetasManterPeso from '../../cadastro/passos/MetasManterPeso'

// o contexto precisa ser exportado com nome (veja as notas)
import type { UseCadastroReturn } from '../../../logicas/cadastro/useCadastro'
import useMetas from '../../../logicas/cadastro/useMetas'
import useAtualizarPerfil from '../../../logicas/usuario/useAtualizarPerfil'
import useFetchUsuario, { RetornoUsuario } from '../../../logicas/usuario/FetchUsuario'
import { CadastroContext, CadastroProvider } from '../../../contextos/CadastroContexto'
import ContaPerfil from '../../../componentes/dashboard/ContaPerfil'

type Props = {
    onCancelar?: () => void
    onSucesso?: () => void
}

const PASSOS = [
    { rotulo: 'Conta', icone: User },
    { rotulo: 'Informações', icone: Scale },
    { rotulo: 'Atividade', icone: Activity },
    { rotulo: 'Objetivo', icone: Target },
    { rotulo: 'Metas', icone: Flame },
]

// campo com erro vindo do back -> aba onde o usuário corrige
const campoParaPasso: Record<string, number> = {
    nome: 0, email: 0, senha: 0, foto: 0,
    genero: 1, peso: 1, altura: 1, dataDeNascimento: 1, tipoPeso: 1,
    nivelAtividade: 2,
    objetivo: 3, experiencia: 3,
    pesoIdeal: 4, pesoMinimo: 4, pesoMaximo: 4, veloPerda: 4,
}

const FormPerfil = ({ usuario, onCancelar, onSucesso }: Props & { usuario: RetornoUsuario }) => {
    const perfil = useAtualizarPerfil(usuario)
    const { dados, mudarDados, errosCampo, idade, TMB, GET, trocarFoto } = perfil

    const [passo, setPasso] = useState(0)
    const [senhaVisivel, setSenhaVisivel] = useState(false)

    // Mantém calorias e tempo estimado sempre atualizados, mesmo sem abrir a aba "Metas".
    // Também alimenta o resumo em tempo real no topo.
    const { calorias, tempoEstimado } = useMetas(dados, mudarDados, GET)

    // erro do back -> abre a aba do primeiro campo com problema
    useEffect(() => {
        if (!perfil.atualizarMutation.isError) return
        const primeiro = Object.keys(errosCampo)[0]
        if (primeiro && campoParaPasso[primeiro] !== undefined) setPasso(campoParaPasso[primeiro])
    }, [perfil.atualizarMutation.isError, errosCampo])

    const salvar = (e: FormEvent) => {
        e.preventDefault()
        // e-mail/senha alterados sem código: não envia (o back também recusaria)
        if (perfil.precisaCodigo && !perfil.dados.codigoConfirmacao) return
        perfil.atualizarMutation.mutate(undefined, { onSuccess: () => onSucesso?.() })
    }

    const erro = (campo: keyof typeof dados) =>
        errosCampo[campo] ? (
            <span className="text-red-500 text-sm">{errosCampo[campo]?.[0]}</span>
        ) : null

    const conta = <ContaPerfil perfil={perfil} fotoAtual={(usuario as any).foto ?? null} />

    const conteudo = [
        conta,
        <Informacoes />,
        <NivelAtividade />,
        <Objetivo />,
        dados.objetivo === 'manter_peso' ? <MetasManterPeso /> : <Metas />,
    ][passo]

    return (
        // Os passos do cadastro leem tudo daqui. Só usam dados, mudarDados, GET e errosCampo.
        <CadastroContext.Provider
            value={{ dados, mudarDados, errosCampo, idade, TMB, GET } as unknown as UseCadastroReturn}
        >
            <form onSubmit={salvar} className="flex flex-col gap-4 w-full px-6 pt-12 pb-40 mx-auto">

                <div className="flex items-center justify-between">
                    <Texto tipo="titulo" className="text-t-primaria text-xl font-bold">
                        Editar Perfil
                    </Texto>
                    {onCancelar && (
                        <button type="button" onClick={onCancelar} aria-label="Fechar">
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Resumo em tempo real */}
                <CardHorizontal>
                    <div className="flex items-center gap-2">
                        <WrapperIcone tamanho="md">
                            <Zap className="size-full" />
                        </WrapperIcone>

                        <div className="flex flex-col">
                            <Texto className="text-t-primaria">Seus números</Texto>
                            <Texto tipo="subtexto">
                                {idade} anos · TMB {TMB} kcal · GET {GET} kcal
                            </Texto>
                            <Texto tipo="subtexto">
                                {calorias.calorias} kcal/dia
                                {dados.objetivo !== 'manter_peso' && tempoEstimado.previsao
                                    ? ` · meta até ${tempoEstimado.previsao}`
                                    : ''}
                            </Texto>
                        </div>
                    </div>
                </CardHorizontal>

                {/* Abas centralizadas para os últimos itens */}
                <div className="flex flex-wrap justify-center gap-1 md:gap-4">
                    {PASSOS.map(({ rotulo, icone }, i) => (
                        <BotaoPrimario
                            key={rotulo}
                            tipo={i === passo ? 'cheio' : 'vazio'}
                            icone={icone}
                            texto={rotulo}
                            tipoFonte="subtexto"
                            classeAdicional="flex-col h-14 ring-transparent w-[30%] md:w-auto"
                            onClick={() => setPasso(i)}
                        />
                    ))}
                </div>

                {/* min-h e pt: o passo "Informações" usa grid de altura cheia e título absoluto */}
                <div key={passo} className="relative min-h-[28rem] pt-8">
                    {conteudo}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-base-terciaria">
                    {onCancelar && (
                        <BotaoPrimario tipo="vazio" texto="Cancelar" onClick={onCancelar} />
                    )}

                    <BotaoPrimario
                        tipo="cheio"
                        type="submit"
                        disabled={perfil.atualizarMutation.isPending || (perfil.precisaCodigo && !perfil.dados.codigoConfirmacao)}
                        icone={perfil.atualizarMutation.isPending ? Loader2 : Save}
                        texto={perfil.atualizarMutation.isPending ? 'Salvando...' : 'Salvar alterações'}
                    />
                </div>
            </form>
        </CadastroContext.Provider>
    )
}

// espera o usuário carregar antes de montar o formulário (evita estado inicial vazio)
const AtualizarPerfil = (props: Props) => {
    const { dadosUsuario } = useFetchUsuario()

    if (!dadosUsuario) return <Loader2 className="animate-spin mx-auto" />

    return (
        <FormPerfil
            key={JSON.stringify(dadosUsuario)}
            usuario={dadosUsuario as RetornoUsuario}
            {...props}
        />
    )
}

export default AtualizarPerfil