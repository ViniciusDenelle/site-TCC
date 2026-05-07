import { useMutation } from '@tanstack/react-query'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import api from '../../api'

const useCadastro = () => {
    const [dados, setDados] = useState(() => {
        const salvo = localStorage.getItem('dados_cadastro')
        return salvo
            ? JSON.parse(salvo)
            : {
                nome: '',
                email: '',
                senha: '',
                genero: '',
                peso: 20,
                tipoPeso: 'kilos',
                pesoFinal: '',
                altura: 80,
                dataDeNascimento: '',
                idade: '',
                nivelAtividade: '',
                objetivo: '',
                experiencia: '',
                TMB: '',
                GET: '',
                calDiaria: '',
                tempo: {},
                veloPerda: '',
                codigoConfirmacao: '',
            }
    })

    const [passo, setPasso] = useState(dados.passo ?? 1)
    const [erro, setErro] = useState(false)
    const [errosCampo, setErrosCampo] = useState([])
    // validar passo

    const validacoes = {
        1: () => (
            dados.genero !== ''
            && dados.peso > 0
            && dados.altura !== ''
            && dados.dataDeNascimento !== ''
        ),
        2: () => (
            dados.nivelAtividade !== ''
        ),
        3: () => (
            dados.objetivo !== '' &&
            dados.experiencia !== ''
        ),
        4: () => (
            dados.veloPerda !== '' &&
            dados.pesoFinal !== ''
        ),
        5: () => (
            true
        ),
        6: () => (
            dados.nome !== '' &&
            dados.email !== '' &&
            dados.senha !== ''
        )
    }

    const podeProximo = useMemo(() => {
        return validacoes[passo]?.() ?? false
    }, [passo, dados])

    const mudarDados = useCallback(
        (campo, valor) => {
            setDados(prev => ({
                ...prev, [campo]: valor
            }))

            setErrosCampo(prev => {
                const novo = {...prev}
                delete novo[campo]
                return novo
            })
        }, [])

    const idade = useMemo(() => {
        if (!dados.dataDeNascimento) return 0

        const hoje = new Date()
        const nascimento = new Date(dados.dataDeNascimento)

        let idade = hoje.getFullYear() - nascimento.getFullYear()

        const mesAtual = hoje.getMonth()
        const mesNascimento = nascimento.getMonth()

        const diaAtual = hoje.getDate()
        const diaNascimento = nascimento.getDate()

        // verifica se ainda não fez aniversário esse ano
        if (
            mesAtual < mesNascimento ||
            (mesAtual === mesNascimento && diaAtual < diaNascimento)
        ) {
            idade--
        }
        return idade
    }, [dados.dataDeNascimento])

    const TMB = useMemo(() => {
        if (!idade || !dados.genero || !dados.altura || !dados.peso) return 0

        let pesoKG =
            dados.tipoPeso === 'kilos'
                ? dados.peso
                : dados.peso / 2.20462

        if (dados.genero === 'feminino') {
            return Math.round(
                447.593
                + (9.247 * pesoKG)
                + (3.098 * dados.altura)
                - (4.330 * idade)
            )
        }

        return Math.round(
            88.362
            + (13.397 * pesoKG)
            + (4.799 * dados.altura)
            - (5.677 * idade)
        )

    }, [
        dados.idade,
        dados.genero,
        dados.altura,
        dados.peso,
        dados.tipoPeso
    ])

    const GET = useMemo(() => {

        if (!dados.nivelAtividade) return
        return Math.round(TMB * dados.nivelAtividade)

    }, [dados.nivelAtividade, TMB])

    useEffect(() => {
        const timeout = setTimeout(() => {
            const { codigoConfirmacao, ...dadosLimpos } = dados
            localStorage.setItem('dados_cadastro', JSON.stringify({
                ...dadosLimpos, GET, TMB, idade, passo
            }))
        }, 500)

        return () => clearTimeout(timeout)
    }, [dados, TMB, GET, idade, passo])

    const campoParaPasso = {
        genero: 1,
        peso: 1,
        altura: 1,
        dataDeNascimento: 1,
        // TMB: 1,
        // GET: 1,

        nivelAtividade: 2,

        objetivo: 3,
        experiencia: 3,

        veloPerda: 4,
        pesoFinal: 4,

        nome: 6,
        email: 6,
        senha: 6
    }

    const cadastrarMutation = useMutation({
        mutationFn: async dados => {  
            const res = await api.post('/cadastro', dados)
            return res.data
        },
        onSuccess: dados => {
            console.log(dados)
        },
        onError: error => {
            const erros =  error.response?.data?.errors
            if (!erros) return
            
            setErrosCampo(erros)
            const primeiro = Object.keys(erros)[0]
            
            const passoErrado = campoParaPasso[primeiro]
            if (passoErrado) {
                setPasso(passoErrado)
            }

        }
    })

    function cadastroHandler()
    {
        cadastrarMutation.mutate({
            ...dados,
            GET,
            TMB,
            idade
        })
    }

    const emailMutation = useMutation({
        mutationFn: async info => {
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
        emailMutation,
    }
}

export default useCadastro