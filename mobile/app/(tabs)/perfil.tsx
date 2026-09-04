import { useMemo, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type OpcaoPerfil = {
  id: string
  titulo: string
  descricao: string
  icone: keyof typeof Ionicons.glyphMap
}

const opcoes: OpcaoPerfil[] = [
  {
    id: '1',
    titulo: 'Dados pessoais',
    descricao: 'Editar nome, email e senha',
    icone: 'person-outline',
  },
  {
    id: '2',
    titulo: 'Objetivos',
    descricao: 'Ver metas e progresso',
    icone: 'fitness-outline',
  },
  {
    id: '3',
    titulo: 'Configurações',
    descricao: 'Ajustes do aplicativo',
    icone: 'settings-outline',
  },
  {
    id: '4',
    titulo: 'Sair',
    descricao: 'Encerrar sessão',
    icone: 'log-out-outline',
  },
]

export default function Perfil() {
  const [busca, setBusca] = useState('')

  const opcoesFiltradas = useMemo(() => {
    return opcoes.filter(opcao =>
      opcao.titulo.toLowerCase().includes(busca.toLowerCase())
    )
  }, [busca])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.subtitle}>Suas informações e preferências</Text>
      </View>

      <View style={styles.cardUsuario}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={36} color="#ffffff" />
        </View>

        <View style={styles.infoUsuario}>
          <Text style={styles.nome}>Guilherme Motta</Text>
          <Text style={styles.email}>guilherme@email.com</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Treinos</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Semanas</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Avaliação</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          value={busca}
          onChangeText={setBusca}
          placeholder="Buscar opção..."
          placeholderTextColor="#636366"
          style={styles.search}
        />
      </View>

      <View style={styles.list}>
        {opcoesFiltradas.map(opcao => (
          <TouchableOpacity
            key={opcao.id}
            style={styles.option}
            activeOpacity={0.8}
            onPress={() => console.log('Opção:', opcao.titulo)}
          >
            <View style={styles.optionIcon}>
              <Ionicons name={opcao.icone} size={22} color="#ffffff" />
            </View>

            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>{opcao.titulo}</Text>
              <Text style={styles.optionDescription}>{opcao.descricao}</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#8e8e93" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#8e8e93',
    fontSize: 14,
    marginTop: 4,
  },
  cardUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2c2c2e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  infoUsuario: {
    flex: 1,
  },
  nome: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  email: {
    color: '#8e8e93',
    fontSize: 14,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    color: '#8e8e93',
    fontSize: 12,
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  search: {
    height: 40,
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    paddingHorizontal: 14,
    color: '#ffffff',
    fontSize: 15,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  optionIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#2c2c2e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  optionDescription: {
    color: '#8e8e93',
    fontSize: 13,
    marginTop: 2,
  },
})