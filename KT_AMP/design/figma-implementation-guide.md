# 🎨 Figma 편집 가능한 시스템 모니터링 대시보드 가이드

## 📅 생성일: 2024년 12월 19일

## 🎯 개요

이 가이드는 **KT AMP 시스템 모니터링 대시보드**를 Figma에서 완전히 편집 가능한 형태로 구현하는 방법을 제공합니다. 모든 컴포넌트가 동적으로 편집 가능하며, 실제 데이터와 연동할 수 있는 구조로 설계되었습니다.

---

## 📁 생성된 파일 구조

```
📂 KT_AMP/design/
├── 🎨 figma-editable-design-system.json     # 디자인 시스템 토큰
├── 🧩 figma-component-library.json          # 컴포넌트 라이브러리 
├── 📝 figma-implementation-guide.md         # 이 파일 (구현 가이드)
└── 🎭 system-monitoring-unified.svg         # 참조용 SVG 파일
```

---

## 🚀 Method 1: Figma Tokens 플러그인 활용 (추천)

### Step 1: 플러그인 설치 및 설정

```
1️⃣ Figma 플러그인 설치
   - Plugins → Browse plugins in community
   - "Figma Tokens" 검색 및 설치
   - "Design Tokens" 플러그인도 함께 설치

2️⃣ 새 Figma 파일 생성
   - "Create new design file" 클릭
   - 파일명: "KT AMP 시스템 모니터링 대시보드"
   
3️⃣ 페이지 구조 생성
   - 🎨 Design System
   - 🧩 Components  
   - 📱 Desktop (1920x1080)
   - 📱 Mobile (375x812)
```

### Step 2: 디자인 토큰 Import

```
1️⃣ Figma Tokens 플러그인 실행
   - Plugins → Figma Tokens

2️⃣ JSON 파일 Import
   - "figma-editable-design-system.json" 파일 내용 복사
   - 플러그인에서 "Import" 탭 선택
   - JSON 데이터 붙여넣기 후 "Import" 클릭

3️⃣ 스타일 적용
   - "Apply to Figma" 버튼 클릭
   - Color Styles, Text Styles, Effect Styles 자동 생성 확인
```

---

## 🧩 Method 2: 수동 컴포넌트 생성

### Step 1: Color Styles 생성

**🎨 Design System 페이지에서:**

#### Primary Colors
```
- Primary/Blue: #6b7280
- Primary/Purple: #4b5563
- Primary/Gradient: linear-gradient(135deg, #6b7280, #4b5563)
```

#### System Colors  
```
- System/CPU: #3b82f6
- System/CPU/Light: #60a5fa
- System/Memory: #10b981  
- System/Memory/Light: #34d399
- System/Storage: #8b5cf6
- System/Storage/Light: #a78bfa
- System/Network: #f59e0b
- System/Network/Light: #fbbf24
```

#### Status Colors
```
- Status/Success: #48bb78
- Status/Warning: #ed8936
- Status/Error: #f56565
- Status/Info: #6b7280
```

#### Neutral Colors
```
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
```

### Step 2: Text Styles 생성

```
1️⃣ Heading/Large
   - Font: Inter, 24px, Bold (700)
   - Line Height: 120%
   - Usage: Page titles

2️⃣ Heading/Medium  
   - Font: Inter, 20px, Bold (700)
   - Line Height: 120%
   - Usage: Section titles

3️⃣ Body/Large
   - Font: Inter, 16px, SemiBold (600)
   - Line Height: 150%
   - Usage: Card titles

4️⃣ Body/Base
   - Font: Inter, 14px, Regular (400)
   - Line Height: 150%
   - Usage: Body text

5️⃣ Body/Small
   - Font: Inter, 12px, Regular (400)
   - Line Height: 150%
   - Usage: Captions

6️⃣ Metric/Value
   - Font: Inter, 24px, Bold (700)
   - Line Height: 110%
   - Usage: Metric values

7️⃣ Badge/Text
   - Font: Inter, 9px, SemiBold (600)
   - Line Height: 110%
   - Letter Spacing: 0.5px
   - Text Transform: Uppercase
   - Usage: Status badges
```

### Step 3: Effect Styles 생성

```
1️⃣ Shadow/Small
   - Drop Shadow: 0px 1px 2px rgba(0,0,0,0.05)

2️⃣ Shadow/Medium
   - Drop Shadow: 0px 4px 6px rgba(0,0,0,0.07)

3️⃣ Shadow/Large
   - Drop Shadow: 0px 10px 15px rgba(0,0,0,0.1)

4️⃣ Glassmorphism
   - Background Blur: 20px
   - Drop Shadow: 0px 20px 25px rgba(0,0,0,0.1)
```

---

## 🎯 Step 4: 편집 가능한 컴포넌트 생성

