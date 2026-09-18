import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

type Segment = {
  value: number; // já em kcal
  color: string;
};

type MacroDonutChartProps = {
  segments: Segment[];
  size?: number;
  strokeWidth?: number;
};

export default function MacroDonutChart({
  segments,
  size = 120,
  strokeWidth = 14,
}: MacroDonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;

  const total = segments.reduce((sum, s) => sum + s.value, 0);

  let offsetAcc = 0;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* -90deg para começar do topo, igual ao CSS transform: rotate(-90deg) */}
        <G rotation="-90" origin={`${cx}, ${cy}`}>
          {segments.map((seg, i) => {
            const fraction = total > 0 ? seg.value / total : 0;
            const dash = fraction * circumference;
            const gap = circumference - dash;
            const dashOffset = -offsetAcc;
            offsetAcc += dash;

            return (
              <Circle
                key={i}
                cx={cx}
                cy={cy}
                r={radius}
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={dashOffset}
                fill="none"
              />
            );
          })}
        </G>
      </Svg>

      <View style={styles.center} pointerEvents="none">
        <Text style={styles.kcal}>{Math.round(total)}</Text>
        <Text style={styles.kcalLabel}>kcal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kcal: {
    color: '#f5f5f7',
    fontSize: 22,
    fontWeight: '800',
  },
  kcalLabel: {
    color: '#8b8fa3',
    fontSize: 10,
    marginTop: 2,
  },
});
