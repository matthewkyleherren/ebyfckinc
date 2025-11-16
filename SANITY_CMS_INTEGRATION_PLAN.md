# SANITY.IO CMS INTEGRATION PLAN
## For WE+AR TRBL Site (Minified/Webpacked Code)

---

## EXECUTIVE SUMMARY

This plan enables Sanity.io CMS integration into your existing minified/webpacked site **without access to source code**. The approach uses runtime JavaScript injection to fetch and replace content dynamically, providing immediate CMS capabilities while you work on a full rewrite.

**Timeline:** 2-3 days for basic implementation
**Cost:** Free tier available (10,000 documents, 100GB bandwidth/month)
**Complexity:** Medium (no build step required)

---

## CURRENT SITE ARCHITECTURE ANALYSIS

### What You Have
- **Static HTML site** with embedded `window.__INITIAL_STATE__` object (lines 172-992 in index.html)
- **Minified React bundle** (855KB main.3a07af46.js)
- **All content embedded** in JavaScript as JSON data structure
- **126 image assets** with clean filenames (post-simplification)
- **No build tooling** or source code available

### Key Content Locations
```javascript
window.__INITIAL_STATE__ = {
  localization: {
    messages: { /* 254 text strings */ }
  },
  products: { /* 3 products: IKI, SWEAT, TEE */ },
  about: { /* 4 paragraphs */ },
  faq: { /* 15 Q&As */ },
  lookbook: { /* Gallery images */ }
}
```

### The Challenge
- **Cannot rebuild/recompile** the React app
- **Cannot modify** the minified JS without breaking it
- **Must inject** CMS content at runtime after page loads
- **Must maintain** existing functionality while replacing content

---

## SANITY.IO INTEGRATION STRATEGY

### Approach: Runtime Content Injection

Instead of rebuilding the site, we'll:
1. **Set up Sanity Studio** (separate admin interface)
2. **Create content schemas** matching your current data structure
3. **Inject a loader script** into index.html that fetches from Sanity
4. **Replace content** in `window.__INITIAL_STATE__` before React renders
5. **Swap images** by updating image references in the DOM

### Why This Works
- Sanity delivers content via **REST/GraphQL APIs**
- Browser can fetch content **before React initializes**
- Your React app will **consume the modified state** as if it was embedded
- **Zero changes** to minified JavaScript files

---

## DETAILED IMPLEMENTATION PLAN

### PHASE 1: Sanity Studio Setup (Day 1)

#### Step 1.1: Create Sanity Project
```bash
npm create sanity@latest -- --template clean --create-project "Elite CMS" --dataset production
```

**What you'll get:**
- Project ID (e.g., `abc123xyz`)
- Dataset name (`production`)
- Free hosted Studio at `yourproject.sanity.studio`

#### Step 1.2: Design Content Schemas

Create schemas matching your current structure:

**`schemas/siteSettings.js`** - Brand & Contact Info
```javascript
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      description: 'e.g., Elite.'
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'e.g., Massages that will blow your mind. And more.'
    },
    {
      name: 'sloganLine1',
      title: 'Slogan Line 1',
      type: 'string'
    },
    {
      name: 'sloganLine2',
      title: 'Slogan Line 2',
      type: 'string'
    },
    {
      name: 'sloganLine3',
      title: 'Slogan Line 3',
      type: 'string'
    },
    {
      name: 'hashtag',
      title: 'Hashtag',
      type: 'string',
      description: 'e.g., #EliteMassage'
    },
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string'
    },
    {
      name: 'storeAddress',
      title: 'Store Address',
      type: 'text'
    }
  ]
}
```

**`schemas/product.js`** - Product Information
```javascript
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number'
    },
    {
      name: 'discountPrice',
      title: 'Discount Price',
      type: 'number'
    },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: ['EUR', 'USD', 'GBP']
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'specs',
      title: 'Technical Specifications',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'label', type: 'string'},
          {name: 'value', type: 'string'}
        ]
      }]
    },
    {
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{
        type: 'image',
        options: {hotspot: true},
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alternative text'
          }
        ]
      }]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['device', 'sweatshirt', 'tshirt']
      }
    }
  ]
}
```

