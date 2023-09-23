@echo off

REM Navigate to the script directory
cd /d "%~dp0"

REM Create an empty server.log file
type NUL > server.log

REM Start the server and capture the output
start /B cmd /C "node app.js > server.log 2>&1"

powershell -ExecutionPolicy Bypass -Command "Get-Content -Path 'server.log' -Tail 10 -Wait"

REM Display the server output in the Command Prompt window
type server.log

REM Pause the script
pause