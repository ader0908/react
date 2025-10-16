# 🎨 Figma SVG Import 및 편집 가이드

## 📅 생성일: 2024년 12월 19일

## 🎯 개요

이 가이드는 **KT AMP 통합 모니터링 대시보드**의 편집 가능한 SVG 파일을 Figma에서 import하고 편집하는 방법을 제공합니다. SVG 파일은 완전한 편집 가능성을 고려하여 설계되었으며, Figma에서 모든 요소를 동적으로 수정할 수 있습니다.

---

## 📁 생성된 파일들

```
📂 KT_AMP/design/
├── 🎨 figma-editable-design-system.json     # 디자인 시스템 토큰
├── 🧩 figma-component-library.json          # 컴포넌트 라이브러리
├── 📝 figma-implementation-guide.md         # 구현 가이드
├── 🖼️ integrated-monitoring-editable.svg    # 편집 가능한 SVG 파일 ⭐
├── 📋 figma-svg-import-guide.md             # 이 파일 (SVG Import 가이드)
└── 🌐 integrated-monitoring-dashboard.html  # 통합 대시보드 HTML
```

---

## 🚀 Method 1: SVG 직접 Import (빠른 시작)

### Step 1: SVG 파일 Import

```
1️⃣ Figma 새 파일 생성
   - "Create new design file" 클릭
   - 파일명: "KT AMP 통합 모니터링 대시보드"

2️⃣ SVG 파일 가져오기
   - Figma 메뉴 → "File" → "Import"
   - "integrated-monitoring-editable.svg" 파일 선택
   - "Import" 클릭
   
3️⃣ 자동 변환 확인
   - SVG가 Figma 객체로 자동 변환됨
   - 모든 레이어 구조 유지
   - 그라디언트, 필터, 애니메이션 보존
```

### Step 2: 레이어 구조 확인

```
📂 Root Frame (1920x1080)
├── 🌈 Background (Primary Gradient)
├── 🗂️ Sidebar
│   ├── 🏷️ Logo Section
│   └── 🧭 Navigation
├── 🗂️ Main Content
│   ├── 📊 Header
│   ├── 📋 Page Header
│   ├── 🎛️ Monitoring Tabs
│   ├── 📈 Metrics Grid
│   │   ├── 🔧 CPU Metric Card
│   │   ├── 💾 Memory Metric Card
│   │   ├── 🎤 STT Metric Card
│   │   └── 🔊 TTS Metric Card
│   ├── 📊 Charts Section
│   │   ├── 📈 System Chart
│   │   └── 📊 Service Chart
│   └── 🖥️ Server Status Section
```

### Step 3: 즉시 편집 가능한 요소들

```
✅ 텍스트 편집:
   - 모든 숫자 값 (45.2%, 1,247 등)
   - 서버 이름 (c-pod-487 등)
   - 상태 메시지
   - 탭 제목

✅ 색상 변경:
   - 메트릭 카드 테마 색상
   - 프로그레스 바 색상
   - 상태 인디케이터 색상
   - 그라디언트 효과

✅ 레이아웃 조정:
   - 카드 크기 조정
   - 간격 조정
   - 요소 재배치
   - 새로운 카드 추가
```

---

## 🧩 Method 2: 컴포넌트화 (권장)

### Step 1: 메트릭 카드 컴포넌트 생성

```
1️⃣ CPU 메트릭 카드 선택
   - SVG에서 "metric-cpu" 그룹 선택
   - 우클릭 → "Create Component"
   - 이름: "MetricCard/Master"

2️⃣ Component Properties 설정
   - 우측 Properties 패널에서 "+" 클릭
   
   📊 Type (Variant):
   - CPU, Memory, STT, TTS, NLP, Translate
   - Default: CPU
   
   📝 Title (Text):
   - Default: "CPU 사용률"
   
   📄 Description (Text):
   - Default: "전체 서버 평균 CPU 사용량"
   
   🔢 Value (Text):
   - Default: "45.2%"
   
   📈 Change (Text):
   - Default: "2.3% 감소"
   
   ⭐ Status (Variant):
   - Excellent, Good, Warning, Critical
   - Default: Excellent
   
   📊 Progress (Number):
   - Default: 45.2
   - Min: 0, Max: 100
```

