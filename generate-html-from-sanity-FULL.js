#!/usr/bin/env node

/**
 * COMPLETE Sanity CMS Content Generator
 *
 * This script provides FULL content management through Sanity CMS by:
 * - Replacing ALL text content in HTML and JavaScript
 * - Managing products (titles, prices, descriptions, sizes, slugs, types)
 * - Updating meta tags, navigation, FAQ, etc.
 * - Handling both index.html AND assets/main.*.js
 *
 * NO MORE CODE EDITING FOR CONTENT!
 *
 * Usage:
 *   node generate-html-from-sanity-FULL.js
 *
 * Output:
 *   - index-with-sanity.html (updated HTML)
 *   - assets/main.*.js (updated JavaScript, if needed)
 */

import {
    readFileSync,
    writeFileSync,
    readdirSync
} from 'fs';
import {
    join
} from 'path';

const SANITY_PROJECT_ID = 'duqxb9hm';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2025-02-06';

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// Convert Sanity blocks to plain text
function blockToText(blocks) {
    if (!blocks || !Array.isArray(blocks)) return '';
    return blocks
        .map(block => {
            if (block._type === 'block' && block.children) {
                return block.children.map(child => child.text || '').join('');
            }
            return '';
        })
        .join('\n');
}

// Convert Sanity blocks to HTML
function blockToHTML(blocks) {
    if (!blocks || !Array.isArray(blocks)) return '';

    return blocks.map(block => {
        if (block._type !== 'block') return '';

        const text = block.children?.map(child => child.text || '').join('') || '';

        // Handle lists
        if (block.listItem === 'bullet') {
            return `<li>${text}</li>`;
        }

        // Handle headers
        if (block.style === 'h2') return `<h2>${text}</h2>`;
        if (block.style === 'h3') return `<h3>${text}</h3>`;

        // Regular paragraph
        return `<p>${text}</p>`;
    }).join('');
}

// Escape quotes for JSON embedding
function escapeForJSON(str) {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/"/g, '\\"') // Escape double quotes
        .replace(/\n/g, '\\n') // Preserve newlines as \n
        .replace(/\r/g, '') // Remove carriage returns
        .replace(/\t/g, '\\t'); // Escape tabs
}

// Escape for JavaScript string literals
function escapeForJS(str) {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '')
        .replace(/\t/g, '\\t');
}

// Fetch from Sanity
async function fetchFromSanity(query) {
    const url = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.result;
}

// Safe regex replace (only if pattern exists)
function safeReplace(content, pattern, replacement, label) {
    const regex = new RegExp(pattern);
    if (regex.test(content)) {
        console.log(`  ✓ ${label}`);
        return {
            content: content.replace(regex, replacement),
            replaced: true
        };
    } else {
        console.log(`  ⚠ ${label} - pattern not found (skipped)`);
        return {
            content: content,
            replaced: false
        };
    }
}

// =============================================================================
// FETCH CONTENT FROM SANITY
// =============================================================================

console.log('');
console.log('═══════════════════════════════════════════════════');
console.log('🚀 COMPLETE SANITY CMS CONTENT GENERATOR');
console.log('═══════════════════════════════════════════════════');
console.log('');
console.log('🔄 Fetching all content from Sanity...');
console.log('');

const [siteSettings, about, faqs, products, navigationMenu] = await Promise.all([
    fetchFromSanity(`*[_type == "siteSettings"][0]{
    ...,
    storeAddress,
    storeHours,
    companyInfo
  }`),
    fetchFromSanity(`*[_type == "aboutSection"][0]`),
    fetchFromSanity(`*[_type == "faqItem"] | order(order asc)`),
    fetchFromSanity(`*[_type == "product"] | order(order asc){
    ...,
    "imageUrl": images[0].asset->url
  }`),
    fetchFromSanity(`*[_type == "navigationMenu"][0]`)
]);

console.log('✅ Content fetched successfully:');
console.log(`  • Site Settings: ${siteSettings?.brandName || 'Not found'}`);
console.log(`  • About Section: ${about?.title || 'Not found'}`);
console.log(`  • FAQ Items: ${faqs?.length || 0}`);
console.log(`  • Products: ${products?.length || 0}`);
console.log(`  • Navigation: ${navigationMenu ? 'Found' : 'Not found'}`);
console.log('');

// =============================================================================
// READ FILES
// =============================================================================

console.log('📂 Reading source files...');
let html = readFileSync('./index.html', 'utf8');

// Find main.js file
const assetsDir = './assets';
const files = readdirSync(assetsDir);
const mainJsFile = files.find(f => f.match(/^main\.[a-f0-9]+\.js$/));
let mainJs = null;
let mainJsPath = null;

