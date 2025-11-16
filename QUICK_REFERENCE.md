# QUICK REFERENCE GUIDE
## Line Numbers & Locations for Fast Editing

**File:** `index.html` (997 lines)
**All content is in:** Lines 170-992 (JavaScript object)

---

## 🎯 TOP PRIORITY EDITS (Do These First)

| What | Line(s) | Current Value | Action |
|------|---------|---------------|--------|
| **Page Title** | 20 | `HOME \| WE+AR TRBL` | Replace brand name |
| **Main Tagline** | 21, 91, 193 | "The world's first flexible screen..." | Replace value prop |
| **Brand Logo** | 61 | `<title>WE+AR TRBL</title>` (SVG) | Replace brand name |
| **Homepage Slogan** | 221-225 | "I am what i wear" | Replace slogan (3 lines) |
| **About Section** | 230-234 | 4 paragraphs | Rewrite brand story |
| **Contact Email** | 242 | hello@weartrbl.com | Replace email |
| **Product 1 Name** | 467 | "IKI" | Replace device name |
| **Product 1 Price** | 471 | "100.00" | Replace price |
| **Product 1 Desc** | 473 | Long HTML | Rewrite description |
| **Product 2 Price** | 533 | "250.00" | Replace price |
| **Product 3 Price** | 749 | "250.00" | Replace price |

---

## 📍 ALL EDIT LOCATIONS BY CATEGORY

### BRAND NAME "WE+AR TRBL"

| Line | Context | Current |
|------|---------|---------|
| 20 | Page title | `HOME \| WE+AR TRBL` |
| 61 | SVG logo title | `<title>WE+AR TRBL</title>` |
| 230 | About paragraph 1 | "we+ar trbl – a new path..." |
| 231 | About paragraph 2 | "...create we+ar trbl..." |
| 233 | About paragraph 4 | "...we+ar trbl challenges..." |
| 270 | FAQ answer 12 | "All we+ar TRBL products..." |
| 272 | FAQ answer 14 | "we+ar TRBL is happy to..." |
| 404-406 | Size guide | "All we+ar TRBL products..." |
| 432 | Returns option | "To a WE+AR TRBL Vendor" |

**Search for:** `WE+AR TRBL`, `we+ar trbl`, `we+ar TRBL`

---

### TAGLINE

| Line | Context | Current |
|------|---------|---------|
| 21 | Meta description | "The world's first flexible screen on a garment." |
| 91 | Mobile content | Same |
| 193 | Preloader | Same |

**Replace:** All 3 instances with your tagline

---

### MAIN SLOGAN

| Line | Context | Current |
|------|---------|---------|
| 221 | Desktop line 1 | "We'll blow " |
| 222 | Desktop line 2 | "your mind " |
| 223 | Desktop line 3 | "And more. " |
| 224 | Mobile line 1 | "I am what" |
| 225 | Mobile line 2 | "And more. " |
| 234 | About closing | "i am what i wear" |

**Replace:** All 6 instances with your slogan

---

### EMAIL ADDRESS

| Line | Context | Current |
|------|---------|---------|
| 242 | Contact info | "hello@weartrbl.com" |
| 389 | Privacy policy | "hello@weartrbl.com" |

**Search for:** `@weartrbl.com`

---

### DOMAIN NAMES

| Line | Context | Current |
|------|---------|---------|
| 349 | Customer care | "www.wear-trbl.com" |
| 443 | Returns info | "www.weartrbl.com" |

**Search for:** `weartrbl.com`, `wear-trbl.com`

---

### HASHTAG

| Line | Context | Current |
|------|---------|---------|
| 212 | Common UI | "#wearTRBL" |
| 306 | Lookbook | "Tag your images with #wearTRBL..." |

**Replace:** `#wearTRBL` with your hashtag

---

### CONTACT ADDRESS

| Line | Context | Current |
|------|---------|---------|
| 235 | Street | "30—34 Rue du 4 Septembre" |
| 236 | City | "75002 Paris" |
| 237 | Country | "france" |

**Note:** Also in legal sections (Lines 350-396) - search "Paris"

