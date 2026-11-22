import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../../api.js'
import { paraFormData } from '../paraFormData.js'

/* ================= TYPES ================= */

type Passo = 1 | 2 | 3 | 4 | 5 | 6

export type ReqUsuarioProps = {
    nome: string
    email: string
    senha: string
    genero: string
    peso: number
    tipoPeso: 'kilos' | 'libras'
    pesoIdeal: number
    pesoMinimo?: number | null
    pesoMaximo?: number | null
    altura: number
    dataDeNascimento: string
    idade: number | string
    nivelAtividade: number
    objetivo: string
    experiencia: string
    TMB: number | string
    GET: number | string
    calDiaria: string
    tempo: {
        semanas: number
        meses: number
        previsao: string
    }
    veloPerda: number
    foto?: File | null
}

export type DadosCadastro = ReqUsuarioProps & {
    codigoConfirmacao: string
    passo?: number
}

export type ErrosCampoCadastro = Partial<Record<keyof DadosCadastro, string[]>>

type ErroApi = {
    errors?: Partial<Record<keyof DadosCadastro, string[]>>
}

type CadastroInfo = DadosCadastro & {
    idade: number
    TMB: number
    GET: number
}

export type UseCadastroReturn = {
    passo: Passo
    setPasso: React.Dispatch<React.SetStateAction<number>>
    erro: boolean
    setErro: React.Dispatch<React.SetStateAction<boolean>>
    errosCampo: ErrosCampoCadastro
    podeProximo: boolean
    idade: number
    TMB: number
    GET: number
    dados: DadosCadastro
    mudarDados: <K extends keyof DadosCadastro>(
        campo: K,
        valor: DadosCadastro[K]
    ) => void
    cadastrarMutation: UseMutationResult<
        any,
        AxiosError<ErroApi>,
        CadastroInfo
    >
    cadastroHandler: () => void
    emailMutation: UseMutationResult<any, AxiosError, {
        email?: string
        tipo?: string
    }>
}

/* ================= CONSTANTES ================= */

// campo com erro vindo do back -> passo onde o usuário corrige
// (chaves aninhadas como "tempo.meses" são reduzidas ao prefixo antes da busca)
const campoParaPasso: Record<string, Passo> = {
    genero: 1,
    peso: 1,
    tipoPeso: 1,
    altura: 1,
    dataDeNascimento: 1,
    idade: 1,
    TMB: 1,
    GET: 1,
    nivelAtividade: 2,
    objetivo: 3,
    experiencia: 3,
    pesoIdeal: 4,
    pesoMinimo: 4,
    pesoMaximo: 4,
    veloPerda: 4,
    calDiaria: 4,
    duracao: 4,
    termino: 4,
    tempo: 4,
    nome: 6,
    email: 6,
    senha: 6,
    foto: 6,
    codigoConfirmacao: 6,
}

// aceita o erro padrão do axios (error.response.data) e também interceptors
// que rejeitam direto o corpo da resposta
const lerErroApi = (error: unknown) => {
    const e = error as any

    return {
        status: e?.response?.status ?? e?.status,
        data: e?.response?.data ?? e?.data ?? e,
    }
}

const estadoInicial = (): DadosCadastro => ({
    nome: '',
    email: '',
    senha: '',
    genero: '',
    peso: 20,
    pesoMinimo: null,
    pesoMaximo: null,
    tipoPeso: 'kilos',
    pesoIdeal: 0,
    altura: 80,
    dataDeNascimento: '',
    idade: '',
    nivelAtividade: 0,
    objetivo: '',
    experiencia: '',
    TMB: '',
    GET: '',
    calDiaria: '',
    tempo: {
        semanas: 0,
        meses: 0,
        previsao: ''
    },
    veloPerda: 0,
    codigoConfirmacao: '',
    foto: null,
})

/* ================= HOOK ================= */

