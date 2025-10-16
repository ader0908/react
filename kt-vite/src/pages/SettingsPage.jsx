// 공통설정 페이지
import PageHeader from "../components/PageHeader";
import AgentSetting from "./settings/agent/AgentSetting";
import ConfidenceSetting from "./settings/confidence/ConfidenceSetting";
import DeleteSetting from "./settings/delete/DeleteSetting";
import SecuritySetting from "./settings/security/SecuritySetting";
import SystemSetting from "./settings/system/SystemSetting";

const SettingsPage = () => {
  const handleExpandAll = (isExpanded) => {
    // 필요시 확장/축소 로직 구현
    console.log("전체 펼침/접기:", isExpanded);
  };

  return (
    <div className="space-y-4">
      <PageHeader title="공통설정" onExpandAll={handleExpandAll} />

      {/* Agent 관련 설정 */}
      <AgentSetting />

      {/* 신뢰도 설정 */}
      <ConfidenceSetting />

      {/* 스케줄러 동작 주기 설정 + HW 리소스 임계치 설정 */}
      <SystemSetting />

      {/* 암호화 설정 + 기타설정 */}
      <SecuritySetting />

      {/* 삭제 주기 설정 */}
      <DeleteSetting />
    </div>
  );
};

export default SettingsPage;
