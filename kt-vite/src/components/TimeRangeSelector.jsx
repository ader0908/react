import { useState, useEffect } from "react";
import Button from "./Button";
import Select from "./Select";
import Dropdown from "./Dropdown";
import { LuPlay } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { IoStopCircleOutline } from "react-icons/io5";

/**
 * 시간 범위 선택 컴포넌트
 * 실시간 버튼, 조회 기간 설정, 데이터 간격 선택을 포함
 */
const TimeRangeSelector = ({
  // 실시간 모드
  isRealtime = false,
  onRealtimeToggle,

  // 조회 기간
  dateRange = "",
  onDateRangeChange,
  timeRangePreset = "최근 1시간",
  onTimeRangePresetChange,

  // 데이터 간격
  dataInterval = "1분",
  onDataIntervalChange,

  // 스타일 커스터마이징
  className = "",
}) => {
  const [currentTime, setCurrentTime] = useState("");

  // 현재 시간 업데이트 (실시간 모드일 때)
  useEffect(() => {
    if (isRealtime) {
      const updateTime = () => {
        const now = new Date();
        const timeString = now.toTimeString().slice(0, 8);
        setCurrentTime(timeString);
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);

      return () => clearInterval(interval);
    }
  }, [isRealtime]);

  // 시간 범위 프리셋 옵션
  const timeRangePresets = [
    { group: "빠른 선택", items: ["최근 5분", "최근 10분"] },
    {
      group: "시간 단위",
      items: ["최근 1시간", "최근 3시간", "최근 1일", "최근 7일", "최근 30일"],
    },
    { group: "일 단위", items: ["오늘(00~24시)", "어제(00~24시)"] },
    {
      group: "상대 시간",
      items: ["시작시간~5분", "시작시간~10분", "시작시간~1시간"],
    },
  ];

  // 실시간 간격 옵션
  const realtimeIntervalOptions = [
    { value: "실시간 5분", label: "실시간 5분" },
    { value: "실시간 10분", label: "실시간 10분" },
    { value: "실시간 1시간", label: "실시간 1시간" },
  ];

  // 데이터 간격 옵션
  const intervalOptions = [
    { value: "자동", label: "자동" },
    { value: "1분", label: "1분" },
    { value: "5분", label: "5분" },
    { value: "10분", label: "10분" },
    { value: "1시간", label: "1시간" },
  ];

  return (
    <div className={`flex items-end gap-4 ${className}`}>
      {/* 실시간/정지 버튼 */}
      <div className="flex flex-col">
        <label className="text-xs text-[#a1a9aa] font-medium mb-1 block h-4 invisible">
          {isRealtime ? "정지" : "실시간"}
        </label>
        <Button
          title={isRealtime ? "정지" : "실시간"}
          variant={null}
          className={`
           bg-[#ea580c] text-white hover:bg-[#ea580cd3] h-8`}
          icon={isRealtime ? <IoStopCircleOutline /> : <LuPlay />}
          size="small"
          onClick={onRealtimeToggle}
        />
      </div>

      {/* 조회 기간 설정 */}
      <div className="flex-1 max-w-[417px] flex flex-col">
        <label className="text-xs text-[#a1a9aa] font-medium mb-1 block h-4">
          조회 기간 설정
          <span className="text-[#ed1b23] ml-0.5">*</span>
        </label>

        {isRealtime ? (
          /* 실시간 모드 UI */
          <div className="relative h-8 bg-[#f4f5f5] rounded flex items-center px-3 gap-2">
            {/* 녹색 인디케이터 */}
            <div className="w-2.5 h-2.5 bg-[#22c55e] rounded-full flex-shrink-0" />

            {/* 상태 텍스트 */}
            <span className="text-sm text-black whitespace-nowrap">
              실시간 감시중
            </span>

            {/* 시간 표시 */}
            <span className="text-sm text-black font-bold whitespace-nowrap">
              {currentTime}
            </span>

            {/* 실시간 간격 배지 (드롭다운) */}
            <div className="ml-auto">
              <Dropdown
                items={realtimeIntervalOptions}
                selectedValue={timeRangePreset}
                onSelect={onTimeRangePresetChange}
                triggerLabel={timeRangePreset}
                align="right"
              />
            </div>
          </div>
        ) : (
          /* 일반 모드 UI */
          <div className="relative h-8">
            <input
              type="text"
              value={dateRange}
              onChange={(e) => onDateRangeChange?.(e.target.value)}
              placeholder="2025/09/10 16:37 ~ 2025/09/10 17:37"
              className="w-full h-8 px-3 pr-[110px] bg-[#f4f5f5] border-none rounded text-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <Dropdown
                items={timeRangePresets}
                selectedValue={timeRangePreset}
                onSelect={onTimeRangePresetChange}
                triggerLabel={timeRangePreset}
                grouped={true}
                align="right"
              />
              <FiCalendar className="w-4 h-4 text-gray-600 cursor-pointer" />
            </div>
          </div>
        )}
      </div>

      {/* 데이터 간격 */}
      <div className="w-20 flex flex-col relative">
        <label className="text-xs text-[#a1a9aa] font-medium mb-1 block h-4">
          데이터 간격
          <span className="text-[#ed1b23] ml-0.5">*</span>
        </label>
        <Select
          value={dataInterval}
          onChange={(e) => onDataIntervalChange?.(e.target.value)}
          options={intervalOptions}
          className="h-9"
          disabled={isRealtime}
        />
      </div>
    </div>
  );
};

export default TimeRangeSelector;