### MetricCard 컴포넌트 (가장 중요!)

**🧩 Components 페이지에서:**

#### 4.1 기본 프레임 생성

```
1️⃣ Frame 생성: 300 x 140px
   - Name: "MetricCard/Master"
   - Fill: #ffffff
   - Corner Radius: 16px
   - Effect: Shadow/Large

2️⃣ Auto Layout 설정
   - Direction: Vertical
   - Padding: 16px all sides
   - Item Spacing: 8px
   - Resize: Hug contents
```

#### 4.2 Component Properties 설정

```
오른쪽 Properties 패널에서 "Create component property" 클릭:

1️⃣ Type (Variant)
   - Name: "Type"
   - Options: CPU, Memory, Storage, Network
   - Default: CPU

2️⃣ Title (Text)
   - Name: "Title"  
   - Default: "CPU 사용률"

3️⃣ Description (Text)
   - Name: "Description"
   - Default: "전체 서버 평균 CPU 사용량"

4️⃣ Value (Text)
   - Name: "Value"
   - Default: "45.2%"

5️⃣ Change (Text)
   - Name: "Change"
   - Default: "2.3% 감소"

6️⃣ Status (Variant)
   - Name: "Status"
   - Options: Excellent, Good, Warning, Critical
   - Default: Excellent

7️⃣ Progress (Text)
   - Name: "Progress"
   - Default: "45.2"
```

#### 4.3 내부 구조 생성

```
📍 Top Border (Rectangle)
   - Width: Fill container
   - Height: 4px
   - Fill: {Type에 따라 변경될 색상}
   - Corner Radius: 16px top only

📍 Header (Frame)
   - Auto Layout: Horizontal, Space Between
   - Children:
     📍 Info (Frame - Vertical)
       - Title (Text): {Title} property 연결
       - Description (Text): {Description} property 연결
     📍 Icon (Frame): 36x36px
       - Fill: {Type에 따른 그라디언트}
       - Corner Radius: 12px

📍 Value (Text)
   - Text: {Value} property 연결
   - Style: Metric/Value
   - Fill: {Type에 따른 색상}

📍 Details (Frame)
   - Auto Layout: Horizontal, Space Between
   - Children:
     📍 Change (Text): {Change} property 연결
     📍 StatusBadge (Component Instance)

📍 ProgressBar (Component Instance)
   - Progress property: {Progress} 연결
   - Type property: {Type} 연결
```

#### 4.4 Variants 생성

```
1️⃣ MetricCard 선택 후 우클릭
   - "Create component set" 클릭

2️⃣각 Type별 Variant 생성:
   📍 Type=CPU
     - Top Border Fill: System/CPU
     - Icon Fill: CPU gradient  
     - Value Fill: System/CPU
     
   📍 Type=Memory
     - Top Border Fill: System/Memory
     - Icon Fill: Memory gradient
     - Value Fill: System/Memory
     
   📍 Type=Storage
     - Top Border Fill: System/Storage
     - Icon Fill: Storage gradient
     - Value Fill: System/Storage
     
   📍 Type=Network
     - Top Border Fill: System/Network
     - Icon Fill: Network gradient
     - Value Fill: System/Network
```

### StatusBadge 컴포넌트

```
1️⃣ Frame 생성: 80 x 24px
   - Name: "StatusBadge/Master"
   - Corner Radius: 12px
   - Auto Layout: Horizontal, Center

2️⃣ Component Properties:
   - Status (Variant): Excellent, Good, Warning, Critical
   - Text (Text): "EXCELLENT"

3️⃣ Variants:
   📍 Status=Excellent
     - Fill: rgba(72, 187, 120, 0.1)
     - Text Color: #48bb78
   📍 Status=Good
     - Fill: rgba(72, 187, 120, 0.1)  
     - Text Color: #48bb78
   📍 Status=Warning
     - Fill: rgba(237, 137, 54, 0.1)
     - Text Color: #ed8936
   📍 Status=Critical
     - Fill: rgba(245, 101, 101, 0.1)
     - Text Color: #f56565
```

### ProgressBar 컴포넌트

```
1️⃣ Frame 생성: 280 x 6px
   - Name: "ProgressBar/Master"

2️⃣ 구조:
   📍 Background (Rectangle): 280 x 6px
     - Fill: Neutral/100
     - Corner Radius: 3px
   📍 Fill (Rectangle): {동적 너비} x 6px
     - Fill: {Type에 따른 그라디언트}
     - Corner Radius: 3px

3️⃣ Component Properties:
   - Progress (Text): "45.2"
   - Type (Variant): CPU, Memory, Storage, Network
```

### ChartControl 컴포넌트

