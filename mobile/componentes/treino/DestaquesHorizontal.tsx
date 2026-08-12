import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

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

export default function DestaquesHorizontal({
    destaques,
    onPress,
}: Props) {

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {destaques.map(item => (

                <TouchableOpacity
                    key={item.id}
                    style={styles.card}
                    onPress={() => onPress?.(item)}
                >

                    <Image
                        source={{ uri: item.imagem }}
                        style={styles.image}
                    />

                    <View style={styles.content}>

                        <Text style={styles.tag}>
                            {item.tipo}
                        </Text>

                        <Text style={styles.title}>
                            {item.titulo}
                        </Text>

                    </View>

                </TouchableOpacity>

            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 170,

        backgroundColor: '#1c1c1e',

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
        color: '#8e8e93',
        fontSize: 11,
    },

    title: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
        marginTop: 2,
    },
})