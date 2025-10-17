import { useState } from "react";
import TableHeader from "./TableHeader";
import Pagination from "./Pagination";

/**
 * Table 컴포넌트 - Figma 디자인 기반 재사용 가능한 테이블
 *
 * @param {Array} columns - 테이블 컬럼 정의 배열
 *   - key: 데이터 키
 *   - label: 컬럼 헤더 텍스트
 *   - width: 컬럼 너비 (px 또는 CSS 값)
 *   - align: 정렬 ("left" | "center" | "right")
 *   - render: 커스텀 렌더링 함수 (value, row, index) => ReactNode
 *
 * @param {Array} data - 테이블 데이터 배열
 *
 * @param {Object} header - 테이블 헤더 설정
 *   - show: 헤더 표시 여부 (기본값: true)
 *   - count: 검색 결과 개수
 *   - countText: 개수 텍스트 (기본값: "검색결과")
 *   - countUnit: 개수 단위 (기본값: "건")
 *   - rightButtons: 우측 버튼 배열
 *   - customLeft: 커스텀 왼쪽 컨텐츠
 *
 * @param {Object} pagination - 페이지네이션 설정
 *   - show: 페이지네이션 표시 여부 (기본값: false)
 *   - currentPage: 현재 페이지
 *   - totalPages: 전체 페이지 수
 *   - pageSize: 페이지당 항목 수
 *   - pageSizeOptions: 페이지 크기 옵션 배열
 *   - onPageChange: 페이지 변경 핸들러
 *   - onPageSizeChange: 페이지 크기 변경 핸들러
 *   - showPageSizeSelector: 페이지 크기 선택기 표시 여부
 *   - pageSizeLabel: 페이지 크기 레이블
 *
 * @param {boolean} selectable - 행 선택 가능 여부
 * @param {Function} onSelectionChange - 선택 변경 핸들러
 * @param {string} emptyMessage - 데이터 없을 때 메시지
 * @param {string} className - 추가 CSS 클래스
 */
const Table = ({
  columns = [],
  data = [],
  header = { show: true, count: data.length },
  pagination = { show: false },
  selectable = false,
  onSelectionChange,
  emptyMessage = "데이터가 없습니다",
  className = "",
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());

  // 전체 선택/해제
  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = new Set(data.map((_, index) => index));
      setSelectedRows(allIds);
      onSelectionChange?.(allIds);
    } else {
      setSelectedRows(new Set());
      onSelectionChange?.(new Set());
    }
  };

  // 행 선택/해제
  const handleSelectRow = (rowIndex, checked) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(rowIndex);
    } else {
      newSelected.delete(rowIndex);
    }
    setSelectedRows(newSelected);
    onSelectionChange?.(newSelected);
  };

  const allSelected = data.length > 0 && selectedRows.size === data.length;
  const someSelected = selectedRows.size > 0 && !allSelected;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* 테이블 헤더 */}
      {header.show && (
        <TableHeader
          count={header.count}
          countText={header.countText}
          countUnit={header.countUnit}
          rightButtons={header.rightButtons}
          customLeft={header.customLeft}
        />
      )}

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white border-b border-[#e4e7e7]">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="h-10 px-3 text-xs font-bold text-[#a1a9aa] text-center whitespace-nowrap"
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="h-[224px] text-center text-sm text-[#a1a9aa]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-[#e4e7e7] hover:bg-[#f9fafa] transition-colors"
                >
                  {columns.map((column, colIndex) => {
                    const value = row[column.key];
                    const align = column.align || "center";

                    return (
                      <td
                        key={colIndex}
                        className={`h-14 px-3 text-sm font-semibold text-[#181b1b] ${
                          align === "left"
                            ? "text-left"
                            : align === "right"
                            ? "text-right"
                            : "text-center"
                        }`}
                      >
                        {column.render
                          ? column.render(value, row, rowIndex)
                          : value}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        pageSize={pagination.pageSize}
        pageSizeOptions={pagination.pageSizeOptions}
        onPageChange={pagination.onPageChange}
        onPageSizeChange={pagination.onPageSizeChange}
        showPageSizeSelector={pagination.showPageSizeSelector}
        pageSizeLabel={pagination.pageSizeLabel}
      />
    </div>
  );
};

export default Table;
