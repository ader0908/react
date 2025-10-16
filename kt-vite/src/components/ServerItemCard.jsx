import React from "react";

/**
 * 서버 항목 카드 컴포넌트 (EngineItemCard의 변형)
 * 서버 리스트를 표시할 때 사용하며, 칩들을 한 줄로 표시합니다.
 * @param {string} title - 카드 제목 (예: "STT", "TTS", "SV")
 * @param {React.ReactNode} children - 카드 내용 (주로 Chip 컴포넌트들)
 * @param {string} borderColor - 테두리 색상 (선택사항, 기본값: #22c55e)
 * @param {string} className - 추가 CSS 클래스 (선택사항)
 */
const ServerItemCard = ({
  title,
  children,
  borderColor = "#22c55e",
  className = "",
}) => {
  return (
    <fieldset
      className={`bg-white rounded-lg px-5 py-4 border ${className}`}
      style={{ borderColor }}
    >
      {/* 제목 - fieldset의 legend 역할 */}
      <legend className="px-2 text-sm font-semibold text-black">{title}</legend>

      {/* 칩 영역 */}
      <div className="flex gap-1.5">{children}</div>
    </fieldset>
  );
};

export default ServerItemCard;
