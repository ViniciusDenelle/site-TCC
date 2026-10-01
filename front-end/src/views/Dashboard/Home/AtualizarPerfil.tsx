import React, { useState, useEffect } from 'react'
import { User, Scale, Target, Save, X, Loader2 } from 'lucide-react'

import CardHorizontal from '../../../componentes/CardHorizontal'
import Texto from '../../../componentes/organizacao/Texto'
import BotaoPrimario from '../../../componentes/botoes/BotaoPrimario'
import { ReqUsuarioProps } from '../../../logicas/cadastro/useCadastro'
import useUpdateUsuario from '../../../logicas/usuario/UpdateUsuario'
import InputRange from '../../../componentes/inputs/InputRange'
import RadioCustomizado from '../../../componentes/inputs/RadioCustomizado'
import InputSimples from '../../../componentes/inputs/InputSimples'
import useFetchUsuario from '../../../logicas/usuario/FetchUsuario'

interface FormEditarPerfilProps {
    dadosUsuario?: Partial<ReqUsuarioProps>
    onCancelar?: () => void
    onSucesso?: () => void
}

const montarEstadoInicial = (dados?: Partial<ReqUsuarioProps>): ReqUsuarioProps => ({
    nome: dados?.nome ?? '',
    email: dados?.email ?? '',
    senha: '',
    genero: dados?.genero ?? 'Masculino',
    peso: dados?.peso ?? 70,
    tipoPeso: dados?.tipoPeso ?? 'kilos',
    pesoIdeal: dados?.pesoIdeal ?? 70,
    pesoMinimo: dados?.pesoMinimo ?? null,
    pesoMaximo: dados?.pesoMaximo ?? null,
    altura: dados?.altura ?? 170,
    dataDeNascimento: dados?.dataDeNascimento ?? '',
    idade: dados?.idade ?? 25,
    nivelAtividade: dados?.nivelAtividade ?? 1.2,
    objetivo: dados?.objetivo ?? 'Emagrecimento',
    experiencia: dados?.experiencia ?? 'Iniciante',
    TMB: dados?.TMB ?? 1600,
    GET: dados?.GET ?? 2000,
    calDiaria: dados?.calDiaria ?? '1800',
    veloPerda: dados?.veloPerda ?? 0.5,
    tempo: {
        semanas: dados?.tempo?.semanas ?? 12,
        meses: dados?.tempo?.meses ?? 3,
        previsao: dados?.tempo?.previsao ?? new Date().toISOString().split('T')[0],
    },
})

