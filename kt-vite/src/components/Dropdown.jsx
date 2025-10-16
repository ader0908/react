import React, { useState, useRef, useEffect } from "react";

/**
 * Dropdown 컴포넌트
 *
 * @param {Object} props
 * @param {Array<{value: string, label: string}>|Array<{group: string, items: Array<string>}>} props.items - 드롭다운 항목 배열 (단순 배열 또는 그룹화된 배열)
 * @param {string} props.selectedValue - 선택된 값
 * @param {Function} props.onSelect - 항목 선택 시 호출되는 콜백 함수
 * @param {string} [props.triggerLabel] - 트리거 버튼에 표시할 텍스트 (없으면 selectedValue의 label 사용)
 * @param {string} [props.className] - 추가 CSS 클래스
 * @param {boolean} [props.disabled] - 비활성화 여부
 * @param {boolean} [props.grouped] - 그룹화된 항목 여부
 * @param {string} [props.align] - 드롭다운 메뉴 정렬 (left/right, 기본값: left)
 */
const Dropdown = ({
  items = [],
  selectedValue,
  onSelect,
  triggerLabel,
  className = "",
  disabled = false,
  grouped = false,
  align = "left",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 선택된 항목 찾기 (그룹화되지 않은 경우)
  const selectedItem = !grouped
    ? items.find((item) => item.value === selectedValue)
    : null;

  // 외부 클릭 감지하여 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // 항목 선택 핸들러
  const handleSelect = (value) => {
    if (!disabled) {
      onSelect?.(value);
      setIsOpen(false);
    }
  };

  // 드롭다운 토글
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`dropdown-container ${className}`}
      style={{ position: "relative", display: "inline-block", zIndex: 1000 }}
    >
      {/* 드롭다운 트리거 버튼 */}
      <button
        className={`dropdown-trigger ${disabled ? "disabled" : ""}`}
        onClick={toggleDropdown}
        disabled={disabled}
        style={{
          padding: "4px 12px",
          backgroundColor: "#717a7a",
          color: "#ffffff",
          border: "none",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: 400,
          lineHeight: "16px",
          cursor: disabled ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          height: "20px",
          whiteSpace: "nowrap",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {triggerLabel || selectedItem?.label || selectedValue || "선택하세요"}
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div
          className="dropdown-menu"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            ...(align === "right" ? { right: 0 } : { left: 0 }),
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            minWidth: "120px",
            zIndex: 10000,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "8px" }}>
            {grouped
              ? /* 그룹화된 항목 렌더링 */
                items.map((group, groupIdx) => (
                  <div key={groupIdx}>
                    {groupIdx > 0 && (
                      <div
                        style={{
                          height: "1px",
                          backgroundColor: "#e4e7e7",
                          margin: "8px 0",
                        }}
                      />
                    )}
                    {group.items.map((item) => {
                      const isSelected = item === selectedValue;
                      return (
                        <div
                          key={item}
                          className={`dropdown-item ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() => handleSelect(item)}
                          style={{
                            padding: "4px 4px",
                            backgroundColor: isSelected
                              ? "#f0fdfa"
                              : "transparent",
                            color: isSelected ? "#2bb7b3" : "#000000",
                            fontSize: "14px",
                            fontWeight: isSelected ? 600 : 400,
                            lineHeight: "20px",
                            cursor: "pointer",
                            borderRadius: "4px",
                            transition: "background-color 0.2s",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.backgroundColor = "#f4f5f5";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                            }
                          }}
                        >
                          <span style={{ paddingLeft: "4px" }}>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                ))
              : /* 단순 항목 렌더링 */
                items.map((item) => {
                  const isSelected = item.value === selectedValue;
                  return (
                    <div
                      key={item.value}
                      className={`dropdown-item ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() => handleSelect(item.value)}
                      style={{
                        padding: "4px 4px",
                        backgroundColor: isSelected ? "#f0fdfa" : "transparent",
                        color: isSelected ? "#2bb7b3" : "#000000",
                        fontSize: "14px",
                        fontWeight: isSelected ? 600 : 400,
                        lineHeight: "20px",
                        cursor: "pointer",
                        borderRadius: "4px",
                        transition: "background-color 0.2s",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "#f4f5f5";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <span style={{ paddingLeft: "4px" }}>{item.label}</span>
                    </div>
                  );
                })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
