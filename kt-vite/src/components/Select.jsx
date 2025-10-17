/**
 * Select 컴포넌트
 * @param {string} label - 라벨 텍스트
 * @param {boolean} required - 필수 항목 여부 (기본값: false)
 * @param {string} value - 선택된 값
 * @param {Function} onChange - 값 변경 핸들러
 * @param {Array} options - 선택 옵션 배열 [{ value: string, label: string }]
 * @param {string} placeholder - placeholder 텍스트
 * @param {string} className - 추가 CSS 클래스
 * @param {string} bgColor - 배경색 (기본값: #f4f5f5)
 */
const Select = ({
  label,
  required = false,
  value,
  onChange,
  options = [],
  placeholder = "선택하세요",
  className = "",
  bgColor = "#f4f5f5",
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

      {/* Select */}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 rounded text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2bb7b3] focus:bg-white"
          style={{ backgroundColor: bgColor }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Chevron Down 아이콘 */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
