# KT_AMP 로그인/회원가입 화면 Figma 디자인 스펙

## 📐 **레이아웃 구조**

### **전체 화면**
- **크기**: 1920 x 1080 (데스크톱 기준)
- **배경**: Linear Gradient (135도)
  - 시작: #667eea
  - 끝: #764ba2
- **중앙 정렬**: 로그인 컨테이너가 화면 중앙에 위치

### **로그인 컨테이너**
- **크기**: 400px (최대 너비)
- **배경**: rgba(255, 255, 255, 0.95) + Backdrop Blur
- **모서리**: 20px 둥근 모서리
- **그림자**: 0 20px 40px rgba(0, 0, 0, 0.1)
- **패딩**: 40px
- **테두리**: 1px solid rgba(255, 255, 255, 0.2)

## 🎨 **색상 팔레트**

### **Primary Colors**
- **KT Red**: #e31e24 (메인 브랜드 색상)
- **KT Red Dark**: #c41e3a (호버 상태)
- **KT Red Light**: rgba(227, 30, 36, 0.1) (포커스 상태)

### **Text Colors**
- **Primary Text**: #1a202c
- **Secondary Text**: #4a5568
- **Muted Text**: #718096

### **Status Colors**
- **Success**: #48bb78
- **Error**: #e53e3e
- **Warning**: #dd6b20
- **Info**: #3182ce

### **Background Colors**
- **White**: #ffffff
- **Light Gray**: #f7fafc
- **Medium Gray**: #e2e8f0
- **Border**: #cbd5e0

## 📝 **타이포그래피**

### **폰트 패밀리**
- **Primary**: 'Noto Sans KR'
- **Fallback**: -apple-system, BlinkMacSystemFont, sans-serif

### **폰트 크기**
- **Logo/Brand**: 28px (Bold)
- **H1 제목**: 24px (Semibold)
- **Body Text**: 16px (Regular)
- **Small Text**: 14px (Medium)
- **Caption**: 12px (Regular)

### **폰트 가중치**
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

## 🧩 **컴포넌트 설계**

### **로고 영역**
- **KT 로고**: 48x48px, 12px 둥근 모서리
- **배경**: Linear Gradient (#e31e24 → #ff4757)
- **텍스트**: "AMP" (18px, Bold, White)
- **브랜드명**: "KT_AMP" (28px, Bold, #1a202c)

### **탭 네비게이션**
- **컨테이너**: 
  - 배경: #f7fafc
  - 테두리: 1px solid #e2e8f0
  - 모서리: 12px
  - 패딩: 4px
- **탭 버튼**:
  - 비활성: #4a5568 (Medium)
  - 활성: #e31e24 (Semibold) + White 배경 + 그림자

### **입력 필드**
- **크기**: 100% 너비 x 52px 높이
- **패딩**: 16px 20px
- **테두리**: 2px solid #e2e8f0
- **모서리**: 12px
- **포커스**: 
  - 테두리: #e31e24
  - 그림자: 0 0 0 4px rgba(227, 30, 36, 0.1)
  - 변형: translateY(-2px)

### **버튼**
- **Primary 버튼**:
  - 배경: Linear Gradient (#e31e24 → #c41e3a)
  - 색상: White
  - 크기: 100% 너비 x 52px 높이
  - 모서리: 12px
  - 호버: translateY(-2px) + 그림자

### **체크박스**
- **크기**: 18x18px
- **테두리**: 2px solid #cbd5e0
- **모서리**: 4px
- **체크 시**: 배경 #e31e24 + 체크마크

## 📱 **반응형 브레이크포인트**

### **Desktop** (1200px+)
- 로그인 컨테이너: 400px 최대 너비
- 양쪽 여백: 자동 중앙 정렬

### **Tablet** (768px - 1199px)
- 로그인 컨테이너: 90% 너비
- 최대 너비: 500px

### **Mobile** (767px 이하)
- 로그인 컨테이너: 90% 너비
- 패딩: 24px
- 폰트 크기 조정

## 🎭 **상태별 스타일**

### **성공 상태**
- 테두리: #48bb78
- 아이콘: ✓ (Green)

### **오류 상태**
- 테두리: #e53e3e
- 배경: #fed7d7
- 텍스트: #c53030

### **로딩 상태**
- 스피너: 20px 둥근 애니메이션
- 색상: White
- 위치: 버튼 텍스트 앞

## 🌙 **다크모드 지원**

### **배경 색상**
- 컨테이너: rgba(26, 32, 44, 0.95)
- 입력 필드: #2d3748

### **텍스트 색상**
- Primary: #f7fafc
- Secondary: #a0aec0

### **테두리 색상**
- Primary: #4a5568
- Input: #4a5568

## ✨ **애니메이션**

### **배경 도형**
- 3개 둥근 도형이 6초 주기로 부유
- 투명도: 0.1
- 회전 + 상하 이동

### **폼 전환**
- 탭 변경 시 0.3초 fade 애니메이션
- 입력 필드 포커스 시 0.3초 ease 전환
- 버튼 호버 시 0.3초 변형

## 🎯 **Figma 구현 체크리스트**

### **1. 아트보드 설정**
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024) 
- [ ] Mobile (375x812)

### **2. 색상 스타일 생성**
- [ ] Primary Colors (KT Red 계열)
- [ ] Text Colors (Gray 계열)
- [ ] Status Colors (Success, Error 등)

### **3. 텍스트 스타일 생성**
- [ ] Noto Sans KR 폰트 설정
- [ ] 크기별 텍스트 스타일 (28px, 16px, 14px, 12px)
- [ ] 가중치별 스타일 (Regular, Medium, Semibold, Bold)

### **4. 컴포넌트 생성**
- [ ] 로고 컴포넌트
- [ ] 입력 필드 컴포넌트 (다양한 상태)
- [ ] 버튼 컴포넌트 (Primary, Secondary)
- [ ] 체크박스 컴포넌트
- [ ] 탭 네비게이션 컴포넌트

### **5. 화면 구성**
- [ ] 로그인 화면
- [ ] 회원가입 화면
- [ ] 오류 상태 화면
- [ ] 로딩 상태 화면

### **6. 프로토타이핑**
- [ ] 탭 전환 인터랙션
- [ ] 버튼 호버 효과
- [ ] 입력 필드 포커스 상태
- [ ] 오류/성공 메시지 표시

## 📤 **Figma 파일 구조**

```
KT_AMP_Login_Design/
├── 🎨 Styles/
│   ├── Colors/
│   └── Typography/
├── 🧩 Components/
│   ├── Logo
│   ├── Inputs
│   ├── Buttons
│   └── Navigation
├── 📱 Screens/
│   ├── Desktop
│   ├── Tablet
│   └── Mobile
└── 🔄 Prototypes/
    ├── Login Flow
    └── Register Flow
```

이 스펙을 기반으로 Figma에서 디자인을 재현하시면 됩니다!










