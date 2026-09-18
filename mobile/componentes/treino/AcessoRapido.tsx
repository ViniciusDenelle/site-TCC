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
                        name="clipboard-outline"
                        size={22}
                        color="#ff7b7b"
                    />
                }
                label="Meus Planos"
                onPress={onPlanos}
            />

            <QuickItem
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

            <QuickItem
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

            <QuickItem
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

        </View>
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

            <Text style={styles.label}>
                {label}
            </Text>
        </TouchableOpacity>
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