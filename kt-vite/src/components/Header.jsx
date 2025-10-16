import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // 경로별 Breadcrumb 매핑
  const breadcrumbMap = {
    "/": ["홈", "모니터링", "통합 모니터링"],
    "/monitoring": ["홈", "모니터링", "통합 모니터링"],
    "/settings": [
      "홈",
      "프로젝트 관리자 메뉴",
      "rapeech-cpod KT-STT 4.0",
      "설정",
      "공통설정",
    ],
  };

  const breadcrumbs = breadcrumbMap[location.pathname] || ["홈"];

  return (
    <header className="h-[68px] bg-[#2bb7b3] px-5 flex items-center justify-between rounded-lg">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2">
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index === 0 && (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            )}
            {index > 0 && (
              <svg
                className="w-2 h-2 text-white"
                fill="currentColor"
                viewBox="0 0 8 8"
              >
                <path d="M2 0L6 4L2 8V0Z" />
              </svg>
            )}
            <span
              className={`text-sm text-white ${
                index === breadcrumbs.length - 1 ? "font-semibold" : ""
              }`}
            >
              {item}
            </span>
          </div>
        ))}
      </nav>

      {/* 사용자 정보 & 상태 */}
      <div className="flex items-center gap-4">
        {/* 사용자 정보 */}
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-sm font-semibold text-white">홍길동</span>
        </div>

        {/* 상태 표시 */}
        <div className="bg-[#fafafa] rounded-lg px-4 py-2 flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#22c55e] rounded-full"></div>
          <span className="text-sm text-black">All Services 정상</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
