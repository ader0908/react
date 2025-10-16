import SectionCard from "../../../components/SectionCard";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import Toggle from "../../../components/Toggle";
import { useState } from "react";

export default function OperationSetting() {
  const [operationProtocol, setOperationProtocol] = useState("http");
  const [operationIp, setOperationIp] = useState("106.246.239.222:39090");
  const [operationServer, setOperationServer] = useState("");
  const [operationStorageShare, setOperationStorageShare] = useState(true);

  const protocolOptions = [
    { value: "http", label: "http" },
    { value: "https", label: "https" },
  ];

  return (
    <SectionCard title="운영">
      <div className="flex gap-4">
        {/* 프로토콜 */}
        <div className="flex-[2]">
          <Select
            label="프로토콜"
            required
            value={operationProtocol}
            onChange={(e) => setOperationProtocol(e.target.value)}
            options={protocolOptions}
            fullWidth={false}
          />
        </div>

        {/* IP주소 포트 */}
        <div className="flex-[4]">
          <Input
            label="IP주소 포트"
            required
            value={operationIp}
            onChange={(e) => setOperationIp(e.target.value)}
          />
        </div>

        {/* 서버명 */}
        <div className="flex-[3]">
          <Input
            label="서버명"
            required
            value={operationServer}
            onChange={(e) => setOperationServer(e.target.value)}
            placeholder="운영 서버명 입력"
          />
        </div>

        {/* 저장소 공유 */}
        <div className="flex-[3]">
          <Toggle
            label="저장소 공유"
            description="(단건테스트, 배포)"
            checked={operationStorageShare}
            onChange={setOperationStorageShare}
          />
        </div>
      </div>
    </SectionCard>
  );
}
