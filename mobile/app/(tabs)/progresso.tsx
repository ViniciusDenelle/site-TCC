import NutritionCard from '@/componentes/graficos/NutriCard';
import { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet} from 'react-native';
import WeekBarChart from '@/componentes/graficos/WeekBarChart';



export default function Progresso() {


   
    return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <WeekBarChart />

      <NutritionCard
        protein={{ current: 165, goal: 180 }}
        carb={{ current: 280, goal: 300 }}
        fat={{ current: 68, goal: 70 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#12141c',
  },
  content: {
    padding: 16,
    gap: 16, // RN 0.71+ suporta gap; se sua versão for mais antiga, troca por marginBottom no primeiro card
  },
});




        
    
