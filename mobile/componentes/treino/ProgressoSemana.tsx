import { StyleSheet, Text, View } from 'react-native'

type Props = {
    atual: number
    total: number
}

export default function ProgressoSemana({
    atual,
    total,
}: Props) {

    const porcentagem =
        total > 0
            ? Math.min((atual / total) * 100, 100)
            : 0

    return (
        <View style={styles.container}>

            <View style={styles.track}>
                <View
                    style={[
                        styles.progress,
                        {
                            width: `${porcentagem}%`,
                        },
                    ]}
                />
            </View>

            <Text style={styles.quote}>
                "Você se motiva agindo, o movimento traz energia."
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },

    track: {
        height: 6,
        backgroundColor: '#1c1c1e',
        borderRadius: 3,
        overflow: 'hidden',
    },

    progress: {
        height: '100%',
        backgroundColor: '#ff5b5b',
        borderRadius: 3,
    },

    quote: {
        color: '#636366',
        fontStyle: 'italic',
        fontSize: 12,
        marginTop: 10,
    },
})