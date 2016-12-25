//////////////////////////////////////////////////////////////////////
// ARGUMENTS
//////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release");

//////////////////////////////////////////////////////////////////////
// PREPARATION
//////////////////////////////////////////////////////////////////////

// Define directories.
var unityBuildProjectWebData = "./unity-project-auto-package-build/Assets/Editor Default Resources/Editor/Scratchity/Scratchity.data";
var unityBuildProjectDllDir = Directory("./unity-project-auto-package-build/Assets/Editor Default Resources/Editor/Scratchity");

//////////////////////////////////////////////////////////////////////
// TASKS
//////////////////////////////////////////////////////////////////////

Task("Clean")
    .Does(() =>
{
    CleanDirectory(Directory("./unity-project-auto-package-build/Assets/Editor Default Resources/Editor/Scratchity"));
    DeleteFiles("../bin/*.unitypackage");
    CleanDirectory(Directory("./temp"));
    CleanDirectory(Directory("./temp/web"));
});


Task("BuildDll")
    .IsDependentOn("Clean")
    .Does(() =>
{
  // Use MSBuild
  Information("-- begin -- Scratchity Dll Build");
  MSBuild("./BuildCSharpCode/ScratchityBuild/ScratchityBuild.csproj", settings =>
     settings.SetConfiguration(configuration).WithTarget("Clean").WithTarget("Build"));
  Information("-- end -- Scratchity Dll Build");
  
  // Copy Dll files
  CopyFiles("../src/unity-project/Assets/Editor Default Resources/Editor/ScratchitySource/Lib/*.dll", unityBuildProjectDllDir);
  CopyFiles("./BuildCSharpCode/ScratchityBuild/bin/Release/Scratchity.dll", unityBuildProjectDllDir);
});

Task("BuildJS")
    .IsDependentOn("Clean")
    .Does(() =>
{
  Information("-- begin -- Blockly Build");
  var exitCodeWithArgument = StartProcess(".\\build_blockly.bat");
  // This should output 0 as valid arguments supplied
  Information("-- end -- Blockly Build");
  
  // Copy files
  CopyDirectory("../src/web/blockly/media", "./temp/web/media");
  CopyDirectory("../src/web/bootstrap/fonts", "./temp/web/fonts");
  CopyFileToDirectory("../src/web/toolbox.xml", Directory("./temp/web"));
  
  // JS files still go through some other process => see "MergeJSandHTML"
});

Task("BuildAppJS")
    .IsDependentOn("BuildJS")
    .Does(() =>
{
  Information("-- begin -- Building RequireJS code");
  var exitCodeWithArgument = StartProcess(".\\build_requirejs.bat");
  Information("-- end -- Building RequireJS code");
});

Task("MergeJSandHTML")
    .IsDependentOn("BuildAppJS")
    .Does(() =>
{
  // Make release mode for JS
  Information("-- begin -- Building single-page-HTML code");
  StartProcess("PowerShell.exe", "-ExecutionPolicy Bypass -File .\\build_singlepageindex.ps1");
  Information("-- begin -- Building single-page-HTML code");
});

Task("BuildWebReleaseZip")
    .IsDependentOn("BuildJS")
    .IsDependentOn("BuildAppJS")
    .IsDependentOn("MergeJSandHTML")
    .Does(() =>
{
  Zip(Directory("./temp/web"), unityBuildProjectWebData);
});

Task("BuildUnityPackage")
    .IsDependentOn("BuildDll")
    .IsDependentOn("BuildWebReleaseZip")
    .Does(() =>
{
  Information("-- begin -- Making Unity Asset Package");
  var exitCodeWithArgument = StartProcess(".\\build_makeunitypackage.bat");
  Information("-- end -- Making Unity Asset Package");
});

//////////////////////////////////////////////////////////////////////
// TASK TARGETS
//////////////////////////////////////////////////////////////////////

Task("Default")
    .IsDependentOn("BuildUnityPackage");

//////////////////////////////////////////////////////////////////////
// EXECUTION
//////////////////////////////////////////////////////////////////////

RunTarget(target);