const AtualizarPerfil = ({
    dadosUsuario: dadosUsuarioProp,
    onCancelar,
    onSucesso
}: FormEditarPerfilProps) => {
    const { dadosUsuario: dadosUsuarioFetch } = useFetchUsuario()
    const { atualizarUsuario, isPending } = useUpdateUsuario()

    const usuarioAtual = dadosUsuarioProp ?? dadosUsuarioFetch

    const [formData, setFormData] = useState<ReqUsuarioProps>(() =>
        montarEstadoInicial(usuarioAtual)
    )

    useEffect(() => {
        if (usuarioAtual) {
            setFormData(montarEstadoInicial(usuarioAtual))
        }
    }, [usuarioAtual])

    const handleChange = (field: keyof ReqUsuarioProps, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleTempoChange = (field: keyof ReqUsuarioProps['tempo'], value: any) => {
        setFormData((prev) => ({
            ...prev,
            tempo: { ...prev.tempo, [field]: value },
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        atualizarUsuario(formData, {
            onSuccess: () => {
                if (onSucesso) onSucesso()
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6">
            <CardHorizontal className="flex flex-col gap-6 p-6">

                {/* Cabeçalho */}
                <div className="flex items-center justify-between border-b border-base-terciaria pb-4">
                    <Texto tipo="titulo" className="text-t-primaria text-xl font-bold">
                        Editar Perfil
                    </Texto>
                    {onCancelar && (
                        <button
                            type="button"
                            onClick={onCancelar}
                            className="text-t-terciaria hover:text-t-primaria transition-colors"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* 1. Informações Pessoais */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <User size={18} className="text-t-secundaria" />
                        <Texto tipo="subtitulo" className="text-t-primaria text-sm font-semibold">
                            Informações Pessoais
                        </Texto>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Nome</Texto>
                            <InputSimples
                                tipo="text"
                                name="nome"
                                valor={formData.nome}
                                onChange={(e) => handleChange('nome', e.target.value)}
                                placeholder="Seu nome completo"
                                classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Texto tipo="subtitulo" className="text-xs text-t-secundaria">E-mail</Texto>
                            <InputSimples
                                tipo="email"
                                name="email"
                                valor={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder="seu@email.com"
                                classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Nova Senha</Texto>
                            <InputSimples
                                tipo="password"
                                name="senha"
                                valor={formData.senha}
                                onChange={(e) => handleChange('senha', e.target.value)}
                                placeholder="Deixe em branco para não alterar"
                                classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Data de Nascimento</Texto>
                            <InputSimples
                                tipo="date"
                                name="dataDeNascimento"
                                valor={formData.dataDeNascimento}
                                onChange={(e) => handleChange('dataDeNascimento', e.target.value)}
                                classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Altura (cm)</Texto>
                            <InputSimples
                                tipo="number"
                                name="altura"
                                valor={formData.altura}
                                minimo={50}
                                maximo={250}
                                onChange={(e) => handleChange('altura', Number(e.target.value))}
                                placeholder="170"
                                classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Texto tipo="subtitulo" className="text-xs text-t-secundaria mb-1">Gênero</Texto>
                            <div className="flex flex-wrap gap-2">
                                {['Masculino', 'Feminino', 'Outro'].map((gen) => (
                                    <RadioCustomizado
                                        key={gen}
                                        name="genero"
                                        valor={gen}
                                        checked={formData.genero === gen}
                                        onChange={(e) => handleChange('genero', e.target.value)}
                                        classeAdicional="px-3 h-10 w-auto"
                                    >
                                        <Texto tipo="paragrafo" className="text-xs text-t-primaria">{gen}</Texto>
                                    </RadioCustomizado>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Métricas Corporais */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Scale size={18} className="text-t-secundaria" />
                        <Texto tipo="subtitulo" className="text-t-primaria text-sm font-semibold">
                            Métricas Corporais
                        </Texto>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="flex flex-col gap-1">
                            <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Peso Atual</Texto>
                            <InputSimples
                                tipo="number"
                                name="peso"
                                valor={formData.peso}
                                minimo={20}
                                maximo={300}
                                onChange={(e) => handleChange('peso', Number(e.target.value))}
                                classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Peso Ideal</Texto>
                            <InputSimples
                                tipo="number"
                                name="pesoIdeal"
                                valor={formData.pesoIdeal}
                                minimo={20}
                                maximo={300}
                                onChange={(e) => handleChange('pesoIdeal', Number(e.target.value))}
                                classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Texto tipo="subtitulo" className="text-xs text-t-secundaria mb-1">Unidade de Medida</Texto>
                            <div className="flex gap-2">
                                {(['kilos', 'libras'] as const).map((tipo) => (
                                    <RadioCustomizado
                                        key={tipo}
                                        name="tipoPeso"
                                        valor={tipo}
                                        checked={formData.tipoPeso === tipo}
                                        onChange={(e) => handleChange('tipoPeso', e.target.value)}
                                        classeAdicional="px-4 h-10 w-full"
                                    >
                                        <Texto tipo="paragrafo" className="text-xs text-t-primaria capitalize">{tipo}</Texto>
                                    </RadioCustomizado>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Objetivo e Treino */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Target size={18} className="text-t-secundaria" />
                        <Texto tipo="subtitulo" className="text-t-primaria text-sm font-semibold">
                            Objetivo e Atividade
                        </Texto>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Objetivo</Texto>
                            <InputSimples
                                tipo="text"
                                name="objetivo"
                                valor={formData.objetivo}
                                onChange={(e) => handleChange('objetivo', e.target.value)}
                                placeholder="Ex: Emagrecimento, Hipertrofia"
                                classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Previsão de Término</Texto>
                            <InputSimples
                                tipo="date"
                                name="previsao"
                                valor={formData.tempo.previsao}
                                onChange={(e) => handleTempoChange('previsao', e.target.value)}
                                classeAdicional="w-full px-3 py-2 text-t-primaria text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-1 md:col-span-2">
                            <Texto tipo="subtitulo" className="text-xs text-t-secundaria mb-1">Nível de Experiência</Texto>
                            <div className="flex flex-wrap gap-2">
                                {['Iniciante', 'Intermediário', 'Avançado'].map((exp) => (
                                    <RadioCustomizado
                                        key={exp}
                                        name="experiencia"
                                        valor={exp}
                                        checked={formData.experiencia === exp}
                                        onChange={(e) => handleChange('experiencia', e.target.value)}
                                        classeAdicional="px-4 h-10 w-auto"
                                    >
                                        <Texto tipo="paragrafo" className="text-xs text-t-primaria">{exp}</Texto>
                                    </RadioCustomizado>
                                ))}
                            </div>
                        </div>

                        {/* Sliders (InputRange) */}
                        <div className="flex flex-col gap-2 pt-2">
                            <div className="flex justify-between items-center">
                                <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Nível de Atividade</Texto>
                                <span className="text-xs text-t-primaria font-bold">{formData.nivelAtividade}x</span>
                            </div>
                            <div className="h-6 flex items-center">
                                <InputRange
                                    valor={Number(formData.nivelAtividade)}
                                    onChange={(val) => handleChange('nivelAtividade', val)}
                                    min={1.2}
                                    max={2.0}
                                    step={0.05}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 pt-2">
                            <div className="flex justify-between items-center">
                                <Texto tipo="subtitulo" className="text-xs text-t-secundaria">Velocidade de Perda</Texto>
                                <span className="text-xs text-t-primaria font-bold">{formData.veloPerda} kg/sem</span>
                            </div>
                            <div className="h-6 flex items-center">
                                <InputRange
                                    valor={Number(formData.veloPerda)}
                                    onChange={(val) => handleChange('veloPerda', val)}
                                    min={0.1}
                                    max={1.5}
                                    step={0.1}
                                />
                            </div>
                        </div>
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
                        texto={isPending ? 'Salvando...' : 'Salvar Alterações'}
                    />
                </div>

            </CardHorizontal>
        </form>
    )
}

export default AtualizarPerfil