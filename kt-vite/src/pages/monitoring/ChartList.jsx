import React, { useState, useMemo } from "react";
import ChartCard from "../../components/ChartCard";
import ChartSettingsModal from "./modal/ChartSettingsModal";

function ChartList({ dashboardMode }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // 샘플 차트 데이터 - 각 차트별로 독립적인 데이터 (메모이제이션)
  const chartDatasets = useMemo(
    () => ({
      cpu: {
        labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00"],
        datasets: [
          {
            label: "c-pod-001",
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: "#22c55e",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "c-pod-002",
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: "#5090f7",
            backgroundColor: "rgba(80, 144, 247, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "c-pod-003",
            data: [45, 25, 16, 36, 67, 18, 76],
            borderColor: "#a855f7",
            backgroundColor: "rgba(168, 85, 247, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      memory: {
        labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00"],
        datasets: [
          {
            label: "c-pod-001",
            data: [45, 55, 70, 65, 80, 75, 60],
            borderColor: "#22c55e",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "c-pod-002",
            data: [30, 40, 50, 45, 60, 55, 70],
            borderColor: "#5090f7",
            backgroundColor: "rgba(80, 144, 247, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "c-pod-003",
            data: [50, 60, 65, 70, 75, 80, 85],
            borderColor: "#a855f7",
            backgroundColor: "rgba(168, 85, 247, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      disk: {
        labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00"],
        datasets: [
          {
            label: "c-pod-001",
            data: [20, 25, 30, 35, 40, 45, 50],
            borderColor: "#22c55e",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "c-pod-002",
            data: [15, 20, 25, 30, 35, 40, 45],
            borderColor: "#5090f7",
            backgroundColor: "rgba(80, 144, 247, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "c-pod-003",
            data: [25, 30, 35, 40, 45, 50, 55],
            borderColor: "#a855f7",
            backgroundColor: "rgba(168, 85, 247, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      tps: {
        labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00"],
        datasets: [
          {
            label: "c-pod-001",
            data: [100, 120, 150, 140, 160, 155, 180],
            borderColor: "#22c55e",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "c-pod-002",
            data: [90, 110, 130, 125, 145, 140, 170],
            borderColor: "#5090f7",
            backgroundColor: "rgba(80, 144, 247, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "c-pod-003",
            data: [80, 100, 120, 115, 135, 130, 160],
            borderColor: "#a855f7",
            backgroundColor: "rgba(168, 85, 247, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      qps: {
        labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00"],
        datasets: [
          {
            label: "s-pod-001",
            data: [200, 220, 250, 240, 260, 255, 280],
            borderColor: "#a855f7",
            backgroundColor: "rgba(168, 85, 247, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "s-pod-002",
            data: [190, 210, 230, 225, 245, 240, 270],
            borderColor: "#ec4899",
            backgroundColor: "rgba(236, 72, 153, 0.1)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "s-pod-003",
            data: [180, 200, 220, 215, 235, 230, 260],
            borderColor: "#f59e0b",
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
    }),
    []
  ); // 의존성 없음 - 고정 데이터

  // 차트 옵션 - annotation을 사용하여 최대값 표시 (메모이제이션)
  const getChartOptions = useMemo(
    () => (chartData) => {
      // 모든 데이터셋에서 절대적으로 가장 큰 값 찾기
      let globalMax = -Infinity;
      let globalMin = Infinity;
      let globalMaxPosition = { datasetIndex: 0, dataIndex: 0 };

      chartData.datasets.forEach((dataset, datasetIndex) => {
        dataset.data.forEach((value, dataIndex) => {
          if (value > globalMax) {
            globalMax = value;
            globalMaxPosition = { datasetIndex, dataIndex };
          }
          if (value < globalMin) {
            globalMin = value;
          }
        });
      });

      const annotations = {
        // MAX 포인트 표시 (빨간색 점)
        maxPoint: {
          type: "point",
          xValue: globalMaxPosition.dataIndex,
          yValue: globalMax,
          backgroundColor: "#ef4444",
          borderColor: "#ef4444",
          borderWidth: 2,
          radius: 5,
        },
        // MAX 라벨 표시
        maxLabel: {
          type: "label",
          xValue: globalMaxPosition.dataIndex,
          yValue: globalMax,
          content: [`MAX ${globalMax}`],
          color: "#ef4444",
          font: {
            size: 9,
            weight: "bold",
          },
          padding: {
            x: 8,
            y: 3,
          },
          yAdjust: -18, // 포인트 위로 적절하게 띄우기
          display: true,
        },
      };

      return {
        scales: {
          y: {
            // Y축 범위를 명시적으로 설정하여 MAX 라벨이 차트 영역 안에 들어오도록 함
            suggestedMin: 0,
            suggestedMax: globalMax * 1.35, // 최댓값보다 35% 더 높게 설정하여 MAX 라벨 공간 확보
          },
        },
        plugins: {
          legend: {
            display: false, // 범례 완전히 제거
          },
          annotation: {
            clip: false, // annotation이 차트 영역을 벗어날 수 있도록 설정
            annotations,
          },
        },
      };
    },
    []
  ); // 의존성 없음 - 함수 자체를 메모이제이션

  // 차트 목록 데이터 (메모이제이션)
  const chartLists = useMemo(
    () => [
      {
        title: "CPU 사용률",
        chartData: chartDatasets.cpu,
        chartOptions: getChartOptions(chartDatasets.cpu),
        chipLabel: "STT",
        chipVariant: "primary",
      },
      {
        title: "메모리 사용률",
        chartData: chartDatasets.memory,
        chartOptions: getChartOptions(chartDatasets.memory),
        chipLabel: "STT",
        chipVariant: "primary",
      },
      {
        title: "디스크 사용률",
        chartData: chartDatasets.disk,
        chartOptions: getChartOptions(chartDatasets.disk),
        chipLabel: "STT",
        chipVariant: "primary",
      },
      {
        title: "TPS",
        chartData: chartDatasets.tps,
        chartOptions: getChartOptions(chartDatasets.tps),
        chipLabel: "TTS",
        chipVariant: "secondary",
      },
      {
        title: "항목명",
        chartData: chartDatasets.qps,
        chartOptions: getChartOptions(chartDatasets.qps),
        chipLabel: "TTS ",
        chipVariant: "secondary",
      },
      {
        title: "항목명",
        chartData: chartDatasets.qps,
        chartOptions: getChartOptions(chartDatasets.qps),
        chipLabel: "TTS ",
        chipVariant: "secondary",
      },
    ],
    [chartDatasets, getChartOptions]
  ); // chartDatasets와 getChartOptions에 의존

  return (
    <div className="grid grid-cols-3 gap-4" style={{ overflow: "visible" }}>
      {chartLists.map((chart, index) => (
        <ChartCard
          key={index}
          chipLabel={chart.chipLabel}
          chipVariant={chart.chipVariant}
          title={chart.title}
          chartData={chart.chartData}
          chartOptions={chart.chartOptions}
          selected={dashboardMode === "edit" ? selectedCard === index : false}
          onSelect={() =>
            dashboardMode === "edit"
              ? setSelectedCard(selectedCard === index ? null : index)
              : null
          }
          onVisibilityToggle={() => console.log("표시/숨김 토글")}
          onSettings={() => setIsSettingsOpen(true)}
        />
      ))}

      {isSettingsOpen && (
        <ChartSettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}

// React.memo로 감싸서 props가 변경되지 않으면 리렌더링 방지
export default React.memo(ChartList);
