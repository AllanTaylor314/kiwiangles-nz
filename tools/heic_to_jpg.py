from PIL import Image
from pillow_heif import register_heif_opener

register_heif_opener()
def heic_to_jpg(heic_path, jpg_path):
    """
    Convert a HEIC image to JPG format.

    :param heic_path: Path to the input HEIC file.
    :param jpg_path: Path to save the output JPG file.
    """
    with Image.open(heic_path) as img:
        img.convert("RGB").save(jpg_path, "JPEG")
        print(f"Converted {heic_path} to {jpg_path}")
if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("Usage: python heic_to_jpg.py <input_heic_path> <output_jpg_path>")
    else:
        input_heic_path = sys.argv[1]
        output_jpg_path = sys.argv[2]
        heic_to_jpg(input_heic_path, output_jpg_path)
