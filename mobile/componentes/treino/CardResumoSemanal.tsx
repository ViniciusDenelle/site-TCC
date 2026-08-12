import { StyleSheet, Text, View } from 'react-native'

type Props = {
    diasTreinados: number
    totalTreinos: number
    duracaoMedia: string
    cargaTotal: string
}

const dias = [
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb',
    'Dom',
]

export default function CardResumoSemanal({
    diasTreinados,
    totalTreinos,
    duracaoMedia,
    cargaTotal,
}: Props) {

    return (
        <View style={styles.card}>

            <View style={styles.days}>

                {dias.map((dia, index) => {

                    const ativo = index < diasTreinados

                    return (
                        <View
                            key={dia}
                            style={styles.day}
                        >
                            <Text style={styles.dayLabel}>
                                {dia}
                            </Text>

                            <View
                                style={[
                                    styles.dot,
                                    ativo && styles.dotActive,
                                ]}
                            />
                        </View>
                    )
                })}

            </View>

            <View style={styles.metrics}>

                <Metric
                    label="Total de Treinos"
                    value={String(totalTreinos)}
                />

                <View style={styles.divider} />

                <Metric
                    label="Duração Média"
                    value={duracaoMedia}
                />

                <View style={styles.divider} />

                <Metric
                    label="Carga Total"
                    value={cargaTotal}
                />

            </View>

        </View>
    )
}

type MetricProps = {
    label: string
    value: string
}

function Metric({
    label,
    value,
}: MetricProps) {

    return (
        <View style={styles.metric}>

            <Text style={styles.metricLabel}>
                {label}
            </Text>

            <Text style={styles.metricValue}>
                {value}
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1c1c1e',
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
        color: '#8e8e93',
        fontSize: 12,
    },

    dot: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#2c2c2e',
    },

    dotActive: {
        backgroundColor: '#ff5b5b',
    },

    metrics: {
        flexDirection: 'row',
        alignItems: 'stretch',

        borderTopWidth: 1,
        borderTopColor: '#2c2c2e',

        paddingTop: 14,
    },

    metric: {
        flex: 1,
        alignItems: 'center',
    },

    metricLabel: {
        color: '#8e8e93',
        fontSize: 11,
        marginBottom: 4,
        textAlign: 'center',
    },

    metricValue: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    divider: {
        width: 1,
        backgroundColor: '#2c2c2e',
    },
})