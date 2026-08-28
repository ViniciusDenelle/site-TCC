import { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

export default function WeekBarChart() {
  const { width: screenWidth } = useWindowDimensions();
  // largura do card = largura da tela - padding da ScrollView (16*2) - padding interno do card (24*2)
  const chartWidth = screenWidth - 32 - 48;

  const [balancoCalorico] = useState([
    { value: 1000, label: 'Seg' },
    { value: 1000, label: 'Ter' },
    { value: 2000, label: 'Qua' },
    { value: 1000, label: 'Qui' },
    { value: -1000, label: 'Sex' },
    { value: -500, label: 'Sab' },
    { value: 1000, label: 'Dom' },
  ]);

  const dadosComCor = balancoCalorico.map((item) => ({
    ...item,
    frontColor: item.value >= 0 ? '#ff5c7a' : '#4d9dff',
  }));

  return (
    <View style={styles.card}>
      <Text style={styles.title}>BALANÇO CALÓRICO SEMANAL</Text>

      <BarChart
        data={dadosComCor}
        width={chartWidth}
        height={220}
        maxValue={2200}
        noOfSections={5}
        mostNegativeValue={-1760}
        noOfSectionsBelowXAxis={4}
        negativeStepValue={440}
        barWidth={22}
        spacing={18}
        initialSpacing={12}
        yAxisThickness={0}
        xAxisThickness={0}
       
        autoShiftLabels
        showReferenceLine1
        referenceLine1Position={0}
        
        xAxisLabelTextStyle={{ color: '#d1d5db', fontSize: 11 }}
        yAxisTextStyle={{ color: '#9ca3af', fontSize: 10 }}
        barBorderRadius={10}
        isAnimated
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1d29', // mesmo fundo do NutritionCard
    borderRadius: 16,           // mesmo raio do NutritionCard
    padding: 24,                // mesmo padding do NutritionCard
  },
  title: {
    color: '#8b8fa3',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
});