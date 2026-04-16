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
                codigoConfirmacao: ''
            }
    })

    const [passo, setPasso] = useState(1)
    const [erro, setErro] = useState(false)

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
                - (4.330 * dados.idade)
            )
        }

        return Math.round(
            88.362
            + (13.397 * pesoKG)
            + (4.799 * dados.altura)
            - (5.677 * dados.idade)
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

    }, [dados.nivelAtividade])

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem('dados_cadastro', JSON.stringify({ ...dados, GET, TMB, idade }))
        }, 500)

        return () => clearTimeout(timeout)
    }, [dados])

    const cadastrarMutation = useMutation({
        mutationFn: async dados => {
            const res = await api.post('/cadastro', dados)
            return res.data
        }
    })


    return {
        passo,
        setPasso,
        erro,
        setErro,
        podeProximo,
        idade,
        TMB,
        GET,
        dados,
        mudarDados,
        cadastrarMutation
    }
}

export default useCadastro