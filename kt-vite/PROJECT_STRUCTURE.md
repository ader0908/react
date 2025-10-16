# 프로젝트 폴더 구조

이 문서는 React 프로젝트의 폴더 구조와 각 폴더의 역할을 설명합니다.

## 📁 전체 구조

```
kt-vite/
├── public/                 # 정적 파일 (index.html, favicon 등)
├── src/
│   ├── assets/            # 정적 자산 (이미지, 아이콘, 폰트)
│   │   ├── images/       # 이미지 파일
│   │   └── icons/        # 아이콘 파일
│   │
│   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── README.md
│   │   └── SchedulerSettingCard.jsx
│   │
│   ├── pages/            # 페이지 컴포넌트
│   │   ├── README.md
│   │   └── HomePage.jsx
│   │
│   ├── router/           # 라우팅 설정
│   │   ├── README.md
│   │   └── index.jsx
│   │
│   ├── hooks/            # 커스텀 React Hooks
│   │   └── README.md
│   │
│   ├── utils/            # 유틸리티 함수
│   │   └── README.md
│   │
│   ├── constants/        # 상수 정의
│   │   └── README.md
│   │
│   ├── styles/           # 공통 스타일
│   │   └── README.md
│   │
│   ├── App.jsx           # 메인 App 컴포넌트
│   ├── App.css           # App 스타일
│   ├── main.jsx          # 엔트리 포인트
│   └── index.css         # 전역 스타일 (Tailwind)
│
├── package.json
├── vite.config.js
└── PROJECT_STRUCTURE.md   # 이 파일
```

## 📂 폴더별 설명

### `/src/components`

재사용 가능한 UI 컴포넌트를 저장합니다.

- 버튼, 카드, 인풋, 모달 등
- Props를 통해 데이터를 받아 렌더링
- 독립적으로 작동하는 컴포넌트

**예시:**

```jsx
components/
  ├── Button.jsx
  ├── Card.jsx
  ├── Input.jsx
  ├── Modal.jsx
  └── SchedulerSettingCard.jsx
```

### `/src/pages`

라우터와 연결되는 페이지 단위 컴포넌트를 저장합니다.

- 여러 컴포넌트를 조합하여 페이지 구성
- 페이지별 로직과 상태 관리

**예시:**

```jsx
pages/
  ├── HomePage.jsx
  ├── SettingsPage.jsx
  ├── DashboardPage.jsx
  └── NotFoundPage.jsx
```

### `/src/router`

React Router 설정을 관리합니다.

- 라우트 정의
- 중첩 라우팅
- Protected Routes

**설치:**

```bash
npm install react-router-dom
```

### `/src/hooks`

커스텀 React Hook을 저장합니다.

- `use`로 시작하는 Hook
- 재사용 가능한 로직 캡슐화
- 상태 관리 로직

**예시:**

```jsx
hooks/
  ├── useAuth.js
  ├── useFetch.js
  ├── useForm.js
  └── useToggle.js
```

### `/src/utils`

유틸리티 함수들을 저장합니다.

- 순수 함수
- 헬퍼 함수
- 범용 함수

**예시:**

```jsx
utils/
  ├── formatDate.js
  ├── validation.js
  ├── formatNumber.js
  └── api.js
```

### `/src/constants`

상수값들을 정의합니다.

- API 엔드포인트
- 라우트 경로
- 색상, 메시지 등

**예시:**

```jsx
constants/
  ├── colors.js
  ├── routes.js
  ├── api.js
  └── messages.js
```

### `/src/styles`

공통 스타일 파일을 관리합니다.

- 전역 CSS
- CSS 변수
- 애니메이션
- Tailwind 커스터마이징

**예시:**

```css
styles/
  ├── globals.css
  ├── variables.css
  ├── animations.css
  └── themes.css
```

### `/src/assets`

정적 자산을 저장합니다.

- 이미지 파일
- 아이콘 파일
- 폰트 파일

**구조:**

```
assets/
  ├── images/
  ├── icons/
  └── fonts/
```

## 🎯 파일 네이밍 규칙

### 컴포넌트

- **PascalCase** 사용
- 예: `SchedulerSettingCard.jsx`, `HomePage.jsx`

### 유틸리티/Hook

- **camelCase** 사용
- Hook은 `use`로 시작
- 예: `formatDate.js`, `useAuth.js`

### 상수

- **UPPER_SNAKE_CASE** 사용 (파일 내부)
- 파일명은 camelCase
- 예: `colors.js` (내부에 `PRIMARY_COLOR`)

### 스타일

- **kebab-case** 사용
- 예: `global-styles.css`

## 🚀 시작하기

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 린트

```bash
npm run lint
```

## 📦 추천 패키지

### 라우팅

```bash
npm install react-router-dom
```

### 상태 관리 (필요시)

```bash
npm install zustand
# 또는
npm install @tanstack/react-query
```

### 폼 관리 (필요시)

```bash
npm install react-hook-form
```

### HTTP 클라이언트

```bash
npm install axios
```

## 💡 베스트 프랙티스

1. **컴포넌트는 작고 단일 책임을 가지도록** 작성
2. **재사용 가능한 로직은 Hook으로** 추출
3. **상수는 constants 폴더에서** 관리
4. **스타일은 Tailwind CSS를 우선** 사용
5. **파일명과 폴더 구조는 일관성** 유지
6. **주석과 문서화**를 생활화

## 📝 추가 정보

각 폴더의 `README.md` 파일을 참고하여 더 자세한 정보를 확인할 수 있습니다.
