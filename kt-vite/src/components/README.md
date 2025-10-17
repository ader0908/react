# Components

재사용 가능한 컴포넌트들을 저장하는 폴더입니다.

## 규칙

- 각 컴포넌트는 독립적으로 작동해야 합니다
- Props를 통해 데이터를 받습니다
- UI 컴포넌트 (버튼, 카드, 폼 등)를 포함합니다

## 현재 컴포넌트

### Modal.jsx

팝업(모달) 공통 컴포넌트입니다. Figma 디자인 기반으로 제작되었습니다.

**주요 기능:**

- Header 영역 (제목, 닫기 버튼)
- Content 영역 (스크롤 가능, 커스텀 스크롤바)
- Footer 영역 (선택사항)
- 백드롭 클릭 시 닫기
- ESC 키로 닫기
- 애니메이션 효과 (페이드인, 슬라이드인)
- 반응형 대응

### DashboardSectionHeader.jsx

대시보드 섹션의 헤더를 표시하는 컴포넌트입니다.

**Props:**

- `icon` (React.ReactNode): 섹션 아이콘
- `title` (string): 섹션 제목
- `count` (string): 항목 개수
- `showWarning` (boolean): 경고 메시지 표시 여부 (기본값: false)
- `warningText` (string): 경고 메시지 텍스트
- `onAddNew` (Function): 새 항목 추가 버튼 클릭 핸들러
- `addNewText` (string): 새 항목 추가 버튼 텍스트 (기본값: "새 대시보드")
- `className` (string): 추가 CSS 클래스

**사용 예시:**

```jsx
<DashboardSectionHeader
  icon={<svg>...</svg>}
  title="관리자 대시보드"
  count={7}
  onAddNew={() => console.log("Add new")}
/>
```

### DashboardListItem.jsx

대시보드 리스트의 개별 아이템을 표시하는 컴포넌트입니다.

**Props:**

- `id` (string): 아이템 ID
- `title` (string): 대시보드 제목
- `description` (string): 대시보드 설명
- `checked` (boolean): 체크 상태 (기본값: false)
- `isDefault` (boolean): 기본 대시보드 여부 (기본값: false)
- `onCheck` (Function): 체크박스 변경 핸들러
- `onEdit` (Function): 편집 버튼 클릭 핸들러
- `onStar` (Function): 즐겨찾기 버튼 클릭 핸들러
- `className` (string): 추가 CSS 클래스

**특징:**

- 기본 대시보드(`isDefault={true}`)일 경우:
  - 체크박스가 숨겨집니다.
  - 편집/즐겨찾기 버튼 대신 오른쪽에 "기본 대시보드" 텍스트가 표시됩니다.
- 일반 대시보드일 경우:
  - 체크박스가 표시됩니다.
  - 편집/즐겨찾기 버튼이 오른쪽에 표시됩니다.
- 선택 상태에 따라 테두리 색상이 변경됩니다 (선택: `#2bb7b3`, 미선택: `#e4e7e7`).

**사용 예시:**

```jsx
<DashboardListItem
  id="dashboard-1"
  title="대시보드1 - 시스템 전체 모니터링"
  description="시스템의 전체적인 상태를 모니터링합니다."
  checked={true}
  isDefault={true}
  onCheck={(id, value) => console.log(id, value)}
  onEdit={(id) => console.log("Edit", id)}
  onStar={(id) => console.log("Star", id)}
/>
```

### DashboardSection.jsx

대시보드 섹션 전체를 표시하는 컴포넌트입니다. 헤더와 리스트를 포함합니다.

**Props:**

- `icon` (React.ReactNode): 섹션 아이콘
- `title` (string): 섹션 제목
- `count` (number): 항목 개수
- `items` (Array): 대시보드 아이템 목록
- `selectedItems` (Array): 선택된 아이템 ID 목록
- `onCheck` (Function): 체크박스 변경 핸들러
- `onEdit` (Function): 편집 버튼 클릭 핸들러
- `onStar` (Function): 즐겨찾기 버튼 클릭 핸들러
- `onAddNew` (Function): 새 대시보드 추가 핸들러 (선택사항)
- `showWarning` (boolean): 경고 메시지 표시 여부 (기본값: false)
- `className` (string): 추가 CSS 클래스

**사용 예시:**

```jsx
<DashboardSection
  icon={<svg>...</svg>}
  title="관리자 대시보드"
  count={7}
  items={dashboards}
  selectedItems={["dashboard-1", "dashboard-2"]}
  onCheck={(id, value) => console.log(id, value)}
  onEdit={(id) => console.log("Edit", id)}
  onStar={(id) => console.log("Star", id)}
  onAddNew={() => console.log("Add new")}
/>
```

**참고:** 내보내기, 가져오기, 삭제 등의 전역 액션 버튼은 모달 레벨에서 관리합니다.

### DashboardForm.jsx

새 대시보드 생성 폼을 표시하는 컴포넌트입니다.

**Props:**

- `isOpen` (boolean): 폼 열림 상태 (기본값: false)
- `onToggle` (Function): 폼 토글 핸들러
- `onSubmit` (Function): 제출 핸들러
- `onReset` (Function): 초기화 핸들러
- `className` (string): 추가 CSS 클래스

**사용 예시:**

```jsx
<DashboardForm
  isOpen={true}
  onToggle={() => setIsOpen(!isOpen)}
  onSubmit={(formData) => console.log(formData)}
  onReset={() => console.log("Reset")}
/>
```

### Layout.jsx

전체 페이지 레이아웃 컴포넌트입니다.

- Sidebar와 메인 컨텐츠 영역을 포함합니다
- 모든 페이지에서 공통으로 사용됩니다

```jsx
import Layout from "../components/Layout";

const MyPage = () => {
  return (
    <Layout>
      <div>페이지 내용</div>
    </Layout>
  );
};
```

### Sidebar.jsx

사이드바 네비게이션 메뉴 컴포넌트입니다.

- 앱 전환 (rapeech-cpod, rapeech-tts 등)
- 계층적 메뉴 구조
- 메뉴 확장/축소 기능
- 현재 선택된 메뉴 표시

**주요 기능:**

- 앱 선택
- 메뉴 확장/축소
- 서브메뉴 탐색
- 활성 메뉴 하이라이트

### Header.jsx

페이지 상단 헤더 컴포넌트입니다.

- Breadcrumb 네비게이션
- 사용자 정보 표시
- 현재 경로에 따른 동적 breadcrumb

### PageHeader.jsx

페이지 제목 헤더 컴포넌트입니다.

- 왼쪽 7px 굵은 빨간 테두리
- 페이지 제목 표시
- 전체 펼침/접기 버튼

```jsx
import PageHeader from "../components/PageHeader";

const MyPage = () => {
  const handleExpandAll = (isExpanded) => {
    console.log("전체 펼침/접기:", isExpanded);
  };

  return <PageHeader title="페이지 제목" onExpandAll={handleExpandAll} />;
};
```

### AccordionCard.jsx

아코디언 카드 컴포넌트 - 펼침/접기 기능이 있는 카드입니다.

- 왼쪽 빨간 막대와 제목
- 펼침/접기 기능 (아코디언)
- children으로 자유로운 콘텐츠 구성
- errorMessage prop으로 경고 메시지 표시 가능

**Props:**

- `title`: 카드 제목
- `errorMessage`: 제목 옆에 표시될 에러/경고 메시지 (선택사항)
- `children`: 카드 내용

```jsx
import AccordionCard from "../components/AccordionCard";

const MyPage = () => {
  return (
    <AccordionCard title="카드 제목">
      <div>카드 내용</div>
    </AccordionCard>
  );
};

// 에러 메시지가 있는 경우
const MyPageWithError = () => {
  return (
    <AccordionCard title="설정" errorMessage="설정을 불러오는데 실패했습니다.">
      <div>카드 내용</div>
    </AccordionCard>
  );
};
```

### Card.jsx

범용 카드 컴포넌트입니다. (Figma 디자인 기반)

- 헤더 영역 (타이틀, 왼쪽 인디케이터 바, 버튼 등)
- 본문 영역 (children)
- 선택적 Footer 영역
- 커스터마이징 가능한 인디케이터 색상

**Props:**

