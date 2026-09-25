import { StyleSheet, Text, View } from 'react-native'
import useTema from '@/contextos/TemaContexto'

type Props = {
    atual: number
    total: number
}

export default function ProgressoSemana({
    atual,
    total,
}: Props) {

    const { temaAtual, formatarCor } = useTema()

    const porcentagem =
        total > 0
            ? Math.min((atual / total) * 100, 100)
            : 0

    const cores = {
        trilha: formatarCor(
            temaAtual['--color-base-quaternaria'],
            1
        ),

        progresso: formatarCor(
            temaAtual['--color-destaque-p-medio'],
            1
        ),

        texto: formatarCor(
            temaAtual['--color-t-terciaria'],
            1
        ),
    }

    return (
        <View style={styles.container}>

            <View
                style={[
                    styles.track,
                    {
                        backgroundColor: cores.trilha,
                    },
                ]}
            >
                <View
                    style={[
                        styles.progress,
                        {
                            width: `${porcentagem}%`,
                            backgroundColor: cores.progresso,
                        },
                    ]}
                />
            </View>

            <Text
                style={[
                    styles.quote,
                    {
                        color: cores.texto,
                    },
                ]}
            >
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
        borderRadius: 3,
        overflow: 'hidden',
    },

    progress: {
        height: '100%',
        borderRadius: 3,
    },

    quote: {
        fontStyle: 'italic',
        fontSize: 12,
        marginTop: 10,
    },
})