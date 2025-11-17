# CONTENT REPLACEMENT PLAN
## WE+AR TRBL Website Rebrand - Timeline for Tomorrow

**Created:** 2025-11-16
**Deadline:** Tomorrow
**Target:** Complete content replacement of WE+AR TRBL e-commerce site

---

## 🎯 EXECUTIVE SUMMARY

This site has **ONE main file** containing all content: `index.html` (997 lines)

**All text content** is in lines 170-992 within the `window.__INITIAL_STATE__` JavaScript object.

**Total Changes Required:**
- 254 localization messages (text strings)
- 3 product definitions (with descriptions, prices, images)
- 21+ brand name occurrences
- 212 image files
- 2 additional files (manifest.json, possibly CSS/JS references)

---

## ⏰ TIMELINE - TOMORROW'S SCHEDULE

### PHASE 1: Morning (3-4 hours)
**Critical Text Replacement - Lines 170-444**

#### Hour 1: Brand Identity (30 min work)
- [ ] Brand name replacement
- [ ] Email addresses
- [ ] Domain names
- [ ] Hashtags

#### Hour 2: Core Content (1 hour work)
- [ ] Taglines and slogans
- [ ] Homepage text
- [ ] About section (4 paragraphs)
- [ ] Contact information

#### Hour 3: Product Names & Navigation (1 hour work)
- [ ] Product names (IKI, SWEAT, TEE)
- [ ] Navigation menu items
- [ ] Product interface labels

#### Hour 4: FAQ & Policies (1.5 hours work)
- [ ] 15 FAQ questions/answers
- [ ] Update technical specifications
- [ ] Review legal disclaimers

---

### PHASE 2: Afternoon (2-3 hours)
**Product Catalog - Lines 465-960**

#### Hour 5: Product Data (1.5 hours work)
- [ ] Product 1: Core device (replaces IKI)
- [ ] Product 2: Sweatshirt bundle
- [ ] Product 3: T-shirt bundle
- [ ] Prices, descriptions, sizes

#### Hour 6: Product Descriptions (1 hour work)
- [ ] Write compelling HTML descriptions
- [ ] Update meta descriptions
- [ ] Technical specifications

---

### PHASE 3: Late Afternoon (1-2 hours)
**Legal & Policy Content - Lines 329-396**

#### Hour 7: Legal Text (OPTIONAL - can skip if same company)
- [ ] Customer Care (20 sections)
- [ ] Privacy Policy (14 sections)
- [ ] Company information

**Note:** If keeping same parent company, minimal changes needed here.

---

### PHASE 4: Evening (2-3 hours)
**Supporting Files & Testing**

#### Hour 8: Additional Files (30 min)
- [ ] Update manifest.json
- [ ] Verify CSS/JS don't need changes
- [ ] Check for hardcoded text in JS

#### Hour 9: Testing & Verification (1 hour)
- [ ] Test all pages load
- [ ] Verify products display
- [ ] Check mobile responsiveness
- [ ] Test navigation

#### Hour 10: Image Preparation (1+ hours)
- [ ] Prepare new product photos
- [ ] Resize to match existing dimensions
- [ ] Organize by category

**Note:** Image replacement can be done after deadline if needed.

---

## 📋 DETAILED REPLACEMENT CHECKLIST

### A. BRAND IDENTITY CHANGES (15 instances)

**File:** `index.html`

#### 1. Brand Name "WE+AR TRBL" → Your New Name

```
Line 20:   <title>HOME | WE+AR TRBL</title>
Line 61:   <title>WE+AR TRBL</title>  (in SVG)
Line 230:  "we+ar trbl – a new path..."
Line 231:  "...inspired parrot to create we+ar trbl..."
Line 232:  "...we have implemented new..."
Line 233:  "...we+ar trbl challenges..."
Line 270:  "All we+ar TRBL products are safe..."
Line 272:  "we+ar TRBL is happy to offer..."
Line 404:  "All we+ar TRBL products are designed..."
Line 432:  "To a WE+AR TRBL Vendor"
```

**Search & Replace:**
- "WE+AR TRBL" → "YOUR BRAND"
- "we+ar trbl" → "your brand"
- "we+ar TRBL" → "your brand"

---

#### 2. Hashtag "#wearTRBL" → Your Hashtag

