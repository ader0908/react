import SectionCard from "../../../components/SectionCard";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import Toggle from "../../../components/Toggle";
import { useState } from "react";

export default function TrainingSetting() {
  const [learningProtocol, setLearningProtocol] = useState("http");
  const [learningIp, setLearningIp] = useState("106.246.239.222:39090");
  const [learningServer, setLearningServer] = useState("");
  const [learningStorageShare, setLearningStorageShare] = useState(true);

  const protocolOptions = [
    { value: "http", label: "http" },
    { value: "https", label: "https" },
  ];

  return (
    <SectionCard title="학습">
      <div className="flex gap-4">
        {/* 프로토콜 */}
        <div className="flex-[2]">
          <Select
            label="프로토콜"
            required
            value={learningProtocol}
            onChange={(e) => setLearningProtocol(e.target.value)}
            options={protocolOptions}
          />
        </div>

        {/* IP주소 포트 */}
        <div className="flex-[4]">
          <Input
            label="IP주소 포트"
            required
            value={learningIp}
            onChange={(e) => setLearningIp(e.target.value)}
          />
        </div>

        {/* 서버명 */}
        <div className="flex-[3]">
          <Input
            label="서버명"
            required
            value={learningServer}
            onChange={(e) => setLearningServer(e.target.value)}
            placeholder="학습 서버명 입력"
          />
        </div>

        {/* 저장소 공유 */}
        <div className="flex-[3]">
          <Toggle
            label="저장소 공유"
            description="(단건테스트, 배포)"
            checked={learningStorageShare}
            onChange={setLearningStorageShare}
          />
        </div>
      </div>
    </SectionCard>
  );
}
