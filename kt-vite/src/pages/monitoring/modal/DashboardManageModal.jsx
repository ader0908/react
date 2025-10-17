import React, { useState } from "react";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import DashboardSection from "../../../components/DashboardSection";
import DashboardForm from "../../../components/DashboardForm";
import { IoDownloadOutline } from "react-icons/io5";
import { PiTrashBold } from "react-icons/pi";
import { TbFileExport, TbUser, TbUserCog } from "react-icons/tb";

export default function DashboardManageModal({ isOpen, onClose }) {
  // 관리자 대시보드 목록
  const [adminDashboards] = useState([
    {
      id: "admin-1",
      title: "대시보드1 - 시스템 전체 모니터링",
      description: "메모 내용 일부 표시 width의 1/2 넘어갈 시 말줄임..",
      isDefault: true,
    },
    {
      id: "admin-2",
      title: "대시보드2 - 서버 성능 분석",
      description: "메모 내용 일부 표시 width의 1/2 넘어갈 시 말줄임..",
      isDefault: false,
    },
    {
      id: "admin-3",
      title: "대시보드3 - 네트워크 트래픽",
      description: "메모 내용 일부 표시 width의 1/2 넘어갈 시 말줄임..",
      isDefault: false,
    },
    {
      id: "admin-4",
      title: "대시보드4 - 보안 모니터링",
      description: "메모 내용 일부 표시 width의 1/2 넘어갈 시 말줄임..",
      isDefault: false,
    },
  ]);

  // 개인 대시보드 목록
  const [personalDashboards] = useState([
    {
      id: "personal-1",
      title: "대시보드1 - 내 작업 모니터링",
      description: "메모 내용 일부 표시 width의 1/2 넘어갈 시 말줄임..",
      isDefault: false,
    },
    {
      id: "personal-2",
      title: "대시보드2 - 개발 환경 상태",
      description: "메모 내용 일부 표시 width의 1/2 넘어갈 시 말줄임..",
      isDefault: false,
    },
    {
      id: "personal-3",
      title: "대시보드3 - 테스트 서버",
      description: "메모 내용 일부 표시 width의 1/2 넘어갈 시 말줄임..",
      isDefault: false,
    },
    {
      id: "personal-4",
      title: "대시보드4 - 개인 프로젝트",
      description: "메모 내용 일부 표시 width의 1/2 넘어갈 시 말줄임..",
      isDefault: false,
    },
  ]);

  // 선택된 아이템들
  const [selectedAdminItems, setSelectedAdminItems] = useState([
    "admin-1",
    "admin-2",
  ]);
  const [selectedPersonalItems, setSelectedPersonalItems] = useState([
    "personal-1",
    "personal-2",
  ]);

  // 폼 열림 상태
  const [isFormOpen, setIsFormOpen] = useState(false);

  const selectedCount =
    selectedAdminItems.length + selectedPersonalItems.length;

  // 체크박스 핸들러
  const handleAdminCheck = (id, checked) => {
    setSelectedAdminItems((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handlePersonalCheck = (id, checked) => {
    setSelectedPersonalItems((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  // 편집 핸들러
  const handleEdit = (id) => {
    console.log("Edit dashboard:", id);
    // TODO: 편집 로직 구현
  };

  // 즐겨찾기 핸들러
  const handleStar = (id) => {
    console.log("Star dashboard:", id);
    // TODO: 즐겨찾기 로직 구현
  };

  // 새 대시보드 추가 핸들러
  const handleAddNew = () => {
    setIsFormOpen(true);
  };

  // 내보내기 핸들러
  const handleExport = () => {
    console.log("Export dashboards");
    // TODO: 내보내기 로직 구현
  };

  // 가져오기 핸들러
  const handleImport = () => {
    console.log("Import dashboards");
    // TODO: 가져오기 로직 구현
  };

  // 삭제 핸들러 (모든 선택된 항목 삭제)
  const handleDelete = () => {
    console.log("Delete dashboards:", {
      admin: selectedAdminItems,
      personal: selectedPersonalItems,
    });
    // TODO: 삭제 로직 구현
  };

  // 폼 제출 핸들러
  const handleFormSubmit = (formData) => {
    console.log("Create new dashboard:", formData);
    // TODO: 생성 로직 구현
    setIsFormOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="대시보드 관리">
      <div className="space-y-8">
        {/* 관리자 대시보드 섹션 */}
        <DashboardSection
          icon={<TbUserCog />}
          title="관리자 대시보드"
          count={adminDashboards.length}
          items={adminDashboards}
          selectedItems={selectedAdminItems}
          onCheck={handleAdminCheck}
          onEdit={handleEdit}
          onStar={handleStar}
          onAddNew={handleAddNew}
          showWarning={false}
        />

        {/* 개인 대시보드 섹션 */}
        <DashboardSection
          icon={<TbUser />}
          title="개인 대시보드"
          count={personalDashboards.length}
          items={personalDashboards}
          selectedItems={selectedPersonalItems}
          onCheck={handlePersonalCheck}
          onEdit={handleEdit}
          onStar={handleStar}
          showWarning={false}
        />
        {/* 하단 버튼 */}
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            onClick={handleExport}
            icon={<TbFileExport />}
            title="내보내기"
            className="bg-[#2563eb] hover:bg-[#1d4ed8]"
          />
          <Button
            variant="primary"
            onClick={handleImport}
            icon={<IoDownloadOutline />}
            title="가져오기"
            className="bg-[#22c55e] hover:bg-[#16a34a]"
          />
          <div className="flex-1" />
          <Button
            variant="danger"
            onClick={handleDelete}
            icon={<PiTrashBold />}
            title={`선택 삭제 (${selectedCount})`}
            className="bg-[#dc2626] hover:bg-[#b91c1c]"
          />
        </div>

        {/* 새 대시보드 생성 폼 */}
        <DashboardForm
          isOpen={isFormOpen}
          onToggle={() => setIsFormOpen(!isFormOpen)}
          onSubmit={handleFormSubmit}
          onReset={() => setIsFormOpen(false)}
        />
      </div>
    </Modal>
  );
}
