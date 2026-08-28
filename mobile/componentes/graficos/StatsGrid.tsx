import React from 'react';
import { View, StyleSheet } from 'react-native';
import StatTile from './StatTile';

type StatsGridProps = {
  ingeridoHoje: number;
  metaDiaria: number;
  deficit: number;
  refeicoesFeitas: number;
  refeicoesTotal: number;
};

const COLORS = {
  ingerido: '#ff5c7a',
  meta: '#ffc94d',
  deficit: '#4d9dff',
  refeicoes: '#4ade80',
};

export default function StatsGrid({
  ingeridoHoje,
  metaDiaria,
  deficit,
  refeicoesFeitas,
  refeicoesTotal,
}: StatsGridProps) {
  return (
    <View style={styles.grid}>
      <View style={styles.row}>
        <StatTile label="Ingerido hoje" value={ingeridoHoje} unit="kcal" color={COLORS.ingerido} />
        <StatTile label="Meta diária" value={metaDiaria} unit="kcal" color={COLORS.meta} />
      </View>

      <View style={styles.row}>
        <StatTile label="Déficit" value={deficit} unit="kcal" color={COLORS.deficit} />
        <StatTile
          label="Refeições"
          value={`${refeicoesFeitas}/${refeicoesTotal}`}
          unit="feitas"
          color={COLORS.refeicoes}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
});