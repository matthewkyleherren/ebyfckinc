#!/usr/bin/env node

/**
 * Sanity CMS → Website Content Generator
 *
 * Manages ALL website content through Sanity CMS
 * No more editing code for content changes!
 */

import {
    readFileSync,
    writeFileSync,
    readdirSync,
    copyFileSync
} from 'fs';
import {
    join,
    basename
} from 'path';

const CONFIG = {
    projectId: 'duqxb9hm',
    dataset: 'production',
    apiVersion: '2025-02-06'
};

// =============================================================================
// UTILITIES
// =============================================================================

function escapeJSON(str) {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, ' ')
        .replace(/\r/g, '')
        .replace(/\t/g, ' ');
}

function blockToText(blocks) {
    if (!blocks || !Array.isArray(blocks)) return '';
    return blocks
        .map(b => b.children?.map(c => c.text || '').join('') || '')
        .filter(t => t)
        .join('\n');
}

function blockToHTML(blocks) {
    if (!blocks || !Array.isArray(blocks)) return '';

    let html = '';
    let inList = false;

    blocks.forEach(block => {
        if (!block.children) return;

        const text = block.children.map(c => {
            let t = c.text || '';
            if (c.marks?.includes('strong')) t = `<strong>${t}</strong>`;
            if (c.marks?.includes('em')) t = `<em>${t}</em>`;
            return t;
        }).join('');

        if (block.listItem === 'bullet') {
            if (!inList) {
                html += '<ul>';
                inList = true;
            }
            html += `<li>${text}</li>`;
        } else {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            if (block.style === 'h2') html += `<h2>${text}</h2>`;
            else if (block.style === 'h3') html += `<h3>${text}</h3>`;
            else if (text) html += `<p>${text}</p>`;
        }
    });

    if (inList) html += '</ul>';
    return html;
}

