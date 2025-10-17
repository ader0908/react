import React from "react";
import Chip from "./Chip";
import Chart from "./Chart";
import { TbEye, TbSettings } from "react-icons/tb";
import Button from "./Button";

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
  onSelectSettings,
  onChartSettings,
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
                {onSelectSettings && (
                  <Button
                    variant="outline"
                    size="small"
                    icon={<TbEye />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSettings();
                    }}
                  />
                )}

                {/* 설정 버튼 */}
                {onChartSettings && (
                  <Button
                    variant="outline"
                    size="small"
                    icon={<TbSettings />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChartSettings();
                    }}
                  />
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
