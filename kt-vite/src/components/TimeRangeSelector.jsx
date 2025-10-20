import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import Select from "./Select";
import Dropdown from "./Dropdown";
import { LuPlay } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { IoStopCircleOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const datePickerRef = useRef(null);
  const calendarIconRef = useRef(null);

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

  // 날짜 포맷 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  // 적용 버튼 클릭 핸들러
  const handleApply = () => {
    if (startDate && endDate) {
      const rangeString = `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
      onDateRangeChange?.(rangeString);
      setIsCalendarOpen(false);
    }
  };

  // 취소 버튼 클릭 핸들러
  const handleCancel = () => {
    setIsCalendarOpen(false);
    // 취소 시 이전 상태로 되돌림
    setStartDate(null);
    setEndDate(null);
  };

  // 달력 열릴 때 페이지 스크롤 완전히 막기
  useEffect(() => {
    if (isCalendarOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;

      // 스크롤바 너비 계산 (레이아웃 shift 방지)
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // body 스크롤 막기
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      // 스크롤바가 사라지면서 생기는 레이아웃 shift 방지
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      // 모든 스크롤 이벤트 완전히 차단
      const preventScroll = (e) => {
        // 달력 내부가 아니면 스크롤 막기
        if (
          datePickerRef.current &&
          !datePickerRef.current.contains(e.target)
        ) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      };

      // 키보드 스크롤 막기
      const preventKeyScroll = (e) => {
        // 방향키, Page Up/Down, Home, End, Space 막기
        if (
          [
            "ArrowUp",
            "ArrowDown",
            "PageUp",
            "PageDown",
            "Home",
            "End",
            " ",
          ].includes(e.key)
        ) {
          if (
            datePickerRef.current &&
            !datePickerRef.current.contains(e.target)
          ) {
            e.preventDefault();
          }
        }
      };

      // 휠, 터치, 키보드 스크롤 모두 막기
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, { passive: false });
      document.addEventListener("keydown", preventKeyScroll);

      return () => {
        // 원래 상태로 복구
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";

        // 이벤트 리스너 제거
        document.removeEventListener("wheel", preventScroll);
        document.removeEventListener("touchmove", preventScroll);
        document.removeEventListener("keydown", preventKeyScroll);

        // 스크롤 위치 복원
        window.scrollTo(0, scrollY);
      };
    }
  }, [isCalendarOpen]);

  // 외부 클릭 감지하여 달력 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target) &&
        calendarIconRef.current &&
        !calendarIconRef.current.contains(event.target)
      ) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  // 달력 아이콘 클릭 핸들러
  const handleCalendarClick = () => {
    if (!isCalendarOpen && calendarIconRef.current) {
      const rect = calendarIconRef.current.getBoundingClientRect();
      setCalendarPosition({
        top: rect.bottom + window.scrollY + 8, // 아이콘 아래 8px
        left: rect.left + window.scrollX + rect.width / 2, // 아이콘 중앙
      });
    }
    setIsCalendarOpen(!isCalendarOpen);
  };

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
    <div
      className={`flex items-end gap-4 ${className}`}
      style={{ overflow: "visible" }}
    >
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
      <div
        className={`flex-1 ${
          isRealtime ? "min-w-[300px]" : "min-w-[370px]"
        } flex flex-col`}
        style={{ overflow: "visible" }}
      >
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
          <div className="relative h-8" style={{ overflow: "visible" }}>
            <input
              type="text"
              value={dateRange}
              readOnly
              placeholder="2025/09/10 16:37 ~ 2025/09/10 17:37"
              className="w-full h-8 px-3 pr-[10px]  bg-[#f4f5f5] border-none rounded text-sm"
            />
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5"
              style={{ overflow: "visible" }}
            >
              <Dropdown
                items={timeRangePresets}
                selectedValue={timeRangePreset}
                onSelect={onTimeRangePresetChange}
                triggerLabel={timeRangePreset}
                grouped={true}
                align="right"
              />
              <div ref={calendarIconRef}>
                <FiCalendar
                  className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
                  onClick={handleCalendarClick}
                />
              </div>
              {isCalendarOpen &&
                createPortal(
                  <div
                    ref={datePickerRef}
                    className="fixed z-[10000] bg-white rounded-lg shadow-2xl p-4"
                    style={{
                      border: "1px solid #e4e7e7",
                      minWidth: "700px",
                      top: `${calendarPosition.top}px`,
                      left: `${calendarPosition.left}px`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="flex flex-col gap-4">
                      {/* 날짜 범위 선택 */}
                      <div className="flex gap-4">
                        {/* 시작 날짜/시간 */}
                        <div className="flex-1">
                          <label className="text-xs font-medium text-gray-600 mb-2 block">
                            시작 날짜/시간
                          </label>
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={5}
                            dateFormat="yyyy/MM/dd HH:mm"
                            locale={ko}
                            inline
                          />
                        </div>

                        {/* 종료 날짜/시간 */}
                        <div className="flex-1">
                          <label className="text-xs font-medium text-gray-600 mb-2 block">
                            종료 날짜/시간
                          </label>
                          <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={5}
                            dateFormat="yyyy/MM/dd HH:mm"
                            locale={ko}
                            inline
                          />
                        </div>
                      </div>

                      {/* 버튼 영역 */}
                      <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                        >
                          취소
                        </button>
                        <button
                          onClick={handleApply}
                          className="px-4 py-2 text-sm bg-[#2bb7b3] text-white rounded hover:bg-[#25a09d] disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!startDate || !endDate}
                        >
                          적용
                        </button>
                      </div>
                    </div>
                  </div>,
                  document.body
                )}
            </div>
          </div>
        )}
      </div>

      {/* 데이터 간격 */}
      <div className="w-20 flex flex-col relative">
        <Select
          value={dataInterval}
          onChange={(e) => onDataIntervalChange?.(e.target.value)}
          options={intervalOptions}
          disabled={isRealtime}
          label="데이터 간격"
        />
      </div>
    </div>
  );
};

export default TimeRangeSelector;
