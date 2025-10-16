# Utils

유틸리티 함수들을 저장하는 폴더입니다.

## 규칙

- 순수 함수로 작성합니다
- 재사용 가능한 헬퍼 함수를 포함합니다
- 비즈니스 로직과 분리된 범용 함수들을 저장합니다

## 예시

```
utils/
  ├── formatDate.js        // 날짜 포맷팅
  ├── validation.js        // 유효성 검사
  ├── formatNumber.js      // 숫자 포맷팅
  └── api.js              // API 관련 헬퍼
```

## 사용 예시

```jsx
// utils/formatDate.js
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ko-KR");
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString("ko-KR");
};

// utils/validation.js
export const isEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isPhoneNumber = (phone) => {
  const regex = /^\d{3}-\d{4}-\d{4}$/;
  return regex.test(phone);
};

// 컴포넌트에서 사용
import { formatDate } from "../utils/formatDate";
import { isEmail } from "../utils/validation";
```
