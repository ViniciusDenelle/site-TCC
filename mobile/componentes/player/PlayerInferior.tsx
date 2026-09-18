import {
    Ionicons,
} from '@expo/vector-icons'

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

type Props = {
    titulo?: string
    artista?: string
    tocando?: boolean
    onPress?: () => void
    onPlayPause?: () => void
}

export default function PlayerInferior({
    titulo = 'Nenhuma música',
    artista = '',
    tocando = false,
    onPress,
    onPlayPause,
}: Props) {

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.9}
        >

            <View style={styles.info}>

                <Text
                    style={styles.title}
                    numberOfLines={1}
                >
                    {titulo}
                </Text>

                {artista !== '' && (
                    <Text
                        style={styles.artist}
                        numberOfLines={1}
                    >
                        {artista}
                    </Text>
                )}

            </View>

            <TouchableOpacity
                onPress={onPlayPause}
                style={styles.playButton}
            >

                <Ionicons
                    name={
                        tocando
                            ? 'pause'
                            : 'play'
                    }
                    size={20}
                    color="#ffffff"
                />

            </TouchableOpacity>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 55,

        backgroundColor: '#18181a',

        borderTopWidth: 1,
        borderTopColor: '#2c2c2e',

        flexDirection: 'row',

        alignItems: 'center',

        paddingHorizontal: 16,
    },

    info: {
        flex: 1,
        marginRight: 12,
    },

    title: {
        color: '#ffffff',

        fontSize: 14,

        fontWeight: '600',
    },

    artist: {
        color: '#8e8e93',

        fontSize: 11,

        marginTop: 2,
    },

    playButton: {
        width: 38,
        height: 38,

        borderRadius: 19,

        backgroundColor: '#ff5b5b',

        alignItems: 'center',
        justifyContent: 'center',
    },
})