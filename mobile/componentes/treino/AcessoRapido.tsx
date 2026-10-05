import useTema from '@/contextos/TemaContexto'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
    onPlanos?: () => void
    onEstatisticas?: () => void
    onDesafios?: () => void
    onAjustes?: () => void
}

type QuickItemProps = {
    icon: React.ReactNode
    label: string
    onPress?: () => void
    corCard: string
    corTexto: string
}

function QuickItem({ icon, label, onPress, corCard, corTexto }: QuickItemProps) {
    return (
        <TouchableOpacity style={[styles.item, { backgroundColor: corCard }]} onPress={onPress}>
            {icon}
            <Text style={[styles.label, { color: corTexto }]}>{label}</Text>
        </TouchableOpacity>
    )
}

export default function AcessoRapido({
    onPlanos,
    onEstatisticas,
    onDesafios,
    onAjustes,
}: Props) {
    const { temaAtual, formatarCor } = useTema()

    const cores = {
        card: formatarCor(temaAtual['--color-base-secundaria'], 1),
        texto: formatarCor(temaAtual['--color-t-primaria'], 1),
        planos: formatarCor(temaAtual['--color-destaque-p-medio'], 1),
        stats: formatarCor(temaAtual['--color-destaque-s-medio'], 1),
        desafios: formatarCor(temaAtual['--color-destaque-p-claro'], 1),
        ajustes: formatarCor(temaAtual['--color-contraste-primaria'], 1),
    }

    return (
        <View style={styles.container}>
            <QuickItem
                icon={<Ionicons name="clipboard-outline" size={22} color={cores.planos} />}
                label="Meus Planos"
                onPress={onPlanos}
                corCard={cores.card}
                corTexto={cores.texto}
            />

            <QuickItem
                icon={<MaterialCommunityIcons name="trending-up" size={22} color={cores.stats} />}
                label="Estatísticas"
                onPress={onEstatisticas}
                corCard={cores.card}
                corTexto={cores.texto}
            />

            <QuickItem
                icon={<Ionicons name="trophy-outline" size={22} color={cores.desafios} />}
                label="Desafios"
                onPress={onDesafios}
                corCard={cores.card}
                corTexto={cores.texto}
            />

            <QuickItem
                icon={<Ionicons name="settings-outline" size={22} color={cores.ajustes} />}
                label="Ajustes"
                onPress={onAjustes}
                corCard={cores.card}
                corTexto={cores.texto}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
    },
    item: {
        flex: 1,
        height: 75,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    label: {
        fontSize: 11,
        fontWeight: '500',
        textAlign: 'center',
    },
})