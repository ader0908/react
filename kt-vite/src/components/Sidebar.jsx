import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [expandedMenus, setExpandedMenus] = useState({
    monitoring: false,
    history: false,
    license: false,
    cpod: false,
  });
  const [expandedSubMenus, setExpandedSubMenus] = useState({
    // cpod 메뉴
    settings: false,
    "ai-learning": false,
    operation: false,
    // monitoring 메뉴
    total: false,
    statistics: false,
    // history 메뉴
    "api-history": false,
    "error-history": false,
  });

  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const toggleSubMenu = (subMenuKey) => {
    setExpandedSubMenus((prev) => ({
      ...prev,
      [subMenuKey]: !prev[subMenuKey],
    }));
  };

  // 현재 경로에 따라 메뉴 자동 확장
  useEffect(() => {
    const path = location.pathname;

    // 경로별 메뉴 확장 매핑
    const routeMenuMap = {
      "/": {
        mainMenu: "monitoring",
        subMenu: "total",
      },
      "/monitoring": {
        mainMenu: "monitoring",
        subMenu: "total",
      },
      "/settings": {
        mainMenu: "cpod",
        subMenu: "settings",
      },
    };

    const menuInfo = routeMenuMap[path];
    if (menuInfo) {
      // 메인 메뉴 확장
      setExpandedMenus((prev) => ({
        ...prev,
        [menuInfo.mainMenu]: true,
      }));

      // 서브 메뉴 확장
      if (menuInfo.subMenu) {
        setExpandedSubMenus((prev) => ({
          ...prev,
          [menuInfo.subMenu]: true,
        }));
      }
    }
  }, [location.pathname]);

  const mainMenus = [
    {
      id: "monitoring",
      label: "모니터링",
      icon: "📊",
      hasSubMenus: true,
      route: null, // 서브메뉴가 있으므로 직접 route 없음
    },
    {
      id: "cpod",
      label: "rapeech-cpod KT-STT 4.0",
      icon: "📁",
      iconBg: "bg-[#2bb7b3]",
      isHighlight: true,
      hasSubMenus: true,
      route: null,
    },
  ];

  // 각 메인 메뉴의 서브메뉴 정의
  const subMenusData = {
    monitoring: [
      {
        items: [
          {
            id: "total",
            label: "통합 모니터링",
            icon: "📈",
            hasSubItems: false,
            route: "/monitoring",
          },
        ],
      },
    ],

    cpod: [
      {
        items: [
          {
            id: "settings",
            label: "설정",
            icon: "⚙️",
            hasSubItems: true,
            subItems: [
              {
                id: "common-settings",
                label: "공통설정",
                route: "/settings",
              },
            ],
          },
        ],
      },
    ],
  };

  // 메뉴 클릭 핸들러
  const handleMenuClick = (item) => {
    if (item.hasSubItems) {
      toggleSubMenu(item.id);
    } else if (item.route) {
      navigate(item.route);
    }
  };

  // 서브 메뉴 클릭 핸들러
  const handleSubMenuClick = (subItem) => {
    if (subItem.route) {
      navigate(subItem.route);
    }
  };

  return (
    <div className="flex h-screen">
      {/* 왼쪽 사이드바 - 앱 선택 */}
      <div className="w-[50px] bg-[#97a1a8] flex flex-col items-center py-4 gap-4">
        {/* 메뉴 아이콘 */}
        <button className="w-6 h-6 flex items-center justify-center">
          <svg
            className="w-5 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* 오른쪽 메뉴 영역 */}
      <div className="w-[250px] bg-[#f4f5f5] flex flex-col">
        {/* 로고 영역 */}
        <div className="h-[60px] flex items-center justify-center px-4 mt-6">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <div className="w-11 h-9 bg-[#2bb7b3]/20 rounded"></div>
              <h1 className="text-[28px] font-semibold text-[#221e1f] -tracking-tight">
                AMP
              </h1>
            </div>
            <p className="text-xs text-[#717a7a] mt-1 ml-0">
              AICC Management Portal
            </p>
          </div>
        </div>

        {/* 메뉴 리스트 */}
        <nav className="flex-1 px-3 mt-8 overflow-y-auto">
          {/* 모든 메인 메뉴들 */}
          {mainMenus.map((menu) => (
            <div key={menu.id} className="mb-2">
              {/* 메인 메뉴 버튼 */}
              <button
                onClick={() => menu.hasSubMenus && toggleMenu(menu.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  menu.isHighlight ? "bg-white shadow-sm" : "hover:bg-white/50"
                }`}
              >
                <div
                  className={`w-6 h-6 ${
                    menu.iconBg || "bg-white"
                  } rounded-xl flex items-center justify-center text-sm`}
                >
                  {menu.icon}
                </div>
                <span
                  className={`text-sm font-bold flex-1 text-left ${
                    menu.isHighlight ? "text-[#181b1b]" : "text-[#525b5b]"
                  }`}
                >
                  {menu.label}
                </span>
                {menu.hasSubMenus && (
                  <svg
                    className={`w-2 h-2 text-gray-400 transition-transform ${
                      expandedMenus[menu.id] ? "rotate-90" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <path d="M2 0L6 4L2 8V0Z" />
                  </svg>
                )}
              </button>

              {/* 서브 메뉴 */}
              {menu.hasSubMenus &&
                expandedMenus[menu.id] &&
                subMenusData[menu.id] && (
                  <div className="ml-3 mt-1 space-y-1">
                    {subMenusData[menu.id].map((category) => (
                      <div key={category.category}>
                        {/* 카테고리 아이템 */}
                        {category.items.map((item) => {
                          // 서브 아이템 중 현재 경로와 일치하는 것이 있는지 확인
                          const hasActiveSubItem =
                            item.hasSubItems &&
                            item.subItems.some(
                              (subItem) =>
                                subItem.route &&
                                location.pathname === subItem.route
                            );

                          return (
                            <div key={item.id}>
                              {/* 대메뉴 */}
                              <button
                                onClick={() => handleMenuClick(item)}
                                className={`w-full flex items-center gap-2 px-6 py-1.5 hover:bg-white/50 rounded transition-colors ${
                                  item.route && location.pathname === item.route
                                    ? "bg-white/30"
                                    : ""
                                }`}
                              >
                                <span className="text-xs">{item.icon}</span>
                                <span
                                  className={`text-xs font-semibold flex-1 text-left ${
                                    (item.route &&
                                      location.pathname === item.route) ||
                                    hasActiveSubItem
                                      ? "text-[#2bb7b3]"
                                      : "text-[#717a7a]"
                                  }`}
                                >
                                  {item.label}
                                </span>
                                {item.hasSubItems && (
                                  <svg
                                    className={`w-2 h-2 text-gray-400 transition-transform ${
                                      expandedSubMenus[item.id]
                                        ? "rotate-90"
                                        : ""
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 8 8"
                                  >
                                    <path d="M2 0L6 4L2 8V0Z" />
                                  </svg>
                                )}
                              </button>

                              {/* 소메뉴 */}
                              {item.hasSubItems &&
                                expandedSubMenus[item.id] &&
                                item.subItems.map((subItem) => (
                                  <button
                                    key={subItem.id}
                                    onClick={() => handleSubMenuClick(subItem)}
                                    className={`w-full flex items-center gap-2 px-9 py-1.5 hover:bg-white/50 rounded transition-colors group ${
                                      subItem.route &&
                                      location.pathname === subItem.route
                                        ? "bg-white/30"
                                        : ""
                                    }`}
                                  >
                                    <div
                                      className={`w-1.5 h-px ${
                                        subItem.route &&
                                        location.pathname === subItem.route
                                          ? "bg-[#2bb7b3]"
                                          : "bg-transparent"
                                      }`}
                                    ></div>
                                    <span
                                      className={`text-xs ${
                                        subItem.route &&
                                        location.pathname === subItem.route
                                          ? "text-[#2bb7b3] font-normal"
                                          : "text-[#717a7a] font-normal"
                                      }`}
                                    >
                                      {subItem.label}
                                    </span>
                                  </button>
                                ))}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
