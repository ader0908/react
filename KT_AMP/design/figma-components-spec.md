# Figma 컴포넌트 상세 스펙

## 📅 작성일: 2024년 12월 19일

## 🎯 Figma 파일 구조

### 페이지 구성
```
📁 Design System
  ├── 🎨 Color Styles
  ├── 📝 Text Styles  
  ├── 🧩 Components
  └── 📐 Layout Grids

📁 Desktop (1920x1080)
  └── 🖥️ System Monitoring Dashboard

📁 Tablet (768x1024)
  └── 📱 Responsive Dashboard

📁 Mobile (375x812)
  └── 📱 Mobile Dashboard
```

## 🎨 Figma Color Styles 생성

### 1. 브랜드 컬러
```
KT/Red/Primary: #e31e24
KT/Red/Light: #ff4449
KT/Red/Dark: #c41e3a
```

### 2. 시스템 리소스 컬러
```
System/CPU/Primary: #3b82f6
System/CPU/Light: #60a5fa
System/CPU/Dark: #1d4ed8
System/CPU/Background: #eff6ff

System/Memory/Primary: #10b981
System/Memory/Light: #34d399
System/Memory/Dark: #047857
System/Memory/Background: #ecfdf5

System/Storage/Primary: #8b5cf6
System/Storage/Light: #a78bfa
System/Storage/Dark: #7c3aed
System/Storage/Background: #f3e8ff

System/Network/Primary: #f59e0b
System/Network/Light: #fbbf24
System/Network/Dark: #d97706
System/Network/Background: #fffbeb
```

### 3. 상태 컬러
```
Status/Excellent: #059669
Status/Good: #65a30d
Status/Warning: #d97706
Status/Critical: #dc2626
Status/Offline: #6b7280
```

### 4. 중성 컬러
```
Neutral/50: #f9fafb
Neutral/100: #f3f4f6
Neutral/200: #e5e7eb
Neutral/300: #d1d5db
Neutral/400: #9ca3af
Neutral/500: #6b7280
Neutral/600: #4b5563
Neutral/700: #374151
Neutral/800: #1f2937
Neutral/900: #111827
```

## 📝 Figma Text Styles 생성

### 헤딩 스타일
```
Heading/H1: Noto Sans KR, 48px, Bold (700)
Heading/H2: Noto Sans KR, 36px, Bold (700)
Heading/H3: Noto Sans KR, 30px, Bold (700)
Heading/H4: Noto Sans KR, 24px, Semibold (600)
Heading/H5: Noto Sans KR, 20px, Semibold (600)
Heading/H6: Noto Sans KR, 18px, Semibold (600)
```

### 본문 스타일
```
Body/Large: Noto Sans KR, 18px, Regular (400)
Body/Base: Noto Sans KR, 16px, Regular (400)
Body/Small: Noto Sans KR, 14px, Regular (400)
Body/XSmall: Noto Sans KR, 12px, Regular (400)
```

### 특수 스타일
```
Metric/Value: Noto Sans KR, 32px, Bold (700)
Chart/Title: Noto Sans KR, 20px, Bold (700)
Card/Title: Noto Sans KR, 16px, Semibold (600)
Label/Base: Noto Sans KR, 14px, Medium (500)
Caption: Noto Sans KR, 12px, Regular (400)
```

## 🧩 기본 컴포넌트

### 1. Icon Component
```
크기: 20x20px (기본)
변형: 16px, 20px, 24px, 32px, 40px
컬러: Neutral/600 (기본)
상태: Default, Hover, Active, Disabled
```

### 2. Button Component
```
높이: 40px (기본)
패딩: 12px 24px
둥근 모서리: 8px
폰트: Body/Small, Medium (500)

변형:
- Primary: KT Red Background, White Text
- Secondary: Neutral/100 Background, Neutral/700 Text  
- Ghost: Transparent Background, Primary Text

상태:
- Default
- Hover: transform translateY(-1px), Shadow MD
- Active: transform translateY(0px)
- Disabled: Opacity 50%
```

### 3. Progress Bar Component
```
높이: 8px
배경: Neutral/200
둥근 모서리: 4px
변형: CPU(Blue), Memory(Green), Storage(Purple), Network(Orange)
애니메이션: width transition 0.5s ease
```

### 4. Status Badge Component
```
높이: 24px
패딩: 4px 12px
둥근 모서리: 9999px
폰트: Caption, Bold (700)

변형:
- Excellent: Status/Excellent Background, White Text
- Good: Status/Good Background, White Text
- Warning: Status/Warning Background, White Text
- Critical: Status/Critical Background, White Text
```

## 🏗️ 복합 컴포넌트

### 1. Metric Card Component
```
크기: 395 x 180px
배경: Background/Primary
패딩: 20px
둥근 모서리: 12px
그림자: Shadow Base
상단 테두리: 4px

Auto Layout:
├── Top Border (4px height, colored)
├── Header Row (Space Between)
│   ├── Info Column
│   │   ├── Title (Card/Title)
│   │   └── Description (Body/XSmall, Neutral/600)
│   └── Icon (40x40px, Gradient Background)
├── Spacer (16px)
├── Value (Metric/Value, Resource Color)
├── Spacer (8px)
├── Details Row (Space Between)
│   ├── Change Indicator (Body/Small)
│   └── Status Badge
├── Spacer (16px)
└── Progress Bar

변형: CPU, Memory, Storage, Network
상태: Default, Hover (translateY -2px, Shadow LG)
```

