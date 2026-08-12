import { Ionicons } from '@expo/vector-icons'

import {
    StyleSheet,
    TextInput,
    View,
} from 'react-native'

type Props = {
    valor: string
    onChange: (valor: string) => void
}

export default function BarraBuscaExercicio({
    valor,
    onChange,
}: Props) {

    return (
        <View style={styles.container}>

            <Ionicons
                name="search"
                size={18}
                color="#636366"
            />

            <TextInput
                value={valor}
                onChangeText={onChange}
                placeholder="Buscar exercício..."
                placeholderTextColor="#636366"
                style={styles.input}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1c1c1e',

        borderRadius: 10,

        flexDirection: 'row',
        alignItems: 'center',

        paddingHorizontal: 10,

        height: 40,
    },

    input: {
        flex: 1,

        color: '#ffffff',

        fontSize: 15,

        marginLeft: 8,
    },
})