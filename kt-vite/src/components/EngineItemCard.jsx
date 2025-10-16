import React from "react";

/**
 * 엔진 항목 카드 컴포넌트
 * @param {string} title - 카드 제목 (예: "STT", "TTS", "SV")
 * @param {React.ReactNode} children - 카드 내용 (주로 Chip 컴포넌트들)
 * @param {string} borderColor - 테두리 색상 (선택사항, 기본값: #22c55e)
 * @param {string} className - 추가 CSS 클래스 (선택사항)
 */
const EngineItemCard = ({
  title,
  children,
  borderColor = "#22c55e",
  className = "",
}) => {
  return (
    <div
      className={`
        bg-white
        rounded-lg
        px-5
        py-2
        border
        ${className}
      `}
      style={{ borderColor }}
    >
      <div className="flex items-center gap-4">
        {/* 제목 */}
        <h3 className="text-sm font-semibold text-black min-w-[32px]">
          {title}
        </h3>

        {/* 칩 영역 */}
        <div className="flex flex-wrap gap-1">{children}</div>
      </div>
    </div>
  );
};

export default EngineItemCard;
