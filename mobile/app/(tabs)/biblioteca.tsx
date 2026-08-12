import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

import CardRotina from '../../componentes/biblioteca/CardRotina'

export default function BibliotecaScreen() {

    const rotinas = [
        {
            id: '1',
            nome: 'Full Body A',
            tipo: 'Iniciante',
            duracao: '45 min',
            exercicios: 3,
            cor: '#ff5b5b',
        },
        // ...
    ]

    return (
        <View style={styles.container}>

            <StatusBar style="light" />

            <View style={styles.header}>

                <Text style={styles.title}>
                    Minha Biblioteca
                </Text>

                <TouchableOpacity style={styles.add}>
                    <Ionicons
                        name="add"
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>

            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >

                <Text style={styles.subtitle}>
                    Suas rotinas e fichas salvas
                </Text>

                {rotinas.map(rotina => (
                    <CardRotina
                        key={rotina.id}
                        rotina={rotina}
                    />
                ))}

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e0f11',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

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

    add: {
        width: 40,
        height: 40,

        borderRadius: 20,

        backgroundColor: '#1c1c1e',

        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        padding: 16,
    },

    subtitle: {
        color: '#8e8e93',
        fontSize: 14,

        marginBottom: 20,
    },
})