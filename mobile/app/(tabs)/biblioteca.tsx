import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function BibliotecaScreen() {
  const rotinas = [
    { id: '1', nome: 'Full Body A', tipo: 'Iniciante', duracao: '45 min', exercicios: 3, cor: '#ff5b5b' },
    { id: '2', nome: 'Upper Body B', tipo: 'Intermediário', duracao: '50 min', exercicios: 5, cor: '#ffbe59' },
    { id: '3', nome: 'Lower Body C', tipo: 'Intermediário', duracao: '60 min', exercicios: 6, cor: '#ffbe59' },
    { id: '4', nome: 'Cardio & Core', tipo: 'Todos', duracao: '30 min', exercicios: 4, cor: '#4cd964' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minha Biblioteca</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionSubtitle}>Suas rotinas e fichas salvas</Text>

        {rotinas.map((item) => (
          <TouchableOpacity key={item.id} style={styles.routineCard}>
            <View style={styles.cardLeft}>
              <View style={[styles.accentIndicator, { backgroundColor: item.cor }]} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.nome}</Text>
                <Text style={styles.cardMeta}>
                  {item.tipo}  •  {item.duracao}
                </Text>
              </View>
            </View>

            <View style={styles.cardRight}>
              <Text style={styles.exerciseCount}>{item.exercicios} exs</Text>
              <Ionicons name="chevron-forward" size={16} color="#636366" />
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    backgroundColor: '#1c1c1e',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 30,
  },
  sectionSubtitle: {
    color: '#8e8e93',
    fontSize: 14,
    marginBottom: 20,
  },
  routineCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accentIndicator: {
    width: 4,
    height: 35,
    borderRadius: 2,
  },
  cardInfo: {
    justifyContent: 'center',
  },
  cardName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardMeta: {
    color: '#8e8e93',
    fontSize: 13,
    marginTop: 4,
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  exerciseCount: {
    color: '#aeaeb2',
    fontSize: 13,
  },
});