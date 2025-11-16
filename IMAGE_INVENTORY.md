# IMAGE INVENTORY - WE+AR TRBL Website

**Generated:** 2025-11-16
**Project:** wear-trbl.snpdev.ru

---

## 📊 Executive Summary

| Metric | Count |
|--------|-------|
| **Images Referenced in HTML** | 63 |
| **Images Actually Present** | 191 |
| **Missing Files** | **21** ⚠️ |
| **Unreferenced Files** | 149 |

---

## ❌ MISSING FILES (21 total)

### Critical Missing Files

These files are referenced in `index.html` but are NOT present in your `/assets` directory. **The site will not display properly without them.**

#### 1. Favicon Files (3 missing)
```
assets/favicons/apple-touch-icon.png
assets/favicons/mstile-150x150.png
assets/favicons/safari-pinned-tab.svg
```
**Impact:** Browser icons, bookmarks, iOS home screen
**Priority:** Medium

---

#### 2. IKI Product Images (6 missing - ALL desktop versions)
```
assets/iki_mns-cart-desktop.905a8bc9.jpg
assets/iki_mns-main-desktop.905a8bc9.jpg
assets/iki_mns-preview-desktop.905a8bc9.jpg
assets/iki_wmns-cart-desktop.905a8bc9.jpg
assets/iki_wmns-main-desktop.905a8bc9.jpg
assets/iki_wmns-preview-desktop.905a8bc9.jpg
```
**Impact:** IKI screen device (core product) won't show on desktop
**Priority:** 🔴 **CRITICAL**

---

#### 3. TEE Product Images (8 missing - ALL desktop main shots)
```
assets/iki-tee-1_mns-main-desktop.09c39f78.jpg
assets/iki-tee-2_mns-main-desktop.6a87ec7c.jpg
assets/iki-tee-3_mns-main-desktop.b98910fd.jpg
assets/iki-tee-4_mns-main-desktop.ba9ced01.jpg
assets/iki-tee-1_wmns-main-desktop.44c78255.jpg
assets/iki-tee-2_wmns-main-desktop.75f1450d.jpg
assets/iki-tee-3_wmns-main-desktop.f9baca1c.jpg
assets/iki-tee-4_wmns-main-desktop.bc8f7b9d.jpg
```
**Impact:** TEE product detail views won't work on desktop
**Priority:** 🔴 **CRITICAL**

---

#### 4. Cart/Basket Images (4 missing)
```
assets/tee-alone-1_mns-cart-desktop.58085263.jpg
assets/tee-alone-1_mns-cart-desktop.5e267408.jpg
assets/tee-alone-1_wmns-cart-desktop.85425812.jpg
assets/tee-alone-1_wmns-cart-desktop.c3d5c73e.jpg
```
**Impact:** Shopping cart views won't display properly
**Priority:** 🟡 **HIGH**

---

## ✅ PRESENT FILES BY CATEGORY

### Product Images

#### IKI Product (1 present, 6 missing)
- ✓ `iki_mns-cart-desktop.34ddd245.webp` (only 1 webp version present)
- ❌ All 6 .jpg versions missing (see above)

#### SWEAT Product (40 present, 0 missing) ✅
**Preview Images:**
- Men's: 4 files (2 PNG, 2 WebP) - desktop & mobile
- Women's: 4 files (2 PNG, 2 WebP) - desktop & mobile

**Main Product Photos (4 angles × 2 genders × 2 devices × 2 formats):**
- Men's Desktop: 4 JPG + 4 WebP = 8 files
- Men's Mobile: 4 JPG + 4 WebP = 8 files
- Women's Desktop: 4 JPG + 4 WebP = 8 files
- Women's Mobile: 4 JPG + 4 WebP = 8 files

**Status:** ✅ Complete

---

#### TEE Product (32 present, 8 missing)
**Preview Images:**
- Men's: 4 files (2 PNG, 2 WebP) - desktop & mobile
- Women's: 4 files (2 PNG, 2 WebP) - desktop & mobile

