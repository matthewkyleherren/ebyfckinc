# 🚀 START HERE - Complete Rebrand Guide

**Welcome!** This guide will walk you through replacing all content in your WE+AR TRBL website.

**Deadline:** Tomorrow
**Estimated Time:** 8-10 hours
**Difficulty:** Moderate (requires careful editing)

---

## 📚 DOCUMENTATION YOU HAVE

I've created 6 comprehensive documents for you:

### 1. **START_HERE.md** (This File)
Your quick-start guide and overview

### 2. **CONTENT_REPLACEMENT_PLAN.md** ⭐ MAIN PLAN
Complete timeline and detailed instructions for tomorrow
- Hour-by-hour schedule
- Every line number to edit
- Step-by-step workflow
- Warning about common mistakes

### 3. **NEW_CONTENT_TEMPLATE.md** ✏️ FILL THIS IN
Template for all your new content
- Brand name, tagline, slogan
- Contact info
- Product descriptions
- FAQ answers
- About section

### 4. **QUICK_REFERENCE.md** 🔍 LOOKUP GUIDE
Fast lookup of line numbers
- All brand mentions with exact lines
- Product sections
- FAQ locations
- Search patterns

### 5. **IMAGE_INVENTORY.md** 📸 MEDIA ASSETS
Complete catalog of all 212 images
- What you have
- What's missing (none now!)
- Image specifications
- Replacement requirements

### 6. **DOWNLOAD_MISSING_FILES.sh** ✅ COMPLETE
All images are now downloaded (no longer needed)

---

## ⚡ QUICK START (5 Steps)

### Step 1: Fill in Your Content (1-2 hours)
Open `NEW_CONTENT_TEMPLATE.md` and fill in all the `[FILL IN]` sections with your new brand information.

**Save as:** `NEW_CONTENT_FILLED.md`

### Step 2: Backup Everything (2 minutes)
```bash
cd /Users/m/Downloads/wear1/wear-trbl.snpdev.ru
cp index.html index.html.ORIGINAL
cp manifest.json manifest.json.ORIGINAL
```

### Step 3: Start Editing (6-8 hours)
Follow the timeline in `CONTENT_REPLACEMENT_PLAN.md`:
- **Morning:** Brand name, tagline, about section, FAQ
- **Afternoon:** Product descriptions and prices
- **Evening:** Testing and verification

Use `QUICK_REFERENCE.md` to quickly find line numbers.

### Step 4: Test Your Changes (1 hour)
Open `index.html` in a browser and verify:
- All pages load correctly
- Products display properly
- No JavaScript errors (F12 console)
- Navigation works
- Mobile responsive

### Step 5: Final Verification (30 minutes)
Search for old content:
```bash
grep -n "WE+AR TRBL" index.html
grep -n "weartrbl.com" index.html
grep -n "IKI" index.html
grep -n "Parrot" index.html
```

All searches should return 0 results (or only in comments).

---

## 🎯 WHAT NEEDS TO BE CHANGED

### Critical (Must Do Tomorrow):
1. ✅ **Brand Name** - 15 instances
2. ✅ **Tagline** - 3 instances
3. ✅ **Email** - 2 instances
4. ✅ **Product Names** - 3 products
5. ✅ **Product Prices** - 3 products
6. ✅ **Product Descriptions** - 3 products
7. ✅ **About Section** - 4 paragraphs
8. ✅ **FAQ Answers** - 15 Q&As
9. ✅ **Contact Info** - Address, hours

### Optional (Can Do Later):
10. ⭕ **Legal Text** - Customer Care, Privacy Policy
11. ⭕ **Images** - 212 files (can use existing temporarily)
12. ⭕ **Videos** - 12 files

---

## 📂 FILE STRUCTURE

```
wear-trbl.snpdev.ru/
├── index.html ⭐ MAIN FILE (997 lines)
│   └── Lines 170-992 = All content
├── manifest.json (update brand name)
├── assets/
│   ├── 212 image files ✅ Complete
│   ├── 12 video files
│   ├── main.js (probably don't need to edit)
│   └── main.css (probably don't need to edit)
│
└── Documentation/
    ├── START_HERE.md ← You are here
    ├── CONTENT_REPLACEMENT_PLAN.md
    ├── NEW_CONTENT_TEMPLATE.md
    ├── QUICK_REFERENCE.md
    ├── IMAGE_INVENTORY.md
    └── DOWNLOAD_MISSING_FILES.sh
```

