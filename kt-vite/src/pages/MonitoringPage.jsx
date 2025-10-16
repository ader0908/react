// 통합 모니터링 페이지
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import TimeRangeSelector from "../components/TimeRangeSelector";
import Select from "../components/Select";
import { TbRefresh, TbGripHorizontal } from "react-icons/tb";
import CardExample from "../components/CardExample";
import EngineList from "./monitoring/EngineList";
import ServeList from "./monitoring/ServeList";
import ChartCardExample from "../components/ChartCardExample";
import ChartList from "./monitoring/ChartList";

const MonitoringPage = () => {
  // const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardMode, setDashboardMode] = useState("edit"); // 'view' or 'edit'
  const [dashboardType, setDashboardType] = useState("personal"); // 'public' or 'personal'
  const [selectedDashboard, setSelectedDashboard] = useState("대시보드1");

  // 시간 범위 관련 상태
  const [isRealtime, setIsRealtime] = useState(false);
  const [dataInterval, setDataInterval] = useState("1분");
  const [dateRange, setDateRange] = useState(
    "2025/09/10 16:37 ~ 2025/09/10 17:37"
  );
  const [timeRangePreset, setTimeRangePreset] = useState("최근 1시간");

  // 실시간 모드 토글 핸들러
  const handleRealtimeToggle = () => {
    const newRealtimeState = !isRealtime;
    setIsRealtime(newRealtimeState);

    // 실시간 모드로 전환 시 프리셋을 "실시간 5분"으로 변경
    if (newRealtimeState) {
      setTimeRangePreset("실시간 5분");
    } else {
      // 일반 모드로 전환 시 프리셋을 "최근 1시간"으로 변경
      setTimeRangePreset("최근 1시간");
    }
  };

  // 현재 시간 업데이트
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  // const formatTime = (date) => {
  //   return date.toLocaleTimeString("ko-KR", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     hour12: false,
  //   });
  // };

  // 중간 컨트롤 영역 - 시간 범위 선택
  const middleContent = (
    <TimeRangeSelector
      isRealtime={isRealtime}
      onRealtimeToggle={handleRealtimeToggle}
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
      timeRangePreset={timeRangePreset}
      onTimeRangePresetChange={setTimeRangePreset}
      dataInterval={dataInterval}
      onDataIntervalChange={setDataInterval}
    />
  );

  // 우측 대시보드 설정 및 액션 영역
  const rightContent = (
    <>
      {/* 대시보드 모드 선택 */}
      <div className="flex flex-col">
        <label className="text-xs text-[#a1a9aa] font-medium mb-1 block h-4">
          대시보드 모드 선택
        </label>
        <div className="flex bg-[#f4f5f5] border border-[#e4e7e7] rounded h-8">
          <button
            onClick={() => setDashboardMode("view")}
            className={`px-4 text-sm rounded transition-colors flex items-center justify-center h-8 ${
              dashboardMode === "view"
                ? "bg-white border border-[#2bb7b3] text-black"
                : "text-[#525b5b]"
            }`}
          >
            뷰모드
          </button>
          <button
            onClick={() => setDashboardMode("edit")}
            className={`px-4 text-sm rounded transition-colors flex items-center justify-center h-8 ${
              dashboardMode === "edit"
                ? "bg-white border border-[#2bb7b3] text-black"
                : "text-[#525b5b]"
            }`}
          >
            수정모드
          </button>
        </div>
      </div>

      {/* 대시보드 유형 선택 */}
      <div className="flex flex-col">
        <label className="text-xs text-[#a1a9aa] font-medium mb-1 block h-4">
          대시보드 유형 선택
        </label>
        <div className="flex items-center gap-2 h-8">
          <div className="flex bg-[#f4f5f5] border border-[#e4e7e7] rounded h-8">
            <button
              onClick={() => setDashboardType("public")}
              className={`px-4 text-sm rounded transition-colors flex items-center justify-center h-8 ${
                dashboardType === "public"
                  ? "bg-white border border-[#2bb7b3] text-black"
                  : "text-[#525b5b]"
              }`}
            >
              공용
            </button>
            <button
              onClick={() => setDashboardType("personal")}
              className={`px-4 text-sm rounded transition-colors flex items-center justify-center h-8 ${
                dashboardType === "personal"
                  ? "bg-white border border-[#2bb7b3] text-black"
                  : "text-[#525b5b]"
              }`}
            >
              개인
            </button>
          </div>
          <Select
            value={selectedDashboard}
            onChange={(e) => setSelectedDashboard(e.target.value)}
            options={[
              { value: "대시보드1", label: "대시보드1" },
              { value: "대시보드2", label: "대시보드2" },
              { value: "대시보드3", label: "대시보드3" },
            ]}
            className="w-24 h-9"
          />
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex flex-col">
        <label className="text-xs text-[#a1a9aa] font-medium mb-1 block h-4 invisible">
          액션
        </label>
        <div className="flex gap-2 h-8">
          <button className="w-8 h-8 flex items-center justify-center border border-[#e4e7e7] rounded hover:bg-gray-50">
            <TbGripHorizontal className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-[#e4e7e7] rounded hover:bg-gray-50">
            <TbRefresh className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 현재 시간 */}
      <div className="flex flex-col">
        <label className="text-xs text-[#a1a9aa] font-medium mb-1 block h-4 invisible">
          시간
        </label>
        <div className="flex items-center h-8">
          <span className="text-base font-medium">
            {/* {formatTime(currentTime)} */}
            15:30:00
          </span>
        </div>
      </div>

      {/* 목록 닫기 버튼들 - 수정모드일 때만 표시 */}
      {dashboardMode === "edit" && (
        <div className="flex flex-col">
          <label className="text-xs text-[#a1a9aa] font-medium mb-1 block h-4 invisible">
            목록
          </label>
          <div className="flex gap-2 h-8">
            <button className="h-8 px-3 flex items-center gap-2 bg-white border border-[#e4e7e7] rounded hover:bg-gray-50 whitespace-nowrap">
              <div className="relative w-2.5 h-3.5">
                <div className="w-0.5 h-2 bg-[#ed1b23] rounded-full absolute left-0 top-1/2 -translate-y-1/2" />
              </div>
              <span className="text-[11px] font-medium text-[#272a2a]">
                엔진 목록 닫기
              </span>
            </button>
            <button className="h-8 px-3 flex items-center gap-2 bg-white border border-[#e4e7e7] rounded hover:bg-gray-50 whitespace-nowrap">
              <div className="relative w-2.5 h-2.5">
                <div className="w-0.5 h-2 bg-[#ed1b23] rounded-full absolute left-0 top-1/2 -translate-y-1/2" />
              </div>
              <span className="text-[11px] font-medium text-[#272a2a]">
                서버 목록 닫기
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="space-y-4">
      {/* 모니터링 헤더 */}
      <PageHeader
        title="통합 모니터링 대시보드"
        subtitle="실시간 성능 지표 및 상태 모니터링"
        middleContent={middleContent}
        rightContent={rightContent}
      />

      {/* 엔진 항목 선택 */}
      {dashboardMode === "edit" && <EngineList />}

      {/* 서버 목록 */}

      <ServeList />

      {/* 차트 카드 */}
      <ChartList dashboardMode={dashboardMode} />
    </div>
  );
};

export default MonitoringPage;
