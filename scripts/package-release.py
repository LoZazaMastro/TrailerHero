from __future__ import annotations

import json
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

INSTALLER_EXCLUDED_FILES = {
    "CHANGELOG_1.5.0.md",
}


def should_include(path: Path, *, installer: bool = False) -> bool:
    relative = path.relative_to(ROOT)
    if set(relative.parts) & EXCLUDED_DIRS:
        return False
    if path.suffix.lower() in EXCLUDED_SUFFIXES:
        return False
    if installer and relative.as_posix() in INSTALLER_EXCLUDED_FILES:
        return False
    return True


def write_archive(output: Path, *, installer: bool) -> None:
    output.unlink(missing_ok=True)
    with ZipFile(output, "w", ZIP_DEFLATED, compresslevel=9) as archive:
        archive.writestr("TrailerHero/", "")
        for item in sorted(ROOT.rglob("*")):
            if item.is_dir() or not should_include(item, installer=installer):
                continue
            relative = item.relative_to(ROOT).as_posix()
            archive.write(item, f"TrailerHero/{relative}")


def main() -> None:
    package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
    version = str(package["version"])

    project_zip = PARENT / f"TrailerHero-v{version}_Project.zip"
    installer_zip = PARENT / f"TrailerHero-v{version}_Installer.zip"

    write_archive(project_zip, installer=False)
    write_archive(installer_zip, installer=True)

    print(project_zip)
    print(installer_zip)


if __name__ == "__main__":
    main()
