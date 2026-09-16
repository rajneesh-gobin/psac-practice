# Redraw the coverage line on the Facebook/WhatsApp share banner.
#
#   powershell -File scripts/rebuild-og-banner.ps1 -Line "PSAC Grades 1-6 . NCE Grades 7-9"
#
# WHY THIS EXISTS
# assets/og-banner.jpg started as a Gemini image, and a generated image cannot
# be regenerated: ask again and you get different artwork, not the same artwork
# with one line changed. The coverage sentence is DRAWN INTO the picture and has
# to stay in step with og:description, so it needs to be editable on its own.
#
# ⚠ WHAT IS MEASURED, not assumed (all of it re-derivable by re-running):
#   · the source is 1424x752; the three text bands sit at y=246..358 (title),
#     408..462 (tagline) and 498..532 (the coverage line this script replaces)
#   · the coverage line is left-aligned at x=134, same as the tagline
#   · its ink is 35px tall, and Arial Regular 46px renders at exactly 35px
#   · the original face is a neo-grotesque; Arial matches it closely and the
#     installed Segoe UI (humanist) does NOT. Arial BOLD is far too heavy.
#   · the text colour is 248,245,254 - a cool white, not pure #fff
#   · the illustration starts at x=1025, so the line has room to grow to ~890px
#
# ⚠ HOW THE OLD LINE IS ERASED. The background there is a smooth gradient, so
#   each erased pixel is a vertical lerp between a clean row above (y=487) and
#   one below (y=545), per column, feathered 14px at each end so the patch has
#   no edge. Verified at 3x nearest-neighbour: no residue, no seam.
#
# ⚠ The output is scale-to-fill + centre-crop to EXACTLY 1200x630. Facebook
#   crops to ~1.91:1 and the declared og:image:width/height must match the file.
#
# ⚠ Changing the line here is only half the change. og:description,
#   twitter:description, the two image:alt tags, _appShareText() and
#   _inviteBody() all state the same coverage and are checked against each other
#   by scripts/test-share-copy-parity.js. Run it after.

param(
  [string]$Line   = "",
  [string]$Source = "",
  [string]$Out    = ""
)

Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$root = Split-Path $PSScriptRoot -Parent
if (-not $Out)    { $Out    = Join-Path $root 'assets\og-banner.jpg' }
if (-not $Source) { $Source = Join-Path $env:USERPROFILE 'Downloads\Gemini_Generated_Image_2six0w2six0w2six.jfif' }
if (-not $Line) {
  $dash = [char]0x2013; $dot = [char]0x00B7
  $Line = "PSAC Grades 1" + $dash + "6 " + $dot + " NCE Grades 7" + $dash + "9"
}

if (-not (Test-Path $Source)) {
  # ⚠ The ORIGINAL is the only thing that can be edited cleanly - the shipped
  #   1200x630 jpg has already been downscaled and re-compressed once.
  throw "source artwork not found: $Source`nKeep the original 1424x752 Gemini file; the shipped banner is a downscale of it."
}

$src = [System.Drawing.Bitmap]::FromFile($Source)
Write-Output "source: $($src.Width)x$($src.Height)"

# ---- 1. sample the existing text colour ------------------------------------
$rs = 0; $gs = 0; $bs = 0; $n = 0
for ($y = 500; $y -le 530; $y++) {
  for ($x = 134; $x -le 787; $x++) {
    $c = $src.GetPixel($x, $y)
    if ($c.R -gt 205 -and $c.G -gt 205 -and $c.B -gt 205) { $rs += $c.R; $gs += $c.G; $bs += $c.B; $n++ }
  }
}
if ($n -lt 500) { throw "only $n text pixels found at y=500..530 - the source layout is not what this script expects" }
$tr = [int]($rs / $n); $tg = [int]($gs / $n); $tb = [int]($bs / $n)
Write-Output "text colour: $tr,$tg,$tb (from $n px)"

# ---- 2. erase the old line --------------------------------------------------
$yTop = 490; $yBot = 542; $ySrcA = 487; $ySrcB = 545
$x0 = 122; $x1 = 805; $feather = 14.0
$span = [double]($ySrcB - $ySrcA)

$work = New-Object System.Drawing.Bitmap $src.Width, $src.Height, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$gw = [System.Drawing.Graphics]::FromImage($work)
$gw.DrawImage($src, 0, 0, $src.Width, $src.Height)
$gw.Dispose()

