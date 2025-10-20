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
    AccordionCard: {
      title: "AccordionCard",
      description:
        "AccordionCard 컴포넌트입니다. - 펼침/접기 기능이 있는 카드입니다. (Figma 디자인 기반)",
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
    DateRangePicker: {
      title: "DateRangePicker",
      description: "DatePicker 컴포넌트입니다. (Figma 디자인 기반)",
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
**Props:**

- title: 카드 제목 (예: "STT", "TTS", "SV")
- children: 카드 내용 (주로 Chip 컴포넌트들)
- borderColor: 테두리 색상 (선택사항, 기본값: #22c55e)
- className: 추가 CSS 클래스 (선택사항)

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

**Props:**

- title: 카드 제목 (예: "STT", "TTS", "SV")
- children: 카드 내용 (주로 Chip 컴포넌트들)
- borderColor: 테두리 색상 (선택사항, 기본값: #22c55e)
- className: 추가 CSS 클래스 (선택사항)

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

 **Props:** 

 isOpen: 모달 열림/닫힘 상태 (boolean, 필수) 
 onClose: 모달 닫기 함수 (function, 필수) 
 title: 모달 제목 (string, 필수) 
 children: 모달 본문 내용 (ReactNode, 필수) 
 footer: 모달 하단 영역 (ReactNode, 선택사항) 
 size: 모달 크기 - 'sm', 'md', 'lg', 'xl' (기본값: 'md') 
 width: 커스텀 너비 (number, size 대신 사용 가능) 
 maxHeight: 커스텀 최대 높이 (number, size 대신 사용 가능) 

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

**Props:**

- columns (Array): 테이블 컬럼 정의 배열

  - key: (string): 데이터 키
  - label: (string): 컬럼 헤더 텍스트
  - width: (string): 컬럼 너비 (px 또는 CSS 값)
  - align: (string): 정렬 ("left" | "center" | "right")
  - render: (Function): 커스텀 렌더링 함수 (value, row, index) => ReactNode

- data: (Array): 테이블 데이터 배열

- topActions: (Object): 상단 액션 영역

  - leftText: (string): 왼쪽 텍스트 (예: "검색결과 23건")
  - rightButtons: (Array): 오른쪽 버튼 배열 (Button 컴포넌트 props)

- bottomActions: (Object): 하단 액션 영역

  - leftButtons: (Array): 왼쪽 버튼 배열 (Button 컴포넌트 props)
  - onDeleteSelected: (Function): 선택 삭제 핸들러 (selectedIndexes) => void
  - onDeleteAll: (Function): 일괄 삭제 핸들러 () => void

      - pagination: (Object): 페이지네이션 설정

  - enabled: (boolean): 페이지네이션 활성화 여부
  - currentPage: (number): 현재 페이지 (1부터 시작)
  - totalPages: (number): 전체 페이지 수
  - pageSize: (number): 페이지당 항목 수
  - pageSizeOptions: (Array): 페이지 크기 옵션 배열
  - onPageChange: (Function): 페이지 변경 핸들러 (page) => void
  - onPageSizeChange: (Function): 페이지 크기 변경 핸들러 (size) => void

- selectable: (boolean): 행 선택 가능 여부 (기본값: false)
- onSelectionChange: (Function): 선택 변경 핸들러 (selectedSet) => void
- emptyMessage: (string): 데이터 없을 때 메시지 (기본값: "데이터가 없습니다")
- className: (string): 추가 CSS 클래스

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
      title: "Pagination",
      description:
        "Chart.js를 사용하여 다양한 타입의 차트를 렌더링하는 컴포넌트입니다.",
      preview: (
        <div className="space-y-4">
          <div style={{ height: "400px" }}>
            <Chart type="line" data={chartData} />
          </div>
        </div>
      ),
      code: `import Chart from "../components/Chart";
**Props:**

- type: 차트 타입 ('line' | 'bar' | 'doughnut' | 'pie') (기본값: 'line')
- data: Chart.js 데이터 객체 (labels, datasets 포함)
- options: Chart.js 옵션 객체 (선택사항)
- className: 추가 CSS 클래스 (선택사항)

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
**Props:**

- chipLabel: 칩 라벨 (예: "STT", "TTS")
- chipVariant: 칩 스타일 ('primary' | 'secondary' | 'tertiary')
- title: 차트 제목 (예: "CPU 사용률")
- errorMessage: 에러/경고 메시지 (선택사항)
- chartType: 차트 타입 ('line' | 'bar' | 'doughnut' | 'pie') (기본값: 'line')
- chartData: Chart.js 데이터 객체
- chartOptions: Chart.js 옵션 객체 (선택사항)
- onChartTypeChange: 차트 타입 변경 핸들러 (선택사항)
- onVisibilityToggle: 표시/숨김 토글 핸들러 (선택사항)
- onSettings: 설정 버튼 클릭 핸들러 (선택사항)
- showControls: 컨트롤 버튼 표시 여부 (기본값: true)
- borderColor: 카드 테두리 색상 (선택사항, 기본값: #5090f7)
- className

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

**Props:**
- children: 필터 구성 요소들 (RadioGroup, Select, DateRangePicker 등)
- onSearch: 검색 버튼 클릭 핸들러 (필수)
- searchButtonText: 검색 버튼 텍스트 (기본값: "검색")
- showSearchButton: 검색 버튼 표시 여부 (기본값: true)
- className: 추가 CSS 클래스

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

**Props:**

- items: 드롭다운 항목 배열
  - 단순: [{ value: "5min", label: "실시간 5분" }]
  - 그룹화: [{ group: "시간 단위", items: ["최근 1시간", "최근 3시간"] }]
- selectedValue: 현재 선택된 값
- onSelect: 항목 선택 시 호출되는 콜백 함수
- triggerLabel: 트리거 버튼에 표시할 텍스트 (옵션, 없으면 selectedValue 사용)
- className: 추가 CSS 클래스 (옵션)
- disabled: 비활성화 여부 (옵션)
- grouped: 그룹화된 항목 여부 (기본값: false)
- align: 드롭다운 메뉴 정렬 - 'left' 또는 'right' (기본값: 'left')

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

**Props:**

- title: 설정 항목 제목 (string, 필수)
- children: 오른쪽에 표시될 컨트롤 요소 (ReactNode, 필수)
- className: 추가 CSS 클래스 (선택사항)

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

**Props:**

- label: 모델 라벨 (예: "콜봇", "챗봇", "상담모델")
- checkboxes: 체크박스 배열 [{ label, checked, onChange, disabled }, ...]
- className: 추가 CSS 클래스 (선택사항)

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

**Props:**

- isActive: 실시간 활성화 여부 (기본값: false)
- statusText: 상태 텍스트 (기본값: "실시간 감시중")
- time: 시간 표시 (예: "15:07:32")
- badgeText: 배지 텍스트 (예: "실시간 5분")
- onBadgeClick: 배지 클릭 핸들러 (옵션)
- className: 추가 CSS 클래스 (옵션)

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
**Props:**

- icon: 섹션 아이콘
- title: 섹션 제목
- count: 항목 개수
- showWarning: 경고 메시지 표시 여부 (기본값: false)
- warningText: 경고 메시지 텍스트
- onAddNew: 새 항목 추가 버튼 클릭 핸들러
- addNewText: 새 항목 추가 버튼 텍스트 (기본값: "새 대시보드")
- className: 추가 CSS 클래스

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

**Props:**

- id: 아이템 ID
- title: 대시보드 제목
- description: 대시보드 설명
- checked: 체크 상태 (기본값: false)
- isDefault: 기본 대시보드 여부 (기본값: false)
- onCheck: 체크박스 변경 핸들러
- onEdit: 편집 버튼 클릭 핸들러
- onStar: 즐겨찾기 버튼 클릭 핸들러
- className: 추가 CSS 클래스

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

**Props:**

- id: 아이템 ID
- title: 대시보드 제목
- description: 대시보드 설명
- checked: 체크 상태 (기본값: false)
- isDefault: 기본 대시보드 여부 (기본값: false)
- onCheck: 체크박스 변경 핸들러
- onEdit: 편집 버튼 클릭 핸들러
- onStar: 즐겨찾기 버튼 클릭 핸들러
- className: 추가 CSS 클래스

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
          />
        </div>
      ),
      code: `import { useState } from "react";
import DashboardForm from "../components/DashboardForm";

**Props:**

- isOpen: 폼 열림 상태 (기본값: false)
- onToggle: 폼 토글 핸들러
- onSubmit: 제출 핸들러
- onReset: 초기화 핸들러
- className: 추가 CSS 클래스


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
    />
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