**`schemas/faqItem.js`** - FAQ Questions
```javascript
export default {
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string'
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}]
    }
  ]
}
```

**`schemas/aboutSection.js`** - About Content
```javascript
export default {
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'paragraph1',
      title: 'Paragraph 1: Brand Introduction',
      type: 'text'
    },
    {
      name: 'paragraph2',
      title: 'Paragraph 2: Origin Story',
      type: 'text'
    },
    {
      name: 'paragraph3',
      title: 'Paragraph 3: Innovation & Technology',
      type: 'text'
    },
    {
      name: 'paragraph4',
      title: 'Paragraph 4: Vision & Impact',
      type: 'text'
    }
  ]
}
```

**`schemas/lookbookImage.js`** - Lookbook Gallery
```javascript
export default {
  name: 'lookbookImage',
  title: 'Lookbook Image',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }
  ]
}
```

#### Step 1.3: Deploy Studio
```bash
npm run deploy
```

Your CMS admin will be live at: `https://yourproject.sanity.studio`

---

### PHASE 2: Content Migration (Day 1-2)

#### Step 2.1: Extract Current Content

Use the existing documentation files to populate Sanity:
- `CONTENT_REPLACEMENT_PLAN.md` - Current content inventory
- `NEW_CONTENT_TEMPLATE.md` - New content being prepared

#### Step 2.2: Manual Entry via Studio

Log into your Sanity Studio and create:
1. **1 Site Settings document** with brand info
2. **3 Product documents** (Elite device, sweatshirt, tshirt)
3. **15 FAQ Item documents**
4. **1 About Section document**
5. **Upload lookbook images** to Media Library

**Time estimate:** 2-3 hours for initial content entry

---

### PHASE 3: Frontend Integration (Day 2)

#### Step 3.1: Create Content Loader Script

Create `/assets/sanity-loader.js`:

```javascript
/**
 * Sanity CMS Content Loader
 * Fetches content from Sanity.io and injects into window.__INITIAL_STATE__
 * before React initializes
 */

(async function() {
  const SANITY_PROJECT_ID = 'YOUR_PROJECT_ID';
  const SANITY_DATASET = 'production';
  const SANITY_API_VERSION = '2025-02-06';

  // Import Sanity client from CDN
  const { createClient } = await import('https://esm.sh/@sanity/client');

  const client = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    useCdn: true,
    apiVersion: SANITY_API_VERSION
  });

  // GROQ queries for all content
  const queries = {
    siteSettings: `*[_type == "siteSettings"][0]`,
    products: `*[_type == "product"] | order(category)`,
    faqs: `*[_type == "faqItem"] | order(order asc)`,
    about: `*[_type == "aboutSection"][0]`,
    lookbook: `*[_type == "lookbookImage"] | order(order asc) {
      title,
      "imageUrl": image.asset->url,
      "thumbnailUrl": thumbnail.asset->url
    }`
  };

  try {
    console.log('🔄 Fetching content from Sanity...');

    // Fetch all content in parallel
    const [siteSettings, products, faqs, about, lookbook] = await Promise.all([
      client.fetch(queries.siteSettings),
      client.fetch(queries.products),
      client.fetch(queries.faqs),
      client.fetch(queries.about),
      client.fetch(queries.lookbook)
    ]);

    // Map Sanity content to existing state structure
    const originalState = window.__INITIAL_STATE__;

    // Update localization messages
    if (siteSettings) {
      originalState.localization.messages['header.topText'] = siteSettings.tagline;
      originalState.localization.messages['common.wearTrbl'] = siteSettings.hashtag;
      // ... map all other text strings
    }

    // Update products
    if (products && products.length > 0) {
      // Transform Sanity products to match existing structure
      originalState.products.list = products.map(p => ({
        id: p._id,
        slug: p.slug.current,
        name: p.name,
        price: p.price,
        discountPrice: p.discountPrice,
        currency: p.currency,
        description: p.description,
        // ... map all fields
      }));
    }

    // Update FAQ
    if (faqs) {
      originalState.faq = faqs.map(f => ({
        question: f.question,
        answer: f.answer
      }));
    }

    // Update About
    if (about) {
      originalState.about = {
        paragraph1: about.paragraph1,
        paragraph2: about.paragraph2,
        paragraph3: about.paragraph3,
        paragraph4: about.paragraph4
      };
    }

    // Update Lookbook images
    if (lookbook) {
      originalState.lookbook = lookbook.map((img, idx) => ({
        id: idx + 1,
        thumbnail: img.thumbnailUrl,
        full: img.imageUrl,
        title: img.title
      }));
    }

    console.log('✅ Sanity content loaded successfully');

    // Trigger custom event to notify app
    window.dispatchEvent(new CustomEvent('sanity-content-loaded', {
      detail: { siteSettings, products, faqs, about, lookbook }
    }));

  } catch (error) {
    console.error('❌ Failed to load Sanity content:', error);
    // Fallback to embedded content (site still works)
  }
})();
```