---

### STORE HOURS

| Line | Context | Current |
|------|---------|---------|
| 238 | Weekdays | "Monday — Friday: 11:00 - 18.30" |
| 239 | Saturday | "Saturday: 11.00 — 17.00" |
| 240 | Sunday | "Sunday: 12.30 — 16.30" |
| 243 | Weekend (repeat) | Same as 239-240 |

---

### PRODUCT 1: IKI DEVICE (Core Product)

| Line | Field | Current | Type |
|------|-------|---------|------|
| 466 | Object start | `{` | - |
| 467 | ID | `2286722121785` | Number |
| 468 | Title | `"IKI"` | String |
| 469 | Type | `"iki"` | String |
| 470 | Slug | `"iki"` | String |
| 471 | Price | `"100.00"` | String |
| 472 | Disabled | `false` | Boolean |
| 473 | Price with discount | `90` | Number |
| 474 | Description | `"\n  <ul>\n    <li>FLEXIBLE..."` | HTML String |
| 475-477 | Variants | `[{id: ..., title: "Default"}]` | Array |
| 478-527 | Images | Array of 6 image objects | Array |

**Description starts:** Line 474
**Description ends:** Before variants
**Full object ends:** Line 527

---

### PRODUCT 2: SWEAT BUNDLE

| Line | Field | Current | Type |
|------|-------|---------|------|
| 529 | Object start | `{` | - |
| 530 | ID | `1362777243705` | Number |
| 531 | Title | `"SWEAT"` | String |
| 532 | Type | `"iki+sweat"` | String |
| 533 | Slug | `"iki-sweat"` | String |
| 534 | Price | `"250.00"` | String |
| 535 | Disabled | `false` | Boolean |
| 536 | Price with discount | `225` | Number |
| 537 | Description | HTML with materials list | HTML String |
| 538 | Meta description | Same as description | String |
| 539-550 | Variants | S, M, L, XL | Array |
| 551-743 | Images | 24 image objects | Array |

**Sizes:** Lines 539-550 (4 sizes: S, M, L, XL)
**Full object ends:** Line 743

---

### PRODUCT 3: TEE BUNDLE

| Line | Field | Current | Type |
|------|-------|---------|------|
| 745 | Object start | `{` | - |
| 746 | ID | `1362932498489` | Number |
| 747 | Title | `"TEE"` | String |
| 748 | Type | `"iki+tee"` | String |
| 749 | Slug | `"iki-tee"` | String |
| 750 | Price | `"250.00"` | String |
| 751 | Disabled | `false` | Boolean |
| 752 | Price with discount | `225` | Number |
| 753 | Description | HTML with materials list | HTML String |
| 754 | Meta description | Same as description | String |
| 755-766 | Variants | S, M, L, XL | Array |
| 767-959 | Images | 24 image objects | Array |

**Full object ends:** Line 959

---

### FAQ QUESTIONS & ANSWERS

| Line | Question | Line | Answer |
|------|----------|------|--------|
| 244 | How many pictures? | 259 | Up to 20 pictures |
| 245 | Upload speed? | 260 | 3 to 20 seconds |
| 246 | Battery life? | 261 | 15,000 pics, 5 days |
| 247 | Weight? | 262 | 37g |
| 248 | Washing? | 263 | Remove device first |
| 249 | How screen holds? | 264 | Magnetic field |
| 250 | Weather proof? | 265 | Rain proof |
| 251 | Overheat? | 266 | No, passive display |
| 252 | Broadcast mode? | 267 | Share via TRBL app |
| 253 | Technology safe? | 268 | Yes, certified |
| 254 | Warranty? | 269 | 1 year |
| 255 | Plane travel? | 270 | Yes, safe for transport |
| 256 | Radio waves? | 271 | BLE, low energy |
| 257 | Returns? | 272 | 14 days |
| 258 | Without screen? | 273 | Yes, magnetic pocket |

**Questions:** Lines 244-258 (15 questions)
**Answers:** Lines 259-273 (15 answers)

---

### NAVIGATION MENU

| Line | Key | Label | Update? |
|------|-----|-------|---------|
| 273 | nav.home | "Home" | Keep |
| 274 | nav.about | "Who we+ar" | ✏️ Update |
| 275 | nav.faq | "Faq" | Keep |
| 276 | nav.lookbook | "Lookbook" | Keep or rename |
| 277 | nav.contacts | "Contacts" | Keep |
| 278 | nav.collection | "Masseuse " | ⚠️ Fix Cyrillic 'с' |
| 280 | nav.trblmkrs | "Trbl mkrs" | ✏️ Update or remove |
| 281 | nav.customerCare | "Customer Care" | Keep |
| 282 | nav.sitePolicy | "Site Policy" | Keep |
| 283 | nav.trblApp | "Trbl app" | ✏️ Update app name |
| 284 | nav.sizeGuide | "Size guide" | Keep |
| 285 | nav.shipping | "Shipping" | Keep |
| 286 | nav.returns | "Returns + Exchanges" | Keep |

---

### ABOUT SECTION (4 Paragraphs)

| Line | Paragraph | First Words |
|------|-----------|-------------|
| 230 | Paragraph 1 | "we+ar trbl – a new path..." |
| 231 | Paragraph 2 | "in 2015, the world witnessed..." |
| 232 | Paragraph 3 | "inspired by individuals..." |
| 233 | Paragraph 4 | "our display, iki, synced..." |
| 234 | Closing line | "i am what i wear" |

**Total:** Replace 5 values (4 paragraphs + 1 closing)

---

### CUSTOMER CARE (Legal - 20 Sections)

| Lines | Content | Notes |
|-------|---------|-------|
| 329-349 | Titles (20 headers) | Section names like "General remarks" |
| 350-368 | Content (20 long texts) | Full legal text, mentions "Parrot" extensively |

**Parent Company "Parrot":** Mentioned ~50+ times in these sections
**Action:** Find/replace "Parrot" → "Your Company" if changing

---

### SITE POLICY (Privacy - 14 Sections)

| Lines | Content | Notes |
|-------|---------|-------|
| 369-383 | Titles (14 headers) | Section names like "Privacy policy" |
| 384-396 | Content (14 long texts) | Privacy policy text |

**Parrot References:** Also extensive here
**Email in policy:** Line 389 (hello@weartrbl.com)

---

### LOOKBOOK

| Line | Field | Current |
|------|-------|---------|
| 306 | Question | "Tag your images with #wearTRBL..." |
| 307 | Answer | "Share the way your garment..." |
| 308 | Inspire | "Inspire and be inspired." |

**Update:** Line 306 with your hashtag

---

### SIZE GUIDE

| Line | Field | Current |
|------|-------|---------|
| 397 | HPS label | "HPS — High Point Shoulder" |
| 398 | Chest | "Chest" |
| 399 | Center front | "Center front length from HPS" |
| 400 | Shoulder | "Shoulder width" |
| 401 | Sleeve | "Sleeve length" |
| 402 | Unit | "unit" |
| 403-406 | Oversize note | "All we+ar TRBL products..." |

**Brand mention:** Lines 404-406

---

### SHIPPING INFO

| Line | Field | Current |
|------|-------|---------|
| 409-412 | Methods | Standard, Express, Rush, Truck |
| 417 | Timing | "Arrives in ${days} business days" |
| 418 | Standard timing | "Arrives in 2-4 weeks" |
| 422 | Standard cost | "Orders $50+: FREE, Under: $4.95" |
| 423 | Express cost | "$14.95" |
| 424 | Rush cost | "$21.95" |
| 425 | Truck cost | "Cost may vary" |
| 426-428 | Additional info | Details about free shipping |

---

### RETURNS & EXCHANGES

| Line | Field | Current |
|------|-------|---------|
| 432 | Option 1 | "To a WE+AR TRBL Vendor" |
| 433 | Option 2 | "By Postal Service" |
| 434 | Option 3 | "By Postal Collect" |
| 435 | Option 4 | "International orders" |
| 437 | Free return | "Free return" |
| 439 | Fee return | "Fees apply for return" |
| 441-444 | Details | Return policy details |