### Step 2: Variants 생성

```
1️⃣ Component Set 생성
   - MetricCard 컴포넌트 선택
   - 우클릭 → "Create component set"

2️⃣ Type Variants 설정
   📍 Type=CPU:
   - Top Border: #3b82f6
   - Icon Background: CPU Gradient
   - Value Color: #3b82f6
   - Progress Color: CPU Progress Gradient
   
   📍 Type=Memory:
   - Top Border: #10b981
   - Icon Background: Memory Gradient
   - Value Color: #10b981
   - Progress Color: Memory Progress Gradient
   
   📍 Type=STT:
   - Top Border: #06b6d4
   - Icon Background: STT Gradient
   - Value Color: #06b6d4
   - Progress Color: STT Progress Gradient
   
   📍 Type=TTS:
   - Top Border: #8b5cf6
   - Icon Background: TTS Gradient
   - Value Color: #8b5cf6
   - Progress Color: TTS Progress Gradient

3️⃣ Status Variants 설정
   ⭐ Status=Excellent:
   - Badge Background: rgba(72,187,120,0.1)
   - Badge Text: #48bb78
   
   ✅ Status=Good:
   - Badge Background: rgba(72,187,120,0.1)
   - Badge Text: #48bb78
   
   ⚠️ Status=Warning:
   - Badge Background: rgba(237,137,54,0.1)
   - Badge Text: #ed8936
   
   ❌ Status=Critical:
   - Badge Background: rgba(245,101,101,0.1)
   - Badge Text: #f56565
```

### Step 3: 탭 컴포넌트 생성

```
1️⃣ 모니터링 탭 컴포넌트
   - "monitoring-tabs" 그룹 선택
   - Component 생성: "MonitoringTabs/Master"

2️⃣ Properties 설정
   🎯 ActiveTab (Variant):
   - Overview, System, Services, Activity
   - Default: Overview

3️⃣ Variants 구현
   📊 ActiveTab=Overview:
   - 통합 현황 탭: Active 스타일
   - 나머지 탭: Inactive 스타일
   
   🖥️ ActiveTab=System:
   - 시스템 리소스 탭: Active 스타일
   - 나머지 탭: Inactive 스타일
   
   🎤 ActiveTab=Services:
   - AI 서비스 탭: Active 스타일
   - 나머지 탭: Inactive 스타일
   
   🔔 ActiveTab=Activity:
   - 실시간 활동 탭: Active 스타일
   - 나머지 탭: Inactive 스타일
```

### Step 4: 서버 아이템 컴포넌트 생성

```
1️⃣ 서버 아이템 컴포넌트
   - "server-1" 그룹 선택
   - Component 생성: "ServerItem/Master"

2️⃣ Properties 설정
   🏷️ ServerName (Text):
   - Default: "c-pod-487"
   
   🔧 CPUUsage (Text):
   - Default: "42%"
   
   💾 MemoryUsage (Text):
   - Default: "65%"
   
   💽 DiskUsage (Text):
   - Default: "28%"
   
   🚦 Status (Variant):
   - Online, Warning, Offline
   - Default: Online

3️⃣ Status Variants
   🟢 Status=Online:
   - Background: #f9fafb
   - Status Dot: #48bb78
   
   🟡 Status=Warning:
   - Background: #fffbeb
   - Status Dot: #ed8936
   
   🔴 Status=Offline:
   - Background: #fef2f2
   - Status Dot: #f56565
```

---

## 🎭 Method 3: 인터랙티브 프로토타입 생성

### Step 1: 기본 인터랙션 설정

