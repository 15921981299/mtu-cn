"""One-off: turn public/images/logo.png into site-ready logo assets.

- crops the 44/30/44/51 px white margin away
- keys the near-white studio background out (flood fill from the borders only,
  so enclosed white highlights on the piston stay opaque)
- bleeds edge colour into the transparent area before downscaling, which is what
  kills the pale halo you otherwise get when resizing RGBA
- writes 3x / 2x WebP for the header + footer, and a PNG for the JSON-LD logo
"""

from PIL import Image, ImageChops, ImageDraw, ImageFilter

SRC = "public/images/logo-cn.png"  # corrected master (公司名已补「设备」)
OUT_DIR = "public/images"

# display width in CSS px (matches .brand-logo / .footer-logo)
CSS_WIDTH = 220

im = Image.open(SRC).convert("RGB")
w, h = im.size
print(f"source {w}x{h}")

# --- 1. key out the background -------------------------------------------
r, g, b = im.split()
minchan = ImageChops.darker(ImageChops.darker(r, g), b)
# 248 rather than 240: only the flat studio white (254) goes, so the artwork's
# own anti-aliased rim survives and the downscale keeps it crisp.
near_white = minchan.point(lambda v: 255 if v >= 248 else 0)

bg = near_white.copy()
for seed in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
    if bg.getpixel(seed) == 255:
        ImageDraw.floodfill(bg, seed, 128, thresh=0)

is_bg = bg.point(lambda v: 255 if v == 128 else 0)
alpha = ImageChops.invert(is_bg)
print(f"transparent pixels: {is_bg.histogram()[255]} / {w * h}")

# --- 2. bleed surrounding colour behind the alpha ------------------------
# Without this the transparent area is white and LANCZOS downscaling smears a
# light halo around every dark edge.
bleed = im.filter(ImageFilter.GaussianBlur(6))
rgb = Image.composite(im, bleed, alpha)

out = rgb.convert("RGBA")
out.putalpha(alpha)

# --- 3. crop the leftover margin ----------------------------------------
bbox = alpha.getbbox()
out = out.crop(bbox)
w2, h2 = out.size
ratio = w2 / h2
print(f"cropped {w2}x{h2}  ratio {ratio:.3f}")


def save_webp(target_width, name, quality=86):
    th = round(target_width / ratio)
    img = out.resize((target_width, th), Image.LANCZOS)
    path = f"{OUT_DIR}/{name}"
    img.save(path, "WEBP", quality=quality, method=6)
    import os

    print(f"{path}  {target_width}x{th}  {os.path.getsize(path)/1024:.1f} KB")
    return target_width, th


main_w, main_h = save_webp(CSS_WIDTH * 3, "mtupeijian-logo.webp")
save_webp(CSS_WIDTH * 2, "mtupeijian-logo@2x.webp")

# --- 4. PNG for the Organization JSON-LD ---------------------------------
# Google reads the schema logo as an image, so keep a raster PNG here instead
# of the display WebP.
schema_w = 1128
schema_h = round(schema_w / ratio)
flat = Image.new("RGB", (schema_w, schema_h), (255, 255, 255))
flat.paste(out.resize((schema_w, schema_h), Image.LANCZOS), (0, 0), out.resize((schema_w, schema_h), Image.LANCZOS))
flat.save(f"{OUT_DIR}/mtupeijian-logo-schema.png", "PNG", optimize=True)
import os

print(
    f"{OUT_DIR}/mtupeijian-logo-schema.png  {schema_w}x{schema_h}  "
    f"{os.path.getsize(OUT_DIR + '/mtupeijian-logo-schema.png')/1024:.1f} KB"
)

# --- 5. preview composites on the real page backgrounds ------------------
prev = Image.new("RGB", (CSS_WIDTH * 2 + 60, 320), (233, 236, 242))  # --color-body
small = out.resize((CSS_WIDTH * 2, round(CSS_WIDTH * 2 / ratio)), Image.LANCZOS)
prev.paste(small, (20, 20), small)
white_panel = Image.new("RGB", (CSS_WIDTH * 2 + 40, 130), (255, 255, 255))
prev.paste(white_panel, (10, 160))
sm2 = out.resize((CSS_WIDTH, round(CSS_WIDTH / ratio)), Image.LANCZOS)
prev.paste(sm2, (20, 175), sm2)
prev = prev.resize((prev.width * 2, prev.height * 2), Image.NEAREST)
prev.save("tmp/logo-work/preview.png")
print("preview tmp/logo-work/preview.png")

print(f"\nSITE_LOGO_WIDTH={main_w}  SITE_LOGO_HEIGHT={main_h}")
print(f"SCHEMA={schema_w}x{schema_h}")
