@echo off
echo ========================================
echo  STT-SMP 통합 관리 시스템 실행
echo ========================================
echo.
echo 로컬 웹 서버를 시작합니다...
echo 브라우저에서 http://localhost:8000 으로 접속하세요
echo.
echo 종료하려면 Ctrl+C를 누르세요
echo ========================================
echo.

REM Python이 설치되어 있는지 확인
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python이 설치되어 있지 않습니다.
    echo 다음 중 하나의 방법으로 서버를 실행하세요:
    echo.
    echo 1. Python 설치 후 다시 실행
    echo 2. index.html 파일을 브라우저에서 직접 열기
    echo 3. 다른 웹 서버 사용
    echo.
    pause
    exit /b 1
)

REM 브라우저 자동 실행 (5초 후)
start "" timeout /t 5 /nobreak && start http://localhost:8000

REM Python 웹 서버 시작
python -m http.server 8000