```
Line 212:  "common.wearTrbl": "#wearTRBL"
Line 306:  "Tag your images with #wearTRBL..."
```

**Replace:** `#wearTRBL` → `#YourHashtag`

---

#### 3. Email Address

```
Line 242:  "contacts.email": "hello@weartrbl.com"
Line 389:  (privacy policy section)
```

**Replace:** `hello@weartrbl.com` → `your-email@yourdomain.com`

---

#### 4. Domain Names

```
Line 349:  "www.wear-trbl.com"
Line 443:  "www.weartrbl.com"
```

**Replace:** `wear-trbl.com` / `weartrbl.com` → `yourdomain.com`

---

### B. TAGLINES & SLOGANS (4 instances)

**File:** `index.html`

#### Primary Tagline
```
Line 21:   "The world's first flexible screen on a garment."
Line 91:   (repeated in mobile content)
Line 193:  (in preloader)
```

**Replace with:** Your product's unique value proposition

---

#### Main Slogan
```
Line 221:  "I am "
Line 222:  "what "
Line 223:  "i wear"
Line 224:  "I am what"  (mobile)
Line 225:  "i wear"     (mobile)
Line 234:  "i am what i wear"
```

**Replace with:** Your brand slogan/philosophy

---

### C. PRODUCT NAMES (throughout)

#### Product 1: "IKI" → Your Device Name

```
Line 467:  title: "IKI"
Line 469:  slug: "iki"
Line 473:  Description mentions "IKI" multiple times
Line 233:  "our display, iki, synced with your smartphone..."
```

**Occurrences:** ~20+ throughout product descriptions and FAQ

**Replace:** `IKI` / `iki` → `YOUR_DEVICE_NAME` / `your_device_name`

---

#### Product 2: "SWEAT" → Keep or Rename

```
Line 530:  title: "SWEAT"
Line 532:  slug: "iki-sweat" (consider: "yourdevice-sweat")
```

---

#### Product 3: "TEE" → Keep or Rename

```
Line 746:  title: "TEE"
Line 748:  slug: "iki-tee" (consider: "yourdevice-tee")
```

---

### D. COMPANY INFORMATION

#### Address (Physical Location)

**Current:**
```
Line 235:  "30—34 Rue du 4 Septembre"
Line 236:  "75002 Paris"
Line 237:  "france"
```

**Replace with:** Your business address

---

#### Store Hours

```
Line 238:  "Monday — Friday: 11:00 - 18.30"
Line 239:  "Saturday: 11.00 — 17.00"
Line 240:  "Sunday: 12.30 — 16.30"
```

**Replace with:** Your hours (or remove if online-only)

---

#### Parent Company "Parrot"

**Extensive mentions in:**
- Lines 350-368 (Customer Care)
- Lines 384-396 (Privacy Policy)

**Decision needed:**
- Keep if still using Parrot as parent company
- Replace all instances if different company

**Estimated mentions:** 50+ occurrences

---

### E. ABOUT SECTION (4 paragraphs)

**File:** `index.html`, Lines 230-234

**Current Content:**

**Paragraph 1 (Line 230):**
```
"we+ar trbl – a new path to self-expression for a generation
of trouble makers and enfants terribles."
```

**Paragraph 2 (Line 231):**
```
"in 2015, the world witnessed a celebration of peace and freedom
of speech with the je suis charlie movement. the collective urge
to instantaneously express individual ideas and emotions inspired
parrot to create we+ar trbl, a unique experience that infuses
your life with new forms of freedom of expression."
```

**Paragraph 3 (Line 232):**
```
"inspired by individuals with unconventional ideas and the current
worldwide climate of ethical concerns, we have implemented new
technological advancements to launch a line of connected garments
embedded with the first flexible e-paper screen on the market."
```

**Paragraph 4 (Line 233):**
```
"our display, iki, synced with your smartphone, can instantly
reflect your mood, character and personality. we+ar trbl challenges
and reinvents the social conversation both in an individual and
collective spirit. the time to act is now and together we can
break all the rules and redefine them."
```

**Action:** Rewrite all 4 paragraphs with your brand story

---

### F. FAQ SECTION (15 Q&As)

**File:** `index.html`, Lines 244-273

**Questions to Review/Update:**

