import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

/**
 * DatePicker 컴포넌트
 * @param {string} label - 라벨 텍스트
 * @param {boolean} required - 필수 항목 여부 (기본값: false)
 * @param {Date} value - 선택된 날짜
 * @param {Function} onChange - 날짜 변경 핸들러
 * @param {string} placeholder - placeholder 텍스트
 * @param {string} className - 추가 CSS 클래스
 * @param {Date} minDate - 선택 가능한 최소 날짜
 * @param {Date} maxDate - 선택 가능한 최대 날짜
 */
const DatePicker = ({
  label,
  required = false,
  value,
  onChange,
  placeholder = "날짜 선택",
  className = "",
  minDate,
  maxDate,
}) => {
  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-[11px] font-medium text-[#a1a9aa] mb-2 leading-tight">
          {label}
          {required && <span className="text-[#ed1b23] ml-1">*</span>}
        </label>
      )}

      {/* Date Input */}
      <div className="relative">
        <ReactDatePicker
          selected={value}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText={placeholder}
          dateFormat="yyyy-MM-dd"
          className="w-full px-3 py-2 pr-10 bg-[#f4f5f5] rounded text-sm text-black placeholder:text-[#a1a9aa] focus:outline-none focus:ring-2 focus:ring-[#2bb7b3] border border-transparent"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <FaRegCalendarAlt className="w-4 h-4 text-[#525b5b]" />
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

export default DatePicker;
