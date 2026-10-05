import useTema from '@/contextos/TemaContexto'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
    diasTreinados: number
    totalTreinos: number
    duracaoMedia: string
    cargaTotal: string
}

const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

type MetricProps = {
    label: string
    value: string
    corTexto: string
}

function Metric({ label, value, corTexto }: MetricProps) {
    return (
        <View style={styles.metric}>
            <Text style={[styles.metricLabel, { color: corTexto }]}>{label}</Text>
            <Text style={[styles.metricValue, { color: corTexto }]}>{value}</Text>
        </View>
    )
}

export default function CardResumoSemanal({
    diasTreinados,
    totalTreinos,
    duracaoMedia,
    cargaTotal,
}: Props) {
    const { temaAtual, formatarCor } = useTema()

    const cores = {
        card: formatarCor(temaAtual['--color-base-secundaria'], 1),
        texto: formatarCor(temaAtual['--color-t-primaria'], 1),
        secundario: formatarCor(temaAtual['--color-t-terciaria'], 1),
        ativo: formatarCor(temaAtual['--color-destaque-p-medio'], 1),
        borda: formatarCor(temaAtual['--color-base-quaternaria'], 1),
    }

    return (
        <View style={[styles.card, { backgroundColor: cores.card }]}>
            <View style={styles.days}>
                {dias.map((dia, index) => {
                    const ativo = index < diasTreinados

                    return (
                        <View key={dia} style={styles.day}>
                            <Text style={[styles.dayLabel, { color: cores.secundario }]}>
                                {dia}
                            </Text>

                            <View
                                style={[
                                    styles.dot,
                                    { backgroundColor: ativo ? cores.ativo : cores.borda },
                                ]}
                            />
                        </View>
                    )
                })}
            </View>

            <View style={[styles.metrics, { borderTopColor: cores.borda }]}>
                <Metric label="Total de Treinos" value={String(totalTreinos)} corTexto={cores.texto} />
                <View style={[styles.divider, { backgroundColor: cores.borda }]} />
                <Metric label="Duração Média" value={duracaoMedia} corTexto={cores.texto} />
                <View style={[styles.divider, { backgroundColor: cores.borda }]} />
                <Metric label="Carga Total" value={cargaTotal} corTexto={cores.texto} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 16,
    },
    days: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    day: {
        alignItems: 'center',
        gap: 8,
    },
    dayLabel: {
        fontSize: 12,
    },
    dot: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    metrics: {
        flexDirection: 'row',
        alignItems: 'stretch',
        borderTopWidth: 1,
        paddingTop: 14,
    },
    metric: {
        flex: 1,
        alignItems: 'center',
    },
    metricLabel: {
        fontSize: 11,
        marginBottom: 4,
        textAlign: 'center',
    },
    metricValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    divider: {
        width: 1,
    },
})