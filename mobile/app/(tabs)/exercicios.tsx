import { useMemo, useState } from 'react'

import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import BarraBuscaExercicio from '../../componentes/exercicios/BarraBuscaExercicio'
import CardExercicio, {
    Exercicio,
} from '../../componentes/exercicios/CardExercicio'
import FiltroExercicio from '../../componentes/exercicios/FiltroExercicio'

const exercicios: Exercicio[] = [
    {
        id: '1',
        nome: 'Supino reto',
        grupo: 'Peito',
        icone: 'weight-lifter',
    },
    {
        id: '2',
        nome: 'Supino inclinado',
        grupo: 'Peito',
        icone: 'weight-lifter',
    },
    {
        id: '3',
        nome: 'Agachamento livre',
        grupo: 'Pernas',
        icone: 'human',
    },
    {
        id: '4',
        nome: 'Leg Press',
        grupo: 'Pernas',
        icone: 'human',
    },
    {
        id: '5',
        nome: 'Rosca direta',
        grupo: 'Bíceps',
        icone: 'arm-flex',
    },
    {
        id: '6',
        nome: 'Tríceps pulley',
        grupo: 'Tríceps',
        icone: 'arm-flex',
    },
    {
        id: '7',
        nome: 'Puxada frontal',
        grupo: 'Costas',
        icone: 'weight-lifter',
    },
    {
        id: '8',
        nome: 'Elevação lateral',
        grupo: 'Ombros',
        icone: 'arm-flex',
    },
]

export default function Exercicios() {

    const [busca, setBusca] = useState('')
    const [categoria, setCategoria] = useState('Todos')

    const categorias = [
        'Todos',
        'Peito',
        'Costas',
        'Pernas',
        'Bíceps',
        'Tríceps',
        'Ombros',
    ]

    const exerciciosFiltrados = useMemo(() => {

        return exercicios.filter(exercicio => {

            const correspondeCategoria =
                categoria === 'Todos' ||
                exercicio.grupo === categoria

            const correspondeBusca =
                exercicio.nome
                    .toLowerCase()
                    .includes(busca.toLowerCase())

            return correspondeCategoria && correspondeBusca
        })

    }, [busca, categoria])

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>

                <Text style={styles.title}>
                    Exercícios
                </Text>

                <Text style={styles.subtitle}>
                    Escolha um exercício para adicionar ao treino
                </Text>

            </View>

            <View style={styles.searchContainer}>

                <BarraBuscaExercicio
                    valor={busca}
                    onChange={setBusca}
                />

            </View>

            <View style={styles.filterContainer}>

                <FiltroExercicio
                    categorias={categorias}
                    selecionada={categoria}
                    onChange={setCategoria}
                />

            </View>

            <FlatList
                data={exerciciosFiltrados}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (

                    <CardExercicio
                        exercicio={item}
                        onPress={(exercicio) => {
                            console.log(
                                'Exercício selecionado:',
                                exercicio.nome
                            )
                        }}
                    />

                )}
                ListEmptyComponent={
                    <View style={styles.empty}>

                        <Text style={styles.emptyText}>
                            Nenhum exercício encontrado.
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
    },

    filterContainer: {
        marginTop: 14,
        paddingLeft: 16,
    },

    list: {
        paddingHorizontal: 16,
        paddingTop: 16,
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