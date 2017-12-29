@echo off
echo.
echo.Building RequireJS code - App Mode
echo.
"C:\Program Files\nodejs\node" r.js -o build_requirejs_app.js
echo.
echo.Building RequireJS code - Docs Mode
echo.
"C:\Program Files\nodejs\node" r.js -o build_requirejs_app_no_edit.js