async function fetchSanity(query) {
    const url = `https://${CONFIG.projectId}.apicdn.sanity.io/v${CONFIG.apiVersion}/data/query/${CONFIG.dataset}?query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.result;
}

function replaceInContent(content, pattern, replacement, description) {
    const regex = new RegExp(pattern, 'g');
    const matches = content.match(regex);

    if (matches) {
        const newContent = content.replace(regex, replacement);
        console.log(`  ✓ ${description} (${matches.length} occurrence${matches.length > 1 ? 's' : ''})`);
        return {
            content: newContent,
            count: matches.length
        };
    }

    return {
        content,
        count: 0
    };
}

// =============================================================================
// MAIN
// =============================================================================

console.log('');
console.log('═══════════════════════════════════════════════════');
console.log('🎨 SANITY CMS CONTENT GENERATOR');
console.log('═══════════════════════════════════════════════════');
console.log('');

// Fetch content
console.log('📥 Fetching content from Sanity...');
const [siteSettings, about, faqs, products, nav] = await Promise.all([
    fetchSanity(`*[_type == "siteSettings"][0]`),
    fetchSanity(`*[_type == "aboutSection"][0]`),
    fetchSanity(`*[_type == "faqItem"] | order(order asc)`),
    fetchSanity(`*[_type == "product"] | order(order asc)`),
    fetchSanity(`*[_type == "navigationMenu"][0]`)
]);

console.log('');
console.log('✅ Content loaded:');
console.log(`   Site Settings: ${siteSettings?.brandName || 'none'}`);
console.log(`   About: ${about?.title || 'none'}`);
console.log(`   FAQs: ${faqs?.length || 0} items`);
console.log(`   Products: ${products?.length || 0} items`);
console.log(`   Navigation: ${nav ? 'yes' : 'none'}`);
console.log('');

// Read files
console.log('📂 Reading files...');
let html = readFileSync('./index.html', 'utf8');

const assetsDir = './assets';
const mainJsFile = readdirSync(assetsDir).find(f => /^main\.[a-f0-9]+\.js$/.test(f));
let mainJs = null;

if (mainJsFile) {
    mainJs = readFileSync(join(assetsDir, mainJsFile), 'utf8');
    console.log(`   ✓ ${mainJsFile}`);
}
console.log('');

let total = 0;

// =============================================================================
// REPLACEMENTS
// =============================================================================

if (siteSettings) {
    console.log('⚙️  Site Settings');
    console.log('─────────────────────────────────────');

    // Page title
    if (siteSettings.brandName) {
        let r = replaceInContent(html, /<title[^>]*>.*?<\/title>/,
            `<title data-react-helmet="true">HOME | ${escapeJSON(siteSettings.brandName)}</title>`,
            `Title: "${siteSettings.brandName}"`);
        html = r.content;
        total += r.count;
    }

    // Meta description
    if (siteSettings.tagline) {
        let r = replaceInContent(html, /<meta[^>]*name="description"[^>]*content="[^"]*"/,
            `<meta data-react-helmet="true" name="description" content="${escapeJSON(siteSettings.tagline)}"`,
            'Meta description');
        html = r.content;
        total += r.count;
    }

    // Tagline
    if (siteSettings.tagline) {
        let r = replaceInContent(html, /"header\.topText":\s*"[^"]*"/,
            `"header.topText": "${escapeJSON(siteSettings.tagline)}"`,
            'Tagline');
        html = r.content;
        total += r.count;
    }

    // Hashtag
    if (siteSettings.hashtag) {
        let r = replaceInContent(html, /"common\.wearTrbl":\s*"[^"]*"/,
            `"common.wearTrbl": "${escapeJSON(siteSettings.hashtag)}"`,
            'Hashtag');
        html = r.content;
        total += r.count;
    }

    // Email
    if (siteSettings.contactEmail) {
        let r = replaceInContent(html, /"contacts\.email":\s*"[^"]*"/,
            `"contacts.email": "${escapeJSON(siteSettings.contactEmail)}"`,
            'Email');
        html = r.content;
        total += r.count;
    }

    // Loading text
    if (siteSettings.brandName) {
        let r = replaceInContent(html, /"preloader\.loading":\s*"[^"]*"/,
            `"preloader.loading": "Loading ${escapeJSON(siteSettings.brandName)}"`,
            'Loading text');
        html = r.content;
        total += r.count;
    }

    // Lookbook CTA
    if (siteSettings.lookbookCallToAction) {
        let r = replaceInContent(html, /"lookbook\.question":\s*"[^"]*"/,
            `"lookbook.question": "${escapeJSON(siteSettings.lookbookCallToAction)}"`,
            'Lookbook CTA');
        html = r.content;
        total += r.count;
    }

    // Address
    if (siteSettings.storeAddress && !siteSettings.storeAddress.isOnlineOnly) {
        const a = siteSettings.storeAddress;

        if (a.street) {
            let r = replaceInContent(html, /"contacts\.text-0":\s*"[^"]*"/,
                `"contacts.text-0": "${escapeJSON(a.street)}"`,
                'Address line 1');
            html = r.content;
            total += r.count;
        }

        if (a.city && a.postalCode) {
            let r = replaceInContent(html, /"contacts\.text-1":\s*"[^"]*"/,
                `"contacts.text-1": "${escapeJSON(a.postalCode + ' ' + a.city)}"`,
                'Address line 2');
            html = r.content;
            total += r.count;
        }

        if (a.country) {
            let r = replaceInContent(html, /"contacts\.text-2":\s*"[^"]*"/,
                `"contacts.text-2": "${escapeJSON(a.country.toLowerCase())}"`,
                'Country');
            html = r.content;
            total += r.count;
        }
    }

    // Hours
    if (siteSettings.storeHours) {
        const h = siteSettings.storeHours;

        if (h.monday) {
            let r = replaceInContent(html, /"contacts\.text-3":\s*"[^"]*"/,
                `"contacts.text-3": "Monday — Friday: ${escapeJSON(h.monday)}"`,
                'Weekday hours');
            html = r.content;
            total += r.count;
        }

        if (h.saturday) {
            let r = replaceInContent(html, /"contacts\.text-4":\s*"[^"]*"/,
                `"contacts.text-4": "Saturday: ${escapeJSON(h.saturday)}"`,
                'Saturday hours');
            html = r.content;
            total += r.count;
        }

        if (h.sunday) {
            let r = replaceInContent(html, /"contacts\.text-5":\s*"[^"]*"/,
                `"contacts.text-5": "Sunday: ${escapeJSON(h.sunday)}"`,
                'Sunday hours');
            html = r.content;
            total += r.count;
        }
    }

    console.log('');
}

if (about) {
    console.log('📖 About Section');
    console.log('─────────────────────────────────────');

    ['paragraph1', 'paragraph2', 'paragraph3', 'paragraph4'].forEach((key, i) => {
        const text = blockToText(about[key]);
        if (text) {
            let r = replaceInContent(html, `"about\\.text-${i}":\\s*"[^"]*"`,
                `"about.text-${i}": "${escapeJSON(text)}"`,
                `Paragraph ${i + 1}`);
            html = r.content;
            total += r.count;
        }
    });

    console.log('');
}

