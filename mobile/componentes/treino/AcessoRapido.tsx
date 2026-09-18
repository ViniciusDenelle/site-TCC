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
})import {
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons'

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

type Props = {
    onPlanos?: () => void
    onEstatisticas?: () => void
    onDesafios?: () => void
    onAjustes?: () => void
}

export default function AcessoRapido({
    onPlanos,
    onEstatisticas,
    onDesafios,
    onAjustes,
}: Props) {

    return (
        <View style={styles.container}>

            <QuickItem
                icon={
                    <Ionicons
import useTema from '@/contextos/TemaContexto'
                        name="clipboard-outline"
                        size={22}
                        color="#ff7b7b"
            const { temaAtual, formatarCor } = useTema()

            const cores = {
                card: formatarCor(temaAtual['--color-base-secundaria'], 1),
                label: formatarCor(temaAtual['--color-t-primaria'], 1),
                planos: formatarCor(temaAtual['--color-destaque-p-medio'], 1),
                stats: formatarCor(temaAtual['--color-destaque-s-medio'], 1),
                desafios: formatarCor(temaAtual['--color-destaque-p-claro'], 1),
                ajustes: formatarCor(temaAtual['--color-contraste-primaria'], 1),
            }
                    />
                }
                label="Meus Planos"
                onPress={onPlanos}
            />

                        color={cores.planos}
                icon={
                    <MaterialCommunityIcons
                        name="trending-up"
                        size={22}
                        color="#4cd964"
                    />
                }
                label="Estatísticas"
                onPress={onEstatisticas}
            />

                        color={cores.stats}
                icon={
                    <Ionicons
                        name="trophy-outline"
                        size={22}
                        color="#ffbd59"
                    />
                }
                label="Desafios"
                onPress={onDesafios}
            />

                        color={cores.desafios}
                icon={
                    <Ionicons
                        name="settings-outline"
                        size={22}
                        color="#aeaeb2"
                    />
                }
                label="Ajustes"
                onPress={onAjustes}
            />

                        color={cores.ajustes}
    )
}

type QuickItemProps = {
    icon: React.ReactNode
    label: string
    onPress?: () => void
}

function QuickItem({
    icon,
    label,
    onPress,
}: QuickItemProps) {

    return (
        <TouchableOpacity
            style={styles.item}
            onPress={onPress}
        >
            {icon}
        backgroundColor: '#1c1c1e',
            <Text style={styles.label}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },

    item: {
        flex: 1,

        height: 75,

        backgroundColor: '#1c1c1e',

        borderRadius: 12,

        alignItems: 'center',
        justifyContent: 'center',

        gap: 6,
    },

    label: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: '500',
        textAlign: 'center',
    },
})