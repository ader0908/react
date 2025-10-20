# 프로젝트 폴더 구조

이 문서는 React 프로젝트의 폴더 구조와 각 폴더의 역할을 설명합니다.

## 📁 전체 구조

```
kt-vite/
├── public/                 # 정적 파일
│   └── vite.svg
│
├── src/
│   ├── assets/            # 정적 자산
│   │   ├── react.svg
│   │   └── README.md
│   │
│   ├── components/        # 재사용 가능한 컴포넌트 (46개)
│   │   ├── README.md
│   │   ├── Button.jsx, Input.jsx, Select.jsx, Toggle.jsx
│   │   ├── Card.jsx, SectionCard.jsx, AccordionCard.jsx
│   │   ├── Chart.jsx, ChartCard.jsx
│   │   ├── Modal.jsx, Dropdown.jsx, Pagination.jsx
│   │   ├── DatePicker.jsx, DateRangePicker.jsx
│   │   ├── Table.jsx, TableHeader.jsx
│   │   ├── Layout.jsx, Header.jsx, Sidebar.jsx, PageHeader.jsx
│   │   ├── DashboardSection.jsx, DashboardForm.jsx
│   │   └── ... (기타 컴포넌트)
│   │
│   ├── pages/            # 페이지 컴포넌트
│   │   ├── README.md
│   │   ├── MainPage.jsx
│   │   ├── MonitoringPage.jsx
│   │   ├── SettingsPage.jsx
│   │   ├── TablePage.jsx
│   │   ├── SnippetPage.jsx
│   │   │
│   │   ├── monitoring/   # 모니터링 서브 페이지
│   │   │   ├── ChartList.jsx
│   │   │   ├── EngineList.jsx
│   │   │   ├── ServeList.jsx
│   │   │   └── modal/
│   │   │       ├── ChartSettingsModal.jsx
│   │   │       ├── DashboardManageModal.jsx
│   │   │       └── SelectSettingsModal.jsx
│   │   │
│   │   └── settings/     # 설정 서브 페이지
│   │       ├── agent/
│   │       │   ├── AgentSetting.jsx
│   │       │   ├── OperationSetting.jsx
│   │       │   └── TrainingSetting.jsx
│   │       ├── confidence/
│   │       │   ├── ConfidenceSetting.jsx
│   │       │   ├── ModelSetting.jsx
│   │       │   ├── CallBotSetting.jsx
│   │       │   └── ChatBotSettng.jsx
│   │       ├── delete/
│   │       │   ├── DeleteSetting.jsx
│   │       │   ├── DeletionCycleSetting.jsx
│   │       │   └── ServiceModelTargetSetting.jsx
│   │       ├── security/
│   │       │   ├── SecuritySetting.jsx
│   │       │   ├── EncryptionSetting.jsx
│   │       │   └── MiscellaneousSetting.jsx
│   │       └── system/
│   │           ├── SystemSetting.jsx
│   │           ├── SchedulerSetting.jsx
│   │           └── ResourceThresholdSetting.jsx
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
│   │   ├── README.md
│   │   └── Modal.css
│   │
│   ├── App.jsx           # 메인 App 컴포넌트
│   ├── App.css           # App 스타일
│   ├── main.jsx          # 엔트리 포인트
│   └── index.css         # 전역 스타일 (Tailwind)
│
├── dist/                  # 빌드 결과물
├── package.json
├── vite.config.js
├── README.md
└── PROJECT_STRUCTURE.md   # 이 파일
```

## 📂 폴더별 설명

### `/src/components`

재사용 가능한 UI 컴포넌트를 저장합니다.

- 버튼, 카드, 인풋, 모달 등
- Props를 통해 데이터를 받아 렌더링
- 독립적으로 작동하는 컴포넌트

**현재 컴포넌트 목록:**

```jsx
components/
  ├── Button.jsx, Input.jsx, Select.jsx, Toggle.jsx, Checkbox.jsx
  ├── Card.jsx, SectionCard.jsx, AccordionCard.jsx, ChartCard.jsx
  ├── Chart.jsx, Table.jsx, TableHeader.jsx, Pagination.jsx
  ├── Modal.jsx, Dropdown.jsx, SearchFilter.jsx
  ├── DatePicker.jsx, DateRangePicker.jsx, TimeRangeSelector.jsx
  ├── Layout.jsx, Header.jsx, Sidebar.jsx, PageHeader.jsx
  ├── DashboardSection.jsx, DashboardForm.jsx, DashboardListItem.jsx
  ├── EngineItemCard.jsx, ServerItemCard.jsx
  ├── SettingRow.jsx, ServiceModelRow.jsx
  └── ... (총 46개 컴포넌트)
```

