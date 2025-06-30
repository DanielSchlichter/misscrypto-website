'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import für ApexCharts (client-side only)
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CryptoChartProps {
  data: number[];
  isPositive: boolean;
  currency?: string;
  timeRange?: string;
}

const CryptoChart: React.FC<CryptoChartProps> = ({ 
  data = [],
  isPositive, 
  currency = 'EUR',
  timeRange = '7d'
}) => {
  // Debug-Logging
  console.log(`Chart Data for ${timeRange}:`, {
    length: data.length,
    first: data[0],
    last: data[data.length - 1]
  });

  if (!data || data.length === 0) {
    return <div className="mc-chart-placeholder">Keine Daten verfügbar</div>;
  }

  // Erstelle series data für ApexCharts
  const series = [{
    name: 'Preis',
    data: data
  }];

  // Definiere hellere Farben
  const positiveColor = '#34d399'; // Helleres Grün
  const negativeColor = '#f87171'; // Helleres Rot

  // Chart-Konfiguration
  const options = {
    chart: {
      type: 'line' as const,
      height: 60,
      width: '100%',
      sparkline: {
        enabled: true
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    stroke: {
      curve: 'smooth' as const,
      width: 2,
      colors: [isPositive ? positiveColor : negativeColor]
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    colors: [isPositive ? positiveColor : negativeColor],
    grid: {
      show: false
    },
    xaxis: {
      type: 'numeric' as const,
      show: false,
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false,
      labels: {
        show: false
      },
      min: Math.min(...data) * 0.9995,
      max: Math.max(...data) * 1.0005
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      },
      custom: function({ series, seriesIndex, dataPointIndex }: any) {
        const value = series[seriesIndex][dataPointIndex];
        const formattedValue = new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: value < 1 ? 6 : 2
        }).format(value);

        return `
          <div class="mc-apex-tooltip">
            <div class="mc-tooltip-content">
              <span class="mc-tooltip-label">Preis:</span>
              <span class="mc-tooltip-value">${formattedValue}</span>
            </div>
          </div>
        `;
      },
      marker: {
        show: true
      },
      x: {
        show: false
      },
      y: {
        formatter: function(value: number) {
          return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: value < 1 ? 6 : 2
          }).format(value);
        }
      }
    },
    markers: {
      size: 0,
      hover: {
        size: 4,
        sizeOffset: 3
      }
    }
  };

  return (
    <div className="mc-apex-chart-container">
      <Chart
        options={options}
        series={series}
        type="line"
        height={60}
        width="100%"
      />
    </div>
  );
};

export default CryptoChart; 