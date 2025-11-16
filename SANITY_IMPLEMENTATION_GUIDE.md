# SANITY CMS IMPLEMENTATION GUIDE
## Step-by-Step Instructions

This guide walks you through implementing Sanity.io CMS for your Elite. website.

---

## 📋 PREREQUISITES

- [ ] Node.js 18+ installed
- [ ] npm or yarn package manager
- [ ] Sanity.io account (create free at https://www.sanity.io)
- [ ] Basic command line knowledge
- [ ] Text editor

**Time Estimate:** 2-3 hours for complete setup

---

## PART 1: SANITY STUDIO SETUP (1 hour)

### Step 1: Create Sanity Account

1. Go to https://www.sanity.io
2. Click "Get started for free"
3. Sign up with:
   - GitHub account (recommended), OR
   - Google account, OR
   - Email/password

### Step 2: Install Sanity CLI

```bash
npm install -g @sanity/cli
```

Verify installation:
```bash
sanity --version
```

### Step 3: Login to Sanity

```bash
sanity login
```

Browser will open for authentication. Log in and return to terminal.

### Step 4: Create New Sanity Project

Navigate to your studio directory:

```bash
cd /Users/m/Downloads/wear1/wear-trbl.snpdev.ru/sanity-studio
```

Initialize the project:

```bash
sanity init
```

Answer the prompts:
- **Create new project?** Yes
- **Project name:** Elite CMS
- **Use default dataset configuration?** Yes
- **Project output path:** . (current directory)
- **Select project template:** Clean project with no predefined schemas

**IMPORTANT:** Copy the Project ID shown. You'll need it!

Example output:
```
✔ Creating project
✔ Bootstrapping dataset
✔ Your project is ready!

Your project ID is: abc123xyz
```

### Step 5: Update Configuration Files

#### 5a. Update `sanity-studio/sanity.config.js`

Replace line 9:
```javascript
projectId: 'abc123xyz',  // ← Replace with YOUR project ID
```

#### 5b. Update `assets/sanity-loader.js`

Replace line 22:
```javascript
projectId: 'abc123xyz',  // ← Replace with YOUR project ID
```

### Step 6: Install Dependencies

```bash
npm install
```

This installs:
- Sanity core
- Vision tool (GROQ query tester)
- Media plugin (enhanced image management)

### Step 7: Start Studio Locally

```bash
npm run dev
```

Studio opens at: http://localhost:3333

You should see:
- Site Settings
- About Section
- Navigation Menu
- Products
- FAQ
- Lookbook Gallery

**Troubleshooting:**
- Port 3333 already in use? Kill other process or change port
- Module errors? Run `npm install` again
- Login errors? Run `sanity login` again

### Step 8: Deploy Studio to Sanity Cloud

```bash
npm run deploy
```

Choose a studio hostname (e.g., `elite-cms`).

Your studio will be live at:
```
https://elite-cms.sanity.studio
```

**✅ Checkpoint:** You should now have a working Sanity Studio!

---

## PART 2: CONTENT MIGRATION (1-2 hours)

### Step 9: Add Site Settings

1. Open Studio (local or cloud)
2. Click **Site Settings**
3. Fill in:

```
Brand Name: Elite.
Brand Name (Lowercase): elite.
Tagline: Massages that will blow your mind. And more.

Slogan:
  Line 1: [Your line 1]
  Line 2: [Your line 2]
  Line 3: [Your line 3]

Hashtag: #EliteMassage
Contact Email: your@email.com
Website: https://yourdomain.com

Default Currency: EUR
Discount Rate: 10

Lookbook Call-to-Action:
Tag your images with #EliteMassage to be featured in our gallery.
```

4. Click **Publish**

### Step 10: Add Products

For each product (Device, Sweatshirt, T-Shirt):

1. Click **Products** → **Create new Product**
2. Fill in details:

**Example for Device:**
```
Name: Elite Massager
Slug: elite-massager
Category: Device
Price: 100.00
Currency: EUR
Discount Price: 90.00

Description: [Rich text - copy from NEW_CONTENT_TEMPLATE.md]

Features:
  - FLEXIBLE DESIGN
  - 5 MASSAGE MODES
  - etc.

Technical Specs:
  Weight: 150g
  Battery Life: 3 hours
  Charging Time: 2 hours

Sizes: [Leave empty for devices]
Colors: Black, White

In Stock: ✓
Display Order: 1
```

3. Upload product images:
   - Click **Add Image**
   - Upload from `/assets/` folder
   - Add alt text for each image
   - Sanity will host images on their CDN

4. Click **Publish**

**Repeat for all 3 products.**

### Step 11: Add FAQ Items

1. Click **FAQ** → **Create new FAQ Item**
2. For each FAQ (15 total):

```
Question: How many pictures can be uploaded?
Answer: Up to 20 pictures (rich text)
Category: Technical
Order: 1
Featured: [✓ for top 5 FAQs]
```

3. Click **Publish**

**Pro tip:** Use the "Duplicate" feature to speed this up.

### Step 12: Add About Section

1. Click **About Section**
2. Fill in all 4 paragraphs:

```
Title: About Elite.

Paragraph 1: [Brand introduction - from NEW_CONTENT_TEMPLATE.md]
Paragraph 2: [Origin story]
Paragraph 3: [Innovation & technology]
Paragraph 4: [Vision & impact]
```

3. Optional: Upload hero image
4. Click **Publish**

### Step 13: Add Navigation Menu

1. Click **Navigation Menu**
2. Add menu items:

```
Menu Title: Main Navigation

Menu Items:
  1. Label: Products    URL: /products    Order: 1
  2. Label: About       URL: /about       Order: 2
  3. Label: Lookbook    URL: /lookbook    Order: 3
  4. Label: FAQ         URL: /faq         Order: 4
  5. Label: Contact     URL: /contact     Order: 5
```

3. Click **Publish**

### Step 14: Add Lookbook Images

1. Click **Lookbook Gallery** → **Create new Lookbook Image**
2. For each image:

```
Title: Lookbook Image 1
Full-Size Image: [Upload from /assets/]
  Alt Text: Person wearing Elite massager
  Caption: [Optional]
  Photo Credit: [Optional]

Tags: lifestyle, product, outdoor
Display Order: 1
Featured: [✓ for hero images]
```

3. Click **Publish**

**Batch Upload:**
- Upload all images first to Media Library
- Then create Lookbook documents and select from library

**✅ Checkpoint:** All content should now be in Sanity!

---

## PART 3: FRONTEND INTEGRATION (30 minutes)

### Step 15: Verify Files Are in Place

Check these files exist:

```bash
ls -la /Users/m/Downloads/wear1/wear-trbl.snpdev.ru/assets/sanity-loader.js
ls -la /Users/m/Downloads/wear1/wear-trbl.snpdev.ru/index.html
```

Both should show recent modification dates.

### Step 16: Configure CORS (Optional)

If testing from `file://` protocol or different domain:

```bash
cd sanity-studio
sanity cors add http://localhost:8000 --credentials
sanity cors add file:// --credentials
```

For production:
```bash
sanity cors add https://yourdomain.com --credentials
```

### Step 17: Test Locally

#### Option A: Python HTTP Server (Recommended)

```bash
cd /Users/m/Downloads/wear1/wear-trbl.snpdev.ru
python3 -m http.server 8000
```

Open: http://localhost:8000

#### Option B: Open File Directly

```bash
open /Users/m/Downloads/wear1/wear-trbl.snpdev.ru/index.html
```

**Note:** `file://` may have CORS restrictions.

### Step 18: Verify Content Loading

1. Open browser DevTools (Cmd+Option+I)
2. Go to **Console** tab
3. You should see:

```
[Sanity Loader] Importing Sanity client from CDN...
[Sanity Loader] ✅ Sanity client initialized
[Sanity Loader] 🔄 Fetching content from Sanity...
[Sanity Loader] ✅ Content fetched successfully {products: 3, faqs: 15, lookbookImages: 110}
[Sanity Loader] 🔄 Mapping Sanity content to initial state...
[Sanity Loader] ✅ Site settings mapped to localization
[Sanity Loader] ✅ Mapped 3 products
[Sanity Loader] ✅ Mapped 15 FAQ items
[Sanity Loader] ✅ About section mapped
[Sanity Loader] ✅ Mapped 110 lookbook images
[Sanity Loader] ✅ All content successfully mapped to __INITIAL_STATE__
```

**If you see errors:**
- Check project ID in both config files matches
- Check CORS settings
- Verify content is published in Studio

### Step 19: Visual Verification

Check the site:
- [ ] Homepage shows new brand name "Elite."
- [ ] Tagline displays correctly
- [ ] Products page shows all 3 products
- [ ] Product images load from Sanity CDN
- [ ] FAQ section has all questions
- [ ] About section shows 4 paragraphs
- [ ] Lookbook gallery displays images

### Step 20: Test Content Updates

1. Go to Sanity Studio
2. Edit **Site Settings**
3. Change tagline to: "Test Update"
4. Click **Publish**
5. Refresh your site
6. Tagline should update to "Test Update"
7. Change it back and publish

**✅ Checkpoint:** CMS is live and working!

---

## PART 4: PRODUCTION DEPLOYMENT (15 minutes)

### Step 21: Turn Off Debug Mode

Edit `/assets/sanity-loader.js`, line 26:

```javascript
debug: false    // Set to false for production
```

### Step 22: Optimize Sanity CDN

Images are automatically served from Sanity CDN with these optimizations:
- WebP format (smaller files)
- Automatic resizing
- Edge caching
- Lazy loading compatible

No additional configuration needed.

### Step 23: Deploy Site

Upload these files to your web server:

```
index.html (modified)
/assets/sanity-loader.js (new)
/assets/ (all other existing files)
```

**For static hosting (Netlify, Vercel, GitHub Pages):**

```bash
# Example: Deploy to Netlify
npm install -g netlify-cli
netlify deploy --dir=/Users/m/Downloads/wear1/wear-trbl.snpdev.ru --prod
```

### Step 24: Test Production Site

1. Visit your live URL
2. Open DevTools Console
3. Should NOT see debug logs (debug: false)
4. Should see: "sanity-content-loaded" event fired
5. Content should display correctly

### Step 25: Share Studio Access

Add team members to Sanity project:

```bash
cd sanity-studio
sanity users invite user@example.com
```

Choose role:
- **Administrator** - Full access
- **Editor** - Can edit/publish content
- **Viewer** - Read-only access

They can access: https://elite-cms.sanity.studio

**✅ Complete! Your CMS is fully deployed.**

---

## TESTING CHECKLIST

Use this checklist to verify everything works:

### Content Management
- [ ] Can create new products in Studio
- [ ] Can edit existing content
- [ ] Can upload images to Media Library
- [ ] Can publish/unpublish content
- [ ] Can reorder FAQ items
- [ ] Can update site settings

### Frontend Display
- [ ] Homepage loads correctly
- [ ] Products display with images
- [ ] FAQ section works
- [ ] About section shows correct text
- [ ] Lookbook gallery loads all images
- [ ] Images load from Sanity CDN
- [ ] Mobile responsive works

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Images load progressively
- [ ] No console errors
- [ ] CORS headers correct
- [ ] CDN caching works

### Edge Cases
- [ ] Site works if Sanity is down (fallback to embedded content)
- [ ] Missing images handled gracefully
- [ ] Empty content fields don't break layout
- [ ] Special characters in text render correctly

---

## TROUBLESHOOTING

### "Project ID not found"
- **Fix:** Double-check project ID in both config files
- Run: `sanity projects list` to see your projects

### "CORS error"
- **Fix:** Add your domain to CORS:
  ```bash
  sanity cors add https://yourdomain.com --credentials
  ```

### Images not loading
- **Check:** Images published in Studio?
- **Check:** Asset URLs in Network tab (DevTools)
- **Check:** CDN URLs start with `https://cdn.sanity.io`

### Content not updating
- **Check:** Content is **published** (not just saved)
- **Check:** Browser cache cleared (Cmd+Shift+R)
- **Check:** `useCdn: true` in loader config

### Studio won't deploy
- **Check:** Logged in? Run `sanity login`
- **Check:** Project ID correct in `sanity.config.js`?
- **Try:** `npm run build` first, then `npm run deploy`

### Site crashes after loading Sanity content
- **Check:** Browser console for JS errors
- **Check:** `window.__INITIAL_STATE__` structure matches expected format
- **Try:** Set `debug: true` in loader to see detailed logs

### Performance issues
- **Optimize:** Use image transformations (width, quality)
- **Check:** Not loading too many large images at once
- **Enable:** CDN caching (`useCdn: true`)
- **Consider:** Lazy loading images

---

## MAINTENANCE

### Weekly Tasks
- [ ] Review and publish user-submitted content
- [ ] Check Sanity Studio for pending drafts
- [ ] Test live site for broken links/images

### Monthly Tasks
- [ ] Review Sanity usage (free tier limits)
- [ ] Backup content (Sanity has automatic backups)
- [ ] Update product prices/availability
- [ ] Add new lookbook images

### As Needed
- [ ] Update Studio dependencies: `npm update`
- [ ] Add new team members
- [ ] Modify schemas for new content types

---

## NEXT STEPS

### Phase 1 (Current): Runtime Injection
✅ Use Sanity loader script
✅ Modify content via CMS
✅ Keep existing React bundles

### Phase 2 (Months 2-3): Plan Rebuild
- [ ] Choose framework (Next.js, Nuxt, Astro)
- [ ] Design new site architecture
- [ ] Plan Sanity integration strategy
- [ ] Set up staging environment

### Phase 3 (Month 3-4): Build New Site
- [ ] Develop new frontend from scratch
- [ ] Integrate Sanity directly (no loader script)
- [ ] Implement SSR/SSG for SEO
- [ ] Test extensively

### Phase 4 (Month 4): Launch & Migrate
- [ ] Deploy new site
- [ ] Content automatically migrates (already in Sanity!)
- [ ] Retire old minified site
- [ ] Decommission sanity-loader.js

**The schemas you created today will be reused in the new site!**

---

## RESOURCES

### Documentation
- Sanity Docs: https://www.sanity.io/docs
- GROQ Queries: https://www.sanity.io/docs/groq
- JavaScript Client: https://github.com/sanity-io/client
- Schema Types: https://www.sanity.io/docs/schema-types

### Learning
- Sanity Learn: https://www.sanity.io/learn
- YouTube Channel: https://www.youtube.com/c/SanityCMS
- Free Courses: https://www.sanity.io/learn

### Community
- Slack: https://slack.sanity.io
- GitHub: https://github.com/sanity-io
- Forum: https://www.sanity.io/forum

### Support
- Help Center: https://www.sanity.io/help
- Status Page: https://status.sanity.io
- Email: support@sanity.io

---

## SUCCESS CRITERIA

You've successfully implemented Sanity CMS when:

✅ **Studio is deployed** and accessible online
✅ **All content is migrated** (settings, products, FAQ, about, lookbook)
✅ **Frontend displays Sanity content** correctly
✅ **Content updates in real-time** when published in Studio
✅ **Images load from Sanity CDN** with proper transformations
✅ **Team members can access Studio** and edit content
✅ **Site has graceful fallback** if Sanity is down
✅ **Performance is acceptable** (< 3 second page load)

---

**Congratulations! You now have a fully functional CMS without rebuilding your site.**

Questions? Check the troubleshooting section or reach out to the Sanity community.

---

*Last Updated: 2025-11-16*
*Guide Version: 1.0*
