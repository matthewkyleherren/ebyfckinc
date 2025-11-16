# PRODUCT CREATION GUIDE

Quick step-by-step guide to adding products in Sanity Studio.

---

## =€ QUICK START

### 1. Open Sanity Studio

```bash
cd sanity-studio
npm run dev
```

Opens at: **http://localhost:3333**

### 2. Create New Product

1. Click **"Products"** in the left sidebar
2. Click **"Create"** button (top right)
3. Fill in the form (see below)
4. Click **"Publish"** (blue button, top right)

---

## =Ý PRODUCT FIELDS

### Required Fields P

**Product Name**
- Example: `IKI`, `Elite Sweatshirt`, `Elite T-Shirt`
- This displays on the website

**Slug**
- Auto-generates from name
- Click "Generate" button next to slug field
- Example: `iki`, `elite-sweatshirt`

**Category**
- Choose one:
  -  **Device** (for electronic products like IKI)
  -  **Sweatshirt Bundle** (clothing + device)
  -  **T-Shirt Bundle** (clothing + device)

**Price**
- Enter number only (no currency symbol)
- Example: `100` for ¬100.00
- Decimals okay: `99.99`

**Description**
- Rich text editor
- Use for product features and details
- Supports:
  - Paragraphs
  - Bullet lists
  - Bold/italic text
  - Headings

**Product Images**
- Click "Upload" to add images
- Add at least 1 image (recommended: 6-24)
- For each image:
  - **Alt Text** (required): Describe the image
    - Example: "IKI device on black t-shirt"
  - **Caption** (optional): Image caption

**Display Order**
- Number controls position (1 = first, 2 = second, etc.)
- Example: `1`, `2`, `3`

---

### Optional Fields

**Discount Price**
- Sale price (if different from base price)
- Example: `90` (for ¬90.00 sale price)

**Currency**
- Usually leave as `EUR` (default)
- Options: EUR, USD, GBP

**Key Features**
- Bullet points of main features
- Click "Add item" to add each feature
- Example:
  - `Flexible OLED screen`
  - `Bluetooth Low Energy`
  - `5-day battery life`

**Available Sizes**
- For clothing products
- Select: XS, S, M, L, XL, XXL
- Click to select multiple

**Available Colors**
- Add color options
- Example: `Black`, `White`, `Grey`

**Technical Specifications**
- Add spec pairs (label + value)
- Example:
  - Label: `Screen Size`, Value: `6.8 inches`
  - Label: `Weight`, Value: `37g`
  - Label: `Battery Life`, Value: `5 days`

**SEO Settings**
- **Meta Title**: Page title for search engines (max 60 chars)
- **Meta Description**: Search description (max 160 chars)

**In Stock**
- Toggle on/off
- Default:  On (in stock)

**Featured Product**
- Toggle on/off
- Shows product prominently
- Default: Off

---

## =ø IMAGE UPLOAD TIPS

### Best Practices

1. **Format:** JPG or WebP preferred
2. **Size:** Under 2MB per image
3. **Dimensions:** 1920x1080 or 2100x1800 recommended
4. **Naming:** Use descriptive names before uploading
   - Good: `iki-device-front-view.jpg`
   - Bad: `IMG_0001.jpg`

### Upload Process

1. Click **"Upload"** in Images field
2. Select file(s) from computer
3. Wait for upload (progress bar)
4. Add **Alt Text** (accessibility + SEO)
5. Repeat for more images

### Image Types Needed

For complete product page, upload:
- **Product Preview** (main product shot)
- **Detail Shots** (close-ups of features)
- **Lifestyle Images** (product in use)
- **Desktop versions** (1920x1080)
- **Mobile versions** (optional, 540x804)

---

##  EXAMPLE: Creating "IKI" Product

```
Product Name: IKI
Slug: iki (click Generate)
Category: Device
Price: 100
Discount Price: (leave empty or set to 90)
Currency: EUR

Description:
===========
[Bullet list]
- Flexible OLED screen
- Black & white display
- Bluetooth Low Energy connectivity

[Paragraph]
IKI (DM, "chic, stylish") is a concept in aesthetics, expressing
simplicity, sophistication, spontaneity and originality.

With this ultra-flat, lightweight 6.8" screen, you can share what
you think, how you feel, who you love... on your T-shirt!

[Paragraph]
Using Bluetooth Low Energy (BLE) to interact with your smartphone,
IKI can display slideshows of about 20 images that can be edited
and enhanced via the TRBL app.

Key Features:
=============
- Flexible e-paper display
- 6.8" screen size
- 37g lightweight
- 5-day battery life
- Bluetooth Low Energy
- Magnetic mounting

Technical Specifications:
========================
Screen Size: 6.8 inches
Weight: 37g
Battery Life: Up to 5 days
Connectivity: Bluetooth 4.0 LE
Display: E-ink, Black & White
Charging: Micro USB

Product Images:
==============
[Upload 6 images]
1. iki-front-view.jpg (Alt: "IKI device front view")
2. iki-back-view.jpg (Alt: "IKI device back view")
3. iki-on-tshirt.jpg (Alt: "IKI mounted on black t-shirt")
4. iki-charging.jpg (Alt: "IKI device charging with cable")
5. iki-lifestyle-1.jpg (Alt: "Person wearing IKI device")
6. iki-detail-screen.jpg (Alt: "Close-up of IKI screen")

Available Sizes: (leave empty for devices)
Available Colors: Black

Display Order: 1

In Stock:  Yes
Featured Product:  Yes (if primary product)

SEO Settings:
============
Meta Title: IKI - Flexible E-Paper Display Device | Elite
Meta Description: Ultra-flat 6.8" flexible screen for your garment.
Express yourself with wearable technology. Bluetooth connected,
5-day battery life.
```

