import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

// Load the plugin
dayjs.extend(quarterOfYear);

// Types for data points and options
interface DataPoint {
  x: string;
  y: number;
}

interface Series {
  name: string;
  data: DataPoint[];
}

interface ChartOptions {
  type: 'bar';
  height: number;
}

interface XAxisOptions {
  type: 'category';
  labels: {
    formatter: (val: string) => string;
  };
  group: {
    style: {
      fontSize: string;
      fontWeight: number;
    };
    groups: { title: string; cols: number }[];
  };
}

interface Options {
  chart: ChartOptions;
  xaxis: XAxisOptions;
  title: {
    text: string;
  };
  tooltip: {
    x: {
      formatter: (val: any, opts?: any) => string;
    };
  };
}

const Dashboard: React.FC = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/valoresGrafico'); // Substitua pela URL da sua API
        const data = await response.json();

        // Supondo que a resposta da API tenha o formato desejado
        const formattedData = [
          {
            name: 'Net Profit',
            data: data.map((item: { month: string; profit: number }) => ({
              x: item.month,
              y: item.profit,
            })),
          },
        ];

        setSeries(formattedData);
      } catch (error: any) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options: Options = {
    chart: {
      type: 'bar',
      height: 250,
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: (val: string) => val,
      },
      group: {
        style: {
          fontSize: '10px',
          fontWeight: 500,
        },
        groups: [],
      },
    },
    title: {
      text: 'Financial Overview',
    },
    tooltip: {
      x: {
        formatter: (val: any, opts?: any) => {
          if (!opts || !opts.series || !opts.series[opts.seriesIndex]) {
            return 'Data not available';
          }

          const seriesData = opts.series[opts.seriesIndex].data;
          const index = opts.dataPointIndex;

          if (seriesData && index >= 0 && index < seriesData.length) {
            return `Month: ${seriesData[index].x}, Value: $${seriesData[index].y}`;
          }

          return 'Data not available';
        },
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>; // Exibe uma mensagem de carregamento enquanto busca os dados
  }

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default Dashboard;
