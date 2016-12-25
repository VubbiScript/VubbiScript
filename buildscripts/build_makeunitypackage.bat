@echo off

REM Get the absolute path of the unity project "./unity-project-auto-package-build"
SET "ProjectDir=.\unity-project-auto-package-build"
CALL :normaliseProjectDir "%ProjectDir%"
echo Opening project at %ProjectDir%

SET "UnityPackageFileName=../bin/scratchity.unitypackage"
CALL :normaliseUnityPackageFileName "%UnityPackageFileName%"
echo Saving file to %UnityPackageFileName%

REM It is possible to but -batchmode after -quit to run without generating any windows...
"C:\Program Files\Unity\Editor\Unity.exe" -quit -projectPath "%ProjectDir%" +exportscratchityunitypackage "%UnityPackageFileName%"

GOTO :EOF

:normaliseProjectDir
SET "ProjectDir=%~f1"
GOTO :EOF

:normaliseUnityPackageFileName
SET "UnityPackageFileName=%~f1"
GOTO :EOF