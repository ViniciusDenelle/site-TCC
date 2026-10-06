import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export interface ExercicioRepeticoes {
  nome: string;
  repeticoesIniciais: number;
  repeticoesAtuais: number;
}

interface GraficoRepeticoesProps {
  dados: ExercicioRepeticoes[];
}

const GraficoRepeticoes: React.FC<GraficoRepeticoesProps> = ({ dados }) => {
  return (
    <div className="w-full h-[300px] flex items-center justify-center pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dados} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />

          <XAxis
            dataKey="nome"
            tick={{ fill: '#a1a1aa', fontSize: 12 }}
            axisLine={{ stroke: '#3f3f46' }}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: '#a1a1aa', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />

          <Tooltip
            cursor={{ fill: '#27272a', opacity: 0.4 }}
            contentStyle={{
              backgroundColor: '#18181b',
              borderColor: '#27272a',
              borderRadius: '0.75rem',
              color: '#fff',
              fontSize: '12px',
            }}
            formatter={(value: number) => [`${value} repetições`, '']}
          />

          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '15px', fontSize: '12px' }}
          />

          <Bar
            name="Repetições Iniciais"
            dataKey="repeticoesIniciais"
            fill="#71717a"
            radius={[6, 6, 0, 0]}
            maxBarSize={32}
          />

          <Bar
            name="Repetições Atuais"
            dataKey="repeticoesAtuais"
            fill="#10b981"
            radius={[6, 6, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoRepeticoes;