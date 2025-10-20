import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import Select from "../components/Select";
import Checkbox from "../components/Checkbox";
import Toggle from "../components/Toggle";
import RadioGroup from "../components/RadioGroup";
import Chip from "../components/Chip";
import Modal from "../components/Modal";
import { LuCopy, LuCheck } from "react-icons/lu";
import InputWithUnit from "../components/InputWithUnit";
import DatePicker from "../components/DatePicker";

const SnippetPage = () => {
  const [selectedComponent, setSelectedComponent] = useState("Button");
  const [copied, setCopied] = useState(false);

  // 예시 컴포넌트의 상태들
  const [buttonCount, setButtonCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputWithUnitValue, setInputWithUnitValue] = useState("");
  const [selectValue, setSelectValue] = useState("http");
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(true);
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [radioValue, setRadioValue] = useState("serviceModel");
  const [modalOpen, setModalOpen] = useState(false);

  // 컴포넌트 카테고리 및 리스트
  const componentCategories = [
    {
      name: "📝 Form 요소",
      components: [
        "Button",
        "Input",
        "InputWithUnit",
        "Select",
        "Checkbox",
        "Toggle",
        "RadioGroup",
        "DatePicker",
        "DateRangePicker",
      ],
    },
    {
      name: "🎨 레이아웃",
      components: [
        "Card",
        "AccordionCard",
        "SectionCard",
        "Modal",
        "PageHeader",
      ],
    },
    {
      name: "📊 데이터 표시",
      components: ["Table", "TableHeader", "Pagination", "Chart", "ChartCard"],
    },
    {
      name: "🔘 버튼 & 칩",
      components: ["Chip", "EngineItemCard", "ServerItemCard"],
    },
    {
      name: "🔍 필터 & 검색",
      components: ["SearchFilter", "Dropdown", "TimeRangeSelector"],
    },
    {
      name: "⚙️ 설정",
      components: [
        "SettingRow",
        "ServiceModelRow",
        "SchedulerSettingCard",
        "RealtimeStatusIndicator",
      ],
    },
    {
      name: "📋 대시보드",
      components: [
        "DashboardSection",
        "DashboardSectionHeader",
        "DashboardListItem",
        "DashboardForm",
      ],
    },
  ];

  // 컴포넌트별 예시 및 코드
  const componentExamples = {
    Button: {
      title: "Button",
      description: "통합 Button 컴포넌트입니다.",
      preview: (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">Variant별 버튼</h4>
            <div className="flex gap-2 flex-wrap">
              <Button variant="primary" title="Primary" />
              <Button variant="secondary" title="Secondary" />
              <Button variant="outline" title="Outline" />
              <Button variant="ghost" title="Ghost" />
              <Button variant="danger" title="Danger" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Size별 버튼</h4>
            <div className="flex gap-2 items-center flex-wrap">
              <Button size="small" title="Small" />
              <Button size="medium" title="Medium" />
              <Button size="large" title="Large" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">상태별 버튼</h4>
            <div className="flex gap-2 flex-wrap">
              <Button
                title={`클릭 횟수: ${buttonCount}`}
                onClick={() => setButtonCount(buttonCount + 1)}
              />
              <Button disabled title="Disabled" />
            </div>
          </div>
        </div>
      ),
      code: `import Button from "../components/Button";

const MyPage = () => {
  const [count, setCount] = useState(0);
  
  return (
    <>
      {/* Variant별 버튼 */}
      <Button variant="primary" title="Primary" />
      <Button variant="secondary" title="Secondary" />
      <Button variant="outline" title="Outline" />
      <Button variant="ghost" title="Ghost" />
      <Button variant="danger" title="Danger" />
      
      {/* Size별 버튼 */}
      <Button size="small" title="Small" />
      <Button size="medium" title="Medium" />
      <Button size="large" title="Large" />
      
      {/* 클릭 이벤트 */}
      <Button 
        title={\`클릭 횟수: \${count}\`}
        onClick={() => setCount(count + 1)}
      />
      
      {/* Disabled 버튼 */}
      <Button disabled title="Disabled" />
    </>
  );
};`,
    },
    Input: {
      title: "Input",
      description: "Label과 Input이 결합된 공통 컴포넌트입니다.",
      preview: (
        <div className="space-y-4 max-w-md">
          <Input
            label="IP주소 포트"
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="IP 주소를 입력하세요"
          />
          <Input label="프로토콜" value="http" readOnly />
          <Input label="서버명" value="비활성화됨" disabled />
        </div>
      ),
      code: `import { useState } from "react";
import Input from "../components/Input";

const MyPage = () => {
  const [value, setValue] = useState("");
  
  return (
    <>
      {/* 일반 Input */}
      <Input
        label="IP주소 포트"
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="IP 주소를 입력하세요"
      />
      
      {/* ReadOnly Input */}
      <Input label="프로토콜" value="http" readOnly />
      
      {/* Disabled Input */}
      <Input label="서버명" value="비활성화됨" disabled />
    </>
  );
};`,
    },
    InputWithUnit: {
      title: "InputWithUnit",
      description: "Label과 InputWithUnit이 결합된 공통 컴포넌트입니다.",
      preview: (
        <div className="space-y-4 max-w-md">
          <InputWithUnit
            label="HW 리소스 조회"
            required
            value={inputWithUnitValue}
            onChange={(e) => setInputWithUnitValue(e.target.value)}
            type="number"
            unit="초"
          />
        </div>
      ),
      code: `import { useState } from "react";
import InputWithUnit from "../components/InputWithUnit";

const MyPage = () => {
  const [inputWithUnitValue, setInputWithUnitValue] = useState("");

return (
<>
  {/* 일반 Input */}
   <InputWithUnit
        label="HW 리소스 조회"
        required
        value={inputWithUnitValue}
        onChange={(e) => setInputWithUnitValue(e.target.value)}
        type="number"
        unit="초"
      />
</>
);
};`,
    },
    Card: {
      title: "Card",
      description: "범용 카드 컴포넌트입니다. (Figma 디자인 기반)",
      preview: (
        <div className="space-y-4">
          <Card title="기본 카드">
            <p className="text-sm">카드 내용이 여기에 들어갑니다.</p>
          </Card>
          <Card
            title="버튼이 있는 카드"
            headerActions={
              <div className="flex gap-2">
                <Button variant="secondary" size="small" title="취소" />
                <Button variant="primary" size="small" title="저장" />
              </div>
            }
          >
            <p className="text-sm">헤더에 버튼이 포함된 카드입니다.</p>
          </Card>
        </div>
      ),
      code: `import Card from "../components/Card";
import Button from "../components/Button";

const MyPage = () => {
  return (
    <>
      {/* 기본 카드 */}
      <Card title="기본 카드">
        <p>카드 내용이 여기에 들어갑니다.</p>
      </Card>
      
      {/* 버튼이 있는 카드 */}
      <Card
        title="버튼이 있는 카드"
        headerActions={
          <div className="flex gap-2">
            <Button variant="secondary" size="small" title="취소" />
            <Button variant="primary" size="small" title="저장" />
          </div>
        }
      >
        <p>헤더에 버튼이 포함된 카드입니다.</p>
      </Card>
    </>
  );
};`,
    },
    Select: {
      title: "Select",
      description: "Label과 Select 드롭다운이 결합된 공통 컴포넌트입니다.",
      preview: (
        <div className="max-w-md">
          <Select
            label="프로토콜"
            required
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            options={[
              { value: "http", label: "http" },
              { value: "https", label: "https" },
            ]}
            placeholder="선택하세요"
          />
        </div>
      ),
      code: `import { useState } from "react";
import Select from "../components/Select";

const MyPage = () => {
  const [value, setValue] = useState("http");
  
  const options = [
    { value: "http", label: "http" },
    { value: "https", label: "https" },
  ];
  
  return (
    <Select
      label="프로토콜"
      required
      value={value}
      onChange={(e) => setValue(e.target.value)}
      options={options}
      placeholder="선택하세요"
    />
  );
};`,
    },
    Checkbox: {
      title: "Checkbox",
      description: "체크박스 컴포넌트입니다. (Figma 디자인 기반)",
      preview: (
        <div className="flex gap-2 flex-wrap">
          <Checkbox
            label="이용약관 동의"
            checked={checkbox1}
            onChange={setCheckbox1}
          />
          <Checkbox
            label="마케팅 수신 동의"
            checked={checkbox2}
            onChange={setCheckbox2}
          />
          <Checkbox
            label="필수 항목 (변경 불가)"
            checked={true}
            onChange={() => {}}
            disabled
          />
        </div>
      ),
      code: `import { useState } from "react";
import Checkbox from "../components/Checkbox";

const MyPage = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  
  return (
    <>
      <Checkbox
        label="이용약관 동의"
        checked={checked1}
        onChange={setChecked1}
      />
      <Checkbox
        label="마케팅 수신 동의"
        checked={checked2}
        onChange={setChecked2}
      />
      <Checkbox
        label="필수 항목 (변경 불가)"
        checked={true}
        onChange={() => {}}
        disabled
      />
    </>
  );
};`,
    },
    Toggle: {
      title: "Toggle",
      description: "Toggle(Switch) 컴포넌트입니다.",
      preview: (
        <div className="space-y-3">
          <Toggle
            label="저장소 공유"
            description="(단건테스트, 배포)"
            checked={toggle1}
            onChange={setToggle1}
          />
          <Toggle label="알림 설정" checked={toggle2} onChange={setToggle2} />
        </div>
      ),
      code: `import { useState } from "react";
import Toggle from "../components/Toggle";

const MyPage = () => {
  const [checked, setChecked] = useState(true);
  
  return (
    <>
      <Toggle
        label="저장소 공유"
        description="(단건테스트, 배포)"
        checked={checked}
        onChange={setChecked}
      />
      <Toggle
        label="알림 설정"
        checked={checked}
        onChange={setChecked}
      />
    </>
  );
};`,
    },
    RadioGroup: {
      title: "RadioGroup",
      description: "라디오 버튼 그룹 컴포넌트입니다. (Figma 디자인 기반)",
      preview: (
        <div className="space-y-4">
          <RadioGroup
            name="filterType"
            label="필터 유형"
            required
            options={[
              { value: "serviceModel", label: "서비스 모델" },
              { value: "customerCode", label: "고객 코드" },
            ]}
            value={radioValue}
            onChange={setRadioValue}
          />
        </div>
      ),
      code: `import { useState } from "react";
import RadioGroup from "../components/RadioGroup";

const MyPage = () => {
  const [value, setValue] = useState("serviceModel");
  
  return (
    <RadioGroup
      name="filterType"
      label="필터 유형"
      required
      options={[
        { value: "serviceModel", label: "서비스 모델" },
        { value: "customerCode", label: "고객 코드" },
      ]}
      value={value}
      onChange={setValue}
    />
  );
};`,
    },
    DatePicker: {
      title: "DatePicker",
      description: "DatePicker 컴포넌트입니다. (Figma 디자인 기반)",
      preview: (
        <div className="space-y-4">
          {/* 기본 사용 */}
          <DatePicker
            label="날짜 선택"
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="날짜를 선택하세요"
          />

          {/* 필수 항목 */}
          <DatePicker
            label="시작 날짜"
            required
            value={selectedDate}
            onChange={setSelectedDate}
          />

          {/* 최소/최대 날짜 제한 */}
          <DatePicker
            label="예약 날짜"
            value={selectedDate}
            onChange={setSelectedDate}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
          />
        </div>
      ),
      code: `import { useState } from "react";
import DatePicker from "../components/DatePicker";

const MyPage = () => {
   const [selectedDate, setSelectedDate] = useState(null);
  
  return (
      {/* 기본 사용 */}
      <DatePicker
        label="날짜 선택"
        value={selectedDate}
        onChange={setSelectedDate}
        placeholder="날짜를 선택하세요"
      />

      {/* 필수 항목 */}
      <DatePicker
        label="시작 날짜"
        required
        value={selectedDate}
        onChange={setSelectedDate}
      />

      {/* 최소/최대 날짜 제한 */}
      <DatePicker
        label="예약 날짜"
        value={selectedDate}
        onChange={setSelectedDate}
        minDate={new Date()}
        maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
      />
  );
};`,
    },
    Chip: {
      title: "Chip",
      description: "칩(Badge) 버튼 컴포넌트입니다.",
      preview: () => (
        <div className="flex gap-2 flex-wrap">
          <Chip label="CPU" variant="primary" />
          <Chip label="메모리" variant="secondary" />
          <Chip label="인증률" variant="tertiary" />
          <Chip label="실패건수" variant="disabled" />
          <Chip label="커스텀" color="#ea580c" />
        </div>
      ),
      code: `import Chip from "../components/Chip";

const MyPage = () => {
  return (
    <div className="flex gap-2">
      <Chip label="CPU" variant="primary" />
      <Chip label="메모리" variant="secondary" />
      <Chip label="인증률" variant="tertiary" />
      <Chip label="실패건수" variant="disabled" />
      <Chip label="커스텀" color="#ea580c" />
    </div>
  );
};`,
    },
    Modal: {
      title: "Modal",
      description:
        "팝업(모달) 공통 컴포넌트입니다. Figma 디자인 기반으로 제작되었습니다.",
      preview: (
        <div>
          <Button
            variant="primary"
            title="모달 열기"
            onClick={() => setModalOpen(true)}
          />
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="모달 제목"
            size="sm"
            footer={
              <div className="flex gap-2 justify-end">
                <Button
                  variant="secondary"
                  title="취소"
                  onClick={() => setModalOpen(false)}
                />
                <Button
                  variant="primary"
                  title="확인"
                  onClick={() => setModalOpen(false)}
                />
              </div>
            }
          >
            <p className="text-sm">모달 본문 내용이 여기에 들어갑니다.</p>
          </Modal>
        </div>
      ),
      code: `import { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button
        variant="primary"
        title="모달 열기"
        onClick={() => setIsOpen(true)}
      />
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="모달 제목"
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              title="취소"
              onClick={() => setIsOpen(false)}
            />
            <Button
              variant="primary"
              title="확인"
              onClick={() => setIsOpen(false)}
            />
          </>
        }
      >
        <p>모달 본문 내용이 여기에 들어갑니다.</p>
      </Modal>
    </>
  );
};`,
    },
  };

  const currentExample = componentExamples[selectedComponent] || {
    title: selectedComponent,
    description: "준비 중입니다.",
    preview: (
      <div className="text-center py-12 text-gray-500">
        <p>{selectedComponent} 컴포넌트의 예시를 준비 중입니다.</p>
      </div>
    ),
    code: `// ${selectedComponent} 예시 코드 준비 중...`,
  };

  // 코드 복사 함수
  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentExample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 왼쪽 사이드바 */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">컴포넌트 스니펫</h2>
          <p className="text-xs text-gray-500 mt-1">컴포넌트를 선택하세요</p>
        </div>
        <div className="p-2">
          {componentCategories.map((category) => (
            <div key={category.name} className="mb-4">
              <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">
                {category.name}
              </div>
              <div className="space-y-1">
                {category.components.map((component) => (
                  <button
                    key={component}
                    onClick={() => setSelectedComponent(component)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      selectedComponent === component
                        ? "bg-[#2bb7b3] text-white font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {component}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 오른쪽 메인 영역 */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto p-8">
          {/* 헤더 */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentExample.title}
            </h1>
            <p className="text-gray-600">{currentExample.description}</p>
          </div>

          {/* UI 예시 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              UI 예시
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              {currentExample.preview}
            </div>
          </div>

          {/* 코드 예시 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">코드 예시</h3>
              <Button
                variant="outline"
                size="small"
                icon={copied ? <LuCheck /> : <LuCopy />}
                title={copied ? "복사됨!" : "코드 복사"}
                onClick={handleCopyCode}
              />
            </div>
            <div className="bg-[#1e1e1e] text-gray-100 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{currentExample.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetPage;
