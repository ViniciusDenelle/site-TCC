import { StyleSheet, Text, View } from 'react-native'

type Dia = {
  dia: string
  valor: number
}

const dados: Dia[] = [
  { dia: 'S', valor: 2 },
  { dia: 'T', valor: 4 },
  { dia: 'Q', valor: 3 },
  { dia: 'Q', valor: 5 },
  { dia: 'S', valor: 1 },
  { dia: 'S', valor: 4 },
  { dia: 'D', valor: 3 },
]

export default function ExerciseWeekChart() {
  const max = Math.max(...dados.map(item => item.valor))

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Treinos na semana</Text>
      <Text style={styles.subtitle}>Quantidade de sessões por dia</Text>

      <View style={styles.chart}>
        {dados.map((item, index) => {
          const altura = (item.valor / max) * 120

          return (
            <View key={`${item.dia}-${index}`} style={styles.barItem}>
              <View style={styles.barContainer}>
                <View style={[styles.bar, { height: altura }]} />
              </View>
              <Text style={styles.day}>{item.dia}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1d2230',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  barItem: {
    flex: 1,
    alignItems: 'center',
  },
  barContainer: {
    width: 22,
    height: 120,
    justifyContent: 'flex-end',
    backgroundColor: '#12141c',
    borderRadius: 11,
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    backgroundColor: '#5ac8fa',
    borderRadius: 11,
  },
  day: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 8,
  },
})