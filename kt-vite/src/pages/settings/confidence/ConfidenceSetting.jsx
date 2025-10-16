import React from "react";
import AccordionCard from "../../../components/AccordionCard";
import CallbotSetting from "./CallbotSetting";
import ChatBotSettng from "./ChatBotSettng";
import ModelSetting from "./ModelSetting";

export default function ConfidenceSetting() {
  return (
    <AccordionCard
      title="신뢰도 설정"
      errorMessage="설정된 신뢰도 값을 가져오는 데에 실패했습니다.(상담 모델)"
    >
      <div className="flex flex-col gap-4">
        {/* 콜봇 */}
        <CallbotSetting />

        {/* 챗봇 */}
        <ChatBotSettng />

        {/* 상담 모델 */}
        <ModelSetting />
      </div>
    </AccordionCard>
  );
}
