import AccordionCard from "../../../components/AccordionCard";
import Button from "../../../components/Button";
import { FaRegSave } from "react-icons/fa";
import { TbArrowBackUp } from "react-icons/tb";
import TrainingSetting from "./TrainingSetting";
import OperationSetting from "./OperationSetting";

export default function AgentSetting() {
  return (
    <AccordionCard title="Agent 관련 설정">
      <div className="flex flex-row gap-4">
        {/* 학습 섹션 */}
        <div className="flex-1">
          <TrainingSetting />
        </div>

        {/* 운영 섹션 */}
        <div className="flex-1">
          <OperationSetting />
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
