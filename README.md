# React + TypeScript + Vite

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    # Lotus_Shrine — Setup & Developer Guide

    This document describes how to set up and run the Lotus_Shrine project on a Windows development machine (XAMPP + Node/Bun). The steps below assume you have the repository checked out locally.

    # Lotus_Shrine — Project summary & quick setup

    This README summarizes the project structure, explains how to set up the app locally (Windows + XAMPP), and includes the contents of the project's helper scripts for convenience.

    If you want me to produce additional artifacts (automated setup script that copies/copies into XAMPP, or Docker Compose), say so and I will generate them.

    ---

    ## Repository overview (high level)

    - frontend: React + TypeScript app built with Vite (see package.json). Frontend live dev server typically runs at http://localhost:5173.
    - backend: PHP-based backend located under `backend/lotus_shrine` (copy to XAMPP `htdocs` to serve via Apache).
    - database: SQL dump files live in `src/database/` (notably `lotus_shrine.sql`) — import these to create the schema and seed data.
    - scripts: `start.bat` (starts frontend dev server), `setup.bat` (installs frontend deps via Bun).

    ## Important files and folders (quick catalog)

    - `package.json` — frontend dependencies and scripts (dev/build/preview).
    - `src/database/lotus_shrine.sql` — full DB dump including tables, data, indexes, and constraints.
    - `backend/lotus_shrine/` — PHP files (API endpoints). Copy to `C:\xampp\htdocs\lotus_shrine` for Apache to serve.
    - `start.bat` — helper that launches frontend dev server (`bun dev` or `npm run dev`).
    - `setup.bat` — helper that installs frontend dependencies using Bun (falls back to installing Bun if not present).

    ---

    ## Clean, step-by-step local setup (Windows, XAMPP)

    1) Install prerequisites
       - Install XAMPP: https://www.apachefriends.org/
       - Install Node.js (or Bun) and npm; ensure `node`/`npm` or `bun` are on PATH.
       - Optional: Git and a terminal (PowerShell recommended).

    2) Copy backend into XAMPP
       - Copy `backend/lotus_shrine` into `C:\xampp\htdocs\` so backend path becomes `C:\xampp\htdocs\lotus_shrine`.

    3) Import database
       - Open phpMyAdmin and import `src/database/lotus_shrine.sql`, or use the MySQL CLI:

    ```powershell
    mysql -u root -p < "C:\path\to\repo\src\database\lotus_shrine.sql"
    ```

    4) Configure backend database credentials
       - Edit the PHP config file in `C:\xampp\htdocs\lotus_shrine` (look for `config.php`, `.env`, or database connection code) and set DB host/user/password/dbname.

    5) Start the frontend
       - From repo root:
         - With Bun:

    ```bash
    bun install
    bun dev
    ```

         - Or with npm:

    ```bash
    npm install
    npm run dev
    ```

       - Or use the included `start.bat` (double-click) which will attempt `bun dev` then fallback to `npm run dev`.

    6) Access the app
       - Frontend: http://localhost:5173
       - Backend API: http://localhost/lotus_shrine

    ---

    ## Files requested (contents below)

    ### 1) README.md (this file)

    — this document (you are reading it)

    ### 2) setup.bat

    The repository's `setup.bat` installs frontend dependencies via Bun (it attempts to install Bun if missing). Below is the exact content from the repo:

    ```bat
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
    ```

    ### 3) start.bat

    The repository's `start.bat` launches the frontend dev server in a new cmd window. It prefers `bun` and falls back to `npm run dev`. Exact content below:

    ```bat
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
    ```

    ---

    ## Quick analysis & notes (developer-focused)

    - Frontend tech: React 19, Vite, Tailwind CSS and many UI/animation libraries. Project uses TypeScript.
    - ML / pose detection: Uses `@teachablemachine/pose` and `@tensorflow/tfjs` in `src/pages/meditation.tsx`.
    - Database: `src/database/lotus_shrine.sql` is a full dump with users, quotes, ko_na_win tables and relationships — it includes sensitive-looking seeded user data (emails, hashed passwords). Treat this DB carefully.
    - Security: Database seeds include hashed passwords and email addresses. If this repo is public, consider removing PII and using sanitized seed data.
    - Scripts: `setup.bat` installs frontend deps via Bun; `start.bat` launches dev server. Both are Windows-centric. For cross-platform, consider npm scripts and documented commands.

    ## Recommended next actions

    1. Sanitize database seed data before sharing the repo publicly.
    2. Add a `README-DEV.md` with one-line commands and environment examples.
    3. (Optional) Create a `docker-compose.yml` for reproducible local development (PHP + MySQL + Node).

    If you want, I can now:
    - sanitize the SQL dump (remove PII) and produce a `seed.sql` safe for public repos, or
    - generate a Docker Compose file to run the stack locally.

    ---

    If you'd like these files saved elsewhere or exported, tell me which and I'll produce them.
