"""Build and package the recovered source, without npm downloads or Valve files."""
from __future__ import annotations

import argparse
import ast
import json
import shutil
import subprocess
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED_DIRS = {".git", "node_modules", "__pycache__", ".pytest_cache"}
EXCLUDED_SUFFIXES = {".pyc", ".pyo", ".zip", ".log"}
INSTALLER_FILES = {
    "plugin.json", "package.json", ".playhub-release.json", "main.py",
    "dist/index.js", "ffmpeg.exe", "yt-dlp.exe", "deno.exe", "LICENSE",
    "README.md", "screensaver/index.html", "screensaver/main.js",
}


def should_include(path: Path, *, installer: bool = False) -> bool:
    relative = path.relative_to(ROOT)
    if set(relative.parts) & EXCLUDED_DIRS or path.suffix.lower() in EXCLUDED_SUFFIXES:
        return False
    if any(word in relative.name.lower() for word in ("changelog", "handover", "internal", "source_recovery")):
        return False
    return not installer or relative.as_posix() in INSTALLER_FILES


def write_archive(output: Path, *, installer: bool, base: Path | None = None) -> None:
    # Publish only a fully written archive. Existing settings are never packaged.
    temporary = output.with_suffix(".zip.tmp")
    try:
        if base is not None:
            # Reuse the already validated compressed runtime and large bundled
            # executables. Append only project files; never recompress duplicates.
            shutil.copyfile(base, temporary)
        with ZipFile(temporary, "a" if base else "w", ZIP_DEFLATED, compresslevel=9) as archive:
            existing = set(archive.namelist())
            if "TrailerHero/" not in existing:
                archive.writestr("TrailerHero/", "")
            for item in sorted(ROOT.rglob("*")):
                if item.is_file() and should_include(item, installer=installer):
                    name = "TrailerHero/" + item.relative_to(ROOT).as_posix()
                    if name not in existing:
                        archive.write(item, name)
        temporary.replace(output)
    finally:
        temporary.unlink(missing_ok=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", type=Path, default=ROOT.parent)
    args = parser.parse_args()
    subprocess.run(["node", str(ROOT / "scripts/build-frontend.mjs")], check=True)
    ast.parse((ROOT / "main.py").read_text(encoding="utf-8"), feature_version=(3, 10))
    package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
    version = str(package["version"])
    args.output_dir.mkdir(parents=True, exist_ok=True)
    installer_output = args.output_dir / f"TrailerHero-v{version}_Installer.zip"
    for installer, kind in [(True, "Installer"), (False, "Project")]:
        output = args.output_dir / f"TrailerHero-v{version}_{kind}.zip"
        write_archive(output, installer=installer, base=None if installer else installer_output)
        print(output, flush=True)


if __name__ == "__main__":
    main()
