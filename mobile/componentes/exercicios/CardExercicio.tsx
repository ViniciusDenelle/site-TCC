import {
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons'

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

export type Exercicio = {
    id: string
    nome: string
    grupo: string
    icone: string
}

type Props = {
    exercicio: Exercicio
    onPress?: (exercicio: Exercicio) => void
}

export default function CardExercicio({
    exercicio,
    onPress,
}: Props) {

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress?.(exercicio)}
        >

            <View style={styles.left}>

                <View style={styles.iconWrapper}>

                    <MaterialCommunityIcons
                        name={exercicio.icone as any}
                        size={20}
                        color="#ff5b5b"
                    />

                </View>

                <View style={styles.info}>

                    <Text style={styles.name}>
                        {exercicio.nome}
                    </Text>

                    <Text style={styles.group}>
                        {exercicio.grupo}
                    </Text>

                </View>

            </View>

            <Ionicons
                name="add-circle-outline"
                size={22}
                color="#ff5b5b"
            />

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1c1c1e',

        borderRadius: 12,

        padding: 14,

        flexDirection: 'row',

        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: 10,
    },

    left: {
        flexDirection: 'row',
        alignItems: 'center',

        flex: 1,
    },

    iconWrapper: {
        width: 40,
        height: 40,

        borderRadius: 8,

        backgroundColor: '#2c2c2e',

        alignItems: 'center',
        justifyContent: 'center',

        marginRight: 12,
    },

    info: {
        flex: 1,
    },

    name: {
        color: '#ffffff',

        fontSize: 15,

        fontWeight: '600',
    },

    group: {
        color: '#8e8e93',

        fontSize: 12,

        marginTop: 2,
    },
})