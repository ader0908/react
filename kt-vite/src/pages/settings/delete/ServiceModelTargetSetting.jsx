import React, { useState } from "react";
import SectionCard from "../../../components/SectionCard";
import ServiceModelRow from "../../../components/ServiceModelRow";

export default function ServiceModelTargetSetting() {
  // 콜봇 체크 상태
  const [callbot, setCallbot] = useState({
    training: true,
    deploy: false,
    validation: false,
    test: false,
    history: false,
    stt: false,
    stats: false,
  });

  // 챗봇 체크 상태
  const [chatbot, setChatbot] = useState({
    training: false,
    deploy: false,
    validation: false,
    test: false,
    history: false,
    stt: false,
    stats: false,
  });

  // 상담모델 체크 상태
  const [counselModel, setCounselModel] = useState({
    training: false,
    deploy: false,
    validation: false,
    test: false,
    history: false,
    stt: false,
    stats: false,
  });

  // 일반 삭제 대상 체크 상태
  const [general, setGeneral] = useState({
    hwResource: false,
    errorHistory: false,
  });

  return (
    <SectionCard title="서비스 모델별 삭제 대상">
      <div className="flex flex-col gap-4">
        {/* 콜봇 */}
        <ServiceModelRow
          label="콜봇"
          checkboxes={[
            {
              label: "학습이력",
              checked: callbot.training,
              onChange: (v) => setCallbot({ ...callbot, training: v }),
            },
            {
              label: "배포이력",
              checked: callbot.deploy,
              onChange: (v) => setCallbot({ ...callbot, deploy: v }),
            },
            {
              label: "검증이력",
              checked: callbot.validation,
              onChange: (v) => setCallbot({ ...callbot, validation: v }),
            },
            {
              label: "단건 테스트",
              checked: callbot.test,
              onChange: (v) => setCallbot({ ...callbot, test: v }),
            },
            {
              label: "이력",
              checked: callbot.history,
              onChange: (v) => setCallbot({ ...callbot, history: v }),
            },
            {
              label: "STT결과",
              checked: callbot.stt,
              onChange: (v) => setCallbot({ ...callbot, stt: v }),
            },
            {
              label: "통계 데이터",
              checked: callbot.stats,
              onChange: (v) => setCallbot({ ...callbot, stats: v }),
            },
          ]}
        />

        {/* 챗봇 */}
        <ServiceModelRow
          label="챗봇"
          checkboxes={[
            {
              label: "학습이력",
              checked: chatbot.training,
              onChange: (v) => setChatbot({ ...chatbot, training: v }),
            },
            {
              label: "배포이력",
              checked: chatbot.deploy,
              onChange: (v) => setChatbot({ ...chatbot, deploy: v }),
            },
            {
              label: "검증이력",
              checked: chatbot.validation,
              onChange: (v) => setChatbot({ ...chatbot, validation: v }),
            },
            {
              label: "단건 테스트",
              checked: chatbot.test,
              onChange: (v) => setChatbot({ ...chatbot, test: v }),
            },
            {
              label: "이력",
              checked: chatbot.history,
              onChange: (v) => setChatbot({ ...chatbot, history: v }),
            },
            {
              label: "STT결과",
              checked: chatbot.stt,
              onChange: (v) => setChatbot({ ...chatbot, stt: v }),
            },
            {
              label: "통계 데이터",
              checked: chatbot.stats,
              onChange: (v) => setChatbot({ ...chatbot, stats: v }),
            },
          ]}
        />

        {/* 상담모델 */}
        <ServiceModelRow
          label="상담모델"
          checkboxes={[
            {
              label: "학습이력",
              checked: counselModel.training,
              onChange: (v) =>
                setCounselModel({ ...counselModel, training: v }),
            },
            {
              label: "배포이력",
              checked: counselModel.deploy,
              onChange: (v) => setCounselModel({ ...counselModel, deploy: v }),
            },
            {
              label: "검증이력",
              checked: counselModel.validation,
              onChange: (v) =>
                setCounselModel({ ...counselModel, validation: v }),
            },
            {
              label: "단건 테스트",
              checked: counselModel.test,
              onChange: (v) => setCounselModel({ ...counselModel, test: v }),
            },
            {
              label: "이력",
              checked: counselModel.history,
              onChange: (v) => setCounselModel({ ...counselModel, history: v }),
            },
            {
              label: "STT결과",
              checked: counselModel.stt,
              onChange: (v) => setCounselModel({ ...counselModel, stt: v }),
            },
            {
              label: "통계 데이터",
              checked: counselModel.stats,
              onChange: (v) => setCounselModel({ ...counselModel, stats: v }),
            },
          ]}
        />

        {/* 일반 삭제 대상 */}
        <ServiceModelRow
          label="일반 삭제 대상"
          checkboxes={[
            {
              label: "HW 리소스 데이터",
              checked: general.hwResource,
              onChange: (v) => setGeneral({ ...general, hwResource: v }),
            },
            {
              label: "장애이력",
              checked: general.errorHistory,
              onChange: (v) => setGeneral({ ...general, errorHistory: v }),
            },
          ]}
        />
      </div>
    </SectionCard>
  );
}
