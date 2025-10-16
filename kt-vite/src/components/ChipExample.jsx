import React from "react";
import Chip from "./Chip";
import EngineItemCard from "./EngineItemCard";

/**
 * Chip과 EngineItemCard 컴포넌트 사용 예시
 */
const ChipExample = () => {
  return (
    <div className="p-6 space-y-6 bg-[#f4f5f5]">
      <h2 className="text-xl font-bold">Chip & EngineItemCard 예시</h2>

      {/* 개별 Chip 예시 */}
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-sm font-semibold mb-3">개별 Chip 예시</h3>
        <div className="flex flex-wrap gap-2">
          <Chip label="CPU" variant="primary" />
          <Chip label="메모리" variant="primary" />
          <Chip label="디스크" variant="secondary" />
          <Chip label="실패건수" variant="disabled" />
          <Chip label="인증률" variant="tertiary" />
          <Chip label="커스텀 색상" color="#ea580c" />
        </div>
      </div>

      {/* EngineItemCard 예시 */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">EngineItemCard 예시</h3>

        {/* STT 카드 */}
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

        {/* TTS 카드 */}
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

        {/* SV 카드 */}
        <EngineItemCard title="SV" borderColor="#a855f7">
          <Chip label="인증률" variant="tertiary" />
        </EngineItemCard>
      </div>

      {/* 클릭 가능한 Chip 예시 */}
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-sm font-semibold mb-3">클릭 가능한 Chip</h3>
        <div className="flex flex-wrap gap-2">
          <Chip
            label="클릭 가능"
            variant="primary"
            onClick={() => alert("클릭됨!")}
          />
          <Chip
            label="토글 가능"
            variant="secondary"
            onClick={() => console.log("토글")}
          />
        </div>
      </div>
    </div>
  );
};

export default ChipExample;
