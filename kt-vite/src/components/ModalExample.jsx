import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";

/**
 * Modal 컴포넌트 사용 예시
 */
const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalWithFooterOpen, setIsModalWithFooterOpen] = useState(false);
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Modal 컴포넌트 예시</h1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Footer 없는 모달 */}
        <Button onClick={() => setIsModalOpen(true)}>기본 모달 (md)</Button>

        {/* Footer 있는 모달 */}
        <Button onClick={() => setIsModalWithFooterOpen(true)}>
          Footer 있는 모달
        </Button>

        {/* 작은 모달 */}
        <Button variant="secondary" onClick={() => setIsSmallModalOpen(true)}>
          작은 모달 (sm)
        </Button>

        {/* 큰 모달 */}
        <Button variant="secondary" onClick={() => setIsLargeModalOpen(true)}>
          큰 모달 (lg)
        </Button>
      </div>

      {/* Footer 없는 모달 예시 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="대시보드 관리"
      >
        <div>
          <h3 style={{ marginTop: 0 }}>관리자 대시보드 (7개)</h3>
          <div
            style={{
              backgroundColor: "#f4f5f5",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #2bb7b3",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "8px",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0" }}>
                대시보드1 - 시스템 전체 모니터링
              </h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#717a7a" }}>
                메모 내용 일부 표시 width의 1/2 넘어갈 시 말줄임..
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #2bb7b3",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "8px",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0" }}>
                대시보드2 - 서버 성능 분석
              </h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#717a7a" }}>
                메모 내용 일부 표시 width의 1/2 넘어갈 시 말줄임..
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e4e7e7",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0" }}>
                대시보드3 - 네트워크 트래픽
              </h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#717a7a" }}>
                메모 내용 일부 표시 width의 1/2 넘어갈 시 말줄임..
              </p>
            </div>
          </div>

          <h3>개인 대시보드 (6개)</h3>
          <div
            style={{
              backgroundColor: "#f4f5f5",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #2bb7b3",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0" }}>
                대시보드1 - 내 작업 모니터링
              </h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#717a7a" }}>
                메모 내용 일부 표시 width의 1/2 넘어갈 시 말줄임..
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Footer 있는 모달 예시 */}
      <Modal
        isOpen={isModalWithFooterOpen}
        onClose={() => setIsModalWithFooterOpen(false)}
        title="새 대시보드 생성"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsModalWithFooterOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert("저장되었습니다!");
                setIsModalWithFooterOpen(false);
              }}
            >
              저장
            </Button>
          </>
        }
      >
        <div>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                color: "#a1a9aa",
                marginBottom: "8px",
              }}
            >
              대시보드 이름 <span style={{ color: "#ed1b23" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="대시보드 이름을 적어주세요."
              style={{
                width: "100%",
                padding: "8px 10px",
                fontSize: "14px",
                border: "1px solid #e4e7e7",
                borderRadius: "4px",
                backgroundColor: "#f4f5f5",
                color: "#000000",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                color: "#a1a9aa",
                marginBottom: "8px",
              }}
            >
              설명(선택사항)
            </label>
            <textarea
              placeholder="대시보드에 대한 설명을 입력해 주세요."
              rows={3}
              style={{
                width: "100%",
                padding: "8px 10px",
                fontSize: "14px",
                border: "1px solid #e4e7e7",
                borderRadius: "4px",
                backgroundColor: "#f4f5f5",
                color: "#000000",
                resize: "vertical",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                color: "#a1a9aa",
                marginBottom: "8px",
              }}
            >
              대시보드 유형 <span style={{ color: "#ed1b23" }}>*</span>
            </label>
            <select
              style={{
                width: "100%",
                padding: "8px 10px",
                fontSize: "14px",
                border: "1px solid #e4e7e7",
                borderRadius: "4px",
                backgroundColor: "#f4f5f5",
                color: "#000000",
              }}
            >
              <option>관리자 대시보드</option>
              <option>개인 대시보드</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* 작은 모달 예시 */}
      <Modal
        isOpen={isSmallModalOpen}
        onClose={() => setIsSmallModalOpen(false)}
        title="작은 모달 (sm)"
        size="sm"
        footer={
          <Button variant="primary" onClick={() => setIsSmallModalOpen(false)}>
            확인
          </Button>
        }
      >
        <div>
          <p>작은 크기의 모달입니다.</p>
          <p>간단한 메시지나 확인 다이얼로그에 적합합니다.</p>
        </div>
      </Modal>

      {/* 큰 모달 예시 */}
      <Modal
        isOpen={isLargeModalOpen}
        onClose={() => setIsLargeModalOpen(false)}
        title="큰 모달 (lg)"
        size="lg"
      >
        <div>
          <h3>큰 크기의 모달</h3>
          <p>많은 콘텐츠를 표시할 때 사용합니다.</p>
          <div style={{ marginTop: "20px" }}>
            <h4>주요 기능</h4>
            <ul>
              <li>size="sm" : 400px × 600px (작은 확인 다이얼로그)</li>
              <li>size="md" : 560px × 800px (기본값, 일반적인 폼)</li>
              <li>size="lg" : 800px × 900px (많은 콘텐츠)</li>
              <li>size="xl" : 1000px × 1000px (매우 큰 콘텐츠)</li>
            </ul>
            <p style={{ marginTop: "16px" }}>
              커스텀 크기가 필요한 경우 width와 maxHeight props를 직접 사용할
              수도 있습니다.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalExample;