---

## ⏰ TOMORROW'S TIMELINE

Based on an 8-hour workday:

### ☀️ Morning (9am - 12pm) - 3 hours
- **9:00 - 9:30** Brand identity (name, email, hashtag)
- **9:30 - 10:30** Core content (tagline, about section)
- **10:30 - 11:30** Products (names, navigation)
- **11:30 - 12:00** FAQ (technical specs)

**Goal:** All text content updated

### 🌤️ Afternoon (1pm - 4pm) - 3 hours
- **1:00 - 2:30** Product catalog (prices, descriptions)
- **2:30 - 3:30** Product HTML descriptions
- **3:30 - 4:00** Legal text (if needed)

**Goal:** All products ready

### 🌙 Evening (4pm - 7pm) - 3 hours
- **4:00 - 4:30** Update manifest.json
- **4:30 - 5:30** Testing & bug fixes
- **5:30 - 6:30** Final verification
- **6:30 - 7:00** Prepare image replacement plan

**Goal:** Site ready to deploy

**Total:** 9 hours (with buffer time)

---

## 🎨 THE ONE MAIN FILE

**Everything is in `index.html`**

This is a React single-page application where ALL content is embedded in a JavaScript object:

```javascript
window.__INITIAL_STATE__ = {
  localization: {
    locale: "en",
    messages: {
      // 254 text strings here (Lines 191-444)
      "app.locale": "en",
      "home.title": "I am what i wear",
      // ... etc
    }
  },
  products: {
    list: [
      // 3 products here (Lines 465-960)
      { id: 1, title: "IKI", price: "100.00", ... },
      { id: 2, title: "SWEAT", price: "250.00", ... },
      { id: 3, title: "TEE", price: "250.00", ... }
    ]
  }
}
```

