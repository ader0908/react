import React, { useState } from "react";
import Card from "../components/Card";
import SectionCard from "../components/SectionCard";
import SearchFilter from "../components/SearchFilter";
import DateRangePicker from "../components/DateRangePicker";
import Select from "../components/Select";
import RadioGroup from "../components/RadioGroup";
import Table from "../components/Table";
import Button from "../components/Button";
import { RiRefreshLine } from "react-icons/ri";

export default function TablePage() {
  const [radioGroupValue, setRadioGroupValue] = useState("serviceModel");
  const [selectedValue, setSelectedValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const columns = [
    { key: "date", label: "일시" },
    { key: "serviceModel", label: "서비스 모델 / 고객코드" },
    { key: "appliedModel", label: "적용 모델" },
    { key: "testServer", label: "테스트 서버" },
    { key: "sttCount", label: "STT 결과 개수" },
    { key: "result", label: "결과 (transcript)" },
    { key: "statusCheck", label: "상태조회" },
    { key: "status", label: "상태" },
  ];
  const data = [
    {
      id: 1,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "콜봇 2025-08-04 12:40:25.826",
      testServer: "학습서버명",
      sttCount: 0,
      result: (
        <Button
          variant="primary"
          title="결과보기"
          onClick={() => {}}
          disabled={true}
        />
      ),
      statusCheck: (
        <Button variant="outline" icon={<RiRefreshLine />} onClick={() => {}} />
      ),
      status: "상태",
    },
    {
      id: 2,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "콜봇 2025-08-04 12:40:25.826",
      testServer: "학습서버명",
      sttCount: 0,
      result: (
        <Button
          variant={null}
          title="결과보기"
          className="bg-[#2bb7b3] text-white hover:bg-[#2bb7b2d3]"
          onClick={() => {}}
        />
      ),
      statusCheck: (
        <Button variant="outline" icon={<RiRefreshLine />} onClick={() => {}} />
      ),
      status: "상태",
    },
    {
      id: 3,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "콜봇 2025-08-04 12:40:25.826",
      testServer: "학습서버명",
      sttCount: 0,
      result: (
        <Button
          variant={null}
          title="결과보기"
          className="bg-[#2bb7b3] text-white hover:bg-[#2bb7b2d3]"
          onClick={() => {}}
        />
      ),
      statusCheck: (
        <Button variant="outline" icon={<RiRefreshLine />} onClick={() => {}} />
      ),
      status: "상태",
    },
    {
      id: 4,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "콜봇 2025-08-04 12:40:25.826",
      testServer: "학습서버명",
      sttCount: 0,
      result: (
        <Button
          variant={null}
          title="결과보기"
          className="bg-[#2bb7b3] text-white hover:bg-[#2bb7b2d3]"
          onClick={() => {}}
        />
      ),
      statusCheck: (
        <Button variant="outline" icon={<RiRefreshLine />} onClick={() => {}} />
      ),
      status: "상태",
    },
    {
      id: 5,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "콜봇 2025-08-04 12:40:25.826",
      testServer: "학습서버명",
      sttCount: 0,
      result: (
        <Button
          variant={null}
          title="결과보기"
          className="bg-[#2bb7b3] text-white hover:bg-[#2bb7b2d3]"
          onClick={() => {}}
        />
      ),
      statusCheck: (
        <Button variant="outline" icon={<RiRefreshLine />} onClick={() => {}} />
      ),
      status: "상태",
    },
    {
      id: 6,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "콜봇 2025-08-04 12:40:25.826",
      testServer: "학습서버명",
      sttCount: 0,
      result: (
        <Button
          variant={null}
          title="결과보기"
          className="bg-[#2bb7b3] text-white hover:bg-[#2bb7b2d3]"
          onClick={() => {}}
        />
      ),
      statusCheck: (
        <Button variant="outline" icon={<RiRefreshLine />} onClick={() => {}} />
      ),
      status: "상태",
    },
    {
      id: 7,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "콜봇 2025-08-04 12:40:25.826",
      testServer: "학습서버명",
      sttCount: 0,
      result: (
        <Button
          variant="primary"
          disabled={true}
          title="결과보기"
          onClick={() => {}}
        />
      ),
      statusCheck: (
        <Button variant="outline" icon={<RiRefreshLine />} onClick={() => {}} />
      ),
      status: "상태",
    },
  ];
  const topActions = {
    leftText: "검색결과 23건",
  };
  const bottomActions = {
    leftButtons: [{ variant: "primary", title: "Delete", onClick: () => {} }],
    onDeleteSelected: () => {},
    onDeleteAll: () => {},
  };
  const pagination = {
    enabled: true,
    currentPage: 1,
    totalPages: 10,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    onPageChange: (page) => {},
    onPageSizeChange: (size) => {},
  };
  const selectable = true;
  const onSelectionChange = (selected) => {
    console.log(selected);
  };
  return (
    <Card
      title="단건 테스트"
      description="실시간 음성 인식 테스트를 진행하세요"
      descriptionTextColor="#ffa400"
    >
      <SectionCard title="단건 테스트 결과">
        <div className="space-y-2">
          <SearchFilter onSearch={() => {}}>
            <div className="flex-none w-60">
              <RadioGroup
                name="filterType"
                options={[
                  { value: "serviceModel", label: "서비스 모델" },
                  { value: "customerCode", label: "고객 코드" },
                ]}
                value={radioGroupValue}
                onChange={setRadioGroupValue}
                className="mb-2"
              />
              <Select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                options={["1", "2", "3"]}
                placeholder="선택하세요"
              />
            </div>
            <DateRangePicker
              label="조회기간"
              cou
              required
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              className="flex-1"
              width={300}
            />
          </SearchFilter>
        </div>
        <div className="mt-4">
          <Table
            columns={columns}
            data={data}
            topActions={topActions}
            bottomActions={bottomActions}
            pagination={pagination}
            selectable={selectable}
            onSelectionChange={onSelectionChange}
          />
        </div>
      </SectionCard>
    </Card>
  );
}
