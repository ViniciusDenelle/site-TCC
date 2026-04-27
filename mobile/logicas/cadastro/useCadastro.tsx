import React, { useCallback, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
// typagem

type Passo = 1 | 2 | 3 | 4 | 5 | 6

type DadosCadastro = {
    nome: string
    email: string
    senha: string
    genero: string
    peso: number
    tipoPeso: 'kilos' | 'libras'
    pesoFinal: number
    altura: number
    dataDeNascimento: string
    nivelAtividade: number | null,
    objetivo: string
    experiencia: string
    calDiaria: string
    tempo: {
        semanas: number,
        meses: number,
        previsao: string
    },
    veloPerda: number
    codigoConfirmacao: string
}

type UseCadastroReturn = {
  dados: DadosCadastro
  mudarDados: <K extends keyof DadosCadastro>(
    campo: K,
    valor: DadosCadastro[K]
  ) => void
  errosCampo: ErrosCampo
  podeSeguir: (passo: Passo) => boolean
  idade: number
  TMB: number
  GET: number
}

type ErrosCampo = Partial<Record<keyof DadosCadastro, string>>

const useCadastro = (): UseCadastroReturn => {
    const [dados, setDados] = useState<DadosCadastro>({
        nome: '',
        email: '',
        senha: '',
        genero: '',
        peso: 20,
        tipoPeso: 'kilos',
        pesoFinal: 0,
        altura: 80,
        dataDeNascimento: '',
        nivelAtividade: 0,
        objetivo: '',
        experiencia: '',
        calDiaria: '',
        tempo: {
            semanas: 0,
            meses: 0,
            previsao: ''
        },
        veloPerda: 0,
        codigoConfirmacao: '',
    })

    const [errosCampo, setErrosCampo] = useState<ErrosCampo>({})

    // resgatar e salvar dados no storage

    useEffect(() => {
        async function carregar() {
            const salvo = await AsyncStorage.getItem('dados_cadastro')
            if(salvo){
                const parsed = JSON.parse(salvo) as Partial<DadosCadastro>
                setDados(prev => ({
                    ...prev,
                    ...parsed
                }))
            }
        }
        carregar()
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            AsyncStorage.setItem('dados_cadastro', JSON.stringify(dados))
        }, 500)

        return () => clearTimeout(timeout)
    }, [dados])

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
    }, [])

    // dados computados idade TMB e GET

    const idade = useMemo(() => {
        if (!dados.dataDeNascimento) return 0

        const hoje = new Date()
        const nascimento = new Date(dados.dataDeNascimento)

        let idade = hoje.getFullYear() - nascimento.getFullYear()

        if (
            hoje.getMonth() < nascimento.getMonth() ||
            (hoje.getMonth() === nascimento.getMonth() &&
                hoje.getDate() < nascimento.getDate())
        ) {
            idade--
        }

        return idade
    }, [dados.dataDeNascimento])

    const TMB = useMemo(() => {
        if (!idade || !dados.genero || !dados.altura || !dados.peso) return 0

        const pesoKG =
            dados.tipoPeso === 'kilos'
                ? dados.peso
                : dados.peso / 2.20462

        if (dados.genero === 'feminino') {
            return Math.round(
                447.593 +
                9.247 * pesoKG +
                3.098 * dados.altura -
                4.33 * idade
            )
        }

        return Math.round(
            88.362 +
            13.397 * pesoKG +
            4.799 * dados.altura -
            5.677 * idade
        )
    }, [
        dados.genero,
        dados.altura,
        dados.peso,
        dados.tipoPeso,
        idade
    ])

    const GET = useMemo(() => {
        if (!dados.nivelAtividade || !TMB) return 0
        return Math.round(TMB * Number(dados.nivelAtividade))
    }, [dados.nivelAtividade, TMB])

    const validacoes: Record<Passo, () => boolean> = {
        1: () =>
        dados.genero !== '' &&
        dados.peso > 0 &&
        dados.altura > 0 &&
        dados.dataDeNascimento !== '',

        2: () => dados.nivelAtividade !== 0,

        3: () =>
        dados.objetivo !== '' &&
        dados.experiencia !== '',

        4: () =>
        dados.veloPerda !== 0 &&
        dados.pesoFinal !== 0,

        5: () => true,

        6: () =>
        dados.nome !== '' &&
        dados.email !== '' &&
        dados.senha !== ''
    }

    // validações

    const podeSeguir = (passo: Passo): boolean => {
        return validacoes[passo]?.() ?? false
    } 

    const campoParaPasso: Partial<Record<keyof DadosCadastro, Passo>> = {
        genero: 1,
        peso: 1,
        altura: 1,
        dataDeNascimento: 1,
        nivelAtividade: 2,
        objetivo: 3,
        experiencia: 3,
        veloPerda: 4,
        pesoFinal: 4,
        nome: 6,
        email: 6,
        senha: 6
    }

    // mutations

    return {
        dados,
        mudarDados,
        errosCampo,
        podeSeguir,
        idade,
        TMB,
        GET,
        // cadastroHandler,
        // cadastrarMutation,
        // emailMutation
    }
}

export default useCadastro