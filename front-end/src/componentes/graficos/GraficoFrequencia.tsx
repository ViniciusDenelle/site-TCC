import { ResponsiveBar } from '@nivo/bar';

interface Frequencia {
  id?: number | string;
  dia: string;
  qtd: number;
  max?: number;
}

interface GraficoFrequenciaProps {
  dados: Frequencia[];
}

const GraficoFrequencia = ({
  dados,
}: GraficoFrequenciaProps) => {

  const dadosGrafico = dados.map((item) => ({
    dia: String(item.dia),
    qtd: Number(item.qtd),
  }));

  return (
    <div className="w-full h-[280px]">
      <ResponsiveBar
        data={dadosGrafico}
        keys={['qtd']}
        indexBy="dia"

        margin={{
          top: 20,
          right: 10,
          bottom: 45,
          left: 35,
        }}

        padding={0.35}
        borderRadius={6}

        colors={['#facc15']}

        enableLabel={true}

        labelSkipWidth={20}
        labelSkipHeight={20}

        labelTextColor="#111827"

        enableGridX={false}
        enableGridY={true}

        axisTop={null}
        axisRight={null}

        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
        }}

        axisLeft={{
          tickSize: 0,
          tickPadding: 8,
          tickValues: 5,
        }}

        theme={{
          text: {
            fill: '#9ca3af',
            fontSize: 11,
          },

          axis: {
            ticks: {
              text: {
                fill: '#9ca3af',
              },
            },
          },

          grid: {
            line: {
              stroke: '#374151',
              strokeWidth: 1,
            },
          },

          tooltip: {
            container: {
              background: '#111827',
              color: '#ffffff',
              fontSize: 12,
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            },
          },
        }}

        tooltip={({ indexValue, value }) => (
          <div className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
            <p className="text-xs text-gray-400">
              {String(indexValue)}
            </p>

            <p className="text-sm font-bold text-yellow-400">
              {value} treino{Number(value) !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      />
    </div>
  );
};

export default GraficoFrequencia;

