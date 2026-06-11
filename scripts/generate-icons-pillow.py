from pathlib import Path
import math
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
BRAND_DIR = ROOT / "assets" / "brand"
APP_ICON_DIR = ROOT / "ios" / "App" / "App" / "Assets.xcassets" / "AppIcon.appiconset"
SOURCE_ICON_PATH = BRAND_DIR / "source-app-icon.png"

CREAM = (245, 239, 224)
CHARCOAL = (28, 28, 26)
GOLD = (200, 160, 80)
MUTED_GOLD = (166, 124, 46)
WINE = (58, 14, 14)
DARK_BROWN = (55, 27, 13)
DEEP_BROWN = (38, 18, 9)
LIGHT_GOLD = (232, 196, 117)


REQUESTED_BRAND_ICONS = {
    "app-store-1024.png": 1024,
    "iphone-180@3x.png": 180,
    "iphone-120@2x.png": 120,
    "ipad-pro-167.png": 167,
    "ipad-152@2x.png": 152,
}

APP_ICON_CATALOG = {
    "Icon-App-20x20@1x.png": 20,
    "Icon-App-20x20@2x.png": 40,
    "Icon-App-20x20@2x~ipad.png": 40,
    "Icon-App-20x20@3x.png": 60,
    "Icon-App-29x29@1x.png": 29,
    "Icon-App-29x29@2x.png": 58,
    "Icon-App-29x29@2x~ipad.png": 58,
    "Icon-App-29x29@3x.png": 87,
    "Icon-App-40x40@1x.png": 40,
    "Icon-App-40x40@2x.png": 80,
    "Icon-App-40x40@2x~ipad.png": 80,
    "Icon-App-40x40@3x.png": 120,
    "Icon-App-60x60@2x.png": 120,
    "Icon-App-60x60@3x.png": 180,
    "Icon-App-76x76@1x.png": 76,
    "Icon-App-76x76@2x.png": 152,
    "Icon-App-83.5x83.5@2x.png": 167,
    "AppIcon-512@2x.png": 1024,
}


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
        "/System/Library/Fonts/Supplemental/Georgia Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "/Library/Fonts/Georgia Bold.ttf" if bold else "/Library/Fonts/Georgia.ttf",
    ]
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def centered_text(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, image_width: int, font_obj, fill, spacing: int = 0) -> None:
    if spacing <= 0:
        bbox = draw.textbbox((0, 0), text, font=font_obj)
        x = (image_width - (bbox[2] - bbox[0])) // 2
        draw.text((x, xy[1]), text, font=font_obj, fill=fill)
        return

    widths = [draw.textlength(char, font=font_obj) for char in text]
    total_width = int(sum(widths) + spacing * (len(text) - 1))
    x = (image_width - total_width) // 2
    for char, width in zip(text, widths):
        draw.text((x, xy[1]), char, font=font_obj, fill=fill)
        x += int(width) + spacing


