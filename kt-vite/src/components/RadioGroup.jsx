/**
 * RadioGroup 컴포넌트
 * @param {string} name - 라디오 그룹 이름 (필수)
 * @param {Array} options - 라디오 옵션 배열 [{ value: string, label: string }]
 * @param {string} value - 선택된 값
 * @param {Function} onChange - 값 변경 핸들러
 * @param {string} label - 그룹 라벨 텍스트
 * @param {boolean} required - 필수 항목 여부 (기본값: false)
 * @param {string} direction - 배치 방향 ("horizontal" | "vertical", 기본값: "horizontal")
 * @param {string} gap - 라디오 버튼 간 간격 (Tailwind 클래스, 기본값: "gap-6")
 * @param {string} className - 추가 CSS 클래스
 */
const RadioGroup = ({
  name,
  options = [],
  value,
  onChange,
  label,
  required = false,
  direction = "horizontal",
  gap = "gap-6",
  className = "",
}) => {
  const directionClass = direction === "vertical" ? "flex-col" : "items-center";

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-[11px] font-medium text-[#a1a9aa] mb-2 leading-tight">
          {label}
          {required && <span className="text-[#ed1b23] ml-1">*</span>}
        </label>
      )}

      {/* Radio Buttons */}
      <div className={`flex ${directionClass} ${gap}`}>
        {options.map((option, index) => {
          const isChecked = value === option.value;
          const isFirstChecked = index === 0 && isChecked;

          return (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="relative">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={(e) => onChange && onChange(e.target.value)}
                  className="sr-only peer"
                />
                {/* 외부 원 - 첫 번째 선택된 항목이거나 선택된 경우 #2bb7b3, 아니면 #e4e7e7 */}
                <div
                  className={`w-4 h-4 border-2 rounded-full transition-colors ${
                    isFirstChecked || isChecked
                      ? "border-[#2bb7b3] peer-checked:border-[#2bb7b3]"
                      : "border-[#e4e7e7] peer-checked:border-[#2bb7b3]"
                  }`}
                ></div>
                {/* 내부 점 - 선택되었을 때만 표시 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#2bb7b3] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-sm text-black">{option.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;
