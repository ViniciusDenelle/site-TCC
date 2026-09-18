import {
    MaterialCommunityIcons,
} from '@expo/vector-icons'

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

type Props = {
    nome: string
    nivel: string
    duracao: string
    quantidadeExercicios: number
    usadoHa?: string
    onPress?: () => void
}

export default function CardTreinoHoje({
    nome,
    nivel,
    duracao,
    quantidadeExercicios,
    usadoHa,
    onPress,
}: Props) {

    return (
        <View style={styles.card}>
    const { temaAtual, formatarCor } = useTema()

    const cores = {
        card: formatarCor(temaAtual['--color-base-secundaria'], 1),
        texto: formatarCor(temaAtual['--color-t-primaria'], 1),
        subtitulo: formatarCor(temaAtual['--color-t-terciaria'], 1),
        botao: formatarCor(temaAtual['--color-destaque-p-medio'], 1),
        borda: formatarCor(temaAtual['--color-base-quaternaria'], 1),
        icone: formatarCor(temaAtual['--color-destaque-p-medio'], 1),
        uso: formatarCor(temaAtual['--color-t-terciaria'], 1),
        exercicios: formatarCor(temaAtual['--color-t-primaria'], 1),
    }
        icone: formatarCor(temaAtual['--color-destaque-p-medio'], 1),
        uso: formatarCor(temaAtual['--color-t-terciaria'], 1),
        <View style={[styles.card, { backgroundColor: cores.card }]}>
    }
                    <Text style={styles.title}>
                        {nome}
        <View style={[styles.card, { backgroundColor: cores.card }]}>

                    <Text style={styles.subtitle}>
                        📋 {nivel} • ⏱️ {duracao}
                    <Text style={[styles.title, { color: cores.texto }]}>
                    </Text>
                </View>

                    <Text style={[styles.subtitle, { color: cores.subtitulo }]}>
                    style={styles.button}
                    style={[styles.button, { backgroundColor: cores.botao }]}
                >
                    <Text style={styles.buttonText}>
                        Começar
                    style={[styles.button, { backgroundColor: cores.botao }]}
                </TouchableOpacity>

            </View>

            {usadoHa && (
                <Text style={[styles.used, { color: cores.uso }]}>
                    Usado há {usadoHa}
                </Text>
            )}
                <Text style={[styles.used, { color: cores.uso }]}>
            <View style={styles.footer}>

                <Text style={styles.exerciseCount}>
                    {quantidadeExercicios} exercícios
                </Text>

                    <Text style={[styles.exerciseCount, { color: cores.exercicios }]}>

                    <View style={styles.icon}>
                        <MaterialCommunityIcons
                            name="arm-flex"
                            size={14}
                            color={cores.icone}
                        />
                    </View>

                            color={cores.icone}
                        <MaterialCommunityIcons
                            name="arm-flex"
                            size={14}
                            color={cores.icone}
                        />
                    </View>

                            color={cores.icone}
                        <MaterialCommunityIcons
                            name="run"
                            size={14}
                            color={cores.icone}
                        />
                    </View>

                            color={cores.icone}

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1c1c1e',
        backgroundColor: '#1c1c1e', // This line remains unchanged
        padding: 16,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        color: '#ffffff', // This line remains unchanged

    info: {
        flex: 1,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    subtitle: {
        color: '#8e8e93',
        fontSize: 13,
        marginTop: 4,

    button: {
        backgroundColor: '#ff5b5b',
        paddingHorizontal: 14,
        paddingVertical: 8,
    },

    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 13,
    },

    used: {
        color: '#636366',
        fontSize: 12,
        marginTop: 12,
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginTop: 15,

        borderTopWidth: 1,
        borderTopColor: '#2c2c2e',

        paddingTop: 12,
    },

    exerciseCount: {
        color: '#aeaeb2',
        fontSize: 13,
    },

    icons: {
        flexDirection: 'row',
        gap: 6,
    },

    icon: {
        backgroundColor: '#2c2c2e',
        padding: 6,
        borderRadius: 6,
    },
})