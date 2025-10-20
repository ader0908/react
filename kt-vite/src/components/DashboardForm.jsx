import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

/**
 * DashboardForm 컴포넌트
 * 새 대시보드 생성 폼을 표시하는 컴포넌트
 *
 * @param {boolean} isOpen - 폼 열림 상태
 * @param {Function} onToggle - 폼 토글 핸들러
 * @param {Function} onSubmit - 제출 핸들러
 * @param {Function} onReset - 초기화 핸들러
 * @param {string} className - 추가 CSS 클래스
 * @param {React.ReactNode} children - 폼 내용
 */
const DashboardForm = ({
  isOpen = false,
  onToggle,
  onSubmit,
  className = "",
  children,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "관리자 대시보드",
  });

  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
      type: "관리자 대시보드",
    });
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className={`${className}`}>
      {/* 토글 헤더 */}
      <div className="bg-white rounded-lg border border-[#e4e7e7] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              width="16"
              height="16"
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
            <h4 className="text-sm font-semibold text-black">
              새 대시보드 생성
            </h4>
          </div>
          <button
            onClick={onToggle}
            className="w-6 h-6 flex items-center justify-center hover:bg-[#f4f5f5] rounded transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* 폼 내용 */}
        {isOpen && (
          <div className="mt-4 pt-4 border-t border-[#e4e7e7] space-y-4">
            {children}
            {/* 버튼 */}
            <div className="flex justify-center gap-2 pt-2">
              <Button
                variant="secondary"
                onClick={handleReset}
                title="초기화"
              />
              <Button
                variant="primary"
                onClick={handleSubmit}
                title="생성하기"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardForm;
