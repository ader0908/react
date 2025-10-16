import React from "react";
import Chip from "./Chip";
import Chart from "./Chart";

/**
 * 차트 카드 컴포넌트 - 모니터링 차트를 표시하는 카드입니다.
 * @param {string} chipLabel - 칩 라벨 (예: "STT", "TTS")
 * @param {'primary' | 'secondary' | 'tertiary'} chipVariant - 칩 스타일
 * @param {string} title - 차트 제목 (예: "CPU 사용률")
 * @param {string} errorMessage - 에러/경고 메시지 (선택사항)
 * @param {'line' | 'bar' | 'doughnut' | 'pie'} chartType - 차트 타입
 * @param {Object} chartData - Chart.js 데이터 객체
 * @param {Object} chartOptions - Chart.js 옵션 객체 (선택사항)
 * @param {Function} onChartTypeChange - 차트 타입 변경 핸들러 (선택사항)
 * @param {Function} onVisibilityToggle - 표시/숨김 토글 핸들러 (선택사항)
 * @param {Function} onSettings - 설정 버튼 클릭 핸들러 (선택사항)
 * @param {boolean} showControls - 컨트롤 버튼 표시 여부 (기본값: true)
 * @param {string} borderColor - 카드 테두리 색상 (선택사항, 기본값: #5090f7)
 * @param {boolean} selected - 선택 상태 (선택사항, 기본값: false)
 * @param {Function} onSelect - 카드 선택 핸들러 (선택사항)
 * @param {string} className - 추가 CSS 클래스 (선택사항)
 */
const ChartCard = ({
  chipLabel,
  chipVariant = "primary",
  title,
  errorMessage,
  chartType = "line",
  chartData,
  chartOptions = {},
  onVisibilityToggle,
  onSettings,
  showControls = true,
  borderColor = "#5090f7",
  selected = false,
  onSelect,
  className = "",
}) => {
  return (
    <div
      className={`relative bg-white rounded-md border ${
        selected ? "border-2" : ""
      } ${className} cursor-pointer transition-all`}
      style={{
        borderColor: selected ? borderColor : "#e4e7e7",
        overflow: "visible",
      }}
      onClick={onSelect}
    >
      {/* 선택 시 리사이즈 핸들 (네 모서리) */}
      {selected && (
        <>
          {/* 왼쪽 상단 */}
          <div
            className="absolute -top-1 -left-1 w-2 h-2 rounded-full border-2 border-white"
            style={{ backgroundColor: borderColor }}
          />
          {/* 오른쪽 상단 */}
          <div
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full border-2 border-white"
            style={{ backgroundColor: borderColor }}
          />
          {/* 왼쪽 하단 */}
          <div
            className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full border-2 border-white"
            style={{ backgroundColor: borderColor }}
          />
          {/* 오른쪽 하단 */}
          <div
            className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full border-2 border-white"
            style={{ backgroundColor: borderColor }}
          />
        </>
      )}

      {/* 헤더 영역 */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* 왼쪽: 칩 + 제목 */}
          <div className="flex items-center gap-2">
            <Chip label={chipLabel} variant={chipVariant} />
            <h3 className="text-sm font-semibold text-black">{title}</h3>
          </div>

          {/* 오른쪽: 에러 메시지 + 컨트롤 */}
          <div className="flex items-center gap-2">
            {errorMessage && (
              <p className="text-xs text-[#ea580c]">{errorMessage}</p>
            )}

            {showControls && (
              <>
                {/* 표시/숨김 버튼 */}
                {onVisibilityToggle && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onVisibilityToggle();
                    }}
                    className="w-6 h-6 flex items-center justify-center border border-[#e4e7e7] rounded hover:bg-gray-50 transition-colors"
                    title="표시/숨김"
                  >
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                )}

                {/* 설정 버튼 */}
                {onSettings && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSettings();
                    }}
                    className="w-6 h-6 flex items-center justify-center border border-[#e4e7e7] rounded hover:bg-gray-50 transition-colors"
                    title="설정"
                  >
                    <svg
                      className="w-3 h-3 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="px-3 pb-3">
        <div
          style={{
            height: "248px",
            position: "relative",
          }}
        >
          <Chart
            key={`chart-${title}-${chartType}`}
            type={chartType}
            data={chartData}
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
