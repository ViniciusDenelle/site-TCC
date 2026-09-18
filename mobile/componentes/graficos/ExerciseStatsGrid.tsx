import { StyleSheet, Text, View } from 'react-native'

type Card = {
  label: string
  value: string
  helper: string
  color: string
}

const cards: Card[] = [
  {
    label: 'Treinos feitos',
    value: '12',
    helper: 'na semana',
    color: '#4cd964',
  },
  {
    label: 'Tempo total',
    value: '6h 20m',
    helper: 'treinando',
    color: '#5ac8fa',
  },
  {
    label: 'Carga total',
    value: '8.4t',
    helper: 'levantada',
    color: '#ffbd59',
  },
  {
    label: 'Evolução',
    value: '+14%',
    helper: 'últimos 7 dias',
    color: '#ff5b5b',
  },
]

export default function ExerciseStatsGrid() {
  return (
    <View style={styles.container}>
      {cards.map(card => (
        <View key={card.label} style={styles.card}>
          <View style={[styles.dot, { backgroundColor: card.color }]} />
          <Text style={styles.value}>{card.value}</Text>
          <Text style={styles.label}>{card.label}</Text>
          <Text style={styles.helper}>{card.helper}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '48%',
    backgroundColor: '#1d2230',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  value: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  label: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
  },
  helper: {
    color: '#9aa0aa',
    fontSize: 12,
    marginTop: 2,
  },
})