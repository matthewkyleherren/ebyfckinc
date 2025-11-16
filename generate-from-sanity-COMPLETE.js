#!/usr/bin/env node

/**
 * Generate HTML with Sanity Content - FULL VERSION WITH PRODUCTS
 *
 * This script fetches ALL content from Sanity including products and injects
 * it into the HTML file by replacing the embedded __INITIAL_STATE__.
 *
 * This solves the limitation of minified React bundles that can't be modified
 * at runtime - instead we modify the HTML source before serving.
 *
 * Usage:
 *   node generate-html-from-sanity-FULL-new.js
 *
 * Output:
 *   Creates index-with-sanity.html with all Sanity content baked in
 */

import {
    readFileSync,
    writeFileSync
} from 'fs';

const SANITY_PROJECT_ID = 'duqxb9hm';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2025-02-06';

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Convert Sanity blocks to plain text
 */
function blockToText(blocks) {
    if (!blocks || !Array.isArray(blocks)) return '';
    return blocks
        .map(block => block.children?.map(child => child.text || '').join('') || '')
        .join(' ');
}

/**
 * Convert Sanity blocks to HTML
 * Handles paragraphs, headings, lists, and basic formatting
 */
function blockToHtml(blocks) {
    if (!blocks || !Array.isArray(blocks)) return '';

    let html = '';
    let inList = false;
    let listItems = [];

    blocks.forEach((block, idx) => {
        if (!block.children) return;

        // Build the text content with marks
        let content = '';
        block.children.forEach(child => {
            let text = child.text || '';

            // Apply marks (bold, italic, etc.)
            if (child.marks && child.marks.length > 0) {
                child.marks.forEach(mark => {
                    if (mark === 'strong') text = `<strong>${text}</strong>`;
                    if (mark === 'em') text = `<em>${text}</em>`;
                    if (mark === 'code') text = `<code>${text}</code>`;
                });
            }

            content += text;
        });

        // Handle list items
        if (block.listItem === 'bullet' || block.listItem === 'number') {
            if (!inList) {
                inList = true;
                listItems = [];
            }
            listItems.push(`<li>${content}</li>`);

            // If next block is not a list item, close the list
            const nextBlock = blocks[idx + 1];
            if (!nextBlock || !nextBlock.listItem) {
                html += `<ul>${listItems.join('')}</ul>`;
                inList = false;
                listItems = [];
            }
        } else {
            // Close any open list
            if (inList) {
                html += `<ul>${listItems.join('')}</ul>`;
                inList = false;
                listItems = [];
            }

            // Add block based on style
            if (block.style === 'h2') {
                html += `<h2>${content}</h2>`;
            } else if (block.style === 'h3') {
                html += `<h3>${content}</h3>`;
            } else {
                html += `<p>${content}</p>`;
            }
        }
    });

    return html.trim();
}

/**
 * Escape quotes and special characters for JSON embedding
 */
