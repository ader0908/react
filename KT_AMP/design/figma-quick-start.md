# ⚡ 피그마 AMP 시안 - 빠른 시작 가이드

## 🎯 10분 만에 시작하기

### 1️⃣ **즉시 시작** (1분)
```
1. figma.com 접속 → 로그인
2. "New design file" 클릭
3. 파일명: "KT AMP 시안"
```

### 2️⃣ **기본 프레임** (2분)
```
1. 키보드 'F' → Desktop (1440 x 900) 선택
2. 배경색: Linear Gradient 
   - 135도 각도
   - #667eea → #764ba2
```

### 3️⃣ **메인 컨테이너** (3분)
```
1. 키보드 'R' → Rectangle 생성
2. 크기: 1296 x 810
3. 중앙 정렬 (Shift + A)
4. Fill: White 95% opacity
5. Effects → Background blur 20px
6. Corner radius: 20px
```

### 4️⃣ **헤더 영역** (4분)
```
1. Rectangle: 1296 x 70
2. Fill: White 90% opacity + blur 10px
3. 키보드 Shift + A → Auto layout
4. Padding: 24px 좌우
5. 텍스트: "AMP" (32px, Bold)
```

---

## 🚀 핵심 컴포넌트 만들기

### 🔘 **버튼 컴포넌트** (필수)
```
PRIMARY 버튼:
- 크기: Auto x 44px
- 배경: Gradient (#667eea → #764ba2)
- 텍스트: White, 14px Medium
- 모서리: 12px 
- 그림자: Y4, Blur15, #667eea 40%

SECONDARY 버튼:
- 배경: Black 5% opacity
- 테두리: 1px Black 10%
- 텍스트: 기본 색상
```

### 📄 **카드 컴포넌트** (필수)
```
- 크기: 300px x Auto
- 배경: White 80% + blur 10px
- 테두리: 1px Black 10%
- 모서리: 16px
- 패딩: 24px
- 그림자: Y4, Blur15, Black 8%
```

### 🧭 **네비게이션** (필수)
```
사이드바:
- 크기: 320 x 810px
- 배경: White 95% + blur 20px
- 각 메뉴 아이템: 272 x 44px
- 활성 상태: Gradient 배경 + White 텍스트
```

---

## 🎨 빠른 디자인 토큰

### 컬러 팔레트
```css
/* Primary */
Blue: #667eea
Purple: #764ba2
Gradient: linear-gradient(135deg, #667eea, #764ba2)

/* Status */
Success: #48bb78
Warning: #ed8936  
Error: #f56565

/* Text (Light Mode) */
Primary: #1a202c
Secondary: rgba(26, 32, 44, 0.7)

/* Background (Light Mode) */
Primary: rgba(255, 255, 255, 0.95)
Card: rgba(255, 255, 255, 0.8)
```

### 타이포그래피
```css
H1: 32px Bold (Inter)
H2: 24px Bold  
H3: 18px Semibold
Body: 14px Regular
Caption: 12px Medium
```

### 간격 시스템
```css
XS: 4px    MD: 12px    XL: 20px
SM: 8px    LG: 16px    2XL: 24px
```

---

## ⚡ 1시간 완성 체크리스트

### ✅ **기본 구조** (20분)
- [ ] Desktop Frame (1440x900)
- [ ] Gradient 배경
- [ ] 메인 컨테이너 (1296x810)
- [ ] Glass effect 적용

### ✅ **핵심 컴포넌트** (25분)  
- [ ] Primary/Secondary 버튼
- [ ] Content/Stats 카드
- [ ] Input/Select 폼
- [ ] 사이드바 네비게이션

### ✅ **메인 화면** (15분)
- [ ] 헤더 (로고 + 버튼들)
- [ ] 4개 탭 네비게이션
- [ ] 통계 카드 그리드 (2x2)
- [ ] 데이터 테이블

---

