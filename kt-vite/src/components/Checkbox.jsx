/**
 * Checkbox 컴포넌트
 * @param {string} label - 체크박스 라벨
 * @param {boolean} checked - 체크 상태
 * @param {Function} onChange - 상태 변경 핸들러
 * @param {boolean} disabled - 비활성화 여부
 * @param {string} className - 추가 CSS 클래스
 */
const Checkbox = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  className = "",
}) => {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <label
      className={`inline-flex items-center gap-2 cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {/* Checkbox */}
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={`w-4 h-4 rounded border-2 transition-all flex items-center justify-center ${
            checked ? "bg-white border-[#2bb7b3]" : "bg-white border-[#e4e7e7]"
          } ${
            disabled
              ? ""
              : "peer-focus:ring-2 peer-focus:ring-[#2bb7b3] peer-focus:ring-offset-1"
          }`}
        >
          {/* Check Icon */}
          {checked && (
            <svg
              className="w-3 h-3 text-[#2bb7b3]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Label */}
      {label && <span className="text-sm text-black select-none">{label}</span>}
    </label>
  );
};

export default Checkbox;
