(Get-Content ..\src\web\index.html) | Set-Content temp\web\index.html
(Get-Content temp\web\index.html) | ForEach-Object { $_ -replace '<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css"/>', '' } | Set-Content temp\web\index.html
(Get-Content temp\web\index.html) | ForEach-Object { $_ -replace '<link rel="stylesheet" type="text/css" href="style.css"/>', '<style>CSSCONTENTPLACEHOLDER</style>' } | Set-Content temp\web\index.html
(Get-Content temp\web\index.html) | ForEach-Object { $_ -replace '<script src="js/init.js"></script>', '' } | Set-Content temp\web\index.html
(Get-Content temp\web\index.html) | ForEach-Object { $_ -replace '<script src="js/lib/require.js"></script>', '<script>//<![CDATA[ SCRIPTPLACEHOLDER //]]></script>' } | Set-Content temp\web\index.html


$file = [IO.File]::ReadAllText((Resolve-Path "./temp/web/index.html"))

$cssa = [IO.File]::ReadAllText((Resolve-Path "../src/web/bootstrap/css/bootstrap.min.css"))
$cssb = [IO.File]::ReadAllText((Resolve-Path "../src/web/style.css"))

$jsa = [IO.File]::ReadAllText((Resolve-Path "../src/web/js/lib/require.js")).replace('</script>"', '</"+"script>"').replace("</script>'", "</'+'script>'")
$jsb = [IO.File]::ReadAllText((Resolve-Path "./temp/app.min.js")).replace('</script>"', '</"+"script>"').replace("</script>'", "</'+'script>'")


$file = $file.Replace('CSSCONTENTPLACEHOLDER', "
${cssa}${cssb}
");
$file = $file.Replace('SCRIPTPLACEHOLDER', "
${jsa}${jsb}

// Start the application
require(['app/Main'], function(){});
");

Set-Content -Encoding utf8 "./temp/web/index.html" $file