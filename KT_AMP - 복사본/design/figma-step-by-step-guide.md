# 🎨 피그마에서 AMP 시안 만들기 - 단계별 가이드

## 📋 사전 준비사항

### 1. 피그마 계정 및 도구
- **피그마 계정** 생성 (figma.com)
- **피그마 데스크톱 앱** 설치 (권장) 또는 웹 브라우저 사용
- **필수 플러그인** 설치:
  - Tokens Studio for Figma (디자인 토큰 관리)
  - Auto Layout (자동 레이아웃)
  - Unsplash (이미지 소스)

### 2. 준비된 자료
- ✅ `figma-tokens.json` (디자인 토큰)
- ✅ `figma-components.html` (컴포넌트 참조)
- ✅ `figma-design-guide.md` (상세 명세)

---

## 🚀 1단계: 새 피그마 파일 생성

### 1.1 새 디자인 파일 만들기
```
1. Figma 로그인 → "New design file" 클릭
2. 파일명: "KT AMP - 통합 워크플로우 시안"
3. 팀 폴더에 저장 (협업 시)
```

### 1.2 페이지 구조 설정
```
페이지 생성 순서:
📄 Cover (커버 페이지)
📄 Design System (디자인 시스템)
📄 Desktop - Light Mode (데스크톱 라이트)
📄 Desktop - Dark Mode (데스크톱 다크)
📄 Tablet (태블릿)
📄 Mobile (모바일)
📄 Components (컴포넌트 라이브러리)
📄 Flows (사용자 플로우)
```

---

## 🎨 2단계: 디자인 시스템 구축

### 2.1 컬러 스타일 생성

#### Primary Colors
```
1. Rectangle 도구로 색상 샘플 생성
2. Fill에 색상 적용:
   - Primary Blue: #667eea
   - Primary Purple: #764ba2
   - Success: #48bb78
   - Warning: #ed8936
   - Error: #f56565

3. 각 색상을 선택 → 우클릭 → "Create style"
4. 이름 지정:
   - Primary/Blue
   - Primary/Purple
   - Status/Success
   - Status/Warning
   - Status/Error
```

#### Gradient 스타일
```
1. Rectangle 선택 → Fill → Linear gradient
2. 각도: 135도
3. 색상점:
   - 0%: #667eea
   - 100%: #764ba2
4. Style 저장: "Primary/Gradient"
```

### 2.2 텍스트 스타일 생성

```
폰트: Inter (Google Fonts)

1. Text 도구로 샘플 텍스트 생성
2. 각 스타일 설정 후 Text Style 생성:

📝 Heading 1
   - Size: 32px
   - Weight: Bold (700)
   - Line height: 38px (120%)

📝 Heading 2  
   - Size: 24px
   - Weight: Bold (700)
   - Line height: 29px (120%)

📝 Heading 3
   - Size: 18px
   - Weight: Semibold (600)
   - Line height: 25px (140%)

📝 Body Large
   - Size: 16px
   - Weight: Medium (500)
   - Line height: 24px (150%)

📝 Body
   - Size: 14px
   - Weight: Regular (400)
   - Line height: 21px (150%)

📝 Caption
   - Size: 12px
   - Weight: Medium (500)
   - Line height: 16px (130%)
```

### 2.3 Effect 스타일 생성

#### 그림자 효과
```
1. Rectangle 생성 → Effects 패널
2. Drop shadow 추가:

🌟 Card Shadow
   - X: 0, Y: 4
   - Blur: 15
   - Color: #000000 (8% opacity)

🌟 Button Shadow
   - X: 0, Y: 4  
   - Blur: 15
   - Color: #667eea (40% opacity)

🌟 Large Shadow
   - X: 0, Y: 25
   - Blur: 50
   - Color: #000000 (15% opacity)

3. 각각 Effect Style로 저장
```

#### Glass Effect (배경 블러)
```
1. Rectangle → Effects → Background blur
2. Blur amount: 20px
3. Style 저장: "Glass/Background Blur"
```

---

## 🖼️ 3단계: 메인 레이아웃 생성

### 3.1 데스크톱 프레임 생성

```
1. Frame 도구 (F) 선택
2. 프리셋: Desktop → 1440 x 900 선택
3. 이름: "Desktop - Light Mode"
4. 배경: Primary/Gradient 스타일 적용
```

### 3.2 메인 컨테이너 생성

```
1. Rectangle 도구 (R)
2. 크기: 1296 x 810
3. 위치: 중앙 정렬 (Align center)
4. Fill: White (#FFFFFF) 95% opacity
5. Effects: 
   - Glass/Background Blur (20px)
   - Large Shadow
6. Corner radius: 20px
```

### 3.3 Auto Layout 적용

```
1. 메인 컨테이너 선택
2. 우측 패널 → Auto layout 클릭
3. 설정:
   - Direction: Vertical
   - Spacing: 0px
   - Padding: 0px
   - Alignment: Top left
```

---

## 🎯 4단계: 컴포넌트 생성

### 4.1 헤더 컴포넌트

