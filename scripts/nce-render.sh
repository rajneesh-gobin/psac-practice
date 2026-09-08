#!/usr/bin/env bash
# Render NCE source PDF pages to PNG for visual inspection.
# Poppler is a local dev tool (winget: oschwartz10612.Poppler); it is not a
# runtime dependency of the app and nothing in netlify/ uses it.
#   scripts/nce-render.sh <pdf> <outdir> [first] [last] [dpi]
set -euo pipefail
POPPLER="/c/Users/rajneesh.gobin/AppData/Local/Microsoft/WinGet/Packages/oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe/poppler-25.07.0/Library/bin"
[ -d "$POPPLER" ] && export PATH="$PATH:$POPPLER"
PDF="$1"; OUT="$2"; FIRST="${3:-1}"; LAST="${4:-0}"; DPI="${5:-110}"
mkdir -p "$OUT"
ARGS=(-png -r "$DPI" -f "$FIRST")
[ "$LAST" != "0" ] && ARGS+=(-l "$LAST")
pdftoppm "${ARGS[@]}" "$PDF" "$OUT/p"
ls "$OUT" | tail -50
