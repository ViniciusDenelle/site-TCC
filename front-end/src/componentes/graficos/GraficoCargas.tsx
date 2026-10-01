import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

interface ExercicioCarga {
  nome: string;
  cargaInicial: number;
  cargaAtual: number;
}

interface GraficoCargasProps {
  dados: ExercicioCarga[];
}

const GraficoCargas: React.FC<GraficoCargasProps> = ({ dados }) => {
  return (
    <div className="w-full h-[350px] flex items-center justify-center pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={dados}>
          <PolarGrid stroke="#3f3f46" opacity={0.5} />

          <PolarAngleAxis
            dataKey="nome"
            tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 500 }}
          />

          <PolarRadiusAxis
            angle={30}
            domain={[0, 'auto']}
            stroke="#71717a"
            tick={{ fontSize: 10 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#18181b',
              borderColor: '#27272a',
              borderRadius: '0.75rem',
              color: '#fff',
              fontSize: '12px',
            }}
            formatter={(value: number) => [`${value} kg`, '']}
          />

          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
          />

          <Radar
            name="Carga Inicial"
            dataKey="cargaInicial"
            stroke="#71717a"
            fill="#71717a"
            fillOpacity={0.25}
          />

          <Radar
            name="Carga Atual"
            dataKey="cargaAtual"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.45}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoCargas;