import { useState } from "react";
import SearchFilter from "./SearchFilter";
import Select from "./Select";
import DateRangePicker from "./DateRangePicker";
import RadioGroup from "./RadioGroup";

/**
 * SearchFilter 컴포넌트 사용 예시
 */
const SearchFilterExample = () => {
  // 상태 관리
  const [filterType, setFilterType] = useState("serviceModel");
  const [selectedValue, setSelectedValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // 서비스 모델 옵션 예시
  const serviceModelOptions = [
    { value: "", label: "전체" },
    { value: "model1", label: "모델 1" },
    { value: "model2", label: "모델 2" },
    { value: "model3", label: "모델 3" },
  ];

  // 검색 핸들러
  const handleSearch = () => {
    console.log("검색 데이터:", {
      filterType,
      selectedValue,
      startDate,
      endDate,
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">SearchFilter 컴포넌트 예시</h1>

      {/* 예시 1: 라디오 + 드롭다운 + 날짜 범위 */}
      <SearchFilter onSearch={handleSearch} className="mb-6">
        {/* 필터 선택 영역 (서비스 모델 / 고객 코드) */}
        <div className="flex-none w-60">
          {/* 라디오 버튼 */}
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

          {/* 드롭다운 */}
          <Select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            options={serviceModelOptions}
            placeholder="전체"
          />
        </div>

        {/* 조회기간 선택 */}
        <DateRangePicker
          label="조회기간"
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          startPlaceholder="시작일"
          endPlaceholder="종료일"
          className="flex-1"
        />
      </SearchFilter>

      {/* 예시 2: 간단한 구성 (드롭다운 + 날짜만) */}
      <SearchFilter onSearch={() => console.log("검색2")} className="mb-6">
        <Select
          label="카테고리"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          options={serviceModelOptions}
          placeholder="선택하세요"
          className="flex-none w-60"
        />
        <DateRangePicker
          label="조회기간"
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          className="flex-1"
        />
      </SearchFilter>

      {/* 예시 3: RadioGroup 단독 사용 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">RadioGroup 단독 사용</h2>
        <div className="bg-white p-5 rounded-lg">
          <RadioGroup
            name="example1"
            label="옵션 선택"
            options={[
              { value: "option1", label: "옵션 1" },
              { value: "option2", label: "옵션 2" },
              { value: "option3", label: "옵션 3" },
            ]}
            value={filterType}
            onChange={setFilterType}
            className="mb-4"
          />

          <RadioGroup
            name="example2"
            label="세로 방향"
            options={[
              { value: "a", label: "항목 A" },
              { value: "b", label: "항목 B" },
              { value: "c", label: "항목 C" },
            ]}
            value={filterType}
            onChange={setFilterType}
            direction="vertical"
            gap="gap-3"
          />
        </div>
      </div>

      {/* 사용 방법 설명 */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">사용 방법</h2>
        <p className="text-sm text-gray-600 mb-3">
          SearchFilter는 children으로 필터 구성 요소를 받아 유연하게 사용할 수
          있습니다.
        </p>
        <pre className="text-sm bg-white p-4 rounded overflow-x-auto">
          {`// RadioGroup 사용 예시
<RadioGroup
  name="filterType"
  options={[
    { value: "serviceModel", label: "서비스 모델" },
    { value: "customerCode", label: "고객 코드" },
  ]}
  value={filterType}
  onChange={setFilterType}
  label="필터 유형"  // 선택사항
  direction="horizontal"  // "horizontal" | "vertical"
  gap="gap-6"  // 간격 조정
/>

// SearchFilter와 함께 사용
<SearchFilter onSearch={handleSearch}>
  <div className="flex-none w-60">
    <RadioGroup
      name="filterType"
      options={radioOptions}
      value={value}
      onChange={setValue}
      className="mb-2"
    />
    <Select options={selectOptions} />
  </div>
  <DateRangePicker className="flex-1" />
</SearchFilter>`}
        </pre>
      </div>
    </div>
  );
};

export default SearchFilterExample;