#### Step 3.2: Inject Loader into HTML

Modify `index.html` to load Sanity content **before** React initializes:

```html
<script>
    window.__INITIAL_STATE__ = {
        /* ... existing state ... */
    };
</script>

<!-- ADD THIS: Load Sanity content BEFORE React bundle -->
<script type="module" src="/assets/sanity-loader.js"></script>

<!-- Existing React bundles load after -->
<script src="/assets/vendors~main.148de527.chunk.js"></script>
<script src="/assets/main.3a07af46.js"></script>
```

**Critical:** The loader must execute **after** `__INITIAL_STATE__` is defined but **before** React bundle runs.

#### Step 3.3: Handle Image CDN URLs

Sanity serves images from their CDN. Update the loader to handle image transformations:

```javascript
// Sanity image URL builder
function buildImageUrl(asset, options = {}) {
  const { width, height, quality = 85, format = 'webp' } = options;

  let url = asset.url;
  const params = [];

  if (width) params.push(`w=${width}`);
  if (height) params.push(`h=${height}`);
  if (quality) params.push(`q=${quality}`);
  if (format) params.push(`fm=${format}`);

  return params.length > 0 ? `${url}?${params.join('&')}` : url;
}

// Use in queries:
lookbook: `*[_type == "lookbookImage"] | order(order asc) {
  title,
  "imageUrl": image.asset->url,
  "thumbnailUrl": thumbnail.asset->url,
  "asset": image.asset->
}`

// Then transform:
originalState.lookbook = lookbook.map((img) => ({
  thumbnail: buildImageUrl(img.asset, { width: 400, quality: 85 }),
  full: buildImageUrl(img.asset, { width: 1200, quality: 90 })
}));
```

---

### PHASE 4: Testing & Validation (Day 3)

#### Test Checklist

**Content Loading:**
- [ ] Open browser console, verify "✅ Sanity content loaded successfully"
- [ ] Check `window.__INITIAL_STATE__` contains Sanity data
- [ ] Verify no JavaScript errors

**Visual Verification:**
- [ ] Homepage displays new brand name (Elite.)
- [ ] Tagline shows "Massages that will blow your mind. And more."
- [ ] Product pages show correct prices/descriptions
- [ ] FAQ section displays all 15 questions from Sanity
- [ ] About section shows 4 paragraphs from CMS
- [ ] Lookbook gallery loads images from Sanity CDN

**Performance:**
- [ ] Page load time < 2 seconds
- [ ] Images load progressively
- [ ] No CORS errors (Sanity CDN allows cross-origin)

**Fallback:**
- [ ] If Sanity fails, site shows embedded content (graceful degradation)

#### Debug Mode

Add debug flag to loader:

```javascript
const DEBUG = true;

if (DEBUG) {
  console.log('Sanity Site Settings:', siteSettings);
  console.log('Sanity Products:', products);
  console.log('Final State:', window.__INITIAL_STATE__);
}
```

---

## INTEGRATION ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER (Client-Side)                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Load index.html                                         │
│     └─> window.__INITIAL_STATE__ = { ... }                 │
│                                                             │
│  2. Load sanity-loader.js (ESM module)                     │
│     ├─> Import @sanity/client from CDN                     │
│     ├─> Fetch content via GROQ queries                     │
│     └─> Mutate window.__INITIAL_STATE__                    │
│                                                             │
│  3. Load React bundles                                      │
│     └─> React reads modified __INITIAL_STATE__             │
│     └─> Renders with Sanity content                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │ HTTPS API Calls
                           │ (GROQ queries)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  SANITY.IO (Cloud CMS)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Content Lake (Structured Data)                             │
