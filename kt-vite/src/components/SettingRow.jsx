import React from "react";

/**
 * SettingRow 컴포넌트
 * 설정 항목의 레이아웃을 위한 공통 컴포넌트
 * 왼쪽에 타이틀, 오른쪽에 컨트롤 요소를 배치
 *
 * @param {string} title - 설정 항목 제목
 * @param {React.ReactNode} children - 오른쪽에 표시될 컨트롤 요소
 * @param {string} className - 추가 CSS 클래스
 */
const SettingRow = ({ title, children, className = "" }) => {
  return (
    <div className={`flex items-start gap-[50px] ${className}`}>
      {/* 왼쪽: 타이틀 */}
      <div className="w-[100px] flex-shrink-0">
        <span className="text-sm font-semibold text-black">{title}</span>
      </div>

      {/* 오른쪽: 컨트롤 영역 */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default SettingRow;