```
1️⃣ 메트릭 카드 호버 효과
   - MetricCard 선택
   - 우측 Prototype 패널에서 "+" 클릭
   - Trigger: "Mouse enter"
   - Action: "Change to" → Hover state
   - Animation: "Smart animate"
   - Duration: 300ms
   - Easing: "Ease out"

2️⃣ 탭 클릭 인터랙션
   - 각 탭 버튼 선택
   - Trigger: "On click"
   - Action: "Change to" → 해당 탭 active state
   - Animation: "Smart animate"
   - Duration: 200ms

3️⃣ 차트 컨트롤 인터랙션
   - 차트 컨트롤 버튼들 선택
   - Trigger: "On click"
   - Action: "Change to" → Active state
   - Animation: "Dissolve"
   - Duration: 150ms
```

### Step 2: 고급 애니메이션

```
1️⃣ 상태 인디케이터 애니메이션
   - 상태 점(Status Dot) 선택
   - Prototype → "Add interaction"
   - Trigger: "After delay"
   - Delay: 0ms
   - Action: "Change to" → 자기 자신
   - Animation: "Smart animate"
   - Duration: 2000ms
   - 투명도 변화: 1 → 0.5 → 1

2️⃣ 프로그레스 바 애니메이션
   - 프로그레스 바 fill 선택
   - 너비 변화 애니메이션 설정
   - From: 0% → To: 실제 값
   - Duration: 1500ms
   - Easing: "Ease out"

3️⃣ 카운터 애니메이션 시뮬레이션
   - 숫자 텍스트 variants 생성
   - 숫자 변화 애니메이션
   - From: 0 → To: 실제 값
   - Duration: 2000ms
```

---

## 🔧 Method 4: 데이터 연동 시뮬레이션

### Step 1: Variables 활용

```
1️⃣ Local Variables 생성
   - 우측 패널 → "Variables" 탭
   - "Create variable" 클릭
   
   📊 시스템 메트릭 Variables:
   - cpu-usage (Number): 45.2
   - memory-usage (Number): 68.7
   - storage-usage (Number): 34.8
   - network-usage (Number): 23.1
   
   🎤 서비스 메트릭 Variables:
   - stt-requests (Number): 1247
   - tts-conversions (Number): 892
   - nlp-processing (Number): 634
   - translate-requests (Number): 278

2️⃣ Variable 바인딩
   - 각 메트릭 값 텍스트 선택
   - 우측 패널에서 Variable 연결
   - 실시간 업데이트 시뮬레이션 가능
```

### Step 2: Conditional Logic

```
1️⃣ 상태 기반 조건부 표시
   - IF cpu-usage > 80 THEN Status = "Critical"
   - IF cpu-usage > 60 THEN Status = "Warning"
   - IF cpu-usage <= 60 THEN Status = "Good"

2️⃣ 프로그레스 바 동적 조정
   - Progress Bar width = (cpu-usage / 100) * 268px
   - Color = IF cpu-usage > 80 THEN "red" ELSE "blue"

3️⃣ 서버 상태 자동 업데이트
   - Server status = IF any_metric > 80 THEN "Warning"
   - Background color = Status에 따라 자동 변경
```

### Step 3: 실시간 업데이트 시뮬레이션

```
1️⃣ 자동 새로고침 효과
   - Variables 값을 주기적으로 변경
   - Smart Animate로 부드러운 전환
   - 실제 모니터링 환경 시뮬레이션

2️⃣ 알림 시뮬레이션
   - Critical 상태 시 알림 표시
   - 색상 변화 애니메이션
   - 사용자 주의 끌기

3️⃣ 히스토리 데이터 표시
   - 차트 데이터 점진적 업데이트
   - 새로운 데이터 포인트 추가
   - 이전 데이터 페이드아웃
```

---

## 🎨 편집 가능한 주요 요소들

### ✅ **즉시 편집 가능**

