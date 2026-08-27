import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MacroDonutChart from './MacroDonutChart';
import MacroBar from './macroBar';

type MacroData = {
  current: number;
  goal: number;
};

type NutritionCardProps = {
  protein: MacroData;
  carb: MacroData;
  fat: MacroData;
};

const COLORS = {
  protein: '#ff5c7a',
  carb: '#ffc94d',
  fat: '#4d9dff',
};

const CAL_PER_GRAM = {
  protein: 4,
  carb: 4,
  fat: 9,
};

export default function NutritionCard({ protein, carb, fat }: NutritionCardProps) {
  const kcalProtein = protein.current * CAL_PER_GRAM.protein;
  const kcalCarb = carb.current * CAL_PER_GRAM.carb;
  const kcalFat = fat.current * CAL_PER_GRAM.fat;

  const segments = [
    { value: kcalProtein, color: COLORS.protein },
    { value: kcalCarb, color: COLORS.carb },
    { value: kcalFat, color: COLORS.fat },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>MACRONUTRIENTES HOJE</Text>

      <View style={styles.content}>
        <MacroDonutChart segments={segments} />

        <View style={styles.macros}>
          <MacroBar label="Proteína" current={protein.current} goal={protein.goal} color={COLORS.protein} />
          <MacroBar label="Carboidrato" current={carb.current} goal={carb.goal} color={COLORS.carb} />
          <MacroBar label="Gordura" current={fat.current} goal={fat.goal} color={COLORS.fat} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1d29',
    borderRadius: 16,
    padding: 24,
  },
  title: {
    color: '#8b8fa3',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  macros: {
    flex: 1,
    gap: 16,
  },
});
