# 🎨 Figma 편집 가능한 컴포넌트 Import 가이드

## 📅 생성일: 2024년 12월 19일

## 🎯 개요

`figma-editable-components.json` 파일을 사용하여 시스템 모니터링 대시보드를 Figma에서 편집 가능한 형태로 구현하는 완전한 가이드입니다.

---

## 📁 파일 구조

### 생성된 JSON 컴포넌트 파일
```
📂 KT_AMP/design/
└── 🎨 figma-editable-components.json  ⭐ 신규 생성
    ├── 아트보드 정의 (Desktop 1920x1080)
    ├── 컬러 스타일 30개 (브랜드, 시스템, 상태, 중성)
    ├── 텍스트 스타일 7개 (헤딩, 본문, 메트릭)
    ├── 이펙트 스타일 4개 (그림자)
    ├── 컴포넌트 15개 (기본 + 복합)
    ├── 인터랙션 정의
    └── 반응형 브레이크포인트
```

---

## 🚀 Method 1: Figma 플러그인 활용 (추천)

### 1.1 Design Tokens 플러그인 사용
```
1️⃣ Figma에서 "Design Tokens" 플러그인 설치
   - Plugins → Browse plugins → "Design Tokens" 검색
   - "Figma Tokens" 플러그인 설치

2️⃣ JSON 파일 준비
   - figma-editable-components.json 파일 열기
   - colorStyles, textStyles, effects 섹션 복사

3️⃣ 플러그인으로 Import
   - Plugins → Figma Tokens 실행
   - "Import" 탭에서 JSON 데이터 붙여넣기
   - "Apply to Figma" 클릭

⏱️ 소요시간: 5분
✅ 결과: 모든 Color/Text/Effect Styles 자동 생성
```

### 1.2 Component Importer 플러그인 사용
```
1️⃣ "Component Importer" 플러그인 설치
2️⃣ components 섹션 데이터 활용
3️⃣ 기본 컴포넌트 구조 자동 생성

⏱️ 소요시간: 10분
✅ 결과: 기본 컴포넌트 프레임 자동 생성
```

---

## 🔧 Method 2: 수동 생성 (정확한 제어)

### 2.1 새 Figma 파일 생성
```
1️⃣ Figma 접속 → "Create new design file"
2️⃣ 파일명: "KT-STT 시스템 모니터링 대시보드"
3️⃣ 페이지 생성:
   - 🎨 Design System
   - 🖥️ Desktop (1920x1080)
   - 📱 Tablet (768x1024)
   - 📱 Mobile (375x812)
   - 🧩 Components
```

### 2.2 Color Styles 생성 (JSON 기반)
```
🎨 Design System 페이지에서:

브랜드 컬러 (3개):
- KT/Red/Primary: #e31e24
- KT/Red/Light: #ff4449
- KT/Red/Dark: #c41e3a

시스템 컬러 (16개):
CPU 계열:
- System/CPU/Primary: #3b82f6
- System/CPU/Light: #60a5fa
- System/CPU/Dark: #1d4ed8
- System/CPU/Background: #eff6ff

Memory 계열:
- System/Memory/Primary: #10b981
- System/Memory/Light: #34d399
- System/Memory/Dark: #047857
- System/Memory/Background: #ecfdf5

Storage 계열:
- System/Storage/Primary: #8b5cf6
- System/Storage/Light: #a78bfa
- System/Storage/Dark: #7c3aed
- System/Storage/Background: #f3e8ff

Network 계열:
- System/Network/Primary: #f59e0b
- System/Network/Light: #fbbf24
- System/Network/Dark: #d97706
- System/Network/Background: #fffbeb

상태 컬러 (5개):
- Status/Excellent: #059669
- Status/Good: #65a30d
- Status/Warning: #d97706
- Status/Critical: #dc2626
- Status/Offline: #6b7280

중성 컬러 (10개):
- Neutral/50: #f9fafb
- Neutral/100: #f3f4f6
- Neutral/200: #e5e7eb
- Neutral/300: #d1d5db
- Neutral/400: #9ca3af
- Neutral/500: #6b7280
- Neutral/600: #4b5563
- Neutral/700: #374151
- Neutral/800: #1f2937
- Neutral/900: #111827

배경 컬러 (3개):
- Background/Primary: #ffffff
- Background/Secondary: #f8fafc
- Background/Tertiary: #f1f5f9
```

