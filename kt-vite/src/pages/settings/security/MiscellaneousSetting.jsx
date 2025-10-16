import React from "react";
import AccordionCard from "../../../components/AccordionCard";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import { TbArrowBackUp } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";

export default function MiscellaneousSetting() {
  return (
    <AccordionCard title="암호화 설정  ">
      <div className="flex justify-between items-end gap-4 ">
        <Select
          label="리스트 default 레코드 수"
          options={[]}
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
