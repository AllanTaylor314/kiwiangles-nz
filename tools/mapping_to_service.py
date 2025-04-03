with open("mapping.txt", "r", encoding="utf8") as f:
    lines = f.read().splitlines()

with open("mapping.js", "w", encoding="utf8") as f:
    for line in lines:
        file_hash, file_name, unique_id = line.strip().split(",")
        print(f"    {{ id: '{unique_id}', letter: '{unique_id[0]}', photo: '/assets/watermark/{unique_id}.jpg', thumbnail: '/assets/thumbnail/{unique_id}.webp', description: '{file_name[4:-4]}' }},", file=f)
