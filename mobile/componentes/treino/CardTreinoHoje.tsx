import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import useTema from '@/contextos/TemaContexto'

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

    const { temaAtual, formatarCor } = useTema()

    const cores = {
        card: formatarCor(
            temaAtual['--color-base-secundaria'],
            1
        ),

        texto: formatarCor(
            temaAtual['--color-t-primaria'],
            1
        ),

        subtitulo: formatarCor(
            temaAtual['--color-t-terciaria'],
            1
        ),

        botao: formatarCor(
            temaAtual['--color-destaque-p-medio'],
            1
        ),

        borda: formatarCor(
            temaAtual['--color-base-quaternaria'],
            1
        ),

        icone: formatarCor(
            temaAtual['--color-destaque-p-medio'],
            1
        ),

        uso: formatarCor(
            temaAtual['--color-t-terciaria'],
            1
        ),

        exercicios: formatarCor(
            temaAtual['--color-t-primaria'],
            1
        ),
    }

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: cores.card,
                    borderColor: cores.borda,
                },
            ]}
        >

            {/* Cabeçalho */}
            <View style={styles.header}>

                <View style={styles.info}>

                    <Text
                        style={[
                            styles.title,
                            { color: cores.texto },
                        ]}
                    >
                        {nome}
                    </Text>

                    <Text
                        style={[
                            styles.subtitle,
                            { color: cores.subtitulo },
                        ]}
                    >
                        📋 {nivel} • ⏱️ {duracao}
                    </Text>

                </View>

                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                            backgroundColor: cores.botao,
                        },
                    ]}
                    onPress={onPress}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>
                        Começar
                    </Text>
                </TouchableOpacity>

            </View>

            {/* Último uso */}
            {usadoHa && (
                <Text
                    style={[
                        styles.used,
                        {
                            color: cores.uso,
                        },
                    ]}
                >
                    Usado há {usadoHa}
                </Text>
            )}

            {/* Rodapé */}
            <View
                style={[
                    styles.footer,
                    {
                        borderTopColor: cores.borda,
                    },
                ]}
            >

                <Text
                    style={[
                        styles.exerciseCount,
                        {
                            color: cores.exercicios,
                        },
                    ]}
                >
                    {quantidadeExercicios} exercícios
                </Text>

                <View style={styles.icons}>

                    <View
                        style={[
                            styles.icon,
                            {
                                backgroundColor: cores.borda,
                            },
                        ]}
                    >
                        <MaterialCommunityIcons
                            name="arm-flex"
                            size={14}
                            color={cores.icone}
                        />
                    </View>

                    <View
                        style={[
                            styles.icon,
                            {
                                backgroundColor: cores.borda,
                            },
                        ]}
                    >
                        <MaterialCommunityIcons
                            name="run"
                            size={14}
                            color={cores.icone}
                        />
                    </View>

                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    card: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    info: {
        flex: 1,
        marginRight: 12,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    subtitle: {
        fontSize: 13,
        marginTop: 4,
    },

    button: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },

    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 13,
    },

    used: {
        fontSize: 12,
        marginTop: 12,
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        borderTopWidth: 1,
        paddingTop: 12,
    },

    exerciseCount: {
        fontSize: 13,
    },

    icons: {
        flexDirection: 'row',
        gap: 6,
    },

    icon: {
        padding: 6,
        borderRadius: 6,
    },
})