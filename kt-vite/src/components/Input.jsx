/**
 * Input 컴포넌트
 * @param {string} label - 라벨 텍스트
 * @param {boolean} required - 필수 항목 여부 (기본값: false)
 * @param {string} value - 입력 값
 * @param {Function} onChange - 값 변경 핸들러
 * @param {string} placeholder - placeholder 텍스트
 * @param {string} type - input type (기본값: "text")
 * @param {boolean} disabled - 비활성화 여부
 * @param {boolean} readOnly - 읽기 전용 여부
 * @param {string} className - 추가 CSS 클래스
 */
const Input = ({
  label,
  required = false,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  readOnly = false,
  className = "",
}) => {
  // disabled나 readOnly일 때 텍스트 색상을 gray로
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

      {/* Input */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={`w-full px-3 py-2 bg-[#f4f5f5] rounded text-sm ${textColorClass} placeholder:text-[#717a7a] focus:outline-none focus:ring-2 focus:ring-[#2bb7b3] focus:bg-white ${
          disabled ? "cursor-not-allowed opacity-60" : ""
        } ${readOnly ? "cursor-default" : ""}`}
      />
    </div>
  );
};

export default Input;
