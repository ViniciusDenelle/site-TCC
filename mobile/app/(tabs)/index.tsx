import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { StatusBar } from 'expo-status-bar'

import SaudacaoUsuario from '../../componentes/treino/SaudacaoUsuario'
import ProgressoSemana from '../../componentes/treino/ProgressoSemana'
import CardTreinoHoje from '../../componentes/treino/CardTreinoHoje'
import CardResumoSemanal from '../../componentes/treino/CardResumoSemanal'
import DestaquesHorizontal from '../../componentes/treino/DestaquesHorizontal'
import AcessoRapido from '../../componentes/treino/AcessoRapido'

export default function HomeScreen() {

    return (
        <View style={styles.container}>

            <StatusBar style="light" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                <SaudacaoUsuario
                    nome="Lucas"
                    metaAtual={4}
                    metaTotal={5}
                />

                <ProgressoSemana
                    atual={4}
                    total={5}
                />

                <Text style={styles.sectionTitle}>
                    Treino de Hoje
                </Text>

                <CardTreinoHoje
                    nome="Full Body A"
                    nivel="Iniciante"
                    duracao="45 min"
                    quantidadeExercicios={3}
                    usadoHa="2 dias"
                    onPress={() => {
                        console.log('Começar treino')
                    }}
                />

                <Text style={styles.sectionTitle}>
                    Resumo Semanal
                </Text>

                <CardResumoSemanal
                    diasTreinados={4}
                    totalTreinos={12}
                    duracaoMedia="45 min"
                    cargaTotal="200 kg"
                />

                <Text style={styles.sectionTitle}>
                    Destaques e Novidades
                </Text>

                <DestaquesHorizontal
                    destaques={[
                        {
                            id: '1',
                            imagem: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400',
                            tipo: 'Novo Plano',
                            titulo: 'Treino de Verão',
                        },
                        {
                            id: '2',
                            imagem: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400',
                            tipo: 'Artigo',
                            titulo: 'Recuperação Muscular',
                        },
                    ]}
                />

                <Text style={styles.sectionTitle}>
                    Acesso Rápido
                </Text>

                <AcessoRapido />

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e0f11',
    },

    content: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',

        marginTop: 25,
        marginBottom: 12,
    },
})