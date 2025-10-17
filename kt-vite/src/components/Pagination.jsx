import { useState } from "react";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

/**
 * Pagination 컴포넌트
 * 페이지네이션 UI (페이지 크기 선택 + 페이지 번호 네비게이션)
 *
 * @param {number} currentPage - 현재 페이지 (1부터 시작)
 * @param {number} totalPages - 전체 페이지 수
 * @param {number} pageSize - 페이지당 항목 수
 * @param {Array} pageSizeOptions - 페이지 크기 옵션 배열 (예: [10, 20, 50, 100])
 * @param {Function} onPageChange - 페이지 변경 핸들러 (page) => void
 * @param {Function} onPageSizeChange - 페이지 크기 변경 핸들러 (size) => void
 * @param {boolean} showPageSizeSelector - 페이지 크기 선택기 표시 여부 (기본값: true)
 * @param {string} pageSizeLabel - 페이지 크기 레이블 (기본값: "페이지당 표시")
 * @param {string} className - 추가 CSS 클래스
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  showPageSizeSelector = true,
  pageSizeLabel = "페이지당 표시",
  className = "",
}) => {
  // 내부 state (제어되지 않는 컴포넌트로도 사용 가능)
  const [internalPage, setInternalPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(10);

  const page = currentPage ?? internalPage;
  const size = pageSize ?? internalPageSize;

  // 페이지 변경
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    if (onPageChange) {
      onPageChange(newPage);
    } else {
      setInternalPage(newPage);
    }
  };

  // 페이지 크기 변경
  const handlePageSizeChange = (newSize) => {
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    } else {
      setInternalPageSize(newSize);
      setInternalPage(1);
    }
  };

  // 페이지 번호 버튼 생성
  const renderPageButtons = () => {
    const buttons = [];
    const maxVisible = 5;

    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-9 h-9 flex items-center justify-center rounded text-sm font-semibold transition-colors ${
            i === page
              ? "bg-[#181b1b] text-white"
              : "border border-[#e4e7e7] text-[#272a2a] hover:bg-[#f4f5f5]"
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className={`flex items-center justify-end gap-4 h-9 ${className}`}>
      {/* 페이지당 표시 선택 */}
      {showPageSizeSelector && pageSizeOptions.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#a1a9aa] whitespace-nowrap">
            {pageSizeLabel}
          </span>
          <select
            value={size}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="h-9 px-2 pr-8 text-sm border border-[#e4e7e7] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#2bb7b3] cursor-pointer"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}개
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 페이지 네비게이션 */}
      <div className="flex items-center gap-1">
        {/* 첫 페이지 */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className="w-9 h-9 flex items-center justify-center border border-[#e4e7e7] rounded hover:bg-[#f4f5f5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="첫 페이지"
        >
          <BiFirstPage />
        </button>

        {/* 이전 페이지 */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="w-9 h-9 flex items-center justify-center border border-[#e4e7e7] rounded hover:bg-[#f4f5f5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="이전 페이지"
        >
          <RiArrowLeftSLine />
        </button>

        {/* 페이지 번호들 */}
        {renderPageButtons()}

        {/* 다음 페이지 */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="w-9 h-9 flex items-center justify-center border border-[#e4e7e7] rounded hover:bg-[#f4f5f5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="다음 페이지"
        >
          <RiArrowRightSLine />
        </button>

        {/* 마지막 페이지 */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
          className="w-9 h-9 flex items-center justify-center border border-[#e4e7e7] rounded hover:bg-[#f4f5f5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="마지막 페이지"
        >
          <BiLastPage />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