│  ├─> Site Settings                                          │
│  ├─> Products (3 documents)                                 │
│  ├─> FAQ Items (15 documents)                               │
│  ├─> About Section                                          │
│  └─> Lookbook Images                                        │
│                                                             │
│  Media Library (Images)                                     │
│  └─> Product photos, Lookbook gallery                       │
│                                                             │
│  Sanity Studio (Admin UI)                                   │
│  └─> https://yourproject.sanity.studio                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ADVANTAGES OF THIS APPROACH

### ✅ Pros

1. **No Source Code Required**
   - Works with minified/webpacked code
   - Zero modifications to React bundles

2. **Immediate Value**
   - CMS live in 2-3 days
   - Content editors can update text/images immediately
   - No waiting for full rewrite

3. **Low Risk**
   - Graceful fallback to embedded content if Sanity fails
   - Existing functionality preserved
   - Easy to rollback (remove one script tag)

4. **Future-Proof**
   - Content already in Sanity when you rebuild from scratch
   - Same schemas can be used in new site
   - Zero content re-entry work

5. **Cost-Effective**
   - Free tier: 10K documents, 100GB bandwidth/month
   - No hosting costs for CMS
   - Sanity CDN for image delivery

6. **Developer-Friendly**
   - GROQ queries are powerful and flexible
   - Real-time preview in Studio
   - Version history built-in

### ⚠️ Cons & Limitations

1. **Runtime Overhead**
   - Extra HTTP requests on page load
   - ~500ms-1s delay for content fetch
   - **Mitigation:** Use Sanity CDN (edge caching), preload critical content

2. **Content Mapping Complexity**
   - Must manually map Sanity structure to existing state
   - ~200 lines of mapping code
   - **Mitigation:** Document mappings, create helper functions

3. **No Real-time Updates**
   - Content cached until page refresh
   - Users won't see changes until they reload
   - **Mitigation:** Acceptable for e-commerce site (not live chat)

4. **Image Migration**
   - Must upload images to Sanity Media Library
   - Lookbook: 110 images to upload
   - **Mitigation:** Batch upload via Sanity API or Studio

5. **Maintenance Burden**
   - Hacky solution until full rewrite
   - Code debt (will be thrown away in 2-3 months)
   - **Mitigation:** Worth it for immediate CMS access

---

## ALTERNATIVE APPROACHES CONSIDERED

### Option A: Direct State Replacement (Chosen)
**What:** Inject loader that modifies `window.__INITIAL_STATE__`
**Pros:** Simple, works with any React app
**Cons:** Runtime overhead, mapping complexity
**Verdict:** ✅ Best for your situation

### Option B: Proxy Server
**What:** Run Node.js server that fetches from Sanity, renders HTML
**Pros:** SEO-friendly, no client-side delay
**Cons:** Requires server infrastructure, more complex
**Verdict:** ❌ Overkill for temporary solution

### Option C: Static Site Generation
**What:** Pre-build HTML pages from Sanity content
**Pros:** Fast, no runtime overhead
**Cons:** Requires build step, can't use existing React bundles
**Verdict:** ❌ Not feasible without source code

### Option D: Wait for Full Rewrite
**What:** Do nothing until new site is built
**Pros:** Clean implementation
**Cons:** No CMS for 2-3 months
**Verdict:** ❌ Too long to wait

---

## IMPLEMENTATION TIMELINE

### Day 1 (4 hours)
- ✅ Create Sanity project
- ✅ Design schemas (6 document types)
- ✅ Deploy Studio
- ✅ Enter initial content

### Day 2 (6 hours)
- ✅ Build sanity-loader.js
- ✅ Create content mapping functions
- ✅ Inject loader into index.html
- ✅ Test on localhost

### Day 3 (3 hours)
- ✅ Upload lookbook images to Sanity
- ✅ Final testing (all content types)
- ✅ Deploy to production
- ✅ Train content editors on Studio

