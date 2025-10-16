# Constants

상수값들을 저장하는 폴더입니다.

## 규칙

- 변하지 않는 값들을 정의합니다
- 대문자와 언더스코어(\_)로 작성합니다
- 여러 곳에서 사용되는 공통 값들을 관리합니다

## 예시

```
constants/
  ├── colors.js           // 색상 상수
  ├── routes.js           // 라우트 경로
  ├── api.js             // API 엔드포인트
  └── messages.js        // 메시지 텍스트
```

## 사용 예시

```jsx
// constants/colors.js
export const COLORS = {
  PRIMARY: "#ed1b23",
  SECONDARY: "#2bb7b3",
  DARK: "#181b1b",
  GRAY: "#a1a9aa",
  LIGHT_GRAY: "#f4f5f5",
};

// constants/routes.js
export const ROUTES = {
  HOME: "/",
  SETTINGS: "/settings",
  DASHBOARD: "/dashboard",
  NOT_FOUND: "/404",
};

// constants/api.js
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  AUTH: "/api/auth",
  USERS: "/api/users",
  SETTINGS: "/api/settings",
};

// constants/messages.js
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "필수 입력 항목입니다.",
  INVALID_EMAIL: "올바른 이메일 형식이 아닙니다.",
  NETWORK_ERROR: "네트워크 오류가 발생했습니다.",
};

// 컴포넌트에서 사용
import { COLORS } from "../constants/colors";
import { ROUTES } from "../constants/routes";
```
