# 시스템 모니터링 대시보드 - Figma 디자인 가이드

## 📅 생성일: 2024년 12월 19일

## 🎨 디자인 시스템

### 컬러 팔레트

#### 브랜드 컬러
```
KT Red Primary: #e31e24
KT Red Light: #ff4449  
KT Red Dark: #c41e3a
```

#### 시스템 리소스 컬러
```
CPU Color: #3b82f6 (Blue)
CPU Light: #60a5fa
CPU Dark: #1d4ed8
CPU Background: #eff6ff

Memory Color: #10b981 (Green)
Memory Light: #34d399
Memory Dark: #047857
Memory Background: #ecfdf5

Storage Color: #8b5cf6 (Purple)
Storage Light: #a78bfa
Storage Dark: #7c3aed
Storage Background: #f3e8ff

Network Color: #f59e0b (Orange)
Network Light: #fbbf24
Network Dark: #d97706
Network Background: #fffbeb
```

#### 상태 컬러
```
Success: #059669
Good: #65a30d
Warning: #d97706
Critical: #dc2626
Offline: #6b7280
```

#### 중성 컬러
```
Gray 50: #f9fafb
Gray 100: #f3f4f6
Gray 200: #e5e7eb
Gray 300: #d1d5db
Gray 400: #9ca3af
Gray 500: #6b7280
Gray 600: #4b5563
Gray 700: #374151
Gray 800: #1f2937
Gray 900: #111827
```

#### 배경 컬러
```
Background Primary: #ffffff
Background Secondary: #f8fafc
Background Tertiary: #f1f5f9
Surface: #ffffff
Surface Hover: #f8fafc
```

### 타이포그래피

#### 폰트 패밀리
```
Primary Font: 'Noto Sans KR'
Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
```

#### 폰트 사이즈 스케일
```
Text XS: 12px
Text SM: 14px
Text Base: 16px
Text LG: 18px
Text XL: 20px
Text 2XL: 24px
Text 3XL: 30px
Text 4XL: 36px
Text 5XL: 48px
```

#### 폰트 굵기
```
Font Light: 300
Font Regular: 400
Font Medium: 500
Font Semibold: 600
Font Bold: 700
```

### 간격 시스템

#### 스페이싱 스케일
```
Space 1: 4px
Space 2: 8px
Space 3: 12px
Space 4: 16px
Space 5: 20px
Space 6: 24px
Space 8: 32px
Space 10: 40px
Space 12: 48px
Space 16: 64px
Space 20: 80px
Space 24: 96px
```

### 둥근 모서리

#### 반지름 스케일
```
Radius SM: 4px
Radius MD: 6px
Radius LG: 8px
Radius XL: 12px
Radius 2XL: 16px
Radius 3XL: 24px
Radius Full: 9999px
```

### 그림자

#### 그림자 스케일
```
Shadow SM: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
Shadow Base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
Shadow MD: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
Shadow LG: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
Shadow XL: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
```

## 🏗️ 레이아웃 구조

### 전체 레이아웃 (1920x1080)
```
┌─────────────────────────────────────────────────────┐
│ [사이드바: 280px]  │ [메인 컨텐츠: 1640px]          │
│                    │                                │ 1080px
│                    │                                │
└─────────────────────────────────────────────────────┘
```

### 사이드바 구조 (280x1080)
```
┌─────────────────────────┐
│ HEADER                  │ 80px
│ AICP MANAGEMENT PORTAL  │
├─────────────────────────┤
│ PROJECT                 │ 120px
│ • 홈 현황               │
│ • HW 리소스 현황 [활성] │
│ • 성능 분석             │
├─────────────────────────┤
│ 온디맨드 현황           │ 60px
│ • 음성인식 현황         │
├─────────────────────────┤
│ 라이선스 관리           │ 60px
│ • 라이선스 현황         │
├─────────────────────────┤
│ RAPEECH-CPOD           │ 60px
│ • rapeech-cpod KT-STT  │
└─────────────────────────┘
```

### 메인 컨텐츠 구조 (1640x1080)
```
┌─────────────────────────────────────────────────────┐
│ HEADER SECTION                                      │ 120px
│ [KT Red Gradient Background]                        │
├─────────────────────────────────────────────────────┤
│ METRICS CARDS (4개 그리드)                          │ 180px
│ [CPU] [Memory] [Storage] [Network]                  │
├─────────────────────────────────────────────────────┤
│ CHARTS SECTION                                      │ 420px
│ [시스템 리소스 추이: 1093px] [리소스 분포: 547px]   │
├─────────────────────────────────────────────────────┤
│ DETAILS SECTION                                     │ 360px
│ [서버 현황: 820px] [실시간 알림: 820px]             │
└─────────────────────────────────────────────────────┘
```

## 🧩 컴포넌트 상세

### 1. 헤더 컴포넌트
```
크기: 1640 x 120px
배경: Linear Gradient (135deg, #e31e24 0%, #c41e3a 100%)
패딩: 24px
둥근 모서리: 12px
그림자: Shadow LG

요소:
- 제목: "KT-STT 시스템 모니터링" (32px, Bold, White)
- 부제목: "실시간 하드웨어 리소스 및 성능 현황" (16px, Light, White 90%)
- 상태 표시: "KT-STT 서비스 정상" (14px, Medium, White)
- 상태 인디케이터: 12px 원형, Green, 펄스 애니메이션
```

### 2. 메트릭 카드 컴포넌트
```
크기: 395 x 180px (각각)
배경: White
패딩: 20px
둥근 모서리: 12px
그림자: Shadow Base
상단 테두리: 4px 높이, 각 리소스별 색상

요소:
- 상단 라인: CPU(Blue), Memory(Green), Storage(Purple), Network(Orange)
- 아이콘: 40x40px, 둥근 모서리 8px, 각 리소스별 그라디언트 배경
- 제목: 16px, Semibold, Gray 900
- 설명: 12px, Regular, Gray 600
- 수치: 32px, Bold, 각 리소스별 색상
- 변화율: 14px, Medium, Green(증가) 또는 Red(감소)
- 상태 배지: 12px, Bold, 각 상태별 색상
- 프로그레스 바: 전체 너비, 8px 높이, 각 리소스별 그라디언트
```

### 3. 시스템 차트 컴포넌트
```
크기: 1093 x 420px
배경: White
패딩: 24px
둥근 모서리: 12px
그림자: Shadow Base

요소:
- 제목: "시스템 리소스 추이" (20px, Bold, Gray 900)
- 컨트롤 버튼: 4개 (1시간, 6시간, 24시간, 7일)
- 차트 영역: 1045 x 350px
- 범례: 각 리소스별 색상 및 라벨
```

### 4. 도넛 차트 컴포넌트
```
크기: 547 x 420px
배경: White
패딩: 24px
둥근 모서리: 12px
그림자: Shadow Base

요소:
- 제목: "리소스 분포" (20px, Bold, Gray 900)
- 도넛 차트: 250px 지름, 중앙 구멍 70%
- 범례: 4개 항목, 각각 색상 사각형 + 라벨 + 수치
```

### 5. 서버 현황 컴포넌트
```
크기: 820 x 360px
배경: White
둥근 모서리: 12px
그림자: Shadow Base

요소:
- 헤더: Gray 100 배경, "서버 현황" 제목
- 서버 아이템: 3개, 각각 48px 높이
- 상태 인디케이터: 12px 원형 (온라인: Green, 경고: Orange, 오프라인: Gray)
- 서버명: 16px, Semibold, Gray 900
- 메트릭: 14px, Regular, Gray 600
```

