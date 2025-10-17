import React, { useState } from "react";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import Chart from "../../../components/Chart";
import SettingRow from "../../../components/SettingRow";
import Toggle from "../../../components/Toggle";
import Checkbox from "../../../components/Checkbox";
import Input from "../../../components/Input";

function ChartSettingsModal({ isOpen, onClose }) {
  // 차트 설정 상태
  const [chartType, setChartType] = useState("area"); // line, bar, area
  const [compareWithPrevious, setCompareWithPrevious] = useState(false);
  const [yAxisMaxMode, setYAxisMaxMode] = useState("fixed"); // auto, fixed
  const [yAxisMaxValue, setYAxisMaxValue] = useState("100");
  const [showMaxValue, setShowMaxValue] = useState(true);
  const [showLegend, setShowLegend] = useState(true);

  // 임계치 설정
  const [showMaxThreshold, setShowMaxThreshold] = useState(true);
  const [maxThreshold, setMaxThreshold] = useState("90");
  const [showAverage, setShowAverage] = useState(true);
  const [showMinThreshold, setShowMinThreshold] = useState(true);
  const [minThreshold, setMinThreshold] = useState("10");

  // 미리보기용 샘플 데이터
  const previewChartData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    datasets: [
      {
        label: "CPU 사용률",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "#2bb7b3",
        backgroundColor:
          chartType === "area" ? "rgba(43, 183, 179, 0.2)" : "transparent",
        fill: chartType === "area",
        tension: 0.4,
      },
    ],
  };

  const previewChartOptions = {
    scales: {
      y: {
        ...(yAxisMaxMode === "fixed" && {
          max: parseFloat(yAxisMaxValue) || 100,
        }),
      },
    },
  };

  // 라디오 버튼 컴포넌트
  const RadioButton = ({ label, checked, onChange }) => (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <div className="relative">
        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div
          className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
            checked ? "border-[#2bb7b3]" : "border-[#e4e7e7]"
          }`}
        >
          {checked && <div className="w-2 h-2 rounded-full bg-[#2bb7b3]" />}
        </div>
      </div>
      <span className="text-sm text-black select-none">{label}</span>
    </label>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="차트 설정"
      footer={
        <div className="flex gap-2">
          <Button variant="secondary" title="취소" onClick={onClose} />
          <Button variant="primary" title="적용" onClick={onClose} />
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        {/* 미리보기 섹션 */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-3">미리보기</h3>
          <div className="bg-[#fafafa] border border-[#e4e7e7] rounded h-[188px]">
            <Chart
              type={chartType === "area" ? "line" : chartType}
              data={previewChartData}
              options={previewChartOptions}
            />
          </div>
        </div>

        {/* 설정 항목들 */}
        <div className="flex flex-col gap-4">
          {/* 차트 유형 */}
          <SettingRow title="차트 유형">
            <div className="flex gap-5">
              <RadioButton
                label="선차트"
                checked={chartType === "line"}
                onChange={() => setChartType("line")}
              />
              <RadioButton
                label="막대차트"
                checked={chartType === "bar"}
                onChange={() => setChartType("bar")}
              />
              <RadioButton
                label="영역차트"
                checked={chartType === "area"}
                onChange={() => setChartType("area")}
              />
            </div>
          </SettingRow>

          {/* 이전 시간과 비교 */}
          <SettingRow title="이전 시간과 비교">
            <Toggle
              checked={compareWithPrevious}
              onChange={setCompareWithPrevious}
            />
          </SettingRow>

          {/* Y축 최대값 */}
          <SettingRow title="Y축 최대값">
            <div className="flex items-center gap-5">
              <div className="flex gap-5">
                <RadioButton
                  label="자동"
                  checked={yAxisMaxMode === "auto"}
                  onChange={() => setYAxisMaxMode("auto")}
                />
                <RadioButton
                  label="고정"
                  checked={yAxisMaxMode === "fixed"}
                  onChange={() => setYAxisMaxMode("fixed")}
                />
              </div>
              {yAxisMaxMode === "fixed" && (
                <div className="flex items-center gap-2">
                  <Input
                    value={yAxisMaxValue}
                    onChange={(e) => setYAxisMaxValue(e.target.value)}
                    placeholder="최대값"
                    type="number"
                    className="w-20"
                  />
                  <span className="text-sm text-black">% 표시</span>
                </div>
              )}
            </div>
          </SettingRow>

          {/* 최대값 표시 */}
          <SettingRow title="최대값 표시">
            <Toggle checked={showMaxValue} onChange={setShowMaxValue} />
          </SettingRow>

          {/* 범례 표시 */}
          <SettingRow title="범례 표시">
            <Toggle checked={showLegend} onChange={setShowLegend} />
          </SettingRow>

          {/* 임계치 설정 */}
          <SettingRow title="임계치 설정">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-[#64748b] mb-2">
                체크 해제 시 해당 임계치 선이 숨겨집니다
              </p>

              {/* Max 임계치 */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 w-[180px]">
                  <Checkbox
                    checked={showMaxThreshold}
                    onChange={setShowMaxThreshold}
                  />
                  <span className="text-sm text-black">Max :</span>
                  <Input
                    value={maxThreshold}
                    onChange={(e) => setMaxThreshold(e.target.value)}
                    type="number"
                    className="w-[60px]"
                  />
                  <span className="text-sm text-black">% 표시</span>
                </div>
                <span className="text-xs text-[#64748b]">
                  빨간색 점선으로 표시됩니다
                </span>
              </div>

              {/* 평균선 표시 */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 w-[180px]">
                  <Checkbox checked={showAverage} onChange={setShowAverage} />
                  <span className="text-sm text-black">평균선 표시</span>
                </div>
                <span className="text-xs text-[#64748b]">
                  초록색 점선으로 표시됩니다
                </span>
              </div>

              {/* Min 임계치 */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 w-[180px]">
                  <Checkbox
                    checked={showMinThreshold}
                    onChange={setShowMinThreshold}
                  />
                  <span className="text-sm text-black">Min :</span>
                  <Input
                    value={minThreshold}
                    onChange={(e) => setMinThreshold(e.target.value)}
                    type="number"
                    className="w-[60px]"
                  />
                  <span className="text-sm text-black">% 표시</span>
                </div>
                <span className="text-xs text-[#64748b]">
                  노란색 점선으로 표시됩니다
                </span>
              </div>
            </div>
          </SettingRow>
        </div>
      </div>
    </Modal>
  );
}

export default ChartSettingsModal;
