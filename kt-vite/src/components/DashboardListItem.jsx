import React from "react";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { LuPencil } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";

/**
 * DashboardListItem 컴포넌트
 * 대시보드 리스트의 개별 아이템을 표시하는 컴포넌트
 *
 * @param {string} id - 아이템 ID
 * @param {string} title - 대시보드 제목
 * @param {string} description - 대시보드 설명
 * @param {boolean} checked - 체크 상태
 * @param {boolean} isDefault - 기본 대시보드 여부
 * @param {Function} onCheck - 체크박스 변경 핸들러
 * @param {Function} onEdit - 편집 버튼 클릭 핸들러
 * @param {Function} onStar - 즐겨찾기 버튼 클릭 핸들러
 * @param {string} className - 추가 CSS 클래스
 */
const DashboardListItem = ({
  id,
  title,
  description = "메모 내용 일부 표시 width의 1/2 넘어갈 시 말줄임..",
  checked = false,
  isDefault = false,
  onCheck,
  onEdit,
  onStar,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg border-2 ${
        checked ? "border-[#2bb7b3]" : "border-[#e4e7e7]"
      } p-4 transition-all ${className}`}
    >
      <div className="flex items-center justify-between">
        {/* 왼쪽: 체크박스 + 제목 및 설명 */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* 기본 대시보드가 아닐 때만 체크박스 표시 */}
          {!isDefault && (
            <Checkbox
              checked={checked}
              onChange={(value) => onCheck && onCheck(id, value)}
              className="flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-black truncate">
              {title}
            </h4>
            <p className="text-xs text-[#717a7a] truncate mt-1">
              {description}
            </p>
          </div>
        </div>

        {/* 오른쪽: 버튼들 또는 기본 대시보드 텍스트 */}
        {isDefault ? (
          <span className="text-xs font-medium text-[#5090f7] whitespace-nowrap ml-4">
            기본 대시보드
          </span>
        ) : (
          (onEdit || onStar) && (
            <div className="flex items-center gap-1 ml-4 flex-shrink-0">
              {onEdit && (
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => onEdit(id)}
                  icon={<LuPencil />}
                />
              )}
              {onStar && (
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => onStar(id)}
                  icon={<FaRegStar />}
                />
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DashboardListItem;