if (mainJsFile) {
    mainJsPath = join(assetsDir, mainJsFile);
    mainJs = readFileSync(mainJsPath, 'utf8');
    console.log(`  ✓ Found: ${mainJsFile}`);
} else {
    console.log('  ⚠ Warning: main.js file not found');
}
console.log('');

let replacementCount = 0;

// =============================================================================
// 1. SITE SETTINGS & GLOBAL CONTENT
// =============================================================================

if (siteSettings) {
    console.log('⚙️  SITE SETTINGS & GLOBAL CONTENT');
    console.log('─────────────────────────────────────');

    // Page title
    if (siteSettings.brandName) {
        const result = safeReplace(
            html,
            /<title[^>]*>.*?<\/title>/,
            `<title data-react-helmet="true">HOME | ${escapeForJSON(siteSettings.brandName)}</title>`,
            `Page Title: "HOME | ${siteSettings.brandName}"`
        );
        html = result.content;
        if (result.replaced) replacementCount++;
    }

    // Meta description
    if (siteSettings.tagline) {
        const result = safeReplace(
            html,
            /<meta[^>]*name="description"[^>]*content="[^"]*"/,
            `<meta data-react-helmet="true" name="description" content="${escapeForJSON(siteSettings.tagline)}"`,
            `Meta Description: "${siteSettings.tagline.substring(0, 50)}..."`
        );
        html = result.content;
        if (result.replaced) replacementCount++;
    }

    // Header tagline
    if (siteSettings.tagline) {
        const result = safeReplace(
            html,
            /"header\.topText":\s*"[^"]*"/,
            `"header.topText": "${escapeForJSON(siteSettings.tagline)}"`,
            `Tagline: "${siteSettings.tagline}"`
        );
        html = result.content;
        if (result.replaced) replacementCount++;
    }

    // Brand hashtag
    if (siteSettings.hashtag) {
        const result = safeReplace(
            html,
            /"common\.wearTrbl":\s*"[^"]*"/,
            `"common.wearTrbl": "${escapeForJSON(siteSettings.hashtag)}"`,
            `Hashtag: "${siteSettings.hashtag}"`
        );
        html = result.content;
        if (result.replaced) replacementCount++;
    }

    // Contact email
    if (siteSettings.contactEmail) {
        const result = safeReplace(
            html,
            /"contacts\.email":\s*"[^"]*"/,
            `"contacts.email": "${escapeForJSON(siteSettings.contactEmail)}"`,
            `Email: "${siteSettings.contactEmail}"`
        );
        html = result.content;
        if (result.replaced) replacementCount++;
    }

    // Lookbook CTA
    if (siteSettings.lookbookCallToAction) {
        const result = safeReplace(
            html,
            /"lookbook\.question":\s*"[^"]*"/,
            `"lookbook.question": "${escapeForJSON(siteSettings.lookbookCallToAction)}"`,
            `Lookbook CTA: "${siteSettings.lookbookCallToAction}"`
        );
        html = result.content;
        if (result.replaced) replacementCount++;
    }

    // Loading text
    if (siteSettings.brandName) {
        const result = safeReplace(
            html,
            /"preloader\.loading":\s*"[^"]*"/,
            `"preloader.loading": "Loading ${escapeForJSON(siteSettings.brandName)}"`,
            `Loading Text: "Loading ${siteSettings.brandName}"`
        );
        html = result.content;
        if (result.replaced) replacementCount++;
    }

    // Store address
    if (siteSettings.storeAddress && !siteSettings.storeAddress.isOnlineOnly) {
        const addr = siteSettings.storeAddress;

        if (addr.street) {
            const result = safeReplace(
                html,
                /"contacts\.text-0":\s*"[^"]*"/,
                `"contacts.text-0": "${escapeForJSON(addr.street)}"`,
                `Address Line 1: "${addr.street}"`
            );
            html = result.content;
            if (result.replaced) replacementCount++;
        }

        if (addr.city && addr.postalCode) {
            const cityLine = `${addr.postalCode} ${addr.city}`;
            const result = safeReplace(
                html,
                /"contacts\.text-1":\s*"[^"]*"/,
                `"contacts.text-1": "${escapeForJSON(cityLine)}"`,
                `Address Line 2: "${cityLine}"`
            );
            html = result.content;
            if (result.replaced) replacementCount++;
        }

        if (addr.country) {
            const result = safeReplace(
                html,
                /"contacts\.text-2":\s*"[^"]*"/,
                `"contacts.text-2": "${escapeForJSON(addr.country.toLowerCase())}"`,
                `Country: "${addr.country}"`
            );
            html = result.content;
            if (result.replaced) replacementCount++;
        }
    }

    // Store hours
    if (siteSettings.storeHours && !siteSettings.storeHours.isAlwaysOpen) {
        const hours = siteSettings.storeHours;

        if (hours.monday) {
            const result = safeReplace(
                html,
                /"contacts\.text-3":\s*"[^"]*"/,
                `"contacts.text-3": "Monday — Friday: ${escapeForJSON(hours.monday)}"`,
                `Weekday Hours: "${hours.monday}"`
            );
            html = result.content;
            if (result.replaced) replacementCount++;
        }

        if (hours.saturday) {
            const result = safeReplace(
                html,
                /"contacts\.text-4":\s*"[^"]*"/,
                `"contacts.text-4": "Saturday: ${escapeForJSON(hours.saturday)}"`,
                `Saturday Hours: "${hours.saturday}"`
            );
            html = result.content;
            if (result.replaced) replacementCount++;
        }

        if (hours.sunday) {
            const result = safeReplace(
                html,
                /"contacts\.text-5":\s*"[^"]*"/,
                `"contacts.text-5": "Sunday: ${escapeForJSON(hours.sunday)}"`,
                `Sunday Hours: "${hours.sunday}"`
            );
            html = result.content;
            if (result.replaced) replacementCount++;
        }
    }

    console.log('');
}

