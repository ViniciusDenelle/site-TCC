import { Ionicons } from '@expo/vector-icons'

import {
    StyleSheet,
    TextInput,
    View,
} from 'react-native'
import useTema from '@/contextos/TemaContexto'

type Props = {
    valor: string
    onChange: (valor: string) => void
}

export default function BarraBuscaExercicio({
    valor,
    onChange,
}: Props) {
    const { temaAtual, formatarCor } = useTema()

    const corBase = formatarCor(temaAtual['--color-base-secundaria'], 1)
    const corTexto = formatarCor(temaAtual['--color-t-primaria'], 1)
    const corTextoSecundaria = formatarCor(temaAtual['--color-t-secundaria'], 1)

    return (
        <View style={[styles.container, { backgroundColor: corBase }]}>

            <Ionicons
                name="search"
                size={18}
                color={corTextoSecundaria}
            />

            <TextInput
                value={valor}
                onChangeText={onChange}
                placeholder="Buscar exercício..."
                placeholderTextColor={corTextoSecundaria}
                style={[styles.input, { color: corTexto }]}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,

        flexDirection: 'row',
        alignItems: 'center',

        paddingHorizontal: 10,

        height: 40,
    },

    input: {
        flex: 1,

        fontSize: 15,

        marginLeft: 8,
    },
})