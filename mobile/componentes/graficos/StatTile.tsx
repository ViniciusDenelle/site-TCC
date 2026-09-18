import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type StatTileProps = {
  label: string;
  value: string | number;
  unit: string;
  color: string;
};

export default function StatTile({ label, value, unit, color }: StatTileProps) {
  return (
    <View style={styles.tile}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.valueRow}>
        <Text style={[styles.value, { color }]}>{value} </Text>
        <Text style={styles.unit}>{unit}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: '#1a1d29',
    borderRadius: 16,
    padding: 20,
  },
  label: {
    color: '#8b8fa3',
    fontSize: 13,
    marginBottom: 10,
  },
  valueRow: {
    // permite quebrar número + unidade na mesma "linha" de texto
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
  },
  unit: {
    color: '#8b8fa3',
    fontSize: 13,
  },
});