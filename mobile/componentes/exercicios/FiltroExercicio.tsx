import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import useTema from '@/contextos/TemaContexto'

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
    const { temaAtual, formatarCor } = useTema()

    const corBase = formatarCor(temaAtual['--color-base-secundaria'], 1)
    const corDestaque = formatarCor(temaAtual['--color-destaque-p-claro'], 1)
    const corTexto = formatarCor(temaAtual['--color-t-primaria'], 1)
    const corTextoSecundaria = formatarCor(temaAtual['--color-t-secundaria'], 1)

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
                            { backgroundColor: corBase },
                            ativo && { backgroundColor: corDestaque },
                        ]}
                    >

                        <Text
                            style={[
                                styles.text,
                                { color: corTextoSecundaria },
                                ativo && { color: corTexto, fontWeight: 'bold' },
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
        paddingHorizontal: 14,
        paddingVertical: 8,

        borderRadius: 20,

        marginRight: 8,
    },

    text: {
        fontSize: 13,

        fontWeight: '500',
    },
})