**Main Product Photos:**
- Men's Mobile: 4 JPG + 4 WebP = 8 files ✅
- Women's Mobile: 4 JPG + 4 WebP = 8 files ✅
- Men's Desktop: 0 JPG ❌ + 4 WebP ✅ = **4 JPG missing**
- Women's Desktop: 0 JPG ❌ + 4 WebP ✅ = **4 JPG missing**

**Status:** ⚠️ Mobile complete, Desktop JPG missing

---

### Lookbook Images (65 files)

17 images × multiple formats = 65 files total

**Structure per image:**
- `Lookbook_image_[N]_mobile.jpg` - Mobile JPG version
- `Lookbook_image_[N]_mobile.webp` - Mobile WebP version
- `Lookbook_image_[N]_x1.webp` - Desktop full-size WebP
- `Lookbook_image_[N]_thumb.webp` - Thumbnail WebP

**Note:** Images 4 and 17 are missing some versions but have at least 2 formats each.

**Images Present:** 1-17
**Status:** ✅ Complete (loaded dynamically via JavaScript)

---

### Model/Person Images (18 files)

6 people × 3 formats each = 18 files

**People:**
- Bobby: JPG + 2 WebP versions
- Caroline: JPG + 2 WebP versions
- Jamar: JPG + 2 WebP versions
- Juan: JPG + 2 WebP versions
- Sana: JPG + 2 WebP versions
- William: JPG + 2 WebP versions

**Status:** ✅ Complete

---

### Background Images (15 files)

**Main Backgrounds:**
- `m-back-home` (JPG + WebP)
- `m-back` (WebP only)
- `blackBackground` (JPG + WebP)
- `menuBackground` (JPG + WebP)
- `feedback-back` (JPG only)

**Page Backgrounds:**
- `home` (JPG + WebP)
- `collection` (JPG + WebP)
- `collection-mns` (JPG + WebP)
- `collection-wmns` (JPG + WebP)
- `menu` (JPG + WebP)

**Category Images:**
- `mns` (JPG + WebP)
- `wmns` (JPG + WebP)

**Status:** ✅ Complete

---

### Favicon Files (5 present, 3 missing)

**Present:**
- ✓ `favicon.ico`
- ✓ `favicon-16x16.png`
- ✓ `favicon-32x32.png`
- ✓ `android-chrome-192x192.png`
- ✓ `android-chrome-512x512.png`

**Missing:**
- ❌ `apple-touch-icon.png` (180x180)
- ❌ `mstile-150x150.png` (Windows tile)
- ❌ `safari-pinned-tab.svg` (Safari pinned tab)

**Status:** ⚠️ Core files present, Apple/Windows variants missing

---

### Size Guide Images (2 files)
- ✓ `sizes.30340dcc.webp`
- ✓ `sizes-m.3ed3124c.png`

**Status:** ✅ Complete

---

## 🔧 Action Required

### Immediate (Critical Priority)

1. **Download Missing Product Images**
   ```bash
   cd /Users/m/Downloads/wear1/wear-trbl.snpdev.ru
   bash DOWNLOAD_MISSING_FILES.sh
   ```

2. **Verify Downloads**
   ```bash
   find assets -name "iki_*-desktop.*.jpg" | wc -l
   # Should return: 6

   find assets -name "iki-tee-*_*ns-main-desktop.*.jpg" | wc -l
   # Should return: 8
   ```

### Optional (Medium Priority)

3. **Generate Missing Favicons**
   - Use existing `android-chrome-512x512.png` to generate:
     - `apple-touch-icon.png` (180×180)
     - `mstile-150x150.png` (150×150)
     - `safari-pinned-tab.svg` (monochrome SVG)

   OR download from original site using provided wget commands.

---

## 📋 Complete File Listing

### Images Referenced in HTML (63 files)

**Referenced but MISSING (21):** See section above

