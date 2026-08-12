import { StyleSheet, Text, View } from 'react-native'

type Props = {
    nome: string
    metaAtual: number
    metaTotal: number
}

export default function SaudacaoUsuario({
    nome,
    metaAtual,
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
        color: '#ffffff',
    },

    highlight: {
        color: '#ff5b5b',
    },

    meta: {
        color: '#aeaeb2',
        fontSize: 14,
        marginTop: 8,
    },
})