# Copy index.html to temp folder
(Get-Content ..\src\web\index.html) | Set-Content temp\web\index.html

# And start removing all the stylesheet and script includes...
(Get-Content temp\web\index.html) | ForEach-Object { $_ -replace '<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css"/>', '' } | Set-Content temp\web\index.html
(Get-Content temp\web\index.html) | ForEach-Object { $_ -replace '<link rel="stylesheet" type="text/css" href="highlight_style_agate.css"/>', '' } | Set-Content temp\web\index.html
(Get-Content temp\web\index.html) | ForEach-Object { $_ -replace '<link rel="stylesheet" type="text/css" href="style.css"/>', '<style>CSSCONTENTPLACEHOLDER</style>' } | Set-Content temp\web\index.html
(Get-Content temp\web\index.html) | ForEach-Object { $_ -replace '<script src="js/app_developmentmode_init.js"></script>', '' } | Set-Content temp\web\index.html
(Get-Content temp\web\index.html) | ForEach-Object { $_ -replace '<script src="js/lib/require.js"></script>', '<script>//<![CDATA[ SCRIPTPLACEHOLDER //]]></script>' } | Set-Content temp\web\index.html

# Then, read the remaining file
$file = [IO.File]::ReadAllText((Resolve-Path "./temp/web/index.html"))

# And all stylesheets
$cssa = [IO.File]::ReadAllText((Resolve-Path "../src/web/bootstrap/css/bootstrap.min.css"))
$cssb = [IO.File]::ReadAllText((Resolve-Path "../src/web/style.css"))
$cssc = [IO.File]::ReadAllText((Resolve-Path "../src/web/highlight_style_agate.css"))

$jsa = [IO.File]::ReadAllText((Resolve-Path "../src/web/js/lib/require.js")).replace('</script>"', '</"+"script>"').replace("</script>'", "</'+'script>'")
$jsb = [IO.File]::ReadAllText((Resolve-Path "./temp/app.min.js")).replace('</script>"', '</"+"script>"').replace("</script>'", "</'+'script>'")
$jsb2 = [IO.File]::ReadAllText((Resolve-Path "./temp/app_no_edit.min.js")).replace('</script>"', '</"+"script>"').replace("</script>'", "</'+'script>'")

# And put all the stylesheets and scripts inline!
$file = $file.Replace('CSSCONTENTPLACEHOLDER', "
${cssa}
${cssb}
${cssc}
");
$file = $file.Replace('SCRIPTPLACEHOLDER', "
${jsa}
${jsb}

// Start the application
require(['app/Main'], function(){});
");

$app_no_edit_js = "
/* VubbiScript Read-Only compiled JS */
${jsa}
${jsb2}
";
$app_no_edit_css = "
/* VubbiScript Read-Only compiled CSS */
${cssa}
${cssb}
${cssc}
";

# Finaly write the index.html file again
Set-Content -Encoding utf8 "./temp/web/index.html" $file

# And also output the "Read Only Include" in the docs folder.
Set-Content -Encoding utf8 "../bin/app_no_edit/app.js" $app_no_edit_js
Set-Content -Encoding utf8 "../bin/app_no_edit/app.css" $app_no_edit_css