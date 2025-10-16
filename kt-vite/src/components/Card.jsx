import React from "react";

/**
 * 범용 카드 컴포넌트
 * @param {string} title - 카드 제목
 * @param {boolean} showIndicator - 왼쪽 빨간 바 표시 여부 (기본값: true)
 * @param {string} indicatorColor - 왼쪽 바 색상 (기본값: #ed1b23)
 * @param {React.ReactNode} children - 카드 내용
 * @param {React.ReactNode} headerActions - 헤더 오른쪽에 표시할 버튼 등 (선택사항)
 * @param {React.ReactNode} footer - 카드 하단 영역 (선택사항)
 * @param {string} className - 추가 스타일 클래스
 */
const Card = ({
  title,
  showIndicator = true,
  indicatorColor = "#ed1b23",
  children,
  headerActions,
  footer,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-md shadow-sm ${className}`}>
      {/* 헤더 영역 */}
      {title && (
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showIndicator && (
              <div
                className="w-1.5 h-4 rounded"
                style={{ backgroundColor: indicatorColor }}
              />
            )}
            <h3 className="text-lg font-semibold text-black">{title}</h3>
          </div>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}

      {/* 본문 영역 */}
      <div className="p-5">{children}</div>

      {/* 하단 영역 (선택사항) */}
      {footer && (
        <div className="px-5 py-4 border-t border-[#e4e7e7]">{footer}</div>
      )}
    </div>
  );
};

export default Card;
