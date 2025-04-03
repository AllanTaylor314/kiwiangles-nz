import sys
from PIL import Image
from pathlib import Path
watermark_file = Path(__file__).resolve().parent / "watermark-65.png"

def add_watermark(image_path, output_path):
    # Open the image
    image = Image.open(image_path).convert("RGBA")
    width, height = image.size

    if width > height:
        image = image.transpose(Image.Transpose.ROTATE_270)

    # Create a transparent overlay for the watermark
    watermark_overlay = Image.new("RGBA", image.size, (255, 255, 255, 0))

    # Load the watermark file
    watermark = Image.open(watermark_file).convert("RGBA")

    # stamp the watermark on the overlay
    watermark_width, watermark_height = watermark.size
    for y in range(-watermark_height, height, watermark_height * 3 // 4):
        for x in range(-(y % (watermark_height * 3 // 4)), width, watermark_width // 2):
            watermark_overlay.paste(watermark, (x, y), watermark)

    # Combine the original image with the watermark overlay
    watermarked_image = Image.alpha_composite(image, watermark_overlay)

    # Save the result
    watermarked_image.convert("RGB").save(output_path, "JPEG")
    print(f"Watermarked image saved to {output_path}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python watermark.py <input_image_path> <output_image_path>")
    else:
        input_image_path = sys.argv[1]
        output_image_path = sys.argv[2]
        add_watermark(input_image_path, output_image_path)
