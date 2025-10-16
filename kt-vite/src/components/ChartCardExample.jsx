import React from "react";
import ChartCard from "./ChartCard";

export default function ChartCardExample() {
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

  const barChartData = {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [
      {
        label: "요청 건수",
        data: [120, 150, 180, 220, 170, 140, 100],
        backgroundColor: "#22c55e",
      },
    ],
  };

  const doughnutChartData = {
    labels: ["성공", "실패", "대기"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">ChartCard 컴포넌트 예제</h1>

      {/* 예제 1: 기본 선차트 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">1. 기본 선차트</h2>
        <ChartCard
          chipLabel="STT"
          chipVariant="primary"
          title="CPU 사용률"
          chartType="line"
          chartData={lineChartData}
          onChartTypeChange={(type) => console.log("차트 타입 변경:", type)}
          onVisibilityToggle={() => console.log("표시/숨김 토글")}
          onSettings={() => console.log("설정 열기")}
        />
      </div>

      {/* 예제 2: 에러 메시지가 있는 차트 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          2. 에러 메시지가 있는 차트
        </h2>
        <ChartCard
          chipLabel="TTS"
          chipVariant="secondary"
          title="메모리 사용량"
          errorMessage="서버를 개별로 차트에서 노출 또는 비노출 할 수 있습니다."
          chartType="line"
          chartData={lineChartData}
          borderColor="#5090f7"
        />
      </div>

      {/* 예제 3: 막대 차트 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">3. 막대 차트</h2>
        <ChartCard
          chipLabel="STT"
          chipVariant="primary"
          title="주간 요청 건수"
          chartType="bar"
          chartData={barChartData}
        />
      </div>

      {/* 예제 4: 도넛 차트 (컨트롤 없음) */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          4. 도넛 차트 (컨트롤 없음)
        </h2>
        <ChartCard
          chipLabel="SV"
          chipVariant="tertiary"
          title="작업 상태 분포"
          chartType="doughnut"
          chartData={doughnutChartData}
          showControls={false}
          borderColor="#a855f7"
        />
      </div>

      {/* 예제 5: 커스텀 옵션을 가진 차트 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          5. 커스텀 옵션을 가진 차트
        </h2>
        <ChartCard
          chipLabel="STT"
          chipVariant="primary"
          title="커스텀 차트"
          chartType="line"
          chartData={lineChartData}
          chartOptions={{
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
