# KT AMP 통합 관리 시스템

KT AMP (AI Model Platform) 통합 관리 시스템입니다.

## 📋 프로젝트 개요

여러 개의 분산된 AMP 관리 페이지를 하나의 통합 시스템으로 관리할 수 있는 웹 애플리케이션입니다.

## 🚀 주요 기능

### 1. 대시보드
- 시스템 전체 현황 모니터링
- 실시간 통계 및 차트
- 시스템 상태 확인

### 2. STT 학습관리
- 음성 인식 모델 학습 관리
- 프로젝트 상태 모니터링
- 학습 데이터 관리

### 3. TTS 기초데이터관리
- 음성 합성 기초 데이터 관리
- 음성 파일 관리
- 텍스트 데이터 관리

### 4. 공통설정
- 시스템 설정 관리
- 보안 설정
- 알림 설정
- 데이터 관리

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)
- **Styling**: CSS Custom Properties (CSS Variables)

## 📁 프로젝트 구조

```
kt-amp-unified/
├── index.html          # 메인 통합 페이지
├── README.md           # 프로젝트 설명서
└── .gitignore          # Git 무시 파일 목록
```

## 🚀 사용법

1. **로컬 실행:**
   ```bash
   # 웹 서버 실행 (Python 3)
   python -m http.server 8000
   
   # 또는 Python 2
   python -m SimpleHTTPServer 8000
   ```

2. **브라우저에서 접속:**
   ```
   http://localhost:8000
   ```

3. **메뉴 사용:**
   - 왼쪽 사이드바에서 원하는 메뉴 클릭
   - 상단 헤더의 실시간 모드로 데이터 새로고침

## 🎨 디자인 특징

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **일관된 색상 시스템**: Primary Blue/Purple 그라데이션
- **모던한 UI**: 카드 기반 레이아웃, 그림자 효과
- **직관적인 네비게이션**: 왼쪽 사이드바 메뉴
- **실시간 업데이트**: 실시간 모드 및 시간 표시

## 📊 차트 기능

- Chart.js를 활용한 실시간 차트
- 최고값 자동 표시
- 반응형 차트 크기 조정
- 다중 데이터셋 지원

## 🔧 개발 환경 설정

1. **저장소 클론:**
   ```bash
   git clone https://github.com/사용자명/kt-amp-unified.git
   cd kt-amp-unified
   ```

2. **로컬 서버 실행:**
   ```bash
   python -m http.server 8000
   ```

3. **브라우저에서 확인:**
   ```
   http://localhost:8000
   ```

## 📝 버전 관리

- **v1.0.0**: 초기 통합 시스템 구축
  - 4개 주요 메뉴 통합
  - 기존 디자인 스타일 유지
  - 실시간 모드 및 차트 기능

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 KT 내부 사용을 위한 프로젝트입니다.

## 📞 문의

프로젝트 관련 문의사항이 있으시면 개발팀에 연락해 주세요.

---

**개발일**: 2024년 9월 26일  
**버전**: v1.0.0  
**개발자**: KT AMP 개발팀














