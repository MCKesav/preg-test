@echo off
title NurtureNet - Pregnancy Care App
color 0A

echo ========================================
echo    NurtureNet Development Server
echo ========================================
echo.

:: Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

echo Starting development server...
echo.
echo Once started, open: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

npm run dev