#### 📊 **메트릭 카드**
```
🔧 CPU 사용률:
  - 값: "45.2%" → 임의 값으로 변경 가능
  - 변화량: "2.3% 감소" → 증가/감소 표시
  - 상태: EXCELLENT → GOOD/WARNING/CRITICAL
  - 프로그레스: 45.2% → 0-100% 범위

💾 메모리 사용률:
  - 값: "68.7%" → 실시간 업데이트 가능
  - 색상: 초록색 테마 → 다른 색상으로 변경
  - 아이콘: 💾 → 다른 아이콘으로 교체

🎤 STT 요청 수:
  - 값: "1,247" → 실제 API 데이터 연동
  - 증가율: "+12.5%" → 실시간 계산
  - 프로그레스: 85.2% → 목표 대비 진행률

🔊 TTS 변환 수:
  - 값: "892" → 동적 카운터 애니메이션
  - 상태: EXCELLENT → 성능에 따라 자동 변경
```

#### 🎛️ **탭 시스템**
```
📊 통합 현황: 기본 활성 상태
🖥️ 시스템 리소스: 클릭 시 활성화
🎤 AI 서비스: 서비스별 필터링
🔔 실시간 활동: 로그 스트림 표시
```

#### 🖥️ **서버 현황**
```
🟢 c-pod-487: Online (정상)
  - CPU: 42% → 실시간 업데이트
  - Memory: 65% → 임계치 알림
  - Disk: 28% → 용량 경고

🟢 c-pod-49: Online (정상)
  - 모든 메트릭 독립적 관리
  - 상태별 색상 자동 변경

🟡 c-pod-50: Warning (경고)
  - CPU: 76% → 경고 임계치 초과
  - 배경색 자동 변경 (#fffbeb)
  - 상태 점 주황색 표시
```

#### 📈 **차트 시스템**
```
시스템 리소스 차트:
  - 시간 범위: 1시간/6시간/24시간
  - 라인 색상: 각 메트릭별 고유 색상
  - 데이터 포인트: 실시간 추가

AI 서비스 차트:
  - STT/TTS/NLP/번역 개별 추적
  - 사용량 트렌드 분석
  - 서비스별 성능 비교
```

---

## 🚀 실무 활용 팁

### 💡 **빠른 수정 방법**

#### 1️⃣ **숫자 값 일괄 변경**
```
1. 모든 메트릭 카드 선택
2. 우클릭 → "Select all with same text style"
3. 일괄 편집으로 폰트 크기/색상 변경
4. Component Properties로 개별 값 조정
```

#### 2️⃣ **색상 테마 변경**
```
1. Color Styles 패널에서 기본 색상 수정
2. 모든 연결된 요소에 자동 적용
3. Gradient 방향/색상 세부 조정
4. 브랜드 가이드라인에 맞춰 커스터마이징
```

#### 3️⃣ **새로운 메트릭 추가**
```
1. 기존 MetricCard 컴포넌트 복사
2. Properties에서 Type variant 추가
3. 새로운 색상 스타일 생성
4. 아이콘 및 텍스트 내용 수정
```

### 🎯 **프로토타입 최적화**

#### 1️⃣ **성능 고려사항**
```
- 불필요한 애니메이션 제거
- 복잡한 필터 효과 최소화
- 큰 이미지 대신 SVG 아이콘 사용
- 중복된 그라디언트 정리
```

#### 2️⃣ **사용자 테스트 준비**
```
- 실제 데이터 범위로 테스트
- 다양한 상태 시나리오 준비
- 오류 상황 프로토타입 제작
- 접근성 고려 (색상 대비, 폰트 크기)
```

#### 3️⃣ **개발팀 인계**
```
- Component 구조 문서화
- CSS Variable 이름 매핑
- 상태 변화 로직 설명
- API 데이터 구조 정의
```

---

## 🔄 데이터 연동 가이드

### 📡 **실제 API 연동 시뮬레이션**

#### 1️⃣ **샘플 데이터 구조**
```json
{
  "systemMetrics": {
    "cpu": {
      "value": 45.2,
      "change": -2.3,
      "status": "excellent"
    },
    "memory": {
      "value": 68.7,
      "change": 5.1,
      "status": "good"
    }
  },
  "serviceMetrics": {
    "stt": {
      "requests": 1247,
      "change": 12.5,
      "successRate": 97.2
    },
    "tts": {
      "conversions": 892,
      "change": 8.3,
      "successRate": 98.1
    }
  },
  "servers": [
    {
      "name": "c-pod-487",
      "status": "online",
      "cpu": 42,
      "memory": 65,
      "disk": 28
    }
  ]
}
```