```
1️⃣ Frame 생성: 50 x 32px
   - Name: "ChartControl/Master"
   - Corner Radius: 8px
   - Auto Layout: Horizontal, Center

2️⃣ Component Properties:
   - Text (Text): "6시간"
   - State (Variant): Default, Active, Hover

3️⃣ Variants:
   📍 State=Default
     - Fill: #ffffff
     - Border: 1px #e5e7eb
     - Text Color: rgba(26,32,44,0.7)
   📍 State=Active
     - Fill: Primary gradient
     - Border: none
     - Text Color: #ffffff
   📍 State=Hover
     - Fill: #f3f4f6
     - Border: 1px #6b7280
     - Text Color: #6b7280
```

---

## 📱 Step 5: 템플릿 레이아웃 생성

### Desktop Template (1920x1080)

**📱 Desktop 페이지에서:**

```
1️⃣ Main Frame 생성
   - Size: 1920 x 1080px
   - Name: "시스템 모니터링 대시보드"
   - Fill: Primary gradient

2️⃣ Layout Structure:
   📍 Sidebar (280 x 1080px)
     - Fill: rgba(255,255,255,0.95)
     - Effect: Glassmorphism
     - Components: Logo, Navigation
     
   📍 Header (1640 x 72px)
     - Fill: rgba(255,255,255,0.8)
     - Effect: Background Blur 20px
     - Components: Breadcrumb, Status, User Avatar
     
   📍 Page Header (1576 x 80px)
     - Title: "시스템 모니터링 대시보드"
     - Subtitle: "실시간 하드웨어 리소스 및 성능 현황을 모니터링합니다"
     
   📍 Metrics Grid (1576 x 156px)
     - Auto Layout: Horizontal, 16px gap
     - 4 MetricCard instances:
       🔵 CPU: Title="CPU 사용률", Value="45.2%", Status="Excellent"
       🟢 Memory: Title="메모리 사용률", Value="68.7%", Status="Good"  
       🟣 Storage: Title="스토리지 사용률", Value="34.8%", Status="Excellent"
       🟡 Network: Title="네트워크 사용률", Value="23.1%", Status="Excellent"
       
   📍 Chart Section (1576 x 374px)
     - ChartCard instance
     - Title: "시스템 리소스 추이"
     - Active Filter: "6시간"
     
   📍 Server Section (1576 x 180px)
     - 3 ServerItem instances:
       🟢 c-pod-487: Online
       🟢 c-pod-49: Online
       🟠 c-pod-50: Warning
```

---

## 🎭 Step 6: 인터랙션 및 프로토타이핑

### 기본 인터랙션 설정

```
1️⃣ MetricCard Hover 효과
   - Trigger: Mouse Enter
   - Action: Change to → Hover state
   - Animation: Ease Out, 300ms
   - Transform: translateY(-4px)

2️⃣ ChartControl 클릭 효과
   - Trigger: On Click
   - Action: Change to → Active state
   - Animation: Ease Out, 200ms

3️⃣ Status Indicator 애니메이션
   - Animation: Pulse
   - Duration: 2s
   - Iteration: Infinite
   - Opacity: 1 → 0.5 → 1
```

### 스마트 애니메이션 설정

```
1️⃣ 차트 필터 전환
   - Connect different chart states
   - Animation: Smart Animate
   - Duration: 300ms
   - Easing: Ease In Out

2️⃣ 메트릭 값 변경
   - Text 컴포넌트 애니메이션
   - Number 변화 시뮬레이션
   - Smooth transition
```

---

## 🔧 Step 7: 고급 기능 및 활용

### 데이터 연동 시뮬레이션

```
1️⃣ Variable 활용
   - 각 메트릭 값을 Variable로 설정
   - 실시간 업데이트 시뮬레이션 가능
   - 프로토타입에서 동적 변경

2️⃣ Component Property Expressions
   - Progress Bar width: {Progress}% 
   - Status Badge color: {Status}
   - Dynamic icon selection: {Type}

3️⃣ Conditional Logic
   - IF Status = "Critical" THEN Color = Red
   - IF Progress > 80 THEN Warning state
```

### 반응형 설정

```
1️⃣ Constraints 설정
   - Sidebar: Left & Top pinned
   - Main Content: Left, Right, Top, Bottom stretch
   - Metric Cards: Scale proportionally

2️⃣ Auto Layout 활용
   - Grid responsive behavior
   - Minimum width constraints
   - Adaptive spacing

3️⃣ Breakpoint Frames
   - Desktop: 1920px
   - Tablet: 768px  
   - Mobile: 375px
```

---

## 🎯 Step 8: 컴포넌트 라이브러리 게시

### 팀 라이브러리 설정