### 2.3 Text Styles 생성 (JSON 기반)
```
Heading 스타일:
- Heading/H1: Noto Sans KR, 32px, Bold (700)
- Heading/H2: Noto Sans KR, 20px, Bold (700)

Body 스타일:
- Body/Base: Noto Sans KR, 14px, Regular (400)
- Body/Small: Noto Sans KR, 12px, Regular (400)

특수 스타일:
- Metric/Value: Noto Sans KR, 32px, Bold (700)
- Card/Title: Noto Sans KR, 16px, Semibold (600)
- Caption: Noto Sans KR, 10px, Regular (400)
```

### 2.4 Effect Styles 생성 (JSON 기반)
```
그림자 스타일:
- Shadow/SM: Drop shadow, 0px 1px 2px rgba(0,0,0,0.05)
- Shadow/Base: Drop shadow, 0px 1px 3px rgba(0,0,0,0.1)
- Shadow/MD: Drop shadow, 0px 4px 6px rgba(0,0,0,0.1)
- Shadow/LG: Drop shadow, 0px 10px 15px rgba(0,0,0,0.1)
```

---

## 🧩 Method 3: 컴포넌트 구조 생성

### 3.1 메인 컨테이너 생성
```
🖥️ Desktop 페이지에서:

1️⃣ Frame 생성: 1920 x 1080px
   - 이름: "Desktop Dashboard"
   - Fill: Linear gradient (135°, #f8fafc → #f1f5f9)

2️⃣ Auto Layout 적용:
   - Direction: Horizontal
   - Padding: 0
   - Gap: 0

3️⃣ 하위 프레임 2개 생성:
   - Sidebar: 280px (fixed)
   - Main Content: Fill container
```

### 3.2 사이드바 컴포넌트 (JSON 구조 기반)
```
Sidebar (280 x 1080px):
├── Fill: #ffffff
├── Effect: Shadow/LG
├── Auto Layout: Vertical, Padding 24px, Gap 32px
└── Children:
    ├── Header
    │   ├── "AICP MANAGEMENT PORTAL" (Body/Base, Bold)
    │   └── "HW 리소스 현황" (Body/Small, Neutral/600)
    └── Navigation
        └── PROJECT Section
            ├── "PROJECT" (Caption, Neutral/400, Uppercase)
            ├── "홈 현황" (Inactive)
            ├── "HW 리소스 현황" (Active, KT Red)
            └── "성능 분석" (Inactive)
```

### 3.3 헤더 컴포넌트 (JSON 구조 기반)
```
Header (1592 x 120px):
├── Fill: Linear gradient (135°, #e31e24 → #c41e3a)
├── Corner radius: 12px
├── Effect: Shadow/LG
├── Auto Layout: Horizontal, Space Between, Padding 24px
└── Children:
    ├── Left Section
    │   ├── "KT-STT 시스템 모니터링" (Heading/H1, White)
    │   └── "실시간 하드웨어 리소스 및 성능 현황" (Body/Base, White 90%)
    └── Right Section
        ├── Status Dot (12px, #059669, Pulse animation)
        └── "KT-STT 서비스 정상" (Body/Base, White, Bold)
```

