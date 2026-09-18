import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type MacroBarProps = {
  label: string;
  current: number;
  goal: number;
  color: string;
  unit?: string;
};

export default function MacroBar({ label, current, goal, color, unit = 'g' }: MacroBarProps) {
  const percent = goal > 0 ? Math.min(100, (current / goal) * 100) : 0;

  return (
    <View style={styles.row}>
      <View style={styles.top}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.values}>
          <Text style={styles.current}>{current}</Text>
          <Text style={styles.goal}>/{goal}{unit}</Text>
        </Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 6,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  label: {
    color: '#8b8fa3',
    fontSize: 13,
  },
  values: {
    fontSize: 13,
  },
  current: {
    color: '#f5f5f7',
    fontWeight: '700',
  },
  goal: {
    color: '#8b8fa3',
    fontWeight: '400',
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2a2e3d',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});
