import React from "react";
import Button from "./Button";

/**
 * DashboardSectionHeader 컴포넌트
 * 대시보드 섹션의 헤더를 표시하는 컴포넌트
 *
 * @param {React.ReactNode} icon - 아이콘
 * @param {string} title - 섹션 제목
 * @param {string} count - 항목 개수
 * @param {boolean} showWarning - 경고 메시지 표시 여부
 * @param {string} warningText - 경고 메시지 텍스트
 * @param {Function} onAddNew - 새 항목 추가 버튼 클릭 핸들러
 * @param {string} addNewText - 새 항목 추가 버튼 텍스트
 * @param {string} className - 추가 CSS 클래스
 */
const DashboardSectionHeader = ({
  icon,
  title,
  count,
  showWarning = false,
  warningText = "서버를 개별로 차트에서 노출 또는 비노출 할 수 있습니다..",
  onAddNew,
  addNewText = "새 대시보드",
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-between h-8 mb-4 ${className}`}>
      {/* 왼쪽: 아이콘 + 제목 */}
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-6 h-6 rounded-full bg-[#808a91] flex items-center justify-center text-white">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-black">
          {title} {count && <span>({count}개)</span>}
        </h3>
      </div>

      {/* 오른쪽: 경고 메시지 + 버튼 */}
      <div className="flex items-center gap-3">
        {showWarning && (
          <span className="text-xs text-[#ea580c]">{warningText}</span>
        )}
        {onAddNew && (
          <Button
            variant="outline"
            size="medium"
            onClick={onAddNew}
            icon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            }
            title={addNewText}
            className="h-8 text-xs"
          />
        )}
      </div>
    </div>
  );
};

export default DashboardSectionHeader;
