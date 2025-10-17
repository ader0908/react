import React from "react";
import DashboardSectionHeader from "./DashboardSectionHeader";
import DashboardListItem from "./DashboardListItem";

/**
 * DashboardSection 컴포넌트
 * 대시보드 섹션 전체를 표시하는 컴포넌트 (헤더 + 리스트)
 *
 * @param {React.ReactNode} icon - 섹션 아이콘
 * @param {string} title - 섹션 제목
 * @param {number} count - 항목 개수
 * @param {Array} items - 대시보드 아이템 목록
 * @param {Array} selectedItems - 선택된 아이템 ID 목록
 * @param {Function} onCheck - 체크박스 변경 핸들러
 * @param {Function} onEdit - 편집 버튼 클릭 핸들러
 * @param {Function} onStar - 즐겨찾기 버튼 클릭 핸들러
 * @param {Function} onAddNew - 새 항목 추가 핸들러 (선택사항)
 * @param {boolean} showWarning - 경고 메시지 표시 여부
 * @param {string} className - 추가 CSS 클래스
 */
const DashboardSection = ({
  icon,
  title,
  count,
  items = [],
  selectedItems = [],
  onCheck,
  onEdit,
  onStar,
  onAddNew,
  showWarning = false,
  className = "",
}) => {
  return (
    <div className={`${className}`}>
      {/* 헤더 */}
      <DashboardSectionHeader
        icon={icon}
        title={title}
        count={count}
        onAddNew={onAddNew}
        showWarning={showWarning}
      />

      {/* 리스트 컨테이너 */}
      <div className="bg-[#f4f5f5] rounded-lg p-4 mb-4">
        <div className="space-y-2 max-h-[296px] overflow-y-auto pr-2 scrollbar-custom">
          {items.map((item) => (
            <DashboardListItem
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              checked={selectedItems.includes(item.id)}
              isDefault={item.isDefault}
              onCheck={onCheck}
              onEdit={onEdit}
              onStar={onStar}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(228, 231, 231, 0.8);
          border-radius: 5px;
          border: 1px solid #d4d8d8;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #a1a9aa;
          border-radius: 4px;
          border: 1px solid #fafafa;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #8a9192;
        }
      `}</style>
    </div>
  );
};

export default DashboardSection;