```
1️⃣ 라이브러리 게시
   - 파일 우상단 "Publish" 버튼
   - "Publish library" 선택
   - 설명 및 버전 정보 입력

2️⃣ 컴포넌트 문서화
   - 각 컴포넌트에 설명 추가
   - Usage guidelines 작성
   - Property 사용법 명시

3️⃣ 팀 공유
   - 팀원에게 라이브러리 액세스 권한 부여
   - Enable in other files
   - Update notifications 설정
```

### 버전 관리

```
1️⃣ 변경사항 추적
   - Version history 활용
   - 주요 변경점 명시
   - Rollback 옵션 확보

2️⃣ 브랜치 전략
   - Main: 안정 버전
   - Development: 개발 중
   - Feature branches: 새 기능

3️⃣ 업데이트 워크플로우
   - 정기적인 컴포넌트 업데이트
   - Breaking changes 사전 공지
   - Migration guide 제공
```

---

## 📊 완성 체크리스트

### ✅ 디자인 시스템
```
□ Color Styles 25개 생성 완료
□ Text Styles 7개 생성 완료  
□ Effect Styles 4개 생성 완료
□ 모든 스타일 일관성 확인
```

### ✅ 컴포넌트
```
□ MetricCard 컴포넌트 (4 variants)
□ StatusBadge 컴포넌트 (4 variants)
□ ProgressBar 컴포넌트 (4 variants)
□ ChartControl 컴포넌트 (3 states)
□ ServerItem 컴포넌트 (3 variants)
□ 모든 Component Properties 설정 완료
```

### ✅ 템플릿
```
□ Desktop Layout (1920x1080) 완성
□ 모든 컴포넌트 instances 배치
□ Property 연결 및 데이터 바인딩
□ Auto Layout 완벽 적용
```

### ✅ 인터랙션
```
□ Hover effects 설정
□ Click interactions 설정  
□ Smart Animate 적용
□ 프로토타입 플로우 완성
```

### ✅ 라이브러리
```
□ 컴포넌트 라이브러리 게시
□ 문서화 완료
□ 팀 공유 설정
□ 버전 관리 체계 수립
```

---

## 🚀 활용 방법

### 📝 실제 프로젝트 적용

```
1️⃣ 라이브러리 연결
   - 다른 Figma 파일에서 라이브러리 enable
   - Assets 패널에서 컴포넌트 드래그앤드롭

2️⃣ 데이터 커스터마이징
   - Property 패널에서 값 변경
   - 실시간 프리뷰 확인
   - 다양한 시나리오 테스트

3️⃣ 프로토타입 제작
   - 사용자 플로우 설계
   - 인터랙션 시뮬레이션
   - 사용자 테스트 진행
```

### 🔄 개발팀 연동

```
1️⃣ Design Handoff
   - Figma Dev Mode 활용
   - CSS 코드 자동 생성
   - Asset export 자동화

2️⃣ Design Token 동기화
   - JSON export 기능
   - 개발 환경 token 연동
   - 일관성 유지

3️⃣ 지속적 개선
   - 사용자 피드백 반영
   - A/B 테스트 결과 적용
   - 성능 최적화
```

---

## 💡 Pro Tips

### 🎨 디자인 효율성

```
1️⃣ Smart Selection
   - 동일한 컴포넌트 일괄 선택
   - Batch property 변경
   - Consistent spacing 적용

2️⃣ Plugin 활용
   - Content Reel: 더미 데이터 생성
   - Stark: 접근성 검증
   - Lorem Ipsum: 텍스트 자동 생성

3️⃣ Shortcuts 활용
   - Cmd+D: 복제
   - Shift+A: Auto Layout
   - Cmd+K: Component 생성
```

### 🔧 기술적 최적화

```
1️⃣ 성능 최적화
   - 불필요한 nested frames 제거
   - Image optimization
   - Component instance 재사용

2️⃣ 확장성 고려
   - Scalable component structure
   - Future-proof property naming
   - Modular design approach

3️⃣ 협업 최적화
   - Clear naming conventions
   - Consistent layer organization
   - Documentation standards
```

---

## 🎉 완성 및 다음 단계

이제 **완전히 편집 가능한 Figma 시스템 모니터링 대시보드**가 완성되었습니다!

### 🏆 달성한 것들
- ✅ 25개 Color Styles
- ✅ 7개 Text Styles  
- ✅ 4개 Effect Styles
- ✅ 6개 편집 가능한 컴포넌트
- ✅ 완전한 Desktop 템플릿
- ✅ 인터랙티브 프로토타입
- ✅ 팀 라이브러리 준비

### 🚀 권장 다음 단계
1. **사용자 테스트** 진행
2. **개발팀과 Design Token 동기화**
3. **모바일 버전** 템플릿 추가
4. **더 많은 인터랙션** 구현
5. **실제 데이터 API** 연동 시뮬레이션

**행운을 빕니다!** 🍀 멋진 디자인 시스템을 만들어보세요! 🎨✨
