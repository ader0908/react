/**
 * Toggle(Switch) 컴포넌트
 * @param {string} label - 라벨 텍스트
 * @param {string} description - 설명 텍스트 (옵션)
 * @param {boolean} checked - 토글 상태
 * @param {Function} onChange - 상태 변경 핸들러
 * @param {boolean} disabled - 비활성화 여부
 * @param {string} className - 추가 CSS 클래스
 */
const Toggle = ({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  className = "",
}) => {
  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-[11px] font-medium text-[#a1a9aa] mb-2 leading-tight">
          {label}
        </label>
      )}

      {/* Toggle Switch + Description */}
      <div className="flex items-center gap-2 h-9">
        {/* Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={handleToggle}
          disabled={disabled}
          className={`flex-shrink-0 relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#2bb7b3] focus:ring-offset-2 ${
            checked ? "bg-[#2bb7b3]" : "bg-[#e4e7e7]"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {/* Thumb */}
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>

        {/* Description (옵션) */}
        {description && (
          <span
            className="text-xs text-[#717a7a] whitespace-nowrap overflow-hidden text-ellipsis"
            title={description}
          >
            {description}
          </span>
        )}
      </div>
    </div>
  );
};

export default Toggle;
