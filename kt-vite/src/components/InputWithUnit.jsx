/**
 * InputWithUnit 컴포넌트 (단위 텍스트 포함)
 * @param {string} label - 라벨 텍스트
 * @param {boolean} required - 필수 항목 여부 (기본값: false)
 * @param {string} value - 입력 값
 * @param {Function} onChange - 값 변경 핸들러
 * @param {string} type - input 타입 (기본값: text)
 * @param {string} placeholder - placeholder 텍스트
 * @param {boolean} disabled - 비활성화 여부
 * @param {boolean} readOnly - 읽기 전용 여부
 * @param {string} className - 추가 CSS 클래스
 * @param {string} unit - 단위 텍스트 (예: "초", "분", "GB", "%")
 */
const InputWithUnit = ({
  label,
  required = false,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled = false,
  readOnly = false,
  className = "",
  unit = "",
}) => {
  // 비활성화/읽기전용 상태에 따른 배경색
  const bgColorClass = disabled || readOnly ? "bg-[#f4f5f5]" : "bg-[#f4f5f5]";

  // 텍스트 색상
  const textColorClass = disabled || readOnly ? "text-[#a1a9aa]" : "text-black";

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-[11px] font-medium text-[#a1a9aa] mb-2 leading-tight">
          {label}
          {required && <span className="text-[#ed1b23] ml-1">*</span>}
        </label>
      )}

      {/* Input with Unit */}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className={`w-full px-3 py-2 ${bgColorClass} ${textColorClass} rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2bb7b3] focus:bg-white transition-colors ${
            unit ? "pr-12" : ""
          } ${disabled ? "cursor-not-allowed" : ""} ${
            readOnly ? "cursor-default" : ""
          }`}
        />

        {/* Unit Text */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <span className="text-sm text-[#717a7a] font-medium">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default InputWithUnit;
