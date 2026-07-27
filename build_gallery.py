from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
IMAGES = ROOT / "images"
HOME_DIR = IMAGES / "home"
LARGE_DIR = IMAGES / "large-works"
SMALL_DIR = IMAGES / "small-works"
LEGACY_DIR = IMAGES / "paintings"
OUTPUT = ROOT / "gallery-data.js"
SUPPORTED = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}


def natural_key(path: Path) -> list[object]:
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r"(\d+)", path.name)]


def find_images(folder: Path) -> list[Path]:
    if not folder.exists():
        return []
    return sorted(
        [path for path in folder.iterdir() if path.is_file() and path.suffix.lower() in SUPPORTED],
        key=natural_key,
    )


def display_title(path: Path) -> str:
    title = re.sub(r"[-_]+", " ", path.stem)
    title = re.sub(r"\s+", " ", title).strip()
    return title.title() if title else "Artwork"


def item(path: Path) -> dict[str, str]:
    relative = path.relative_to(ROOT).as_posix()
    return {
        "src": relative,
        "alt": f"{display_title(path)}, artwork by Ruth Hussey",
    }


def main() -> None:
    for folder in (HOME_DIR, LARGE_DIR, SMALL_DIR):
        folder.mkdir(parents=True, exist_ok=True)

    home_images = find_images(HOME_DIR)
    large_images = find_images(LARGE_DIR)
    small_images = find_images(SMALL_DIR)

    # Older versions of the website used images/paintings. Keep those images
    # visible as large works until they are moved into the new folders.
    if not large_images:
        large_images = find_images(LEGACY_DIR)

    home_image = home_images[0] if home_images else None
    if home_image is None:
        home_image = large_images[0] if large_images else (small_images[0] if small_images else None)

    data = {
        "home": item(home_image) if home_image else None,
        "large": [item(path) for path in large_images],
        "small": [item(path) for path in small_images],
    }

    content = (
        "/* This file is updated automatically by build_gallery.py. */\n"
        "window.GALLERY_DATA = "
        + json.dumps(data, indent=2, ensure_ascii=False)
        + ";\n"
    )
    OUTPUT.write_text(content, encoding="utf-8")

    print(f"Home image: {'yes' if data['home'] else 'none'}")
    print(f"Large works: {len(data['large'])}")
    print(f"Small works: {len(data['small'])}")
    print("Gallery updated successfully.")


if __name__ == "__main__":
    main()
