import React, { useState } from "react";
import SectionCard from "../../../components/SectionCard";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import Toggle from "../../../components/Toggle";
import Button from "../../../components/Button";
import { TbArrowBackUp } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";
import { LuPlay } from "react-icons/lu";

export default function ModelSetting() {
  const [learningProtocol, setLearningProtocol] = useState("http");
  const protocolOptions = [
    { value: "http", label: "http" },
    { value: "https", label: "https" },
  ];
  return (
    <div>
      <SectionCard title="상담 모델">
        <div className="flex gap-4 items-end">
          <div className="flex-[1]">
            <Select
              label="서비스모델"
              required
              value={learningProtocol}
              onChange={(e) => setLearningProtocol(e.target.value)}
              options={protocolOptions}
            />
          </div>
          <div className="flex-[1]">
            <Input label="신뢰도 값" required value={""} onChange={() => {}} />
          </div>
          <div className="flex-[1] flex items-center justify-center">
            <Toggle label="암호화 유무" checked={false} onChange={() => {}} />
          </div>
          <div className="flex-[1]">
            <Input
              label="파일 전체 저장 개수"
              required
              value={""}
              onChange={() => {}}
            />
          </div>
          <div className="flex-[1]">
            <Input
              label="파일 최대 저장 개수"
              required
              value={""}
              onChange={() => {}}
            />
          </div>
          <div className="flex-[2]">
            <Input
              label="SMP 호출 URL(ex. http://localhost:8080)"
              required
              value={""}
              onChange={() => {}}
            />
          </div>
          <div className="flex-[2]">
            <Input
              label="프로젝트 코드"
              required
              value={""}
              onChange={() => {}}
            />
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-2 flex-[3] justify-end min-w-0">
            <Button
              title="시작"
              variant={null}
              className="bg-[#2bb7b3] text-white hover:bg-[#2bb7b2d3]"
              icon={<LuPlay />}
            />

            <Button title="중지" variant="secondary" icon={<TbArrowBackUp />} />

            <Button title="변경" variant="primary" icon={<FaRegSave />} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