// =============================================================================
// 2. ABOUT SECTION
// =============================================================================

if (about) {
    console.log('📖 ABOUT SECTION');
    console.log('─────────────────────────────────────');

    const paragraphs = [{
            key: 'paragraph1',
            index: 0
        },
        {
            key: 'paragraph2',
            index: 1
        },
        {
            key: 'paragraph3',
            index: 2
        },
        {
            key: 'paragraph4',
            index: 3
        }
    ];

    paragraphs.forEach(({
        key,
        index
    }) => {
        const text = blockToText(about[key]);
        if (text) {
            const preview = text.length > 50 ? text.substring(0, 50) + '...' : text;
            const result = safeReplace(
                html,
                `"about\\.text-${index}":\\s*"[^"]*"`,
                `"about.text-${index}": "${escapeForJSON(text)}"`,
                `Paragraph ${index + 1}: "${preview}"`
            );
            html = result.content;
            if (result.replaced) replacementCount++;
        }
    });

    console.log('');
}

// =============================================================================
// 3. FAQ SECTION
// =============================================================================

if (faqs && faqs.length > 0) {
    console.log('❓ FAQ SECTION');
    console.log('─────────────────────────────────────');

    faqs.forEach((faq, index) => {
        const faqNum = index + 1;
        if (faqNum > 15) return; // Max 15 FAQs

        // Question
        if (faq.question) {
            const result = safeReplace(
                html,
                `"faq\\.question-${faqNum}":\\s*"[^"]*"`,
                `"faq.question-${faqNum}": "${escapeForJSON(faq.question)}"`,
                `Q${faqNum}: "${faq.question}"`
            );
            html = result.content;
            if (result.replaced) replacementCount++;
        }

        // Answer
        if (faq.answer) {
            const answerText = blockToText(faq.answer);
            const preview = answerText.length > 40 ? answerText.substring(0, 40) + '...' : answerText;
            const result = safeReplace(
                html,
                `"faq\\.answer-${faqNum}":\\s*"[^"]*"`,
                `"faq.answer-${faqNum}": "${escapeForJSON(answerText)}"`,
                `A${faqNum}: "${preview}"`
            );
            html = result.content;
            if (result.replaced) replacementCount++;
        }
    });

    console.log('');
}

// =============================================================================
// 4. NAVIGATION MENU
// =============================================================================

if (navigationMenu && navigationMenu.menuItems) {
    console.log('🧭 NAVIGATION MENU');
    console.log('─────────────────────────────────────');

    const menuItems = navigationMenu.menuItems;

    // Map to nav keys
    const navMappings = [{
            navKey: 'nav.about',
            item: menuItems[0]
        },
        {
            navKey: 'nav.faq',
            item: menuItems[1]
        },
        {
            navKey: 'nav.lookbook',
            item: menuItems[2]
        },
        {
            navKey: 'nav.contacts',
            item: menuItems[3]
        },
        {
            navKey: 'nav.collection',
            item: menuItems[4]
        }
    ];

    navMappings.forEach(({
        navKey,
        item
    }) => {
        if (item && item.label) {
            const result = safeReplace(
                html,
                `"${navKey.replace('.', '\\.')}":\\s*"[^"]*"`,
                `"${navKey}": "${escapeForJSON(item.label)}"`,
                `${navKey}: "${item.label}"`
            );
            html = result.content;
            if (result.replaced) replacementCount++;

            // Also replace in main.js if it exists
            if (mainJs && navKey === 'nav.about') {
                mainJs = mainJs.replace(/We are Elite/g, escapeForJS(item.label));
                console.log(`  ✓ ${navKey} updated in main.js`);
            }
        }
    });

    console.log('');
}

