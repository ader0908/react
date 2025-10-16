import React from "react";
import AccordionCard from "../../../components/AccordionCard";
import Toggle from "../../../components/Toggle";
import InputWithUnit from "../../../components/InputWithUnit";
import Button from "../../../components/Button";
import { TbArrowBackUp } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";

export default function ResourceThresholdSetting() {
  return (
    <AccordionCard title="HW 리소스 임계치 설정">
      <div>
        <div className="flex items-end gap-4 ">
          <InputWithUnit
            label="CPU 사용률"
            required
            value={""}
            onChange={() => {}}
            unit="초"
            className="flex-1"
          />
          <InputWithUnit
            label="메모리 사용률"
            required
            value={""}
            onChange={() => {}}
            unit="초"
            className="flex-1"
          />
          <InputWithUnit
            label="디스크 사용률"
            required
            value={""}
            onChange={() => {}}
            unit="초"
            className="flex-1"
          />
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
      </div>
    </AccordionCard>
  );
}
