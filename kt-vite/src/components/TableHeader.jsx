import Button from "./Button";

/**
 * TableHeader 컴포넌트
 * 테이블 상단 영역 (검색결과 표시 + 액션 버튼)
 *
 * @param {number} count - 검색 결과 개수
 * @param {string} countText - 개수 텍스트 (기본값: "검색결과")
 * @param {string} countUnit - 개수 단위 (기본값: "건")
 * @param {Array} rightButtons - 우측 버튼 배열 (Button 컴포넌트 props)
 * @param {React.ReactNode} customLeft - 커스텀 왼쪽 컨텐츠 (count 대신 사용)
 * @param {string} className - 추가 CSS 클래스
 */
const TableHeader = ({
  count,
  countText = "검색결과",
  countUnit = "건",
  rightButtons = [],
  customLeft,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-between h-8 ${className}`}>
      {/* 왼쪽 영역 - 검색 결과 */}
      <div className="text-sm text-[#000000]">
        {customLeft || (
          <div className="flex items-center gap-1">
            <span className="text-sm">{countText}</span>
            <span className="text-sm font-bold ">{count}</span>
            <span className="text-sm ">{countUnit}</span>
          </div>
        )}
      </div>

      {/* 오른쪽 영역 - 액션 버튼들 */}
      {rightButtons.length > 0 && (
        <div className="flex items-center gap-2">
          {rightButtons.map((button, index) => (
            <Button key={index} {...button} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TableHeader;
