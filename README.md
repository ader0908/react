# AMP 엔진별 통합 모니터링 대시보드

## 개요
AMP(Advanced Monitoring Platform) 엔진별 통합 모니터링 대시보드입니다.

## 주요 기능
- **실시간 모니터링**: CPU, 메모리, 디스크 사용률 모니터링
- **STT/TTS/SV 서비스 모니터링**: 각 서비스별 요청/실패 건수, 성능 지표 추적
- **대시보드 관리**: 공용/개인 대시보드 선택 및 관리
- **뷰모드/수정모드**: 조회 전용 모드와 편집 가능한 모드 지원
- **서버 목록 관리**: 활성 서버 목록 및 상태 모니터링

## 사용 방법

### 페이지 실행
```bash
npm start
# 또는
npm run dev
# 또는
npm run open
```

### 브라우저에서 직접 실행
`amp-engine-monitoring-dashboard.html` 파일을 브라우저에서 열기

## 대시보드 유형

### 공용 대시보드 (관리자용)
1. **관리자1**: 시스템 전체 모니터링
2. **관리자2**: 서비스별 상세 모니터링  
3. **관리자3**: 성능 분석 대시보드

### 개인 대시보드 (사용자용)
1. **1.대시보드**: 기본 모니터링
2. **2.대시보드**: STT/TTS 전용
3. **3.대시보드**: 전체 서비스 모니터링

## 기술 스택
- HTML5
- CSS3 (CSS Variables, Flexbox, Grid)
- JavaScript (ES6+)
- Chart.js (차트 라이브러리)
- Font Awesome (아이콘)
- Inter Font (타이포그래피)

## 파일 구조
```
dashboard/
├── amp-engine-monitoring-dashboard.html  # 메인 대시보드 파일
├── package.json                          # 프로젝트 설정
├── README.md                             # 프로젝트 문서
└── *.svg                                 # UI 컴포넌트 참고용 SVG 파일들
```

## 개발자 정보
- 개발: 라피치
- 버전: 1.0.0
- 라이선스: MIT