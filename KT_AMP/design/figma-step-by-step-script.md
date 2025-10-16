# Figma 단계별 실행 스크립트

## 🎯 실제 Figma에서 따라하기 - 정확한 단계별 가이드

### 🚀 시작하기
1. **Figma 접속**: https://www.figma.com/
2. **새 파일 생성**: "Create new" → "Design file"
3. **파일명 설정**: "KT-STT 시스템 모니터링 대시보드"

---

## 📑 Step 1: 페이지 구조 만들기

### 1.1 페이지 생성
```
좌측 사이드바에서 "Page 1" 우클릭 → "Rename" → "🎨 Design System"

+ 버튼 클릭하여 새 페이지들 생성:
- 🖥️ Desktop (1920x1080)
- 📱 Tablet (768x1024)  
- 📱 Mobile (375x812)
- 🧩 Components
```

---

## 🎨 Step 2: Design System 페이지 - Color Styles

### 2.1 브랜드 컬러 생성
```
🎨 Design System 페이지로 이동

1. Rectangle 도구(R) 클릭
2. 100x100px 사각형 생성
3. 우측 Fill 섹션에서 색상 #e31e24 입력
4. Fill 옆 4개 점 아이콘 클릭 → "Create style" → "KT/Red/Primary"

같은 방식으로 생성:
- KT/Red/Light: #ff4449
- KT/Red/Dark: #c41e3a
```

### 2.2 시스템 컬러 생성
```
CPU 컬러:
- System/CPU/Primary: #3b82f6
- System/CPU/Light: #60a5fa  
- System/CPU/Dark: #1d4ed8
- System/CPU/Background: #eff6ff

Memory 컬러:
- System/Memory/Primary: #10b981
- System/Memory/Light: #34d399
- System/Memory/Dark: #047857
- System/Memory/Background: #ecfdf5

Storage 컬러:
- System/Storage/Primary: #8b5cf6
- System/Storage/Light: #a78bfa
- System/Storage/Dark: #7c3aed
- System/Storage/Background: #f3e8ff

Network 컬러:
- System/Network/Primary: #f59e0b
- System/Network/Light: #fbbf24
- System/Network/Dark: #d97706
- System/Network/Background: #fffbeb
```

### 2.3 중성 컬러 생성
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

- Background/Primary: #ffffff
- Background/Secondary: #f8fafc
- Background/Tertiary: #f1f5f9
```

---

## 📝 Step 3: Text Styles 생성

### 3.1 텍스트 스타일 생성
```
1. Text 도구(T) 클릭
2. "제목" 입력
3. 우측에서 폰트 설정:
   - Font: Noto Sans KR (없으면 Inter 사용)
   - Size: 32px
   - Weight: Bold (700)
4. 텍스트 선택 상태에서 4개 점 아이콘 → "Create style" → "Heading/H1"

계속 생성:
- Heading/H2: 20px, Bold
- Card/Title: 16px, Semibold (600)
- Body/Base: 14px, Regular (400)
- Body/Small: 12px, Regular
- Metric/Value: 32px, Bold
- Caption: 10px, Regular
```

---

## 🔧 Step 4: Effect Styles 생성

### 4.1 그림자 효과 생성
```
1. Rectangle 100x100px 생성
2. 우측 Effects 섹션에서 + 클릭
3. Drop shadow 선택
4. 설정값:
   - X: 0, Y: 1
   - Blur: 3, Spread: 0
   - Color: #000000, Opacity: 10%
5. Effects 옆 4개 점 → "Create style" → "Shadow/Base"

계속 생성:
- Shadow/SM: X:0, Y:1, Blur:2, Opacity:5%
- Shadow/MD: X:0, Y:4, Blur:6, Opacity:10%  
- Shadow/LG: X:0, Y:10, Blur:15, Opacity:10%
```

---

## 🧩 Step 5: Components 페이지 - 기본 컴포넌트

### 5.1 Button 컴포넌트 제작
```
🧩 Components 페이지로 이동