```
1. Rectangle: 1296 x 70
2. Fill: White 90% opacity + Background blur 10px
3. Auto layout: Horizontal
4. Padding: 0px 24px
5. Spacing between items: Auto (Space between)

내부 요소:
📍 Left Group (Auto layout horizontal):
   - Menu button: 44x44, Primary/Gradient
   - Logo: 40x40 + "AMP" text

📍 Right Group (Auto layout horizontal):
   - Download button: Secondary style
   - Profile button: Primary style

6. 전체 선택 → Create component (Ctrl+Alt+K)
7. 이름: "Header/Desktop"
```

### 4.2 버튼 컴포넌트

#### Primary Button
```
1. Rectangle: Auto x 44px
2. Fill: Primary/Gradient
3. Corner radius: 12px
4. Effects: Button Shadow
5. Auto layout: Horizontal
6. Padding: 12px 20px
7. Text: Body style, White color
8. Create component → "Button/Primary"

Variants 추가:
- State: Default, Hover, Pressed
- Size: Small (36px), Medium (44px), Large (52px)
```

#### Secondary Button
```
1. Rectangle: Auto x 44px  
2. Fill: Black 5% opacity
3. Stroke: 1px, Black 10% opacity
4. Corner radius: 12px
5. Auto layout: Horizontal
6. Padding: 12px 20px
7. Text: Body style
8. Create component → "Button/Secondary"
```

### 4.3 카드 컴포넌트

#### Content Card
```
1. Rectangle: 300px x auto
2. Fill: White 80% opacity + Background blur 10px
3. Stroke: 1px, Black 10% opacity
4. Corner radius: 16px
5. Effects: Card Shadow
6. Auto layout: Vertical
7. Padding: 24px
8. Spacing: 16px

내부 구조:
- Title (Heading 3 style)
- Description (Body style, 70% opacity)
- Button (Primary component instance)

9. Create component → "Card/Content"
```

#### Stats Card
```
1. Rectangle: 220px x 160px
2. Fill: White 80% opacity + Background blur 10px  
3. Corner radius: 16px
4. Auto layout: Vertical
5. Padding: 24px
6. Alignment: Center

내부 구조:
- Stat value (32px, Bold, Primary/Gradient text)
- Stat label (Body style, 70% opacity)

7. Create component → "Card/Stats"
```

### 4.4 사이드바 컴포넌트

```
1. Rectangle: 320 x 810
2. Fill: White 95% opacity + Background blur 20px
3. Effects: Large Shadow
4. Corner radius: 0px (left side only)
5. Auto layout: Vertical
6. Padding: 24px

내부 구조:
📍 Header (120px height):
   - Title text (Heading 2)
   - Subtitle text (Caption, 70% opacity)

📍 Navigation (Auto layout vertical):
   - Nav item 1 (Active state)
   - Nav item 2 (Default state)
   - Nav item 3 (Default state)
   ...

Nav Item 컴포넌트:
- Rectangle: 272 x 44
- Auto layout: Horizontal  
- Padding: 12px 16px
- Corner radius: 12px
- Variants: Default, Hover, Active

7. Create component → "Sidebar/Desktop"
```

---

## 📱 5단계: 메인 콘텐츠 영역

### 5.1 탭 네비게이션

```
1. Rectangle: 928 x 56
2. Fill: Black 5% opacity + Background blur 10px
3. Corner radius: 16px
4. Auto layout: Horizontal
5. Padding: 6px
6. Spacing: 0px

Tab Button 컴포넌트:
- Rectangle: Auto x 44px
- Corner radius: 12px
- Auto layout: Horizontal
- Padding: 12px 16px
- Text: Body style

Variants:
- State: Default, Active
- Active fill: Primary/Gradient
- Active text: White

7. Create component → "Tabs/Navigation"
```

### 5.2 콘텐츠 그리드

```
1. Frame: 928 x auto
2. Auto layout: Vertical
3. Spacing: 24px

내부 구조:
📊 Stats Grid:
   - Frame with Auto layout: Horizontal wrap
   - Gap: 20px
   - Stats Card 컴포넌트 인스턴스들

📝 Content Cards:
   - Frame with Auto layout: Vertical
   - Gap: 24px
   - Content Card 컴포넌트 인스턴스들

📋 Data Table:
   - Table 컴포넌트
```

### 5.3 테이블 컴포넌트

```
1. Rectangle: 928 x auto
2. Fill: White 60% opacity + Background blur 10px
3. Stroke: 1px, Black 10% opacity  
4. Corner radius: 12px
5. Auto layout: Vertical
6. Spacing: 0px

Table Header:
- Rectangle: 928 x 50px
- Fill: Primary color 10% opacity
- Auto layout: Horizontal
- Padding: 16px
- Text: Caption style, Bold

Table Rows:
- Rectangle: 928 x 50px
- Auto layout: Horizontal
- Padding: 16px
- Border bottom: 1px, Black 10%
- Text: Body style

7. Create component → "Table/Data"
```

---

## 🌙 6단계: 다크 모드 생성

