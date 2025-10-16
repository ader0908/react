import React from "react";
import ChartCard from "../../components/ChartCard";

export default function ChartList() {
  // 샘플 차트 데이터
  const lineChartData = {
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
  };
  return (
    <div className="flex flex-wrap gap-4">
      <ChartCard
        chipLabel="STT"
        chipVariant="primary"
        title="CPU 사용률"
        chartType="line"
        chartData={lineChartData}
        onChartTypeChange={(type) => console.log("차트 타입 변경:", type)}
        onVisibilityToggle={() => console.log("표시/숨김 토글")}
        onSettings={() => console.log("설정 열기")}
        className="flex-[0_0_calc(33.333%-0.667rem)]"
      />
      <ChartCard
        chipLabel="STT"
        chipVariant="primary"
        title="CPU 사용률"
        chartType="line"
        chartData={lineChartData}
        onChartTypeChange={(type) => console.log("차트 타입 변경:", type)}
        onVisibilityToggle={() => console.log("표시/숨김 토글")}
        onSettings={() => console.log("설정 열기")}
        className="flex-[0_0_calc(33.333%-0.667rem)]"
      />
      <ChartCard
        chipLabel="STT"
        chipVariant="primary"
        title="CPU 사용률"
        chartType="line"
        chartData={lineChartData}
        onChartTypeChange={(type) => console.log("차트 타입 변경:", type)}
        onVisibilityToggle={() => console.log("표시/숨김 토글")}
        onSettings={() => console.log("설정 열기")}
        className="flex-[0_0_calc(33.333%-0.667rem)]"
      />
    </div>
  );
}
