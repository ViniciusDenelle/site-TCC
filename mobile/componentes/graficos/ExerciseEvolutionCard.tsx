import { StyleSheet, Text, View } from 'react-native'

type Exercicio = {
  nome: string
  progresso: number
  cor: string
}

const exercicios: Exercicio[] = [
  { nome: 'Supino reto', progresso: 78, cor: '#4cd964' },
  { nome: 'Agachamento', progresso: 64, cor: '#ffbd59' },
  { nome: 'Puxada frontal', progresso: 52, cor: '#5ac8fa' },
  { nome: 'Rosca direta', progresso: 87, cor: '#ff5b5b' },
]

export default function ExerciseEvolutionCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Evolução por exercício</Text>
      <Text style={styles.subtitle}>Comparação do seu progresso atual</Text>

      {exercicios.map(item => (
        <View key={item.nome} style={styles.row}>
          <View style={styles.rowHeader}>
            <Text style={styles.exerciseName}>{item.nome}</Text>
            <Text style={styles.percent}>{item.progresso}%</Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${item.progresso}%`,
                  backgroundColor: item.cor,
                },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1d2230',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: '#9aa0aa',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 14,
  },
  row: {
    marginBottom: 14,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  exerciseName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  percent: {
    color: '#9aa0aa',
    fontSize: 13,
    fontWeight: '600',
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#12141c',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
})