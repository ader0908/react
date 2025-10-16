import React from "react";
import AccordionCard from "../../../components/AccordionCard";
import DeletionCycleSetting from "./DeletionCycleSetting";
import ServiceModelTargetSetting from "./ServiceModelTargetSetting";
import Button from "../../../components/Button";
import { TbArrowBackUp } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";

export default function DeleteSetting() {
  return (
    <AccordionCard
      title="삭제 주기 설정"
      errorMessage="삭제 기준이 0일인 경우, 삭제 스케줄러가 작동하지 않습니다."
    >
      <div className="flex gap-4 items-stretch">
        {/* 삭제 주기 */}
        <div className="flex-1 flex flex-col">
          <DeletionCycleSetting />

          {/* 서비스 모델별 삭제 대상 */}
        </div>
        <div className="flex-[2] flex flex-col">
          <ServiceModelTargetSetting />
        </div>
        {/* 버튼 */}
        <div className="flex gap-2 items-end">
          <Button
            title="되돌리기"
            variant="secondary"
            icon={<TbArrowBackUp />}
          />
          <Button title="저장" variant="primary" icon={<FaRegSave />} />
        </div>
      </div>
    </AccordionCard>
  );
}