**Total:** ~13 hours of dev work

---

## LONG-TERM MIGRATION PATH

### Months 1-2: Use Runtime Injection
- Content editors use Sanity Studio
- Updates happen instantly via CMS
- Site runs with current minified code

### Month 3: Begin Full Rewrite
- Build new React/Next.js site from scratch
- Use **same Sanity schemas** (zero content migration!)
- Implement proper SSR/SSG with Sanity

### Month 4: Launch New Site
- Deploy rebuilt site
- Content automatically pulls from Sanity
- Decommission old minified site
- **Zero downtime**, content preserved

---

## COST ANALYSIS

### Sanity.io Pricing

**Free Tier (Likely sufficient):**
- 10,000 documents
- 100GB bandwidth/month
- 5GB asset storage
- Unlimited API requests
- 3 non-admin users

**Your Usage Estimate:**
- ~150 documents (3 products, 15 FAQs, 110 lookbook, misc)
- ~5-10GB bandwidth/month (small traffic site)
- ~2GB image storage
- **Verdict:** Free tier is plenty

**Growth Plan ($99/month):**
- 250,000 documents
- 500GB bandwidth
- 50GB storage
- Only needed if traffic scales significantly

### Alternative Costs

**Headless CMS Comparison:**
- Contentful: $300/month for similar features
- Strapi: Self-hosted, ~$50/month server costs
- WordPress + ACF: $30/month hosting + maintenance headaches

**Verdict:** Sanity offers best value for your use case

---

## RECOMMENDED NEXT STEPS

### Immediate (Today)
1. ✅ Review this plan with your team
2. ✅ Decide on implementation (approve or modify)
3. ✅ Create Sanity.io account (free)

### This Week
1. ✅ Set up Sanity project and Studio
2. ✅ Design and deploy schemas
3. ✅ Enter content from NEW_CONTENT_TEMPLATE.md

### Next Week
1. ✅ Build and test sanity-loader.js locally
2. ✅ Integrate into index.html
3. ✅ Deploy to production
4. ✅ Train team on Studio

### Month 2-3
1. ✅ Use CMS for day-to-day content updates
2. ✅ Plan full site rewrite architecture
3. ✅ Prepare for migration to new codebase

---

## SUPPORT & RESOURCES

### Documentation
- [Sanity.io Docs](https://www.sanity.io/docs)
- [GROQ Query Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [JavaScript Client Docs](https://github.com/sanity-io/client)

### Community
- [Sanity Slack Community](https://slack.sanity.io)
- [Sanity Exchange](https://www.sanity.io/exchange) - Plugins & templates

### Training
- Free Sanity.io courses at [sanity.io/learn](https://www.sanity.io/learn)
- "Content-driven Web App Foundations" course

---

## RISK MITIGATION

### Risk: Sanity API downtime
**Mitigation:** Fallback to embedded content (already in HTML)

### Risk: CORS issues with Sanity CDN
**Mitigation:** Sanity allows cross-origin by default; CORS unlikely

### Risk: Content mapping bugs
**Mitigation:** Extensive testing, debug mode, rollback plan

### Risk: Performance degradation
**Mitigation:** Use Sanity CDN, cache responses, monitor page load times

### Risk: Team can't learn Studio
**Mitigation:** Studio is very user-friendly; 15-min training sufficient

---

## CONCLUSION

This plan provides a **pragmatic, low-risk path** to add Sanity.io CMS to your existing minified site. While it's a temporary solution, it delivers immediate value and sets you up perfectly for a future rewrite.

**Key Benefits:**
- ✅ CMS live in 2-3 days
- ✅ No source code required
- ✅ Content preserved for future rebuild
- ✅ Free tier sufficient
- ✅ Easy rollback if needed

**Recommendation:** Proceed with implementation. The 13 hours of dev work is well worth it to avoid manual content editing for the next 2-3 months.

---

**Ready to start?** Let me know and I can help you:
1. Create the initial Sanity schemas
2. Build the sanity-loader.js script
3. Set up the integration in index.html
4. Test and deploy

---

*Last Updated: 2025-11-16*
*Document Version: 1.0*
