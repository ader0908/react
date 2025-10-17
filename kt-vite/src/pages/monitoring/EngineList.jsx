import React from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import EngineItemCard from "../../components/EngineItemCard";
import Chip from "../../components/Chip";

function EngineList() {
  return (
    <Card
      title="엔진 항목 선택"
      headerActions={
        <div className="flex gap-2">
          <Button variant="primary" title="전체 선택" size="small" />
          <Button variant="secondary" title="전체 해제" size="small" />
        </div>
      }
    >
      <div className=" space-y-2">
        {/* STT 엔진 */}
        <EngineItemCard title="STT" borderColor="#22c55e">
          <Chip label="CPU" variant="primary" />
          <Chip label="메모리" variant="primary" />
          <Chip label="디스크" variant="primary" />
          <Chip label="디스크 사용률 요청 건수" variant="primary" />
          <Chip label="실패건수" variant="disabled" />
          <Chip label="실시간 콜정보" variant="primary" />
          <Chip label="사용량 통계" variant="disabled" />
          <Chip label="EPD 시간 통계" variant="primary" />
          <Chip label="c-pod-011" variant="gray" />
        </EngineItemCard>

        {/* TTS 엔진 */}
        <EngineItemCard title="TTS" borderColor="#5090f7">
          <Chip label="CPU" variant="secondary" />
          <Chip label="메모리" variant="secondary" />
          <Chip label="디스크" variant="secondary" />
          <Chip label="요청 건수" variant="secondary" />
          <Chip label="실패건수" variant="secondary" />
          <Chip label="TPS 정보" variant="secondary" />
          <Chip label="사용량 통계" variant="disabled" />
          <Chip label="캐시 히트율" variant="disabled" />
          <Chip label="음성 합성율" variant="disabled" />
          <Chip label="c-pod-011" variant="gray" />
        </EngineItemCard>

        {/* SV 엔진 */}
        <EngineItemCard title="SV" borderColor="#a855f7">
          <Chip label="인증률" variant="tertiary" />
        </EngineItemCard>
      </div>
    </Card>
  );
}

// React.memo로 감싸서 불필요한 리렌더링 방지
export default React.memo(EngineList);
