#!/usr/bin/env python3
"""
Regenerates the Akara Rahsa icon set: an "AR" monogram set in Playfair Display
at weight 900, converted to outlines, knocked out of a gold tile.

Read the "Icons and share image" section of README.md before changing anything
here. Two constraints from it are load-bearing:

  * The letters are outlines, never a <text> element. A favicon renders isolated
    from the page and can never reach the webfont.

  * Each raster size gets its own stroke compensation, and they are generated
    rather than scaled from one master. Playfair is a didone: its hairlines fall
    under a device pixel at small sizes and disappear. Stroking each contour in
    its own colour thickens it uniformly, which lifts the hairline back over a
    pixel without touching the letterform.

The "AR" lockup needs more compensation than the single "A" it replaced, because
two letters in the same tile are half the size, so the same hairline lands on
half as many pixels. That is why the ramp below is steeper than the old one.

The rasterising is done by Chromium through Playwright (see render_icons.mjs),
not by this script, so the PNGs come out of the same engine that draws the SVG
in a browser tab.
"""
import json
import pathlib

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONT = ROOT / "node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2"

GOLD = "#E8B93C"
INK = "#0B0B0C"

VIEW = 64          # viewBox is 64x64, matching the old mark
TARGET_W = 56.0    # ink width inside the tile; leaves 4 units of air each side
WEIGHT = 900
KERN_AR = -20      # from the font's own GPOS, class pair A -> R

# Stroke compensation, expressed as the device pixels it adds to each contour.
# That is the unit that matters: a hairline disappears when it covers less than
# a pixel, which is a fact about the output size, not about the artwork.
#
# Strongest at 16px and effectively off by 180, where the cap height is already
# ~79px and Playfair's hairlines are an asset rather than a liability. Measured,
# not guessed: at 16px a compensation above ~0.35px closes the counters of both
# the A and the R and the mark collapses into a blob, which is the opposite
# failure from the one this exists to prevent. Check both ends if you retune it.
COMPENSATION_PX = {16: 0.28, 32: 0.26, 48: 0.22, 180: 0.04, 192: 0.04, 512: 0.01}

# The SVG has no fixed size, so it gets one value tuned for the ~20px the
# browser usually asks for it at in a tab.
COMPENSATION_SVG_AT = 20
COMPENSATION_SVG_PX = 0.27


def stroke_for(size_px, compensation_px):
    """Stroke width in viewBox units that lands `compensation_px` device pixels."""
    return round(compensation_px * VIEW / size_px, 3)


RAMP = {s: stroke_for(s, px) for s, px in COMPENSATION_PX.items()}
RAMP_SVG = stroke_for(COMPENSATION_SVG_AT, COMPENSATION_SVG_PX)


def lockup_path():
    """Returns (path_data, stroke_scale_note) for "AR" fitted to the tile."""
    font = instancer.instantiateVariableFont(TTFont(FONT), {"wght": WEIGHT})
    glyphs = font.getGlyphSet()
    advance = font["hmtx"]["A"][0]

    # Lay the two glyphs out on a baseline, applying the font's own A/R kern.
    placements = [("A", 0), ("R", advance + KERN_AR)]

    bounds = [1e9, 1e9, -1e9, -1e9]
    for name, dx in placements:
        bp = BoundsPen(glyphs)
        glyphs[name].draw(bp)
        x0, y0, x1, y1 = bp.bounds
        bounds = [min(bounds[0], x0 + dx), min(bounds[1], y0),
                  max(bounds[2], x1 + dx), max(bounds[3], y1)]

    ink_w = bounds[2] - bounds[0]
    ink_h = bounds[3] - bounds[1]
    scale = TARGET_W / ink_w

    # Centre the ink box in the tile rather than centring on the baseline: the
    # R's leg overshoots below the baseline and the eye reads the block, not the
    # metrics.
    off_x = (VIEW - ink_w * scale) / 2 - bounds[0] * scale
    off_y = (VIEW - ink_h * scale) / 2 - bounds[1] * scale

    parts = []
    for name, dx in placements:
        pen = SVGPathPen(glyphs, ntos=lambda v: f"{v:.3f}")
        # Flip Y: font space is y-up, SVG is y-down.
        t = Transform(scale, 0, 0, -scale, off_x + dx * scale, VIEW - off_y)
        glyphs[name].draw(TransformPen(pen, t))
        parts.append(pen.getCommands())

    return " ".join(parts), ink_h * scale


def svg(path_data, stroke):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VIEW} {VIEW}" '
        f'role="img" aria-label="Akara Rahsa">'
        f'<rect width="{VIEW}" height="{VIEW}" fill="{GOLD}"/>'
        f'<path fill="{INK}" stroke="{INK}" stroke-width="{stroke}" '
        f'stroke-linejoin="round" d="{path_data}"/></svg>'
    )


def main():
    path_data, cap = lockup_path()
    print(f"ink height in tile: {cap:.2f}/{VIEW} units")

    header = (
        "<!-- Akara Rahsa monogram: \"AR\" in Playfair Display 900, converted to\n"
        "     outlines. Generated by scripts/generate_icons.py - do not hand-edit.\n"
        "     The stroke is optical compensation for Playfair's hairlines, not\n"
        "     decoration. README.md, \"Icons and share image\", explains why. -->\n"
    )
    out = ROOT / "public/favicon.svg"
    body = svg(path_data, RAMP_SVG)
    out.write_text(body.replace("><path", ">\n" + header + "<path", 1) + "\n")
    print(f"wrote {out.relative_to(ROOT)}")

    # Hand the per-size variants to the Playwright rasteriser.
    jobs = {str(size): svg(path_data, stroke) for size, stroke in RAMP.items()}
    spec = ROOT / "scripts/.icon-sources.json"
    spec.write_text(json.dumps(jobs, indent=2))
    print(f"wrote {spec.relative_to(ROOT)} ({len(jobs)} sizes)")


def pack_ico():
    """Packs the 16/32/48 renders into favicon.ico, each keeping its own render.

    The ICO container is written by hand because Pillow's ICO writer rescales a
    single image to every requested size, which throws away the per-size
    compensation this pipeline exists to apply. Its append_images path silently
    drops the extra frames as well - the file it produced held only the 16.

    The members are stored as PNG rather than DIB. That is the Vista-era form of
    the format and every browser in use reads it; it also means the bytes in the
    .ico are byte-for-byte the ones Chromium rendered.
    """
    import struct

    sizes = [16, 32, 48]
    blobs = [(ROOT / f"scripts/.ico-{s}.png").read_bytes() for s in sizes]

    header = struct.pack("<HHH", 0, 1, len(sizes))
    offset = len(header) + 16 * len(sizes)
    entries, payload = b"", b""
    for size, blob in zip(sizes, blobs):
        entries += struct.pack(
            "<BBBBHHII",
            size, size,   # 0 would mean 256; none of these are
            0, 0,         # palette size, reserved
            1, 32,        # colour planes, bits per pixel
            len(blob), offset,
        )
        payload += blob
        offset += len(blob)

    out = ROOT / "public/favicon.ico"
    out.write_bytes(header + entries + payload)
    print(f"wrote {out.relative_to(ROOT)} ({out.stat().st_size} B, {sizes})")


if __name__ == "__main__":
    import sys
    if "--ico" in sys.argv:
        pack_ico()
    else:
        main()