function escapeForJson(str) {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\')     // Escape backslashes first
        .replace(/"/g, '\\"')        // Escape double quotes
        .replace(/\n/g, '\\n')       // Escape newlines
        .replace(/\r/g, '')          // Remove carriage returns
        .replace(/\t/g, '\\t');      // Escape tabs
}

/**
 * Build Sanity image URL
 */
function buildImageUrl(imageRef) {
    if (!imageRef || !imageRef.asset) return null;

    // If it's a reference object with _ref
    const ref = imageRef.asset._ref || imageRef.asset._id || imageRef.asset;

    // Handle if it's already a full URL
    if (typeof ref === 'object' && ref.url) {
        return ref.url;
    }

    // Parse the reference: image-{assetId}-{dimensions}-{format}
    if (typeof ref !== 'string') return null;

    const parts = ref.split('-');
    if (parts.length < 4) return null;

    const assetId = parts[1];
    const dimensions = parts[2];
    const format = parts[3];

    return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${assetId}-${dimensions}.${format}`;
}

/**
 * Fetch from Sanity API
 */
async function fetchFromSanity(query) {
    const url = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.result;
}

/**
 * Transform Sanity product to HTML format
 */
function transformProduct(sanityProduct, index, discountRate = 10) {
    const price = parseFloat(sanityProduct.price || 0).toFixed(2);
    const priceWithDiscount = Math.round((sanityProduct.discountPrice || sanityProduct.price) * (1 - discountRate / 100));

    // Build images array
    const images = (sanityProduct.images || []).map((img, idx) => {
        const url = buildImageUrl(img);
        return {
            id: 9000000000000 + (index * 10000) + idx,
            position: idx + 1,
            alt: img.alt || null,
            width: 1920,
            height: 1080,
            src: url,
            variant_ids: []
        };
    });

    // Build variants array
    const variants = (sanityProduct.sizes || []).map((size, idx) => {
        return {
            id: 0xbd8000000000 + (index * 10000) + idx,
            title: size
        };
    });

    // If no sizes, add a default variant
    if (variants.length === 0) {
        variants.push({
            id: 0xbd8000000000 + (index * 10000),
            title: 'Default Title'
        });
    }

    // Convert description to HTML
    const description = blockToHtml(sanityProduct.description);

    // Map category to type
    const categoryMap = {
        'device': 'iki',
        'sweatshirt': 'iki+sweat',
        'tshirt': 'iki+tee'
    };

    return {
        id: 2286720000000 + (index * 10000),
        title: sanityProduct.name,
        type: categoryMap[sanityProduct.category] || 'iki',
        slug: sanityProduct.slug?.current || sanityProduct.name.toLowerCase(),
        price: price,
        disabled: !(sanityProduct.inStock !== false),
        priceWithDiscount: priceWithDiscount,
        description: description,
        metaDescription: sanityProduct.seo?.metaDescription || blockToText(sanityProduct.description),
        variants: variants,
        images: images
    };
}

// =============================================================================
// MAIN SCRIPT
// =============================================================================

console.log('= Fetching content from Sanity...');
console.log('');

// Fetch all content in parallel
const [siteSettings, about, faqs, navigationMenu, products] = await Promise.all([
    fetchFromSanity(`*[_type == "siteSettings"][0]`),
    fetchFromSanity(`*[_type == "aboutSection"][0]`),
    fetchFromSanity(`*[_type == "faqItem"] | order(order asc)`),
    fetchFromSanity(`*[_type == "navigationMenu"][0]`),
    fetchFromSanity(`*[_type == "product"] | order(order asc){
        _id,
        name,
        slug,
        category,
        price,
        discountPrice,
        currency,
        description,
        features,
        sizes,
        colors,
        images[]{
            asset->{
                _id,
                _ref,
                url
            },
            alt,
            caption
        },
        inStock,
        featured,
        order,
        seo
    }`)
]);

console.log(' Content fetched successfully');
console.log('  Site Settings:', siteSettings?.brandName || 'Not found');
console.log('  About Section:', about?.title || 'Not found');
console.log('  FAQ Items:', faqs?.length || 0);
console.log('  Navigation:', navigationMenu ? 'Found' : 'Not found');
console.log('  Products:', products?.length || 0);
console.log('');

// Read the template HTML
const html = readFileSync('./index.html', 'utf8');

console.log('=Ý Applying content replacements...');
console.log('');

let updatedHtml = html;
let replacements = 0;

// =============================================================================
// SITE SETTINGS
// =============================================================================

if (siteSettings) {
    console.log('=' Site Settings:');

    // Tagline (header top text)
    if (siteSettings.tagline) {
        const escaped = escapeForJson(siteSettings.tagline);
        updatedHtml = updatedHtml.replace(
            /"header\.topText": "[^"]*"/,
            `"header.topText": "${escaped}"`
        );
        replacements++;
        console.log(`   Tagline: "${siteSettings.tagline}"`);
    }

    // Brand hashtag
    if (siteSettings.hashtag) {
        const escaped = escapeForJson(siteSettings.hashtag);
        updatedHtml = updatedHtml.replace(
            /"common\.wearTrbl": "[^"]*"/,
            `"common.wearTrbl": "${escaped}"`
        );
        replacements++;
        console.log(`   Hashtag: "${siteSettings.hashtag}"`);
    }

    // Lookbook call to action
    if (siteSettings.lookbookCallToAction) {
        const escaped = escapeForJson(siteSettings.lookbookCallToAction);
        updatedHtml = updatedHtml.replace(
            /"lookbook\.question": "[^"]*"/,
            `"lookbook.question": "${escaped}"`
        );
        replacements++;
        console.log(`   Lookbook CTA: "${siteSettings.lookbookCallToAction}"`);
    }

    // Contact email
    if (siteSettings.contactEmail) {
        const escaped = escapeForJson(siteSettings.contactEmail);
        updatedHtml = updatedHtml.replace(
            /"contacts\.email": "[^"]*"/,
            `"contacts.email": "${escaped}"`
        );
        replacements++;
        console.log(`   Contact Email: "${siteSettings.contactEmail}"`);
    }

    // Store address
    if (siteSettings.storeAddress && !siteSettings.storeAddress.isOnlineOnly) {
        const addr = siteSettings.storeAddress;

        if (addr.street) {
            const escaped = escapeForJson(addr.street);
            updatedHtml = updatedHtml.replace(
                /"contacts\.text-0": "[^"]*"/,
                `"contacts.text-0": "${escaped}"`
            );
            replacements++;
            console.log(`   Address Line 1: "${addr.street}"`);
        }

        if (addr.city && addr.postalCode) {
            const escaped = escapeForJson(`${addr.city}, ${addr.postalCode}`);
            updatedHtml = updatedHtml.replace(
                /"contacts\.text-1": "[^"]*"/,
                `"contacts.text-1": "${escaped}"`
            );
            replacements++;
            console.log(`   Address Line 2: "${addr.city}, ${addr.postalCode}"`);
        }

        if (addr.country) {
            const escaped = escapeForJson(addr.country.toLowerCase());
            updatedHtml = updatedHtml.replace(
                /"contacts\.text-2": "[^"]*"/,
                `"contacts.text-2": "${escaped}"`
            );
            replacements++;
            console.log(`   Country: "${addr.country}"`);
        }
    }

    // Store hours
    if (siteSettings.storeHours && !siteSettings.storeHours.isAlwaysOpen) {
        const hours = siteSettings.storeHours;

        if (hours.monday) {
            const escaped = escapeForJson(hours.monday);
            updatedHtml = updatedHtml.replace(
                /"contacts\.text-3": "[^"]*"/,
                `"contacts.text-3": "${escaped}"`
            );
            replacements++;
            console.log(`   Weekday Hours: "${hours.monday}"`);
        }

        if (hours.saturday) {
            const escaped = escapeForJson(hours.saturday);
            updatedHtml = updatedHtml.replace(
                /"contacts\.text-4": "[^"]*"/,
                `"contacts.text-4": "${escaped}"`
            );
            replacements++;
            console.log(`   Saturday Hours: "${hours.saturday}"`);
        }

        if (hours.sunday) {
            const escaped = escapeForJson(hours.sunday);
            updatedHtml = updatedHtml.replace(
                /"contacts\.text-5": "[^"]*"/,
                `"contacts.text-5": "${hours.sunday}"`
            );
            replacements++;
            console.log(`   Sunday Hours: "${hours.sunday}"`);
        }
    }

    // Preloader text
    if (siteSettings.brandName) {
        const escaped = escapeForJson(`Loading ${siteSettings.brandName}`);
        updatedHtml = updatedHtml.replace(
            /"preloader\.loading": "[^"]*"/,
            `"preloader.loading": "${escaped}"`
        );
        replacements++;
        console.log(`   Loading Text: "Loading ${siteSettings.brandName}"`);
    }

    // Discount rate
    const discountRate = siteSettings.discountRate || 10;
    updatedHtml = updatedHtml.replace(
        /discount: \d+/,
        `discount: ${discountRate}`
    );
    replacements++;
    console.log(`   Discount Rate: ${discountRate}%`);

    console.log('');
}

// =============================================================================
// ABOUT SECTION
// =============================================================================

if (about) {
    console.log('=Ö About Section:');

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
            const escaped = escapeForJson(text);
            updatedHtml = updatedHtml.replace(
                new RegExp(`"about\\.text-${index}": "[^"]*"`),
                `"about.text-${index}": "${escaped}"`
            );
            replacements++;
            const preview = text.length > 60 ? text.substring(0, 60) + '...' : text;
            console.log(`   Paragraph ${index + 1}: "${preview}"`);
        }
    });

    console.log('');
}

