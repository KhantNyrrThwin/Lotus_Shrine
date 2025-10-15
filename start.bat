@echo off
title Lotus_Shrine - Start Backend & Frontend

:: Helpful startup script for Windows (cmd/powershell)
:: - Tries to start backend (PHP built-in if available) inside backend\lotus_shrine
:: - Tries to start frontend with bun dev, otherwise npm run dev
:: Adjust paths/ports as needed.

setlocal ENABLEDELAYEDEXPANSION

echo Starting Lotus_Shrine dev environment...

:: Frontend only startup (backend not required)
:: --- Frontend ---
echo.
echo Starting frontend...
cd /d "%~dp0"

:: Preference: bun dev, fallback: npm run dev
where /q bun
if %errorlevel% equ 0 (
	echo Found bun. Running bun dev in new window...
	start "Lotus_Frontend" cmd /k "cd /d "%~dp0" && bun dev"
) else (
	if exist "%~dp0package.json" (
		echo bun not found. Trying npm run dev...
		start "Lotus_Frontend" cmd /k "cd /d "%~dp0" && npm run dev"
	) else (
		echo No package.json found. Cannot start frontend.
	)
)

echo.
echo Done. Frontend and backend windows (if started) should be opening.
echo Frontend Vite/Bun: http://localhost:5173
echo.
echo Press any key to exit this window (script will keep servers running in their own windows)...
pause >nul
endlocal
