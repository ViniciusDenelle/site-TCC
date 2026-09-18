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

            <View style={styles.header}>

                <View style={styles.info}>
                    <Text style={styles.title}>
                        {nome}
                    </Text>

                    <Text style={styles.subtitle}>
                        📋 {nivel} • ⏱️ {duracao}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                >
                    <Text style={styles.buttonText}>
                        Começar
                    </Text>
                </TouchableOpacity>

            </View>

            {usadoHa && (
                <Text style={styles.used}>
                    Usado há {usadoHa}
                </Text>
            )}

            <View style={styles.footer}>

                <Text style={styles.exerciseCount}>
                    {quantidadeExercicios} exercícios
                </Text>

                <View style={styles.icons}>

                    <View style={styles.icon}>
                        <MaterialCommunityIcons
                            name="arm-flex"
                            size={14}
                            color="#ffbe59"
                        />
                    </View>

                    <View style={styles.icon}>
                        <MaterialCommunityIcons
                            name="arm-flex"
                            size={14}
                            color="#ffbe59"
                        />
                    </View>

                    <View style={styles.icon}>
                        <MaterialCommunityIcons
                            name="run"
                            size={14}
                            color="#ffbe59"
                        />
                    </View>

                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1c1c1e',
        borderRadius: 16,
        padding: 16,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    info: {
        flex: 1,
        marginRight: 10,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },

    subtitle: {
        color: '#8e8e93',
        fontSize: 13,
        marginTop: 4,
    },

    button: {
        backgroundColor: '#ff5b5b',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
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