### 3.4 메트릭 카드 컴포넌트 (JSON 구조 기반)
```
Metric Card (395 x 180px):
├── Fill: #ffffff
├── Corner radius: 12px
├── Effect: Shadow/Base
├── Auto Layout: Vertical, Padding 20px, Gap 12px
└── Structure:
    ├── Top Border (4px height, variant color)
    ├── Header (Auto Layout, Space Between)
    │   ├── Info Column
    │   │   ├── Title (Card/Title, variant text)
    │   │   └── Description (Body/Small, Neutral/600)
    │   └── Icon (40x40px, variant gradient)
    ├── Value (Metric/Value, variant color)
    ├── Details (Auto Layout, Space Between)
    │   ├── Change (+/-%, Body/Small, status color)
    │   └── Status Badge (variant status)
    └── Progress Bar (variant color, dynamic width)

Variants:
- CPU: Blue theme, "CPU 사용률", microchip icon
- Memory: Green theme, "메모리 사용률", memory icon  
- Storage: Purple theme, "스토리지 사용률", hdd icon
- Network: Orange theme, "네트워크 사용률", network icon

States:
- Default: Static appearance
- Hover: translateY(-2px), Shadow/LG
```

### 3.5 차트 컨테이너 컴포넌트 (JSON 구조 기반)
```
Chart Container:
├── Fill: #ffffff
├── Corner radius: 12px
├── Effect: Shadow/Base
├── Auto Layout: Vertical, Padding 24px, Gap 16px
└── Structure:
    ├── Header (Auto Layout, Space Between)
    │   ├── Title (Heading/H2, variant title)
    │   └── Controls (Auto Layout, Gap 8px)
    │       ├── "1시간" (Chart Control)
    │       ├── "6시간" (Chart Control, Active)
    │       ├── "24시간" (Chart Control)
    │       └── "7일" (Chart Control)
    └── Chart Area (Fill container, variant height)
        └── Placeholder (Neutral/50, rounded)

Variants:
- Main: 1093x420px, "시스템 리소스 추이", 350px chart
- Donut: 547x420px, "리소스 분포", 250px chart
```

---

## 🎭 Method 4: 인터랙션 및 애니메이션

### 4.1 호버 효과 (JSON 기반)
```
Metric Card Hover:
- Property: transform
- Value: translateY(-2px)
- Effect: Shadow/LG
- Duration: 300ms
- Easing: ease-out

Chart Control Hover:
- Property: background
- Value: #ff4449
- Property: color
- Value: #ffffff
- Duration: 200ms
- Easing: ease-out
```

### 4.2 클릭 상태 (JSON 기반)
```
Chart Control Click:
- Property: background
- Value: #e31e24
- Property: color  
- Value: #ffffff
- State: Active
- Duration: 200ms
```

### 4.3 애니메이션 (JSON 기반)
```
Status Indicator Pulse:
- Property: opacity
- Values: [1, 0.5, 1]
- Duration: 2000ms
- Easing: ease-in-out
- Iterations: infinite
```

---

## 📱 Method 5: 반응형 버전 생성

### 5.1 Tablet Layout (768x1024px)
```
변경사항 (JSON breakpoints 기반):
- Container: Direction → Vertical
- Sidebar: 768px width, 80px height
- Metrics Grid: 2x2 layout
- Charts: Vertical stack
```

### 5.2 Mobile Layout (375x812px)
```
변경사항 (JSON breakpoints 기반):
- Sidebar: Hidden
- Metrics Grid: 1 column
- Padding: Reduced to 12px
- Font sizes: Scaled down
```

---

## 🔧 실제 구현 단계

### Step 1: 기본 설정 (10분)
```
□ Figma 파일 생성
□ 페이지 구조 설정
□ figma-editable-components.json 파일 준비
```

### Step 2: 디자인 시스템 (20분)
```
□ Color Styles 30개 생성 (JSON colorStyles 참조)
□ Text Styles 7개 생성 (JSON textStyles 참조)
□ Effect Styles 4개 생성 (JSON effects 참조)
```

### Step 3: 기본 컴포넌트 (30분)
```
□ Status Badge 컴포넌트 (JSON statusBadge 구조)
□ Progress Bar 컴포넌트 (JSON progressBar 구조)
□ Chart Control 컴포넌트 (JSON chartControl 구조)
```

### Step 4: 복합 컴포넌트 (60분)
```
□ Metric Card 컴포넌트 (JSON metricCard 구조)
  └ 4가지 Variants: CPU, Memory, Storage, Network
  └ 2가지 States: Default, Hover
□ Chart Container 컴포넌트 (JSON chartContainer 구조)
  └ 2가지 Variants: Main, Donut
```