// =============================================================================
// FAQ SECTION
// =============================================================================

if (faqs && faqs.length > 0) {
    console.log('S FAQ Section:');

    faqs.forEach((faq, index) => {
        const faqNum = index + 1;

        // Replace question
        if (faq.question) {
            const escaped = escapeForJson(faq.question);
            const pattern = new RegExp(`"faq\\.question-${faqNum}": "[^"]*"`);
            if (updatedHtml.match(pattern)) {
                updatedHtml = updatedHtml.replace(pattern, `"faq.question-${faqNum}": "${escaped}"`);
                replacements++;
                console.log(`   Q${faqNum}: "${faq.question}"`);
            }
        }

        // Replace answer
        if (faq.answer) {
            const answerText = blockToText(faq.answer);
            const escaped = escapeForJson(answerText);
            const pattern = new RegExp(`"faq\\.answer-${faqNum}": "[^"]*"`);
            if (updatedHtml.match(pattern)) {
                updatedHtml = updatedHtml.replace(pattern, `"faq.answer-${faqNum}": "${escaped}"`);
                replacements++;
                const preview = answerText.length > 50 ? answerText.substring(0, 50) + '...' : answerText;
                console.log(`     A${faqNum}: "${preview}"`);
            }
        }
    });

    console.log('');
}