### 6. 알림 패널 컴포넌트
```
크기: 820 x 360px
배경: White
둥근 모서리: 12px
그림자: Shadow Base

요소:
- 헤더: Gray 100 배경, "실시간 알림" 제목
- 알림 아이템: 각각 80px 높이
- 좌측 라인: 4px 너비 (Warning: Orange, Critical: Red, Info: Blue)
- 아이콘: 20px, 각 상태별 색상
- 제목: 16px, Semibold, Gray 900
- 내용: 14px, Regular, Gray 600
- 시간: 12px, Regular, Gray 500
```

## 📱 반응형 브레이크포인트

### 데스크톱 (1400px+)
- 메트릭 카드: 4열 그리드
- 차트: 2:1 비율 유지
- 사이드바: 고정 280px

### 중간 화면 (1200px - 1400px)
- 메트릭 카드: 2열 그리드
- 차트: 세로 배치
- 사이드바: 고정 280px

### 타블릿 (768px - 1200px)
- 사이드바: 상단 가로 배치, 높이 80px
- 메트릭 카드: 4열 그리드 (작은 크기)
- 차트: 세로 배치

### 모바일 (480px - 768px)
- 메트릭 카드: 2열 그리드
- 차트: 세로 배치, 높이 축소
- 상세 정보: 세로 배치

### 작은 모바일 (480px 이하)
- 메트릭 카드: 1열 그리드
- 모든 요소: 세로 배치
- 패딩 축소

## 🎭 상호작용 및 애니메이션

### 호버 효과
```
메트릭 카드: transform: translateY(-2px), Shadow LG
차트 컨트롤: 배경색 KT Red, 텍스트 White
네비게이션: 배경색 Gray 100
```

### 트랜지션
```
기본: all 0.3s ease
호버: all 0.2s ease
차트: duration 750ms, easing easeInOutQuart
```

### 애니메이션
```
상태 인디케이터: 펄스 2초 무한 반복
프로그레스 바: 너비 0.5초 ease
차트 데이터: 실시간 업데이트 5초마다
```

## 📐 그리드 시스템

### 메인 그리드
```
컨테이너: 1640px 최대 너비
컬럼: 12개
거터: 24px
마진: 24px
```

### 컴포넌트 그리드
```
메트릭 카드: 4컬럼 그리드, gap 16px
차트 섹션: 2fr + 1fr
상세 섹션: 1fr + 1fr
```

## 🎨 Figma 작업 가이드

### 1. 아트보드 설정
- **데스크톱**: 1920 x 1080px
- **타블릿**: 768 x 1024px  
- **모바일**: 375 x 812px

### 2. 컴포넌트 생성 순서
1. **Color Styles** 생성 (브랜드 및 시스템 컬러)
2. **Text Styles** 생성 (타이포그래피 시스템)
3. **기본 컴포넌트** 생성 (버튼, 카드, 아이콘)
4. **복합 컴포넌트** 생성 (메트릭 카드, 차트 컨테이너)
5. **레이아웃 컴포넌트** 생성 (사이드바, 헤더)
6. **페이지 조립** (전체 대시보드)

### 3. Auto Layout 활용
- **사이드바**: 세로 Auto Layout, Space Between
- **메트릭 그리드**: Grid Layout, 4컬럼
- **차트 섹션**: 가로 Auto Layout, 2:1 비율
- **카드 내부**: 세로 Auto Layout, 고정 간격

### 4. 변수 활용
- **색상 변수**: 모든 브랜드 및 시스템 컬러
- **스페이싱 변수**: 간격 시스템
- **텍스트 변수**: 동적 데이터 표시

### 5. 프로토타이핑
- **호버 상태**: 카드 및 버튼 인터랙션
- **차트 전환**: 기간 선택 버튼
- **반응형**: 화면 크기별 레이아웃 변화

이 가이드를 참고하여 Figma에서 시스템 모니터링 대시보드를 정확하게 재현하실 수 있습니다. 각 컴포넌트의 정확한 크기, 색상, 간격을 유지하여 일관성 있는 디자인을 만들어보세요.