### Step 5: 레이아웃 조립 (40분)
```
□ Main Container (JSON container 구조)
□ Sidebar (JSON sidebar 구조)
□ Header (JSON header 구조)
□ Metrics Grid (JSON metrics-grid 구조)
□ Charts Section (JSON charts-section 구조)
□ Details Section (JSON details-section 구조)
```

### Step 6: 인터랙션 (15분)
```
□ 호버 효과 (JSON interactions 참조)
□ 클릭 상태 (JSON interactions 참조)
□ 애니메이션 (JSON interactions 참조)
```

### Step 7: 반응형 (20분)
```
□ Tablet 버전 (JSON responsiveBreakpoints 참조)
□ Mobile 버전 (JSON responsiveBreakpoints 참조)
```

---

## 🎯 완성 체크리스트

### 디자인 시스템
```
□ Color Styles 30개 (브랜드 3 + 시스템 16 + 상태 5 + 중성 10 + 배경 3)
□ Text Styles 7개 (헤딩 2 + 본문 2 + 특수 3)
□ Effect Styles 4개 (그림자 4개)
```

### 컴포넌트 시스템
```
□ Status Badge (4 variants: excellent, good, warning, critical)
□ Progress Bar (4 variants: cpu, memory, storage, network)
□ Chart Control (3 states: default, active, hover)
□ Metric Card (4 variants × 2 states = 8 combinations)
□ Chart Container (2 variants: main, donut)
□ Details Card (2 variants: serverStatus, alerts)
```

### 레이아웃
```
□ Desktop Layout (1920x1080px)
  └ Container → Sidebar (280px) + Main Content (1640px)
  └ Main Content → Header + Metrics + Charts + Details
□ Tablet Layout (768x1024px)
□ Mobile Layout (375x812px)
```

### 인터랙션
```
□ Metric Card hover animation
□ Chart Control click states
□ Status indicator pulse animation
□ Responsive transitions
```

---

## 💡 Pro Tips

### JSON 활용 팁
```
1. 🎯 정확한 수치 활용
   - JSON의 width, height 값 그대로 사용
   - 색상 HEX 코드 정확히 입력
   - Corner radius, padding 값 준수

2. ⚡ 구조 복사 활용
   - JSON children 구조를 Figma Auto Layout으로 구현
   - 계층 구조 그대로 재현
   - Variant properties JSON 참조

3. 🔄 데이터 바인딩
   - JSON data 객체를 Component Properties로 설정
   - 동적 값 변경 가능하도록 구성
```

### 효율성 향상
```
1. 🚀 플러그인 활용
   - Design Tokens → 스타일 일괄 생성
   - Component Importer → 구조 자동 생성
   - Figma to Code → 개발 연동

2. 📋 체크리스트 활용
   - 단계별 완성도 확인
   - 누락 요소 방지
   - 품질 보장
```

### 협업 최적화
```
1. 🤝 팀 공유
   - Component Library 게시
   - Design System 문서화
   - JSON 파일 개발팀 공유

2. 📚 문서화
   - 컴포넌트 사용법 설명
   - Variant 변경 방법
   - 인터랙션 동작 설명
```

---

## 🎉 완성 후 결과

### 얻을 수 있는 것
```
✅ 실제 웹페이지와 100% 동일한 Figma 파일
✅ 편집 가능한 모든 컴포넌트
✅ 완전한 디자인 시스템
✅ 반응형 레이아웃
✅ 인터랙티브 프로토타입
✅ 개발팀 핸드오프 준비 완료
```

### 활용 방안
```
🎨 디자인: 다른 대시보드 제작 시 재사용
🔄 프로토타이핑: 사용자 테스트 및 검증
🤝 협업: 팀 전체 디자인 일관성 유지
⚡ 개발: 정확한 스펙 기반 구현
📈 확장: 새로운 기능 추가 시 기반 활용
```

이제 **JSON 기반의 정확한 스펙으로 Figma에서 완벽하게 편집 가능한 시스템 모니터링 대시보드**를 만드실 수 있습니다! 🚀✨