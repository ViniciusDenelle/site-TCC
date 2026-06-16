import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const userName = "Lucas";
  const metaAtual = 4;
  const metaTotal = 5;
  const progressoPorcentagem = (metaAtual / metaTotal) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* CABEÇALHO DE BOAS-VINDAS */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greetingText}>
            Olá, <Text style={styles.highlightText}>{userName}</Text>
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>Meta da Semana: {metaAtual}/{metaTotal} treinos</Text>
          </View>
          
          {/* BARRA DE PROGRESSO */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressBar, { width: `${progressoPorcentagem}%` }]} />
          </View>
          <Text style={styles.quoteText}>"Você se motiva agindo, o movimento traz energia."</Text>
        </View>

        {/* SEÇÃO: TREINO DE HOJE */}
        <Text style={styles.sectionTitle}>Treino de Hoje</Text>
        <View style={styles.mainCard}>
          <View style={styles.mainCardHeader}>
            <View>
              <Text style={styles.mainCardTitle}>Full Body A</Text>
              <Text style={styles.mainCardSub}>📋 Iniciante  •  ⏱️ 45 min</Text>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Começar Agora</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.timeAgo}>Usado há 2 dias</Text>
          
          <View style={styles.exerciseRow}>
            <Text style={styles.exerciseCount}>3 exercícios</Text>
            <View style={styles.miniIconsGroup}>
              <View style={styles.miniIconBg}><MaterialCommunityIcons name="arm-flex" size={14} color="#ffbe59" /></View>
              <View style={styles.miniIconBg}><MaterialCommunityIcons name="arm-flex" size={14} color="#ffbe59" /></View>
              <View style={styles.miniIconBg}><MaterialCommunityIcons name="run" size={14} color="#ffbe59" /></View>
            </View>
          </View>
        </View>

        {/* SEÇÃO: RESUMO SEMANAL */}
        <Text style={styles.sectionTitle}>Resumo Semanal</Text>
        <View style={styles.summaryCard}>
          <View style={styles.daysRow}>
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, idx) => {
              const active = idx < 4; // Ativa os primeiros 4 dias como no mockup
              return (
                <View key={day} style={styles.dayCol}>
                  <Text style={styles.dayLabel}>{day}</Text>
                  <View style={[styles.dayDot, active && styles.dayDotActive]} />
                </View>
              );
            })}
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricBox}>
              <Text style={styles.metricSub}>Total de Treinos</Text>
              <Text style={styles.metricValue}>12</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricBox}>
              <Text style={styles.metricSub}>Duração Média</Text>
              <Text style={styles.metricValue}>45 min</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricBox}>
              <Text style={styles.metricSub}>Carga Total</Text>
              <Text style={styles.metricValue}>200 kg</Text>
            </View>
          </View>
        </View>

        {/* SEÇÃO: DESTAQUES E NOVIDADES (CAROUSEL HORIZONTAL) */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Destaques e Novidades</Text>
          <Ionicons name="chevron-forward" size={18} color="#8e8e93" style={{ marginTop: 25 }} />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <View style={styles.newsCard}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400' }} style={styles.newsImage} />
            <View style={styles.newsContent}>
              <Text style={styles.newsTag}>Novo Plano:</Text>
              <Text style={styles.newsTitle}>Treino de Verão</Text>
            </View>
          </View>

          <View style={styles.newsCard}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400' }} style={styles.newsImage} />
            <View style={styles.newsContent}>
              <Text style={styles.newsTag}>Artigo:</Text>
              <Text style={styles.newsTitle}>Recuperação Muscular</Text>
            </View>
          </View>
        </ScrollView>

        {/* SEÇÃO: ACESSO RÁPIDO */}
        <Text style={styles.sectionTitle}>Acesso Rápido</Text>
        <View style={styles.quickAccessGrid}>
          <TouchableOpacity style={styles.quickBox}>
            <Ionicons name="clipboard-outline" size={22} color="#ff7b7b" />
            <Text style={styles.quickText}>Meus Planos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBox}>
            <MaterialCommunityIcons name="trending-up" size={22} color="#4cd964" />
            <Text style={styles.quickText}>Estatísticas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBox}>
            <Ionicons name="trophy-outline" size={22} color="#ffbd59" />
            <Text style={styles.quickText}>Desafios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBox}>
            <Ionicons name="settings-outline" size={22} color="#aeaeb2" />
            <Text style={styles.quickText}>Ajustes</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0f11',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  welcomeSection: {
    marginTop: 15,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  highlightText: {
    color: '#ff5b5b',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metaText: {
    color: '#aeaeb2',
    fontSize: 14,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#1c1c1e',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ff5b5b',
  },
  quoteText: {
    color: '#636366',
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 25,
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // CARD DE DESTAQUE DO TREINO
  mainCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 16,
  },
  mainCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  mainCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  mainCardSub: {
    color: '#8e8e93',
    fontSize: 13,
    marginTop: 4,
  },
  actionButton: {
    backgroundColor: '#ff5b5b',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  timeAgo: {
    color: '#636366',
    fontSize: 12,
    marginTop: 12,
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#2c2c2e',
    paddingTop: 12,
  },
  exerciseCount: {
    color: '#aeaeb2',
    fontSize: 13,
  },
  miniIconsGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  miniIconBg: {
    backgroundColor: '#2c2c2e',
    padding: 6,
    borderRadius: 6,
  },
  // CARD DE RESUMO SEMANAL
  summaryCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 16,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayCol: {
    alignItems: 'center',
    gap: 8,
  },
  dayLabel: {
    color: '#8e8e93',
    fontSize: 12,
  },
  dayDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2c2c2e',
  },
  dayDotActive: {
    backgroundColor: '#ff5b5b',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#2c2c2e',
    paddingTop: 14,
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
  },
  metricSub: {
    color: '#8e8e93',
    fontSize: 11,
    marginBottom: 4,
  },
  metricValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  metricDivider: {
    width: 1,
    backgroundColor: '#2c2c2e',
  },
  // NOVIDADES (HORIZONTAL)
  horizontalScroll: {
    overflow: 'visible',
  },
  newsCard: {
    width: width * 0.42,
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: 90,
  },
  newsContent: {
    padding: 10,
  },
  newsTag: {
    color: '#8e8e93',
    fontSize: 11,
  },
  newsTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  // ACESSO RÁPIDO
  quickAccessGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  quickBox: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    gap: 6,
  },
  quickText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
});