1. ✏️ "How many pictures can be uploaded?"
   - **Current answer:** "Up to 20 pictures"
   - Update with your device specs

2. ✏️ "What is the estimated speed of upload/image?"
   - **Current answer:** "3 to 20 seconds"
   - Update with your device specs

3. ✏️ "What is the estimated battery life?"
   - **Current answer:** "15,000 pictures, up to 5 days"
   - Update with your device specs

4. ✏️ "What is the exact weight?"
   - **Current answer:** "37g"
   - Update with your device specs

5. ✅ "What are the washing instructions / constraints?"
   - **Current answer:** "Remove device before washing"
   - Likely same, verify

6. ✅ "How does the screen hold in place?"
   - **Current answer:** "Magnetic field"
   - Update if different

7. ✅ "How do you manage weather conditions..."
   - **Current answer:** "Rain proof"
   - Update with your device specs

8. ✅ "Can the screen overheat?"
   - Technical answer about electrophoretic display
   - Update with your device specs

9. ✏️ "What is the broadcast mode?"
   - **Current answer:** Mentions "TRBL app"
   - Update with your app name

10. ✅ "Is the technology safe?"
    - Generic answer, likely keep

11. ✅ "Which are the guarantee conditions?"
    - **Current answer:** "1 year"
    - Update with your warranty

12. ✅ "Can i travel on a plane..."
    - Generic answer, review

13. ✅ "How do we address concerns of radio waves..."
    - **Current answer:** "Bluetooth Low Energy"
    - Update if different tech

14. ✅ "What is the returns policy?"
    - **Current answer:** "14 days"
    - Update with your policy

15. ✅ "Can i wear my shirt without the screen?"
    - **Current answer:** "Yes, magnetic pocket"
    - Update if different

**Action:** Review all 15, update technical specs

---

### G. PRODUCT CATALOG (Lines 465-960)

**Structure:** 3 products with detailed information

#### Product 1: IKI Device (Lines 466-527)

**Required Changes:**

```javascript
{
  id: 2286722121785,              // Keep or change
  title: "IKI",                   // → YOUR DEVICE NAME
  type: "iki",                    // → "yourdevice"
  slug: "iki",                    // → "yourdevice"
  price: "100.00",                // → YOUR PRICE
  priceWithDiscount: 90,          // → YOUR DISCOUNTED PRICE
  description: "...",             // → YOUR DESCRIPTION (HTML)
  variants: [...],                // → YOUR VARIANTS
  images: [...]                   // → UPDATE IMAGE PATHS
}
```

**Description Template (Line 473):**
```html
<ul>
  <li>FEATURE 1</li>
  <li>FEATURE 2</li>
</ul>
<p>
  [YOUR DEVICE NAME] is [your description].
  [Your brand] is [your value proposition].
  With this ultra-flat, lightweight [SIZE]'' screen,
  you can [your use case].
</p>
<p>
  [Additional features and benefits]
</p>
```

---

#### Product 2: SWEAT Bundle (Lines 529-743)

**Required Changes:**

```javascript
{
  id: 1362777243705,              // Keep or change
  title: "SWEAT",                 // → Keep or change
  type: "iki+sweat",              // → "yourdevice+sweat"
  slug: "iki-sweat",              // → "yourdevice-sweat"
  price: "250.00",                // → YOUR PRICE
  priceWithDiscount: 225,         // → YOUR DISCOUNTED PRICE
  description: "...",             // → YOUR DESCRIPTION
  variants: [S, M, L, XL],        // → Verify sizes
  images: [24 images]             // → UPDATE IMAGE PATHS
}
```

**Description Template (Line 537):**
```html
<ul>
  <li>COLOR</li>
  <li>FRAME COLOR</li>
  <li>MATERIAL COMPOSITION</li>
  <li>MAGNETIC POCKET</li>
  <li>SWEAT</li>
</ul>
<p>
  [Color] unisex sweat-shirt.
  Fabrication of [your materials].
</p>
<p>
  The seamless integration of the [DEVICE NAME] screen
  into the garment is made through [your process].
</p>
```

---

#### Product 3: TEE Bundle (Lines 745-960)

**Same structure as SWEAT**

```javascript
{
  title: "TEE",                   // → Keep or change
  slug: "iki-tee",                // → "yourdevice-tee"
  price: "250.00",                // → YOUR PRICE
  // ... same pattern as SWEAT
}
```