#### 2️⃣ **업데이트 주기**
```
🔄 실시간 메트릭: 5초마다
📊 차트 데이터: 30초마다
🖥️ 서버 상태: 10초마다
🔔 활동 로그: 실시간 스트림
```

#### 3️⃣ **상태 변화 로직**
```
임계치 설정:
- CPU > 80%: Critical
- CPU > 60%: Warning
- CPU ≤ 60%: Good

애니메이션 트리거:
- 값 변화 시: 부드러운 전환 (300ms)
- 상태 변화 시: 색상 페이드 (500ms)
- 새 데이터: 카운터 애니메이션 (1s)
```

---

## 🎉 완성 및 활용

### ✅ **구현 완료 체크리스트**

```
□ SVG 파일 성공적으로 Import
□ 모든 메트릭 카드 편집 가능 확인
□ 탭 시스템 인터랙션 동작 확인
□ 서버 상태 변경 테스트 완료
□ 차트 컨트롤 기능 테스트 완료
□ 색상 테마 변경 테스트 완료
□ 프로토타입 애니메이션 확인
□ 반응형 레이아웃 테스트 완료
```

### 🚀 **다음 단계 권장사항**

```
1️⃣ 사용자 테스트 진행
   - 다양한 시나리오로 테스트
   - 피드백 수집 및 반영

2️⃣ 개발팀과 협업
   - Design Token 동기화
   - API 연동 가이드 공유
   - Component 구조 설명

3️⃣ 브랜드 가이드라인 적용
   - 회사 브랜드 색상 적용
   - 폰트 및 스타일 가이드 준수
   - 접근성 표준 충족

4️⃣ 확장 및 개선
   - 새로운 메트릭 추가
   - 고급 인터랙션 구현
   - 성능 최적화
```

### 🎯 **실무 활용법**

```
📊 대시보드 프레젠테이션:
- 실시간 데이터 시뮬레이션
- 다양한 상태 시나리오 시연
- 이해관계자 설득 자료 활용

🔧 개발 가이드:
- CSS/JS 구현 참고 자료
- 컴포넌트 구조 설계 가이드
- 상태 관리 로직 참조

🎨 디자인 시스템:
- 다른 프로젝트에 재사용
- 컴포넌트 라이브러리 확장
- 일관성 있는 UX 구현
```

---

## 💡 문제 해결

### ⚠️ **자주 발생하는 문제들**

#### 1️⃣ **SVG Import 문제**
```
문제: SVG 파일이 깨져서 import됨
해결: 
- SVG 파일이 UTF-8 인코딩인지 확인
- 특수 문자나 이모지 제거 후 재시도
- 파일 크기가 10MB 이하인지 확인
```

#### 2️⃣ **텍스트 편집 불가**
```
문제: SVG 텍스트가 편집되지 않음
해결:
- 텍스트 레이어를 더블클릭
- "Ungroup" 후 개별 텍스트 선택
- Convert to text 기능 사용
```

#### 3️⃣ **그라디언트 적용 안됨**
```
문제: 그라디언트가 단색으로 표시됨
해결:
- 최신 Figma 버전 사용
- 브라우저 캐시 클리어
- Desktop 앱 사용 권장
```

#### 4️⃣ **애니메이션 끊김**
```
문제: 프로토타입 애니메이션이 부자연스러움
해결:
- Smart Animate 사용
- 동일한 레이어 이름 유지
- 불필요한 레이어 제거
```

---

**🎉 축하합니다!** 이제 Figma에서 완전히 편집 가능한 통합 모니터링 대시보드를 사용할 수 있습니다! 

실제 데이터와 연동하여 **살아있는 대시보드**를 만들어보세요! 🚀✨
