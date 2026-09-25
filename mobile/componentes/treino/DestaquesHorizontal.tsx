import useTema from '@/contextos/TemaContexto'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export type Destaque = {
    id: string
    imagem: string
    tipo: string
    titulo: string
}

type Props = {
    destaques: Destaque[]
    onPress?: (item: Destaque) => void
}

export default function DestaquesHorizontal({ destaques, onPress }: Props) {
    const { temaAtual, formatarCor } = useTema()

    const cores = {
        card: formatarCor(temaAtual['--color-base-secundaria'], 1),
        tag: formatarCor(temaAtual['--color-t-terciaria'], 1),
        titulo: formatarCor(temaAtual['--color-t-primaria'], 1),
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {destaques.map(item => (
                <TouchableOpacity
                    key={item.id}
                    style={[styles.card, { backgroundColor: cores.card }]}
                    onPress={() => onPress?.(item)}
                >
                    <Image source={{ uri: item.imagem }} style={styles.image} />

                    <View style={styles.content}>
                        <Text style={[styles.tag, { color: cores.tag }]}>{item.tipo}</Text>
                        <Text style={[styles.title, { color: cores.titulo }]}>{item.titulo}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 170,
        borderRadius: 12,
        marginRight: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 90,
    },
    content: {
        padding: 10,
    },
    tag: {
        fontSize: 11,
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 2,
    },
})