### 2. Chart Container Component
```
배경: Background/Primary
패딩: 24px
둥근 모서리: 12px
그림자: Shadow Base

Auto Layout:
├── Header Row (Space Between)
│   ├── Title (Chart/Title)
│   └── Controls Row (8px gap)
│       ├── Button (1시간)
│       ├── Button (6시간)
│       ├── Button (24시간)
│       └── Button (7일)
├── Spacer (16px)
└── Chart Area (Fill Container)

변형: Main Chart (1093x420px), Donut Chart (547x420px)
```

### 3. Server Item Component
```
높이: 48px
배경: Neutral/50
패딩: 12px 16px
둥근 모서리: 8px

Auto Layout (Space Between):
├── Left Section
│   ├── Status Indicator (12px circle)
│   ├── Spacer (12px)
│   └── Info Column
│       ├── Server Name (Label/Base, Bold)
│       └── Metrics (Caption, Neutral/600)
└── Right Section (Optional)

상태: Online (Green), Warning (Orange), Offline (Gray)
```

### 4. Alert Item Component  
```
배경: Background/Secondary
패딩: 16px
둥근 모서리: 8px
좌측 테두리: 4px (상태별 컬러)

Auto Layout:
├── Left Border (4px width, colored)
├── Content Section
│   ├── Icon + Title Row
│   │   ├── Icon (20px, colored)
│   │   ├── Spacer (12px)
│   │   └── Title (Label/Base, Bold)
│   ├── Spacer (4px)
│   ├── Description (Body/Small, Neutral/600)
│   ├── Spacer (8px)
│   └── Time (Caption, Neutral/500)

변형: Warning, Critical, Info
```

## 📱 반응형 변형

### Desktop (1920x1080)
```
Container: 1920px width
Sidebar: 280px fixed width
Main Content: 1640px flex
Metric Grid: 4 columns, 16px gap
Chart Grid: 2fr + 1fr
```

### Tablet (768x1024)
```
Container: 768px width
Sidebar: 100% width, 80px height (horizontal)
Metric Grid: 2 columns, 12px gap  
Chart Grid: Stack vertically
```

### Mobile (375x812)
```
Container: 375px width
Sidebar: Hidden/Drawer
Metric Grid: 1 column, 12px gap
Chart Grid: Stack vertically
Padding: 12px
```

## 🎭 인터랙션 및 프로토타이핑

### 호버 상태
```
Metric Card:
- Property: transform
- Value: translateY(-2px)
- Duration: 300ms
- Easing: ease-out

Button:
- Property: background-color, transform
- Value: Darker color, translateY(-1px)
- Duration: 200ms
- Easing: ease-out
```

### 클릭 상태
```
Button:
- Property: transform
- Value: translateY(0px)
- Duration: 100ms
- Easing: ease-in
```

### 차트 전환
```
Chart Control:
- Property: background-color, color
- Value: KT Red, White
- Duration: 200ms
- Easing: ease-out
```

## 🔧 Figma 플러그인 추천

### 디자인 시스템
1. **Design System Organizer**: 컴포넌트 정리
2. **Color Palettes**: 컬러 시스템 관리
3. **Typography**: 타이포그래피 시스템

### 차트 및 데이터
1. **Chart**: 차트 컴포넌트 생성
2. **Data Visualizer**: 데이터 시각화
3. **Charts & Graphs**: 다양한 차트 템플릿

### 프로토타이핑
1. **ProtoPie Connect**: 고급 인터랙션
2. **Figmotion**: 애니메이션 생성
3. **Principle**: 마이크로 인터랙션

### 개발 연동
1. **Design Tokens**: 디자인 토큰 생성
2. **Code Export**: CSS/React 코드 생성
3. **Figma to Code**: 자동 코드 변환

## 📋 체크리스트

### 디자인 시스템 구축
- [ ] Color Styles 생성 (브랜드, 시스템, 상태, 중성)
- [ ] Text Styles 생성 (헤딩, 본문, 특수)
- [ ] Effect Styles 생성 (그림자)
- [ ] Grid Styles 생성 (레이아웃 그리드)

### 기본 컴포넌트
- [ ] Icon 컴포넌트 (변형 및 상태)
- [ ] Button 컴포넌트 (변형 및 상태)
- [ ] Progress Bar 컴포넌트
- [ ] Status Badge 컴포넌트

### 복합 컴포넌트
- [ ] Metric Card 컴포넌트 (4가지 변형)
- [ ] Chart Container 컴포넌트 (2가지 변형)
- [ ] Server Item 컴포넌트
- [ ] Alert Item 컴포넌트

### 레이아웃 컴포넌트
- [ ] Sidebar 컴포넌트
- [ ] Header 컴포넌트
- [ ] Main Content 컴포넌트

### 페이지 조립
- [ ] Desktop Dashboard (1920x1080)
- [ ] Tablet Dashboard (768x1024)
- [ ] Mobile Dashboard (375x812)

### 프로토타이핑
- [ ] 호버 상태 인터랙션
- [ ] 버튼 클릭 인터랙션
- [ ] 차트 전환 인터랙션
- [ ] 반응형 브레이크포인트

이 가이드를 따라 Figma에서 체계적으로 시스템 모니터링 대시보드를 구축하실 수 있습니다. 각 단계별로 체크리스트를 활용하여 누락 없이 완성해보세요!
