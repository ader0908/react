# 시스템 모니터링 대시보드 - Figma 편집 템플릿

## 📅 생성일: 2024년 12월 19일
## 🔗 원본 페이지: file:///C:/work/라피치/amp-curser/KT_AMP/pages/system-monitoring-enhanced.html

## 🎯 Figma 파일 생성 가이드

### 1. 새 Figma 파일 설정
```
파일명: KT-STT 시스템 모니터링 대시보드
URL: https://www.figma.com/
```

### 2. 페이지 구조 생성
```
📁 🎨 Design System
📁 🖥️ Desktop (1920x1080)
📁 📱 Tablet (768x1024)  
📁 📱 Mobile (375x812)
📁 🧩 Components
📁 📋 Documentation
```

## 🎨 Step 1: Design System 페이지 구축

### Color Styles 생성 (정확한 색상값)

#### 브랜드 컬러
```
KT/Red/Primary: #e31e24
KT/Red/Light: #ff4449
KT/Red/Dark: #c41e3a
```

#### 시스템 리소스 컬러  
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

#### 상태 컬러
```
Status/Excellent: #059669
Status/Good: #65a30d
Status/Warning: #d97706
Status/Critical: #dc2626
Status/Offline: #6b7280
```

#### 중성 컬러
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

#### 배경 컬러
```
Background/Primary: #ffffff
Background/Secondary: #f8fafc
Background/Tertiary: #f1f5f9
Surface: #ffffff
Surface/Hover: #f8fafc
```

### Text Styles 생성

#### 헤딩 스타일
```
Heading/H1: Noto Sans KR, 32px, Bold (700)
Heading/H2: Noto Sans KR, 20px, Bold (700)
Heading/H3: Noto Sans KR, 18px, Semibold (600)
```

#### 본문 스타일
```
Body/Large: Noto Sans KR, 16px, Regular (400)
Body/Base: Noto Sans KR, 14px, Regular (400)
Body/Small: Noto Sans KR, 12px, Regular (400)
Body/XSmall: Noto Sans KR, 10px, Regular (400)
```

#### 특수 스타일
```
Metric/Value: Noto Sans KR, 32px, Bold (700)
Metric/Small: Noto Sans KR, 24px, Bold (700)
Chart/Title: Noto Sans KR, 20px, Bold (700)
Card/Title: Noto Sans KR, 16px, Semibold (600)
Label/Base: Noto Sans KR, 14px, Medium (500)
Caption: Noto Sans KR, 12px, Regular (400)
```

### Effect Styles 생성

#### 그림자
```
Shadow/SM: Drop shadow, 0px 1px 2px rgba(0,0,0,0.05)
Shadow/Base: Drop shadow, 0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06)
Shadow/MD: Drop shadow, 0px 4px 6px rgba(0,0,0,0.1), 0px 2px 4px rgba(0,0,0,0.06)
Shadow/LG: Drop shadow, 0px 10px 15px rgba(0,0,0,0.1), 0px 4px 6px rgba(0,0,0,0.05)
Shadow/XL: Drop shadow, 0px 20px 25px rgba(0,0,0,0.1), 0px 10px 10px rgba(0,0,0,0.04)
```

## 🏗️ Step 2: Components 페이지 - 기본 컴포넌트

### 2.1 Icon Component
```
크기: 20x20px (Master)
변형: 16px, 20px, 24px, 32px, 40px
컬러: Neutral/600 (기본)
상태: Default, Hover, Active, Disabled
```

**제작 방법:**
1. Square(20x20px) 생성
2. Icon placeholder 추가 (Iconify 플러그인 활용)
3. Create component
4. Add variant: Size (16, 20, 24, 32, 40)
5. Add variant: State (Default, Hover, Active, Disabled)

### 2.2 Button Component
```
높이: 40px
패딩: 12px 24px  
둥근 모서리: 8px
폰트: Body/Base, Medium (500)
```

**제작 방법:**
1. Rectangle 생성 → Auto layout 적용
2. Text 추가: "Button"
3. Padding: 12px 24px
4. Corner radius: 8px
5. Create component
6. Add variants:
   - Type: Primary, Secondary, Ghost
   - Size: Small(32px), Medium(40px), Large(48px)
   - State: Default, Hover, Active, Disabled

### 2.3 Progress Bar Component
```
높이: 8px
배경: Neutral/200
둥근 모서리: 4px
변형: CPU, Memory, Storage, Network
```

