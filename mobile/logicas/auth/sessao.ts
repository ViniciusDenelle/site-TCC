import AsyncStorage from '@react-native-async-storage/async-storage'
import { Usuario } from '@/logicas/tipagens/UsuarioProps'

const CHAVE_TOKEN = 'token'
const CHAVE_USUARIO = 'usuario'

export async function salvarSessao(token: string, usuario: Usuario) {
    await AsyncStorage.multiSet([
        [CHAVE_TOKEN, token],
        [CHAVE_USUARIO, JSON.stringify(usuario)],
    ])
}

export async function salvarUsuario(usuario: Usuario) {
    await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario))
}

export async function lerToken() {
    return AsyncStorage.getItem(CHAVE_TOKEN)
}

export async function lerSessao(): Promise<{ token: string | null; usuario: Usuario | null }> {
    const [[, token], [, usuarioJson]] = await AsyncStorage.multiGet([CHAVE_TOKEN, CHAVE_USUARIO])

    let usuario: Usuario | null = null
    try {
        usuario = usuarioJson ? (JSON.parse(usuarioJson) as Usuario) : null
    } catch {
        // JSON corrompido: trata como sem usuário salvo
        usuario = null
    }

    return { token, usuario }
}

export async function limparSessao() {
    await AsyncStorage.multiRemove([CHAVE_TOKEN, CHAVE_USUARIO])
}