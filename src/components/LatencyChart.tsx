
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

type LatencyData = {
  serie_0: {
    p25: string[];
    p50: string[];
    p75: string[];
    timestamps: string[];
  };
};

export default function LatencyChart() {
  const [latencyData, setLatencyData] = useState<LatencyData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/latency')
      .then((res) => res.json())
      .then((data) => {
        if (data?.serie_0?.p25) {
          setLatencyData(data);
        } else {
          setError('Invalid data format');
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to fetch latency data');
      });
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!latencyData) return <p>Loading...</p>;

  const { p25, p50, p75, timestamps } = latencyData.serie_0;

  const chartData = {
    labels: timestamps.map((t) => new Date(t).toLocaleString()),

    datasets: [
      {
        label: 'p25 latency (ms)',
        data: p25.map(parseFloat),
        borderColor: '#4ade80',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'p50 latency (ms)',
        data: p50.map(parseFloat),
        borderColor: '#3b82f6',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'p75 latency (ms)',
        data: p75.map(parseFloat),
        borderColor: '#f87171',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Latency (ms)',
        },
      },
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cloudflare Latency (p25/p50/p75)</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