**Key Sections:**
- Lines 1-169: Pre-rendered HTML (DON'T EDIT)
- **Lines 170-992: All editable content (EDIT HERE)** ⭐
- Lines 993-997: Script tags (DON'T EDIT)

---

## ⚠️ CRITICAL RULES

### 1. Always Backup First
```bash
cp index.html index.html.backup_$(date +%Y%m%d_%H%M%S)
```

### 2. Edit Lines 170-992 ONLY
The content in lines 1-169 is pre-rendered React HTML that gets replaced when the app loads. The REAL content is in the JavaScript object (lines 170-992).

### 3. Maintain JSON Syntax
This is JavaScript, not plain text. Rules:
- ✅ Use double quotes: `"text"`
- ✅ Escape quotes in content: `He said \"hello\"`
- ✅ Use `\n` for line breaks in strings
- ✅ Use `<br>` for HTML line breaks
- ❌ No trailing commas: `[1, 2, 3,]` is WRONG
- ❌ No unescaped quotes: `"He said "hi""` is WRONG

### 4. One Syntax Error = Broken Site
If you make ONE syntax mistake, the entire site won't load.

**Always validate after editing:**
- Check browser console (F12)
- Look for JavaScript errors
- Use online JSON validator if needed

### 5. Test Frequently
Don't edit for 3 hours then test. Edit a section, save, refresh browser, verify it works.

---

## 🛠️ TOOLS YOU'LL NEED

### Code Editor (Pick One):
- **VS Code** (recommended) - Free, syntax highlighting
- **Sublime Text** - Fast, lightweight
- **Atom** - Open source
- **Notepad++** (Windows) - Simple but works
- **TextEdit** (Mac) - Set to plain text mode

**Don't use:** Microsoft Word, Google Docs, regular Notepad

### Browser:
- Chrome or Firefox (with DevTools for debugging)

### Command Line (Optional):
- For backup scripts
- For search/replace
- For validation

---

## 📝 EDITING WORKFLOW

### Best Practice: Section-by-Section

```
1. Open index.html in code editor
2. Find section to edit (use QUICK_REFERENCE.md)
3. Make changes
4. Save file
5. Open/refresh index.html in browser
6. Check if it works
7. If broken, check browser console (F12)
8. If works, move to next section
9. Repeat
```

### Don't Do This:
```
❌ Edit entire file at once
❌ Skip testing until the end
❌ Edit without backup
❌ Make changes in multiple sections simultaneously
```

---

## 🔍 FINDING & REPLACING

### Safe Search/Replace (Brand Name Example):

**Option 1: Code Editor Find/Replace**
```
Find:    "WE+AR TRBL"
Replace: "YOUR BRAND"
Scope:   Lines 170-992 only
```

**Option 2: Command Line (Advanced)**
```bash
# Backup first!
cp index.html index.html.backup

# Replace (Mac/Linux)
sed -i.bak 's/WE+AR TRBL/YOUR BRAND/g' index.html

# Check it worked
grep -n "YOUR BRAND" index.html
```

### What to Search/Replace:

1. Brand name: `WE+AR TRBL` → Your brand
2. Email: `hello@weartrbl.com` → Your email
3. Domain: `weartrbl.com` → Your domain
4. Hashtag: `#wearTRBL` → Your hashtag
5. Product: `"IKI"` → Your device name (be careful with quotes!)

**Note:** For "IKI" and product names, be careful because these appear in multiple contexts (title, slug, description). You may want to do these manually.

---

## 🧪 TESTING CHECKLIST

After making changes, test:

### ✅ Visual Tests (in Browser):
- [ ] Homepage loads
- [ ] Brand name appears correctly
- [ ] Tagline displays
- [ ] About section shows new text
- [ ] Products page works
- [ ] All 3 products display
- [ ] Product descriptions load
- [ ] Prices are correct
- [ ] FAQ page works
- [ ] All FAQ answers updated
- [ ] Contact info correct
- [ ] Navigation menu works
- [ ] Mobile responsive (resize browser)

### ✅ Technical Tests:
- [ ] No JavaScript errors (F12 console)
- [ ] All images load (check for broken images)
- [ ] Click through all pages
- [ ] Try adding product to cart
- [ ] Size selection works
- [ ] No 404 errors on images

### ✅ Content Verification:
- [ ] Search for "WE+AR TRBL" (should find 0)
- [ ] Search for "weartrbl.com" (should find 0)
- [ ] Search for "IKI" (should find 0 or only in comments)
- [ ] Search for "Parrot" (should find 0 or only if keeping)
- [ ] Check all prices updated
- [ ] Verify new brand name everywhere

---

## 🚨 TROUBLESHOOTING

### Problem: Blank white page
**Cause:** JavaScript syntax error
**Fix:**
1. Open browser console (F12)
2. Look for error message with line number
3. Go to that line in index.html
4. Look for: missing quote, extra comma, unescaped quote
5. Fix and refresh

### Problem: Products not showing
**Cause:** Error in product objects (lines 465-960)
**Fix:**
1. Check product price format: `"100.00"` (string with quotes)
2. Check images array is valid
3. Check all commas are in place
4. Verify variants array exists

### Problem: Text not updating
**Cause:** Editing wrong section OR browser cache
**Fix:**
1. Make sure you edited lines 170-992, NOT lines 1-169
2. Hard refresh: Ctrl+Shift+R (PC) or Cmd+Shift+R (Mac)
3. Clear browser cache
4. Try different browser

### Problem: Images broken
**Cause:** Wrong image paths
**Fix:**
1. Verify all 212 images are in `/assets` folder
2. Check image paths in product objects
3. Make sure no typos in filenames
4. Verify hashes in filenames match actual files

### Problem: Can't undo changes
**Cause:** No backup
**Fix:**
1. If you made backup: `cp index.html.ORIGINAL index.html`
2. If no backup: Download original site again
3. **PREVENTION:** Always backup first!

---

## 📊 PROGRESS TRACKER

Use this to track your work tomorrow:

### Morning Session:
- [ ] Backup files created
- [ ] NEW_CONTENT_TEMPLATE filled in
- [ ] Brand name replaced (15 instances)
- [ ] Email updated (2 instances)
- [ ] Tagline updated (3 instances)
- [ ] Slogan updated (6 instances)
- [ ] Hashtag updated (2 instances)
- [ ] About section rewritten (4 paragraphs)
- [ ] Contact info updated
- [ ] Navigation updated
- [ ] Tested - all working

### Afternoon Session:
- [ ] Product 1 name updated
- [ ] Product 1 price updated
- [ ] Product 1 description written
- [ ] Product 2 price updated
- [ ] Product 2 description written
- [ ] Product 3 price updated
- [ ] Product 3 description written
- [ ] All FAQ answers reviewed
- [ ] Technical specs updated
- [ ] Tested - products showing

### Evening Session:
- [ ] manifest.json updated
- [ ] Legal text reviewed
- [ ] All old content searched and replaced
- [ ] Full site testing completed
- [ ] Mobile testing completed
- [ ] No JavaScript errors
- [ ] All images loading
- [ ] Ready to deploy

---

## 🎓 LEARNING RESOURCES

### If You Get Stuck:

**JSON Syntax:**
- JSON validator: https://jsonlint.com
- JSON tutorial: https://www.w3schools.com/js/js_json_syntax.asp

**HTML in JavaScript:**
- Escaping quotes: Use `\"` inside strings
- Line breaks: Use `\n` or `<br>` tags

**JavaScript Objects:**
- MDN Guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

**Browser DevTools:**
- Chrome DevTools: F12 or Ctrl+Shift+I (PC) / Cmd+Option+I (Mac)
- Look for red errors in Console tab

---

## 💡 TIPS FOR SUCCESS

### Do's:
✅ Read CONTENT_REPLACEMENT_PLAN.md fully before starting
✅ Fill in NEW_CONTENT_TEMPLATE.md completely first
✅ Make backups before any editing
✅ Test after each section
✅ Use QUICK_REFERENCE.md for line numbers
✅ Take breaks every hour
✅ Save frequently (Ctrl+S / Cmd+S)
✅ Keep browser DevTools open while testing

### Don'ts:
❌ Edit without backup
❌ Make all changes before testing
❌ Edit lines 1-169 (pre-rendered HTML)
❌ Use smart quotes or curly quotes
❌ Add trailing commas
❌ Forget to escape quotes in content
❌ Edit JavaScript unless you know what you're doing
❌ Skip the testing checklist

---

## 🎯 FINAL CHECKLIST

Before considering the job done:

- [ ] All brand mentions updated
- [ ] All contact info updated
- [ ] All products updated with new names/prices/descriptions
- [ ] About section rewritten
- [ ] FAQ answers relevant to your product
- [ ] No "WE+AR TRBL" found in search
- [ ] No "weartrbl.com" found in search
- [ ] No "IKI" found (or only in acceptable places)
- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] Products display correctly
- [ ] Images all loading
- [ ] Mobile responsive working
- [ ] Ready for image replacement (next phase)

---

## 📞 NEXT STEPS AFTER TOMORROW

Once text content is complete:

### Phase 2: Image Replacement (Future)
- Replace 86 product images
- Replace 8 favicons
- Optional: Replace 65 lookbook images
- Optional: Replace 18 model images
- Optional: Replace 12 videos

See `IMAGE_INVENTORY.md` for complete specifications.

### Phase 3: Deployment
- Choose hosting (Netlify, Vercel, AWS, etc.)
- Upload files
- Configure domain
- Test live site
- Launch!

---

## 🆘 EMERGENCY CONTACTS

If something goes terribly wrong:

1. **Restore from backup:**
   ```bash
   cp index.html.ORIGINAL index.html
   ```

2. **Start over from scratch:**
   Download the original site again

3. **Ask for help:**
   Bring the error message from browser console (F12)
   Note which line number the error mentions
   Describe what you were editing when it broke

---

## 🎉 YOU'VE GOT THIS!

**Remember:**
- You have all 212 images ✅
- You have complete documentation ✅
- You have clear line numbers for every edit ✅
- You have a step-by-step plan ✅
- You have backup scripts ✅

**The work is:**
1. Fill in the content template (1-2 hours)
2. Edit the file carefully (6-8 hours)
3. Test thoroughly (1 hour)

**Total:** 8-10 hours of focused work

You can do this in one day! 💪

---

## 📚 READ NEXT

1. **First:** Fill in `NEW_CONTENT_TEMPLATE.md`
2. **Then:** Follow `CONTENT_REPLACEMENT_PLAN.md` step-by-step
3. **Reference:** Use `QUICK_REFERENCE.md` for line numbers
4. **Later:** Consult `IMAGE_INVENTORY.md` for image replacement

**Good luck with your rebrand! 🚀**