1. Rectangle 도구(R) → 사각형 생성
2. 우측에서 Auto layout 아이콘 클릭 (Shift+A)
3. Text 도구(T) → "Button" 입력
4. 설정:
   - Direction: Horizontal
   - Padding: 12px 24px
   - Gap: 8px
   - Corner radius: 8px
   - Fill: KT/Red/Primary
   - Text: Body/Base, White
5. 전체 선택 → 우클릭 → "Create component" (Ctrl+Alt+K)
6. 컴포넌트명: "Button"

변형 생성:
7. 우측 Properties에서 "Create variant" 클릭
8. Property name: "Type", Values: "Primary, Secondary"
9. Secondary 변형: Fill을 Neutral/100, Text를 Neutral/700로 변경
```

### 5.2 Progress Bar 컴포넌트
```
1. Rectangle 300x8px 생성 → Fill: Neutral/200, Corner radius: 4px
2. Rectangle 150x8px 생성 → Fill: System/CPU/Primary, Corner radius: 4px
3. 두 번째 사각형을 첫 번째 위에 정렬
4. 두 개 선택 → Group (Ctrl+G)
5. Group 우클릭 → "Create component"
6. 컴포넌트명: "Progress Bar"

변형 생성:
7. "Create variant" → Property: "Type"
8. Values: "CPU, Memory, Storage, Network"
9. 각 변형별로 진행률 부분 색상 변경
```

### 5.3 Status Badge 컴포넌트
```
1. Rectangle → Auto layout 적용
2. Text "EXCELLENT" 추가
3. 설정:
   - Padding: 4px 12px
   - Corner radius: 9999px
   - Fill: Status/Excellent
   - Text: Caption, Bold, White
4. Create component
5. Create variant → Property: "Status"
6. Values: "Excellent, Good, Warning, Critical"
7. 각 변형별 색상 설정
```

---

## 🏗️ Step 6: 메트릭 카드 컴포넌트

### 6.1 기본 구조 생성
```
1. Frame 도구(F) → 395x180px 프레임 생성
2. 프레임명: "Metric Card"
3. 설정:
   - Fill: Background/Primary
   - Corner radius: 12px
   - Effect: Shadow/Base
4. Auto layout 적용:
   - Direction: Vertical
   - Padding: 20px
   - Gap: 12px
```

### 6.2 상단 컬러 바 추가
```
1. Rectangle 395x4px 생성
2. Fill: System/CPU/Primary
3. 프레임 맨 위에 배치
4. Auto layout에서 "Absolute position" 설정
```

### 6.3 헤더 영역 생성
```
1. Frame 생성 → Auto layout 적용
2. Direction: Horizontal, Alignment: Space between
3. 좌측 컬럼:
   - Frame → Auto layout Vertical
   - Text "CPU 사용률" (Card/Title)
   - Text "전체 서버 평균 CPU 사용량" (Body/Small, Neutral/600)
4. 우측 아이콘:
   - Circle 40x40px
   - Fill: Linear gradient (System/CPU/Primary → System/CPU/Light)
   - Icon 추가 (Iconify 플러그인 사용 추천)
```

### 6.4 수치 영역
```
1. Text "45.2%" 추가
2. 스타일: Metric/Value
3. Color: System/CPU/Primary
```

### 6.5 상세 정보 영역
```
1. Frame → Auto layout Horizontal, Space between
2. 좌측: Text "↓ 2.3% 감소" (Body/Small, Status/Excellent)
3. 우측: Status Badge 컴포넌트 인스턴스
```

### 6.6 프로그레스 바
```
1. Progress Bar 컴포넌트 인스턴스 추가
2. Type: CPU로 설정
```

### 6.7 컴포넌트 완성
```
1. 전체 프레임 선택 → Create component
2. 컴포넌트명: "Metric Card"
3. Create variant → Property: "Type"
4. Values: "CPU, Memory, Storage, Network"
5. 각 변형별로 색상 및 텍스트 수정:
   - CPU: 블루 계열, "CPU 사용률"
   - Memory: 그린 계열, "메모리 사용률"  
   - Storage: 퍼플 계열, "스토리지 사용률"
   - Network: 오렌지 계열, "네트워크 사용률"
