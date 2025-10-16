import { useState } from "react";

const SchedulerSettingCard = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [hwResourceInterval, setHwResourceInterval] = useState("59");
  const [statisticsInterval, setStatisticsInterval] = useState("59");

  const handleReset = () => {
    setHwResourceInterval("59");
    setStatisticsInterval("59");
  };

  const handleSave = () => {
    console.log("저장:", { hwResourceInterval, statisticsInterval });
  };

  return (
    <div className="w-full max-w-[769px] bg-white rounded-md shadow-sm border border-gray-200">
      {/* Header - Body 통합 */}
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Title */}
            <div className="flex items-center gap-3.5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#ed1b23] rounded-md"></div>
                <h2 className="text-base font-semibold text-black">
                  스케줄러 동작 주기 설정
                </h2>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              className="px-3 h-8 bg-[#a1a9aa] text-white text-xs font-medium rounded inline-flex items-center gap-2 hover:bg-gray-500 transition-colors"
              onClick={handleReset}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>

            <button
              className="px-3 h-8 bg-[#181b1b] text-white text-xs font-medium rounded inline-flex items-center gap-2 hover:bg-gray-800 transition-colors"
              onClick={handleSave}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
            </button>

            {/* Accordion Icon */}
            <button className="w-5 h-5 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="px-5 py-5 border-b border-gray-200">
        <div className="flex items-start gap-4">
          {/* Left Section - Switch */}
          <div className="flex flex-col gap-4">
            <label className="text-xs font-medium text-[#a1a9aa]">
              사용 여부
            </label>
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                isEnabled ? "bg-[#2bb7b3]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  isEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Middle Section - Input Fields */}
          <div className="flex gap-4 flex-1">
            {/* HW 리소스 조회 */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-[#a1a9aa] mb-1">
                HW 리소스 조회
                <span className="text-[#ed1b23] ml-0.5">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={hwResourceInterval}
                  onChange={(e) => setHwResourceInterval(e.target.value)}
                  className="w-full h-9 px-2.5 bg-[#f4f5f5] border border-transparent rounded text-sm text-black focus:outline-none focus:border-[#2bb7b3]"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-[#525b5b]">
                  초
                </span>
              </div>
            </div>

            {/* 통계(요청, 오류) */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-[#a1a9aa] mb-1">
                통계(요청, 오류)
                <span className="text-[#ed1b23] ml-0.5">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={statisticsInterval}
                  onChange={(e) => setStatisticsInterval(e.target.value)}
                  className="w-full h-9 px-2.5 bg-[#f4f5f5] border border-transparent rounded text-sm text-black focus:outline-none focus:border-[#2bb7b3]"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-[#525b5b]">
                  분
                </span>
              </div>
            </div>
          </div>

          {/* Right Section - Action Buttons */}
          <div className="flex gap-2 pt-6">
            <button
              onClick={handleReset}
              className="px-5 h-9 bg-[#a1a9aa] text-white text-sm font-semibold rounded hover:bg-gray-500 transition-colors"
            >
              되돌리기
            </button>
            <button
              onClick={handleSave}
              className="px-5 h-9 bg-[#181b1b] text-white text-sm font-semibold rounded hover:bg-gray-800 transition-colors"
            >
              저장
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 flex gap-2">
        <button className="w-9 h-9 border border-[#e4e7e7] rounded flex items-center justify-center hover:bg-gray-50 transition-colors">
          <svg
            className="w-4 h-4 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </button>
        <button className="w-9 h-9 bg-[#181b1b] text-white rounded flex items-center justify-center hover:bg-gray-800 transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SchedulerSettingCard;
