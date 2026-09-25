
import { StyleSheet, Text, View } from 'react-native'

import useTema from '@/contextos/TemaContexto'

type Props = {
  nome: string
  metaAtual: number
  metaTotal: number
}

export default function SaudacaoUsuario({
  nome,
  metaAtual,
  metaTotal,
}: Props) {
  const { temaAtual, formatarCor } = useTema()

  const cores = {
    texto: formatarCor(
      temaAtual['--color-t-primaria'],
      1
    ),

    destaque: formatarCor(
      temaAtual['--color-destaque-p-medio'],
      1
    ),

    meta: formatarCor(
      temaAtual['--color-t-terciaria'],
      1
    ),
  }

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.greeting,
          { color: cores.texto },
        ]}
      >
        Olá,{' '}
        <Text
          style={[
            styles.highlight,
            { color: cores.destaque },
          ]}
        >
          {nome}
        </Text>
      </Text>

      <Text
        style={[
          styles.meta,
          { color: cores.meta },
        ]}
      >
        Meta da Semana: {metaAtual}/{metaTotal} treinos
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },

  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  highlight: {
    fontWeight: 'bold',
  },

  meta: {
    fontSize: 14,
    marginTop: 8,
  },
})

