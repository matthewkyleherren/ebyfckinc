#!/usr/bin/env python3
"""
Image Simplification Script
1. Remove hashes from filenames
2. Identify and handle duplicates (WebP vs JPG/PNG)
3. Update all references in HTML, CSS, JS
"""

import os
import re
import shutil
from pathlib import Path
from collections import defaultdict

# Paths
PROJECT_ROOT = Path("/Users/m/Downloads/wear1/wear-trbl.snpdev.ru")
ASSETS_DIR = PROJECT_ROOT / "assets"

class ImageSimplifier:
    def __init__(self, dry_run=True):
        self.dry_run = dry_run
        self.rename_map = {}  # old_path -> new_path
        self.duplicates = defaultdict(list)  # base_name -> [(path, ext, size)]

    def remove_hash(self, filename):
        """Remove 8-character hash from filename like: image.abc12345.jpg -> image.jpg"""
        return re.sub(r'\.([a-f0-9]{8})\.(jpg|png|webp|svg|ico)$', r'.\2', filename)

    def analyze_images(self):
        """Find all images and group by base name"""
        print("=" * 80)
        print("ANALYZING IMAGES")
        print("=" * 80)
        print()

        all_images = []
        for root, dirs, files in os.walk(ASSETS_DIR):
            for file in files:
                if file.endswith(('.jpg', '.png', '.webp', '.svg', '.ico')):
                    full_path = Path(root) / file
                    rel_path = full_path.relative_to(PROJECT_ROOT)
                    all_images.append((full_path, rel_path, file))

        print(f"📊 Found {len(all_images)} image files")
        print()

        # Group by base name (without hash)
        for full_path, rel_path, filename in all_images:
            new_filename = self.remove_hash(filename)
            base_name = Path(new_filename).stem  # Without extension
            ext = Path(filename).suffix
            size = full_path.stat().st_size

            self.duplicates[base_name].append({
                'original': filename,
                'cleaned': new_filename,
                'full_path': full_path,
                'rel_path': rel_path,
                'ext': ext,
                'size': size
            })

            # Track rename mapping
            if filename != new_filename:
                self.rename_map[str(rel_path)] = str(rel_path.parent / new_filename)

        return all_images

    def find_duplicates(self):
        """Find images that exist in multiple formats"""
        print("=" * 80)
        print("DUPLICATE FORMAT ANALYSIS")
        print("=" * 80)
        print()

        multi_format = {k: v for k, v in self.duplicates.items() if len(v) > 1}

        print(f"📊 Images with multiple formats: {len(multi_format)}")
        print()

        if multi_format:
            print("🔍 DUPLICATES (first 30):")
            print("-" * 80)

            for idx, (base, files) in enumerate(sorted(multi_format.items())[:30], 1):
                formats = defaultdict(list)
                for f in files:
                    formats[f['ext']].append(f)

                print(f"{idx}. {base}")
                print(f"   Formats: {', '.join(sorted(formats.keys()))}")

                for ext in sorted(formats.keys()):
                    for f in formats[ext]:
                        size_kb = f['size'] / 1024
                        print(f"     {ext:6} - {f['original']:50} ({size_kb:>7.1f} KB)")
                print()

        return multi_format

    def recommend_cleanup(self, multi_format):
        """Recommend which files to keep/delete"""
        print("=" * 80)
        print("CLEANUP RECOMMENDATIONS")
        print("=" * 80)
        print()

        to_delete = []
        to_keep_webp = []

        for base, files in multi_format.items():
            # Group by extension
            by_ext = defaultdict(list)
            for f in files:
                by_ext[f['ext']].append(f)

            # If we have WebP + JPG/PNG, prefer WebP (usually smaller)
            if '.webp' in by_ext and ('.jpg' in by_ext or '.png' in by_ext):
                # Keep WebP, delete JPG/PNG
                for webp_file in by_ext['.webp']:
                    to_keep_webp.append(webp_file)

                for ext in ['.jpg', '.png']:
                    if ext in by_ext:
                        for img_file in by_ext[ext]:
                            to_delete.append(img_file)

        print(f"📊 SUMMARY:")
        print(f"   Files to keep (WebP): {len(to_keep_webp)}")
        print(f"   Files to delete (JPG/PNG with WebP alternative): {len(to_delete)}")
        print()

        if to_delete:
            print("🗑️  FILES TO DELETE (first 20):")
            print("-" * 80)
            for idx, f in enumerate(to_delete[:20], 1):
                size_kb = f['size'] / 1024
                print(f"{idx:3}. {f['rel_path']} ({size_kb:.1f} KB)")
            if len(to_delete) > 20:
                print(f"     ... and {len(to_delete) - 20} more")
            print()

        return to_delete, to_keep_webp

    def detect_collisions(self):
        """Detect files that would collide after hash removal and decide which to keep"""
        print("=" * 80)
        print("DETECTING HASH COLLISION CONFLICTS")
        print("=" * 80)
        print()

        # Group by target filename
        target_groups = defaultdict(list)
        for old_rel, new_rel in self.rename_map.items():
            old_path = PROJECT_ROOT / old_rel
            if old_path.exists():
                size = old_path.stat().st_size
                target_groups[new_rel].append({
                    'old_path': old_path,
                    'old_rel': old_rel,
                    'new_rel': new_rel,
                    'size': size
                })

        # Find collisions (multiple files want same target name)
        collisions = {k: v for k, v in target_groups.items() if len(v) > 1}

        if not collisions:
            print("✅ No hash collisions detected - all renames are unique")
            print()
            return {}

        print(f"⚠️  Found {len(collisions)} target filenames with multiple sources")
        print()

        # Resolve collisions - keep largest file
        to_delete = []
        resolved = {}

        for target, sources in sorted(collisions.items()):
            # Sort by size descending
            sources_sorted = sorted(sources, key=lambda x: x['size'], reverse=True)
            largest = sources_sorted[0]
            smaller = sources_sorted[1:]

            print(f"📁 {Path(target).name}")
            print(f"   ✅ KEEP:   {Path(largest['old_rel']).name:50} ({largest['size']:>10,} bytes)")
            for s in smaller:
                print(f"   🗑️  DELETE: {Path(s['old_rel']).name:50} ({s['size']:>10,} bytes)")
                to_delete.append(s['old_path'])
            print()

            # Only keep the largest in rename map
            resolved[target] = largest

        print(f"📊 COLLISION RESOLUTION:")
        print(f"   Files to keep:   {len(collisions)}")
        print(f"   Files to delete: {len(to_delete)}")
        print()

        return to_delete, resolved

    def rename_files(self):
        """Rename files to remove hashes"""
        print("=" * 80)
        print("RENAMING FILES (REMOVING HASHES)")
        print("=" * 80)
        print()

        # First detect and resolve collisions
        collision_result = self.detect_collisions()

        if collision_result:
            to_delete_collision, resolved = collision_result
        else:
            to_delete_collision, resolved = [], {}

        print(f"📋 Files to rename: {len(self.rename_map)}")
        if to_delete_collision:
            print(f"⚠️  Files to delete due to collision: {len(to_delete_collision)}")
        print()

        if self.dry_run:
            print("🔍 DRY RUN - No files will be renamed")
            print()

            if to_delete_collision:
                print("Files that will be DELETED (smaller duplicates):")
                print("-" * 80)
                for idx, path in enumerate(to_delete_collision[:10], 1):
                    size_kb = path.stat().st_size / 1024
                    print(f"{idx:3}. {path.name} ({size_kb:.1f} KB)")
                if len(to_delete_collision) > 10:
                    print(f"     ... and {len(to_delete_collision) - 10} more")
                print()

            print("First 20 renames (after collision resolution):")
            print("-" * 80)
            count = 0
            for old_rel, new_rel in list(self.rename_map.items())[:40]:
                old_path = PROJECT_ROOT / old_rel
                # Skip if marked for deletion
                if old_path in to_delete_collision:
                    continue
                count += 1
                if count <= 20:
                    print(f"{count:3}. {Path(old_rel).name:50} → {Path(new_rel).name}")
                else:
                    break

            remaining = len(self.rename_map) - len(to_delete_collision)
            if remaining > 20:
                print(f"     ... and {remaining - 20} more")
        else:
            print("✏️  PROCESSING FILES...")

            # First delete smaller collision files
            deleted_collision = 0
            if to_delete_collision:
                print(f"🗑️  Deleting {len(to_delete_collision)} smaller duplicate files...")
                for path in to_delete_collision:
                    try:
                        path.unlink()
                        deleted_collision += 1
                    except Exception as e:
                        print(f"   ❌ Error deleting {path.name}: {e}")
                print(f"   ✅ Deleted {deleted_collision} collision duplicates")
                print()

            # Now rename remaining files
            print("✏️  Renaming files...")
            renamed = 0
            skipped = 0
            errors = []

            for old_rel, new_rel in self.rename_map.items():
                old_path = PROJECT_ROOT / old_rel
                new_path = PROJECT_ROOT / new_rel

                # Skip if already deleted as collision duplicate
                if old_path in to_delete_collision:
                    skipped += 1
                    continue

                try:
                    if old_path.exists():
                        if not new_path.exists():
                            old_path.rename(new_path)
                            renamed += 1
                        else:
                            # Check if they're the same file (already renamed)
                            if old_path.samefile(new_path):
                                skipped += 1
                            else:
                                errors.append(f"{old_path.name} -> {new_path.name} (target exists)")
                except Exception as e:
                    errors.append(f"{old_path.name}: {str(e)}")

            print(f"✅ Renamed {renamed} files")
            print(f"⏭️  Skipped {skipped} files (collision duplicates)")
            if errors:
                print(f"❌ Errors: {len(errors)}")
                for err in errors[:10]:
                    print(f"   {err}")

        print()

    def update_html_references(self):
        """Update image references in index.html"""
        print("=" * 80)
        print("UPDATING HTML REFERENCES")
        print("=" * 80)
        print()

        html_file = PROJECT_ROOT / "index.html"

        if not html_file.exists():
            print("❌ index.html not found")
            return

        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Replace all image references
        replacements = 0
        for old_rel, new_rel in self.rename_map.items():
            old_name = Path(old_rel).name
            new_name = Path(new_rel).name

            # Replace in src attributes
            pattern = re.escape(old_name)
            if pattern in content:
                content = content.replace(old_name, new_name)
                replacements += content.count(new_name) - original_content.count(new_name)

        print(f"📝 Image references found and replaced: {replacements}")

        if self.dry_run:
            print("🔍 DRY RUN - HTML not modified")
        else:
            # Backup first
            backup = html_file.with_suffix('.html.backup_images')
            shutil.copy2(html_file, backup)
            print(f"💾 Backup created: {backup.name}")

            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Updated {html_file.name}")

        print()

    def update_css_references(self):
        """Update image references in CSS files"""
        print("=" * 80)
        print("UPDATING CSS REFERENCES")
        print("=" * 80)
        print()

        css_files = list(ASSETS_DIR.glob("*.css"))

        if not css_files:
            print("ℹ️  No CSS files found in assets/")
            print()
            return

        total_replacements = 0

        for css_file in css_files:
            with open(css_file, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content

            # Replace image references
            for old_rel, new_rel in self.rename_map.items():
                old_name = Path(old_rel).name
                new_name = Path(new_rel).name
                content = content.replace(old_name, new_name)

            if content != original_content:
                replacements = sum(1 for old_rel in self.rename_map if Path(old_rel).name in original_content)
                total_replacements += replacements

                if self.dry_run:
                    print(f"🔍 {css_file.name}: {replacements} references")
                else:
                    backup = css_file.with_suffix('.css.backup_images')
                    shutil.copy2(css_file, backup)

                    with open(css_file, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"✅ {css_file.name}: {replacements} references updated")

        print(f"📝 Total CSS references: {total_replacements}")
        if self.dry_run:
            print("🔍 DRY RUN - CSS not modified")
        print()

    def update_js_references(self):
        """Update image references in JS files"""
        print("=" * 80)
        print("UPDATING JS REFERENCES")
        print("=" * 80)
        print()

        js_files = list(ASSETS_DIR.glob("*.js"))

        if not js_files:
            print("ℹ️  No JS files found in assets/")
            print()
            return

        total_replacements = 0

        for js_file in js_files:
            with open(js_file, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content

            # Replace image references
            for old_rel, new_rel in self.rename_map.items():
                old_name = Path(old_rel).name
                new_name = Path(new_rel).name
                content = content.replace(old_name, new_name)

            if content != original_content:
                replacements = sum(1 for old_rel in self.rename_map if Path(old_rel).name in original_content)
                total_replacements += replacements

                if self.dry_run:
                    print(f"🔍 {js_file.name}: {replacements} references")
                else:
                    backup = js_file.with_suffix('.js.backup_images')
                    shutil.copy2(js_file, backup)

                    with open(js_file, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"✅ {js_file.name}: {replacements} references updated")

        print(f"📝 Total JS references: {total_replacements}")
        if self.dry_run:
            print("🔍 DRY RUN - JS not modified")
        print()


def main():
    import sys

    dry_run = '--execute' not in sys.argv

    print()
    print("╔" + "=" * 78 + "╗")
    print("║" + " " * 20 + "IMAGE SIMPLIFICATION SCRIPT" + " " * 31 + "║")
    print("╚" + "=" * 78 + "╝")
    print()

    if dry_run:
        print("🔍 RUNNING IN DRY-RUN MODE (use --execute to actually make changes)")
        print()
    else:
        print("⚠️  RUNNING IN EXECUTE MODE - FILES WILL BE MODIFIED!")
        print()

    simplifier = ImageSimplifier(dry_run=dry_run)

    # Step 1: Analyze
    all_images = simplifier.analyze_images()

    # Step 2: Find duplicates
    multi_format = simplifier.find_duplicates()

    # Step 3: Recommendations
    to_delete, to_keep_webp = simplifier.recommend_cleanup(multi_format)

    # Step 4: Rename files (remove hashes)
    simplifier.rename_files()

    # Step 5: Update HTML
    simplifier.update_html_references()

    # Step 6: Update CSS
    simplifier.update_css_references()

    # Step 7: Update JS
    simplifier.update_js_references()

    print("=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print()
    print(f"Total images analyzed: {len(all_images)}")
    print(f"Files to rename (remove hash): {len(simplifier.rename_map)}")
    print(f"Duplicate formats found: {len(multi_format)}")
    print(f"Recommended deletions (JPG/PNG with WebP alt): {len(to_delete)}")
    print()

    if dry_run:
        print("🔍 This was a DRY RUN - no changes were made")
        print()
        print("To execute the changes, run:")
        print("  python3 simplify_images.py --execute")
    else:
        print("✅ Changes have been applied!")
        print()
        print("Next steps:")
        print("1. Test the site to ensure all images load")
        print("2. Review the duplicate recommendations")
        print("3. Optionally delete JPG/PNG files that have WebP alternatives")

    print()


if __name__ == "__main__":
    main()
