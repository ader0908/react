import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

/**
 * DateRangePicker 컴포넌트 - 시작일과 종료일을 선택하는 날짜 범위 선택기
 * @param {string} label - 라벨 텍스트
 * @param {boolean} required - 필수 항목 여부 (기본값: false)
 * @param {Date} startDate - 시작일
 * @param {Date} endDate - 종료일
 * @param {Function} onStartDateChange - 시작일 변경 핸들러
 * @param {Function} onEndDateChange - 종료일 변경 핸들러
 * @param {string} startPlaceholder - 시작일 placeholder
 * @param {string} endPlaceholder - 종료일 placeholder
 * @param {string|number} width - 전체 너비 (픽셀 숫자 또는 '100%' 같은 문자열, 기본값: 253)
 * @param {string} className - 추가 CSS 클래스
 */
const DateRangePicker = ({
  label = "조회기간",
  required = false,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  startPlaceholder = "시작일",
  endPlaceholder = "종료일",
  width = 253,
  className = "",
}) => {
  // width를 문자열이나 숫자로 처리
  const containerWidth = typeof width === "number" ? `${width}px` : width;

  // 각 input의 너비 계산 (전체 너비에서 구분자와 gap 제외)
  // gap-2는 8px, 구분자는 약 9px (text-sm의 ~)
  const separatorWidth = 17; // 구분자 + gap
  const inputWidthCalc =
    typeof width === "number"
      ? `${Math.floor((width - separatorWidth) / 2)}px`
      : `calc((100% - ${separatorWidth}px) / 2)`;
  return (
    <div className={className} style={{ width: containerWidth }}>
      {/* Label */}
      {label && (
        <label className="block text-xs font-medium text-[#a1a9aa] leading-tight mb-2">
          {label}
          {required && <span className="text-[#ed1b23] ml-1">*</span>}
        </label>
      )}

      {/* Date Range Inputs */}
      <div className="flex items-center gap-2">
        {/* 시작일 */}
        <div className="relative" style={{ width: inputWidthCalc }}>
          <ReactDatePicker
            selected={startDate}
            onChange={onStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText={startPlaceholder}
            dateFormat="yyyy-MM-dd"
            className="w-full px-2.5 py-2 pr-8 h-9 bg-white rounded text-sm text-black placeholder:text-[#a1a9aa] focus:outline-none focus:ring-2 focus:ring-[#2bb7b3] border border-transparent"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <FaRegCalendarAlt className="w-4 h-4 text-[#525b5b]" />
          </div>
        </div>

        {/* 구분자 */}
        <span className="text-sm text-black">~</span>

        {/* 종료일 */}
        <div className="relative" style={{ width: inputWidthCalc }}>
          <ReactDatePicker
            selected={endDate}
            onChange={onEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText={endPlaceholder}
            dateFormat="yyyy-MM-dd"
            className="w-full px-2.5 py-2 h-9 pr-8 bg-white rounded text-sm text-black placeholder:text-[#a1a9aa] focus:outline-none focus:ring-2 focus:ring-[#2bb7b3] border border-transparent"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <FaRegCalendarAlt className="w-4 h-4 text-[#525b5b]" />
          </div>
        </div>
      </div>

      {/* DatePicker 스타일 오버라이드 */}
      <style jsx="true">{`
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker__input-container {
          width: 100%;
        }
        .react-datepicker {
          font-family: inherit;
          border: 1px solid #e4e7e7;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .react-datepicker__header {
          background-color: #f4f5f5;
          border-bottom: 1px solid #e4e7e7;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .react-datepicker__current-month {
          color: #181b1b;
          font-weight: 600;
        }
        .react-datepicker__day-name {
          color: #525b5b;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--in-selecting-range,
        .react-datepicker__day--in-range {
          background-color: #2bb7b3;
          color: white;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: #2bb7b3;
          color: white;
        }
        .react-datepicker__day:hover {
          background-color: #e4e7e7;
          border-radius: 4px;
        }
        .react-datepicker__day--disabled {
          color: #ccc;
        }
      `}</style>
    </div>
  );
};

export default DateRangePicker;
