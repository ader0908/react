import { useState } from "react";

/**
 * 아코디언 카드 컴포넌트 - 펼침/접기 기능이 있는 카드
 * @param {string} title - 카드 제목
 * @param {string} errorMessage - 제목 옆에 표시될 에러/경고 메시지 (선택사항)
 * @param {React.ReactNode} children - 카드 내용
 */
const AccordionCard = ({ title, errorMessage, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-md shadow-sm">
      {/* Body - 헤더 영역 */}
      <div>
        <div className="flex items-center gap-3 px-5 py-4">
          {/* 왼쪽 빨간 막대 */}
          <div className="w-1.5 h-4 bg-[#ed1b23] rounded-full"></div>

          {/* 제목 */}
          <h3 className="text-base font-semibold text-black">{title}</h3>

          {/* 에러/경고 메시지 */}
          {errorMessage && (
            <p className="text-xs text-[#ea580c] self-end pb-0.5">
              {errorMessage}
            </p>
          )}

          {/* 우측 버튼들 - flex-1을 추가하여 우측으로 밀기 */}
          <div className="flex-1"></div>

          {/* 아코디언 버튼 */}
          <div>
            {/* 펼치기/접기 아이콘 */}
            <button
              onClick={handleToggle}
              className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg
                className={`w-5 h-5 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
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
            </button>
          </div>
        </div>
        {/* border를 별도로 분리 - 좌우 padding 포함 */}
        <div className="px-5">
          <div className="border-b border-gray-200"></div>
        </div>
      </div>

      {/* Content - 실제 내용 영역 */}
      {isExpanded && <div className="p-5 bg-whit rounded-md">{children}</div>}
    </div>
  );
};

export default AccordionCard;
