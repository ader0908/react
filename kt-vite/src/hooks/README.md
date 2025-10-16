# Hooks

커스텀 React Hook들을 저장하는 폴더입니다.

## 규칙

- Hook 이름은 `use`로 시작해야 합니다
- 재사용 가능한 로직을 캡슐화합니다
- 여러 컴포넌트에서 공통으로 사용하는 상태 관리 로직을 포함합니다

## 예시

```
hooks/
  ├── useAuth.js           // 인증 관련 Hook
  ├── useFetch.js          // 데이터 fetching Hook
  ├── useForm.js           // 폼 관리 Hook
  └── useLocalStorage.js   // localStorage 관리 Hook
```

## 사용 예시

```jsx
// hooks/useToggle.js
import { useState } from "react";

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);

  return [value, toggle];
};

// 컴포넌트에서 사용
import { useToggle } from "../hooks/useToggle";

const MyComponent = () => {
  const [isOpen, toggleOpen] = useToggle(false);

  return <button onClick={toggleOpen}>{isOpen ? "Close" : "Open"}</button>;
};
```
