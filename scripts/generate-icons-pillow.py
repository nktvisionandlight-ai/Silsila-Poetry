from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
BRAND_DIR = ROOT / "assets" / "brand"
APP_ICON_DIR = ROOT / "ios" / "App" / "App" / "Assets.xcassets" / "AppIcon.appiconset"

CREAM = (245, 239, 224)
CHARCOAL = (28, 28, 26)
GOLD = (200, 160, 80)
MUTED_GOLD = (166, 124, 46)
WINE = (58, 14, 14)


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


def draw_quill(draw: ImageDraw.ImageDraw, size: int) -> None:
    scale = size / 1024
    cx = size // 2
    top = int(size * 0.22)
    feather = [
        (cx + int(65 * scale), top),
        (cx + int(20 * scale), top + int(35 * scale)),
        (cx - int(35 * scale), top + int(110 * scale)),
        (cx - int(95 * scale), top + int(175 * scale)),
        (cx - int(10 * scale), top + int(145 * scale)),
        (cx + int(48 * scale), top + int(78 * scale)),
    ]
    draw.polygon(feather, fill=GOLD)
    draw.line(
        [
            (cx + int(45 * scale), top + int(25 * scale)),
            (cx - int(95 * scale), top + int(175 * scale)),
            (cx - int(170 * scale), top + int(260 * scale)),
        ],
        fill=MUTED_GOLD,
        width=max(2, int(8 * scale)),
    )
    for offset in (58, 88, 118):
        draw.line(
            [
                (cx - int(offset * scale), top + int((offset + 58) * scale)),
                (cx + int((20 - offset / 3) * scale), top + int((offset + 30) * scale)),
            ],
            fill=CREAM,
            width=max(1, int(4 * scale)),
        )


def create_icon(size: int) -> Image.Image:
    image = Image.new("RGB", (size, size), CREAM)
    draw = ImageDraw.Draw(image)
    scale = size / 1024

    margin = int(size * 0.11)
    draw.ellipse(
        (margin, margin, size - margin, size - margin),
        outline=tuple(int(CREAM[i] * 0.66 + GOLD[i] * 0.34) for i in range(3)),
        width=max(1, int(8 * scale)),
    )

    draw_quill(draw, size)

    title_font = font(max(8, int(118 * scale)), bold=True)
    subtitle_font = font(max(6, int(30 * scale)))
    centered_text(draw, (0, int(size * 0.58)), "SILSILA", size, title_font, CHARCOAL, spacing=max(0, int(18 * scale)))

    if size >= 120:
        centered_text(draw, (0, int(size * 0.68)), "URDU POETRY", size, subtitle_font, MUTED_GOLD, spacing=max(0, int(5 * scale)))

    return image


def save_rgb_icon(path: Path, size: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image = create_icon(size)
    if image.mode != "RGB":
        raise RuntimeError(f"{path} is {image.mode}, expected RGB")
    image.save(path, format="PNG")


def main() -> None:
    for png in APP_ICON_DIR.glob("*.png"):
        png.unlink()

    for name, size in REQUESTED_BRAND_ICONS.items():
        save_rgb_icon(BRAND_DIR / name, size)

    for name, size in APP_ICON_CATALOG.items():
        save_rgb_icon(APP_ICON_DIR / name, size)

    print(f"Generated {len(APP_ICON_CATALOG)} iOS asset catalog icons and {len(REQUESTED_BRAND_ICONS)} brand icons as RGB PNGs.")


if __name__ == "__main__":
    main()