const useCadastro = (): UseCadastroReturn => {

    const [dados, setDados] = useState<DadosCadastro>(() => {
        const salvo = localStorage.getItem('dados_cadastro')

        // um File não sobrevive ao JSON (vira {}), então a foto nunca é restaurada
        return salvo
            ? { ...estadoInicial(), ...JSON.parse(salvo), foto: null }
            : estadoInicial()
    })

    const [passo, setPasso] = useState<Passo>(1)
    const [erro, setErro] = useState(false)
    const [errosCampo, setErrosCampo] = useState<ErrosCampoCadastro>({})
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const validacoes: Record<Passo, () => boolean> = {
        1: () =>
            dados.genero !== '' &&
            dados.peso > 0 &&
            dados.altura !== 0 &&
            dados.dataDeNascimento !== '',

        2: () =>
            Number(dados.nivelAtividade) > 0,

        3: () =>
            dados.objetivo !== '' &&
            dados.experiencia !== '',

        4: () => {
            if (dados.objetivo !== 'manter_peso') {
                return Number(dados.pesoIdeal) !== 0 && Number(dados.veloPerda) !== 0
            }
            return Number(dados.pesoIdeal) !== 0
        },

        5: () => true,

        6: () =>
            dados.nome !== '' &&
            dados.email !== '' &&
            dados.senha !== ''
    }

    const podeProximo = useMemo(() => {
        return validacoes[passo]?.() ?? false
    }, [passo, dados])

    const mudarDados = useCallback(
        <K extends keyof DadosCadastro>(
            campo: K,
            valor: DadosCadastro[K]
        ) => {

            setDados(prev => ({
                ...prev,
                [campo]: valor
            }))

            setErrosCampo(prev => {
                if (!(campo in prev)) return prev
                const novo = { ...prev }
                delete novo[campo]
                return novo
            })

        }, []
    )

    /* ---------- cálculos ---------- */

    const idade = useMemo(() => {
        if (!dados.dataDeNascimento) return 0

        const hoje = new Date()
        const nascimento = new Date(dados.dataDeNascimento)

        let idade = hoje.getFullYear() - nascimento.getFullYear()

        const antesDoAniversario =
            hoje.getMonth() < nascimento.getMonth() ||
            (hoje.getMonth() === nascimento.getMonth() &&
                hoje.getDate() < nascimento.getDate())

        if (antesDoAniversario) idade--

        return idade
    }, [dados.dataDeNascimento])

    const TMB = useMemo(() => {
        if (!idade || !dados.genero || !dados.altura || !dados.peso) {
            return 0
        }

        const pesoKG =
            dados.tipoPeso === 'kilos'
                ? dados.peso
                : dados.peso / 2.20462

        if (dados.genero === 'feminino') {
            return Math.round(
                447.593 +
                (9.247 * pesoKG) +
                (3.098 * dados.altura) -
                (4.330 * idade)
            )
        }

        return Math.round(
            88.362 +
            (13.397 * pesoKG) +
            (4.799 * dados.altura) -
            (5.677 * idade)
        )
    }, [idade, dados.genero, dados.altura, dados.peso, dados.tipoPeso])

    const GET = useMemo(() => {
        if (!dados.nivelAtividade) return 0
        return Math.round(TMB * Number(dados.nivelAtividade))
    }, [dados.nivelAtividade, TMB])

    /* ---------- persistência (sem foto e sem código) ---------- */

    useEffect(() => {
        const timeout = setTimeout(() => {
            const { codigoConfirmacao, foto, ...dadosLimpos } = dados
            localStorage.setItem('dados_cadastro', JSON.stringify(dadosLimpos))
        }, 500)

        return () => clearTimeout(timeout)
    }, [dados])

    /* ---------- reset de meta só quando o objetivo MUDA ---------- */

    const objetivoAnterior = useRef(dados.objetivo)

    useEffect(() => {
        if (objetivoAnterior.current === dados.objetivo) return
        objetivoAnterior.current = dados.objetivo

        mudarDados('veloPerda', 0)
        mudarDados('pesoIdeal', dados.peso)
    }, [dados.objetivo])

    /* ---------- mutations ---------- */

    const cadastrarMutation = useMutation<
        any,
        AxiosError<ErroApi>,
        CadastroInfo
    >({
        mutationFn: async (info) => {
            console.log(paraFormData(info))
            const res = await api.post('/cadastro', paraFormData(info))
            return res.data
        },

        onError: (error) => {
            console.error('erro do cadastro:', error)   // temporário: mostra o formato real do erro

            const { status, data } = lerErroApi(error)
            const erros = data?.errors as Record<string, string[]> | undefined

            if (erros && Object.keys(erros).length) {
                setErrosCampo(erros as ErrosCampoCadastro)

                // abre o passo mais antigo que tem erro (e não só o primeiro que o back listou)
                const passos = Object.keys(erros)
                    .map(campo => campoParaPasso[campo.split('.')[0]])
                    .filter((p): p is Passo => p !== undefined)

                if (passos.length) setPasso(Math.min(...passos) as Passo)

                // alguns campos (TMB, idade...) não aparecem em nenhum passo
                toast.error(Object.values(erros)[0][0])
                return
            }

            // respostas sem "errors": código de confirmação errado (401), erro 500 etc.
            const mensagem = data?.mensagem ?? data?.message ?? 'não foi possível concluir o cadastro'

            if (status === 401) {
                setErrosCampo({ codigoConfirmacao: [mensagem] })
                setPasso(6)
            }

            toast.error(mensagem)
        },

        onSuccess: ({ token, usuario }) => {
            queryClient.setQueryData(['usuario'], usuario)
            localStorage.setItem('token', String(token))
            localStorage.setItem('usuario', JSON.stringify(usuario))
            localStorage.removeItem('dados_cadastro')
            navigate('/dashboard')
        }
    })

    const cadastroHandler = () => {
        cadastrarMutation.mutate({
            ...dados,
            GET,
            TMB,
            idade,
            // o back valida "integer"
            calDiaria: String(Math.round(Number(dados.calDiaria) || 0)),
        })
    }

    const emailMutation = useMutation<
        any,
        AxiosError,
        { email?: string; tipo?: string }
    >({
        mutationFn: async (info) => {
            const res = await api.post('/cadastroEmail', info)
            return res.data
        }
    })

    useEffect(() => {
        emailMutation.reset()
    }, [dados.email])

    return {
        passo,
        setPasso,
        erro,
        setErro,
        errosCampo,
        podeProximo,
        idade,
        TMB,
        GET,
        dados,
        mudarDados,
        cadastrarMutation,
        cadastroHandler,
        emailMutation
    }
}

export default useCadastro