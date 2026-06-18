import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ExerciciosScreen() {
  const [busca, setBusca] = useState('');

  // Simulação da lista de exercícios
  const listaExercicios = [
    { id: '1', nome: 'Supino Reto com Barra', grupo: 'Peito', icone: 'dumbbell' },
    { id: '2', nome: 'Agachamento Livre', grupo: 'Pernas', icone: 'weight-lifter' },
    { id: '3', nome: 'Puxada Pulley Retransversa', grupo: 'Costas', icone: 'vector-arrange-below' },
    { id: '4', nome: 'Desenvolvimento com Halteres', grupo: 'Ombros', icone: 'dumbbell' },
    { id: '5', nome: 'Rosca Direta', grupo: 'Braços', icone: 'arm-flex' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exercícios</Text>
      </View>

      {/* BARRA DE PESQUISA */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#636366" style={styles.searchIcon} />
          <TextInput
            placeholder="Buscar exercício..."
            placeholderTextColor="#636366"
            style={styles.input}
            value={busca}
            onChangeText={setBusca}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* FILTROS RÁPIDOS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {['Todos', 'Peito', 'Costas', 'Pernas', 'Braços', 'Ombros'].map((cat, i) => (
            <TouchableOpacity key={cat} style={[styles.filterChip, i === 0 && styles.filterChipActive]}>
              <Text style={[styles.filterText, i === 0 && styles.filterTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* LISTA DE EXERCÍCIOS */}
        <Text style={styles.sectionTitle}>Todos os Exercícios</Text>

        {listaExercicios
          .filter(ex => ex.nome.toLowerCase().includes(busca.toLowerCase()))
          .map((ex) => (
            <TouchableOpacity key={ex.id} style={styles.exerciseItem}>
              <View style={styles.itemLeft}>
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons name={ex.icone as any} size={20} color="#ff5b5b" />
                </View>
                <View>
                  <Text style={styles.exerciseName}>{ex.nome}</Text>
                  <Text style={styles.exerciseGroup}>{ex.grupo}</Text>
                </View>
              </View>
              <Ionicons name="add-circle-outline" size={22} color="#ff5b5b" />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0f11',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1e',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 20,
    overflow: 'visible',
  },
  filterChip: {
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#ff5b5b',
  },
  filterText: {
    color: '#8e8e93',
    fontSize: 13,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  exerciseItem: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#2c2c2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  exerciseGroup: {
    color: '#8e8e93',
    fontSize: 12,
    marginTop: 2,
  },
});