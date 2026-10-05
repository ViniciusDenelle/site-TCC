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
import useTema from '@/contextos/TemaContexto'

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
  const { temaAtual, formatarCor } = useTema()
  const [busca, setBusca] = useState('')

  const corBase = formatarCor(temaAtual['--color-base-primaria'], 1)
  const corBaseTerciaria = formatarCor(temaAtual['--color-base-terciaria'], 1)
  const corTexto = formatarCor(temaAtual['--color-t-primaria'], 1)
  const corTextoSecundaria = formatarCor(temaAtual['--color-t-secundaria'], 1)
  const corDestaque = formatarCor(temaAtual['--color-destaque-p-claro'], 1)
  const corBorda = formatarCor(temaAtual['--color-contraste-primaria'], 1)

  const opcoesFiltradas = useMemo(() => {
    return opcoes.filter(opcao =>
      opcao.titulo.toLowerCase().includes(busca.toLowerCase())
    )
  }, [busca])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: corBase }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: corTexto }]}>Perfil</Text>
        <Text style={[styles.subtitle, { color: corTextoSecundaria }]}>Suas informações e preferências</Text>
      </View>

      <View style={[styles.cardUsuario, { backgroundColor: corBaseTerciaria }]}>
        <View style={[styles.avatar, { backgroundColor: corDestaque }]}>
          <Ionicons name="person" size={36} color="#ffffff" />
        </View>

        <View style={styles.infoUsuario}>
          <Text style={[styles.nome, { color: corTexto }]}>Guilherme Motta</Text>
          <Text style={[styles.email, { color: corTextoSecundaria }]}>guilherme@email.com</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: corBaseTerciaria }]}>
          <Text style={[styles.statNumber, { color: corDestaque }]}>12</Text>
          <Text style={[styles.statLabel, { color: corTextoSecundaria }]}>Treinos</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: corBaseTerciaria }]}>
          <Text style={[styles.statNumber, { color: corDestaque }]}>8</Text>
          <Text style={[styles.statLabel, { color: corTextoSecundaria }]}>Semanas</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: corBaseTerciaria }]}>
          <Text style={[styles.statNumber, { color: corDestaque }]}>4.8</Text>
          <Text style={[styles.statLabel, { color: corTextoSecundaria }]}>Avaliação</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          value={busca}
          onChangeText={setBusca}
          placeholder="Buscar opção..."
          placeholderTextColor={corTextoSecundaria}
          style={[styles.search, { 
            backgroundColor: corBaseTerciaria,
            color: corTexto,
            borderColor: corBorda,
          }]}
        />
      </View>

      <View style={styles.list}>
        {opcoesFiltradas.map(opcao => (
          <TouchableOpacity
            key={opcao.id}
            style={[styles.option, { borderColor: corBorda }]}
            activeOpacity={0.8}
            onPress={() => console.log('Opção:', opcao.titulo)}
          >
            <View style={[styles.optionIcon, { backgroundColor: corDestaque }]}>
              <Ionicons name={opcao.icone} size={22} color="#ffffff" />
            </View>

            <View style={styles.optionText}>
              <Text style={[styles.optionTitle, { color: corTexto }]}>{opcao.titulo}</Text>
              <Text style={[styles.optionDescription, { color: corTextoSecundaria }]}>{opcao.descricao}</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color={corTextoSecundaria} />
          </TouchableOpacity>
        ))}
      </View>
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
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  cardUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  infoUsuario: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: '700',
  },
  email: {
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
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  search: {
    height: 40,
    paddingHorizontal: 14,
    fontSize: 15,
    borderWidth: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  optionIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: 13,
    marginTop: 2,
  },
})