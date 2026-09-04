import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import NutritionCard from '@/componentes/graficos/NutriCard'
import WeekBarChart from '@/componentes/graficos/WeekBarChart'
import StatsGrid from '@/componentes/graficos/StatsGrid'
import ExerciseStatsGrid from '@/componentes/graficos/ExerciseEvolutionCard'
import ExerciseWeekChart from '@/componentes/graficos/ExerciseWeekChart'
import ExerciseEvolutionCard from '@/componentes/graficos/ExerciseEvolutionCard'

type AbaProgresso = 'dieta' | 'exercicios'

export default function Progresso() {
  const [abaSelecionada, setAbaSelecionada] = useState<AbaProgresso>('dieta')

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Progresso</Text>
        <Text style={styles.subtitle}>Acompanhe dieta e exercícios</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[
            styles.menuButton,
            abaSelecionada === 'dieta' && styles.menuButtonAtivo,
          ]}
          onPress={() => setAbaSelecionada('dieta')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.menuText,
              abaSelecionada === 'dieta' && styles.menuTextAtivo,
            ]}
          >
            Dieta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuButton,
            abaSelecionada === 'exercicios' && styles.menuButtonAtivo,
          ]}
          onPress={() => setAbaSelecionada('exercicios')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.menuText,
              abaSelecionada === 'exercicios' && styles.menuTextAtivo,
            ]}
          >
            Exercícios
          </Text>
        </TouchableOpacity>
      </View>

      {abaSelecionada === 'dieta' ? (
        <>
          <StatsGrid
            ingeridoHoje={690}
            metaDiaria={2400}
            deficit={1710}
            refeicoesFeitas={2}
            refeicoesTotal={5}
          />

          <WeekBarChart />

          <NutritionCard
            protein={{ current: 165, goal: 180 }}
            carb={{ current: 280, goal: 300 }}
            fat={{ current: 68, goal: 70 }}
          />
        </>
      ) : (
        <>
          <ExerciseStatsGrid />
          <ExerciseWeekChart />
          <ExerciseEvolutionCard />
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#12141c',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#9aa0aa',
    fontSize: 14,
    marginTop: 4,
  },
  menuContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  menuButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1d2230',
    alignItems: 'center',
    marginRight: 10,
  },
  menuButtonAtivo: {
    backgroundColor: '#ffffff',
  },
  menuText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  menuTextAtivo: {
    color: '#000000',
  },
})