**제작 방법:**
1. Rectangle(300x8px) - 배경
2. Rectangle(150x8px) - 진행률  
3. 둘 다 Corner radius: 4px
4. Group → Create component
5. Add variants: Type (CPU, Memory, Storage, Network)
6. Add variants: Value (25%, 50%, 75%, 100%)

### 2.4 Status Badge Component
```
높이: 24px
패딩: 4px 12px
둥근 모서리: 9999px
폰트: Caption, Bold (700)
```

**제작 방법:**
1. Rectangle → Auto layout
2. Text: "EXCELLENT"
3. Padding: 4px 12px
4. Corner radius: 9999px
5. Create component
6. Add variants: Status (Excellent, Good, Warning, Critical)

## 🧩 Step 3: Components 페이지 - 복합 컴포넌트

### 3.1 Metric Card Component
```
크기: 395 x 180px
배경: Background/Primary
패딩: 20px
둥근 모서리: 12px
그림자: Shadow/Base
상단 테두리: 4px
```

**제작 방법:**
1. **Frame 생성**: 395x180px
2. **배경 설정**: Background/Primary, Corner radius 12px, Shadow/Base
3. **상단 컬러 바**: Rectangle(395x4px), 각 리소스별 색상
4. **Auto layout 적용**: Vertical, Gap 16px, Padding 20px

**내부 구조:**
```
┌─ Top Border (4px, 각 리소스 색상)
├─ Header Row (Auto Layout, Space Between)
│  ├─ Info Column (Auto Layout, Vertical)
│  │  ├─ Title: "CPU 사용률" (Card/Title)
│  │  └─ Description: "전체 서버 평균 CPU 사용량" (Body/Small, Neutral/600)
│  └─ Icon Container (40x40px)
│     └─ Icon (24px, White)
├─ Value: "45.2%" (Metric/Value, 각 리소스 색상)
├─ Details Row (Auto Layout, Space Between)
│  ├─ Change: "↓ 2.3% 감소" (Body/Small, Status/Excellent)
│  └─ Status Badge: "EXCELLENT"
└─ Progress Bar (Full width)
```

**변형 생성:**
- Type: CPU, Memory, Storage, Network
- State: Default, Hover

### 3.2 Chart Container Component

#### Main Chart (1093 x 420px)
```
배경: Background/Primary
패딩: 24px
둥근 모서리: 12px
그림자: Shadow/Base
```

**제작 방법:**
1. **Frame**: 1093x420px
2. **배경**: Background/Primary, Corner radius 12px, Shadow/Base
3. **Auto layout**: Vertical, Gap 16px, Padding 24px

**내부 구조:**
```
┌─ Header Row (Auto Layout, Space Between)
│  ├─ Title: "시스템 리소스 추이" (Chart/Title)
│  └─ Controls Row (Auto Layout, Gap 8px)
│     ├─ Button: "1시간"
│     ├─ Button: "6시간" [Active]
│     ├─ Button: "24시간"
│     └─ Button: "7일"
└─ Chart Area (Fill container, 350px height)
   └─ Chart Placeholder (임시 차트 이미지 또는 도형)
```

#### Donut Chart (547 x 420px)
```
동일한 구조, 작은 크기
도넛 차트 + 범례 포함
```

### 3.3 Server Item Component
```
높이: 48px
배경: Neutral/50
패딩: 12px 16px
둥근 모서리: 8px
```

**제작 방법:**
1. **Frame**: Auto layout, Fill container x 48px
2. **배경**: Neutral/50, Corner radius 8px
3. **Auto layout**: Horizontal, Space between, Gap 12px

**내부 구조:**
```
├─ Left Section (Auto Layout, Gap 12px)
│  ├─ Status Dot (12px circle, 각 상태별 색상)
│  └─ Info Column
│     ├─ Server Name: "c-pod-487" (Label/Base, Bold)
│     └─ Metrics: "CPU: 42% MEM: 65% DISK: 28%" (Body/Small, Neutral/600)
└─ Right Section (Optional actions)
```

**변형:**
- Status: Online(Green), Warning(Orange), Offline(Gray)

### 3.4 Alert Item Component
```
배경: Background/Secondary
패딩: 16px
둥근 모서리: 8px
좌측 테두리: 4px
```

