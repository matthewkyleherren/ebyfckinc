#!/usr/bin/env python3
"""
Delete JPG/PNG images that have WebP alternatives
Keep only WebP for better performance
"""

import os
from pathlib import Path
from collections import defaultdict

PROJECT_ROOT = Path("/Users/m/Downloads/wear1/wear-trbl.snpdev.ru")
ASSETS_DIR = PROJECT_ROOT / "assets"

def find_duplicates():
    """Find images that exist in both JPG/PNG and WebP formats"""

    print("=" * 80)
    print("FINDING DUPLICATE FORMAT IMAGES")
    print("=" * 80)
    print()

    # Group images by base name (without extension)
    by_basename = defaultdict(list)

    for img_file in ASSETS_DIR.glob("*"):
        if img_file.suffix.lower() in ['.jpg', '.png', '.webp']:
            basename = img_file.stem
            by_basename[basename].append(img_file)

    # Find images that have both JPG/PNG and WebP
    to_delete = []
    to_keep_webp = []

    for basename, files in by_basename.items():
        if len(files) < 2:
            continue

        # Group by extension
        by_ext = defaultdict(list)
        for f in files:
            by_ext[f.suffix.lower()].append(f)

        # If we have WebP + (JPG or PNG), delete the JPG/PNG
        if '.webp' in by_ext:
            has_webp = by_ext['.webp']

            for ext in ['.jpg', '.png']:
                if ext in by_ext:
                    for img_file in by_ext[ext]:
                        to_delete.append(img_file)

            # Mark WebP files to keep
            for webp_file in has_webp:
                to_keep_webp.append(webp_file)

    return to_delete, to_keep_webp


def main():
    import sys

    dry_run = '--execute' not in sys.argv

    print()
    print("╔" + "=" * 78 + "╗")
    print("║" + " " * 20 + "DELETE DUPLICATE IMAGES" + " " * 35 + "║")
    print("╚" + "=" * 78 + "╝")
    print()

    if dry_run:
        print("🔍 RUNNING IN DRY-RUN MODE (use --execute to actually delete)")
    else:
        print("⚠️  RUNNING IN EXECUTE MODE - FILES WILL BE DELETED!")
    print()

    # Find duplicates
    to_delete, to_keep_webp = find_duplicates()

    print(f"📊 ANALYSIS:")
    print(f"   JPG/PNG files to delete: {len(to_delete)}")
    print(f"   WebP files to keep: {len(to_keep_webp)}")
    print()

    if not to_delete:
        print("✅ No duplicate JPG/PNG files found!")
        print()
        return

    # Calculate space savings
    total_size_deleted = sum(f.stat().st_size for f in to_delete)
    total_size_kept = sum(f.stat().st_size for f in to_keep_webp)

    print(f"💾 SPACE ANALYSIS:")
    print(f"   JPG/PNG total size: {total_size_deleted / 1024 / 1024:.2f} MB")
    print(f"   WebP total size:    {total_size_kept / 1024 / 1024:.2f} MB")
    print(f"   Space saved:        {(total_size_deleted - total_size_kept) / 1024 / 1024:.2f} MB ({100 * (1 - total_size_kept / total_size_deleted):.1f}% reduction)")
    print()

    # Show files to delete
    print("🗑️  FILES TO DELETE (first 30):")
    print("-" * 80)

    for idx, img_file in enumerate(sorted(to_delete)[:30], 1):
        size_kb = img_file.stat().st_size / 1024
        print(f"{idx:3}. {img_file.name:50} ({size_kb:>8.1f} KB)")

    if len(to_delete) > 30:
        print(f"     ... and {len(to_delete) - 30} more")
    print()

    if dry_run:
        print("🔍 DRY RUN - No files deleted")
        print()
        print("To execute the deletion, run:")
        print("  python3 delete_duplicate_images.py --execute")
    else:
        print("⚠️  DELETING FILES...")
        print()

        deleted = 0
        errors = []

        for img_file in to_delete:
            try:
                img_file.unlink()
                deleted += 1
            except Exception as e:
                errors.append(f"{img_file.name}: {str(e)}")

        print(f"✅ Deleted {deleted} files")

        if errors:
            print(f"❌ Errors: {len(errors)}")
            for err in errors[:10]:
                print(f"   {err}")

        print()
        print(f"💾 Freed {total_size_deleted / 1024 / 1024:.2f} MB of disk space!")

    print()
    print("=" * 80)
    print("NEXT STEPS")
    print("=" * 80)
    print()
    print("After deleting JPG/PNG duplicates:")
    print("1. Test the site - open index.html in browser")
    print("2. Check all images load (WebP is supported by all modern browsers)")
    print("3. If any browser issues, WebP has 95%+ browser support")
    print()


if __name__ == "__main__":
    main()
