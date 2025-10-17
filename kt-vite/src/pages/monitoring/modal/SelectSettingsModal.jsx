import React, { useState } from "react";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import TimeRangeSelector from "../../../components/TimeRangeSelector";
import SettingRow from "../../../components/SettingRow";
import Checkbox from "../../../components/Checkbox";

export default function SelectSettingsModal({ isOpen, onClose }) {
  // 전체 설정을 따름 상태
  const [followGlobalSettings, setFollowGlobalSettings] = useState(false);

  // 조회 기간 상태
  const [isRealtime, setIsRealtime] = useState(false);
  const [dateRange, setDateRange] = useState("");
  const [timeRangePreset, setTimeRangePreset] = useState("최근 1시간");
  const [dataInterval, setDataInterval] = useState("1분");

  // 적용 버튼 핸들러
  const handleApply = () => {
    // 여기서 선택된 값들을 부모 컴포넌트로 전달하거나 처리
    console.log({
      followGlobalSettings,
      isRealtime,
      dateRange,
      timeRangePreset,
      dataInterval,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="조회 설정"
      size="lg"
      footer={
        <div className="flex gap-2">
          <Button variant="secondary" title="취소" onClick={onClose} />
          <Button variant="primary" title="적용" onClick={handleApply} />
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* 조회 기간 설정 */}
        <div className="flex flex-col gap-3">
          {/* 전체 설정을 따름 체크박스와 설명 */}
          <div className="flex items-center justify-between">
            <Checkbox
              checked={followGlobalSettings}
              onChange={() => setFollowGlobalSettings(!followGlobalSettings)}
              label="전체 설정을 따름"
            />
          </div>

          {/* 조회 기간 설정 박스 */}
          <div className="border border-[#e4e7e7] rounded p-4">
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
          </div>
        </div>
      </div>
    </Modal>
  );
}