### 6.1 다크 모드 컬러 추가

```
새 컬러 스타일 생성:
- Dark/Background: #2d3748 (95% opacity)
- Dark/Surface: #45505e (80% opacity) 
- Dark/Text Primary: #e2e8f0
- Dark/Text Secondary: #a0aec0 (70% opacity)

Gradient:
- Dark/Background Gradient: 
  135도, #2d3748 → #1a202c
```

### 6.2 다크 모드 페이지 복제

```
1. "Desktop - Light Mode" 페이지 복제
2. 이름: "Desktop - Dark Mode"
3. 배경: Dark/Background Gradient
4. 모든 컴포넌트 색상 변경:
   - 배경: Dark/Background, Dark/Surface
   - 텍스트: Dark/Text Primary, Secondary
```

### 6.3 Component Variants 업데이트

```
모든 주요 컴포넌트에 Theme variants 추가:
- Mode: Light, Dark

각 모드별로 적절한 컬러 스타일 적용
```

---

## 📱 7단계: 반응형 버전 생성

### 7.1 태블릿 버전

```
1. Frame: 768 x 1024 (iPad)
2. 메인 컨테이너: 95vw 크기로 조정
3. 사이드바: Overlay 방식으로 변경
4. 콘텐츠: 2열 그리드로 조정
```

### 7.2 모바일 버전

```
1. Frame: 375 x 812 (iPhone)
2. 헤더: 세로 스택으로 변경
3. 사이드바: 전체 화면 오버레이
4. 콘텐츠: 1열 스택으로 변경
5. 버튼: Full width로 조정
```

---

## 🔧 8단계: 인터랙션 추가

### 8.1 프로토타이핑

```
1. Prototype 모드 전환
2. 주요 인터랙션 연결:
   - 메뉴 버튼 → 사이드바 열기/닫기
   - 탭 버튼 → 콘텐츠 전환
   - 버튼 클릭 → 다음 단계
   - 테마 토글 → 다크/라이트 모드 전환

3. 애니메이션 설정:
   - Transition: Smart animate
   - Duration: 0.3초
   - Easing: Ease in and out
```

### 8.2 Overlay 설정

```
사이드바 인터랙션:
1. 메뉴 버튼 클릭
2. Action: Open overlay
3. Destination: Sidebar component
4. Position: Manual
5. Close when: Click outside
6. Background: Black 50% opacity
```

---

## 📤 9단계: 최종 정리 및 공유

### 9.1 컴포넌트 라이브러리 정리

```
1. Components 페이지에 모든 컴포넌트 정리
2. 컴포넌트별 설명 추가
3. 사용법 가이드 작성
4. Variant 상태별 예시 추가
```

### 9.2 Dev Mode 준비

```
1. 모든 컴포넌트에 적절한 이름 부여
2. Auto layout 적용 확인
3. Constraints 설정 완료
4. Export settings 구성:
   - SVG (아이콘)
   - PNG 2x (이미지)
   - JSON (디자인 토큰)
```

### 9.3 팀 공유

```
1. 파일 → Share → Copy link
2. 권한 설정: "Can view" (개발자)
3. Comment 권한 부여 (피드백용)
4. Figma Dev Mode 링크 제공
```

---

## 🎯 완성된 시안 구조

```
📁 KT AMP - 통합 워크플로우 시안
│
├── 📄 Cover
├── 📄 Design System
│   ├── 🎨 Colors
│   ├── 📝 Typography  
│   ├── ✨ Effects
│   └── 📏 Grid System
│
├── 📄 Desktop - Light Mode
│   ├── 🖥️ Main Dashboard
│   ├── 📊 Learning Management
│   ├── 🚀 Deployment
│   ├── ✅ Validation
│   └── 🧪 Testing
│
├── 📄 Desktop - Dark Mode
├── 📄 Tablet (768px)
├── 📄 Mobile (375px)
│
├── 📄 Components
│   ├── 🔘 Buttons
│   ├── 📄 Cards
│   ├── 📝 Forms
│   ├── 🧭 Navigation
│   └── 📊 Data Display
│
└── 📄 Flows
    ├── 🔄 User Journey
    ├── 📱 Mobile Flow
    └── 🎭 State Changes
```

---

## 💡 Pro Tips

### 시간 단축 팁
1. **Component 먼저 만들기**: 재사용 가능한 컴포넌트를 먼저 제작
2. **Auto Layout 활용**: 반응형 디자인을 쉽게 구현
3. **Plugins 활용**: Content Reel로 더미 데이터 생성
4. **Keyboard Shortcuts**: 작업 속도 향상

### 품질 관리
1. **일관성 체크**: 컬러, 타이포그래피, 간격 일관성 확인
2. **네이밍 규칙**: 명확한 컴포넌트/레이어 이름
3. **정리 정돈**: 레이어 그룹핑 및 순서 정리
4. **문서화**: 디자인 결정사항 기록

이 가이드를 따라하시면 **전문적인 AMP 시안**을 피그마에서 완성하실 수 있습니다! 🎨✨






