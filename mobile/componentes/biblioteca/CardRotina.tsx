import { Ionicons } from '@expo/vector-icons'

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

export type Rotina = {
    id: string
    nome: string
    tipo: string
    duracao: string
    exercicios: number
    cor: string
}

type Props = {
    rotina: Rotina
    onPress?: (rotina: Rotina) => void
}

export default function CardRotina({
    rotina,
    onPress,
}: Props) {

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onPress?.(rotina)}
        >
            <View style={styles.left}>

                <View
                    style={[
                        styles.indicator,
                        {
                            backgroundColor: rotina.cor,
                        },
                    ]}
                />

                <View>
                    <Text style={styles.name}>
                        {rotina.nome}
                    </Text>

                    <Text style={styles.meta}>
                        {rotina.tipo} • {rotina.duracao}
                    </Text>
                </View>

            </View>

            <View style={styles.right}>

                <Text style={styles.count}>
                    {rotina.exercicios} exs
                </Text>

                <Ionicons
                    name="chevron-forward"
                    size={16}
                    color="#636366"
                />

            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1c1c1e',
        borderRadius: 12,
        padding: 16,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: 12,
    },

    left: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    indicator: {
        width: 4,
        height: 35,
        borderRadius: 2,
        marginRight: 12,
    },

    name: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    meta: {
        color: '#8e8e93',
        fontSize: 13,
        marginTop: 4,
    },

    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    count: {
        color: '#aeaeb2',
        fontSize: 13,
    },
})