# SANITY CMS - QUICK START GUIDE

**For daily content updates**

---

## 🚀 UPDATE CONTENT (3 Steps)

### 1️⃣ Edit in Sanity Studio

```bash
cd sanity-studio
npm run dev
```

Opens: http://localhost:3333

- Edit your content
- Click **"Publish"** (blue button)

### 2️⃣ Regenerate HTML

```bash
cd /Users/m/Downloads/wear1/wear-trbl.snpdev.ru
node generate-html-from-sanity.js
```

Takes 2-3 seconds.

### 3️⃣ Replace Live File

```bash
mv index.html index-backup.html
mv index-with-sanity.html index.html
```

Done! ✅ Refresh website to see changes.

---

## 📝 WHAT YOU CAN EDIT

### Site Settings
- Tagline (top header text)
- Brand hashtag
- Contact email
- Loading screen text
- Lookbook call to action

### About Section
- 4 paragraphs of rich text
- Brand story
- Mission statement

### Store Information
- Street address
- City & postal code
- Country
- Opening hours (weekday, Saturday, Sunday)

### FAQ (when created)
- Up to 15 questions & answers
- Categories
- Order/priority

### Products (when created)
- Product name & description
- Price & currency
- Images & specs
- Sizes & colors

### Navigation (when created)
- Menu item labels
- Links
- Order

---

## ⚠️ IMPORTANT NOTES

### Always Publish!
Don't just click "Save" - click **"Publish"** (blue button) in Sanity Studio.

### Keep Backups
The script automatically keeps `index.html` as backup before replacing.

### Test First
Before going live, open: http://localhost:8000/index-with-sanity.html

### Regenerate After Every Update
Content changes in Sanity won't appear until you run the generation script.

---

## 🆘 TROUBLESHOOTING

### "Content not updating"
Did you click **Publish** in Sanity? (not just Save)

### "Script fails"
Are you in the right directory?
```bash
cd /Users/m/Downloads/wear1/wear-trbl.snpdev.ru
```

### "Old content showing"
Did you replace index.html?
```bash
mv index-with-sanity.html index.html
```

### "Sanity Studio won't start"
```bash
cd sanity-studio
npm install
npm run dev
```

---

## 📞 SERVERS

### Sanity Studio (CMS)
```bash
cd sanity-studio
npm run dev
```
Opens: http://localhost:3333

### Website (Testing)
```bash
cd /Users/m/Downloads/wear1/wear-trbl.snpdev.ru
python3 -m http.server 8000
```
Opens: http://localhost:8000

---

## 🎯 ONE-LINE UPDATE

For quick updates:

```bash
cd /Users/m/Downloads/wear1/wear-trbl.snpdev.ru && node generate-html-from-sanity.js && mv index.html index-backup-$(date +%Y%m%d-%H%M%S).html && mv index-with-sanity.html index.html
```

This does everything:
1. Generates HTML from Sanity
2. Backs up current HTML (with timestamp)
3. Replaces with new version

---

## 📚 FULL DOCUMENTATION

- **Complete Solution:** `SANITY_FINAL_SOLUTION.md`
- **Status & Next Steps:** `SANITY_STATUS_AND_NEXT_STEPS.md`
- **Architecture Plan:** `SANITY_CMS_INTEGRATION_PLAN.md`
- **Setup Guide:** `SANITY_IMPLEMENTATION_GUIDE.md`

---

**That's it! Content management is now as easy as 1-2-3.**