```

---

## 📊 Step 7: 차트 컨테이너 컴포넌트

### 7.1 메인 차트 컨테이너
```
1. Frame 1093x420px 생성
2. 설정:
   - Fill: Background/Primary
   - Corner radius: 12px
   - Effect: Shadow/Base
   - Auto layout: Vertical, Padding: 24px, Gap: 16px

3. 헤더 추가:
   - Frame → Auto layout Horizontal, Space between
   - 좌측: Text "시스템 리소스 추이" (Chart/Title)
   - 우측: 버튼 그룹 (1시간, 6시간, 24시간, 7일)

4. 차트 영역:
   - Rectangle → Fill container width, 350px height
   - Fill: Neutral/50 (placeholder)
   - Text "Chart Area" 추가

5. Create component → "Chart Container Main"
```

### 7.2 도넛 차트 컨테이너
```
1. Frame 547x420px 생성
2. 동일한 설정 적용
3. 도넛 차트 영역:
   - Circle 200px
   - Stroke: 30px, Fill: None
   - Stroke colors: 각 리소스별 색상 (4등분)
4. 범례 추가:
   - 4개 항목, 각각 색상 사각형 + 라벨 + 수치
5. Create component → "Chart Container Donut"
```

---

## 🖥️ Step 8: Desktop 레이아웃 조립

### 8.1 아트보드 설정
```
🖥️ Desktop 페이지로 이동

1. Frame 도구(F) → 1920x1080px
2. 프레임명: "Desktop Dashboard"
3. Fill: Linear gradient
   - Type: Linear
   - Angle: 135°
   - Stop 1: Background/Secondary (0%)
   - Stop 2: Background/Tertiary (100%)
```

### 8.2 컨테이너 구조
```
1. Desktop Dashboard 프레임에 Auto layout 적용
2. Direction: Horizontal
3. Padding: 0
4. Gap: 0
```

### 8.3 사이드바 생성
```
1. Frame 280x1080px 생성
2. 프레임명: "Sidebar"
3. 설정:
   - Fill: Background/Primary
   - Effect: Shadow/LG
   - Auto layout: Vertical, Padding: 24px, Gap: 32px

4. 헤더 추가:
   - Text "AICP MANAGEMENT PORTAL" (Body/Base, Bold)
   - Text "HW 리소스 현황" (Body/Small, Neutral/600)

5. 네비게이션 섹션들:
   각 섹션마다:
   - Text 섹션 제목 (Caption, Neutral/500, Uppercase)
   - 네비게이션 아이템들 (Body/Base, 활성/비활성 상태)
```

### 8.4 메인 컨텐츠 영역
```
1. Frame → Fill container width, 1080px height
2. 프레임명: "Main Content"
3. Auto layout: Vertical, Padding: 24px, Gap: 24px

4. 헤더 추가:
   - Frame 1592x120px
   - Fill: KT Red gradient
   - Corner radius: 12px
   - 내용: 제목, 부제목, 상태 표시

5. 메트릭 카드 그리드:
   - Frame → Auto layout Horizontal, Gap: 16px
   - 4개 Metric Card 컴포넌트 인스턴스 추가
   - 각각 Type 설정: CPU, Memory, Storage, Network

6. 차트 섹션:
   - Frame → Auto layout Horizontal, Gap: 24px
   - Chart Container Main 인스턴스
   - Chart Container Donut 인스턴스

7. 상세 정보 섹션:
   - Frame → Auto layout Horizontal, Gap: 24px
   - 서버 현황 카드
   - 실시간 알림 카드
```

---

## 📱 Step 9: 반응형 버전

### 9.1 Tablet 버전
```
📱 Tablet 페이지로 이동

