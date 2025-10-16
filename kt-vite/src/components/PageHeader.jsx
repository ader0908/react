import { useState } from "react";

const PageHeader = ({
  title,
  subtitle,
  onExpandAll,
  children,
  leftContent,
  middleContent,
  rightContent,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onExpandAll) {
      onExpandAll(newState);
    }
  };

  // 기본 전체 펼침/접기 버튼
  const defaultExpandButton = onExpandAll && (
    <button
      onClick={handleToggleExpand}
      className="flex items-center gap-2 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <span className="text-sm text-black">
        {isExpanded ? "전체 접기" : "전체 펼침"}
      </span>
      <svg
        className={`w-5 h-5 text-gray-600 transition-transform ${
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
  );

  return (
    <div className="bg-white border-l-[7px] border-[#ed1b23] rounded-lg px-7 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* 좌측: 제목 및 설명 */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-[#3f4646]">{title}</h1>
          {subtitle && <p className="text-sm text-black">{subtitle}</p>}
        </div>

        {/* 우측: 모든 콘텐츠를 하나로 묶음 */}
        <div className="flex items-end gap-4">
          {/* 좌측 콘텐츠 (제목 바로 옆) */}
          {leftContent && (
            <div className="flex items-center">{leftContent}</div>
          )}

          {/* 중간 콘텐츠 (조회 기간 등) */}
          {middleContent && (
            <div className="flex items-end gap-4">{middleContent}</div>
          )}

          {/* 우측 콘텐츠 */}
          {rightContent && (
            <div className="flex items-end gap-4">{rightContent}</div>
          )}

          {/* children이 있으면 우측에 표시 (하위 호환성) */}
          {children && <div className="flex items-center">{children}</div>}

          {/* 기본 전체 펼침/접기 버튼 (다른 콘텐츠가 없을 때만) */}
          {!children && !rightContent && !middleContent && defaultExpandButton}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
