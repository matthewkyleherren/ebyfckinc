# Elite CMS - Sanity Studio

This is the Sanity Studio for managing content on the Elite. website.

## Quick Start

### 1. Install Dependencies

```bash
cd sanity-studio
npm install
```

### 2. Login to Sanity

```bash
npx sanity login
```

This will open your browser to authenticate with Sanity.io.

### 3. Initialize Project

If this is a brand new project, create it:

```bash
npx sanity init --project-id YOUR_PROJECT_ID --dataset production
```

Or create a new project:

```bash
npx sanity init
```

Follow the prompts:
- **Project name:** Elite CMS
- **Use default dataset:** Yes (production)
- **Project output path:** . (current directory)
- **Select project template:** Clean project with no predefined schemas

### 4. Update Configuration

Update `sanity.config.js` with your project ID:

```javascript
projectId: 'abc123xyz',  // Replace with your actual project ID
```

Also update `/assets/sanity-loader.js` with the same project ID.

### 5. Run Studio Locally

```bash
npm run dev
```

Studio will open at `http://localhost:3333`

### 6. Deploy Studio to Sanity

```bash
npm run deploy
```

Your studio will be live at `https://your-project.sanity.studio`

## Content Structure

### Singleton Documents (Only One)
- **Site Settings** - Brand info, contact, tagline
- **About Section** - 4 paragraphs about the brand
- **Navigation Menu** - Site navigation items

### Collection Documents (Multiple)
- **Products** - E-commerce products (IKI, SWEAT, TEE)
- **FAQ Items** - Frequently asked questions
- **Lookbook Images** - Gallery/showcase images

## Schemas

All schemas are in `/schemas/`:
- `siteSettings.js` - Global site configuration
- `product.js` - Product catalog
- `faqItem.js` - FAQ questions
- `aboutSection.js` - About content
- `lookbookImage.js` - Gallery images
- `navigationMenu.js` - Menu structure

## Usage

### Adding Content

1. **Site Settings**
   - Click "Site Settings" in sidebar
   - Fill in brand name, tagline, contact info
   - Save & publish

2. **Products**
   - Click "Products" → "Create new Product"
   - Fill in name, price, description
   - Upload product images
   - Add technical specs
   - Save & publish

3. **FAQ**
   - Click "FAQ" → "Create new FAQ Item"
   - Enter question and answer
   - Set display order
   - Save & publish

4. **Lookbook**
   - Click "Lookbook Gallery" → "Create new Lookbook Image"
   - Upload image
   - Add title and alt text
   - Set display order
   - Save & publish

### GROQ Queries

Test queries in the "Vision" tool (sidebar):

```groq
// Get all products
*[_type == "product"] | order(order asc)

// Get FAQ by category
*[_type == "faqItem" && category == "technical"] | order(order asc)

// Get featured lookbook images
*[_type == "lookbookImage" && featured == true]
```

## API Access

### REST API

```
https://abc123xyz.api.sanity.io/v1/data/query/production?query=*[_type == "product"]
```

### JavaScript Client

```javascript
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'abc123xyz',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-02-06'
})

const products = await client.fetch('*[_type == "product"]')
```

## Troubleshooting

### Studio won't start
- Make sure Node.js 18+ is installed
- Run `npm install` again
- Check `sanity.config.js` has correct project ID

### Can't publish content
- Ensure you're logged in: `npx sanity login`
- Check you have write permissions on the dataset

### Images not showing
- Images upload to Sanity CDN automatically
- URLs are generated: `https://cdn.sanity.io/images/...`
- Check Media Library for uploaded files

## Commands Reference

```bash
npm run dev          # Start local studio
npm run build        # Build studio for production
npm run deploy       # Deploy to sanity.studio
npx sanity login     # Authenticate with Sanity
npx sanity dataset   # Manage datasets
npx sanity users     # Manage project users
npx sanity cors      # Manage CORS origins
```

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Schema Types](https://www.sanity.io/docs/schema-types)
- [Sanity Client](https://github.com/sanity-io/client)

## Support

- [Sanity Slack Community](https://slack.sanity.io)
- [Sanity Help Center](https://www.sanity.io/help)
- [GitHub Issues](https://github.com/sanity-io/sanity/issues)
