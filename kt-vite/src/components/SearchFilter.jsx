import Button from "./Button";
import { FaSearch } from "react-icons/fa";

/**
 * SearchFilter 컴포넌트 - 검색 필터 영역 공통 컨테이너
 * @param {React.ReactNode} children - 필터 구성 요소들 (라디오, 드롭다운, 날짜 선택 등)
 * @param {Function} onSearch - 검색 버튼 클릭 핸들러
 * @param {string} searchButtonText - 검색 버튼 텍스트 (기본값: "검색")
 * @param {boolean} showSearchButton - 검색 버튼 표시 여부 (기본값: true)
 * @param {string} className - 추가 CSS 클래스
 */
const SearchFilter = ({
  children,
  onSearch,
  searchButtonText = "검색",
  showSearchButton = true,
  className = "",
}) => {
  return (
    <div className={`bg-[#f4f5f5] rounded-lg p-5 ${className}`}>
      <div className="flex items-end gap-4">
        {/* 필터 구성 요소들 (children으로 받음) */}
        {children}

        {/* 검색 버튼 */}
        {showSearchButton && (
          <Button
            variant="primary"
            icon={<FaSearch />}
            title={searchButtonText}
            onClick={onSearch}
            className="flex-none"
          />
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