**Then click:** =™ **"Publish"** (top right)

---

## = WORKFLOW AFTER CREATING PRODUCTS

### 1. Create Products in Sanity

Create all products (ideally 3+):
- Product 1: Device
- Product 2: Sweatshirt
- Product 3: T-Shirt

Remember to **Publish** each one!

### 2. Generate HTML

```bash
cd /home/user/ebyfckinc
node generate-from-sanity-COMPLETE.js
```

Watch output:
```
=Í Products:
   Replaced products array with 3 products:
     1. IKI - ¬100.00 (6 images, 1 variants)
     2. Elite Sweatshirt - ¬250.00 (24 images, 4 variants)
     3. Elite T-Shirt - ¬250.00 (24 images, 4 variants)
```

### 3. Test Generated HTML

```bash
python3 -m http.server 8000
```

Open: http://localhost:8000/index-with-sanity.html

Check:
-  All products visible
-  Images load correctly
-  Descriptions render properly
-  Prices correct
-  Add to cart works
-  Size selection works (for clothing)

### 4. Deploy

```bash
# Backup original
mv index.html index-backup-$(date +%Y%m%d-%H%M%S).html

# Use new version
mv index-with-sanity.html index.html

# Commit
git add index.html
git commit -m "Add products from Sanity CMS"
git push
```

---

## =¨ COMMON MISTAKES

### L Forgetting to Publish
**Problem:** Product created but doesn't appear in generated HTML
**Solution:** Click the blue **"Publish"** button (not just Save)

### L No Images Added
**Problem:** Script runs but product has no images
**Solution:** Upload at least 1 image and add Alt Text

### L No Display Order
**Problem:** Products appear in random order
**Solution:** Set Display Order (1, 2, 3, etc.)

### L Missing Required Fields
**Problem:** Can't publish product
**Solution:** Fill in all fields marked with red asterisk (*)

### L Wrong Category
**Problem:** Product displays incorrectly on site
**Solution:**
- Device products ’ Category: "Device"
- Clothing with device ’ Category: "Sweatshirt" or "T-Shirt"

---

## =Ë CHECKLIST

Before publishing a product:

- [ ] Product Name filled in
- [ ] Slug generated
- [ ] Category selected
- [ ] Price entered
- [ ] Description written (rich text)
- [ ] At least 1 image uploaded
- [ ] All images have Alt Text
- [ ] Display Order set
- [ ] Sizes added (if clothing)
- [ ] In Stock toggled on
- [ ] SEO fields filled (optional but recommended)
- [ ] Clicked **"Publish"** button

After publishing:

- [ ] Product appears in Sanity Studio product list
- [ ] Run `generate-from-sanity-COMPLETE.js`
- [ ] Check console output shows product
- [ ] Test in browser
- [ ] Verify all data correct
- [ ] Deploy to production

---

## =¡ TIPS

### Efficient Workflow

1. **Prepare content first** - Write descriptions, gather images
2. **Create all products** - Don't generate HTML between each product
3. **Publish all at once** - Then generate HTML once
4. **Bulk upload images** - Select multiple files at once
5. **Copy fields** - Use similar descriptions across similar products

### Content Writing

- **Be specific** - Detail exact features
- **Use bullet points** - Easier to scan
- **Highlight benefits** - Not just features
- **Include measurements** - Size, weight, dimensions
- **SEO optimize** - Include keywords naturally

### Image Organization

- **Consistent naming** - `{product}-{view}-{variant}.jpg`
- **Sequence matters** - First image is featured image
- **Show variety** - Front, back, detail, lifestyle
- **Optimize before upload** - Compress large files

---

## <¯ NEXT STEPS

After creating products:

1.  Create 3+ products in Sanity
2.  Upload product images
3.  Regenerate HTML
4.  Test locally
5.  Deploy to production
6.  Monitor analytics
7.  Update content as needed

---

*For complete integration guide, see: `COMPLETE_INTEGRATION_GUIDE.md`*
*For quick reference, see: `QUICK_START.md`*
