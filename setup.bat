@echo off
REM Setup Script for Bun Dependencies

setlocal enabledelayedexpansion

:: Configuration
set "CLIENT_DIR=."

:: Setup with Bun
echo [1/2] Setting up dependencies with Bun
cd %CLIENT_DIR%
if exist node_modules (
    echo node_modules already exists - skipping
) else (
    where bun >nul 2>&1 || (
        echo Installing Bun...
        powershell -noprofile -c "irm https://bun.sh/install | iex"
        set "PATH=%PATH%;%USERPROFILE%\.bun\bin"
    )
    bun install --silent
    if errorlevel 1 exit /b 1
)
cd ..

:: Success message
echo.
echo ********************************************
echo * SETUP COMPLETED SUCCESSFULLY             *
echo *                                          *
echo * Dependencies installed via Bun           *
echo ********************************************
endlocal