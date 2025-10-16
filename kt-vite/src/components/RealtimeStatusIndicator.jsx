import React from "react";

/**
 * RealtimeStatusIndicator 컴포넌트
 * 실시간 모니터링 상태를 표시하는 컴포넌트
 *
 * @param {Object} props
 * @param {boolean} [props.isActive] - 실시간 활성화 여부 (기본값: false)
 * @param {string} [props.statusText] - 상태 텍스트 (기본값: "실시간 감시중")
 * @param {string} [props.time] - 시간 표시 (예: "15:07:32")
 * @param {string} [props.badgeText] - 배지 텍스트 (예: "실시간 5분")
 * @param {Function} [props.onBadgeClick] - 배지 클릭 핸들러
 * @param {string} [props.className] - 추가 CSS 클래스
 */
const RealtimeStatusIndicator = ({
  isActive = false,
  statusText = "실시간 감시중",
  time = "",
  badgeText = "",
  onBadgeClick,
  className = "",
}) => {
  return (
    <div
      className={`realtime-status-indicator ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        height: "20px",
      }}
    >
      {/* 상태 인디케이터 (녹색 원) */}
      {isActive && (
        <div
          className="status-indicator"
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#22c55e",
            borderRadius: "50%",
            flexShrink: 0,
          }}
        />
      )}

      {/* 상태 텍스트 */}
      <span
        className="status-text"
        style={{
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "20px",
          color: "#000000",
          whiteSpace: "nowrap",
        }}
      >
        {statusText}
      </span>

      {/* 시간 표시 */}
      {time && (
        <span
          className="time-display"
          style={{
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "20px",
            color: "#000000",
            whiteSpace: "nowrap",
          }}
        >
          {time}
        </span>
      )}

      {/* 배지 */}
      {badgeText && (
        <div
          className="status-badge"
          onClick={onBadgeClick}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 12px",
            height: "20px",
            backgroundColor: "#717a7a",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: "16px",
            borderRadius: "12px",
            whiteSpace: "nowrap",
            cursor: onBadgeClick ? "pointer" : "default",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            if (onBadgeClick) {
              e.currentTarget.style.backgroundColor = "#5a6262";
            }
          }}
          onMouseLeave={(e) => {
            if (onBadgeClick) {
              e.currentTarget.style.backgroundColor = "#717a7a";
            }
          }}
        >
          {badgeText}
        </div>
      )}
    </div>
  );
};

export default RealtimeStatusIndicator;