**제작 방법:**
1. **Frame**: Auto layout, Fill container
2. **배경**: Background/Secondary, Corner radius 8px
3. **좌측 테두리**: Rectangle(4px width), 각 상태별 색상

**내부 구조:**
```
├─ Left Border (4px width, 상태별 색상)
├─ Content (Auto Layout, Gap 12px)
│  ├─ Header Row (Auto Layout, Gap 12px)
│  │  ├─ Icon (20px, 상태별 색상)
│  │  └─ Title: "메모리 사용률 증가" (Label/Base, Bold)
│  ├─ Description: "c-pod-50 서버의 메모리 사용률이 85%를 초과했습니다." (Body/Base, Neutral/600)
│  └─ Time: "3분 전" (Caption, Neutral/500)
```

**변형:**
- Type: Warning, Critical, Info

## 🖥️ Step 4: Desktop 페이지 - 메인 레이아웃

### 4.1 전체 레이아웃 설정
```
아트보드: 1920 x 1080px
배경: Background gradient (135deg, #f8fafc → #f1f5f9)
```

**제작 방법:**
1. **Frame**: 1920x1080px, 이름 "Desktop Dashboard"
2. **배경**: Linear gradient 적용
3. **Layout grid**: 12 columns, 24px gutter, 24px margin

### 4.2 컨테이너 구조
```
┌─────────────────────────────────────────────────────┐
│ Container (1920 x 1080px, Flex horizontal)         │
│ ├─ Sidebar (280px fixed)                           │
│ └─ Main Content (1640px flex)                      │
└─────────────────────────────────────────────────────┘
```

**제작 방법:**
1. **Container Frame**: 1920x1080px, Auto layout horizontal
2. **Sidebar**: 280px width, Fixed
3. **Main Content**: Fill container, Auto layout vertical

### 4.3 사이드바 구성
```
크기: 280 x 1080px
배경: Background/Primary
패딩: 24px
그림자: Shadow/LG
```

**내부 구조:**
```
├─ Header
│  ├─ Title: "AICP MANAGEMENT PORTAL" (Body/Base, Bold)
│  └─ Subtitle: "HW 리소스 현황" (Body/Small, Neutral/600)
├─ Navigation Sections (Auto Layout, Gap 32px)
│  ├─ PROJECT Section
│  │  ├─ Section Title: "PROJECT" (Caption, Neutral/500, Uppercase)
│  │  ├─ Nav Item: "홈 현황" (Inactive)
│  │  ├─ Nav Item: "HW 리소스 현황" (Active, KT Red)
│  │  └─ Nav Item: "성능 분석" (Inactive)
│  ├─ 온디맨드 현황 Section
│  ├─ 라이선스 관리 Section
│  └─ RAPEECH-CPOD Section
```

### 4.4 메인 컨텐츠 구성
```
크기: 1640 x 1080px
패딩: 24px
Auto layout: Vertical, Gap 24px
```

**내부 구조:**
```
├─ Header (1592 x 120px)
├─ Metrics Row (1592 x 180px, 4개 카드)
├─ Charts Row (1592 x 420px, 2:1 비율)
└─ Details Row (1592 x 360px, 1:1 비율)
```

### 4.5 헤더 컴포넌트
```
크기: 1592 x 120px
배경: KT Red Gradient
패딩: 24px
둥근 모서리: 12px
```

**내부 구조:**
```
├─ Left Section
│  ├─ Title: "KT-STT 시스템 모니터링" (Heading/H1, White)
│  └─ Subtitle: "실시간 하드웨어 리소스 및 성능 현황" (Body/Large, White 90%)
└─ Right Section
   └─ Status Indicator
      ├─ Dot (12px, Status/Excellent, Pulse animation)
      └─ Text: "KT-STT 서비스 정상" (Body/Base, White)
```

### 4.6 메트릭 카드 그리드
```
Auto Layout: Horizontal, Gap 16px
4개 카드: 각각 395px width
```

**카드 배치:**
1. CPU 메트릭 카드 (Type: CPU)
2. Memory 메트릭 카드 (Type: Memory)  
3. Storage 메트릭 카드 (Type: Storage)
4. Network 메트릭 카드 (Type: Network)

### 4.7 차트 섹션
```
Auto Layout: Horizontal, Gap 24px
비율: 2fr (1093px) + 1fr (547px)
```

