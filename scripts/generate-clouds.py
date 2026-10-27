"""Generate Uga Studios cloud layers (horizontally tileable RGBA WebP).

Usage: python scripts/generate-clouds.py src/assets/atmosphere  (needs numpy, pillow, scipy)
"""
import sys
import numpy as np
from PIL import Image
from scipy.ndimage import zoom, gaussian_filter, map_coordinates

OUT = sys.argv[1] if len(sys.argv) > 1 else "out"
rng = np.random.default_rng(7)


def noise(w, h, cell, seed, aspect=1.0):
    r = np.random.default_rng(seed)
    gw, gh = max(2, round(w / (cell * aspect))), max(2, round(h / cell))
    g = r.random((gh, gw))
    z = zoom(g, (h / gh, w / gw), order=3, mode="grid-wrap", grid_mode=True)
    return z[:h, :w]


def fbm(w, h, base, octaves, seed, gain=0.5, aspect=1.0):
    out = np.zeros((h, w))
    amp, cell, tot = 1.0, base, 0.0
    for i in range(octaves):
        if cell < 2:
            break
        out += amp * noise(w, h, cell, seed + i * 17, aspect)
        tot += amp
        amp *= gain
        cell /= 2
    return out / tot


def warp(w, h, base, octaves, seed, strength):
    """Domain-warped fbm for billowy shapes."""
    qx = fbm(w, h, base * 1.3, 4, seed + 100)
    qy = fbm(w, h, base * 1.3, 4, seed + 200)
    d = fbm(w, h, base, octaves, seed)
    ys, xs = np.mgrid[0:h, 0:w]
    sx = (xs + (qx - 0.5) * strength) % w
    sy = np.clip(ys + (qy - 0.5) * strength, 0, h - 1)
    return map_coordinates(d, [sy, sx], order=1, mode="grid-wrap")


def smooth(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


PALETTES = {
    # lit, mid, shadow (RGB 0-1)
    "day": ((1.0, 1.0, 1.0), (0.93, 0.96, 0.99), (0.70, 0.80, 0.89)),
    "dusk": ((1.0, 0.88, 0.74), (0.90, 0.70, 0.66), (0.50, 0.42, 0.54)),
    "night": ((0.46, 0.54, 0.66), (0.19, 0.24, 0.32), (0.07, 0.09, 0.13)),
}


def shade(d, alpha, palette, light=(-6, -14)):
    lit, mid, sh = [np.array(c) for c in PALETTES[palette]]
    dx, dy = light
    broad = gaussian_filter(d, 7, mode="wrap")
    fine = gaussian_filter(d, 1.5, mode="wrap")
    ahead_b = np.roll(np.roll(broad, dy * 2, axis=0), dx * 2, axis=1)
    ahead_f = np.roll(np.roll(fine, dy // 2, axis=0), dx // 2, axis=1)
    l = np.clip((broad - ahead_b) * 7 + (fine - ahead_f) * 1.1 + 0.55, 0, 1)
    # thicker cloud = darker core; edges bright (silver lining)
    thick = smooth(0.0, 1.0, alpha)
    t = np.clip(l * 0.75 + (1 - thick) * 0.45, 0, 1)
    col = np.where(
        t[..., None] > 0.5,
        mid + (lit - mid) * ((t[..., None] - 0.5) * 2),
        sh + (mid - sh) * (t[..., None] * 2),
    )
    return col


def save(name, col, alpha):
    rgba = np.dstack([col, alpha[..., None]])
    img = Image.fromarray((np.clip(rgba, 0, 1) * 255).astype(np.uint8), "RGBA")
    img.save(f"{OUT}/{name}.webp", "WEBP", quality=72, method=6, alpha_quality=80)
    return img


def bank(w, h, seed):
    """Sea of clouds: dense at bottom, billowy top edge."""
    d = warp(w, h, 520, 8, seed, 180)
    ys = np.linspace(0, 1, h)[:, None]
    shape = smooth(0.18, 0.95, ys)  # vertical density ramp
    v = d * 0.9 + shape * 0.85 - 0.62
    alpha = smooth(0.0, 0.22, v)
    return v, alpha


def wisps(w, h, seed):
    d = fbm(w, h, 110, 7, seed, gain=0.55, aspect=5.0)
    ys = np.linspace(0, 1, h)[:, None]
    band = np.exp(-((ys - 0.5) ** 2) / 0.05)
    v = (d - 0.46) * band
    alpha = smooth(0.0, 0.25, v) * 0.75
    return v, alpha


def puffs(w, h, seed):
    """Scattered cumulus drifting mid-sky."""
    d = warp(w, h, 300, 8, seed, 120)
    ys = np.linspace(0, 1, h)[:, None]
    # flat-ish bases, soft tops
    vert = smooth(0.05, 0.45, ys) * (1 - smooth(0.72, 0.98, ys))
    big = fbm(w, h, 900, 2, seed + 50)
    v = d * 0.8 + vert * 0.5 + big * 0.6 - 1.02
    alpha = smooth(0.0, 0.16, v)
    return v, alpha


if __name__ == "__main__":
    W = 2400
    layers = {
        "bank": bank(W, 900, 11),
        "wisps": wisps(W, 700, 23),
        "puffs": puffs(W, 800, 37),
    }
    for kind, (v, a) in layers.items():
        for p in PALETTES:
            if kind == "wisps" and p == "night":
                continue
            save(f"clouds-{kind}-{p}", shade(v, a, p), a)
    print("done")