---

### H. NAVIGATION & UI TEXT (Lines 194-328)

**Common UI Elements (Lines 194-217):**
- Most are generic: "Close", "Basket", "Play", "Loading", etc.
- Review and keep most as-is
- Update any brand-specific terms

**Navigation Menu (Lines 273-285):**
```
Line 273:  "nav.home": "Home"           → Keep
Line 274:  "nav.about": "Who we+ar"    → Update to your brand
Line 275:  "nav.faq": "Faq"            → Keep
Line 276:  "nav.lookbook": "Lookbook"  → Keep or rename
Line 277:  "nav.contacts": "Contacts"  → Keep
Line 278:  "nav.collection": "Produсts" → Keep (note: Cyrillic 'с')
Line 280:  "nav.trblmkrs": "Trbl mkrs" → Update or remove
Line 283:  "nav.trblApp": "Trbl app"   → Update to your app name
```

**Action:** Review all menu items, update brand-specific ones

---

### I. ADDITIONAL FILES

#### manifest.json

**File:** `/manifest.json`

```json
{
  "name": "WE+AR TRBL",           → YOUR BRAND
  "short_name": "TRBL",           → YOUR BRAND ABBR
  "icons": [...]                   → Verify paths
}
```

---

### J. IMAGE REPLACEMENT (212 files)

**Not urgent for tomorrow, but plan ahead:**

#### Critical Images (Replace First):
1. **Product photos** (86 files)
   - IKI device: 6 images
   - SWEAT: 40 images
   - TEE: 40 images

2. **Favicons** (8 files)
   - Easy to regenerate from one image

#### Secondary Images (Replace Later):
3. **Lookbook** (65 files)
   - Lifestyle/brand imagery
   - 17 images × 4 versions each

4. **Model photos** (18 files)
   - 6 people × 3 versions
   - Can remove or replace

5. **Backgrounds** (15 files)
   - Generic, can keep temporarily

**Image Specifications:**
- Product preview: 2100×1800 (desktop), 540×804 (mobile)
- Product main: 1920×1080 or 3200×1800 (desktop), 1444×812 (mobile)
- Formats: JPG for photos, PNG for graphics, WebP for both
- Naming: `productname_gender-context-device.hash.ext`

---

## 🛠️ TOOLS & SCRIPTS TO CREATE

### Tool 1: Brand Name Replacer

**Create:** `scripts/replace_brand.sh`

```bash
#!/bin/bash
# Replace all brand mentions in index.html

OLD_BRAND="WE+AR TRBL"
NEW_BRAND="YOUR BRAND"

# Backup first
cp index.html index.html.backup

# Replace variations
sed -i.bak "s/$OLD_BRAND/$NEW_BRAND/g" index.html
sed -i.bak "s/we+ar trbl/your brand/g" index.html
sed -i.bak "s/we+ar TRBL/your brand/g" index.html
sed -i.bak "s/#wearTRBL/#yourbrand/g" index.html
```

---

### Tool 2: Product Name Replacer

**Create:** `scripts/replace_products.sh`

```bash
#!/bin/bash
# Replace product names

# IKI → Your Device Name
sed -i.bak 's/"IKI"/"YOUR_DEVICE"/g' index.html
sed -i.bak 's/"iki"/"yourdevice"/g' index.html
sed -i.bak 's/slug: "iki"/slug: "yourdevice"/g' index.html
```

---

### Tool 3: Content Template Generator

**Create:** `scripts/generate_templates.sh`

Extracts current content into editable templates:
- `templates/about.txt` - About section
- `templates/faq.json` - FAQ Q&As
- `templates/products.json` - Product catalog

---

## 📝 REPLACEMENT WORKFLOW

### Step 1: Preparation (30 min)
1. **Backup everything**
   ```bash
   cp index.html index.html.ORIGINAL
   cp manifest.json manifest.json.ORIGINAL
   ```

2. **Gather new content:**
   - [ ] New brand name
   - [ ] New tagline/slogan
   - [ ] New email & domain
   - [ ] New product name(s)
   - [ ] New about text (4 paragraphs)
   - [ ] Updated FAQ answers
   - [ ] New product descriptions
   - [ ] New prices

