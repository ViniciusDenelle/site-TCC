import { StyleSheet, Text, View } from 'react-native'
import useTema from '@/contextos/TemaContexto'

    const { temaAtual, formatarCor } = useTema()

    const cores = {
        texto: formatarCor(temaAtual['--color-t-primaria'], 1),
        destaque: formatarCor(temaAtual['--color-destaque-p-medio'], 1),
        meta: formatarCor(temaAtual['--color-t-terciaria'], 1),
    }
type Props = {
    nome: string
    metaAtual: number
    metaTotal: number
            <Text style={[styles.greeting, { color: cores.texto }]}>
                Olá, <Text style={[styles.highlight, { color: cores.destaque }]}>{nome}</Text>
export default function SaudacaoUsuario({
    nome,
            <Text style={[styles.meta, { color: cores.meta }]}>
    metaTotal,
}: Props) {

    return (
        <View style={styles.container}>

            <Text style={styles.greeting}>
                Olá, <Text style={styles.highlight}>{nome}</Text>
            </Text>

            <Text style={styles.meta}>
                Meta da Semana: {metaAtual}/{metaTotal} treinos
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },

    greeting: {
        fontSize: 26,
        fontWeight: 'bold',
    },

    highlight: {
    },

    meta: {
        fontSize: 14,
        marginTop: 8,
    },
})