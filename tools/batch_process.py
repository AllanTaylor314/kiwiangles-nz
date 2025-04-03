import sys
from PIL import Image
from pathlib import Path
from hashlib import sha256
from string import ascii_uppercase

from thumbnail import to_thumbnail
from watermark import add_watermark

ASSETS = Path(__file__).resolve().parent.parent / "public" / "assets"

THUMBNAILS = ASSETS / "thumbnail"
WATERMARKS = ASSETS / "watermark"

THUMBNAILS.mkdir(parents=True, exist_ok=True)
WATERMARKS.mkdir(parents=True, exist_ok=True)

MAPPING = Path("mapping.txt")

hash_lookup = {}
free_ids = {c:0 for c in ascii_uppercase}
MAPPING.touch(exist_ok=True)
# file_hash: file_name, unique_id
with open(MAPPING, encoding="utf8") as f:
    for line in f:
        file_hash, file_name, unique_id = line.strip().split(",")
        hash_lookup[file_hash] = (file_name, unique_id)
        free_ids[file_name[0]] = max(free_ids[file_name[0]], int(unique_id[1:]) + 1)

files = list(Path(".").glob("**/*.jpg"))

for file in files:
    with open(file, "rb") as f:
        file_hash = sha256(f.read()).hexdigest()
    if file_hash in hash_lookup:
        file_name, unique_id = hash_lookup[file_hash]
    else:
        file_name = file.name
        letter = file_name[0]
        if letter not in free_ids:
            print(f"Warning: {file_name!r} has an invalid prefix. Skipping.")
            continue
        unique_id = f"{letter}{free_ids[letter]:03}"
        free_ids[letter] += 1
        hash_lookup[file_hash] = (file_name, unique_id)
        with open(MAPPING, "a+", encoding="utf8") as f:
            f.write(f"{file_hash},{file_name},{unique_id}\n")

    to_thumbnail(file, THUMBNAILS / f"{unique_id}.webp")
    add_watermark(file, WATERMARKS / f"{unique_id}.jpg")
    print(f"Processed {file_name} -> {unique_id}")
