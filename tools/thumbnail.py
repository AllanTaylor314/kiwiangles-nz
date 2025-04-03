import sys
from PIL import Image
from pathlib import Path

def to_thumbnail(image_path, output_path, size=(300, 200)):
    # Open the image
    image = Image.open(image_path)

    # Check the ratio of the image is 3:2
    width, height = image.size
    if width * size[1] != height * size[0]:
        print(f"Warning: The image ratio is {height / width:.2f}, not {size[0] / size[1]:.2f}. Resizing will distort the image.")

    if width > height:
        image = image.transpose(Image.Transpose.ROTATE_270)

    # Resize the image to the specified size
    image.thumbnail(size)

    # Save the thumbnail
    image.save(output_path)
    print(f"Thumbnail saved to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python thumbnail.py <input_image_path> <output_image_path>")
    else:
        input_image_path = sys.argv[1]
        output_image_path = sys.argv[2]
        to_thumbnail(input_image_path, output_image_path)
