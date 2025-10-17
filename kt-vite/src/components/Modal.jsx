import { IoClose } from "react-icons/io5";
import "../styles/Modal.css";

/**
 * Modal 공통 컴포넌트
 * @param {boolean} isOpen - 모달 열림/닫힘 상태
 * @param {Function} onClose - 모달 닫기 함수
 * @param {string} title - 모달 제목
 * @param {React.ReactNode} children - 모달 본문 내용
 * @param {React.ReactNode} footer - 모달 하단 영역 (선택사항)
 * @param {string} size - 모달 크기 (sm, md, lg, xl) (기본값: md)
 * @param {number} width - 커스텀 너비 (size 대신 사용 가능)
 * @param {number} maxHeight - 커스텀 최대 높이 (size 대신 사용 가능)
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  width,
  maxHeight,
}) => {
  if (!isOpen) return null;

  // Size별 기본 크기 설정
  const sizeConfig = {
    sm: { width: 400, maxHeight: 600 },
    md: { width: 560, maxHeight: 800 },
    lg: { width: 800, maxHeight: 900 },
    xl: { width: 1000, maxHeight: 1000 },
  };

  // size 또는 커스텀 width/maxHeight 사용
  const modalWidth = width || sizeConfig[size]?.width || sizeConfig.md.width;
  const modalMaxHeight =
    maxHeight || sizeConfig[size]?.maxHeight || sizeConfig.md.maxHeight;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-container"
        style={{
          width: `${modalWidth}px`,
          maxHeight: `${modalMaxHeight}px`,
        }}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {title}
          </h2>
          <button
            className="modal-close-button"
            onClick={onClose}
            aria-label="닫기"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-content">{children}</div>

        {/* Footer (선택사항) */}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
