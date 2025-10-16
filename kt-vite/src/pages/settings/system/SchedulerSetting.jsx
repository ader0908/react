import React from "react";
import SectionCard from "../../../components/SectionCard";
import AccordionCard from "../../../components/AccordionCard";
import Toggle from "../../../components/Toggle";
import InputWithUnit from "../../../components/InputWithUnit";
import Button from "../../../components/Button";
import { TbArrowBackUp } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";

export default function SchedulerSetting() {
  return (
    <AccordionCard title="스케줄러 동작 주기 설정">
      <div className="flex items-end gap-4 ">
        <Toggle
          label="사용 여부"
          checked={false}
          onChange={() => {}}
          className="flex flex-col"
        />
        <div className="flex gap-4 flex-1">
          <InputWithUnit
            label="HW 리소스 조회"
            required
            value={""}
            onChange={() => {}}
            unit="초"
            className="flex-1"
          />
          <InputWithUnit
            label="통계(요청, 오류)"
            required
            value={""}
            onChange={() => {}}
            unit="초"
            className="flex-1"
          />
        </div>
        {/* 버튼 */}
        <div className="flex gap-2 ">
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
