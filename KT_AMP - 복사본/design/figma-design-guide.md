# AMP 워크플로우 피그마 디자인 가이드

## 📐 전체 레이아웃 (Frame: 1440 x 900)

### 메인 컨테이너
- **크기**: 1296 x 810 (화면의 90%)
- **위치**: 중앙 정렬 (x: 72, y: 45)
- **배경**: Linear Gradient
  - Light Mode: #ffffff (95% opacity) + blur(20px)
  - Dark Mode: rgba(45, 55, 72, 0.95) + blur(20px)
- **테두리**: 20px border-radius
- **그림자**: 0 25px 50px rgba(0, 0, 0, 0.15)

## 🎨 컬러 시스템

### Primary Colors
```
Primary Gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Background Light: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Background Dark: linear-gradient(135deg, #2d3748 0%, #1a202c 100%)
```

### Surface Colors
```
Light Mode:
- Surface Primary: rgba(255, 255, 255, 0.95)
- Surface Secondary: rgba(255, 255, 255, 0.8)
- Card Background: rgba(255, 255, 255, 0.8) + blur(10px)

Dark Mode:
- Surface Primary: rgba(45, 55, 72, 0.95)
- Surface Secondary: rgba(45, 55, 72, 0.8)
- Card Background: rgba(45, 55, 72, 0.8) + blur(10px)
```

### Text Colors
```
Light Mode:
- Primary: #1a202c
- Secondary: rgba(26, 32, 44, 0.7)
- Tertiary: rgba(26, 32, 44, 0.6)

Dark Mode:
- Primary: #e2e8f0
- Secondary: rgba(226, 232, 240, 0.7)
- Tertiary: rgba(226, 232, 240, 0.6)
```

### Accent Colors
```
Success: #48bb78
Warning: #ed8936
Error: #f56565
Info: #4299e1
```

## 📱 컴포넌트 시스템

### 1. 헤더 (Header)
- **크기**: 1296 x 70
- **위치**: 최상단 고정
- **배경**: rgba(255, 255, 255, 0.9) + blur(10px)
- **요소들**:
  - 메뉴 토글 버튼: 44x44, gradient background
  - 로고: 40x40 아이콘 + "AMP" 텍스트
  - 다운로드 버튼: Secondary style
  - 프로필 버튼: Primary style

### 2. 사이드바 (Sidebar)
- **크기**: 320 x 810
- **위치**: 좌측, 숨김/표시 애니메이션
- **배경**: rgba(255, 255, 255, 0.95) + blur(20px)
- **그림자**: 0 25px 50px rgba(0, 0, 0, 0.2)
- **애니메이션**: transform: translateX(-100px) → translateX(0)

#### 사이드바 헤더
- **크기**: 320 x 120
- **배경**: Linear gradient overlay (10% opacity)
- **타이틀**: 18px, bold, gradient text
- **서브타이틀**: 14px, 70% opacity

#### 네비게이션 메뉴
- **아이템 크기**: 288 x 44 (패딩 16px)
- **Border Radius**: 12px
- **아이콘**: 20x20, 16px font-size
- **배지**: 10px font, #ff6b6b background
- **Hover**: rgba(102, 126, 234, 0.1) background
- **Active**: Linear gradient background + white text

### 3. 메인 콘텐츠 (Main Content)
- **크기**: 976 x 740 (헤더 제외)
- **패딩**: 24px all sides

#### 페이지 타이틀
- **폰트**: 32px, bold, gradient text
- **서브타이틀**: 16px, 70% opacity
- **여백**: 32px bottom margin

#### 탭 네비게이션
- **크기**: 928 x 56
- **배경**: rgba(0, 0, 0, 0.05) + blur(10px)
- **Border Radius**: 16px
- **패딩**: 6px
- **탭 버튼**: 
  - 크기: auto x 44
  - Radius: 12px
  - Active: gradient + shadow + translateY(-2px)

### 4. 콘텐츠 카드 (Content Cards)
- **배경**: rgba(255, 255, 255, 0.8) + blur(10px)
- **Border**: 1px solid rgba(0, 0, 0, 0.1)
- **Border Radius**: 16px
- **패딩**: 24px
- **그림자**: 0 4px 15px rgba(0, 0, 0, 0.08)
- **여백**: 24px bottom

### 5. 버튼 시스템

