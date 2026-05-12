$ErrorActionPreference = "Stop"
$logPath = "D:\company-intro\src\assets\images\furutec\extract.log"
Start-Transcript -Path $logPath -Force | Out-Null
try {
Add-Type -AssemblyName System.Runtime.WindowsRuntime

# --- async helpers for WinRT IAsyncOperation<T> and IAsyncAction ---
$asTaskGen = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
})[0]
$asTaskAct = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction'
})[0]
function AwaitOp($op, $type) {
    $t = $asTaskGen.MakeGenericMethod($type).Invoke($null, @($op))
    $t.Wait(-1) | Out-Null
    $t.Result
}
function AwaitAct($action) {
    $t = $asTaskAct.Invoke($null, @($action))
    $t.Wait(-1) | Out-Null
}

# --- load WinRT types ---
[Windows.Data.Pdf.PdfDocument,        Windows.Data.Pdf,        ContentType=WindowsRuntime] | Out-Null
[Windows.Data.Pdf.PdfPageRenderOptions,Windows.Data.Pdf,        ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile,         Windows.Storage,         ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.StorageFolder,       Windows.Storage,         ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.CreationCollisionOption,Windows.Storage,      ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.FileAccessMode,      Windows.Storage,         ContentType=WindowsRuntime] | Out-Null

$pdfPath = "C:\Users\hieu hoang\AppData\Roaming\Claude\local-agent-mode-sessions\43741c84-4305-4991-b651-824d23b52aa8\9bf41990-9741-4e36-8dd7-d88f9a803470\local_3de8f02e-a4ff-4ae1-badf-ef047ebe87f1\uploads\FURUTEC - VIETNAM - Presentation - Vne 2026.pdf"
$outDir  = "D:\company-intro\src\assets\images\furutec\slides"

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$pdfFile = AwaitOp ([Windows.Storage.StorageFile]::GetFileFromPathAsync($pdfPath))           ([Windows.Storage.StorageFile])
$pdfDoc  = AwaitOp ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($pdfFile))             ([Windows.Data.Pdf.PdfDocument])
$folder  = AwaitOp ([Windows.Storage.StorageFolder]::GetFolderFromPathAsync($outDir))        ([Windows.Storage.StorageFolder])

Write-Host ("PDF pages: " + $pdfDoc.PageCount)

for ($i = 0; $i -lt $pdfDoc.PageCount; $i++) {
    $page = $pdfDoc.GetPage($i)
    $opts = New-Object Windows.Data.Pdf.PdfPageRenderOptions
    $opts.DestinationWidth = [uint32]1920
    $name = "page-{0:D2}.png" -f ($i + 1)

    $file   = AwaitOp ($folder.CreateFileAsync($name, [Windows.Storage.CreationCollisionOption]::ReplaceExisting)) ([Windows.Storage.StorageFile])
    $stream = AwaitOp ($file.OpenAsync([Windows.Storage.FileAccessMode]::ReadWrite))                              ([Windows.Storage.Streams.IRandomAccessStream])
    AwaitAct ($page.RenderToStreamAsync($stream, $opts))
    $stream.Dispose()
    Write-Host ("  saved " + $name)
}

Write-Host "DONE -> $outDir"
} catch {
    Write-Host "ERROR: $_"
    Write-Host $_.ScriptStackTrace
} finally {
    Stop-Transcript | Out-Null
}
