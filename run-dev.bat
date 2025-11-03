@echo off
echo Windows Next.js 개발 서버 실행 스크립트
echo =======================================

REM 환경 변수 설정
set NEXT_TELEMETRY_DISABLED=1
set NODE_OPTIONS=--max-old-space-size=4096
set FORCE_COLOR=1

REM 기존 프로세스 종료
taskkill /f /im node.exe >nul 2>&1

REM 캐시 정리
if exist ".next" rmdir /s /q ".next"

REM 개발 서버 실행
echo 개발 서버를 시작합니다...
npm run dev

pause
