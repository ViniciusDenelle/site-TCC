import { useState } from 'react'

import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { StatusBar } from 'expo-status-bar'

import BarraBuscaExercicio
    from '../../componentes/exercicios/BarraBuscaExercicio'

import FiltroExercicio
    from '../../componentes/exercicios/FiltroExercicio'

import CardExercicio
    from '../../componentes/exercicios/CardExercicio'

export default function ExerciciosScreen() {

    const [busca, setBusca] = useState('')
    const [categoria, setCategoria] = useState('Todos')

    // Depois isso virá da API
    const exercicios = [
        {
            id: '1',
            nome: 'Supino Reto com Barra',
            grupo: 'Peito',
            icone: 'dumbbell',
        },
        // ...
    ]

    const filtrados = exercicios.filter(ex => {

        const buscaOk =
            ex.nome
                .toLowerCase()
                .includes(busca.toLowerCase())

        const categoriaOk =
            categoria === 'Todos' ||
            ex.grupo === categoria

        return buscaOk && categoriaOk
    })

    return (
        <View style={styles.container}>

            <StatusBar style="light" />

            <View style={styles.header}>
                <Text style={styles.title}>
                    Exercícios
                </Text>
            </View>

            <View style={styles.search}>
                <BarraBuscaExercicio
                    valor={busca}
                    onChange={setBusca}
                />
            </View>

            <FiltroExercicio
                categorias={[
                    'Todos',
                    'Peito',
                    'Costas',
                    'Pernas',
                    'Braços',
                    'Ombros',
                ]}
                selecionada={categoria}
                onChange={setCategoria}
            />

            <Text style={styles.sectionTitle}>
                Todos os Exercícios
            </Text>

            <FlatList
                data={filtrados}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <CardExercicio
                        exercicio={item}
                    />
                )}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e0f11',
    },

    header: {
        paddingHorizontal: 16,
        paddingVertical: 15,

        borderBottomWidth: 1,
        borderBottomColor: '#1c1c1e',
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
    },

    search: {
        padding: 16,
        paddingBottom: 12,
    },

    sectionTitle: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',

        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 12,
    },

    list: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },
})