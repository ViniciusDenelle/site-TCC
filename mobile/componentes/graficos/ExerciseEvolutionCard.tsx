import { StyleSheet, Text, View } from 'react-native'
import useTema from '@/contextos/TemaContexto'

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
  const { temaAtual, formatarCor } = useTema()

  const corCard = formatarCor(temaAtual['--color-base-secundaria'], 1)
  const corTexto = formatarCor(temaAtual['--color-t-primaria'], 1)
  const corTextoSecundaria = formatarCor(temaAtual['--color-t-secundaria'], 1)

  return (
    <View style={[styles.card, { backgroundColor: corCard }]}>
      <Text style={[styles.title, { color: corTexto }]}>Evolução por exercício</Text>
      <Text style={[styles.subtitle, { color: corTextoSecundaria }]}>Comparação do seu progresso atual</Text>

      {exercicios.map(item => (
        <View key={item.nome} style={styles.row}>
          <View style={styles.rowHeader}>
            <Text style={[styles.exerciseName, { color: corTexto }]}>{item.nome}</Text>
            <Text style={[styles.percent, { color: corTextoSecundaria }]}>{item.progresso}%</Text>
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
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
    fontSize: 14,
    fontWeight: '600',
  },
  percent: {
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