3. **Create content document:**
   - Use `NEW_CONTENT.md` template (will create next)
   - Fill in all replacement values

---

### Step 2: Automated Replacements (30 min)
1. Run brand name replacer
2. Run product name replacer
3. Update contact info (email, address)
4. Update domain names

---

### Step 3: Manual Replacements (2-3 hours)
1. **About section** - Rewrite 4 paragraphs (Line 230-234)
2. **Product descriptions** - 3 products (Lines 473, 537, 753)
3. **FAQ answers** - Update technical specs (Lines 259-273)
4. **Navigation** - Update brand-specific menu items
5. **Tagline** - Update main slogan (Lines 221-225)

---

### Step 4: Legal Text (Optional, 1-2 hours)
1. **Customer Care** - Update if needed (Lines 350-368)
2. **Privacy Policy** - Update if needed (Lines 384-396)
3. **Company info** - Update parent company if changed

---

### Step 5: Verification (1 hour)
1. Search for old brand name occurrences
2. Verify all product names updated
3. Check email/contact info
4. Test site locally
5. Verify JSON syntax (use validator)

---

## ⚠️ CRITICAL WARNINGS

### 1. JSON Syntax
The content is inside a JavaScript object. **One syntax error breaks the entire site.**

**Rules:**
- Strings must use double quotes: `"text"`
- Escape quotes in content: `\"quote\"`
- No trailing commas
- Use `\n` for newlines in strings
- Use `<br>` or `<br/>` for HTML line breaks

### 2. HTML in Strings
Product descriptions contain HTML. Must escape properly:

**Example:**
```javascript
description: "<ul>\n  <li>FEATURE</li>\n</ul>\n<p>Description here.</p>"
```

### 3. Special Characters
- Em dash: `—` (not `--`)
- Cyrillic 'с' in "Produсts" (Line 278) - may want to fix to Latin 'c'
- Accented characters in French text

### 4. Image Path References
If changing product slugs, must also update image paths:

**Example:**
```javascript
// If changing slug from "iki" to "newdevice"
// Must also update image paths:
src: "/assets/iki-sweat-1_mns.jpg"
  ↓
src: "/assets/newdevice-sweat-1_mns.jpg"
```

**OR** keep image filenames as-is (recommended for tomorrow)

---

## 🎯 PRIORITIES FOR TOMORROW

### MUST DO (Core functionality):
1. ✅ Brand name (15 instances)
2. ✅ Email & contact info (3 instances)
3. ✅ Main tagline (4 instances)
4. ✅ Product names (3 products)
5. ✅ Product prices (3 products)
6. ✅ Product descriptions (3 products)
7. ✅ About section (4 paragraphs)

### SHOULD DO (User-facing):
8. ✅ FAQ answers (15 Q&As)
9. ✅ Navigation menu (updated labels)
10. ✅ Hashtag (2 instances)
11. ✅ manifest.json (brand name)

### COULD DO (Optional):
12. ⭕ Legal text (50+ instances)
13. ⭕ Image replacement (212 files)
14. ⭕ CSS/JS updates (if needed)

### SKIP FOR NOW:
- Full image replacement (can use existing temporarily)
- Video content (12 video files)
- Complete legal rewrite (use "Parrot" → "Your Company" find/replace)

---

## 📄 FILES TO CREATE

I will create these helper files for you:

1. ✅ **This document** - Complete plan
2. 🔲 **NEW_CONTENT.md** - Template for your new content
3. 🔲 **replacement_script.sh** - Automated replacer
4. 🔲 **verification_checklist.md** - QA checklist
5. 🔲 **quick_reference.md** - Line numbers quick lookup

---

## 📞 SUPPORT & TROUBLESHOOTING

### If Site Breaks:
1. Restore backup: `cp index.html.ORIGINAL index.html`
2. Check browser console for JavaScript errors
3. Validate JSON syntax at jsonlint.com
4. Look for missing quotes or commas

### Common Issues:
- **Blank page** → JavaScript syntax error
- **Products not showing** → Check product objects (Lines 465-960)
- **Images not loading** → Verify image paths in product objects
- **Text not updated** → Check you edited the right section

---

**Ready to proceed?**

I'll now create:
1. A content template for you to fill in
2. An automated replacement script
3. A quick reference guide

Let me know when you're ready for the next step!
