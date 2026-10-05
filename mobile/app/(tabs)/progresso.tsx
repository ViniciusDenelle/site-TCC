import useTema from '@/contextos/TemaContexto'
import NutritionCard from '@/componentes/graficos/NutriCard'
import WeekBarChart from '@/componentes/graficos/WeekBarChart'
import StatsGrid from '@/componentes/graficos/StatsGrid'
import ExerciseStatsGrid from '@/componentes/graficos/ExerciseEvolutionCard'
import ExerciseWeekChart from '@/componentes/graficos/ExerciseWeekChart'
import ExerciseEvolutionCard from '@/componentes/graficos/ExerciseEvolutionCard'
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type AbaProgresso = 'dieta' | 'exercicios'

export default function Progresso() {
  const { temaAtual, formatarCor } = useTema()
  const [abaSelecionada, setAbaSelecionada] = useState<AbaProgresso>('dieta')

  const cores = {
    fundo: formatarCor(temaAtual['--color-base-primaria'], 1),
    card: formatarCor(temaAtual['--color-base-secundaria'], 1),
    texto: formatarCor(temaAtual['--color-t-primaria'], 1),
    secundario: formatarCor(temaAtual['--color-t-terciaria'], 1),
  }

  return (
    <ScrollView style={[styles.screen, { backgroundColor: cores.fundo }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: cores.texto }]}>Progresso</Text>
        <Text style={[styles.subtitle, { color: cores.secundario }]}>Acompanhe dieta e exercícios</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: cores.card }, abaSelecionada === 'dieta' && { backgroundColor: cores.texto }]}
          onPress={() => setAbaSelecionada('dieta')}
          activeOpacity={0.8}
        >
          <Text style={[styles.menuText, { color: cores.texto }, abaSelecionada === 'dieta' && { color: cores.fundo }]}>
            Dieta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: cores.card }, abaSelecionada === 'exercicios' && { backgroundColor: cores.texto }]}
          onPress={() => setAbaSelecionada('exercicios')}
          activeOpacity={0.8}
        >
          <Text style={[styles.menuText, { color: cores.texto }, abaSelecionada === 'exercicios' && { color: cores.fundo }]}>
            Exercícios
          </Text>
        </TouchableOpacity>
      </View>

      {abaSelecionada === 'dieta' ? (
        <>
          <StatsGrid ingeridoHoje={690} metaDiaria={2400} deficit={1710} refeicoesFeitas={2} refeicoesTotal={5} />
          <WeekBarChart />
          <NutritionCard protein={{ current: 165, goal: 180 }} carb={{ current: 280, goal: 300 }} fat={{ current: 68, goal: 70 }} />
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
  screen: { flex: 1 },
  content: { padding: 16 },
  header: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { fontSize: 14, marginTop: 4 },
  menuContainer: { flexDirection: 'row', marginBottom: 16, gap: 10 },
  menuButton: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  menuText: { fontWeight: '600' },
})