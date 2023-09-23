@echo off

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please download and install it from https://nodejs.org/
    pause
    exit
)

REM Install dependencies
npm install express multer ejs

REM Pause the script
pause