def blend(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(int(a[i] * (1 - t) + b[i] * t) for i in range(3))


def draw_source_background(image: Image.Image) -> None:
    pixels = image.load()
    width, height = image.size
    cx = width / 2
    cy = height / 2
    max_dist = math.hypot(cx, cy)
    for y in range(height):
        for x in range(width):
            dist = math.hypot(x - cx, y - cy) / max_dist
            pixels[x, y] = blend(DARK_BROWN, DEEP_BROWN, min(1.0, dist * 1.35))


def rotated_point(cx: int, cy: int, radius: float, angle: float) -> tuple[int, int]:
    return (int(cx + math.cos(angle) * radius), int(cy + math.sin(angle) * radius))


def draw_mandala(draw: ImageDraw.ImageDraw, size: int) -> None:
    cx = size // 2
    cy = int(size * 0.40)
    scale = size / 1024

    for radius, width, color in [
        (245 * scale, 10 * scale, LIGHT_GOLD),
        (178 * scale, 6 * scale, GOLD),
        (105 * scale, 4 * scale, MUTED_GOLD),
    ]:
        bbox = (cx - radius, cy - radius, cx + radius, cy + radius)
        draw.ellipse(bbox, outline=color, width=max(1, int(width)))

    for i in range(8):
        angle = -math.pi / 2 + i * math.pi / 4
        outer = rotated_point(cx, cy, 305 * scale, angle)
        left = rotated_point(cx, cy, 155 * scale, angle - 0.23)
        right = rotated_point(cx, cy, 155 * scale, angle + 0.23)
        inner = rotated_point(cx, cy, 74 * scale, angle)
        draw.polygon([inner, left, outer, right], outline=LIGHT_GOLD, fill=None)
        draw.line([inner, outer], fill=GOLD, width=max(1, int(5 * scale)))

    for i in range(16):
        angle = i * math.pi / 8
        start = rotated_point(cx, cy, 55 * scale, angle)
        end = rotated_point(cx, cy, 220 * scale, angle)
        draw.line([start, end], fill=GOLD, width=max(1, int(3 * scale)))

    for i in range(8):
        angle = i * math.pi / 4
        flower_center = rotated_point(cx, cy, 155 * scale, angle)
        petal_r = max(3, int(13 * scale))
        for j in range(6):
            petal = rotated_point(flower_center[0], flower_center[1], 17 * scale, j * math.pi / 3)
            draw.ellipse(
                (petal[0] - petal_r, petal[1] - petal_r, petal[0] + petal_r, petal[1] + petal_r),
                fill=LIGHT_GOLD,
            )
        draw.ellipse(
            (flower_center[0] - petal_r, flower_center[1] - petal_r, flower_center[0] + petal_r, flower_center[1] + petal_r),
            fill=GOLD,
        )

    center_r = int(38 * scale)
    draw.ellipse((cx - center_r, cy - center_r, cx + center_r, cy + center_r), fill=LIGHT_GOLD)
    for i in range(12):
        angle = i * math.pi / 6
        tip = rotated_point(cx, cy, 70 * scale, angle)
        left = rotated_point(cx, cy, 28 * scale, angle - 0.14)
        right = rotated_point(cx, cy, 28 * scale, angle + 0.14)
        draw.polygon([left, tip, right], fill=GOLD)


def create_source_icon() -> Image.Image:
    size = 1024
    image = Image.new("RGB", (size, size), DARK_BROWN)
    draw_source_background(image)
    draw = ImageDraw.Draw(image)

    draw_mandala(draw, size)

    title_font = font(86, bold=False)
    centered_text(draw, (0, 756), "SILSILA", size, title_font, LIGHT_GOLD, spacing=48)

    line_y = 888
    draw.line((350, line_y, 470, line_y), fill=GOLD, width=2)
    draw.line((554, line_y, 674, line_y), fill=GOLD, width=2)
    for x, y, r in [(512, line_y, 16), (486, line_y, 7), (538, line_y, 7)]:
        draw.polygon([(x, y - r), (x + r, y), (x, y + r), (x - r, y)], outline=LIGHT_GOLD, fill=None)

    SOURCE_ICON_PATH.parent.mkdir(parents=True, exist_ok=True)
    image.save(SOURCE_ICON_PATH, format="PNG")
    return image


def source_icon() -> Image.Image:
    if not SOURCE_ICON_PATH.exists():
        raise FileNotFoundError(f"Missing source app icon: {SOURCE_ICON_PATH}")

    source = Image.open(SOURCE_ICON_PATH)
    if source.mode == "RGB":
        return source

    image = Image.new("RGB", source.size, CREAM)
    if source.mode in {"RGBA", "LA"} or (source.mode == "P" and "transparency" in source.info):
        image.paste(source.convert("RGBA"), (0, 0), source.convert("RGBA"))
    else:
        image.paste(source.convert("RGB"), (0, 0))
    return image


def save_rgb_icon(path: Path, source: Image.Image, size: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    design = source.resize((size, size), Image.Resampling.LANCZOS).convert("RGB")
    image = Image.new("RGB", (size, size), CREAM)
    image.paste(design, (0, 0))
    if image.mode != "RGB":
        raise RuntimeError(f"{path} is {image.mode}, expected RGB")
    image.save(path, format="PNG")


def main() -> None:
    for png in APP_ICON_DIR.glob("*.png"):
        png.unlink()

    source = source_icon()

    for name, size in REQUESTED_BRAND_ICONS.items():
        save_rgb_icon(BRAND_DIR / name, source, size)

    for name, size in APP_ICON_CATALOG.items():
        save_rgb_icon(APP_ICON_DIR / name, source, size)

    print(f"Used {SOURCE_ICON_PATH.relative_to(ROOT)} to generate {len(APP_ICON_CATALOG)} iOS asset catalog icons and {len(REQUESTED_BRAND_ICONS)} brand icons as RGB PNGs.")


if __name__ == "__main__":
    main()
