import api, { registrarAoSessaoExpirar } from '@/api'
import {
    lerSessao,
    limparSessao,
    salvarSessao,
    salvarUsuario,
} from '@/logicas/auth/sessao'
import { Usuario } from '@/logicas/tipagens/UsuarioProps'
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

type UsuarioContextoProps = {
    usuario: Usuario | null
    token: string | null
    /** true enquanto lê a sessão salva no aparelho (abertura do app) */
    carregando: boolean
    autenticado: boolean
    entrar: (token: string, usuario: Usuario) => Promise<void>
    sair: () => Promise<void>
    /** Busca o usuário atualizado no back-end (GET /usuario) */
    atualizarUsuario: () => Promise<void>
}

const UsuarioContexto = createContext<UsuarioContextoProps | null>(null)

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [carregando, setCarregando] = useState(true)

    const limparEstado = useCallback(() => {
        setUsuario(null)
        setToken(null)
    }, [])

    const atualizarUsuario = useCallback(async () => {
        const res = await api.get('/usuario')
        // GET /usuario devolve um JsonResource, que o Laravel embrulha em { data: ... }
        const dados: Usuario = res.data?.data ?? res.data

        setUsuario(dados)
        await salvarUsuario(dados)
    }, [])

    // Ao abrir o app: restaura a sessão salva e revalida em segundo plano.
    useEffect(() => {
        let ativo = true

        async function restaurar() {
            const sessao = await lerSessao()

            if (!ativo) return

            setToken(sessao.token)
            setUsuario(sessao.usuario)
            setCarregando(false)

            if (sessao.token) {
                try {
                    await atualizarUsuario()
                } catch {
                    // Sem internet: segue com os dados salvos.
                    // Se for 401, o interceptor já limpou a sessão.
                }
            }
        }

        restaurar()

        return () => {
            ativo = false
        }
    }, [atualizarUsuario])

    // Token rejeitado pelo back-end em qualquer tela -> volta para o login.
    useEffect(() => {
        registrarAoSessaoExpirar(limparEstado)
        return () => registrarAoSessaoExpirar(null)
    }, [limparEstado])

    const entrar = useCallback(async (novoToken: string, novoUsuario: Usuario) => {
        await salvarSessao(novoToken, novoUsuario)
        setToken(novoToken)
        setUsuario(novoUsuario)
    }, [])

    const sair = useCallback(async () => {
        try {
            await api.get('/logout') // revoga o token no servidor
        } catch {
            // Mesmo se falhar (offline), encerra a sessão localmente.
        }

        await limparSessao()
        limparEstado()
    }, [limparEstado])

    const valor = useMemo(
        () => ({
            usuario,
            token,
            carregando,
            autenticado: Boolean(token),
            entrar,
            sair,
            atualizarUsuario,
        }),
        [usuario, token, carregando, entrar, sair, atualizarUsuario]
    )

    return (
        <UsuarioContexto.Provider value={valor}>
            {children}
        </UsuarioContexto.Provider>
    )
}

const useUsuario = () => {
    const contexto = useContext(UsuarioContexto)

    if (!contexto) {
        throw new Error('useUsuario precisa estar dentro de <UsuarioProvider>')
    }

    return contexto
}

export default useUsuario