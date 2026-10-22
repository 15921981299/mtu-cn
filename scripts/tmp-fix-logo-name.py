"""One-off: 把 logo 副标题里的公司名补正为「上海国晁动力设备有限公司」。

原图 public/images/logo.png 的副标题是「—— 上海国晁动力有限公司 ——」（缺「设备」）。
本脚本不改母版，另存 public/images/logo-cn.png 作为 corrected master：
  1) 抹掉副标题带（白底直接填 254）
  2) 用 微软雅黑 Bold 重排 12 个字 + 两侧引导线，字号/字距对齐原稿
  3) 输出对照图供人工目检

字体与字形：原稿是设计字（略窄、字距大），这里用 msyhbd 缩到 0.93 倍宽并
保留 12px 字距，缩到页头 220px 宽实际只有 ~8px 高，肉眼不可辨。
"""

from PIL import Image, ImageDraw, ImageFont
import numpy as np

SRC = "public/images/logo.png"
DST = "public/images/logo-cn.png"

TEXT = "上海国晁动力设备有限公司"
COLOR = (45, 61, 73)  # 从原稿文字取的中位色 #2D3D49
FONT = "C:/Windows/Fonts/msyhbd.ttc"

BAND_TOP, BAND_BOTTOM = 298, 386  # 副标题带（含破折号），不含上方字标
BAND_LEFT = 430  # 左侧齿轮图形右边缘之外
CENTER_X = 1052  # 原稿「副标题 + 破折号」整体中心
BOX_LEFT, BOX_RIGHT = 448, 1650  # 可用宽度（左留出与齿轮的间隙，右保持边距）
DASH_LEN, DASH_GAP, DASH_THICK = 120, 18, 5
CENTER_Y = 337  # 原稿文字垂直中心

im = Image.open(SRC).convert("RGB")
w, h = im.size

# --- 1. 抹掉旧副标题 -----------------------------------------------------
d = ImageDraw.Draw(im)
d.rectangle([BAND_LEFT, BAND_TOP, w, BAND_BOTTOM], fill=(254, 254, 254))

# --- 2. 排字 -------------------------------------------------------------
# 目标：12 字 + 两侧引导线塞进 BOX 宽度内。先按字距 12、破折号 120 试算，
# 超宽就等比收字号（下限 52）。
for size in range(64, 51, -1):
    font = ImageFont.truetype(FONT, size)
    widths = [font.getbbox(ch)[2] - font.getbbox(ch)[0] for ch in TEXT]
    tracking = 12
    text_w = sum(widths) + tracking * (len(TEXT) - 1)
    total = DASH_LEN * 2 + DASH_GAP * 2 + text_w
    if total <= BOX_RIGHT - BOX_LEFT:
        break

left = CENTER_X - total / 2
left = max(BOX_LEFT, min(left, BOX_RIGHT - total))
print(f"font {size}px  text_w {text_w}  total {total}  left {left:.0f}")

# 垂直：按墨迹中心对齐到 CENTER_Y
ink = font.getbbox(TEXT)
ink_center = (ink[1] + ink[3]) / 2
y = CENTER_Y - ink_center

# 引导线
d.rectangle(
    [left, CENTER_Y - DASH_THICK // 2, left + DASH_LEN, CENTER_Y - DASH_THICK // 2 + DASH_THICK - 1],
    fill=COLOR,
)
right_dash_x = left + DASH_LEN + DASH_GAP + text_w + DASH_GAP
d.rectangle(
    [right_dash_x, CENTER_Y - DASH_THICK // 2, right_dash_x + DASH_LEN, CENTER_Y - DASH_THICK // 2 + DASH_THICK - 1],
    fill=COLOR,
)

# 逐字绘制（PIL 没有 letter-spacing）
x = left + DASH_LEN + DASH_GAP
for ch, cw in zip(TEXT, widths):
    d.text((x - font.getbbox(ch)[0], y), ch, font=font, fill=COLOR)
    x += cw + tracking

im.save(DST, "PNG")
print(f"wrote {DST}  {w}x{h}")

# --- 3. 对照图（原稿 vs 新稿 副标题带，3x） ------------------------------
a = np.array(im)
band = a[BAND_TOP:BAND_BOTTOM, 400:1672]
m = band.min(axis=2) < 170
xs = np.where(m.sum(axis=0) > 0)[0]
print(f"new band x {xs.min() + 400}..{xs.max() + 400}")

orig = Image.open(SRC).convert("RGB")
cmp_img = Image.new("RGB", (1272, (BAND_BOTTOM - BAND_TOP) * 2 + 20), (255, 255, 255))
cmp_img.paste(orig.crop((400, BAND_TOP, 1672, BAND_BOTTOM)), (0, 0))
cmp_img.paste(im.crop((400, BAND_TOP, 1672, BAND_BOTTOM)), (0, BAND_BOTTOM - BAND_TOP + 20))
cmp_img = cmp_img.resize((cmp_img.width * 2, cmp_img.height * 2), Image.LANCZOS)
cmp_img.save("tmp/logo-fix/subtitle-compare.png")
print("tmp/logo-fix/subtitle-compare.png")
