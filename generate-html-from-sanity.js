#!/usr/bin/env node

/**
 * Generate HTML with Sanity Content
 *
 * This script fetches content from Sanity and injects it into the HTML file
 * by replacing the embedded __INITIAL_STATE__ content strings.
 *
 * This solves the limitation of minified React bundles that can't be modified
 * at runtime - instead we modify the HTML source before serving.
 *
 * Usage:
 *   node generate-html-from-sanity.js
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

// Helper to convert Sanity blocks to plain text
function blockToText(blocks) {
    if (!blocks || !Array.isArray(blocks)) return '';
    return blocks
        .map(block => block.children?.map(child => child.text || '').join('') || '')
        .join(' ');
}

// Helper to escape quotes for JSON embedding
function escapeQuotes(str) {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\') // Escape backslashes first
        .replace(/"/g, '\\"') // Escape double quotes
        .replace(/\n/g, ' ') // Replace newlines with spaces
        .replace(/\r/g, ''); // Remove carriage returns
}

// Fetch from Sanity
async function fetchFromSanity(query) {
    const url = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.result;
}

console.log('🔄 Fetching content from Sanity...');
console.log('');

// Fetch all content in parallel
const [siteSettings, about, faqs, navigationMenu] = await Promise.all([
    fetchFromSanity(`*[_type == "siteSettings"][0]`),
    fetchFromSanity(`*[_type == "aboutSection"][0]`),
    fetchFromSanity(`*[_type == "faqItem"] | order(order asc)`),
    fetchFromSanity(`*[_type == "navigationMenu"][0]`)
]);

console.log('✅ Content fetched successfully');
console.log('  Site Settings:', siteSettings?.brandName || 'Not found');
console.log('  About Section:', about?.title || 'Not found');
console.log('  FAQ Items:', faqs?.length || 0);
console.log('  Navigation:', navigationMenu ? 'Found' : 'Not found');
console.log('');

// Read the template HTML
const html = readFileSync('./index.html', 'utf8');

console.log('📝 Applying content replacements...');
console.log('');

let updatedHtml = html;
let replacements = 0;

// =============================================================================
// SITE SETTINGS
// =============================================================================

if (siteSettings) {
    console.log('🔧 Site Settings:');

    // Tagline (header top text)
    if (siteSettings.tagline) {
        const escaped = escapeQuotes(siteSettings.tagline);
        updatedHtml = updatedHtml.replace(
            /"header\.topText": "[^"]*"/,
            `"header.topText": "${escaped}"`
        );
        replacements++;
        console.log(`  ✓ Tagline: "${siteSettings.tagline}"`);
    }

    // Brand hashtag
    if (siteSettings.hashtag) {
        const escaped = escapeQuotes(siteSettings.hashtag);
        updatedHtml = updatedHtml.replace(
            /"common\.wearTrbl": "[^"]*"/,
            `"common.wearTrbl": "${escaped}"`
        );
        replacements++;
        console.log(`  ✓ Hashtag: "${siteSettings.hashtag}"`);
    }

    // Lookbook call to action
    if (siteSettings.lookbookCallToAction) {
        const escaped = escapeQuotes(siteSettings.lookbookCallToAction);
        updatedHtml = updatedHtml.replace(
            /"lookbook\.question": "[^"]*"/,
            `"lookbook.question": "${escaped}"`
        );
        replacements++;
        console.log(`  ✓ Lookbook CTA: "${siteSettings.lookbookCallToAction}"`);
    }

    // Contact email
    if (siteSettings.contactEmail) {
        const escaped = escapeQuotes(siteSettings.contactEmail);
        updatedHtml = updatedHtml.replace(
            /"contacts\.email": "[^"]*"/,
            `"contacts.email": "${escaped}"`
        );
        replacements++;
        console.log(`  ✓ Contact Email: "${siteSettings.contactEmail}"`);
    }

    // Store address
    if (siteSettings.storeAddress && !siteSettings.storeAddress.isOnlineOnly) {
        const addr = siteSettings.storeAddress;

        if (addr.street) {
            const escaped = escapeQuotes(addr.street);
            updatedHtml = updatedHtml.replace(
                /"contacts\.text-0": "[^"]*"/,
                `"contacts.text-0": "${escaped}"`
            );
            replacements++;
            console.log(`  ✓ Address Line 1: "${addr.street}"`);
        }

        if (addr.city && addr.postalCode) {
            const escaped = escapeQuotes(`${addr.city}, ${addr.postalCode}`);
            updatedHtml = updatedHtml.replace(
                /"contacts\.text-1": "[^"]*"/,
                `"contacts.text-1": "${escaped}"`
            );
            replacements++;
            console.log(`  ✓ Address Line 2: "${addr.city}, ${addr.postalCode}"`);
        }

        if (addr.country) {
            const escaped = escapeQuotes(addr.country.toLowerCase());
            updatedHtml = updatedHtml.replace(
                /"contacts\.text-2": "[^"]*"/,
                `"contacts.text-2": "${escaped}"`
            );
            replacements++;
            console.log(`  ✓ Country: "${addr.country}"`);
        }
    }

    // Store hours
    if (siteSettings.storeHours && !siteSettings.storeHours.isAlwaysOpen) {
        const hours = siteSettings.storeHours;

        if (hours.monday) {
            const escaped = escapeQuotes(hours.monday);
            updatedHtml = updatedHtml.replace(
                /"contacts\.text-3": "[^"]*"/,
                `"contacts.text-3": "${escaped}"`
            );
            replacements++;
            console.log(`  ✓ Weekday Hours: "${hours.monday}"`);
        }

        if (hours.saturday) {
            const escaped = escapeQuotes(hours.saturday);
            updatedHtml = updatedHtml.replace(
                /"contacts\.text-4": "[^"]*"/,
                `"contacts.text-4": "${escaped}"`
            );
            replacements++;
            console.log(`  ✓ Saturday Hours: "${hours.saturday}"`);
        }

        if (hours.sunday) {
            const escaped = escapeQuotes(hours.sunday);
            updatedHtml = updatedHtml.replace(
                /"contacts\.text-5": "[^"]*"/,
                `"contacts.text-5": "${escaped}"`
            );
            replacements++;
            console.log(`  ✓ Sunday Hours: "${hours.sunday}"`);
        }
    }

    // Preloader text
    if (siteSettings.brandName) {
        const escaped = escapeQuotes(`Loading ${siteSettings.brandName}`);
        updatedHtml = updatedHtml.replace(
            /"preloader\.loading": "[^"]*"/,
            `"preloader.loading": "${escaped}"`
        );
        replacements++;
        console.log(`  ✓ Loading Text: "Loading ${siteSettings.brandName}"`);
    }

    console.log('');
}

// =============================================================================
// ABOUT SECTION
// =============================================================================

if (about) {
    console.log('📖 About Section:');

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
            const escaped = escapeQuotes(text);
            updatedHtml = updatedHtml.replace(
                new RegExp(`"about\\.text-${index}": "[^"]*"`),
                `"about.text-${index}": "${escaped}"`
            );
            replacements++;
            const preview = text.length > 60 ? text.substring(0, 60) + '...' : text;
            console.log(`  ✓ Paragraph ${index + 1}: "${preview}"`);
        }
    });

    console.log('');
}

// =============================================================================
// FAQ SECTION
// =============================================================================

if (faqs && faqs.length > 0) {
    console.log('❓ FAQ Section:');

    faqs.forEach((faq, index) => {
        const faqNum = index + 1;

        // Replace question
        if (faq.question) {
            const escaped = escapeQuotes(faq.question);
            const pattern = new RegExp(`"faq\\.question-${faqNum}": "[^"]*"`);
            if (updatedHtml.match(pattern)) {
                updatedHtml = updatedHtml.replace(pattern, `"faq.question-${faqNum}": "${escaped}"`);
                replacements++;
                console.log(`  ✓ Q${faqNum}: "${faq.question}"`);
            }
        }

        // Replace answer
        if (faq.answer) {
            const answerText = blockToText(faq.answer);
            const escaped = escapeQuotes(answerText);
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
    console.log('🧭 Navigation Menu:');

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
            const escaped = escapeQuotes(label);
            const pattern = new RegExp(`"${navKey.replace('.', '\\.')}": "[^"]*"`);
            if (updatedHtml.match(pattern)) {
                updatedHtml = updatedHtml.replace(pattern, `"${navKey}": "${escaped}"`);
                replacements++;
                console.log(`  ✓ ${navKey}: "${label}"`);
            }
        }
    });

    console.log('');
}

// =============================================================================
// WRITE OUTPUT
// =============================================================================

writeFileSync('./index-with-sanity.html', updatedHtml);

console.log('');
console.log('═══════════════════════════════════════════════════');
console.log(`✅ Success! Generated: index-with-sanity.html`);
console.log(`📊 Total replacements: ${replacements}`);
console.log('═══════════════════════════════════════════════════');
console.log('');
console.log('📋 Next Steps:');
console.log('');
console.log('1. Test the generated file:');
console.log('   open http://localhost:8000/index-with-sanity.html');
console.log('');
console.log('2. If it looks good, replace the original:');
console.log('   mv index.html index-original.html');
console.log('   mv index-with-sanity.html index.html');
console.log('');
console.log('3. To regenerate after Sanity updates:');
console.log('   node generate-html-from-sanity.js');
console.log('');