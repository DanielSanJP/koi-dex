#!/usr/bin/env bash
# Capture every route at desktop (1280 wide) and phone (390 wide) into
# docs/screenshots/. Needs a running server: `npm run build && npx next start -p 3210`.
# Headless Chrome will not open a window narrower than ~500px, so the phone
# capture renders the page inside a 390px iframe and crops to it.
set -euo pipefail
BASE="${BASE:-http://localhost:3210}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/docs/screenshots"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP="$(mktemp -d)"
mkdir -p "$OUT"

routes=(
  "home|/|1500|3200"
  "koi|/koi|2200|5200"
  "koi-kohaku|/koi/kohaku|1900|4600"
  "breeding|/breeding|4200|9000"
  "care|/care|9000|16000"
  "plants|/plants|1400|4200"
)

for r in "${routes[@]}"; do
  IFS='|' read -r name path dh mh <<<"$r"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=6000 \
    --window-size=1280,"$dh" --screenshot="$OUT/$name-desktop.png" "$BASE$path" 2>/dev/null
  cat >"$TMP/$name.html" <<HTML
<html><body style="margin:0;background:#888"><iframe src="$BASE$path" style="width:390px;height:${mh}px;border:0;display:block"></iframe></body></html>
HTML
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=6000 \
    --window-size=500,"$mh" --screenshot="$TMP/$name-mobile-raw.png" "file://$TMP/$name.html" 2>/dev/null
  python3 - "$TMP/$name-mobile-raw.png" "$OUT/$name-mobile.png" <<'PY'
import sys
from PIL import Image
im = Image.open(sys.argv[1]); w, h = im.size
im.crop((0, 0, 390, h)).save(sys.argv[2], optimize=True)
PY
  echo "captured $name"
done
rm -rf "$TMP"
