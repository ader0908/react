/**
 * Button 컴포넌트
 * @param {string} variant - 버튼 스타일 (primary, secondary, outline, ghost, danger)
 * @param {string} size - 버튼 크기 (small, medium, large)
 * @param {boolean} disabled - 비활성화 여부
 * @param {Function} onClick - 클릭 핸들러
 * @param {React.ReactNode} children - 버튼 내용
 * @param {React.ReactNode} icon - 아이콘
 * @param {string} iconSize - 아이콘 크기 (커스텀 Tailwind 클래스, 예: "w-5 h-5")
 * @param {string} type - 버튼 타입 (button, submit, reset)
 * @param {string} className - 추가 CSS 클래스
 * @param {string} title - 버튼 타이틀
 */
const Button = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
  icon,
  iconSize,
  type = "button",
  className = "",
  title,
}) => {
  // Variant별 스타일
  const variantStyles = {
    primary: "bg-[#181b1b] text-white hover:bg-[#2a2d2d]",
    secondary: "bg-[#a1a9aa] text-white hover:bg-[#8a9192]",
    outline:
      "bg-white text-[#181b1b] border border-[#e4e7e7] hover:bg-[#f4f5f5]",
    ghost: "bg-transparent text-[#181b1b] hover:bg-[#f4f5f5]",
    danger: "bg-[#ed1b23] text-white hover:bg-[#d41820]",
  };

  // 아이콘 전용 버튼 여부 확인
  const isIconOnly = icon && !title;

  // Size별 스타일
  const sizeStyles = {
    small: isIconOnly ? "w-6 h-6 p-0" : "px-3 h-8 text-xs",
    medium: isIconOnly ? "w-9 h-9 p-0" : "px-4 h-9 text-sm",
    large: isIconOnly ? "w-11 h-11 p-0" : "px-6 h-11 text-base",
  };

  // 아이콘 크기
  const iconSizes = {
    small: "w-4 h-4",
    medium: "w-4.5 h-4.5",
    large: "w-5 h-5",
  };

  // 기본 스타일
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#2bb7b3] focus:ring-offset-2 whitespace-nowrap";

  // gap 스타일 (아이콘 전용일 때는 gap 없음)
  const gapStyles = isIconOnly ? "" : "gap-2";

  // Disabled 스타일
  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  // 아이콘 크기 결정 (커스텀 iconSize 우선, 없으면 size 기반)
  const finalIconSize = iconSize || iconSizes[size];

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyles} ${gapStyles} ${variantStyles[variant] || ""} ${
        sizeStyles[size]
      } ${disabledStyles} ${className}`}
    >
      {icon && (
        <span
          className={`inline-flex items-center justify-center ${finalIconSize} [&>svg]:w-full [&>svg]:h-full`}
        >
          {icon}
        </span>
      )}
      {title}
    </button>
  );
};

export default Button;