**Brand mention:** Line 432

---

### GLOBAL SETTINGS

| Line | Setting | Current | Location |
|------|---------|---------|----------|
| 189 | Locale | `"en"` | localization.locale |
| 447 | Currency | `"EUR"` | geo.currency |
| 458 | Discount % | `10` | products.discount |

---

## 🔍 SEARCH PATTERNS

Use these to find all instances:

| What to Find | Search Pattern | Expected Count |
|--------------|----------------|----------------|
| Brand name | `WE+AR TRBL` | ~5 |
| Brand (lowercase) | `we+ar trbl` | ~5 |
| Brand (mixed) | `we+ar TRBL` | ~3 |
| Email | `@weartrbl.com` | 2 |
| Domain | `weartrbl.com` | 2-3 |
| Hashtag | `#wearTRBL` | 2 |
| IKI product | `"IKI"` | 5+ |
| IKI slug | `"iki"` | 10+ |
| Parent company | `Parrot` | 50+ |
| Paris address | `Paris` | 5+ |

---

## ⚙️ CRITICAL SYNTAX RULES

### JSON Format
```javascript
// CORRECT:
"key": "value",
"number": 100,
"array": [1, 2, 3],

// WRONG:
"key": 'value',      // Single quotes ❌
"number": 100,,      // Double comma ❌
"array": [1, 2, 3,], // Trailing comma ❌
```

### HTML in Strings
```javascript
// CORRECT:
description: "<ul>\n  <li>Item</li>\n</ul>"

// WRONG:
description: "<ul>
  <li>Item</li>
</ul>"  // Actual newlines ❌
```

### Escaping Quotes
```javascript
// CORRECT:
"text": "He said \"hello\" to me"

// WRONG:
"text": "He said "hello" to me"  // Unescaped quotes ❌
```

---

## 🚨 DANGER ZONES

**DO NOT EDIT these lines unless you know JavaScript:**

| Lines | Content | Warning |
|-------|---------|---------|
| 1-169 | HTML structure | Pre-rendered React HTML |
| 170-177 | JS object setup | `window.__INITIAL_STATE__ = {` |
| 178-187 | Common settings | Viewport, app loading flags |
| 962-992 | Object closing | Cart, UI state, modal |
| 993-997 | Script tags | JS file references |

**Safe to edit:** Lines 188-961 (localization & products)

---

## 📝 EDITING CHECKLIST

Before saving changes:

- [ ] All strings use double quotes `"`
- [ ] No trailing commas after last array/object item
- [ ] HTML newlines use `\n` not actual newlines
- [ ] Quotes in content are escaped `\"`
- [ ] Product prices match discount calculations
- [ ] Image paths are correct (if changed slugs)
- [ ] No syntax errors (validate with JSON linter)

---

## 🛠️ BACKUP & RESTORE

### Before editing:
```bash
cp index.html index.html.backup_$(date +%Y%m%d_%H%M%S)
```

### To restore:
```bash
cp index.html.backup_YYYYMMDD_HHMMSS index.html
```

### To validate JSON syntax:
```bash
# Extract just the __INITIAL_STATE__ object
grep -A 900 "__INITIAL_STATE__" index.html > state.js
# Then use online validator: jsonlint.com
```

---

## 📞 QUICK HELP

### Site won't load?
1. Check browser console (F12) for errors
2. Look for "Unexpected token" or "Unexpected end of JSON"
3. Find the line number in error message
4. Check for: missing quote, extra comma, unescaped quote

### Products not showing?
1. Check lines 465-960 (product objects)
2. Verify all image paths are correct
3. Check prices are valid numbers/strings
4. Ensure variants array is not empty

### Text not updating?
1. Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
2. Clear browser cache
3. Check you edited the RIGHT section (Line 188+ not 1-169)

---

**Remember:** The content in lines 1-169 is pre-rendered HTML. The REAL content that the React app uses is in lines 170-992.

**Always edit lines 170-992, NOT 1-169!**
