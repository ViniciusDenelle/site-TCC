import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import api from '../../api.js'
// ajuste os caminhos abaixo para onde estes arquivos estão no seu projeto
import { paraFormData } from '../paraFormData'
import type { DadosCadastro } from '../cadastro/useCadastro'
import type { RetornoUsuario } from './FetchUsuario'

type Erros = Partial<Record<keyof DadosCadastro, string[]>>

/* ---------- normalização: aceita "Masculino", "kg", "Ganhar massa muscular"... ---------- */

const semAcento = (v: unknown) =>
    String(v ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()

const normalizarGenero = (v: unknown) => {
    const t = semAcento(v)
    if (t.startsWith('fem')) return 'feminino'
    if (t.startsWith('masc')) return 'masculino'
    return ''
}

// qualquer coisa que não seja libras é tratada como quilos ("kg", "kilos", "quilos")
const normalizarTipoPeso = (v: unknown): 'kilos' | 'libras' => {
    const t = semAcento(v)
    return t.startsWith('lib') || t === 'lb' || t === 'lbs' ? 'libras' : 'kilos'
}

const normalizarObjetivo = (v: unknown) => {
    const t = semAcento(v)
    if (t.includes('manter') || t.includes('manut')) return 'manter_peso'
    if (t.includes('perd') || t.includes('emagre')) return 'perder_peso'
    if (t.includes('ganh') || t.includes('massa') || t.includes('hipertrof')) return 'ganhar_peso'
    return ''
}

const normalizarExperiencia = (v: unknown) => {
    const t = semAcento(v)
    if (t.startsWith('inic')) return 'iniciante'
    if (t.startsWith('inter')) return 'intermediario'
    if (t.startsWith('avan')) return 'avançado'   // mesmo valor usado no passo "Objetivo"
    if (t.startsWith('atl')) return 'atleta'
    return ''
}

/**
 * Resposta do back -> mesmo formato do formulário de cadastro.
 * O Laravel devolve colunas decimal como string ("1.55"), então tudo passa por Number().
 */
const doBackParaForm = (usuario: RetornoUsuario): DadosCadastro => {
    const raw = usuario as any
    // aceita { data: {...} }, { usuario: {...} } ou o objeto direto
    const u = (raw?.data?.usuario ?? raw?.usuario ?? raw?.data ?? raw ?? {}) as any

    return {
        nome: u.nome ?? '',
        email: u.email ?? '',
        senha: '',
        genero: normalizarGenero(u.genero),
        peso: Number(u.peso),
        tipoPeso: normalizarTipoPeso(u.tipoPeso),
        pesoIdeal: Number(u.pesoIdeal),
        pesoMinimo: u.pesoMinimo != null ? Number(u.pesoMinimo) : null,
        pesoMaximo: u.pesoMaximo != null ? Number(u.pesoMaximo) : null,
        altura: Number(u.altura),
        dataDeNascimento: String(u.dataDeNascimento ?? '').slice(0, 10),
        idade: Number(u.idade),
        // aceita o nome antigo e o novo do Resource
        nivelAtividade: Number(u.nivelAtividade ?? u.nivelDeAtividade ?? 0),
        objetivo: normalizarObjetivo(u.objetivo),
        experiencia: normalizarExperiencia(u.experiencia),
        TMB: Number(u.TMB),
        GET: Number(u.GET),
        calDiaria: String(u.calDiaria ?? u.caloriasDiarias ?? ''),
        tempo: { semanas: 0, meses: 0, previsao: '' },   // useMetas preenche
        veloPerda: Number(u.veloPerda ?? 0),
        codigoConfirmacao: '',
        foto: null,
    }
}

const useAtualizarPerfil = (usuario: RetornoUsuario) => {
    const queryClient = useQueryClient()

    const [dados, setDados] = useState<DadosCadastro>(() => doBackParaForm(usuario))
    const [errosCampo, setErrosCampo] = useState<Erros>({})
    const [removerFoto, setRemoverFoto] = useState(false)

    const mudarDados = useCallback(
        <K extends keyof DadosCadastro>(campo: K, valor: DadosCadastro[K]) => {
            setDados(prev => ({ ...prev, [campo]: valor }))
            setErrosCampo(prev => {
                if (!(campo in prev)) return prev
                const novo = { ...prev }
                delete novo[campo]
                return novo
            })
        }, []
    )

    // arquivo novo, ou null = lixeira (apagar a foto que já estava salva)
    const trocarFoto = useCallback((arquivo: File | null) => {
        mudarDados('foto', arquivo)
        setRemoverFoto(arquivo === null && !!(usuario as any).foto)
    }, [mudarDados, usuario])

    /* ---------- cálculos em tempo real (mesmos do cadastro) ---------- */

    const idade = useMemo(() => {
        if (!dados.dataDeNascimento) return 0

        const hoje = new Date()
        const nasc = new Date(dados.dataDeNascimento)

        let anos = hoje.getFullYear() - nasc.getFullYear()

        const antesDoAniversario =
            hoje.getMonth() < nasc.getMonth() ||
            (hoje.getMonth() === nasc.getMonth() && hoje.getDate() < nasc.getDate())

        return antesDoAniversario ? anos - 1 : anos
    }, [dados.dataDeNascimento])

    const TMB = useMemo(() => {
        if (!idade || !dados.genero || !dados.altura || !dados.peso) return 0

        const pesoKG = dados.tipoPeso === 'kilos' ? dados.peso : dados.peso / 2.20462

        if (dados.genero === 'feminino') {
            return Math.round(447.593 + 9.247 * pesoKG + 3.098 * dados.altura - 4.33 * idade)
        }

        return Math.round(88.362 + 13.397 * pesoKG + 4.799 * dados.altura - 5.677 * idade)
    }, [idade, dados.genero, dados.altura, dados.peso, dados.tipoPeso])

    const GET = useMemo(() => {
        if (!dados.nivelAtividade) return 0
        return Math.round(TMB * Number(dados.nivelAtividade))
    }, [dados.nivelAtividade, TMB])

    /* ---------- trocar objetivo reinicia a meta (mas não na carga inicial) ---------- */

    const objetivoAnterior = useRef(dados.objetivo)

    useEffect(() => {
        if (objetivoAnterior.current === dados.objetivo) return
        objetivoAnterior.current = dados.objetivo

        mudarDados('veloPerda', 0)
        mudarDados('pesoIdeal', dados.peso)
    }, [dados.objetivo])

    /* ---------- envio ---------- */

    const atualizarMutation = useMutation<any, AxiosError<{ errors?: Erros }>, void>({
        mutationFn: async () => {
            const { codigoConfirmacao, senha, ...resto } = dados
            const manter = dados.objetivo === 'manter_peso'

            const payload = {
                ...resto,
                ...(senha ? { senha } : {}),   // só envia se quiser trocar a senha
                idade,
                TMB,
                GET,
                calDiaria: Math.round(Number(dados.calDiaria) || 0),
                // mesma fórmula do passo "manter peso": ±2% do peso ideal.
                // Calculado aqui para não depender de o usuário ter aberto a aba de metas.
                pesoMinimo: manter ? Number((dados.pesoIdeal * 0.98).toFixed(1)) : null,
                pesoMaximo: manter ? Number((dados.pesoIdeal * 1.02).toFixed(1)) : null,
                remover_foto: removerFoto ? 1 : 0,
                _method: 'PUT',   // PUT real não lê multipart no PHP
            }

            const res = await api.post('/atualizarUsuario', paraFormData(payload))
            return res.data
        },

        onError: (error) => {
            const erros = error.response?.data?.errors
            if (erros) setErrosCampo(erros)
            else toast.error('houve um erro ao atualizar o perfil')
        },

        onSuccess: ({ usuario: atualizado }) => {
            queryClient.setQueryData(['usuario'], atualizado)   // use a chave real do useFetchUsuario
            localStorage.setItem('usuario', JSON.stringify(atualizado))
            toast.success('perfil atualizado com sucesso')
        },
    })

    return {
        dados,
        mudarDados,
        errosCampo,
        idade,
        TMB,
        GET,
        trocarFoto,
        atualizarMutation,
    }
}

export default useAtualizarPerfil