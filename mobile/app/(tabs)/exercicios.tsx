
import { useMemo, useState } from 'react'
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import useTema from '@/contextos/TemaContexto'

import CardExercicio, {
  Exercicio,
} from '../../componentes/exercicios/CardExercicio'

import BarraBuscaExercicio from '../../componentes/exercicios/BarraBuscaExercicio'

import FiltroExercicio from '../../componentes/exercicios/FiltroExercicio'

import CardRotina, {
  Rotina,
} from '@/componentes/biblioteca/CardRotina'

type AbaSelecionada = 'exercicios' | 'biblioteca'

const exercicios: Exercicio[] = [
  {
    id: '1',
    nome: 'Supino reto',
    grupo: 'Peito',
    icone: 'weight-lifter',
  },
  {
    id: '2',
    nome: 'Supino inclinado',
    grupo: 'Peito',
    icone: 'weight-lifter',
  },
  {
    id: '3',
    nome: 'Agachamento livre',
    grupo: 'Pernas',
    icone: 'human',
  },
  {
    id: '4',
    nome: 'Leg Press',
    grupo: 'Pernas',
    icone: 'human',
  },
  {
    id: '5',
    nome: 'Rosca direta',
    grupo: 'Bíceps',
    icone: 'arm-flex',
  },
  {
    id: '6',
    nome: 'Tríceps pulley',
    grupo: 'Tríceps',
    icone: 'arm-flex',
  },
  {
    id: '7',
    nome: 'Puxada frontal',
    grupo: 'Costas',
    icone: 'weight-lifter',
  },
  {
    id: '8',
    nome: 'Elevação lateral',
    grupo: 'Ombros',
    icone: 'arm-flex',
  },
]

const rotinas: Rotina[] = [
  {
    id: '1',
    nome: 'Treino A',
    tipo: 'Peito e Tríceps',
    duracao: '45 min',
    exercicios: 8,
    cor: '#ff5b5b',
  },
  {
    id: '2',
    nome: 'Treino B',
    tipo: 'Costas e Bíceps',
    duracao: '50 min',
    exercicios: 9,
    cor: '#4cd964',
  },
  {
    id: '3',
    nome: 'Treino C',
    tipo: 'Pernas',
    duracao: '60 min',
    exercicios: 10,
    cor: '#ffbd59',
  },
  {
    id: '4',
    nome: 'Treino D',
    tipo: 'Ombros e Abdômen',
    duracao: '40 min',
    exercicios: 7,
    cor: '#5ac8fa',
  },
]

export default function Exercicios() {
  const { temaAtual, formatarCor } = useTema()

  const [abaSelecionada, setAbaSelecionada] =
    useState<AbaSelecionada>('exercicios')

  const [buscaExercicio, setBuscaExercicio] = useState('')
  const [categoria, setCategoria] = useState('Todos')
  const [buscaRotina, setBuscaRotina] = useState('')

  const cores = {
    fundo: formatarCor(temaAtual['--color-base-primaria'], 1),
    card: formatarCor(temaAtual['--color-base-secundaria'], 1),
    texto: formatarCor(temaAtual['--color-t-primaria'], 1),
    secundario: formatarCor(temaAtual['--color-t-terciaria'], 1),
    destaque: formatarCor(
      temaAtual['--color-destaque-p-medio'],
      1
    ),
    contraste: formatarCor(
      temaAtual['--color-contraste-primaria'],
      1
    ),
  }

  const categorias = [
    'Todos',
    'Peito',
    'Costas',
    'Pernas',
    'Bíceps',
    'Tríceps',
    'Ombros',
  ]

  const exerciciosFiltrados = useMemo(() => {
    return exercicios.filter((exercicio) => {
      const correspondeCategoria =
        categoria === 'Todos' ||
        exercicio.grupo === categoria

      const correspondeBusca = exercicio.nome
        .toLowerCase()
        .includes(buscaExercicio.toLowerCase())

      return correspondeCategoria && correspondeBusca
    })
  }, [buscaExercicio, categoria])

  const rotinasFiltradas = useMemo(() => {
    return rotinas.filter((rotina) =>
      rotina.nome
        .toLowerCase()
        .includes(buscaRotina.toLowerCase())
    )
  }, [buscaRotina])

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: cores.fundo },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: cores.texto },
          ]}
        >
          Treinos
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: cores.secundario },
          ]}
        >
          Exercícios e biblioteca em um só lugar
        </Text>
      </View>

      <View style={styles.menuContainer}>
        <Pressable
          style={[
            styles.menuButton,
            { backgroundColor: cores.card },
            abaSelecionada === 'exercicios' && {
              backgroundColor: cores.texto,
            },
          ]}
          onPress={() =>
            setAbaSelecionada('exercicios')
          }
        >
          <Text
            style={[
              styles.menuText,
              { color: cores.texto },
              abaSelecionada === 'exercicios' && {
                color: cores.fundo,
              },
            ]}
          >
            Exercícios
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.menuButton,
            { backgroundColor: cores.card },
            abaSelecionada === 'biblioteca' && {
              backgroundColor: cores.texto,
            },
          ]}
          onPress={() =>
            setAbaSelecionada('biblioteca')
          }
        >
          <Text
            style={[
              styles.menuText,
              { color: cores.texto },
              abaSelecionada === 'biblioteca' && {
                color: cores.fundo,
              },
            ]}
          >
            Biblioteca
          </Text>
        </Pressable>
      </View>

      {abaSelecionada === 'exercicios' ? (
        <>
          <View style={styles.searchContainer}>
            <BarraBuscaExercicio
              valor={buscaExercicio}
              onChange={setBuscaExercicio}
            />
          </View>

          <View style={styles.filterContainer}>
            <FiltroExercicio
              categorias={categorias}
              selecionada={categoria}
              onChange={setCategoria}
            />
          </View>

          <FlatList
            data={exerciciosFiltrados}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <CardExercicio
                exercicio={item}
                onPress={(exercicio) => {
                  console.log(
                    'Exercício selecionado:',
                    exercicio.nome
                  )
                }}
              />
            )}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text
                  style={[
                    styles.emptyText,
                    { color: cores.secundario },
                  ]}
                >
                  Nenhum exercício encontrado.
                </Text>
              </View>
            }
          />
        </>
      ) : (
        <>
          <View style={styles.searchContainer}>
            <TextInput
              value={buscaRotina}
              onChangeText={setBuscaRotina}
              placeholder="Buscar rotina..."
              placeholderTextColor={cores.secundario}
              style={[
                styles.search,
                {
                  backgroundColor: cores.card,
                  color: cores.texto,
                },
              ]}
            />
          </View>

          <FlatList
            data={rotinasFiltradas}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <CardRotina
                rotina={item}
                onPress={(rotina) => {
                  console.log(
                    'Rotina selecionada:',
                    rotina.nome
                  )
                }}
              />
            )}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text
                  style={[
                    styles.emptyText,
                    { color: cores.secundario },
                  ]}
                >
                  Nenhuma rotina encontrada.
                </Text>
              </View>
            }
          />
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },

  menuContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 12,
  },

  menuButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  menuText: {
    fontWeight: '600',
  },

  searchContainer: {
    paddingHorizontal: 16,
  },

  filterContainer: {
    marginTop: 14,
    paddingLeft: 16,
  },

  search: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
  },

  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  empty: {
    alignItems: 'center',
    paddingTop: 40,
  },

  emptyText: {
    fontSize: 14,
  },
})