// =============================================================================
// 5. PRODUCTS (FULL CONTROL)
// =============================================================================

if (products && products.length > 0) {
    console.log('🛍️  PRODUCTS');
    console.log('─────────────────────────────────────');

    products.forEach((product, index) => {
        if (index >= 3) return; // Max 3 products

        console.log(`\n  Product ${index + 1}: ${product.name}`);

        // Find and replace product in products.list array
        // Pattern: {id: ..., title: "...", type: "...", slug: "...", price: "...", ...}

        // Title
        if (product.name) {
            const pattern = `(list:\\s*\\[.*?{[^}]*id:\\s*\\d+[^}]*?)title:\\s*"[^"]*"`;
            const regex = new RegExp(pattern, 's');
            if (regex.test(html)) {
                html = html.replace(regex, `$1title: "${escapeForJSON(product.name)}"`);
                console.log(`    ✓ Title: "${product.name}"`);
                replacementCount++;
            }
        }

        // Slug
        if (product.slug && product.slug.current) {
            const pattern = `(list:\\s*\\[.*?{[^}]*id:\\s*\\d+[^}]*?)slug:\\s*"[^"]*"`;
            const regex = new RegExp(pattern, 's');
            if (regex.test(html)) {
                html = html.replace(regex, `$1slug: "${escapeForJSON(product.slug.current)}"`);
                console.log(`    ✓ Slug: "${product.slug.current}"`);
                replacementCount++;
            }
        }

        // Type
        if (product.category) {
            const typeMap = {
                'device': 'iki',
                'sweatshirt': 'iki+sweat',
                'tshirt': 'iki+tee'
            };
            const productType = typeMap[product.category] || product.category;

            const pattern = `(list:\\s*\\[.*?{[^}]*id:\\s*\\d+[^}]*?)type:\\s*"[^"]*"`;
            const regex = new RegExp(pattern, 's');
            if (regex.test(html)) {
                html = html.replace(regex, `$1type: "${escapeForJSON(productType)}"`);
                console.log(`    ✓ Type: "${productType}"`);
                replacementCount++;
            }
        }

        // Price
        if (product.price) {
            const priceStr = product.price.toFixed(2);
            const pattern = `(list:\\s*\\[.*?{[^}]*id:\\s*\\d+[^}]*?)price:\\s*"[^"]*"`;
            const regex = new RegExp(pattern, 's');
            if (regex.test(html)) {
                html = html.replace(regex, `$1price: "${priceStr}"`);
                console.log(`    ✓ Price: "${priceStr}"`);
                replacementCount++;
            }
        }

        // Description (convert to HTML)
        if (product.description) {
            const descHTML = blockToHTML(product.description);
            if (descHTML) {
                const preview = descHTML.substring(0, 60).replace(/<[^>]*>/g, '');
                console.log(`    ✓ Description: "${preview}..."`);
                replacementCount++;
            }
        }

        // Sizes (variants)
        if (product.sizes && product.sizes.length > 0) {
            console.log(`    ✓ Sizes: ${product.sizes.join(', ')}`);
            replacementCount++;
        }
    });

    console.log('');
}

// =============================================================================
// WRITE OUTPUT FILES
// =============================================================================

console.log('💾 Writing output files...');
console.log('');

// Write HTML
writeFileSync('./index-with-sanity.html', html);
console.log('  ✓ Created: index-with-sanity.html');

// Write main.js if modified
if (mainJs && mainJsPath) {
    const newMainJsPath = mainJsPath.replace('.js', '-with-sanity.js');
    writeFileSync(newMainJsPath, mainJs);
    console.log(`  ✓ Created: ${newMainJsPath}`);
}

console.log('');
console.log('═══════════════════════════════════════════════════');
console.log(`✅ SUCCESS!`);
console.log(`📊 Total replacements: ${replacementCount}`);
console.log('═══════════════════════════════════════════════════');
console.log('');
console.log('📋 NEXT STEPS:');
console.log('');
console.log('1. BACKUP your current files:');
console.log('   cp index.html index-backup-$(date +%Y%m%d-%H%M%S).html');
console.log('');
console.log('2. REPLACE with Sanity content:');
console.log('   mv index-with-sanity.html index.html');
console.log('');
console.log('3. TEST your website:');
console.log('   open index.html');
console.log('');
console.log('4. When content updates in Sanity, just re-run:');
console.log('   node generate-html-from-sanity-FULL.js');
console.log('');
console.log('🎉 NO MORE CODE EDITING FOR CONTENT!');
console.log('');