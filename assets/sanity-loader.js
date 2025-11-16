/**
 * Sanity CMS Content Loader
 *
 * This script fetches content from Sanity.io and injects it into window.__INITIAL_STATE__
 * before the React app initializes, allowing the CMS to control all site content
 * without modifying the minified React bundles.
 *
 * Usage:
 * 1. Replace SANITY_PROJECT_ID with your actual project ID
 * 2. Load this script AFTER __INITIAL_STATE__ but BEFORE React bundles
 * 3. Content will be fetched and injected automatically
 */

(async function() {
    'use strict';

    // ============================================================================
    // CONFIGURATION
    // ============================================================================

    const CONFIG = {
        projectId: 'duqxb9hm',
        dataset: 'production',
        apiVersion: '2025-02-06',
        useCdn: true, // Use CDN for faster responses
        debug: true // Set to false in production
    };

    // ============================================================================
    // UTILITY FUNCTIONS
    // ============================================================================

    /**
     * Log messages in debug mode
     */
    function log(message, data = null) {
        if (CONFIG.debug) {
            console.log(`[Sanity Loader] ${message}`, data || '');
        }
    }

    /**
     * Log errors
     */
    function error(message, err = null) {
        console.error(`[Sanity Loader] ❌ ${message}`, err || '');
    }

    /**
     * Build Sanity image URL with transformations
     */
    function buildImageUrl(asset, options = {}) {
        if (!asset || !asset.url) return '';

        const {
            width,
            height,
            quality = 85,
            format = 'webp',
            fit = 'max'
        } = options;

        let url = asset.url;
        const params = [];

        if (width) params.push(`w=${width}`);
        if (height) params.push(`h=${height}`);
        if (quality) params.push(`q=${quality}`);
        if (format) params.push(`fm=${format}`);
        if (fit) params.push(`fit=${fit}`);

        return params.length > 0 ? `${url}?${params.join('&')}` : url;
    }

    /**
     * Convert Sanity block content to HTML
     */
    function blockToHtml(blocks) {
        if (!blocks || !Array.isArray(blocks)) return '';

        return blocks.map(block => {
            if (block._type !== 'block') return '';

            const text = block.children
                .map(child => {
                    let content = child.text || '';

                    // Apply marks (bold, italic, etc.)
                    if (child.marks && child.marks.length > 0) {
                        child.marks.forEach(mark => {
                            if (mark === 'strong') content = `<strong>${content}</strong>`;
                            if (mark === 'em') content = `<em>${content}</em>`;
                            if (mark === 'code') content = `<code>${content}</code>`;
                        });
                    }

                    return content;
                })
                .join('');

            // Wrap in appropriate tag based on style
            const style = block.style || 'normal';
            if (style === 'h2') return `<h2>${text}</h2>`;
            if (style === 'h3') return `<h3>${text}</h3>`;
            if (block.listItem === 'bullet') return `<li>${text}</li>`;
            if (block.listItem === 'number') return `<li>${text}</li>`;

            return `<p>${text}</p>`;
        }).join('\n');
    }

    /**
     * Convert Sanity block content to plain text
     */
    function blockToText(blocks) {
        if (!blocks || !Array.isArray(blocks)) return '';

        return blocks
            .map(block => {
                if (block._type !== 'block') return '';
                return block.children
                    .map(child => child.text || '')
                    .join('');
            })
            .join(' ');
    }

    // ============================================================================
    // SANITY CLIENT INITIALIZATION
    // ============================================================================

    let client;

    try {
        log('Importing Sanity client from CDN...');

        const {
            createClient
        } = await import('https://esm.sh/@sanity/client@6.10.0');

        client = createClient({
            projectId: CONFIG.projectId,
            dataset: CONFIG.dataset,
            useCdn: CONFIG.useCdn,
            apiVersion: CONFIG.apiVersion,
            perspective: 'published'
        });

        log('✅ Sanity client initialized');

    } catch (err) {
        error('Failed to initialize Sanity client', err);
        return; // Exit early, use fallback content
    }

    // ============================================================================
    // GROQ QUERIES
    // ============================================================================

    const QUERIES = {
        siteSettings: `*[_type == "siteSettings"][0] {
      _id,
      brandName,
      brandNameLowercase,
      tagline,
      slogan,
      hashtag,
      contactEmail,
      website,
      storeAddress,
      storeHours,
      companyInfo,
      currency,
      discountRate,
      lookbookCallToAction
    }`,

        products: `*[_type == "product"] | order(order asc) {
      _id,
      name,
      slug,
      category,
      price,
      discountPrice,
      currency,
      description,
      features,
      technicalSpecs,
      sizes,
      colors,
      "images": images[] {
        "url": asset->url,
        "metadata": asset->metadata,
        alt,
        caption
      },
      "mobileImages": mobileImages[] {
        "url": asset->url,
        alt
      },
      inStock,
      featured,
      order,
      seo
    }`,

        faqs: `*[_type == "faqItem"] | order(order asc) {
      _id,
      question,
      answer,
      category,
      order,
      featured
    }`,

        about: `*[_type == "aboutSection"][0] {
      _id,
      title,
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
      "heroImage": heroImage.asset->url,
      "teamImages": teamImages[] {
        "url": asset->url,
        alt,
        caption
      }
    }`,

        lookbook: `*[_type == "lookbookImage"] | order(order asc) {
      _id,
      title,
      "image": image {
        "asset": asset->,
        alt,
        caption,
        credit
      },
      "thumbnail": thumbnail.asset->,
      "mobileImage": mobileImage.asset->,
      tags,
      instagramPost,
      userSubmitted,
      userName,
      userHandle,
      featured,
      order,
      publishedAt
    }`,

        navigation: `*[_type == "navigationMenu"][0] {
      _id,
      title,
      "menuItems": menuItems[] | order(order asc)
    }`
    };

    // ============================================================================
    // FETCH CONTENT FROM SANITY
    // ============================================================================

    let sanityContent = {};

    try {
        log('🔄 Fetching content from Sanity...');

        // Fetch all content in parallel for performance
        const [siteSettings, products, faqs, about, lookbook, navigation] = await Promise.all([
            client.fetch(QUERIES.siteSettings),
            client.fetch(QUERIES.products),
            client.fetch(QUERIES.faqs),
            client.fetch(QUERIES.about),
            client.fetch(QUERIES.lookbook),
            client.fetch(QUERIES.navigation)
        ]);

        sanityContent = {
            siteSettings,
            products,
            faqs,
            about,
            lookbook,
            navigation
        };

        log('✅ Content fetched successfully', {
            products: products?.length || 0,
            faqs: faqs?.length || 0,
            lookbookImages: lookbook?.length || 0
        });

    } catch (err) {
        error('Failed to fetch content from Sanity', err);
        return; // Exit early, use fallback content
    }

    // ============================================================================
    // MAP SANITY CONTENT TO __INITIAL_STATE__
    // ============================================================================

    try {
        log('🔄 Mapping Sanity content to initial state...');

        const state = window.__INITIAL_STATE__;
        if (!state) {
            error('window.__INITIAL_STATE__ not found!');
            return;
        }

        const {
            siteSettings,
            products,
            faqs,
            about,
            lookbook,
            navigation
        } = sanityContent;

        // -------------------------------------------------------------------------
        // Site Settings → Localization Messages
        // -------------------------------------------------------------------------

        if (siteSettings && state.localization && state.localization.messages) {
            const msg = state.localization.messages;

            // Brand & tagline
            if (siteSettings.tagline) {
                msg['header.topText'] = siteSettings.tagline;
            }

            if (siteSettings.hashtag) {
                msg['common.wearTrbl'] = siteSettings.hashtag;
            }

            // Lookbook gallery
            if (siteSettings.lookbookCallToAction) {
                msg['lookbook.callToAction'] = siteSettings.lookbookCallToAction;
            }

            // Store info
            if (siteSettings.storeAddress) {
                const addr = siteSettings.storeAddress;
                if (!addr.isOnlineOnly) {
                    msg['footer.address'] = [
                        addr.street,
                        `${addr.city}, ${addr.postalCode}`,
                        addr.country
                    ].filter(Boolean).join('\n');
                }
            }

            if (siteSettings.contactEmail) {
                msg['footer.email'] = siteSettings.contactEmail;
            }

            // Store hours
            if (siteSettings.storeHours && !siteSettings.storeHours.isAlwaysOpen) {
                const hours = siteSettings.storeHours;
                if (hours.monday) msg['footer.hours.weekday'] = hours.monday;
                if (hours.saturday) msg['footer.hours.saturday'] = hours.saturday;
                if (hours.sunday) msg['footer.hours.sunday'] = hours.sunday;
            }

            log('✅ Site settings mapped to localization');
        }

        // -------------------------------------------------------------------------
        // Products
        // -------------------------------------------------------------------------

        if (products && products.length > 0 && state.products) {
            state.products.list = products.map(product => {
                // Convert description blocks to HTML
                const descriptionHtml = blockToHtml(product.description);

                // Build image URLs
                const images = (product.images || []).map(img => ({
                    url: buildImageUrl(img, {
                        width: 1200,
                        quality: 90
                    }),
                    thumbnail: buildImageUrl(img, {
                        width: 400,
                        quality: 85
                    }),
                    alt: img.alt || product.name,
                    caption: img.caption
                }));

                const mobileImages = (product.mobileImages || []).map(img => ({
                    url: buildImageUrl(img, {
                        width: 800,
                        quality: 85
                    }),
                    alt: img.alt || product.name
                }));

                return {
                    id: product._id,
                    slug: product.slug?.current || product.slug,
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    discountPrice: product.discountPrice,
                    currency: product.currency || siteSettings?.currency || 'EUR',
                    description: descriptionHtml,
                    features: product.features || [],
                    specs: product.technicalSpecs || [],
                    sizes: product.sizes || [],
                    colors: product.colors || [],
                    images,
                    mobileImages: mobileImages.length > 0 ? mobileImages : images,
                    inStock: product.inStock !== false,
                    featured: product.featured || false,
                    seo: product.seo || {}
                };
            });

            log(`✅ Mapped ${products.length} products`);
        }

        // -------------------------------------------------------------------------
        // FAQ
        // -------------------------------------------------------------------------

        if (faqs && faqs.length > 0) {
            state.faq = faqs.map(faq => ({
                id: faq._id,
                question: faq.question,
                answer: blockToHtml(faq.answer),
                answerText: blockToText(faq.answer), // Plain text version
                category: faq.category,
                featured: faq.featured || false
            }));

            log(`✅ Mapped ${faqs.length} FAQ items`);
        }

        // -------------------------------------------------------------------------
        // About Section
        // -------------------------------------------------------------------------

        if (about) {
            state.about = {
                title: about.title,
                paragraph1: blockToHtml(about.paragraph1),
                paragraph2: blockToHtml(about.paragraph2),
                paragraph3: blockToHtml(about.paragraph3),
                paragraph4: blockToHtml(about.paragraph4),
                heroImage: about.heroImage,
                teamImages: about.teamImages || []
            };

            // Also update localization messages for about text
            if (state.localization?.messages) {
                state.localization.messages['about.text-0'] = blockToText(about.paragraph1);
                state.localization.messages['about.text-1'] = blockToText(about.paragraph2);
                state.localization.messages['about.text-2'] = blockToText(about.paragraph3);
                state.localization.messages['about.text-3'] = blockToText(about.paragraph4);
            }

            log('✅ About section mapped');
        }

        // -------------------------------------------------------------------------
        // Lookbook Images
        // -------------------------------------------------------------------------

        if (lookbook && lookbook.length > 0) {
            state.lookbook = lookbook.map((item, index) => {
                const asset = item.image?.asset;
                const thumbnailAsset = item.thumbnail || asset;
                const mobileAsset = item.mobileImage || asset;

                return {
                    id: item._id || index + 1,
                    title: item.title,
                    order: item.order,
                    // Full-size image
                    url: buildImageUrl(asset, {
                        width: 1920,
                        quality: 90
                    }),
                    // Thumbnail for gallery grid
                    thumbnail: buildImageUrl(thumbnailAsset, {
                        width: 600,
                        quality: 85
                    }),
                    // Mobile-optimized
                    mobile: buildImageUrl(mobileAsset, {
                        width: 1000,
                        quality: 85
                    }),
                    alt: item.image?.alt || item.title,
                    caption: item.image?.caption,
                    credit: item.image?.credit,
                    tags: item.tags || [],
                    instagramPost: item.instagramPost,
                    userSubmitted: item.userSubmitted || false,
                    userName: item.userName,
                    userHandle: item.userHandle,
                    featured: item.featured || false
                };
            });

            log(`✅ Mapped ${lookbook.length} lookbook images`);
        }

        // -------------------------------------------------------------------------
        // Navigation Menu
        // -------------------------------------------------------------------------

        if (navigation && navigation.menuItems) {
            state.navigation = {
                menuItems: navigation.menuItems.map(item => ({
                    label: item.label,
                    url: item.url,
                    openInNewTab: item.openInNewTab || false
                }))
            };

            log(`✅ Mapped navigation menu`);
        }

        log('✅ All content successfully mapped to __INITIAL_STATE__');

        // -------------------------------------------------------------------------
        // Dispatch event to notify app that content is loaded
        // -------------------------------------------------------------------------

        window.dispatchEvent(new CustomEvent('sanity-content-loaded', {
            detail: {
                success: true,
                content: sanityContent,
                timestamp: new Date().toISOString()
            }
        }));

    } catch (err) {
        error('Failed to map Sanity content', err);

        // Dispatch failure event
        window.dispatchEvent(new CustomEvent('sanity-content-loaded', {
            detail: {
                success: false,
                error: err.message,
                timestamp: new Date().toISOString()
            }
        }));
    }

})();