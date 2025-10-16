import React from "react";
import Card from "./Card";
import Button from "./Button";

/**
 * Card 컴포넌트 사용 예시
 */
const CardExample = () => {
  return (
    <div className="space-y-6 p-6">
      {/* 기본 카드 */}
      <Card title="기본 카드">
        <p className="text-sm text-[#585d5d]">
          이것은 기본 카드 컴포넌트입니다. title과 children을 받아 표시합니다.
        </p>
      </Card>

      {/* 인디케이터 색상 변경 */}
      <Card title="엔진 항목 선택" indicatorColor="#22c55e">
        <div className="space-y-2">
          <p className="text-sm text-[#585d5d]">
            대시보드에 보여줄 카드를 선택하세요.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-[#22c55e] text-white text-xs rounded">
              CPU
            </span>
            <span className="px-3 py-1 bg-[#22c55e] text-white text-xs rounded">
              메모리
            </span>
            <span className="px-3 py-1 bg-[#22c55e] text-white text-xs rounded">
              디스크
            </span>
          </div>
        </div>
      </Card>

      {/* 헤더에 버튼이 있는 카드 */}
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
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-black">
              설정 항목 1
            </label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border border-[#e4e7e7] rounded"
              placeholder="값을 입력하세요"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-black">
              설정 항목 2
            </label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border border-[#e4e7e7] rounded"
              placeholder="값을 입력하세요"
            />
          </div>
        </div>
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
        <p className="text-sm text-[#585d5d]">
          Footer 영역도 여전히 사용 가능합니다.
        </p>
      </Card>

      {/* 인디케이터 없는 카드 */}
      <Card title="인디케이터 없는 카드" showIndicator={false}>
        <p className="text-sm text-[#585d5d]">
          showIndicator=false 로 설정하면 왼쪽 빨간 바가 표시되지 않습니다.
        </p>
      </Card>

      {/* 타이틀 없는 카드 */}
      <Card>
        <p className="text-sm text-[#585d5d]">
          title을 전달하지 않으면 헤더 영역이 표시되지 않습니다.
        </p>
      </Card>
    </div>
  );
};

export default CardExample;
