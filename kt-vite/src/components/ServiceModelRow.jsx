import Checkbox from "./Checkbox";

/**
 * ServiceModelRow 컴포넌트 (서비스 모델별 삭제 대상 한 줄)
 * @param {string} label - 모델 라벨 (예: "콜봇", "챗봇", "상담모델")
 * @param {Array} checkboxes - 체크박스 배열 [{ label, checked, onChange }, ...]
 * @param {string} className - 추가 CSS 클래스
 */
const ServiceModelRow = ({ label, checkboxes = [], className = "" }) => {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {/* 모델 라벨 */}
      <div className="w-20 flex-shrink-0">
        <span className="text-xs font-medium text-[#a1a9aa]">{label}</span>
      </div>

      {/* 체크박스들 */}
      <div className="flex flex-wrap items-center gap-5">
        {checkboxes.map((checkbox, index) => (
          <Checkbox
            key={index}
            label={checkbox.label}
            checked={checkbox.checked}
            onChange={checkbox.onChange}
            disabled={checkbox.disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceModelRow;
