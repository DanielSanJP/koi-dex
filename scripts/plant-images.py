#!/usr/bin/env python3
"""Rebuild public/assets/plants/<slug>.webp from Wikimedia Commons.

Reads the image credits in src/content/plants.ts (the Commons file page URL
per plant), downloads a 1600px rendition through Special:Redirect/file,
centre-crops to 3:2 and writes a 1200x800 WebP. Licences and authors were
verified against the Commons API when the images were chosen (week 6); this
script only regenerates the derived files.

    python3 scripts/plant-images.py            # all plants
    python3 scripts/plant-images.py hornwort   # one slug

Needs Pillow (pip install pillow). Identify yourself to Wikimedia with a real
contact in USER_AGENT, as their API etiquette asks.
"""
import io, re, sys, urllib.parse, urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "src/content/plants.ts"
OUT = ROOT / "public/assets/plants"
USER_AGENT = "koi-dex-school-project/1.0 (contact: danielmedcalf514@gmail.com)"

def entries():
    text = CONTENT.read_text()
    for m in re.finditer(r'slug: "([a-z0-9-]+)",\s*image: \{.*?url: "https://commons\.wikimedia\.org/wiki/File:([^"]+)"', text, re.S):
        yield m.group(1), urllib.parse.unquote(m.group(2))

def fetch(filename: str) -> bytes:
    url = "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/" + urllib.parse.quote(filename) + "&width=1600"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    return urllib.request.urlopen(req, timeout=60).read()

def convert(data: bytes, dest: Path):
    im = Image.open(io.BytesIO(data)).convert("RGB")
    w, h = im.size
    if w / h > 1.5:
        nw = int(h * 1.5); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / 1.5); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    im.resize((1200, 800), Image.LANCZOS).save(dest, "WEBP", quality=78, method=6)

if __name__ == "__main__":
    only = set(sys.argv[1:])
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, filename in entries():
        if only and slug not in only:
            continue
        dest = OUT / f"{slug}.webp"
        convert(fetch(filename), dest)
        print(f"{slug}: {dest.stat().st_size // 1024} KB from {filename}")