### `/src/pages`

라우터와 연결되는 페이지 단위 컴포넌트를 저장합니다.

- 여러 컴포넌트를 조합하여 페이지 구성
- 페이지별 로직과 상태 관리
- 서브 페이지는 하위 폴더로 구조화

**현재 페이지 구조:**

```jsx
pages/
  ├── MainPage.jsx              # 메인 레이아웃
  ├── MonitoringPage.jsx        # 모니터링 페이지
  ├── SettingsPage.jsx          # 설정 페이지
  ├── TablePage.jsx             # 테이블 샘플
  ├── SnippetPage.jsx           # 스니펫 리스트
  │
  ├── monitoring/               # 모니터링 서브 페이지
  │   ├── ChartList.jsx
  │   ├── EngineList.jsx
  │   ├── ServeList.jsx
  │   └── modal/
  │
  └── settings/                 # 설정 서브 페이지
      ├── agent/                # 에이전트 설정
      ├── confidence/           # 신뢰도 설정
      ├── delete/               # 삭제 설정
      ├── security/             # 보안 설정
      └── system/               # 시스템 설정
```

### `/src/router`

React Router 설정을 관리합니다.

- 라우트 정의 (Hash Router 사용)
- 중첩 라우팅
- Protected Routes

**현재 라우트:**
```jsx
router/
  └── index.jsx             # createHashRouter 설정
                           # / → /monitoring
                           # /settings, /table, /snippet
```

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

**현재 스타일:**

```css
styles/
  └── Modal.css              # 모달 전용 스타일
```

**참고:** 대부분의 스타일은 Tailwind CSS로 처리하며, 필요한 경우에만 별도 CSS 파일 생성

### `/src/assets`

정적 자산을 저장합니다.

- 이미지 파일
- 아이콘 파일
- 폰트 파일

**현재 구조:**

```
assets/
  └── react.svg             # React 로고
```

**참고:** 필요에 따라 images/, icons/, fonts/ 하위 폴더 추가 가능

## 🎯 파일 네이밍 규칙

### 컴포넌트

- **PascalCase** 사용
- 예: `Button.jsx`, `DashboardSection.jsx`, `MainPage.jsx`

### 유틸리티/Hook

- **camelCase** 사용
- Hook은 `use`로 시작
- 예: `formatDate.js`, `useAuth.js`

### 상수

- **UPPER_SNAKE_CASE** 사용 (파일 내부)
- 파일명은 camelCase
- 예: `colors.js` (내부에 `PRIMARY_COLOR`)

### 스타일

- **PascalCase** 사용 (컴포넌트별 스타일)
- 예: `Modal.css`, `App.css`

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

## 📦 설치된 주요 패키지

### UI 프레임워크
```bash
@tailwindcss/vite          # Tailwind CSS (현재 사용 중)
```

### 라우팅
```bash
react-router-dom           # React Router (현재 사용 중)
```

### 추가 권장 패키지 (필요시)

**상태 관리:**
```bash
npm install zustand
# 또는
npm install @tanstack/react-query
```

**폼 관리:**
```bash
npm install react-hook-form
```

**HTTP 클라이언트:**
```bash
npm install axios
```

## 💡 베스트 프랙티스

1. **컴포넌트는 작고 단일 책임을 가지도록** 작성
2. **재사용 가능한 로직은 Hook으로** 추출
3. **상수는 constants 폴더에서** 관리
4. **스타일은 Tailwind CSS를 우선** 사용 (별도 CSS는 최소화)
5. **파일명과 폴더 구조는 일관성** 유지 (PascalCase for Components)
6. **주석과 문서화**를 생활화
7. **페이지별 서브 컴포넌트는 하위 폴더로 구조화** (예: pages/settings/agent/)
8. **Example 컴포넌트는 개발/테스트용으로만** 사용

## 📝 추가 정보

각 폴더의 `README.md` 파일을 참고하여 더 자세한 정보를 확인할 수 있습니다.

**README 파일 위치:**
- `/src/components/README.md` - 컴포넌트 가이드
- `/src/pages/README.md` - 페이지 가이드
- `/src/router/README.md` - 라우팅 가이드
- `/src/hooks/README.md` - Hook 가이드
- `/src/utils/README.md` - 유틸리티 가이드
- `/src/constants/README.md` - 상수 가이드
- `/src/styles/README.md` - 스타일 가이드

**프로젝트 루트:**
- `/README.md` - 프로젝트 실행 가이드
- `/PROJECT_STRUCTURE.md` - 이 파일 (구조 가이드)
