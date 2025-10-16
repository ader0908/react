/**
 * 섹션 카드 컴포넌트 - AccordionCard의 content 영역에 사용
 * @param {string} title - 섹션 제목 (예: "학습", "운영")
 * @param {React.ReactNode} children - 섹션 내용
 */
const SectionCard = ({ title, children }) => {
  return (
    <div className="flex-1 border border-[#e4e7e7] rounded-lg p-5 relative">
      {/* 섹션 제목 - 상단 테두리 위에 겹치게 */}
      <div className="absolute -top-3 left-5 bg-white px-2">
        <span className="text-sm font-semibold text-black">{title}</span>
      </div>

      {/* 섹션 내용 */}
      <div className="mt-3">{children}</div>
    </div>
  );
};

export default SectionCard;
