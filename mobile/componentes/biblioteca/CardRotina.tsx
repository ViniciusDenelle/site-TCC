import { Ionicons } from '@expo/vector-icons'

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import useTema from '@/contextos/TemaContexto'

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
    const { temaAtual, formatarCor } = useTema()

    const corBase = formatarCor(temaAtual['--color-base-secundaria'], 1)
    const corTexto = formatarCor(temaAtual['--color-t-primaria'], 1)
    const corTextoSecundaria = formatarCor(temaAtual['--color-t-secundaria'], 1)

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: corBase }]}
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
                    <Text style={[styles.name, { color: corTexto }]}>
                        {rotina.nome}
                    </Text>

                    <Text style={[styles.meta, { color: corTextoSecundaria }]}>
                        {rotina.tipo} • {rotina.duracao}
                    </Text>
                </View>

            </View>

            <View style={styles.right}>

                <Text style={[styles.count, { color: corTextoSecundaria }]}>
                    {rotina.exercicios} exs
                </Text>

                <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={corTextoSecundaria}
                />

            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
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
        fontSize: 16,
        fontWeight: 'bold',
    },

    meta: {
        fontSize: 13,
        marginTop: 4,
    },

    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    count: {
        fontSize: 13,
    },
})