**Referenced and PRESENT (42):**
```
assets/m-back-home.55325250.jpg
assets/iki-sweat_mns-preview-desktop.3e5505c9.png
assets/iki-sweat_mns-preview-mobile.51bba5ef.png
assets/iki-sweat_wmns-preview-desktop.ae780eb4.png
assets/iki-sweat_wmns-preview-mobile.f513d224.png
assets/iki-sweat-1_mns-main-desktop.5e267408.jpg
assets/iki-sweat-1_mns-main-mobile.207c0b30.jpg
assets/iki-sweat-2_mns-main-desktop.86330e5c.jpg
assets/iki-sweat-2_mns-main-mobile.9ae42c28.jpg
assets/iki-sweat-3_mns-main-desktop.6dc969fb.jpg
assets/iki-sweat-3_mns-main-mobile.a6bf039a.jpg
assets/iki-sweat-4_mns-main-desktop.077d7488.jpg
assets/iki-sweat-4_mns-main-mobile.6363a9fd.jpg
assets/iki-sweat-1_wmns-main-desktop.c3d5c73e.jpg
assets/iki-sweat-1_wmns-main-mobile.8c502ef6.jpg
assets/iki-sweat-2_wmns-main-desktop.d5e07f69.jpg
assets/iki-sweat-2_wmns-main-mobile.dd495d09.jpg
assets/iki-sweat-3_wmns-main-desktop.d8bac6e9.jpg
assets/iki-sweat-3_wmns-main-mobile.5372cd2f.jpg
assets/iki-sweat-4_wmns-main-desktop.e6e221d6.jpg
assets/iki-sweat-4_wmns-main-mobile.4a4300cc.jpg
assets/iki-tee_mns-preview-desktop-min.34a6c833.png
assets/iki-tee_mns-preview-mobile-min.a0ffaafb.png
assets/iki-tee_wmns-preview-desktop-min.c2cf7f06.png
assets/iki-tee_wmns-preview-mobile-min.c3d3fbd8.png
assets/iki-tee-1_mns-main-mobile.55a7157b.jpg
assets/iki-tee-2_mns-main-mobile.e3117cd4.jpg
assets/iki-tee-3_mns-main-mobile.6d6fc3a7.jpg
assets/iki-tee-4_mns-main-mobile.e65aade0.jpg
assets/iki-tee-1_wmns-main-mobile.e2927ff0.jpg
assets/iki-tee-2_wmns-main-mobile.0fec7c5c.jpg
assets/iki-tee-3_wmns-main-mobile.934dd466.jpg
assets/iki-tee-4_wmns-main-mobile.77c8c91d.jpg
assets/tee-alone-1_wmns-cart-mobile.3ff34c5c.jpg
assets/tee-alone-1_wmns-cart-mobile.8c502ef6.jpg
assets/tee-alone1_mns-cart-mobile.207c0b30.jpg
assets/tee-alone1_mns-cart-mobile.ffb55854.jpg
assets/favicons/favicon.ico
assets/favicons/favicon-16x16.png
assets/favicons/favicon-32x32.png
assets/favicons/android-chrome-192x192.png
assets/favicons/android-chrome-512x512.png
```

---

### Unreferenced Files (149 files)

These files exist in the `/assets` directory but are NOT directly referenced in the HTML. They are likely:
- Loaded dynamically by JavaScript
- WebP alternatives for performance
- Background/decorative images
- Additional responsive versions

**Categories:**
- Lookbook images: 65 files
- Model/person images: 18 files
- WebP product alternatives: ~40 files
- Background images: ~10 files
- Collection images: ~6 files
- Size guide images: 2 files
- Other: ~8 files

**Recommendation:** Keep all unreferenced files - they are used by the React application.

---

## 🎯 Next Steps for Content Replacement

Once all files are downloaded:

1. **Use existing images as templates** for dimensions and format
2. **Product images to replace:**
   - IKI: 6 files (all need new product photos)
   - SWEAT: 40 files (8 angles × 2 genders × 2 devices × ~2 formats)
   - TEE: 32 files (8 angles × 2 genders × 2 devices × ~2 formats)

3. **Supporting images:**
   - Lookbook: 65 files (17 lifestyle images)
   - Models: 18 files (6 people)
   - Backgrounds: 15 files
   - Favicons: 5-8 files

4. **Update HTML references** in `index.html` (lines 465-960) if changing file hashes

---

## 📞 Support

If you need help:
1. Run `DOWNLOAD_MISSING_FILES.sh` to get missing files
2. Verify with: `find assets -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) | wc -l`
3. Expected total after download: **212 files** (191 + 21)

---

**Last Updated:** 2025-11-16
**Tool:** Claude Code Analysis
