import React from "react";
import SectionCard from "../../../components/SectionCard";
import InputWithUnit from "../../../components/InputWithUnit";
import Select from "../../../components/Select";

export default function DeletionCycleSetting() {
  return (
    <SectionCard title="삭제 주기">
      <div className="flex gap-4">
        <InputWithUnit
          label="삭제 주기"
          required
          value={""}
          onChange={() => {}}
          unit="일"
          className="flex-1"
        />
        <Select
          label="삭제 실행 시간"
          required
          value={""}
          onChange={() => {}}
          options={[]}
          className="flex-1"
        />
      </div>
    </SectionCard>
  );
}
