import React from "react";
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * 차트 컴포넌트 - Chart.js를 사용하여 다양한 타입의 차트를 렌더링합니다.
 * @param {'line' | 'bar' | 'doughnut' | 'pie'} type - 차트 타입
 * @param {Object} data - Chart.js 데이터 객체 (labels, datasets 포함)
 * @param {Object} options - Chart.js 옵션 객체 (선택사항)
 * @param {string} className - 추가 CSS 클래스 (선택사항)
 */
const Chart = ({ type = "line", data, options = {}, className = "" }) => {
  // 기본 옵션 설정
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 차트 내부 범례 숨김 (외부에서 별도로 표시)
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales:
      type === "line" || type === "bar"
        ? {
            x: {
              grid: {
                display: true,
                color: "#f4f5f5",
              },
            },
            y: {
              grid: {
                display: true,
                color: "#f4f5f5",
              },
              beginAtZero: true,
            },
          }
        : undefined,
    ...options,
  };

  // 차트 타입에 따라 렌더링
  const renderChart = () => {
    switch (type) {
      case "line":
        return <Line data={data} options={defaultOptions} />;
      case "bar":
        return <Bar data={data} options={defaultOptions} />;
      case "doughnut":
        return <Doughnut data={data} options={defaultOptions} />;
      case "pie":
        return <Pie data={data} options={defaultOptions} />;
      default:
        return <Line data={data} options={defaultOptions} />;
    }
  };

  return <div className={`w-full h-full ${className}`}>{renderChart()}</div>;
};

export default Chart;
