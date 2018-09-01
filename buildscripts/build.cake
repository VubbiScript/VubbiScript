//////////////////////////////////////////////////////////////////////
// ARGUMENTS
//////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release");

//////////////////////////////////////////////////////////////////////
// PREPARATION
//////////////////////////////////////////////////////////////////////

// Define directories.
var unityBuildProjectWebData = "./unity-project-auto-package-build/Assets/Editor Default Resources/Editor/VubbiScript/Vubbi.data";
var unityBuildProjectDllDir = Directory("./unity-project-auto-package-build/Assets/Editor Default Resources/Editor/VubbiScript");

//////////////////////////////////////////////////////////////////////
// TASKS
//////////////////////////////////////////////////////////////////////

Task("Clean")
    .Does(() =>
{
    CleanDirectory(Directory("./unity-project-auto-package-build/Assets/Editor Default Resources/Editor/VubbiScript"));
    DeleteFiles("../bin/*.unitypackage");
    CleanDirectory(Directory("./temp"));
    CleanDirectory(Directory("./temp/web"));
    CleanDirectory(Directory("./temp/web/blockly"));
    CleanDirectory(Directory("./temp/web/blockly/msg"));
    CleanDirectory(Directory("./temp/web/blockly/msg/js"));
    
    // Clean docs directories also
    CleanDirectory(Directory("../bin/app_no_edit"));
    CleanDirectory(Directory("../bin/app_no_edit/msg"));
});


Task("BuildDll")
    .IsDependentOn("Clean")
    .Does(() =>
{
  // Use MSBuild
  Information("-- begin -- Vubbi Dll Build");
  MSBuild("./BuildCSharpCode/VubbiBuild/VubbiBuild.csproj", settings =>
     settings.SetConfiguration(configuration).WithTarget("Clean").WithTarget("Build"));
  Information("-- end -- Vubbi Dll Build");
  
  // Copy Dll files
  CopyFiles("../src/unity-project/Assets/Editor Default Resources/Editor/VubbiScriptSource/Lib/*.dll", unityBuildProjectDllDir);
  CopyFiles("./BuildCSharpCode/VubbiBuild/bin/Release/Vubbi.dll", unityBuildProjectDllDir);
  
  // Copy Icon
  CopyFiles("../src/unity-project/Assets/Editor Default Resources/Editor/VubbiScript/*", unityBuildProjectDllDir);
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
  CopyDirectory("../src/web/blockly/media", "./temp/web/blockly/media");
  //CopyDirectory("../src/web/bootstrap/fonts", "./temp/web/fonts");
  CopyFileToDirectory("../src/web/toolbox.xml", Directory("./temp/web"));
  CopyFileToDirectory("../src/web/blockly/msg/js/en.js", Directory("./temp/web/blockly/msg/js"));
  CopyFileToDirectory("../src/web/blockly/msg/js/nl.js", Directory("./temp/web/blockly/msg/js"));
  
  // Copy files for docs also
  CopyDirectory("../src/web/blockly/media", "../bin/app_no_edit/blockly/media");
  //CopyDirectory("../src/web/bootstrap/fonts", "../bin/app_no_edit/fonts");
  CopyFileToDirectory("../src/web/blockly/msg/js/en.js", Directory("../bin/app_no_edit/msg"));
  CopyFileToDirectory("../src/web/blockly/msg/js/nl.js", Directory("../bin/app_no_edit/msg"));
  
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
  Information("-- end -- Building single-page-HTML code");
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