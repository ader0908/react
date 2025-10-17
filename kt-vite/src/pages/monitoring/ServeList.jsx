import React from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ServerItemCard from "../../components/ServerItemCard";
import Chip from "../../components/Chip";

function ServeList() {
  return (
    <Card
      title="서버 목록"
      headerActions={
        <div className="flex gap-2">
          <Button variant="primary" title="전체 선택" size="small" />
          <Button variant="secondary" title="전체 해제" size="small" />
        </div>
      }
    >
      <div className="bg-[#f4f5f5] rounded-lg p-4 flex gap-4 overflow-x-auto">
        {/* STT 서버 */}
        <div className="relative flex-shrink-0">
          <ServerItemCard title="STT" borderColor="#22c55e">
            <Chip label="c-pod-001" variant="primary" />
            <Chip label="c-pod-002" variant="primary" />
            <Chip label="c-pod-003" variant="primary" />
            <Chip label="c-pod-004" variant="primary" />
            <Chip label="c-pod-005" variant="primary" />
            <Chip label="c-pod-006" variant="disabled" />
            <Chip label="c-pod-007" variant="primary" />
            <Chip label="c-pod-008" variant="primary" />
            <Chip label="c-pod-009" variant="primary" />
            <Chip label="c-pod-010" variant="disabled" />
            <Chip label="c-pod-011" variant="gray" />
          </ServerItemCard>
        </div>

        {/* TTS 서버 */}
        <div className="relative flex-shrink-0">
          <ServerItemCard title="TTS" borderColor="#5090f7">
            <Chip label="t-pod-001" variant="secondary" />
            <Chip label="t-pod-002" variant="secondary" />
            <Chip label="t-pod-003" variant="secondary" />
            <Chip label="t-pod-004" variant="disabled" />
            <Chip label="t-pod-005" variant="secondary" />
          </ServerItemCard>
        </div>

        {/* SV 서버 */}
        <div className="relative flex-shrink-0">
          <ServerItemCard title="SV" borderColor="#a855f7">
            <Chip label="s-pod-001" variant="tertiary" />
            <Chip label="s-pod-002" variant="tertiary" />
            <Chip label="s-pod-003" variant="disabled" />
          </ServerItemCard>
        </div>
      </div>
    </Card>
  );
}

// React.memo로 감싸서 불필요한 리렌더링 방지
export default React.memo(ServeList);
