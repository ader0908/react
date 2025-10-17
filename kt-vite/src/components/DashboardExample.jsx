import React, { useState } from "react";
import Button from "./Button";
import DashboardManageModal from "../pages/monitoring/modal/DashboardManageModal";

/**
 * DashboardExample 컴포넌트
 * DashboardManageModal 사용 예제입니다.
 */
const DashboardExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">대시보드 관리 모달 예제</h1>
        <p className="text-gray-600">
          대시보드 관리 모달과 관련된 공통 컴포넌트들의 사용 예제입니다.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">기본 사용</h2>
        <div className="p-4 border border-gray-200 rounded-lg">
          <Button
            variant="primary"
            size="large"
            onClick={handleOpenModal}
            title="대시보드 관리 열기"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">포함된 컴포넌트</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>DashboardSection:</strong> 대시보드 섹션 전체 (헤더, 리스트,
            버튼)
          </li>
          <li>
            <strong>DashboardSectionHeader:</strong> 섹션 헤더 (아이콘 + 제목 +
            버튼)
          </li>
          <li>
            <strong>DashboardListItem:</strong> 대시보드 리스트 아이템 (체크박스
            + 정보 + 버튼)
          </li>
          <li>
            <strong>DashboardForm:</strong> 새 대시보드 생성 폼 (접기/펼치기
            가능)
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">주요 기능</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>체크박스를 통한 다중 선택</li>
          <li>편집 및 즐겨찾기 버튼</li>
          <li>내보내기, 가져오기, 삭제 버튼</li>
          <li>새 대시보드 생성 폼 (접기/펼치기)</li>
          <li>커스텀 스크롤바</li>
          <li>반응형 디자인</li>
        </ul>
      </div>

      {/* 대시보드 관리 모달 */}
      <DashboardManageModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default DashboardExample;
