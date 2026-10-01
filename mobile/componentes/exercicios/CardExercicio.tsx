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
import useTema from '@/contextos/TemaContexto'

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
    const { temaAtual, formatarCor } = useTema()

    const corBase = formatarCor(temaAtual['--color-base-secundaria'], 1)
    const corBaseTerciaria = formatarCor(temaAtual['--color-base-terciaria'], 1)
    const corTexto = formatarCor(temaAtual['--color-t-primaria'], 1)
    const corTextoSecundaria = formatarCor(temaAtual['--color-t-secundaria'], 1)
    const corDestaque = formatarCor(temaAtual['--color-destaque-p-claro'], 1)

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: corBase }]}
            onPress={() => onPress?.(exercicio)}
        >

            <View style={styles.left}>

                <View style={[styles.iconWrapper, { backgroundColor: corBaseTerciaria }]}>

                    <MaterialCommunityIcons
                        name={exercicio.icone as any}
                        size={20}
                        color={corDestaque}
                    />

                </View>

                <View style={styles.info}>

                    <Text style={[styles.name, { color: corTexto }]}>
                        {exercicio.nome}
                    </Text>

                    <Text style={[styles.group, { color: corTextoSecundaria }]}>
                        {exercicio.grupo}
                    </Text>

                </View>

            </View>

            <Ionicons
                name="add-circle-outline"
                size={22}
                color={corDestaque}
            />

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
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

        alignItems: 'center',
        justifyContent: 'center',

        marginRight: 12,
    },

    info: {
        flex: 1,
    },

    name: {
        fontSize: 15,

        fontWeight: '600',
    },

    group: {
        fontSize: 12,

        marginTop: 2,
    },
})