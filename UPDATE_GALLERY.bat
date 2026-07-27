@echo off
cd /d "%~dp0"
python build_gallery.py
if errorlevel 1 py build_gallery.py
pause
