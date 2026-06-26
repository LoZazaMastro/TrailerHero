from __future__ import annotations

import json
import shutil
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


ROOT = Path(__file__).resolve().parents[1]
PARENT = ROOT.parent

EXCLUDED_DIRS = {
    ".git",
    "node_modules",
    "__pycache__",
}

EXCLUDED_SUFFIXES = {
    ".pyc",
    ".pyo",
}


def should_include(path: Path) -> bool:
    parts = set(path.relative_to(ROOT).parts)
    if parts & EXCLUDED_DIRS:
        return False
    if path.suffix.lower() in EXCLUDED_SUFFIXES:
        return False
    return True


def main() -> None:
    package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
    version = package["version"]

    project_zip = PARENT / f"TrailerHero-v{version}_Project.zip"
    installer_zip = PARENT / f"TrailerHero-v{version}_Installer.zip"

    for output in (project_zip, installer_zip):
        if output.exists():
            output.unlink()

    with ZipFile(project_zip, "w", ZIP_DEFLATED, compresslevel=9) as archive:
        archive.writestr("TrailerHero/", "")
        for item in sorted(ROOT.rglob("*")):
            if item.is_dir() or not should_include(item):
                continue
            rel = item.relative_to(ROOT).as_posix()
            archive.write(item, f"TrailerHero/{rel}")

    shutil.copyfile(project_zip, installer_zip)
    print(project_zip)
    print(installer_zip)


if __name__ == "__main__":
    main()

