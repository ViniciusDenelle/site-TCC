import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

type Props = {
    categorias: string[]
    selecionada: string
    onChange: (categoria: string) => void
}

export default function FiltroExercicio({
    categorias,
    selecionada,
    onChange,
}: Props) {

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >

            {categorias.map(categoria => {

                const ativo =
                    categoria === selecionada

                return (
                    <TouchableOpacity
                        key={categoria}
                        onPress={() => onChange(categoria)}
                        style={[
                            styles.chip,
                            ativo && styles.chipActive,
                        ]}
                    >

                        <Text
                            style={[
                                styles.text,
                                ativo && styles.textActive,
                            ]}
                        >
                            {categoria}
                        </Text>

                    </TouchableOpacity>
                )
            })}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    chip: {
        backgroundColor: '#1c1c1e',

        paddingHorizontal: 14,
        paddingVertical: 8,

        borderRadius: 20,

        marginRight: 8,
    },

    chipActive: {
        backgroundColor: '#ff5b5b',
    },

    text: {
        color: '#8e8e93',

        fontSize: 13,

        fontWeight: '500',
    },

    textActive: {
        color: '#ffffff',

        fontWeight: 'bold',
    },
})