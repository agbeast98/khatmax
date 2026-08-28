@echo off
setlocal
title Khatmax Dev

pushd %~dp0\..

set NODE_ENV=development
set VSCODE_DEV=1
set VSCODE_CLI=1
set ELECTRON_ENABLE_LOGGING=1

set CODE=".build\electron\Khatmax.exe"

:: Launch without Copilot, with test extensions disabled
%CODE% . --disable-extension=vscode.vscode-api-tests --disable-extension=GitHub.copilot --disable-extension=GitHub.copilot-chat %*

popd
endlocal
