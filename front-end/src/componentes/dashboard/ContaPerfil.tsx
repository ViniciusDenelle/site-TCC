import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Eye, EyeOff, Lock, ShieldCheck, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import useAtualizarPerfil from '../../logicas/usuario/useAtualizarPerfil'
import Texto from '../organizacao/Texto'
import InputImagem from '../inputs/InputImagem'
import InputSimples from '../inputs/InputSimples'
import BotaoPrimario from '../botoes/BotaoPrimario'

type Perfil = ReturnType<typeof useAtualizarPerfil>

type Props = {
    perfil: Perfil
    fotoAtual: string | null
}

const emailValido = (email: string) => /\S+@\S+\.\S+/.test(email)

const caixa = 'flex flex-col gap-3 p-3 rounded-xl bg-base-terciaria/40 border border-base-quaternaria'

const Cabecalho = ({ icone: Icone, titulo, selo }: {
    icone: LucideIcon
    titulo: string
    selo: string
}) => (
    <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
            <Icone size={18} />
            <Texto tipo="subtitulo" className="text-t-primaria">{titulo}</Texto>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-base-secundaria text-t-secundaria">
            {selo}
        </span>
    </div>
)

const ContaPerfil = ({ perfil, fotoAtual }: Props) => {
    const {
        dados,
        mudarDados,
        errosCampo,
        trocarFoto,
        atualizarMutation,
        emailMudou,
        senhaMudou,
        precisaCodigo,
        emailOriginal,
        emailDestino,
        contagem,
        enviarCodigoMutation,
    } = perfil

    const [editandoEmail, setEditandoEmail] = useState(false)
    const [editandoSenha, setEditandoSenha] = useState(false)
    const [senhaVisivel, setSenhaVisivel] = useState(false)

    // depois de salvar, e-mail e senha voltam a ficar travados
    useEffect(() => {
        if (!atualizarMutation.isSuccess) return
        setEditandoEmail(false)
        setEditandoSenha(false)
    }, [atualizarMutation.isSuccess])

    const erro = (campo: keyof typeof dados) =>
        errosCampo[campo] ? (
            <span className="text-red-500 text-sm">{errosCampo[campo]?.[0]}</span>
        ) : null

    const cancelarEmail = () => {
        mudarDados('email', emailOriginal)
        mudarDados('codigoConfirmacao', '')
        setEditandoEmail(false)
    }

    const cancelarSenha = () => {
        mudarDados('senha', '')
        mudarDados('codigoConfirmacao', '')
        setEditandoSenha(false)
    }

    const botaoLink = 'text-sm underline cursor-pointer text-destaque-p-escuro hover:text-destaque-p-medio transition-colors'

    const podeEnviar =
        precisaCodigo &&
        contagem === 0 &&
        !enviarCodigoMutation.isPending &&
        (!emailMudou || emailValido(dados.email))

    const dicaCodigo = !editandoEmail && !editandoSenha
        ? 'clique em "alterar" no e-mail ou na senha para liberar esta etapa'
        : !precisaCodigo
        ? 'digite o novo e-mail ou a nova senha para liberar o envio do código'
        : `o código será enviado para ${emailDestino}`

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-4 w-full"
        >
            <Texto tipo="subtitulo" className="text-t-primaria mx-auto">
                Sua conta
            </Texto>

            {/* ===== Perfil: salvo direto, sem código ===== */}
            <section className={caixa}>
                <Cabecalho icone={User} titulo="Perfil" selo="salva direto" />

                <InputImagem
                    redondo
                    valor={dados.foto ?? null}
                    urlAtual={fotoAtual}
                    onChange={trocarFoto}
                    erro={errosCampo.foto?.[0]}
                    disabled={atualizarMutation.isPending}
                />

                <div className="flex flex-col gap-1">
                    <label>nome:</label>
                    <InputSimples
                        valor={dados.nome}
                        placeholder="seu nome"
                        maximo={50}
                        minimo={2}
                        onChange={(ev) => mudarDados('nome', ev.target.value)}
                    />
                    {erro('nome')}
                </div>
            </section>

            {/* ===== Segurança: e-mail e senha exigem código ===== */}
            <section className={caixa}>
                <Cabecalho icone={Lock} titulo="Segurança" selo="exige código por e-mail" />

                <Texto tipo="subtexto">
                    Para trocar o e-mail ou a senha, enviamos um código de confirmação.
                    O restante do perfil não precisa de código.
                </Texto>

                {/* E-mail */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label>e-mail:</label>
                        {editandoEmail ? (
                            <button type="button" onClick={cancelarEmail} className={botaoLink}>
                                cancelar
                            </button>
                        ) : (
                            <button type="button" onClick={() => setEditandoEmail(true)} className={botaoLink}>
                                alterar
                            </button>
                        )}
                    </div>

                    <InputSimples
                        tipo="email"
                        valor={dados.email}
                        placeholder="seu@email.com"
                        maximo={40}
                        minimo={7}
                        disabled={!editandoEmail}
                        onChange={(ev) => mudarDados('email', ev.target.value)}
                    />

                    {editandoEmail && (
                        <Texto tipo="subtexto">
                            o código vai para o seu e-mail atual ({emailOriginal})
                        </Texto>
                    )}
                    {erro('email')}
                </div>

                {/* Senha */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label>senha:</label>
                        {editandoSenha ? (
                            <button type="button" onClick={cancelarSenha} className={botaoLink}>
                                cancelar
                            </button>
                        ) : (
                            <button type="button" onClick={() => setEditandoSenha(true)} className={botaoLink}>
                                alterar
                            </button>
                        )}
                    </div>

                    <div className="relative">
                        <InputSimples
                            tipo={senhaVisivel ? 'text' : 'password'}
                            valor={dados.senha}
                            placeholder={editandoSenha ? 'digite a nova senha' : '••••••••'}
                            maximo={30}
                            disabled={!editandoSenha}
                            onChange={(ev) => mudarDados('senha', ev.target.value)}
                            classeAdicional="w-full"
                        />
                        {editandoSenha && (
                            <button
                                type="button"
                                onClick={() => setSenhaVisivel(prev => !prev)}
                                className="absolute right-3 top-2 z-10 cursor-pointer"
                            >
                                {senhaVisivel ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        )}
                    </div>

                    {editandoSenha && (
                        <Texto tipo="subtexto">
                            o código vai para o seu e-mail atual ({emailOriginal})
                        </Texto>
                    )}
                    {erro('senha')}
                </div>

                {/* Confirmação: sempre visível, liberada só quando há algo para confirmar */}
                <div
                    className={`flex flex-col gap-2 p-3 rounded-lg border border-dashed border-base-quaternaria transition-opacity
                        ${precisaCodigo ? '' : 'opacity-60'}`}
                >
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={16} />
                        <label>código de confirmação:</label>
                    </div>

                    <Texto tipo="subtexto">{dicaCodigo}</Texto>

                    <InputSimples
                        tipo="number"
                        valor={dados.codigoConfirmacao}
                        placeholder="digite o código recebido"
                        disabled={!precisaCodigo}
                        onChange={(ev) => mudarDados('codigoConfirmacao', ev.target.value)}
                    />
                    {erro('codigoConfirmacao')}

                    {/* type="button": dentro do <form>, sem isso o clique salvaria o perfil */}
                    <BotaoPrimario
                        tipo="cheio"
                        type="button"
                        disabled={!podeEnviar}
                        onClick={() => enviarCodigoMutation.mutate()}
                        texto={
                            enviarCodigoMutation.isPending
                                ? 'enviando...'
                                : contagem > 0
                                ? `reenviar em ${contagem}`
                                : 'enviar código'
                        }
                    />
                </div>
            </section>
        </motion.div>
    )
}

export default ContaPerfil