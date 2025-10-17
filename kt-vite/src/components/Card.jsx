import React from "react";

/**
 * 범용 카드 컴포넌트
 * @param {string} title - 카드 제목
 * @param {boolean} showIndicator - 왼쪽 빨간 바 표시 여부 (기본값: true)
 * @param {string} indicatorColor - 왼쪽 바 색상 (기본값: #ed1b23)
 * @param {string} description - 카드 설명 (기본값: "")
 * @param {string} descriptionTextColor - 설명 텍스트 색상 (hex 색상 코드, 기본값: #a1a9aa)
 * @param {React.ReactNode} children - 카드 내용
 * @param {React.ReactNode} headerActions - 헤더 오른쪽에 표시할 버튼 등 (선택사항)
 * @param {React.ReactNode} footer - 카드 하단 영역 (선택사항)
 * @param {string} className - 추가 스타일 클래스
 */
const Card = ({
  title,
  descriptionTextColor,
  showIndicator = true,
  indicatorColor = "#ed1b23",
  description,
  children,
  headerActions,
  footer,
  className = "",
}) => {
  // 기본 색상 설정
  const defaultDescriptionColor = "#a1a9aa";
  const finalDescriptionColor = descriptionTextColor || defaultDescriptionColor;

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
            {description && (
              <span
                className="text-xs"
                style={{ color: finalDescriptionColor }}
              >
                {description}
              </span>
            )}
          </div>
          {headerActions && (
            <div className="flex items-center gap-2">{headerActions}</div>
          )}
        </div>
      )}

      {/* 본문 영역 */}
      {children && <div className="px-5 pb-5">{children}</div>}

      {/* 푸터 영역 */}
      {footer && (
        <div className="px-5 py-4 border-t border-gray-100">{footer}</div>
      )}
    </div>
  );
};

export default Card;
