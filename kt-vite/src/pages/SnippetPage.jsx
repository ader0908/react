import React, { useCallback, useState } from "react";
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
import DateRangePicker from "../components/DateRangePicker";
import TimeRangeSelector from "../components/TimeRangeSelector";
import AccordionCard from "../components/AccordionCard";
import SectionCard from "../components/SectionCard";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import TableHeader from "../components/TableHeader";
import Pagination from "../components/Pagination";
import Chart from "../components/Chart";
import ChartCard from "../components/ChartCard";
import EngineItemCard from "../components/EngineItemCard";
import ServerItemCard from "../components/ServerItemCard";
import SearchFilter from "../components/SearchFilter";
import Dropdown from "../components/Dropdown";
import SettingRow from "../components/SettingRow";
import ServiceModelRow from "../components/ServiceModelRow";
import RealtimeStatusIndicator from "../components/RealtimeStatusIndicator";
import DashboardSection from "../components/DashboardSection";
import DashboardSectionHeader from "../components/DashboardSectionHeader";
import DashboardListItem from "../components/DashboardListItem";
import DashboardForm from "../components/DashboardForm";

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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // 시간 범위 관련 상태
  const [isRealtime, setIsRealtime] = useState(false);
  const [dataInterval, setDataInterval] = useState("1분");
  const [dateRange, setDateRange] = useState(
    "2025/09/10 16:37 ~ 2025/09/10 17:37"
  );
  const [timeRangePreset, setTimeRangePreset] = useState("최근 1시간");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  // SearchFilter 관련 상태
  const [searchFilterType, setSearchFilterType] = useState("serviceModel");
  const [searchSelectValue, setSearchSelectValue] = useState("");
  // Dropdown 관련 상태
  const [dropdownValue, setDropdownValue] = useState("최근 1시간");
  // SettingRow 관련 상태
  const [settingToggle, setSettingToggle] = useState(true);
  // ServiceModelRow 관련 상태
  const [callbotChecks, setCallbotChecks] = useState({
    request: true,
    error: false,
    statistics: true,
  });
  // Dashboard 관련 상태
  const [selectedDashboards, setSelectedDashboards] = useState(["dashboard-1"]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 실시간 모드 토글 핸들러 - TimeRangeSelector 컴포넌트에서 사용
  const handleRealtimeToggle = useCallback(() => {
    const newRealtimeState = !isRealtime;
    setIsRealtime(newRealtimeState);

    // 실시간 모드로 전환 시 프리셋을 "실시간 5분"으로 변경
    if (newRealtimeState) {
      setTimeRangePreset("실시간 5분");
    } else {
      // 일반 모드로 전환 시 프리셋을 "최근 1시간"으로 변경
      setTimeRangePreset("최근 1시간");
    }
  }, [isRealtime]);

  // 전체 펼침/접기 핸들러 - PageHeader 컴포넌트에서 사용
  const handleExpandAll = (isExpanded) => {
    console.log("전체 펼침/접기:", isExpanded);
  };

  // Table 컴포넌트에서 사용되는 컬럼 정의
  const columns = [
    {
      key: "no",
      label: "NO",
      width: "40px",
      align: "center",
    },
    {
      key: "date",
      label: "일시",
      width: "160px",
      align: "center",
    },
    {
      key: "status",
      label: "상태",
      width: "100px",
      align: "center",
      render: (value, row) => (
        <Button
          variant="primary"
          size="small"
          title={value}
          onClick={() => alert(`${row.no}번 상태 확인`)}
        />
      ),
    },
  ];

  // Table 컴포넌트에서 사용되는 데이터 정의
  const data = [
    { no: 1, date: "2025-08-19 13:53:54", status: "진행중" },
    { no: 2, date: "2025-08-19 13:53:54", status: "완료" },
  ];

  // Chart 컴포넌트에서 사용되는 데이터 정의
  const chartData = {
    labels: ["1월", "2월", "3월", "4월", "5월"],
    datasets: [
      {
        label: "데이터셋 1",
        data: [65, 59, 80, 81, 56],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // ChartCard 컴포넌트에서 사용되는 데이터 정의
  const charCardtData = {
    labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00"],
    datasets: [
      {
        label: "c-pod-001",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "c-pod-002",
        data: [28, 48, 40, 19, 86, 27],
        borderColor: "#5090f7",
        backgroundColor: "rgba(80, 144, 247, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

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
      components: ["SettingRow", "ServiceModelRow", "RealtimeStatusIndicator"],
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
      props: [
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
          required: false,
          default: "'primary'",
          description: "버튼 스타일 variant",
        },
        {
          name: "size",
          type: "'small' | 'medium' | 'large'",
          required: false,
          default: "'medium'",
          description: "버튼 크기",
        },
        {
          name: "title",
          type: "string",
          required: true,
          default: "-",
          description: "버튼 텍스트",
        },
        {
          name: "onClick",
          type: "() => void",
          required: false,
          default: "-",
          description: "클릭 이벤트 핸들러",
        },
        {
          name: "disabled",
          type: "boolean",
          required: false,
          default: "false",
          description: "비활성화 여부",
        },
        {
          name: "icon",
          type: "ReactNode",
          required: false,
          default: "-",
          description: "버튼 아이콘",
        },
        {
          name: "type",
          type: "string",
          required: false,
          default: "'button'",
          description: "버튼 타입 (button | submit | reset)",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
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
      props: [
        {
          name: "label",
          type: "string",
          required: false,
          default: "-",
          description: "입력 필드 레이블",
        },
        {
          name: "value",
          type: "string",
          required: true,
          default: "-",
          description: "입력 값",
        },
        {
          name: "onChange",
          type: "(e: Event) => void",
          required: true,
          default: "-",
          description: "값 변경 이벤트 핸들러",
        },
        {
          name: "placeholder",
          type: "string",
          required: false,
          default: "-",
          description: "플레이스홀더 텍스트",
        },
        {
          name: "required",
          type: "boolean",
          required: false,
          default: "false",
          description: "필수 입력 여부",
        },
        {
          name: "disabled",
          type: "boolean",
          required: false,
          default: "false",
          description: "비활성화 여부",
        },
        {
          name: "readOnly",
          type: "boolean",
          required: false,
          default: "false",
          description: "읽기 전용 여부",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
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
      props: [
        {
          name: "label",
          type: "string",
          required: false,
          default: "-",
          description: "라벨 텍스트",
        },
        {
          name: "required",
          type: "boolean",
          required: false,
          default: "false",
          description: "필수 항목 여부",
        },
        {
          name: "value",
          type: "string",
          required: true,
          default: "-",
          description: "입력 값",
        },
        {
          name: "onChange",
          type: "(e: Event) => void",
          required: true,
          default: "-",
          description: "값 변경 핸들러",
        },
        {
          name: "type",
          type: "string",
          required: false,
          default: "'text'",
          description: "input 타입",
        },
        {
          name: "unit",
          type: "string",
          required: true,
          default: "-",
          description: "단위 텍스트 (예: '초', '분', 'GB', '%')",
        },
        {
          name: "placeholder",
          type: "string",
          required: false,
          default: "-",
          description: "플레이스홀더 텍스트",
        },
        {
          name: "disabled",
          type: "boolean",
          required: false,
          default: "false",
          description: "비활성화 여부",
        },
        {
          name: "readOnly",
          type: "boolean",
          required: false,
          default: "false",
          description: "읽기 전용 여부",
        },
      ],
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
      props: [
        {
          name: "title",
          type: "string",
          required: false,
          default: "-",
          description: "카드 제목",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          default: "-",
          description: "카드 내용",
        },
        {
          name: "showIndicator",
          type: "boolean",
          required: false,
          default: "true",
          description: "왼쪽 바 표시 여부",
        },
        {
          name: "indicatorColor",
          type: "string",
          required: false,
          default: "'#ed1b23'",
          description: "왼쪽 바 색상",
        },
        {
          name: "headerActions",
          type: "ReactNode",
          required: false,
          default: "-",
          description: "헤더 오른쪽 액션 영역",
        },
        {
          name: "footer",
          type: "ReactNode",
          required: false,
          default: "-",
          description: "카드 하단 영역",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
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
    AccordionCard: {
      title: "AccordionCard",
      description:
        "AccordionCard 컴포넌트입니다. - 펼침/접기 기능이 있는 카드입니다. (Figma 디자인 기반)",
      props: [
        {
          name: "title",
          type: "string",
          required: true,
          default: "-",
          description: "카드 제목",
        },
        {
          name: "errorMessage",
          type: "string",
          required: false,
          default: "-",
          description: "제목 옆에 표시될 에러/경고 메시지",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          default: "-",
          description: "카드 내용",
        },
      ],
      preview: (
        <div className="space-y-4">
          <AccordionCard title="카드 제목">
            <div>카드 내용</div>
          </AccordionCard>
          <AccordionCard
            title="설정"
            errorMessage="설정을 불러오는데 실패했습니다."
          >
            <div>카드 내용</div>
          </AccordionCard>
        </div>
      ),
      code: `import Card from "../components/Card";
        import Button from "../components/Button";

        const MyPage = () => {
          return (
            <>
              {/* 기본 사용 */}
             <AccordionCard title="카드 제목">
                <div>카드 내용</div>
              </AccordionCard>
              {/* 에러 메시지가 있는 경우 */}
              <AccordionCard title="설정" errorMessage="설정을 불러오는데 실패했습니다.">
                <div>카드 내용</div>
              </AccordionCard>
            </>
          );
        };`,
    },
    SectionCard: {
      title: "SectionCard",
      description:
        "AccordionCard의 content 영역에 사용되는 SectionCard 컴포넌트입니다. (Figma 디자인 기반)",
      props: [
        {
          name: "title",
          type: "string",
          required: true,
          default: "-",
          description: "섹션 제목 (예: '학습', '운영')",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          default: "-",
          description: "섹션 내용",
        },
      ],
      preview: (
        <div className="space-y-4">
          <AccordionCard title="Agent 관련 설정">
            <div className="flex gap-6">
              <SectionCard title="학습">
                <div className="grid grid-cols-4 gap-4">
                  {/* 입력 필드들 */}
                </div>
              </SectionCard>
              <SectionCard title="운영">
                <div className="grid grid-cols-4 gap-4">
                  {/* 입력 필드들 */}
                </div>
              </SectionCard>
            </div>
          </AccordionCard>
        </div>
      ),
      code: `import Card from "../components/Card";
import Button from "../components/Button";

const MyPage = () => {
  return (
    <>
    <AccordionCard title="Agent 관련 설정">
      <div className="flex gap-6">
        {/* AccordionCard의 content 영역에 사용되는 섹션 카드 컴포넌트입니다. */}
        <SectionCard title="학습">
          <div className="grid grid-cols-4 gap-4">{/* 입력 필드들 */}</div>
        </SectionCard>
        <SectionCard title="운영">
          <div className="grid grid-cols-4 gap-4">{/* 입력 필드들 */}</div>
        </SectionCard>
      </div>
    </AccordionCard>
    </>
  );
};`,
    },
    Select: {
      title: "Select",
      description: "Label과 Select 드롭다운이 결합된 공통 컴포넌트입니다.",
      props: [
        {
          name: "label",
          type: "string",
          required: false,
          default: "-",
          description: "선택 필드 레이블",
        },
        {
          name: "value",
          type: "string",
          required: true,
          default: "-",
          description: "선택된 값",
        },
        {
          name: "onChange",
          type: "(e: Event) => void",
          required: true,
          default: "-",
          description: "값 변경 이벤트 핸들러",
        },
        {
          name: "options",
          type: "Array<{value: string, label: string}>",
          required: true,
          default: "-",
          description: "선택 옵션 배열",
        },
        {
          name: "placeholder",
          type: "string",
          required: false,
          default: "-",
          description: "플레이스홀더 텍스트",
        },
        {
          name: "required",
          type: "boolean",
          required: false,
          default: "false",
          description: "필수 선택 여부",
        },
        {
          name: "bgColor",
          type: "string",
          required: false,
          default: "'#f4f5f5'",
          description: "배경색",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
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
      props: [
        {
          name: "label",
          type: "string",
          required: true,
          default: "-",
          description: "체크박스 레이블",
        },
        {
          name: "checked",
          type: "boolean",
          required: true,
          default: "-",
          description: "체크 상태",
        },
        {
          name: "onChange",
          type: "(checked: boolean) => void",
          required: true,
          default: "-",
          description: "체크 상태 변경 핸들러",
        },
        {
          name: "disabled",
          type: "boolean",
          required: false,
          default: "false",
          description: "비활성화 여부",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
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
      props: [
        {
          name: "label",
          type: "string",
          required: false,
          default: "-",
          description: "토글 레이블",
        },
        {
          name: "description",
          type: "string",
          required: false,
          default: "-",
          description: "토글 설명",
        },
        {
          name: "checked",
          type: "boolean",
          required: true,
          default: "-",
          description: "토글 상태",
        },
        {
          name: "onChange",
          type: "(checked: boolean) => void",
          required: true,
          default: "-",
          description: "토글 상태 변경 핸들러",
        },
        {
          name: "disabled",
          type: "boolean",
          required: false,
          default: "false",
          description: "비활성화 여부",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
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
      props: [
        {
          name: "name",
          type: "string",
          required: true,
          default: "-",
          description: "라디오 그룹 이름",
        },
        {
          name: "options",
          type: "Array<{value: string, label: string}>",
          required: true,
          default: "-",
          description: "옵션 배열",
        },
        {
          name: "value",
          type: "string",
          required: true,
          default: "-",
          description: "선택된 값",
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          required: true,
          default: "-",
          description: "값 변경 핸들러",
        },
        {
          name: "label",
          type: "string",
          required: false,
          default: "-",
          description: "그룹 라벨 텍스트",
        },
        {
          name: "required",
          type: "boolean",
          required: false,
          default: "false",
          description: "필수 항목 여부",
        },
        {
          name: "direction",
          type: "'horizontal' | 'vertical'",
          required: false,
          default: "'horizontal'",
          description: "배치 방향",
        },
        {
          name: "gap",
          type: "string",
          required: false,
          default: "'gap-6'",
          description: "라디오 버튼 간 간격 (Tailwind 클래스)",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
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
      props: [
        {
          name: "label",
          type: "string",
          required: false,
          default: "-",
          description: "라벨 텍스트",
        },
        {
          name: "required",
          type: "boolean",
          required: false,
          default: "false",
          description: "필수 항목 여부",
        },
        {
          name: "value",
          type: "Date",
          required: true,
          default: "-",
          description: "선택된 날짜 (Date 객체)",
        },
        {
          name: "onChange",
          type: "(date: Date) => void",
          required: true,
          default: "-",
          description: "날짜 변경 핸들러",
        },
        {
          name: "placeholder",
          type: "string",
          required: false,
          default: "'날짜 선택'",
          description: "플레이스홀더 텍스트",
        },
        {
          name: "minDate",
          type: "Date",
          required: false,
          default: "-",
          description: "선택 가능한 최소 날짜",
        },
        {
          name: "maxDate",
          type: "Date",
          required: false,
          default: "-",
          description: "선택 가능한 최대 날짜",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
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
    DateRangePicker: {
      title: "DateRangePicker",
      description: "DatePicker 컴포넌트입니다. (Figma 디자인 기반)",
      props: [
        {
          name: "label",
          type: "string",
          required: false,
          default: "'조회기간'",
          description: "라벨 텍스트",
        },
        {
          name: "required",
          type: "boolean",
          required: false,
          default: "false",
          description: "필수 항목 여부",
        },
        {
          name: "startDate",
          type: "Date",
          required: true,
          default: "-",
          description: "시작일 (Date 객체)",
        },
        {
          name: "endDate",
          type: "Date",
          required: true,
          default: "-",
          description: "종료일 (Date 객체)",
        },
        {
          name: "onStartDateChange",
          type: "(date: Date) => void",
          required: true,
          default: "-",
          description: "시작일 변경 핸들러",
        },
        {
          name: "onEndDateChange",
          type: "(date: Date) => void",
          required: true,
          default: "-",
          description: "종료일 변경 핸들러",
        },
        {
          name: "startPlaceholder",
          type: "string",
          required: false,
          default: "'시작일'",
          description: "시작일 플레이스홀더",
        },
        {
          name: "endPlaceholder",
          type: "string",
          required: false,
          default: "'종료일'",
          description: "종료일 플레이스홀더",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          <DateRangePicker
            label="조회기간"
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />

          {/* 필수 항목 */}
          <DateRangePicker
            label="검색 기간"
            required
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            startPlaceholder="시작일"
            endPlaceholder="종료일"
          />
        </div>
      ),
      code: `import { useState } from "react";
import DateRangePicker from "../components/DateRangePicker";

const MyPage = () => {
 const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  return (
    <DateRangePicker
        label="조회기간"
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {/* 필수 항목 */}
      <DateRangePicker
        label="검색 기간"
        required
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        startPlaceholder="시작일"
        endPlaceholder="종료일"
      />
  );
};`,
    },
    TimeRangeSelector: {
      title: "TimeRangeSelector",
      description:
        "TimeRangeSelector 컴포넌트입니다. - 시간 범위 선택 컴포넌트입니다. (모니터링 페이지용 조회 설정)",
      props: [
        {
          name: "isRealtime",
          type: "boolean",
          required: true,
          default: "-",
          description: "실시간 모드 활성화 여부",
        },
        {
          name: "onRealtimeToggle",
          type: "() => void",
          required: true,
          default: "-",
          description: "실시간 버튼 클릭 핸들러",
        },
        {
          name: "dateRange",
          type: "string",
          required: true,
          default: "-",
          description: "날짜 범위 문자열",
        },
        {
          name: "onDateRangeChange",
          type: "(range: string) => void",
          required: true,
          default: "-",
          description: "날짜 범위 변경 핸들러",
        },
        {
          name: "timeRangePreset",
          type: "string",
          required: true,
          default: "-",
          description: "현재 선택된 시간 범위 프리셋",
        },
        {
          name: "onTimeRangePresetChange",
          type: "(preset: string) => void",
          required: true,
          default: "-",
          description: "시간 범위 프리셋 변경 핸들러",
        },
        {
          name: "dataInterval",
          type: "string",
          required: true,
          default: "-",
          description: "현재 선택된 데이터 간격",
        },
        {
          name: "onDataIntervalChange",
          type: "(interval: string) => void",
          required: true,
          default: "-",
          description: "데이터 간격 변경 핸들러",
        },
      ],
      preview: (
        <div className="space-y-4">
          <TimeRangeSelector
            isRealtime={isRealtime}
            onRealtimeToggle={handleRealtimeToggle}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            timeRangePreset={timeRangePreset}
            onTimeRangePresetChange={setTimeRangePreset}
            dataInterval={dataInterval}
            onDataIntervalChange={setDataInterval}
          />
        </div>
      ),
      code: `import { useState, useCallback } from "react";
import TimeRangeSelector from "../components/TimeRangeSelector";

const MyPage = () => {
  const [isRealtime, setIsRealtime] = useState(false);
  const [dataInterval, setDataInterval] = useState("1분");
  const [dateRange, setDateRange] = useState("2025/09/10 16:37 ~ 2025/09/10 17:37");
  const [timeRangePreset, setTimeRangePreset] = useState("최근 1시간");
  
  const handleRealtimeToggle = useCallback(() => {
    const newRealtimeState = !isRealtime;
    setIsRealtime(newRealtimeState);
    
    if (newRealtimeState) {
      setTimeRangePreset("실시간 5분");
    } else {
      setTimeRangePreset("최근 1시간");
    }
  }, [isRealtime]);
  
  return (
    <TimeRangeSelector
      isRealtime={isRealtime}
      onRealtimeToggle={handleRealtimeToggle}
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
      timeRangePreset={timeRangePreset}
      onTimeRangePresetChange={setTimeRangePreset}
      dataInterval={dataInterval}
      onDataIntervalChange={setDataInterval}
    />
  );
};`,
    },
    Chip: {
      title: "Chip",
      description: "칩(Badge) 버튼 컴포넌트입니다.",
      props: [
        {
          name: "label",
          type: "string",
          required: true,
          default: "-",
          description: "칩에 표시될 텍스트",
        },
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'tertiary' | 'disabled' | 'gray'",
          required: false,
          default: "'primary'",
          description: "칩 스타일 (녹색/파란색/보라색/회색/연회색)",
        },
        {
          name: "color",
          type: "string",
          required: false,
          default: "-",
          description: "커스텀 배경색 (variant 대신 사용 가능)",
        },
        {
          name: "onClick",
          type: "() => void",
          required: false,
          default: "-",
          description: "클릭 이벤트 핸들러",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
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
    EngineItemCard: {
      title: "EngineItemCard",
      description:
        "엔진 항목 카드 컴포넌트입니다. Chip 컴포넌트들을 그룹화하여 표시합니다.",
      props: [
        {
          name: "title",
          type: "string",
          required: true,
          default: "-",
          description: "카드 제목 (예: 'STT', 'TTS', 'SV')",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          default: "-",
          description: "카드 내용 (주로 Chip 컴포넌트들)",
        },
        {
          name: "borderColor",
          type: "string",
          required: false,
          default: "'#22c55e'",
          description: "테두리 색상",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          <EngineItemCard title="STT" borderColor="#22c55e">
            <Chip label="CPU" variant="primary" />
            <Chip label="메모리" variant="primary" />
            <Chip label="디스크" variant="primary" />
          </EngineItemCard>
        </div>
      ),
      code: `import EngineItemCard from "../components/EngineItemCard";
import Chip from "../components/Chip";

const MyPage = () => {

  return (
    <>
      <EngineItemCard title="STT" borderColor="#22c55e">
        <Chip label="CPU" variant="primary" />
        <Chip label="메모리" variant="primary" />
        <Chip label="디스크" variant="primary" />
      </EngineItemCard>
    </>
  );
};`,
    },
    ServerItemCard: {
      title: "ServerItemCard",
      description:
        "서버 항목 카드 컴포넌트입니다. EngineItemCard의 변형으로 서버 리스트를 표시합니다.",
      props: [
        {
          name: "title",
          type: "string",
          required: true,
          default: "-",
          description: "카드 제목 (예: 'STT', 'TTS', 'SV')",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          default: "-",
          description: "카드 내용 (주로 Chip 컴포넌트들)",
        },
        {
          name: "borderColor",
          type: "string",
          required: false,
          default: "'#22c55e'",
          description: "테두리 색상",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          <ServerItemCard title="STT" borderColor="#22c55e">
            <Chip label="c-pod-001" variant="primary" />
            <Chip label="c-pod-002" variant="primary" />
            <Chip label="c-pod-003" variant="primary" />
            <Chip label="c-pod-004" variant="disabled" />
          </ServerItemCard>
        </div>
      ),
      code: `import ServerItemCard from "../components/ServerItemCard";
import Chip from "../components/Chip";

const MyPage = () => {

  return (
    <>
     <ServerItemCard title="STT" borderColor="#22c55e">
        <Chip label="c-pod-001" variant="primary" />
        <Chip label="c-pod-002" variant="primary" />
        <Chip label="c-pod-003" variant="primary" />
        <Chip label="c-pod-004" variant="disabled" />
      </ServerItemCard>
    </>
  );
};`,
    },
    Modal: {
      title: "Modal",
      description:
        "팝업(모달) 공통 컴포넌트입니다. Figma 디자인 기반으로 제작되었습니다.",
      props: [
        {
          name: "isOpen",
          type: "boolean",
          required: true,
          default: "-",
          description: "모달 열림/닫힘 상태",
        },
        {
          name: "onClose",
          type: "() => void",
          required: true,
          default: "-",
          description: "모달 닫기 함수",
        },
        {
          name: "title",
          type: "string",
          required: true,
          default: "-",
          description: "모달 제목",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          default: "-",
          description: "모달 본문 내용",
        },
        {
          name: "footer",
          type: "ReactNode",
          required: false,
          default: "-",
          description: "모달 하단 영역",
        },
        {
          name: "size",
          type: "'sm' | 'md' | 'lg' | 'xl'",
          required: false,
          default: "'md'",
          description: "모달 크기",
        },
        {
          name: "width",
          type: "number",
          required: false,
          default: "-",
          description: "커스텀 너비 (size 대신 사용)",
        },
        {
          name: "maxHeight",
          type: "number",
          required: false,
          default: "-",
          description: "커스텀 최대 높이",
        },
      ],
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
    PageHeader: {
      title: "PageHeader",
      description: "PageHeader 컴포넌트입니다. (Figma 디자인 기반)",
      props: [
        {
          name: "title",
          type: "string",
          required: true,
          default: "-",
          description: "페이지 제목",
        },
        {
          name: "subtitle",
          type: "string",
          required: false,
          default: "-",
          description: "페이지 부제목",
        },
        {
          name: "onExpandAll",
          type: "(isExpanded: boolean) => void",
          required: false,
          default: "-",
          description: "전체 펼침/접기 핸들러",
        },
      ],
      preview: (
        <div className="space-y-4">
          <PageHeader
            title="공통설정"
            subtitle="실시간 성능 지표 및 상태 모니터링"
            onExpandAll={handleExpandAll}
          />
        </div>
      ),
      code: `import PageHeader from "../components/PageHeader";

const MyPage = () => {
  const handleExpandAll = (isExpanded) => {
    console.log("전체 펼침/접기:", isExpanded);
  };

  return <PageHeader title="페이지 제목" onExpandAll={handleExpandAll} />;
};`,
    },
    Table: {
      title: "Table",
      description: "Table 컴포넌트입니다. (Figma 디자인 기반)",
      props: [
        {
          name: "columns",
          type: "Array<Column>",
          required: true,
          default: "-",
          description: "테이블 컬럼 정의 배열",
        },
        {
          name: "data",
          type: "Array<any>",
          required: true,
          default: "-",
          description: "테이블 데이터 배열",
        },
        {
          name: "topActions",
          type: "Object",
          required: false,
          default: "-",
          description: "상단 액션 영역 (leftText, rightButtons)",
        },
        {
          name: "bottomActions",
          type: "Object",
          required: false,
          default: "-",
          description: "하단 액션 영역 (onDeleteSelected, onDeleteAll)",
        },
        {
          name: "pagination",
          type: "Object",
          required: false,
          default: "-",
          description: "페이지네이션 설정",
        },
        {
          name: "selectable",
          type: "boolean",
          required: false,
          default: "false",
          description: "행 선택 가능 여부",
        },
        {
          name: "onSelectionChange",
          type: "(selected: Set) => void",
          required: false,
          default: "-",
          description: "선택 변경 핸들러",
        },
        {
          name: "emptyMessage",
          type: "string",
          required: false,
          default: "'데이터가 없습니다'",
          description: "데이터 없을 때 메시지",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          <Table
            columns={columns}
            data={data}
            topActions={{
              leftText: `검색결과 ${data.length}건`,
              rightButtons: [
                {
                  variant: "secondary",
                  size: "medium",
                  title: "다운로드",
                  onClick: () => alert("다운로드"),
                },
              ],
            }}
            bottomActions={{
              onDeleteSelected: (selectedIndexes) => {
                console.log("선택 삭제:", selectedIndexes);
              },
              onDeleteAll: () => {
                console.log("일괄 삭제");
              },
            }}
            pagination={{
              enabled: true,
              currentPage: 1,
              totalPages: 5,
              pageSize: 10,
              pageSizeOptions: [10, 20, 50, 100],
              onPageChange: (page) => console.log("페이지:", page),
              onPageSizeChange: (size) => console.log("페이지 크기:", size),
            }}
            selectable={true}
            onSelectionChange={(selected) => console.log("선택:", selected)}
          />
        </div>
      ),
      code: `import Table from "../components/Table";
import Button from "../components/Button";

const MyPage = () => {
  const handleExpandAll = (isExpanded) => {
    console.log("전체 펼침/접기:", isExpanded);
  };

  return (
  <Table
  columns={columns}
  data={data}
  topActions={{
    leftText: "검색결과 2건",
    rightButtons: [
      {
        variant: "secondary",
        size: "medium",
        title: "다운로드",
        onClick: () => alert("다운로드"),
      },
    ],
  }}
  bottomActions={{
    onDeleteSelected: (selectedIndexes) => {
      console.log("선택 삭제:", selectedIndexes);
    },
    onDeleteAll: () => {
      console.log("일괄 삭제");
    },
  }}
  pagination={{
    enabled: true,
    currentPage: 1,
    totalPages: 5,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    onPageChange: (page) => console.log("페이지:", page),
    onPageSizeChange: (size) => console.log("페이지 크기:", size),
  }}
  selectable={true}
  onSelectionChange={(selected) => console.log("선택:", selected)}
/>);
};`,
    },
    TableHeader: {
      title: "TableHeader",
      description:
        "테이블 상단 영역 컴포넌트입니다. 검색 결과 표시와 액션 버튼을 포함합니다.",
      props: [
        {
          name: "count",
          type: "number",
          required: false,
          default: "-",
          description: "검색 결과 개수",
        },
        {
          name: "countText",
          type: "string",
          required: false,
          default: "'검색결과'",
          description: "개수 텍스트",
        },
        {
          name: "countUnit",
          type: "string",
          required: false,
          default: "'건'",
          description: "개수 단위",
        },
        {
          name: "rightButtons",
          type: "Array",
          required: false,
          default: "-",
          description: "우측 버튼 배열 (Button 컴포넌트 props)",
        },
        {
          name: "customLeft",
          type: "ReactNode",
          required: false,
          default: "-",
          description: "커스텀 왼쪽 컨텐츠 (count 대신 사용)",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          {/* 기본 사용 */}
          <TableHeader count={23} />

          {/* 버튼 포함 */}
          <TableHeader count={45} countText="전체" />

          {/* 커스텀 왼쪽 컨텐츠 */}
          <TableHeader
            count={45}
            countText="전체"
            customLeft={<span className="text-red-500">경고: 3개 항목</span>}
          />
        </div>
      ),
      code: `import TableHeader from "../components/TableHeader";

const MyPage = () => {
    return (
    <>
      {/* 기본 사용 */}
      <TableHeader count={23} />

      {/* 버튼 포함 */}
      <TableHeader count={45} countText="전체" />

      {/* 커스텀 왼쪽 컨텐츠 */}
      <TableHeader
        customLeft={<span className="text-red-500">경고: 3개 항목</span>}
      />
    </>
  );
};`,
    },
    Pagination: {
      title: "Pagination",
      description:
        "테이블 상단 영역 컴포넌트입니다. 검색 결과 표시와 액션 버튼을 포함합니다.",
      props: [
        {
          name: "currentPage",
          type: "number",
          required: true,
          default: "1",
          description: "현재 페이지 (1부터 시작)",
        },
        {
          name: "totalPages",
          type: "number",
          required: true,
          default: "1",
          description: "전체 페이지 수",
        },
        {
          name: "pageSize",
          type: "number",
          required: false,
          default: "10",
          description: "페이지당 항목 수",
        },
        {
          name: "pageSizeOptions",
          type: "Array<number>",
          required: false,
          default: "[10, 20, 50, 100]",
          description: "페이지 크기 옵션 배열",
        },
        {
          name: "onPageChange",
          type: "(page: number) => void",
          required: true,
          default: "-",
          description: "페이지 변경 핸들러",
        },
        {
          name: "onPageSizeChange",
          type: "(size: number) => void",
          required: false,
          default: "-",
          description: "페이지 크기 변경 핸들러",
        },
        {
          name: "showPageSizeSelector",
          type: "boolean",
          required: false,
          default: "true",
          description: "페이지 크기 선택기 표시 여부",
        },
        {
          name: "pageSizeLabel",
          type: "string",
          required: false,
          default: "'페이지당 표시'",
          description: "페이지 크기 레이블",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          {/* 기본 사용 */}
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />

          {/* 페이지 크기 선택기 숨김 */}
          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
            showPageSizeSelector={false}
          />

          {/* 커스텀 옵션 */}
          <Pagination
            currentPage={currentPage}
            totalPages={20}
            pageSize={pageSize}
            pageSizeOptions={[5, 10, 25, 50]}
            pageSizeLabel="항목 수"
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      ),
      code: `mport { useState } from "react";
import Pagination from "../components/Pagination";


const MyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
    return (
    <>
      {/* 기본 사용 */}
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />

      {/* 페이지 크기 선택기 숨김 */}
      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={setCurrentPage}
        showPageSizeSelector={false}
      />

      {/* 커스텀 옵션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={20}
        pageSize={pageSize}
        pageSizeOptions={[5, 10, 25, 50]}
        pageSizeLabel="항목 수"
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </>
  );
};`,
    },
    Chart: {
      title: "Chart",
      description:
        "Chart.js를 사용하여 다양한 타입의 차트를 렌더링하는 컴포넌트입니다.",
      props: [
        {
          name: "type",
          type: "'line' | 'bar' | 'doughnut' | 'pie'",
          required: false,
          default: "'line'",
          description: "차트 타입",
        },
        {
          name: "data",
          type: "Object",
          required: true,
          default: "-",
          description: "Chart.js 데이터 객체 (labels, datasets 포함)",
        },
        {
          name: "options",
          type: "Object",
          required: false,
          default: "-",
          description: "Chart.js 옵션 객체",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          <div style={{ height: "400px" }}>
            <Chart type="line" data={chartData} />
          </div>
        </div>
      ),
      code: `import Chart from "../components/Chart";

**지원하는 차트 타입:**

- line: 선차트
- bar: 막대차트
- doughnut: 도넛차트
- pie: 파이차트

const MyPage = () => {
  const chartData = {
    labels: ["1월", "2월", "3월", "4월", "5월"],
    datasets: [
      {
        label: "데이터셋 1",
        data: [65, 59, 80, 81, 56],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };
  return (
   <div style={{ height: "400px" }}>
      <Chart type="line" data={chartData} />
    </div>
  );
};`,
    },
    ChartCard: {
      title: "ChartCard",
      description:
        "모니터링 차트를 표시하는 카드 컴포넌트입니다. Chip, Select, Chart 컴포넌트를 조합하여 완전한 차트 UI를 제공합니다.",
      props: [
        {
          name: "chipLabel",
          type: "string",
          required: true,
          default: "-",
          description: "칩 라벨 (예: 'STT', 'TTS')",
        },
        {
          name: "chipVariant",
          type: "'primary' | 'secondary' | 'tertiary'",
          required: true,
          default: "-",
          description: "칩 스타일 variant",
        },
        {
          name: "title",
          type: "string",
          required: true,
          default: "-",
          description: "차트 제목",
        },
        {
          name: "errorMessage",
          type: "string",
          required: false,
          default: "-",
          description: "에러/경고 메시지",
        },
        {
          name: "chartType",
          type: "'line' | 'bar' | 'doughnut' | 'pie'",
          required: false,
          default: "'line'",
          description: "차트 타입",
        },
        {
          name: "chartData",
          type: "Object",
          required: true,
          default: "-",
          description: "Chart.js 데이터 객체",
        },
        {
          name: "chartOptions",
          type: "Object",
          required: false,
          default: "-",
          description: "Chart.js 옵션 객체",
        },
        {
          name: "onChartTypeChange",
          type: "(type: string) => void",
          required: false,
          default: "-",
          description: "차트 타입 변경 핸들러",
        },
        {
          name: "onVisibilityToggle",
          type: "() => void",
          required: false,
          default: "-",
          description: "표시/숨김 토글 핸들러",
        },
        {
          name: "onSettings",
          type: "() => void",
          required: false,
          default: "-",
          description: "설정 버튼 클릭 핸들러",
        },
        {
          name: "showControls",
          type: "boolean",
          required: false,
          default: "true",
          description: "컨트롤 버튼 표시 여부",
        },
        {
          name: "borderColor",
          type: "string",
          required: false,
          default: "'#5090f7'",
          description: "카드 테두리 색상",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          {/* 기본 사용 */}
          <ChartCard
            chipLabel="STT"
            chipVariant="primary"
            title="CPU 사용률"
            chartType="line"
            chartData={chartData}
            onChartTypeChange={(type) => console.log("차트 타입 변경:", type)}
            onVisibilityToggle={() => console.log("표시/숨김 토글")}
            onSettings={() => console.log("설정 열기")}
            onSelectSettings={() => {}}
            onChartSettings={() => {}}
          />

          {/* 에러 메시지가 있는 차트 */}
          <ChartCard
            chipLabel="TTS"
            chipVariant="secondary"
            title="메모리 사용량"
            errorMessage="서버를 개별로 차트에서 노출 또는 비노출 할 수 있습니다."
            chartType="line"
            chartData={chartData}
            borderColor="#5090f7"
          />

          {/* 컨트롤 없는 차트 */}
          <ChartCard
            chipLabel="SV"
            chipVariant="tertiary"
            title="작업 상태 분포"
            chartType="doughnut"
            chartData={charCardtData}
            showControls={false}
            borderColor="#a855f7"
          />
        </div>
      ),
      code: `import ChartCard from "../components/ChartCard";

**지원하는 차트 타입:**

- line: 선차트
- bar: 막대차트
- doughnut: 도넛차트
- pie: 파이차트

const MyPage = () => {
  const chardCardData = {
    labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00"],
    datasets: [
      {
        label: "c-pod-001",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "c-pod-002",
        data: [28, 48, 40, 19, 86, 27],
        borderColor: "#5090f7",
        backgroundColor: "rgba(80, 144, 247, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };
  return (
    <>
      {/* 기본 사용 */}
        <ChartCard
          chipLabel="STT"
          chipVariant="primary"
          title="CPU 사용률"
          chartType="line"
          chartData={chartData}
          onChartTypeChange={(type) => console.log("차트 타입 변경:", type)}
          onVisibilityToggle={() => console.log("표시/숨김 토글")}
          onSettings={() => console.log("설정 열기")}
          onSelectSettings={() => {}}
          onChartSettings={() => {}}
        />

        {/* 에러 메시지가 있는 차트 */}
        <ChartCard
          chipLabel="TTS"
          chipVariant="secondary"
          title="메모리 사용량"
          errorMessage="서버를 개별로 차트에서 노출 또는 비노출 할 수 있습니다."
          chartType="line"
          chartData={chartData}
          borderColor="#5090f7"
        />

        {/* 컨트롤 없는 차트 */}
        <ChartCard
          chipLabel="SV"
          chipVariant="tertiary"
          title="작업 상태 분포"
          chartType="doughnut"
          chartData={charCardtData}
          showControls={false}
          borderColor="#a855f7"
        />
    </>
  );
};`,
    },
    SearchFilter: {
      title: "SearchFilter",
      description:
        "검색 필터 영역 공통 컨테이너 컴포넌트입니다. (Figma 디자인 기반)",
      props: [
        {
          name: "children",
          type: "ReactNode",
          required: true,
          default: "-",
          description:
            "필터 구성 요소들 (RadioGroup, Select, DateRangePicker 등)",
        },
        {
          name: "onSearch",
          type: "() => void",
          required: true,
          default: "-",
          description: "검색 버튼 클릭 핸들러",
        },
        {
          name: "searchButtonText",
          type: "string",
          required: false,
          default: "'검색'",
          description: "검색 버튼 텍스트",
        },
        {
          name: "showSearchButton",
          type: "boolean",
          required: false,
          default: "true",
          description: "검색 버튼 표시 여부",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          <SearchFilter onSearch={() => alert("검색!")}>
            <div className="flex-none w-60">
              <RadioGroup
                name="searchFilterType"
                options={[
                  { value: "serviceModel", label: "서비스 모델" },
                  { value: "customerCode", label: "고객 코드" },
                ]}
                value={searchFilterType}
                onChange={setSearchFilterType}
                className="mb-2"
              />
              <Select
                value={searchSelectValue}
                onChange={(e) => setSearchSelectValue(e.target.value)}
                options={[
                  { value: "", label: "전체" },
                  { value: "model1", label: "모델 1" },
                ]}
                placeholder="전체"
                bgColor="#ffffff"
              />
            </div>
            <DateRangePicker
              label="조회기간"
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              className="flex-1"
            />
          </SearchFilter>
        </div>
      ),
      code: `import { useState } from "react";
import SearchFilter from "../components/SearchFilter";
import RadioGroup from "../components/RadioGroup";
import Select from "../components/Select";
import DateRangePicker from "../components/DateRangePicker";

const MyPage = () => {
  const [filterType, setFilterType] = useState("serviceModel");
  const [selectedValue, setSelectedValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSearch = () => {
    console.log("검색:", { filterType, selectedValue, startDate, endDate });
  };

  return (
    <SearchFilter onSearch={handleSearch}>
      <div className="flex-none w-60">
        <RadioGroup
          name="filterType"
          options={[
            { value: "serviceModel", label: "서비스 모델" },
            { value: "customerCode", label: "고객 코드" },
          ]}
          value={filterType}
          onChange={setFilterType}
          className="mb-2"
        />
        <Select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          options={[
            { value: "", label: "전체" },
            { value: "model1", label: "모델 1" },
          ]}
          placeholder="전체"
        />
      </div>
      <DateRangePicker
        label="조회기간"
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        className="flex-1"
      />
    </SearchFilter>
  );
};`,
    },
    Dropdown: {
      title: "Dropdown",
      description: "범용 드롭다운 메뉴 컴포넌트입니다.",
      props: [
        {
          name: "items",
          type: "Array",
          required: true,
          default: "-",
          description: "드롭다운 항목 배열 (단순 또는 그룹화)",
        },
        {
          name: "selectedValue",
          type: "string",
          required: true,
          default: "-",
          description: "현재 선택된 값",
        },
        {
          name: "onSelect",
          type: "(value: string) => void",
          required: true,
          default: "-",
          description: "항목 선택 시 호출되는 콜백 함수",
        },
        {
          name: "triggerLabel",
          type: "string",
          required: false,
          default: "-",
          description: "트리거 버튼 텍스트 (없으면 selectedValue 사용)",
        },
        {
          name: "grouped",
          type: "boolean",
          required: false,
          default: "false",
          description: "그룹화된 항목 여부",
        },
        {
          name: "align",
          type: "'left' | 'right'",
          required: false,
          default: "'left'",
          description: "드롭다운 메뉴 정렬",
        },
        {
          name: "disabled",
          type: "boolean",
          required: false,
          default: "false",
          description: "비활성화 여부",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <span className="text-sm">단순 항목:</span>
            <Dropdown
              items={[
                { value: "5min", label: "실시간 5분" },
                { value: "10min", label: "실시간 10분" },
                { value: "1hour", label: "실시간 1시간" },
              ]}
              selectedValue="5min"
              onSelect={(value) => console.log("선택:", value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-sm">그룹화된 항목:</span>
            <Dropdown
              items={[
                { group: "빠른 선택", items: ["최근 5분", "최근 10분"] },
                {
                  group: "시간 단위",
                  items: ["최근 1시간", "최근 3시간", "최근 1일"],
                },
              ]}
              selectedValue={dropdownValue}
              onSelect={setDropdownValue}
              grouped={true}
            />
          </div>
        </div>
      ),
      code: `import { useState } from "react";
import Dropdown from "../components/Dropdown";

const MyPage = () => {
  const [selectedTime, setSelectedTime] = useState("5min");
  const [selectedPreset, setSelectedPreset] = useState("최근 1시간");

  // 단순 항목
  const timeOptions = [
    { value: "5min", label: "실시간 5분" },
    { value: "10min", label: "실시간 10분" },
    { value: "1hour", label: "실시간 1시간" },
  ];

  // 그룹화된 항목
  const presetOptions = [
    { group: "빠른 선택", items: ["최근 5분", "최근 10분"] },
    { group: "시간 단위", items: ["최근 1시간", "최근 3시간", "최근 1일"] },
    { group: "일 단위", items: ["오늘(00~24시)", "어제(00~24시)"] },
  ];

  return (
    <>
      {/* 기본 드롭다운 */}
      <Dropdown
        items={timeOptions}
        selectedValue={selectedTime}
        onSelect={setSelectedTime}
      />

      {/* 그룹화된 드롭다운 */}
      <Dropdown
        items={presetOptions}
        selectedValue={selectedPreset}
        onSelect={setSelectedPreset}
        grouped={true}
        align="right"
      />
    </>
  );
};`,
    },
    SettingRow: {
      title: "SettingRow",
      description:
        "설정 항목의 레이아웃을 위한 공통 컴포넌트입니다. 왼쪽에 타이틀, 오른쪽에 컨트롤 요소를 배치합니다.",
      props: [
        {
          name: "title",
          type: "string",
          required: true,
          default: "-",
          description: "설정 항목 제목",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          default: "-",
          description: "오른쪽에 표시될 컨트롤 요소",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          <SettingRow title="자동 저장">
            <Toggle
              checked={settingToggle}
              onChange={setSettingToggle}
              label="활성화"
            />
          </SettingRow>
          <SettingRow title="서버 주소">
            <Input value="localhost:3000" onChange={() => {}} />
          </SettingRow>
        </div>
      ),
      code: `import SettingRow from "../components/SettingRow";
import Toggle from "../components/Toggle";
import Input from "../components/Input";

const MyPage = () => {
  return (
    <>
      {/* Toggle 컨트롤 */}
      <SettingRow title="자동 저장">
        <Toggle checked={true} onChange={() => {}} />
      </SettingRow>

      {/* Input 컨트롤 */}
      <SettingRow title="서버 주소">
        <Input value="localhost:3000" onChange={() => {}} />
      </SettingRow>
    </>
  );
};`,
    },
    ServiceModelRow: {
      title: "ServiceModelRow",
      description:
        "서비스 모델별 삭제 대상을 표시하는 행 컴포넌트입니다. 모델 라벨과 체크박스들을 포함합니다.",
      props: [
        {
          name: "label",
          type: "string",
          required: true,
          default: "-",
          description: "모델 라벨 (예:콜봇, 챗봇, 상담모델)",
        },
        {
          name: "checkboxes",
          type: "array",
          required: true,
          default: "-",
          description:
            "체크박스 배열 `[{ label, checked, onChange, disabled }, ...]",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],

      preview: (
        <div className="space-y-4">
          <ServiceModelRow
            label="콜봇"
            checkboxes={[
              {
                label: "요청 데이터",
                checked: callbotChecks.request,
                onChange: (val) =>
                  setCallbotChecks({ ...callbotChecks, request: val }),
              },
              {
                label: "오류 데이터",
                checked: callbotChecks.error,
                onChange: (val) =>
                  setCallbotChecks({ ...callbotChecks, error: val }),
              },
              {
                label: "통계 데이터",
                checked: callbotChecks.statistics,
                onChange: (val) =>
                  setCallbotChecks({ ...callbotChecks, statistics: val }),
              },
            ]}
          />
        </div>
      ),
      code: `import { useState } from "react";
import ServiceModelRow from "../components/ServiceModelRow";

const MyPage = () => {
  const [callbotChecks, setCallbotChecks] = useState({
    request: true,
    error: false,
    statistics: true,
  });

  return (
    <ServiceModelRow
      label="콜봇"
      checkboxes={[
        {
          label: "요청 데이터",
          checked: callbotChecks.request,
          onChange: (val) =>
            setCallbotChecks({ ...callbotChecks, request: val }),
        },
        {
          label: "오류 데이터",
          checked: callbotChecks.error,
          onChange: (val) =>
            setCallbotChecks({ ...callbotChecks, error: val }),
        },
        {
          label: "통계 데이터",
          checked: callbotChecks.statistics,
          onChange: (val) =>
            setCallbotChecks({ ...callbotChecks, statistics: val }),
        },
      ]}
    />
  );
};`,
    },

    RealtimeStatusIndicator: {
      title: "RealtimeStatusIndicator",
      description: "실시간 모니터링 상태를 표시하는 컴포넌트입니다.",
      props: [
        {
          name: "isActive",
          type: "boolean",
          required: false,
          default: "false",
          description: "실시간 활성화 여부",
        },
        {
          name: "statusText",
          type: "string",
          required: false,
          default: "'실시간 감시중'",
          description: "상태 텍스트",
        },
        {
          name: "time",
          type: "string",
          required: false,
          default: "-",
          description: "시간 표시 (예: '15:07:32')",
        },
        {
          name: "badgeText",
          type: "string",
          required: false,
          default: "-",
          description: "배지 텍스트 (예: '실시간 5분')",
        },
        {
          name: "onBadgeClick",
          type: "() => void",
          required: false,
          default: "-",
          description: "배지 클릭 핸들러",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          <RealtimeStatusIndicator
            isActive={true}
            statusText="실시간 감시중"
            time="15:07:32"
            badgeText="실시간 5분"
            onBadgeClick={() => console.log("배지 클릭")}
          />
          <RealtimeStatusIndicator
            isActive={true}
            statusText="데이터 수집 중"
            time="12:34:56"
          />
          <RealtimeStatusIndicator
            isActive={false}
            statusText="모니터링 중지됨"
          />
        </div>
      ),
      code: `import { useState, useEffect } from "react";
import RealtimeStatusIndicator from "../components/RealtimeStatusIndicator";

const MyPage = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toTimeString().slice(0, 8);
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <RealtimeStatusIndicator
        isActive={true}
        statusText="실시간 감시중"
        time={currentTime}
        badgeText="실시간 5분"
        onBadgeClick={() => console.log("배지 클릭")}
      />
      
      <RealtimeStatusIndicator
        isActive={false}
        statusText="모니터링 중지됨"
      />
    </>
  );
};`,
    },
    DashboardSection: {
      title: "DashboardSection",
      description:
        "대시보드 섹션 전체를 표시하는 컴포넌트입니다. 헤더와 리스트를 포함합니다.",
      props: [
        {
          name: "icon",
          type: "ReactNode",
          required: true,
          default: "-",
          description: "섹션 아이콘",
        },
        {
          name: "title",
          type: "string",
          required: true,
          default: "-",
          description: "섹션 제목",
        },
        {
          name: "count",
          type: "number",
          required: true,
          default: "-",
          description: "항목 개수",
        },
        {
          name: "items",
          type: "Array",
          required: true,
          default: "-",
          description: "대시보드 아이템 목록",
        },
        {
          name: "selectedItems",
          type: "Array<string>",
          required: true,
          default: "-",
          description: "선택된 아이템 ID 목록",
        },
        {
          name: "onCheck",
          type: "(id: string, value: boolean) => void",
          required: true,
          default: "-",
          description: "체크박스 변경 핸들러",
        },
        {
          name: "onEdit",
          type: "(id: string) => void",
          required: true,
          default: "-",
          description: "편집 버튼 클릭 핸들러",
        },
        {
          name: "onStar",
          type: "(id: string) => void",
          required: true,
          default: "-",
          description: "즐겨찾기 버튼 클릭 핸들러",
        },
        {
          name: "onAddNew",
          type: "() => void",
          required: false,
          default: "-",
          description: "새 대시보드 추가 핸들러",
        },
        {
          name: "showWarning",
          type: "boolean",
          required: false,
          default: "false",
          description: "경고 메시지 표시 여부",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          <DashboardSection
            icon={<span>A</span>}
            title="관리자 대시보드"
            count={7}
            items={[
              {
                id: "dashboard-1",
                title: "대시보드1 - 시스템 전체 모니터링",
                description: "시스템의 전체적인 상태를 모니터링합니다.",
                isDefault: true,
              },
              {
                id: "dashboard-2",
                title: "대시보드2 - 성능 모니터링",
                description: "CPU, 메모리 등 성능 지표를 추적합니다.",
                isDefault: false,
              },
            ]}
            selectedItems={selectedDashboards}
            onCheck={(id, value) => {
              if (value) {
                setSelectedDashboards([...selectedDashboards, id]);
              } else {
                setSelectedDashboards(
                  selectedDashboards.filter((item) => item !== id)
                );
              }
            }}
            onEdit={(id) => console.log("편집:", id)}
            onStar={(id) => console.log("즐겨찾기:", id)}
            onAddNew={() => console.log("새 대시보드 추가")}
          />
        </div>
      ),
      code: `import DashboardSection from "../components/DashboardSection";

const MyPage = () => {
  const [selectedItems, setSelectedItems] = useState(["dashboard-1"]);
  
  const dashboards = [
    {
      id: "dashboard-1",
      title: "대시보드1 - 시스템 전체 모니터링",
      description: "시스템의 전체적인 상태를 모니터링합니다.",
      isDefault: true,
    },
    {
      id: "dashboard-2",
      title: "대시보드2 - 성능 모니터링",
      description: "CPU, 메모리 등 성능 지표를 추적합니다.",
      isDefault: false,
    },
  ];

  return (
    <DashboardSection
      icon={<span>A</span>}
      title="관리자 대시보드"
      count={7}
      items={dashboards}
      selectedItems={selectedItems}
      onCheck={(id, value) => {
        if (value) {
          setSelectedItems([...selectedItems, id]);
        } else {
          setSelectedItems(selectedItems.filter((item) => item !== id));
        }
      }}
      onEdit={(id) => console.log("편집:", id)}
      onStar={(id) => console.log("즐겨찾기:", id)}
      onAddNew={() => console.log("새 대시보드 추가")}
    />
  );
};`,
    },
    DashboardSectionHeader: {
      title: "DashboardSectionHeader",
      description: "대시보드 섹션의 헤더를 표시하는 컴포넌트입니다.",
      props: [
        {
          name: "icon",
          type: "ReactNode",
          required: true,
          default: "-",
          description: "섹션 아이콘",
        },
        {
          name: "title",
          type: "string",
          required: true,
          default: "-",
          description: "섹션 제목",
        },
        {
          name: "count",
          type: "string | number",
          required: true,
          default: "-",
          description: "항목 개수",
        },
        {
          name: "showWarning",
          type: "boolean",
          required: false,
          default: "false",
          description: "경고 메시지 표시 여부",
        },
        {
          name: "warningText",
          type: "string",
          required: false,
          default: "-",
          description: "경고 메시지 텍스트",
        },
        {
          name: "onAddNew",
          type: "() => void",
          required: true,
          default: "-",
          description: "새 항목 추가 버튼 클릭 핸들러",
        },
        {
          name: "addNewText",
          type: "string",
          required: false,
          default: "'새 대시보드'",
          description: "새 항목 추가 버튼 텍스트",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          <DashboardSectionHeader
            icon={<span>A</span>}
            title="관리자 대시보드"
            count={7}
            onAddNew={() => console.log("새 대시보드 추가")}
          />
          <DashboardSectionHeader
            icon={<span>P</span>}
            title="개인 대시보드"
            count={3}
            showWarning={true}
            warningText="최대 10개까지 생성 가능합니다."
            onAddNew={() => console.log("새 대시보드 추가")}
          />
        </div>
      ),
      code: `import DashboardSectionHeader from "../components/DashboardSectionHeader";

const MyPage = () => {
  return (
    <>
      <DashboardSectionHeader
        icon={<span>A</span>}
        title="관리자 대시보드"
        count={7}
        onAddNew={() => console.log("새 대시보드 추가")}
      />
      
      <DashboardSectionHeader
        icon={<span>P</span>}
        title="개인 대시보드"
        count={3}
        showWarning={true}
        warningText="최대 10개까지 생성 가능합니다."
        onAddNew={() => console.log("새 대시보드 추가")}
      />
    </>
  );
};`,
    },
    DashboardListItem: {
      title: "DashboardListItem",
      description: "대시보드 리스트의 개별 아이템을 표시하는 컴포넌트입니다.",
      props: [
        {
          name: "id",
          type: "string",
          required: true,
          default: "-",
          description: "아이템 ID",
        },
        {
          name: "title",
          type: "string",
          required: true,
          default: "-",
          description: "대시보드 제목",
        },
        {
          name: "description",
          type: "string",
          required: true,
          default: "-",
          description: "대시보드 설명",
        },
        {
          name: "checked",
          type: "boolean",
          required: false,
          default: "false",
          description: "체크 상태",
        },
        {
          name: "isDefault",
          type: "boolean",
          required: false,
          default: "false",
          description: "기본 대시보드 여부",
        },
        {
          name: "onCheck",
          type: "(id: string, value: boolean) => void",
          required: true,
          default: "-",
          description: "체크박스 변경 핸들러",
        },
        {
          name: "onEdit",
          type: "(id: string) => void",
          required: true,
          default: "-",
          description: "편집 버튼 클릭 핸들러",
        },
        {
          name: "onStar",
          type: "(id: string) => void",
          required: true,
          default: "-",
          description: "즐겨찾기 버튼 클릭 핸들러",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          <DashboardListItem
            id="dashboard-1"
            title="대시보드1 - 시스템 전체 모니터링"
            description="시스템의 전체적인 상태를 모니터링합니다."
            checked={true}
            isDefault={true}
            onCheck={(id, value) => console.log(id, value)}
            onEdit={(id) => console.log("편집:", id)}
            onStar={(id) => console.log("즐겨찾기:", id)}
          />
          <DashboardListItem
            id="dashboard-2"
            title="대시보드2 - 성능 모니터링"
            description="CPU, 메모리 등 성능 지표를 추적합니다."
            checked={false}
            isDefault={false}
            onCheck={(id, value) => console.log(id, value)}
            onEdit={(id) => console.log("편집:", id)}
            onStar={(id) => console.log("즐겨찾기:", id)}
          />
        </div>
      ),
      code: `import DashboardListItem from "../components/DashboardListItem";

const MyPage = () => {
  return (
    <>
      {/* 기본 대시보드 */}
      <DashboardListItem
        id="dashboard-1"
        title="대시보드1 - 시스템 전체 모니터링"
        description="시스템의 전체적인 상태를 모니터링합니다."
        checked={true}
        isDefault={true}
        onCheck={(id, value) => console.log(id, value)}
        onEdit={(id) => console.log("편집:", id)}
        onStar={(id) => console.log("즐겨찾기:", id)}
      />

      {/* 일반 대시보드 */}
      <DashboardListItem
        id="dashboard-2"
        title="대시보드2 - 성능 모니터링"
        description="CPU, 메모리 등 성능 지표를 추적합니다."
        checked={false}
        isDefault={false}
        onCheck={(id, value) => console.log(id, value)}
        onEdit={(id) => console.log("편집:", id)}
        onStar={(id) => console.log("즐겨찾기:", id)}
      />
    </>
  );
};`,
    },
    DashboardForm: {
      title: "DashboardForm",
      description: "새 대시보드 생성 폼을 표시하는 컴포넌트입니다.",
      props: [
        {
          name: "isOpen",
          type: "boolean",
          required: false,
          default: "false",
          description: "폼 열림 상태",
        },
        {
          name: "onToggle",
          type: "() => void",
          required: true,
          default: "-",
          description: "폼 토글 핸들러",
        },
        {
          name: "onSubmit",
          type: "(formData: any) => void",
          required: true,
          default: "-",
          description: "제출 핸들러",
        },
        {
          name: "onReset",
          type: "() => void",
          required: true,
          default: "-",
          description: "초기화 핸들러",
        },
        {
          name: "children",
          type: "ReactNode",
          required: false,
          default: "-",
          description: "폼 내용",
        },
        {
          name: "className",
          type: "string",
          required: false,
          default: "-",
          description: "추가 CSS 클래스",
        },
      ],
      preview: (
        <div className="space-y-4">
          <DashboardForm
            isOpen={isFormOpen}
            onToggle={() => setIsFormOpen(!isFormOpen)}
            onSubmit={(formData) => {
              console.log("제출:", formData);
              alert("대시보드 생성: " + formData.name);
            }}
            onReset={() => console.log("초기화")}
          >
            <Input
              label="대시보드 이름"
              required
              value={""}
              onChange={() => {}}
              placeholder="대시보드 이름을 적어주세요."
            />
          </DashboardForm>
        </div>
      ),
      code: `import { useState } from "react";
import DashboardForm from "../components/DashboardForm";

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DashboardForm
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      onSubmit={(formData) => {
        console.log("제출:", formData);
        // API 호출 등
      }}
      onReset={() => console.log("초기화")}
    >
      <Input
        label="대시보드 이름"
        required
        value={""}
        onChange={(e) => {}}
        placeholder="대시보드 이름을 적어주세요."
      />
    </DashboardForm>
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

          {/* Props 설명 */}
          {currentExample.props && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Props
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        이름
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        타입
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        필수
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        기본값
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        설명
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentExample.props.map((prop, index) => (
                      <tr
                        key={prop.name}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-3 text-sm font-mono font-medium text-gray-900">
                          {prop.name}
                        </td>
                        <td className="px-4 py-3 text-sm font-mono text-gray-600">
                          {prop.type}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {prop.required ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                              필수
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                              선택
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm font-mono text-gray-600">
                          {prop.default}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 ">
                          {prop.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

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
