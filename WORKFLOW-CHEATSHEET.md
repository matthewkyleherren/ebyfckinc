# 📝 SANITY CMS - DAILY WORKFLOW CHEATSHEET

Quick reference for updating website content.

---

## 🚀 UPDATING CONTENT (30 seconds)

```bash
# 1. Start Sanity Studio
cd sanity-studio
npm run dev
# → Opens http://localhost:3333

# 2. Edit content + Click "PUBLISH"

# 3. Generate updated files
cd ..
node generate-from-sanity.js

# 4. Apply changes
mv index-with-sanity.html index.html
mv assets/main.3a07af46-with-sanity.js assets/main.3a07af46.js

# 5. Refresh browser → Done!
```

---

## 📋 WHAT CAN YOU EDIT?

| Content | Location in Sanity |
|---------|-------------------|
| Site title, tagline, email | Site Settings |
| Navigation menu labels | Navigation Menu |
| About page text | About Section |
| FAQ questions/answers | FAQ Item (create multiple) |
| Products (title, price, sizes) | Product (create multiple) |
| Store address & hours | Site Settings → Store Address/Hours |
| Page meta tags | Site Settings |

---

## ⚠️ IMPORTANT RULES

1. ✅ Always click **"Publish"** (not just Save)
2. ✅ Run `generate-from-sanity.js` after changes
3. ✅ Replace both `index.html` AND `main.*.js`
4. ✅ Hard refresh browser (Cmd+Shift+R)

---

## 🔧 COMMON TASKS

### Change Tagline
1. Sanity Studio → Site Settings
2. Edit "Tagline / Value Proposition"
3. Publish
4. Run script
5. Replace files

### Add FAQ
1. Sanity Studio → Create → FAQ Item
2. Fill question + answer
3. Set order (1, 2, 3...)
4. Publish
5. Run script

### Update Navigation
1. Sanity Studio → Navigation Menu
2. Edit menu items labels
3. Publish
4. Run script (updates both HTML and JS!)

### Change Contact Email
1. Sanity Studio → Site Settings
2. Edit "Contact Email"
3. Publish
4. Run script

---

## 🆘 QUICK TROUBLESHOOTING

**Content not showing?**
→ Did you click Publish? (not Save)
→ Did you run the script?
→ Did you replace both files?
→ Did you hard refresh? (Cmd+Shift+R)

**Script errors?**
→ Are you in the right directory?
→ Is Node.js 18+ installed?

**Studio won't start?**
→ Kill port: `lsof -ti:3333 | xargs kill`
→ Restart: `cd sanity-studio && npm run dev`

---

## 📂 KEY FILES

- **Script:** `generate-from-sanity.js`
- **HTML:** `index.html` (replaced after generation)
- **JS:** `assets/main.3a07af46.js` (replaced after generation)
- **Backups:** `index-backup-*.html` (auto-created)
- **Full Guide:** `COMPLETE-CMS-GUIDE.md`

---

## 🎯 SCRIPT OUTPUT

When successful, you'll see:
```
✅ SUCCESS - 11 replacements made

🚀 To apply changes:
   mv index-with-sanity.html index.html
   mv assets/main.3a07af46-with-sanity.js assets/main.3a07af46.js
```

Just copy-paste those commands!

---

**Sanity Studio:** http://localhost:3333
**Project ID:** duqxb9hm
**Dataset:** production