// =============================================================================
// NAVIGATION
// =============================================================================

if (navigationMenu && navigationMenu.menuItems) {
    console.log('>í Navigation Menu:');

    const menuItems = navigationMenu.menuItems;

    // Map menu items to nav keys based on position
    const navMappings = [{
            navKey: 'nav.about',
            label: menuItems[0]?.label
        },
        {
            navKey: 'nav.faq',
            label: menuItems[1]?.label
        },
        {
            navKey: 'nav.lookbook',
            label: menuItems[2]?.label
        },
        {
            navKey: 'nav.contacts',
            label: menuItems[3]?.label
        }
    ];

    navMappings.forEach(({
        navKey,
        label
    }) => {
        if (label) {
            const escaped = escapeForJson(label);
            const pattern = new RegExp(`"${navKey.replace('.', '\\.')}": "[^"]*"`);
            if (updatedHtml.match(pattern)) {
                updatedHtml = updatedHtml.replace(pattern, `"${navKey}": "${escaped}"`);
                replacements++;
                console.log(`   ${navKey}: "${label}"`);
            }
        }
    });

    console.log('');
}

// =============================================================================
// PRODUCTS
// =============================================================================

if (products && products.length > 0) {
    console.log('=Í Products:');

    const discountRate = siteSettings?.discountRate || 10;
    const transformedProducts = products.map((product, index) =>
        transformProduct(product, index, discountRate)
    );

    // Convert products array to JSON - properly formatted
    const productsJson = JSON.stringify(transformedProducts, null, 20)
        .replace(/\n {20}/g, '\n                    ')
        .replace(/\n {40}/g, '\n                        ')
        .replace(/\n {60}/g, '\n                            ')
        .replace(/\n {80}/g, '\n                                ');

    // Replace the entire products list array
    const productsPattern = /list: \[\{[\s\S]*?\}\]/;
    updatedHtml = updatedHtml.replace(productsPattern, `list: ${productsJson}`);
    replacements++;

    console.log(`   Replaced products array with ${transformedProducts.length} products:`);
    transformedProducts.forEach((product, idx) => {
        console.log(`     ${idx + 1}. ${product.title} - ¬${product.price} (${product.images.length} images, ${product.variants.length} variants)`);
    });

    console.log('');
} else {
    console.log('  No products found in Sanity - keeping existing products in HTML');
    console.log('');
}

// =============================================================================
// WRITE OUTPUT
// =============================================================================

writeFileSync('./index-with-sanity.html', updatedHtml);

console.log('');
console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
console.log(` Success! Generated: index-with-sanity.html`);
console.log(`=Ê Total replacements: ${replacements}`);
console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
console.log('');
console.log('=Ë Next Steps:');
console.log('');
console.log('1. Test the generated file:');
console.log('   python3 -m http.server 8000');
console.log('   open http://localhost:8000/index-with-sanity.html');
console.log('');
console.log('2. If it looks good, replace the original:');
console.log('   mv index.html index-backup-$(date +%Y%m%d-%H%M%S).html');
console.log('   mv index-with-sanity.html index.html');
console.log('');
console.log('3. To regenerate after Sanity updates:');
console.log('   node generate-html-from-sanity-FULL-new.js');
console.log('');