- `title`: 카드 제목 (옵션, 없으면 헤더 영역 표시 안 함)
- `showIndicator`: 왼쪽 바 표시 여부 (기본값: true)
- `indicatorColor`: 왼쪽 바 색상 (기본값: #ed1b23)
- `children`: 카드 본문 내용
- `headerActions`: 헤더 오른쪽에 표시할 버튼 등 (옵션)
- `footer`: 카드 하단 영역 (옵션)
- `className`: 추가 CSS 클래스 (옵션)

```jsx
import Card from "../components/Card";
import Button from "../components/Button";

const MyPage = () => {
  return (
    <>
      {/* 기본 카드 */}
      <Card title="기본 카드">
        <p>카드 내용이 여기에 들어갑니다.</p>
      </Card>

      {/* 인디케이터 색상 변경 */}
      <Card title="엔진 항목 선택" indicatorColor="#22c55e">
        <div className="space-y-2">
          <p>대시보드에 보여줄 카드를 선택하세요.</p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-green-500 text-white rounded">
              CPU
            </span>
            <span className="px-3 py-1 bg-green-500 text-white rounded">
              메모리
            </span>
          </div>
        </div>
      </Card>

      {/* 헤더에 버튼이 있는 카드 (title과 같은 줄) */}
      <Card
        title="설정 카드"
        headerActions={
          <div className="flex gap-2">
            <Button variant="secondary" size="small">
              되돌리기
            </Button>
            <Button variant="primary" size="small">
              저장
            </Button>
          </div>
        }
      >
        <div>설정 내용</div>
      </Card>

      {/* Footer가 있는 카드 */}
      <Card
        title="Footer 카드"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="outlined" size="small">
              취소
            </Button>
            <Button variant="primary" size="small">
              확인
            </Button>
          </div>
        }
      >
        <div>Footer 영역이 필요한 경우 사용</div>
      </Card>

      {/* 인디케이터 없는 카드 */}
      <Card title="인디케이터 없는 카드" showIndicator={false}>
        <p>왼쪽 바가 표시되지 않습니다.</p>
      </Card>

      {/* 타이틀 없는 카드 */}
      <Card>
        <p>헤더가 없는 카드입니다.</p>
      </Card>
    </>
  );
};
```

### SectionCard.jsx

AccordionCard의 content 영역에 사용되는 섹션 카드 컴포넌트입니다.

- 테두리가 있는 섹션 박스
- 상단 테두리 위에 겹쳐진 제목
- children으로 내부 콘텐츠 구성
- `flex-1`이 적용되어 flex 레이아웃에서 동일한 너비로 배치됨

**Props:**

- `title`: 섹션 제목 (예: "학습", "운영")
- `children`: 섹션 내용

```jsx
import AccordionCard from "../components/AccordionCard";
import SectionCard from "../components/SectionCard";

const MyPage = () => {
  return (
    <AccordionCard title="Agent 관련 설정">
      <div className="flex gap-6">
        <SectionCard title="학습">
          <div className="grid grid-cols-4 gap-4">{/* 입력 필드들 */}</div>
        </SectionCard>
        <SectionCard title="운영">
          <div className="grid grid-cols-4 gap-4">{/* 입력 필드들 */}</div>
        </SectionCard>
      </div>
    </AccordionCard>
  );
};
```

### Select.jsx

Label과 Select 드롭다운이 결합된 공통 컴포넌트입니다.

- Label 텍스트 표시
- 필수 항목 표시 (\*)
- Chevron-down 아이콘
- 커스텀 스타일링

```jsx
import { useState } from "react";
import Select from "../components/Select";

const MyPage = () => {
  const [protocol, setProtocol] = useState("http");

  const options = [
    { value: "http", label: "http" },
    { value: "https", label: "https" },
  ];

  return (
    <Select
      label="프로토콜"
      required
      value={protocol}
      onChange={(e) => setProtocol(e.target.value)}
      options={options}
      placeholder="선택하세요"
    />
  );
};
```

### Input.jsx

Label과 Input이 결합된 공통 컴포넌트입니다.

- Label 텍스트 표시
- 필수 항목 표시 (\*)
- disabled/readOnly 시 텍스트 색상 gray
- placeholder 지원
- focus 스타일

```jsx
import { useState } from "react";
import Input from "../components/Input";

const MyPage = () => {
  const [ipAddress, setIpAddress] = useState("106.246.239.222:39090");

  return (
    <>
      {/* 일반 Input */}
      <Input
        label="IP주소 포트"
        required
        value={ipAddress}
        onChange={(e) => setIpAddress(e.target.value)}
        placeholder="IP 주소를 입력하세요"
      />

      {/* ReadOnly Input */}
      <Input label="프로토콜" value="http" readOnly />

      {/* Disabled Input */}
      <Input label="서버명" value="비활성화됨" disabled />
    </>
  );
};
```

### Toggle.jsx

Toggle(Switch) 컴포넌트입니다.

- Label 텍스트 표시
- ON/OFF 토글 스위치
- Description 텍스트 표시 (옵션)
- disabled 상태 지원

```jsx
import { useState } from "react";
import Toggle from "../components/Toggle";

const MyPage = () => {
  const [storageShare, setStorageShare] = useState(true);

  return (
    <>
      {/* Description 있는 Toggle */}
      <Toggle
        label="저장소 공유"
        description="(단건테스트, 배포)"
        checked={storageShare}
        onChange={setStorageShare}
      />

      {/* Description 없는 Toggle */}
      <Toggle
        label="알림 설정"
        checked={storageShare}
        onChange={setStorageShare}
      />

      {/* Disabled Toggle */}
      <Toggle
        label="비활성화"
        checked={true}
        onChange={setStorageShare}
        disabled
      />
    </>
  );
};
```

### Button.jsx

통합 Button 컴포넌트입니다.

**주요 기능:**

- 5가지 variant (primary, secondary, outline, ghost, danger)
- 3가지 size (small, medium, large)
- 아이콘 + 텍스트 또는 아이콘 전용 버튼 지원
- disabled 상태 지원
- focus 스타일
- hover 효과

**Props:**

- `variant` (string): 버튼 스타일 (기본값: "primary")
- `size` (string): 버튼 크기 (기본값: "medium")
- `icon` (React.ReactNode): 아이콘
- `title` (string): 버튼 텍스트 (없으면 아이콘 전용 버튼)
- `disabled` (boolean): 비활성화 여부
- `onClick` (Function): 클릭 핸들러
- `type` (string): 버튼 타입 (기본값: "button")
- `className` (string): 추가 CSS 클래스

**아이콘 전용 버튼:**

- `title` prop이 없으면 자동으로 정사각형 아이콘 버튼이 됩니다.
- size별 크기: small (24x24px), medium (36x36px), large (44x44px)

```jsx
import Button from "../components/Button";
import { LuPencil } from "react-icons/lu";

const MyPage = () => {
  return (
    <>
      {/* Variant별 버튼 */}
      <Button variant="primary" title="저장" />
      <Button variant="secondary" title="되돌리기" />
      <Button variant="outline" title="취소" />
      <Button variant="ghost" title="닫기" />
      <Button variant="danger" title="삭제" />

      {/* Size별 버튼 */}
      <Button size="small" title="작은 버튼" />
      <Button size="medium" title="중간 버튼" />
      <Button size="large" title="큰 버튼" />

      {/* 아이콘 + 텍스트 버튼 */}
      <Button icon={<LuPencil />} title="편집" variant="outline" />

      {/* 아이콘 전용 버튼 (title 없음) */}
      <Button icon={<LuPencil />} variant="outline" size="small" />

      {/* Disabled 버튼 */}
      <Button disabled title="비활성화" />

      {/* 클릭 핸들러 */}
      <Button onClick={() => console.log("클릭!")} title="클릭" />

      {/* Submit 버튼 */}
      <Button type="submit" variant="primary" title="제출" />

      {/* 버튼 그룹 */}
      <div className="flex gap-2">
        <Button variant="secondary" title="되돌리기" />
        <Button variant="primary" title="저장" />
      </div>
    </>
  );
};
```

### SchedulerSettingCard.jsx

스케줄러 설정 카드 컴포넌트입니다.

- 사용 여부 토글 스위치
- HW 리소스 조회 설정 (초 단위)
- 통계(요청, 오류) 설정 (분 단위)
- 되돌리기/저장 기능

```jsx
import SchedulerSettingCard from "../components/SchedulerSettingCard";

const SettingsPage = () => {
  return (
    <div>
      <SchedulerSettingCard />
    </div>
  );
};
```

### TimeRangeSelector.jsx

시간 범위 선택 컴포넌트입니다. (모니터링 페이지용 조회 설정)

- 실시간 모드 토글 버튼
- 조회 기간 설정 (날짜 범위 입력)
- 시간 범위 프리셋 선택 (최근 5분, 1시간, 1일 등)
- 데이터 간격 선택 (자동, 1분, 5분, 10분, 1시간)
- 드롭다운 메뉴 지원

**Props:**

- `isRealtime`: 실시간 모드 활성화 여부
- `onRealtimeToggle`: 실시간 버튼 클릭 핸들러
- `dateRange`: 날짜 범위 문자열
- `onDateRangeChange`: 날짜 범위 변경 핸들러
- `timeRangePreset`: 현재 선택된 시간 범위 프리셋
- `onTimeRangePresetChange`: 시간 범위 프리셋 변경 핸들러
- `dataInterval`: 현재 선택된 데이터 간격
- `onDataIntervalChange`: 데이터 간격 변경 핸들러

```jsx
import { useState } from "react";
import TimeRangeSelector from "../components/TimeRangeSelector";

const MonitoringPage = () => {
  const [isRealtime, setIsRealtime] = useState(false);
  const [dateRange, setDateRange] = useState(
    "2025/09/10 16:37 ~ 2025/09/10 17:37"
  );
  const [timeRangePreset, setTimeRangePreset] = useState("최근 1시간");
  const [dataInterval, setDataInterval] = useState("1분");

  return (
    <TimeRangeSelector
      isRealtime={isRealtime}
      onRealtimeToggle={() => setIsRealtime(!isRealtime)}
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
      timeRangePreset={timeRangePreset}
      onTimeRangePresetChange={setTimeRangePreset}
      dataInterval={dataInterval}
      onDataIntervalChange={setDataInterval}
    />
  );
};
```

### Dropdown.jsx

범용 드롭다운 메뉴 컴포넌트입니다.

- 단순 항목 및 그룹화된 항목 지원
- 외부 클릭 시 자동 닫힘
- 선택된 항목 하이라이트
- hover 효과
- disabled 상태 지원
- 좌/우 정렬 옵션
- 커스텀 트리거 텍스트 지원

**Props:**

- `items`: 드롭다운 항목 배열
  - 단순: `[{ value: '5min', label: '실시간 5분' }]`
  - 그룹화: `[{ group: '시간 단위', items: ['최근 1시간', '최근 3시간'] }]`
- `selectedValue`: 현재 선택된 값
- `onSelect`: 항목 선택 시 호출되는 콜백 함수
- `triggerLabel`: 트리거 버튼에 표시할 텍스트 (옵션, 없으면 selectedValue 사용)
- `className`: 추가 CSS 클래스 (옵션)
- `disabled`: 비활성화 여부 (옵션)
- `grouped`: 그룹화된 항목 여부 (기본값: false)
- `align`: 드롭다운 메뉴 정렬 - 'left' 또는 'right' (기본값: 'left')

```jsx
import { useState } from "react";
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

      {/* 커스텀 트리거 텍스트 */}
      <Dropdown
        items={timeOptions}
        selectedValue={selectedTime}
        onSelect={setSelectedTime}
        triggerLabel="시간 선택"
      />

      {/* Disabled 드롭다운 */}
      <Dropdown
        items={timeOptions}
        selectedValue={selectedTime}
        onSelect={setSelectedTime}
        disabled
      />
    </>
  );
};
```

### Chip.jsx

칩(Badge) 버튼 컴포넌트입니다.

- 작은 칩 형태의 버튼
- 다양한 색상 variant 지원
- 클릭 이벤트 지원
- 커스텀 색상 지원

**Props:**

- `label`: 칩에 표시될 텍스트
- `variant`: 칩 스타일 - 'primary'(녹색), 'secondary'(파란색), 'tertiary'(보라색), 'disabled'(회색), 'gray'(연회색) (기본값: 'primary')
- `color`: 커스텀 배경색 (선택사항, variant 대신 사용 가능)
- `onClick`: 클릭 이벤트 핸들러 (선택사항)
- `className`: 추가 CSS 클래스 (선택사항)

```jsx
import Chip from "../components/Chip";

const MyPage = () => {
  return (
    <div className="flex gap-2">
      {/* 기본 칩 */}
      <Chip label="CPU" variant="primary" />
      <Chip label="메모리" variant="secondary" />
      <Chip label="인증률" variant="tertiary" />
      <Chip label="실패건수" variant="disabled" />

      {/* 커스텀 색상 */}
      <Chip label="커스텀" color="#ea580c" />

      {/* 클릭 가능한 칩 */}
      <Chip
        label="클릭 가능"
        variant="primary"
        onClick={() => console.log("클릭!")}
      />
    </div>
  );
};
```

### EngineItemCard.jsx

엔진 항목 카드 컴포넌트입니다. Chip 컴포넌트들을 그룹화하여 표시합니다.

- 제목과 테두리 색상 지원
- Chip 컴포넌트들을 감싸는 카드
- 자동으로 flex-wrap 적용
- 한 줄 표시에 최적화

**Props:**

- `title`: 카드 제목 (예: "STT", "TTS", "SV")
- `children`: 카드 내용 (주로 Chip 컴포넌트들)
- `borderColor`: 테두리 색상 (선택사항, 기본값: #22c55e)
- `className`: 추가 CSS 클래스 (선택사항)

```jsx
import EngineItemCard from "../components/EngineItemCard";
import Chip from "../components/Chip";

const MyPage = () => {
  return (
    <div className="space-y-2">
      {/* STT 엔진 */}
      <EngineItemCard title="STT" borderColor="#22c55e">
        <Chip label="CPU" variant="primary" />
        <Chip label="메모리" variant="primary" />
        <Chip label="디스크" variant="primary" />
      </EngineItemCard>

      {/* TTS 엔진 */}
      <EngineItemCard title="TTS" borderColor="#5090f7">
        <Chip label="CPU" variant="secondary" />
        <Chip label="메모리" variant="secondary" />
      </EngineItemCard>
    </div>
  );
};
```

### ServerItemCard.jsx

서버 항목 카드 컴포넌트입니다. EngineItemCard의 변형으로 서버 리스트를 표시합니다.

- 제목이 상단 테두리 위에 겹치게 표시
- 여러 줄 wrap 지원
- 더 큰 패딩으로 서버 칩들을 표시

**Props:**

- `title`: 카드 제목 (예: "STT", "TTS", "SV")
- `children`: 카드 내용 (주로 Chip 컴포넌트들)
- `borderColor`: 테두리 색상 (선택사항, 기본값: #22c55e)
- `className`: 추가 CSS 클래스 (선택사항)

```jsx
import ServerItemCard from "../components/ServerItemCard";
import Chip from "../components/Chip";

const MyPage = () => {
  return (
    <div className="space-y-4">
      {/* STT 서버 */}
      <div className="relative">
        <ServerItemCard title="STT" borderColor="#22c55e">
          <Chip label="c-pod-001" variant="primary" />
          <Chip label="c-pod-002" variant="primary" />
          <Chip label="c-pod-003" variant="primary" />
          <Chip label="c-pod-004" variant="disabled" />
        </ServerItemCard>
      </div>

      {/* TTS 서버 */}
      <div className="relative">
        <ServerItemCard title="TTS" borderColor="#5090f7">
          <Chip label="t-pod-001" variant="secondary" />
          <Chip label="t-pod-002" variant="secondary" />
        </ServerItemCard>
      </div>
    </div>
  );
};
```

### RealtimeStatusIndicator.jsx

실시간 모니터링 상태를 표시하는 컴포넌트입니다.

- 녹색 인디케이터 (활성 상태 표시)
- 상태 텍스트 표시
- 시간 표시 (Bold)
- 상태 배지 (클릭 가능)
- hover 효과

**Props:**

- `isActive`: 실시간 활성화 여부 (기본값: false)
- `statusText`: 상태 텍스트 (기본값: "실시간 감시중")
- `time`: 시간 표시 (예: "15:07:32")
- `badgeText`: 배지 텍스트 (예: "실시간 5분")
- `onBadgeClick`: 배지 클릭 핸들러 (옵션)
- `className`: 추가 CSS 클래스 (옵션)

```jsx
import { useState, useEffect } from "react";
import RealtimeStatusIndicator from "../components/RealtimeStatusIndicator";

const MonitoringPage = () => {
  const [currentTime, setCurrentTime] = useState("");

  // 현재 시간 업데이트
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
      {/* 실시간 모니터링 활성화 상태 */}
      <RealtimeStatusIndicator
        isActive={true}
        statusText="실시간 감시중"
        time={currentTime}
        badgeText="실시간 5분"
        onBadgeClick={() => console.log("배지 클릭")}
      />

      {/* 배지 없는 상태 */}
      <RealtimeStatusIndicator
        isActive={true}
        statusText="데이터 수집 중"
        time="12:34:56"
      />

      {/* 비활성 상태 */}
      <RealtimeStatusIndicator isActive={false} statusText="모니터링 중지됨" />
    </>
  );
};
```

### Chart.jsx

Chart.js를 사용하여 다양한 타입의 차트를 렌더링하는 컴포넌트입니다.

**Props:**

- `type`: 차트 타입 (`'line'` | `'bar'` | `'doughnut'` | `'pie'`) (기본값: `'line'`)
- `data`: Chart.js 데이터 객체 (labels, datasets 포함)
- `options`: Chart.js 옵션 객체 (선택사항)
- `className`: 추가 CSS 클래스 (선택사항)

**지원하는 차트 타입:**

- `line`: 선차트
- `bar`: 막대차트
- `doughnut`: 도넛차트
- `pie`: 파이차트

```jsx
import Chart from "../components/Chart";

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
};
```

### Modal.jsx

팝업(모달) 공통 컴포넌트입니다. Figma 디자인 기반으로 제작되었습니다.

**Props:**

- `isOpen`: 모달 열림/닫힘 상태 (boolean, 필수)
- `onClose`: 모달 닫기 함수 (function, 필수)
- `title`: 모달 제목 (string, 필수)
- `children`: 모달 본문 내용 (ReactNode, 필수)
- `footer`: 모달 하단 영역 (ReactNode, 선택사항)
- `size`: 모달 크기 - 'sm', 'md', 'lg', 'xl' (기본값: 'md')
  - sm: 400px × 600px
  - md: 560px × 800px
  - lg: 800px × 900px
  - xl: 1000px × 1000px
- `width`: 커스텀 너비 (number, size 대신 사용 가능)
- `maxHeight`: 커스텀 최대 높이 (number, size 대신 사용 가능)

**주요 기능:**

- Header 영역 (제목, 닫기 버튼)
- Content 영역 (스크롤 가능, 커스텀 스크롤바)
- Footer 영역 (선택사항)
- 백드롭 클릭 시 닫기
- ESC 키로 닫기
- 애니메이션 효과 (페이드인, 슬라이드인)
- 반응형 대응

```jsx
import { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>모달 열기</Button>

      {/* 기본 크기 모달 (md) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="대시보드 관리"
      >
        <div>
          <h3>관리자 대시보드 (7개)</h3>
          <p>모달 본문 내용이 여기에 들어갑니다.</p>
          {/* ... */}
        </div>
      </Modal>

      {/* Footer 있는 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="새 대시보드 생성"
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              취소
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                // 저장 로직
                setIsModalOpen(false);
              }}
            >
              저장
            </Button>
          </>
        }
      >
        <div>
          <label>대시보드 이름</label>
          <input type="text" placeholder="대시보드 이름을 적어주세요." />
          {/* ... */}
        </div>
      </Modal>

      {/* 작은 모달 (sm) - 확인 다이얼로그 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="확인"
        size="sm"
        footer={
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>
            확인
          </Button>
        }
      >
        <p>정말 삭제하시겠습니까?</p>
      </Modal>

      {/* 큰 모달 (lg) - 많은 콘텐츠 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="상세 정보"
        size="lg"
      >
        <div>
          <h3>많은 콘텐츠가 들어갑니다</h3>
          {/* ... */}
        </div>
      </Modal>

      {/* 커스텀 크기 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="커스텀 크기"
        width={700}
        maxHeight={600}
      >
        <div>커스텀 크기의 모달입니다.</div>
      </Modal>
    </>
  );
};
```

### ChartCard.jsx

모니터링 차트를 표시하는 카드 컴포넌트입니다. Chip, Select, Chart 컴포넌트를 조합하여 완전한 차트 UI를 제공합니다.

**Props:**

- `chipLabel`: 칩 라벨 (예: "STT", "TTS")
- `chipVariant`: 칩 스타일 (`'primary'` | `'secondary'` | `'tertiary'`)
- `title`: 차트 제목 (예: "CPU 사용률")
- `errorMessage`: 에러/경고 메시지 (선택사항)
- `chartType`: 차트 타입 (`'line'` | `'bar'` | `'doughnut'` | `'pie'`) (기본값: `'line'`)
- `chartData`: Chart.js 데이터 객체
- `chartOptions`: Chart.js 옵션 객체 (선택사항)
- `onChartTypeChange`: 차트 타입 변경 핸들러 (선택사항)
- `onVisibilityToggle`: 표시/숨김 토글 핸들러 (선택사항)
- `onSettings`: 설정 버튼 클릭 핸들러 (선택사항)
- `showControls`: 컨트롤 버튼 표시 여부 (기본값: `true`)
- `borderColor`: 카드 테두리 색상 (선택사항, 기본값: `#5090f7`)
- `className`: 추가 CSS 클래스 (선택사항)

**주요 기능:**

- 차트 타입 선택 드롭다운 (선차트, 막대차트, 도넛차트, 파이차트)
- 표시/숨김 토글 버튼
- 설정 버튼
- 에러/경고 메시지 표시
- Figma 디자인 기반 UI

```jsx
import ChartCard from "../components/ChartCard";

const MonitoringPage = () => {
  const chartData = {
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
        chartData={doughnutData}
        showControls={false}
        borderColor="#a855f7"
      />
    </>
  );
};
```

## 폴더 구조 예시

```
components/
  ├── Layout.jsx                    # 전체 레이아웃
  ├── Sidebar.jsx                   # 사이드바 메뉴
  ├── Header.jsx                    # 페이지 헤더 (breadcrumb, 사용자 정보)
  ├── PageHeader.jsx                # 페이지 제목 헤더 (왼쪽 빨간 테두리)
  ├── Card.jsx                      # 범용 카드 컴포넌트 (Figma 디자인 기반)
  ├── AccordionCard.jsx             # 아코디언 카드 (펼침/접기 기능)
  ├── SectionCard.jsx               # 섹션 카드 (AccordionCard 내부 사용)
  ├── Modal.jsx                     # 팝업(모달) 공통 컴포넌트 (Figma 디자인 기반)
  ├── Modal.css                     # Modal 컴포넌트 스타일
  ├── ModalExample.jsx              # Modal 컴포넌트 사용 예시
  ├── Chip.jsx                      # 칩(Badge) 버튼 컴포넌트
  ├── EngineItemCard.jsx            # 엔진 항목 카드 (Chip 그룹화, 한 줄)
  ├── ServerItemCard.jsx            # 서버 항목 카드 (Chip 그룹화, 여러 줄)
  ├── Select.jsx                    # Select 드롭다운 (Label 포함)
  ├── Input.jsx                     # Input 입력 필드 (Label 포함)
  ├── Toggle.jsx                    # Toggle 스위치 (Label 포함)
  ├── Button.jsx                    # Button 버튼 (통합 컴포넌트)
  ├── Dropdown.jsx                  # Dropdown 메뉴 (항목 선택)
  ├── RealtimeStatusIndicator.jsx   # 실시간 상태 표시 (인디케이터, 시간, 배지)
  ├── SchedulerSettingCard.jsx      # 스케줄러 설정 카드
  ├── TimeRangeSelector.jsx         # 시간 범위 선택 (모니터링용 조회 설정)
  ├── Chart.jsx                     # Chart.js 차트 컴포넌트 (선차트, 막대차트, 도넛차트, 파이차트)
  ├── ChartCard.jsx                 # 모니터링 차트 카드 (Chip, 차트 타입 선택, 차트 표시)
  ├── CardExample.jsx               # Card 컴포넌트 사용 예시
  ├── ChipExample.jsx               # Chip 컴포넌트 사용 예시
  ├── ChartCardExample.jsx          # ChartCard 컴포넌트 사용 예시
  └── README.md                     # 이 파일
```

## 컴포넌트 작성 가이드

### 1. 파일명

- PascalCase 사용 (예: `MyComponent.jsx`)
- 파일명과 컴포넌트명 일치

### 2. Props

- PropTypes 또는 TypeScript로 타입 정의 권장
- 기본값 설정

### 3. 스타일

- Tailwind CSS 우선 사용
- 인라인 스타일 최소화

### 4. 상태 관리

- 컴포넌트 내부 상태는 useState 사용
- 전역 상태는 Context API 또는 상태 관리 라이브러리 사용
