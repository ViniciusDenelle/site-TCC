import { ScrollView, StyleSheet, Text, View } from 'react-native'

import SaudacaoUsuario from '../../componentes/treino/SaudacaoUsuario'
import ProgressoSemana from '../../componentes/treino/ProgressoSemana'
import CardTreinoHoje from '../../componentes/treino/CardTreinoHoje'
import CardResumoSemanal from '../../componentes/treino/CardResumoSemanal'
import AcessoRapido from '../../componentes/treino/AcessoRapido'
import DestaquesHorizontal, {
    Destaque,
} from '@/componentes/treino/DestaquesHorizontal'

const destaques: Destaque[] = [
    {
        id: '1',
        imagem: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
        tipo: 'TREINO',
        titulo: 'Como melhorar seu treino de peito',
    },
    {
        id: '2',
        imagem: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e',
        tipo: 'DICA',
        titulo: '5 dicas para aumentar sua força',
    },
    {
        id: '3',
        imagem: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
        tipo: 'MOTIVAÇÃO',
        titulo: 'Consistência é a chave',
    },
]

export default function Treinos() {

    const nomeUsuario = 'Guilherme'

    const metaAtual = 3
    const metaTotal = 5

    const treinoHoje = {
        nome: 'Treino A',
        nivel: 'Intermediário',
        duracao: '45 min',
        quantidadeExercicios: 8,
        usadoHa: '2 dias',
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >

            {/* SAUDAÇÃO */}

            <SaudacaoUsuario
                nome={nomeUsuario}
                metaAtual={metaAtual}
                metaTotal={metaTotal}
            />

            {/* PROGRESSO DA SEMANA */}

            <ProgressoSemana
                atual={metaAtual}
                total={metaTotal}
            />

            {/* TREINO DE HOJE */}

            <View style={styles.section}>

                <Text style={styles.sectionTitle}>
                    Treino de Hoje
                </Text>

                <CardTreinoHoje
                    nome={treinoHoje.nome}
                    nivel={treinoHoje.nivel}
                    duracao={treinoHoje.duracao}
                    quantidadeExercicios={
                        treinoHoje.quantidadeExercicios
                    }
                    usadoHa={treinoHoje.usadoHa}
                    onPress={() => {
                        console.log('Começar treino')
                    }}
                />

            </View>

            {/* RESUMO SEMANAL */}

            <View style={styles.section}>

                <Text style={styles.sectionTitle}>
                    Resumo da Semana
                </Text>

                <CardResumoSemanal
                    diasTreinados={3}
                    totalTreinos={3}
                    duracaoMedia="48 min"
                    cargaTotal="2.450 kg"
                />

            </View>

            {/* ACESSO RÁPIDO */}

            <View style={styles.section}>

                <Text style={styles.sectionTitle}>
                    Acesso Rápido
                </Text>

                <AcessoRapido
                    onPlanos={() => {
                        console.log('Meus planos')
                    }}
                    onEstatisticas={() => {
                        console.log('Estatísticas')
                    }}
                    onDesafios={() => {
                        console.log('Desafios')
                    }}
                    onAjustes={() => {
                        console.log('Ajustes')
                    }}
                />

            </View>

            {/* DESTAQUES */}

            <View style={styles.section}>

                <Text style={styles.sectionTitle}>
                    Destaques
                </Text>

                <DestaquesHorizontal
                    destaques={destaques}
                    onPress={(item) => {
                        console.log(
                            'Destaque selecionado:',
                            item.titulo
                        )
                    }}
                />

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000000',
    },

    content: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },

    section: {
        marginTop: 24,
    },

    sectionTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },

})