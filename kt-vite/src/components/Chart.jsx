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
import annotationPlugin from "chartjs-plugin-annotation";

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
  Filler,
  annotationPlugin
);

/**
 * 차트 컴포넌트 - Chart.js를 사용하여 다양한 타입의 차트를 렌더링합니다.
 * @param {'line' | 'bar' | 'doughnut' | 'pie'} type - 차트 타입
 * @param {Object} data - Chart.js 데이터 객체 (labels, datasets 포함)
 * @param {Object} options - Chart.js 옵션 객체 (선택사항)
 * @param {string} className - 추가 CSS 클래스 (선택사항)
 */
const Chart = ({ type = "line", data, options = {}, className = "" }) => {
  // 깊은 병합을 위한 옵션 분리
  const {
    plugins: customPlugins,
    scales: customScales,
    layout: customLayout,
    ...restOptions
  } = options;

  // 기본 옵션 설정
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // annotation이 차트 영역 밖으로 표시될 수 있도록 설정
    clip: false,
    layout: {
      padding: {
        top: 20, // 상단 여백 증가 (MAX 라벨이 완전히 보이도록)
        bottom: 8,
        left: 5, // 왼쪽 여백
        right: 5, // 오른쪽 여백
      },
      // 커스텀 layout이 있으면 병합
      ...(customLayout || {}),
    },
    plugins: {
      legend: {
        display: false, // 차트 내부 범례 숨김 (외부에서 별도로 표시)
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      ...(customPlugins || {}),
    },
    scales:
      type === "line" || type === "bar"
        ? {
            x: {
              grid: {
                display: true,
                color: "#f4f5f5",
              },
              ...(customScales?.x || {}),
            },
            y: {
              grid: {
                display: true,
                color: "#f4f5f5",
              },
              beginAtZero: true,
              ticks: {
                // Y축 라벨 설정
                color: "#666",
                font: {
                  size: 11,
                },
                padding: 8,
              },
              ...(customScales?.y || {}),
            },
          }
        : customScales || undefined,
    ...restOptions,
  };

  // 차트 타입에 따라 렌더링
  const renderChart = () => {
    switch (type) {
      case "line":
        return <Line data={data} options={defaultOptions} redraw />;
      case "bar":
        return <Bar data={data} options={defaultOptions} redraw />;
      case "doughnut":
        return <Doughnut data={data} options={defaultOptions} redraw />;
      case "pie":
        return <Pie data={data} options={defaultOptions} redraw />;
      default:
        return <Line data={data} options={defaultOptions} redraw />;
    }
  };

  return <div className={`w-full h-full ${className}`}>{renderChart()}</div>;
};

export default Chart;
