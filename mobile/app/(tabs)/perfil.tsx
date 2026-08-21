import { useMemo, useState } from 'react'

import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

import CardRotina, {
    Rotina,
} from '@/componentes/biblioteca/CardRotina'

const rotinas: Rotina[] = [
    {
        id: '1',
        nome: 'Treino A',
        tipo: 'Peito e Tríceps',
        duracao: '45 min',
        exercicios: 8,
        cor: '#ff5b5b',
    },
    {
        id: '2',
        nome: 'Treino B',
        tipo: 'Costas e Bíceps',
        duracao: '50 min',
        exercicios: 9,
        cor: '#4cd964',
    },
    {
        id: '3',
        nome: 'Treino C',
        tipo: 'Pernas',
        duracao: '60 min',
        exercicios: 10,
        cor: '#ffbd59',
    },
    {
        id: '4',
        nome: 'Treino D',
        tipo: 'Ombros e Abdômen',
        duracao: '40 min',
        exercicios: 7,
        cor: '#5ac8fa',
    },
]

export default function Biblioteca() {

    const [busca, setBusca] = useState('')

    const rotinasFiltradas = useMemo(() => {

        return rotinas.filter(rotina =>
            rotina.nome
                .toLowerCase()
                .includes(busca.toLowerCase())
        )

    }, [busca])

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>

                <Text style={styles.title}>
                    Biblioteca
                </Text>

                <Text style={styles.subtitle}>
                    Suas rotinas de treino
                </Text>

            </View>

            <View style={styles.searchContainer}>

                <TextInput
                    value={busca}
                    onChangeText={setBusca}
                    placeholder="Buscar rotina..."
                    placeholderTextColor="#636366"
                    style={styles.search}
                />

            </View>

            <FlatList
                data={rotinasFiltradas}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (

                    <CardRotina
                        rotina={item}
                        onPress={(rotina) => {
                            console.log(
                                'Rotina selecionada:',
                                rotina.nome
                            )
                        }}
                    />

                )}
                ListEmptyComponent={
                    <View style={styles.empty}>

                        <Text style={styles.emptyText}>
                            Nenhuma rotina encontrada.
                        </Text>

                    </View>
                }
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000000',
    },

    header: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
    },

    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
    },

    subtitle: {
        color: '#8e8e93',
        fontSize: 14,
        marginTop: 4,
    },

    searchContainer: {
        paddingHorizontal: 16,
        marginBottom: 8,
    },

    search: {
        height: 40,
        backgroundColor: '#1c1c1e',
        borderRadius: 10,

        paddingHorizontal: 14,

        color: '#ffffff',
        fontSize: 15,
    },

    list: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 30,
    },

    empty: {
        alignItems: 'center',
        paddingTop: 40,
    },

    emptyText: {
        color: '#8e8e93',
        fontSize: 14,
    },

})