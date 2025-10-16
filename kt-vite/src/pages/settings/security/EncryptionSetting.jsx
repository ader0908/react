import React from "react";
import AccordionCard from "../../../components/AccordionCard";
import Toggle from "../../../components/Toggle";
import Button from "../../../components/Button";
import { TbArrowBackUp } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";

export default function EncryptionSetting() {
  return (
    <AccordionCard title="암호화 설정">
      <div className="flex justify-between items-end gap-4 ">
        <Toggle
          label="텍스트 데이터 암호화"
          description="(STT 결과,전사,검증)"
          checked={false}
          onChange={() => {}}
          className="flex flex-col"
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
    </AccordionCard>
  );
}
