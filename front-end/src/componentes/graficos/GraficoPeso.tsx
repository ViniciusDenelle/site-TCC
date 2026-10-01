
import { ResponsiveLine } from '@nivo/line';

interface HistoricoPeso {
  id?: number | string;
  data: string;
  valor: number;
}

interface GraficoPesoProps {
  dados: HistoricoPeso[];
}

const GraficoPeso = ({
  dados,
}: GraficoPesoProps) => {

  const dadosGrafico = [
    {
      id: 'Peso',
      data: dados.map((item) => ({
        x: String(item.data),
        y: Number(item.valor),
      })),
    },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveLine
        data={dadosGrafico}

        margin={{
          top: 20,
          right: 25,
          bottom: 55,
          left: 50,
        }}

        xScale={{
          type: 'point',
        }}

        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}

        curve="monotoneX"

        colors={['#facc15']}

        lineWidth={3}

        enableArea={true}

        areaOpacity={0.08}

        enablePoints={true}

        pointSize={8}

        pointColor="#111827"

        pointBorderWidth={2}

        pointBorderColor="#facc15"

        enableGridX={false}

        gridYValues={5}

        enableSlices="x"

        useMesh={true}

        axisTop={null}

        axisRight={null}

        axisBottom={{
          tickSize: 0,
          tickPadding: 12,
          tickRotation: -25,
        }}

        axisLeft={{
          tickSize: 0,
          tickPadding: 10,
          legend: 'kg',
          legendOffset: -40,
          legendPosition: 'middle',
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

            legend: {
              text: {
                fill: '#9ca3af',
              },
            },
          },

          grid: {
            line: {
              stroke: '#374151',
              strokeWidth: 1,
              strokeDasharray: '4 4',
            },
          },

          crosshair: {
            line: {
              stroke: '#facc15',
              strokeWidth: 1,
              strokeOpacity: 0.5,
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

        tooltip={({ point }) => (
          <div className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
            <p className="text-xs text-gray-400">
              {String(point.data.x)}
            </p>

            <p className="text-sm font-bold text-yellow-400">
              {String(point.data.y)} kg
            </p>
          </div>
        )}
      />
    </div>
  );
};

export default GraficoPeso;

