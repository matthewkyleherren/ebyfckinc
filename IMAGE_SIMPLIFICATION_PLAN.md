# IMAGE SIMPLIFICATION PLAN

## Current Situation

You currently have **32 lookbook JPG images** in `/assets/` with hash-based filenames like:
- `Lookbook_image_1_thumb.ffd137cb.jpg`
- `Lookbook_image_1_x1.455a24d6.jpg`

The other 180 images mentioned before don't actually exist in your download yet.

## Goals

1. **Remove stupid hashes** from all filenames
   - `Lookbook_image_1_thumb.ffd137cb.jpg` → `Lookbook_image_1_thumb.jpg`

2. **Update all references** in index.html to match new filenames

3. **Future: WebP conversion** (optional, after hash removal works)

## Why This Is Easy Now

Since you only have 32 JPG files (all lookbook images), there are NO duplicates to worry about!
- No WebP versions
- No PNG versions
- Just clean JPG files with hashes

This means:
- ✅ No duplicate format decisions
- ✅ No file deletion needed
- ✅ Simple 1:1 rename
- ✅ Simple reference updates

## Step-by-Step Process

### Step 1: Remove Hashes (DONE - Script Ready)

The `simplify_images.py` script will:
1. Find all 32 images
2. Remove the 8-character hash from each filename
3. Update all references in `index.html`

**Example transformations:**
```
Lookbook_image_1_thumb.ffd137cb.jpg  →  Lookbook_image_1_thumb.jpg
Lookbook_image_1_x1.455a24d6.jpg     →  Lookbook_image_1_x1.jpg
Lookbook_image_2_thumb.dd3cf2fc.jpg  →  Lookbook_image_2_thumb.jpg
...
```

**References updated in:**
- `index.html` - Main file with all content
- CSS files (if any exist)
- JS files (if any exist)

### Step 2: Test

1. Open `index.html` in browser
2. Navigate to lookbook/gallery section
3. Verify all 32 images load correctly
4. Check browser console for any 404 errors

### Step 3: Future WebP Conversion (Optional)

**After hash removal works**, if you want better performance:

1. **Convert JPG to WebP:**
   ```bash
   # Using imagemagick or online tools
   for jpg in Lookbook*.jpg; do
       cwebp -q 85 "$jpg" -o "${jpg%.jpg}.webp"
   done
   ```

2. **Update HTML to use WebP:**
   - Modern browsers support WebP
   - Smaller file sizes (30-50% smaller than JPG)
   - Better quality at same file size

3. **Optionally keep JPG as fallback:**
   ```html
   <picture>
       <source srcset="image.webp" type="image/webp">
       <img src="image.jpg" alt="Fallback">
   </picture>
   ```

## Current Files Breakdown

```
Lookbook images: 32 files
├── Thumbnails: 16 files (Lookbook_image_N_thumb.HASH.jpg)
└── Full size:  16 files (Lookbook_image_N_x1.HASH.jpg)

Images 1-17 (some missing thumb or full size versions)
```

## What The Script Does

### Dry Run (Default):
```bash
python3 simplify_images.py
```
- Shows what WOULD be renamed
- Shows what WOULD be updated in HTML
- Makes NO changes
- Safe to run multiple times

### Execute Mode:
```bash
python3 simplify_images.py --execute
```
- Actually renames files
- Creates backups (`.backup_images`)
- Updates `index.html`
- Updates CSS/JS if they exist

**Backups created:**
- Files are renamed (not copied), so originals are gone
- `index.html.backup_images` - Backup before changes
- `*.css.backup_images` - CSS backups if modified
- `*.js.backup_images` - JS backups if modified

## Safety Measures

1. **Always run dry-run first** to see what will happen
2. **Backup created automatically** before any file modifications
3. **Hash verification** - only removes 8-hex-char hashes, won't touch other dots
4. **Collision detection** - won't overwrite if target filename exists

## After Simplification

Your files will be:
```
assets/
├── Lookbook_image_1_thumb.jpg
├── Lookbook_image_1_x1.jpg
├── Lookbook_image_2_thumb.jpg
├── Lookbook_image_2_x1.jpg
├── ...
└── Lookbook_image_17_x1.jpg
```

Much cleaner! Easy to work with!

## About The "212 Missing Images"

The earlier verification said you had 212 images, but that was based on what the HTML **references**, not what actually exists.

**What's referenced but missing:**
- Product images (IKI, SWEAT, TEE) - ~80 files
- Background images - ~15 files
- Model/person images - ~18 files
- Collection images - ~10 files
- Favicon files - ~8 files
- Other WebP/PNG versions - ~60 files

**These don't exist in your download currently.**

If you want them, you'll need to download them from the original site. But for now, let's simplify what you HAVE (the 32 lookbook images).

## Recommendation

1. ✅ **Do now:** Remove hashes from your 32 lookbook images
2. ✅ **Do now:** Update references in HTML
3. ⭕ **Later:** Download missing product images (if needed)
4. ⭕ **Later:** Convert to WebP (optional performance improvement)

## Ready to Execute?

Run the script in dry-run mode first:
```bash
cd /Users/m/Downloads/wear1/wear-trbl.snpdev.ru
python3 simplify_images.py
```

Review the output, then execute if it looks good:
```bash
python3 simplify_images.py --execute
```

The script is smart and safe - it will only rename files and update references.
