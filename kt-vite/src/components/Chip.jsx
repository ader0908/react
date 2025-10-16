import React from "react";

/**
 * Chip (Badge) 컴포넌트
 * @param {string} label - 칩에 표시될 텍스트
 * @param {string} variant - 칩 스타일 ('primary', 'secondary', 'tertiary', 'disabled')
 * @param {string} color - 커스텀 배경색 (선택사항, variant 대신 사용)
 * @param {Function} onClick - 클릭 이벤트 핸들러 (선택사항)
 * @param {string} className - 추가 CSS 클래스 (선택사항)
 */
const Chip = ({
  label,
  variant = "primary",
  color,
  onClick,
  className = "",
}) => {
  // variant에 따른 배경색 설정
  const variantColors = {
    primary: "bg-[#22c55e]",
    secondary: "bg-[#5090f7]",
    tertiary: "bg-[#a855f7]",
    disabled: "bg-[#ccd3d3]",
    gray: "bg-[#d4d8d8]",
  };

  const bgColor = color ? "" : variantColors[variant] || variantColors.primary;

  return (
    <button
      onClick={onClick}
      className={`
        ${bgColor}
        text-white
        text-xs
        font-normal
        px-2
        py-1
        rounded
        inline-flex
        items-center
        justify-center
        whitespace-nowrap
        ${onClick ? "cursor-pointer hover:opacity-90" : "cursor-default"}
        transition-opacity
        ${className}
      `}
      style={color ? { backgroundColor: color } : undefined}
      disabled={variant === "disabled"}
    >
      {label}
    </button>
  );
};

export default Chip;