#### Primary Button
- **배경**: linear-gradient(135deg, #667eea, #764ba2)
- **색상**: white
- **패딩**: 12px 20px
- **Border Radius**: 12px
- **그림자**: 0 4px 15px rgba(102, 126, 234, 0.4)
- **Hover**: translateY(-2px) + enhanced shadow

#### Secondary Button
- **배경**: rgba(0, 0, 0, 0.05)
- **테두리**: 1px solid rgba(0, 0, 0, 0.1)
- **패딩**: 12px 20px
- **Border Radius**: 12px
- **Hover**: translateY(-1px)

### 6. 폼 요소들

#### Input/Select
- **크기**: auto x 44
- **패딩**: 12px 16px
- **배경**: rgba(255, 255, 255, 0.9) + blur(10px)
- **테두리**: 1px solid rgba(0, 0, 0, 0.1)
- **Border Radius**: 12px
- **Focus**: border #667eea + 3px shadow

#### 검색바
- **Grid**: 1fr auto auto (3열)
- **Gap**: 16px
- **여백**: 24px bottom

### 7. 데이터 테이블

#### 테이블 컨테이너
- **배경**: rgba(255, 255, 255, 0.6) + blur(10px)
- **테두리**: 1px solid rgba(0, 0, 0, 0.1)
- **Border Radius**: 12px

#### 테이블 헤더
- **배경**: rgba(102, 126, 234, 0.1)
- **패딩**: 16px
- **폰트**: 14px, 600 weight

#### 테이블 행
- **패딩**: 16px
- **테두리**: 1px solid rgba(0, 0, 0, 0.1) (하단만)
- **Hover**: rgba(102, 126, 234, 0.05) background

### 8. 통계 카드 (Stats Cards)

#### 그리드 레이아웃
- **Grid**: repeat(auto-fit, minmax(220px, 1fr))
- **Gap**: 20px
- **여백**: 32px bottom

#### 개별 카드
- **배경**: rgba(255, 255, 255, 0.8) + blur(10px)
- **패딩**: 24px
- **Border Radius**: 16px
- **테두리**: 1px solid rgba(0, 0, 0, 0.1)
- **Hover**: translateY(-5px) + enhanced shadow

#### 통계 값
- **폰트**: 28px, 700 weight, gradient text
- **여백**: 8px bottom

#### 통계 라벨
- **폰트**: 14px, 500 weight, 70% opacity

### 9. 업로드 존 (Upload Zone)
- **테두리**: 2px dashed rgba(102, 126, 234, 0.3)
- **배경**: rgba(102, 126, 234, 0.05)
- **Border Radius**: 16px
- **패딩**: 40px
- **Hover**: translateY(-2px) + solid border

#### 업로드 아이콘
- **폰트**: 48px
- **여백**: 16px bottom
- **투명도**: 70%

### 10. 프로그레스 바 (Progress Bar)
- **크기**: 100% x 8px
- **배경**: rgba(0, 0, 0, 0.1)
- **Border Radius**: 4px
- **프로그레스**: Linear gradient fill
- **애니메이션**: width transition 0.3s ease

### 11. 상태 배지 (Status Badges)
- **패딩**: 6px 12px
- **Border Radius**: 20px (full rounded)
- **폰트**: 12px, 600 weight

#### 상태별 색상
```
Success: rgba(72, 187, 120, 0.2) bg + #38a169 text
Warning: rgba(237, 137, 54, 0.2) bg + #d69e2e text
Error: rgba(245, 101, 101, 0.2) bg + #e53e3e text
```

### 12. 테마 토글 (Theme Toggle)
- **위치**: Fixed (bottom: 20px, right: 20px)
- **크기**: auto x 32
- **배경**: rgba(0, 0, 0, 0.03)
- **Border Radius**: 8px
- **투명도**: 30% → 100% on hover
- **버튼 크기**: 32 x 24

## 🎭 애니메이션 & 인터랙션

### 1. 사이드바 애니메이션
```
기본: transform: translateX(-100px), opacity: 0
활성: transform: translateX(0), opacity: 1
Duration: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)
```

### 2. 버튼 호버 효과
```
Primary: translateY(-2px) + shadow enhancement
Secondary: translateY(-1px) + background change
Duration: 0.3s ease
```

### 3. 카드 호버 효과
```
Stats Cards: translateY(-5px) + shadow
Duration: 0.3s ease
```

### 4. 탭 전환
```
fadeIn animation: opacity 0→1, translateY(10px)→0
Duration: 0.3s ease
```

## 📏 반응형 중단점

### Desktop (1440px+)
- 모든 요소 기본 크기 사용

### Tablet (768px - 1439px)
- 메인 컨테이너: 95vw x 95vh
- 사이드바: 90vw width
- 통계 그리드: 2열

### Mobile (767px 이하)
- 검색바: 1열로 변경
- 통계 그리드: 1열
- 헤더: 세로 정렬

## 🎯 피그마 구조

### Pages
1. **Cover Page** - 디자인 소개
2. **Design System** - 컬러, 타이포그래피, 컴포넌트
3. **Desktop** - 메인 화면 (Light/Dark)
4. **Tablet** - 태블릿 버전
5. **Mobile** - 모바일 버전
6. **Components** - 재사용 컴포넌트 라이브러리

### Frames per Page
- **Desktop**: 1440 x 900
- **Tablet**: 768 x 1024  
- **Mobile**: 375 x 812

### 컴포넌트 라이브러리
- Buttons (Primary, Secondary, Icon)
- Form Elements (Input, Select, Search)
- Cards (Stats, Content, Table)
- Navigation (Sidebar, Tabs, Menu)
- Badges & Tags
- Progress Bars
- Upload Zones

이 가이드를 바탕으로 피그마에서 정확한 디자인을 재현할 수 있습니다.






