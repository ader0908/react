# Router

라우팅 설정을 관리하는 폴더입니다.

## 설치

React Router를 사용하려면 먼저 설치가 필요합니다:

```bash
npm install react-router-dom
```

## 사용 방법

1. `index.jsx`에서 라우트를 정의합니다
2. `main.jsx`에서 RouterProvider를 설정합니다

## 예시

```jsx
// router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SettingsPage from "../pages/SettingsPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/settings", element: <SettingsPage /> },
]);

// main.jsx
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```