1. Desktop 레이아웃 복사 (Ctrl+C)
2. Tablet 페이지에서 붙여넣기 (Ctrl+V)
3. Frame 크기: 768x1024px로 변경
4. 수정사항:
   - Container: Direction을 Vertical로 변경
   - Sidebar: 768px width, 80px height
   - 메트릭 카드: 2x2 그리드로 재배열
   - 차트: 세로 배치
```

### 9.2 Mobile 버전
```
📱 Mobile 페이지로 이동

1. Tablet 레이아웃 복사
2. Frame 크기: 375x812px로 변경
3. 수정사항:
   - Sidebar: 숨김 처리
   - 메트릭 카드: 1열로 배치
   - 패딩: 12px로 축소
   - 폰트 크기: 축소 조정
```

---

## 🎭 Step 10: 인터랙션 추가

### 10.1 버튼 호버 효과
```
1. Button 컴포넌트 편집 모드 진입 (더블클릭)
2. 우측 Prototype 탭 클릭
3. + 버튼 → "While hovering" 선택
4. Change to → Create new variant
5. 새 variant에서:
   - Y position: -1px
   - Effect: Shadow/MD 추가
6. Animation: Ease out, 200ms
```

### 10.2 메트릭 카드 호버
```
1. Metric Card 컴포넌트 편집
2. While hovering 설정
3. 새 variant:
   - Transform: Y -2px
   - Effect: Shadow/LG
4. Animation: Ease out, 300ms
```

### 10.3 차트 컨트롤 인터랙션
```
1. Chart Container 내 버튼들
2. On click → Change to active state
3. Active state:
   - Fill: KT/Red/Primary  
   - Text: White
4. Animation: Ease out, 200ms
```

---

## 📋 Step 11: 최종 정리 및 문서화

### 11.1 컴포넌트 정리
```
🧩 Components 페이지에서:
1. 모든 컴포넌트 정리 및 그룹핑
2. Description 추가:
   - 사용 방법
   - 주의사항
   - 변형 설명
```

### 11.2 라이브러리 설정
```
1. 상단 메뉴 → "Libraries" → "Publish styles & components"
2. 팀과 공유하여 일관성 유지
```

### 11.3 프로토타입 완성
```
1. Desktop 페이지에서 전체 선택
2. Prototype 탭 → "Present" 버튼으로 테스트
3. 모든 인터랙션 동작 확인
```

---

## ✅ 완성 체크리스트

### Design System
- [ ] Color Styles 30개 생성 완료
- [ ] Text Styles 8개 생성 완료  
- [ ] Effect Styles 4개 생성 완료

### Components
- [ ] Button 컴포넌트 (2 types, 4 states)
- [ ] Progress Bar 컴포넌트 (4 types)
- [ ] Status Badge 컴포넌트 (4 statuses)
- [ ] Metric Card 컴포넌트 (4 types, 2 states)
- [ ] Chart Container 컴포넌트 (2 sizes)

### Pages  
- [ ] Desktop Layout (1920x1080) 완성
- [ ] Tablet Layout (768x1024) 완성
- [ ] Mobile Layout (375x812) 완성

### Interactions
- [ ] Button hover/click 상태
- [ ] Card hover 효과
- [ ] Chart control 인터랙션
- [ ] Responsive breakpoints

### Final
- [ ] 컴포넌트 문서화
- [ ] 프로토타입 테스트
- [ ] 팀 라이브러리 게시

---

## 🎉 완성!

이제 **실제 웹페이지와 동일한 Figma 디자인 파일**이 완성되었습니다!

### 다음 단계:
1. **팀과 공유**: 개발자, 기획자와 협업
2. **피드백 수집**: 사용성 개선점 파악  
3. **반복 개선**: 지속적인 디자인 업데이트
4. **개발 핸드오프**: 정확한 스펙 전달

🚀 **축하합니다! 완벽한 시스템 모니터링 대시보드 Figma 파일 완성!** 🎨
