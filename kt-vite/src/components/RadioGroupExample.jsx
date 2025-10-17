import { useState } from "react";
import RadioGroup from "./RadioGroup";

/**
 * RadioGroup 컴포넌트 사용 예시
 */
const RadioGroupExample = () => {
  const [selectedOption1, setSelectedOption1] = useState("option1");
  const [selectedOption2, setSelectedOption2] = useState("a");
  const [selectedOption3, setSelectedOption3] = useState("small");

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">RadioGroup 컴포넌트 예시</h1>

      {/* 예시 1: 기본 가로 방향 */}
      <div className="bg-white p-5 rounded-lg border">
        <h2 className="text-lg font-semibold mb-4">기본 가로 방향</h2>
        <RadioGroup
          name="example1"
          label="옵션 선택"
          options={[
            { value: "option1", label: "옵션 1" },
            { value: "option2", label: "옵션 2" },
            { value: "option3", label: "옵션 3" },
          ]}
          value={selectedOption1}
          onChange={setSelectedOption1}
        />
        <p className="mt-3 text-sm text-gray-600">
          선택된 값: <strong>{selectedOption1}</strong>
        </p>
      </div>

      {/* 예시 2: 세로 방향 */}
      <div className="bg-white p-5 rounded-lg border">
        <h2 className="text-lg font-semibold mb-4">세로 방향</h2>
        <RadioGroup
          name="example2"
          label="세로 배치 옵션"
          required
          options={[
            { value: "a", label: "항목 A" },
            { value: "b", label: "항목 B" },
            { value: "c", label: "항목 C" },
            { value: "d", label: "항목 D" },
          ]}
          value={selectedOption2}
          onChange={setSelectedOption2}
          direction="vertical"
          gap="gap-3"
        />
        <p className="mt-3 text-sm text-gray-600">
          선택된 값: <strong>{selectedOption2}</strong>
        </p>
      </div>

      {/* 예시 3: 라벨 없이 */}
      <div className="bg-white p-5 rounded-lg border">
        <h2 className="text-lg font-semibold mb-4">라벨 없이 사용</h2>
        <RadioGroup
          name="example3"
          options={[
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
          ]}
          value={selectedOption3}
          onChange={setSelectedOption3}
        />
        <p className="mt-3 text-sm text-gray-600">
          선택된 값: <strong>{selectedOption3}</strong>
        </p>
      </div>

      {/* 예시 4: 필터 형태 (서비스 모델 / 고객 코드) */}
      <div className="bg-white p-5 rounded-lg border">
        <h2 className="text-lg font-semibold mb-4">
          필터 형태 (SearchFilter 사용 시)
        </h2>
        <RadioGroup
          name="example4"
          options={[
            { value: "serviceModel", label: "서비스 모델" },
            { value: "customerCode", label: "고객 코드" },
          ]}
          value={selectedOption1}
          onChange={setSelectedOption1}
        />
      </div>
    </div>
  );
};

export default RadioGroupExample;
