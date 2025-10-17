import { useState } from "react";
import Table from "./Table";
import Button from "./Button";

/**
 * Table 컴포넌트 사용 예제
 * Figma 디자인의 테이블 구조를 재현
 */
const TableExample = () => {
  // 샘플 데이터
  const [data, setData] = useState([
    {
      no: 10,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "콜봇 2025-08-04 12:40:25.826",
      testServer: "학습서버명",
      sttCount: 0,
      status: "진행중",
    },
    {
      no: 9,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "콜봇 2025-08-04 12:40:25.826",
      testServer: "학습서버명",
      sttCount: 0,
      status: "진행중",
    },
    {
      no: 8,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "콜봇 2025-08-04 12:40:25.826",
      testServer: "학습서버명",
      sttCount: 0,
      status: "진행중",
    },
    {
      no: 7,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "기본 베이스모델",
      testServer: "학습서버명",
      sttCount: 1,
      status: "진행중",
    },
    {
      no: 6,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "기본 베이스모델",
      testServer: "학습서버명",
      sttCount: 1,
      status: "진행중",
    },
    {
      no: 5,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "기본 베이스모델",
      testServer: "학습서버명",
      sttCount: 1,
      status: "진행중",
    },
    {
      no: 4,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "콜봇 2025-08-04 12:40:25.826",
      testServer: "학습서버명",
      sttCount: 0,
      status: "진행중",
    },
    {
      no: 3,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "콜봇 2025-08-04 12:40:25.826",
      testServer: "학습서버명",
      sttCount: 0,
      status: "진행중",
    },
    {
      no: 2,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "콜봇 2025-08-04 12:40:25.826",
      testServer: "학습서버명",
      sttCount: 0,
      status: "진행중",
    },
    {
      no: 1,
      date: "2025-08-19 13:53:54",
      serviceModel: "콜봇",
      appliedModel: "콜봇 2025-08-04 12:40:25.826",
      testServer: "학습서버명",
      sttCount: 0,
      status: "진행중",
    },
  ]);

  // 컬럼 정의
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
      key: "serviceModel",
      label: "서비스 모델 / 고객코드",
      width: "120px",
      align: "center",
    },
    {
      key: "appliedModel",
      label: "적용 모델",
      width: "325px",
      align: "center",
    },
    {
      key: "testServer",
      label: "테스트 서버",
      width: "325px",
      align: "center",
    },
    {
      key: "sttCount",
      label: "STT 결과 개수",
      width: "90px",
      align: "center",
    },
    {
      key: "result",
      label: "결과 (transcript)",
      width: "90px",
      align: "center",
      render: (value, row) => (
        <Button
          variant={row.sttCount > 0 ? "primary" : "outline"}
          size="small"
          title="결과보기"
          className={`h-8 px-3 text-xs ${
            row.sttCount === 0 ? "text-[#a1a9aa]" : ""
          }`}
          onClick={() => alert(`${row.no}번 결과 보기`)}
        />
      ),
    },
    {
      key: "statusCheck",
      label: "상태조회",
      width: "60px",
      align: "center",
      render: (value, row) => (
        <Button
          variant="outline"
          size="small"
          className="h-8 w-9 p-0"
          onClick={() => alert(`${row.no}번 상태 조회`)}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
          }
        />
      ),
    },
    {
      key: "status",
      label: "상태",
      width: "100px",
      align: "center",
    },
  ];

  // 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 상단 액션 버튼들
  const topActions = {
    leftText: `검색결과 ${data.length}건`,
    rightButtons: [
      {
        variant: "secondary",
        size: "medium",
        title: "다운로드",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        ),
        onClick: () => alert("다운로드"),
      },
      {
        variant: "primary",
        size: "medium",
        title: "등록",
        className: "bg-[#0891b2] hover:bg-[#0e7490]",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        ),
        onClick: () => alert("등록"),
      },
    ],
  };

  // 하단 액션
  const bottomActions = {
    onDeleteSelected: (selectedIndexes) => {
      if (
        window.confirm(
          `선택한 ${selectedIndexes.length}개 항목을 삭제하시겠습니까?`
        )
      ) {
        setData((prev) =>
          prev.filter((_, index) => !selectedIndexes.includes(index))
        );
      }
    },
    onDeleteAll: () => {
      if (window.confirm("모든 항목을 삭제하시겠습니까?")) {
        setData([]);
      }
    },
  };

  // 페이지네이션
  const pagination = {
    enabled: true,
    currentPage,
    totalPages: Math.ceil(data.length / pageSize),
    pageSize,
    pageSizeOptions: [10, 20, 50, 100],
    onPageChange: (page) => {
      setCurrentPage(page);
      console.log("페이지 변경:", page);
    },
    onPageSizeChange: (size) => {
      setPageSize(size);
      setCurrentPage(1);
      console.log("페이지 크기 변경:", size);
    },
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Table 컴포넌트 예제</h1>

      <Table
        columns={columns}
        data={data}
        topActions={topActions}
        bottomActions={bottomActions}
        pagination={pagination}
        selectable={true}
        onSelectionChange={(selected) => {
          console.log("선택된 행:", selected);
        }}
        emptyMessage="검색 결과가 없습니다"
        className="bg-white"
      />
    </div>
  );
};

export default TableExample;
