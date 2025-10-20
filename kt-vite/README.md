# KT Vite 프로젝트 실행 가이드

## 1. 사전 요구사항
- Node.js 18 이상 설치 필요

## 2. 설치 및 실행

### 의존성 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```
실행 후 브라우저에서 `http://localhost:5173` 접속

### 프로덕션 빌드 (선택사항)
```bash
npm run build
npm run preview
```
빌드 후 `http://localhost:4173` 에서 확인

## 주의사항
⚠️ **파일을 직접 브라우저로 열지 마세요**
- `dist/index.html`을 더블클릭하여 직접 열면 CORS 오류 발생
- 반드시 `npm run dev` 또는 `npm run preview` 명령으로 서버 실행 필요

## 메뉴 구성
- 대시보드 (`/monitoring`)
- 공통설정 (`/settings`)
- 테이블 탬플릿 (`/table`)
- 스니펫 리스트 (`/snippet`)

## 프로젝트 구조
상세한 폴더 구조 및 코딩 규칙은 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) 참조

## 기술 스택
- React + Vite
- Tailwind CSS
- React Router (Hash Router)