for ($x = $x0; $x -le $x1; $x++) {
  $ca = $src.GetPixel($x, $ySrcA)
  $cb = $src.GetPixel($x, $ySrcB)
  $a = 1.0
  $dL = [double]($x - $x0); $dR = [double]($x1 - $x)
  if ($dL -lt $feather) { $a = $dL / $feather }
  if ($dR -lt $feather) { $a = $dR / $feather }
  for ($y = $yTop; $y -le $yBot; $y++) {
    $t = [double]($y - $ySrcA) / $span
    $nr = $ca.R + ($cb.R - $ca.R) * $t
    $ng = $ca.G + ($cb.G - $ca.G) * $t
    $nb = $ca.B + ($cb.B - $ca.B) * $t
    $o = $src.GetPixel($x, $y)
    $work.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(
      [int][Math]::Round($o.R + ($nr - $o.R) * $a),
      [int][Math]::Round($o.G + ($ng - $o.G) * $a),
      [int][Math]::Round($o.B + ($nb - $o.B) * $a)))
  }
}
Write-Output "erased y=$yTop..$yBot x=$x0..$x1"

# ---- 3. find the ink offset so the new line lands on the old baseline -------
$font = New-Object System.Drawing.Font('Arial', 46, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$sf = [System.Drawing.StringFormat]::GenericTypographic
$probe = New-Object System.Drawing.Bitmap 1400, 140
$gp = [System.Drawing.Graphics]::FromImage($probe)
$gp.Clear([System.Drawing.Color]::Black)
$gp.TextRenderingHint = 'AntiAliasGridFit'
$gp.DrawString($Line, $font, [System.Drawing.Brushes]::White, 20, 30, $sf)
$gp.Dispose()
$iT = 9999; $iL = 9999; $iR = 0; $iB = 0
for ($y = 0; $y -lt 140; $y++) {
  for ($x = 0; $x -lt 1400; $x++) {
    if ($probe.GetPixel($x, $y).R -gt 128) {
      if ($y -lt $iT) { $iT = $y }; if ($y -gt $iB) { $iB = $y }
      if ($x -lt $iL) { $iL = $x }; if ($x -gt $iR) { $iR = $x }
    }
  }
}
$probe.Dispose()
$inkW = $iR - $iL + 1; $inkH = $iB - $iT + 1
Write-Output "ink ${inkW}x${inkH}px"
if ($inkH -ne 35) { Write-Output "  NOTE ink height $inkH != 35 - the original line was 35px tall" }
# ⚠ Hard stop rather than a silent overlap: the illustration starts at x=1025.
if (134 + $inkW -gt 975) { throw "line is ${inkW}px wide and would run into the illustration (x=1025). Shorten it." }

# ---- 4. draw ----------------------------------------------------------------
$g = [System.Drawing.Graphics]::FromImage($work)
$g.TextRenderingHint = 'AntiAliasGridFit'
$g.SmoothingMode = 'AntiAlias'
$brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($tr, $tg, $tb))
$g.DrawString($Line, $font, $brush, (134 - ($iL - 20)), (498 - ($iT - 30)), $sf)
$g.Dispose(); $brush.Dispose(); $font.Dispose()

# ---- 5. scale-to-fill + centre crop to exactly 1200x630 ---------------------
$TW = 1200; $TH = 630
$scale = [Math]::Max($TW / [double]$work.Width, $TH / [double]$work.Height)
$sw = [int][Math]::Ceiling($work.Width * $scale)
$sh = [int][Math]::Ceiling($work.Height * $scale)
$ox = [int][Math]::Round(($sw - $TW) / 2.0)
$oy = [int][Math]::Round(($sh - $TH) / 2.0)

$final = New-Object System.Drawing.Bitmap $TW, $TH, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$gf = [System.Drawing.Graphics]::FromImage($final)
$gf.InterpolationMode = 'HighQualityBicubic'
$gf.PixelOffsetMode = 'HighQuality'
$gf.SmoothingMode = 'HighQuality'
$gf.DrawImage($work, (New-Object System.Drawing.Rectangle (-$ox), (-$oy), $sw, $sh))
$gf.Dispose()

$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 92L
$final.Save($Out, $enc, $ep)
Write-Output "wrote $Out : $((Get-Item $Out).Length) bytes, $($final.Width)x$($final.Height)"
Write-Output "NOW RUN: node scripts/test-share-copy-parity.js"

$final.Dispose(); $work.Dispose(); $src.Dispose()
