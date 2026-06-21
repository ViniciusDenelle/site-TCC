import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query' // Importado para tipar a mutation
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { AxiosError } from 'axios'
import api from '../../api.js'
import Objetivo from '../../views/cadastro/passos/Objetivo.js'
import { Route, useNavigate } from 'react-router-dom'

/* ================= TYPES ================= */

type Passo = 1 | 2 | 3 | 4 | 5 | 6

type DadosCadastro = {
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
        }
    >
}

/* ================= HOOK ================= */

const useCadastro = (): UseCadastroReturn => {

    const [dados, setDados] = useState<DadosCadastro>(() => {
        const salvo = localStorage.getItem('dados_cadastro')

        return salvo
            ? JSON.parse(salvo)
            : {
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
                veloPerda: '',
                codigoConfirmacao: '',
            }
    })

    const [passo, setPasso] = useState<Passo>(1)
    const [erro, setErro] = useState(false)
    const [errosCampo, setErrosCampo] = useState<ErrosCampoCadastro>({})
    const navigate = useNavigate()

    const validacoes: Record<Passo, () => boolean> = {
        1: () =>
            dados.genero !== '' &&
            dados.peso > 0 &&
            dados.altura !== 0 &&
            dados.dataDeNascimento !== '',

        2: () =>
            dados.nivelAtividade !== null,

        3: () =>
            dados.objetivo !== '' &&
            dados.experiencia !== '',

        4: () => {
            if(dados.objetivo !== 'manter_peso'){
                if (dados.pesoIdeal !== 0 && dados.veloPerda !== 0 ) return true
            } else {
                if (dados.pesoIdeal !== 0 ) return true
            }
        }
            ,

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
                const novo = { ...prev }
                delete novo[campo]
                return novo
            })

        }, []
    )

    const idade = useMemo(() => {
        if (!dados.dataDeNascimento) return 0

        const hoje = new Date()
        const nascimento = new Date(dados.dataDeNascimento)

        let idade = hoje.getFullYear() - nascimento.getFullYear()

        const mesAtual = hoje.getMonth()
        const mesNascimento = nascimento.getMonth()

        const diaAtual = hoje.getDate()
        const diaNascimento = nascimento.getDate()

        if (
            mesAtual < mesNascimento ||
            (mesAtual === mesNascimento && diaAtual < diaNascimento)
        ) {
            idade--
        }

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

    // persistencia dos dados no localStorage
    useEffect(() => {
        const timeout = setTimeout(() => {
            const {codigoConfirmacao, ...dadosLimpos} = dados
            localStorage.setItem('dados_cadastro', JSON.stringify(dadosLimpos))
            
        }, 500);

        return () => clearTimeout(timeout)
    }, [dados])

    useEffect(() => {
        mudarDados('veloPerda', 0)
        mudarDados('pesoIdeal', dados.peso)
    }, [dados.objetivo])

    
    const queryClient = useQueryClient()

    const cadastrarMutation = useMutation<
        any,
        AxiosError<ErroApi>,
        CadastroInfo
    >({
        mutationFn: async (dados) => {
            console.log(dados)
            const res = await api.post('/cadastro', dados)
            
            return res.data
        },

        onError: (error) => {
            console.log(error)
            const erros = error.response?.data?.errors
            if (!erros) return

            setErrosCampo(erros)

            const primeiro = Object.keys(erros)[0] as keyof DadosCadastro

            if (primeiro) {
                const passoErrado = campoParaPasso[primeiro]
                if (passoErrado) setPasso(passoErrado)
            }
        },
        onSuccess: ({token, usuario}) => {
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
            idade
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

    const campoParaPasso: Partial<Record<keyof DadosCadastro, Passo>> = {
        genero: 1,
        peso: 1,
        altura: 1,
        dataDeNascimento: 1,
        nivelAtividade: 2,
        veloPerda: 4,
        pesoIdeal: 4,
        nome: 6,
        email: 6,
        senha: 6
    }

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