## 🔧 필수 플러그인

### 1. **Tokens Studio** 
```
용도: 디자인 토큰 관리
설치: Plugins → "Tokens Studio for Figma"
사용: JSON 파일 import로 컬러/폰트 일괄 적용
```

### 2. **Content Reel**
```
용도: 더미 데이터 생성  
사용: 테이블, 카드에 실제같은 데이터 채우기
```

### 3. **Auto Layout** (내장)
```
용도: 반응형 레이아웃
단축키: Shift + A
사용: 모든 컨테이너에 적용 필수
```

---

## 📱 반응형 버전

### 태블릿 (768px)
```
1. Desktop 페이지 복제
2. Frame 크기: 768 x 1024
3. 메인 컨테이너: 95% 너비
4. 통계 그리드: 2열로 조정
5. 사이드바: 오버레이 방식
```

### 모바일 (375px)  
```
1. Frame 크기: 375 x 812
2. 모든 요소 1열 스택
3. 버튼: Full width
4. 패딩: 16px로 축소
5. 폰트 크기: 1단계 축소
```

---

## 🎭 프로토타이핑

### 기본 인터랙션
```
1. Prototype 모드 전환
2. 메뉴 버튼 → 사이드바 열기
3. 탭 버튼 → 콘텐츠 전환  
4. Smart animate 적용
5. Duration: 0.3초
```

### 테마 토글
```
1. Light/Dark 페이지 생성
2. 테마 버튼에 인터랙션 연결
3. Transition: Dissolve
4. Duration: 0.2초
```

---

## 💡 시간 절약 팁

### 🔥 **복사/붙여넣기 활용**
```
1. 웹 페이지의 컴포넌트 스크린샷
2. 피그마에 붙여넣기 (Ctrl+V)
3. 위에 Vector로 다시 그리기
4. 정확한 비율과 간격 유지
```

### 🔥 **Component Variants**
```
1. 기본 컴포넌트 생성 후
2. 우클릭 → "Add variant"
3. Properties 설정:
   - State: Default, Hover, Active
   - Size: Small, Medium, Large
   - Theme: Light, Dark
```

### 🔥 **Keyboard Shortcuts**
```
F: Frame tool
R: Rectangle  
T: Text tool
Shift+A: Auto layout
Ctrl+G: Group
Ctrl+Alt+K: Create component
Ctrl+Alt+B: Create component set
```

---

## 📋 완성 후 체크포인트

### ✅ **품질 검수**
- [ ] 일관된 간격 (8px 단위)
- [ ] 통일된 컬러 팔레트
- [ ] 명확한 컴포넌트 이름
- [ ] Auto layout 적용 완료
- [ ] 반응형 동작 확인

### ✅ **개발 전달**  
- [ ] Dev Mode 설정
- [ ] Export settings 구성
- [ ] Spacing/sizing 명시
- [ ] 상태별 variants 완성
- [ ] 애니메이션 duration 기재

### ✅ **문서화**
- [ ] 컴포넌트 사용법 설명
- [ ] 디자인 의도 기록
- [ ] 인터랙션 플로우 문서
- [ ] 브랜드 가이드라인 첨부

---

## 🎯 완성된 시안의 모습

```
🖥️ AMP 통합 워크플로우
├── 📊 실시간 대시보드
├── 🧠 학습 관리 (Fine tuning, Biasing)  
├── 🚀 배포 관리 (모델 배포, 모니터링)
├── ✅ 검증 관리 (성능 테스트, 품질 평가)
└── 🧪 테스트 관리 (음성 인식 테스트)

💡 Glass morphism + Neumorphism 디자인
🌙 Light/Dark 테마 지원
📱 Mobile/Tablet 반응형  
⚡ 부드러운 마이크로 인터랙션
```

이 가이드를 따라하면 **1시간 이내에 전문적인 AMP 시안**을 완성할 수 있습니다! 🚀✨