**구성:**
1. **Main Chart Container** (1093x420px)
2. **Donut Chart Container** (547x420px)

### 4.8 상세 정보 섹션
```
Auto Layout: Horizontal, Gap 24px
비율: 1:1 (각각 784px)
```

**구성:**
1. **서버 현황 카드**
   - 3개 Server Item 컴포넌트
2. **실시간 알림 카드**  
   - 3개 Alert Item 컴포넌트

## 📱 Step 5: 반응형 버전

### 5.1 Tablet (768 x 1024px)
```
변경사항:
- Container: Vertical layout
- Sidebar: 768px width x 80px height (horizontal)
- Metrics: 2x2 grid
- Charts: Vertical stack
```

### 5.2 Mobile (375 x 812px)
```
변경사항:
- Sidebar: Hidden (drawer 형태)
- Metrics: 1 column
- All sections: Vertical stack
- Reduced padding: 12px
```

## 🎭 Step 6: 인터랙션 및 프로토타이핑

### 6.1 호버 상태
```
Metric Card Hover:
- Transform: translateY(-2px)
- Shadow: Shadow/LG
- Duration: 300ms, Ease out

Button Hover:
- Background: Darker shade
- Transform: translateY(-1px)  
- Duration: 200ms, Ease out
```

### 6.2 클릭 상태
```
Button Click:
- Transform: translateY(0px)
- Duration: 100ms, Ease in

Chart Control:
- Background: KT Red
- Color: White
- Duration: 200ms
```

### 6.3 로딩 상태
```
Chart Loading:
- Skeleton placeholder
- Shimmer animation
- Spinner icon
```

## 🔧 Step 7: 고급 기능

### 7.1 Component Properties
```
Metric Card Properties:
- Type: CPU | Memory | Storage | Network
- Value: Number (0-100)
- Status: Excellent | Good | Warning | Critical
- Change: String
- IsPositiveChange: Boolean
```

### 7.2 Smart Animate
```
Chart transitions:
- Period change animation
- Data update animation
- Smooth transitions between states
```

### 7.3 Auto Layout 고급 활용
```
Responsive behavior:
- Fill container
- Hug contents  
- Fixed width/height
- Min/Max constraints
```

## 📋 Step 8: 최종 체크리스트

### Design System
- [ ] Color Styles 30개 생성
- [ ] Text Styles 15개 생성
- [ ] Effect Styles 5개 생성
- [ ] Grid Styles 3개 생성

### Components  
- [ ] Icon 컴포넌트 (5 sizes, 4 states)
- [ ] Button 컴포넌트 (3 types, 3 sizes, 4 states)
- [ ] Progress Bar 컴포넌트 (4 types, 4 values)
- [ ] Status Badge 컴포넌트 (4 statuses)
- [ ] Metric Card 컴포넌트 (4 types, 2 states)
- [ ] Chart Container 컴포넌트 (2 sizes)
- [ ] Server Item 컴포넌트 (3 statuses)
- [ ] Alert Item 컴포넌트 (3 types)

### Layouts
- [ ] Desktop Dashboard (1920x1080)
- [ ] Tablet Dashboard (768x1024)
- [ ] Mobile Dashboard (375x812)

### Interactions
- [ ] Hover states (모든 interactive 요소)
- [ ] Click states (버튼, 컨트롤)
- [ ] Loading states (차트, 데이터)
- [ ] Smart animate (상태 전환)

### Documentation
- [ ] Component descriptions
- [ ] Usage guidelines  
- [ ] Color meanings
- [ ] Typography scale
- [ ] Spacing system

## 🚀 추가 팁

### Figma 플러그인 활용
```
디자인 효율성:
- Iconify: 아이콘 라이브러리
- Unsplash: 이미지 소스
- Chart: 차트 생성
- Auto Flow: 플로우차트
- Content Reel: 텍스트 생성

개발 연동:
- Design Tokens: 토큰 생성
- Figma to Code: 코드 생성
- Zeplin: 개발자 핸드오프
```

### 협업 설정
```
팀 라이브러리:
- Design System 공유
- Component 동기화
- Style 일관성 유지

버전 관리:
- 주요 변경사항 기록
- 브랜치 활용
- 리뷰 프로세스
```

이 가이드를 따라 진행하시면 **현재 실행 중인 시스템 모니터링 대시보드와 동일한 Figma 파일**을 만드실 수 있습니다! 🎨✨