if (faqs && faqs.length > 0) {
    console.log('❓ FAQ Section');
    console.log('─────────────────────────────────────');

    faqs.slice(0, 15).forEach((faq, i) => {
        const num = i + 1;

        if (faq.question) {
            let r = replaceInContent(html, `"faq\\.question-${num}":\\s*"[^"]*"`,
                `"faq.question-${num}": "${escapeJSON(faq.question)}"`,
                `Q${num}`);
            html = r.content;
            total += r.count;
        }

        if (faq.answer) {
            const text = blockToText(faq.answer);
            let r = replaceInContent(html, `"faq\\.answer-${num}":\\s*"[^"]*"`,
                `"faq.answer-${num}": "${escapeJSON(text)}"`,
                `A${num}`);
            html = r.content;
            total += r.count;
        }
    });

    console.log('');
}

if (nav && nav.menuItems) {
    console.log('🧭 Navigation');
    console.log('─────────────────────────────────────');

    const items = nav.menuItems;
    const mappings = [{
            key: 'nav.about',
            item: items[0],
            jsReplace: true
        },
        {
            key: 'nav.faq',
            item: items[1]
        },
        {
            key: 'nav.lookbook',
            item: items[2]
        },
        {
            key: 'nav.contacts',
            item: items[3]
        },
        {
            key: 'nav.collection',
            item: items[4]
        }
    ];

    mappings.forEach(({
        key,
        item,
        jsReplace
    }) => {
        if (item && item.label) {
            let r = replaceInContent(html, `"${key.replace('.', '\\.')}":\\s*"[^"]*"`,
                `"${key}": "${escapeJSON(item.label)}"`,
                key);
            html = r.content;
            total += r.count;

            // Also update in main.js for nav.about
            if (jsReplace && mainJs) {
                const before = mainJs.length;
                mainJs = mainJs.replace(/We are Elite/g, item.label);
                const after = mainJs.length;
                if (before !== after) {
                    console.log(`  ✓ ${key} in main.js`);
                    total++;
                }
            }
        }
    });

    console.log('');
}

if (products && products.length > 0) {
    console.log('🛍️  Products');
    console.log('─────────────────────────────────────');

    // Product mapping by ID
    const productMap = {
        2286722121785: {
            index: 0,
            name: 'IKI (Device)'
        },
        1362777243705: {
            index: 1,
            name: 'SWEAT'
        },
        1362932498489: {
            index: 2,
            name: 'TEE'
        }
    };

    products.slice(0, 3).forEach((product, idx) => {
        console.log(`\n  Product ${idx + 1}: ${product.name}`);

        // Match by index position in the array
        // This is tricky - we need to find the Nth product object

        // Title replacement
        if (product.name) {
            const titlePattern = `(list:\\s*\\[[^\\]]*id:\\s*\\d+[^}]*?)title:\\s*"[^"]*"`;
            console.log(`    • Title: "${product.name}"`);
        }

        // Price
        if (product.price) {
            console.log(`    • Price: ${product.price}`);
        }

        // Slug
        if (product.slug?.current) {
            console.log(`    • Slug: "${product.slug.current}"`);
        }

        // Type/Category
        if (product.category) {
            const typeMap = {
                'device': 'iki',
                'sweatshirt': 'iki+sweat',
                'tshirt': 'iki+tee'
            };
            console.log(`    • Type: "${typeMap[product.category] || product.category}"`);
        }

        // Sizes
        if (product.sizes && product.sizes.length > 0) {
            console.log(`    • Sizes: ${product.sizes.join(', ')}`);
        }
    });

    console.log('');
    console.log('  ⚠️  Note: Product replacement requires complex regex');
    console.log('      Currently showing what would be replaced');
    console.log('');
}

// =============================================================================
// WRITE OUTPUT
// =============================================================================

console.log('💾 Writing files...');

// Backup original
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
copyFileSync('./index.html', `./index-backup-${timestamp}.html`);
console.log(`   ✓ Backup: index-backup-${timestamp}.html`);

// Write new HTML
writeFileSync('./index-with-sanity.html', html);
console.log('   ✓ Generated: index-with-sanity.html');

// Write main.js if modified
if (mainJs && mainJsFile) {
    const newPath = join(assetsDir, mainJsFile.replace('.js', '-with-sanity.js'));
    writeFileSync(newPath, mainJs);
    console.log(`   ✓ Generated: ${basename(newPath)}`);
}

console.log('');
console.log('═══════════════════════════════════════════════════');
console.log(`✅ SUCCESS - ${total} replacements made`);
console.log('═══════════════════════════════════════════════════');
console.log('');
console.log('🚀 To apply changes:');
console.log('');
console.log('   mv index-with-sanity.html index.html');
if (mainJs) {
    console.log(`   mv assets/${mainJsFile.replace('.js', '-with-sanity.js')} assets/${mainJsFile}`);
}
console.log('');
console.log('💡 Then refresh your browser!');
console.log('');