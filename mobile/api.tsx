import axios from 'axios'
import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { lerToken, limparSessao } from '@/logicas/auth/sessao'

/**
 * Descobre a URL do back-end automaticamente:
 *
 * 1. EXPO_PUBLIC_API_URL (se existir) tem prioridade. Ex.: http://192.168.0.10:8000/api
 * 2. Em desenvolvimento, usa o mesmo IP do computador que está servindo o Expo
 *    (funciona no celular físico, no Expo Go e no emulador).
 * 3. Fallbacks: 10.0.2.2 no emulador Android, 127.0.0.1 no resto.
 */
function resolverBaseURL() {
    const doEnv = process.env.EXPO_PUBLIC_API_URL
    if (doEnv) return doEnv

    const host = Constants.expoConfig?.hostUri?.split(':')[0]
    if (host) return `http://${host}:8000/api`

    if (Platform.OS === 'android') return 'http://10.0.2.2:8000/api'

    return 'http://127.0.0.1:8000/api'
}

const api = axios.create({
    baseURL: resolverBaseURL(),
    timeout: 15000,
    headers: { Accept: 'application/json' },
})

// O contexto de usuário registra aqui o que fazer quando o token for rejeitado.
let aoSessaoExpirar: (() => void) | null = null

export function registrarAoSessaoExpirar(callback: (() => void) | null) {
    aoSessaoExpirar = callback
}

api.interceptors.request.use(async (config) => {
    const token = await lerToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (__DEV__) {
            console.log(
                '[API]',
                error.config?.method?.toUpperCase(),
                error.config?.url,
                '->',
                error.response?.status ?? 'sem resposta',
                error.response?.data ?? error.message
            )
        }

        // 401 numa requisição que ENVIOU token = token inválido/expirado.
        // (Um 401 no /login, sem token, é só senha errada e não cai aqui.)
        const enviouToken = Boolean(error.config?.headers?.Authorization)

        if (error.response?.status === 401 && enviouToken) {
            await limparSessao()
            aoSessaoExpirar?.()
        }

        return Promise.reject(error)
    }
)

export default api