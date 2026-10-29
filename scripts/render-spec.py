"""Render regions of the spec PDF to PNG for transcribing Arabic copy.

The PDF's Arabic text layer is broken, so Arabic is read from the rendered page,
never from text extraction (AGENTS.md 3.6).

Usage: python scripts/render-spec.py <out_dir> <page>:<top>:<bottom> [...]
       page is 1-based, top/bottom are fractions of the page height.
"""

import pathlib
import sys

import pymupdf

SPEC = pathlib.Path(__file__).resolve().parent.parent / "docs" / "spec" / "ai4you-spec.pdf"


def main() -> None:
    out = pathlib.Path(sys.argv[1])
    out.mkdir(parents=True, exist_ok=True)
    doc = pymupdf.open(SPEC)
    for spec in sys.argv[2:]:
        page_no, top, bottom = spec.split(":")
        page = doc[int(page_no) - 1]
        r = page.rect
        clip = pymupdf.Rect(0, r.height * float(top), r.width, r.height * float(bottom))
        page.get_pixmap(dpi=170, clip=clip).save(out / f"p{page_no}_{top}_{bottom}.png")
    print("ok")


if __name__ == "__main__":
    main()
