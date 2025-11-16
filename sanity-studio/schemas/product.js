/**
 * Product Schema
 * E-commerce product with variants, pricing, specs, and images
 */

export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    icon: () => '🛍️',
    fields: [{
            name: 'name',
            title: 'Product Name',
            type: 'string',
            description: 'Display name (e.g., "IKI", "SWEAT", "TEE")',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'URL-friendly identifier',
            options: {
                source: 'name',
                maxLength: 96,
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 96)
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [{
                        title: 'Device',
                        value: 'device'
                    },
                    {
                        title: 'Sweatshirt Bundle',
                        value: 'sweatshirt'
                    },
                    {
                        title: 'T-Shirt Bundle',
                        value: 'tshirt'
                    }
                ],
                layout: 'radio'
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            description: 'Base price in default currency',
            validation: Rule => Rule.required().positive()
        },
        {
            name: 'discountPrice',
            title: 'Discount Price',
            type: 'number',
            description: 'Sale price (optional)',
            validation: Rule => Rule.positive()
        },
        {
            name: 'currency',
            title: 'Currency',
            type: 'string',
            options: {
                list: ['EUR', 'USD', 'GBP']
            },
            initialValue: 'EUR'
        },
        {
            name: 'description',
            title: 'Product Description',
            type: 'array',
            description: 'Rich text description with features and details',
            of: [{
                type: 'block',
                styles: [{
                        title: 'Normal',
                        value: 'normal'
                    },
                    {
                        title: 'H2',
                        value: 'h2'
                    },
                    {
                        title: 'H3',
                        value: 'h3'
                    }
                ],
                lists: [{
                        title: 'Bullet',
                        value: 'bullet'
                    },
                    {
                        title: 'Numbered',
                        value: 'number'
                    }
                ],
                marks: {
                    decorators: [{
                            title: 'Strong',
                            value: 'strong'
                        },
                        {
                            title: 'Emphasis',
                            value: 'em'
                        },
                        {
                            title: 'Code',
                            value: 'code'
                        }
                    ]
                }
            }]
        },
        {
            name: 'features',
            title: 'Key Features',
            type: 'array',
            description: 'Bullet points of main features',
            of: [{
                type: 'string'
            }],
            options: {
                layout: 'tags'
            }
        },
        {
            name: 'technicalSpecs',
            title: 'Technical Specifications',
            type: 'array',
            of: [{
                type: 'object',
                fields: [{
                        name: 'label',
                        title: 'Specification Label',
                        type: 'string',
                        description: 'e.g., "Screen Size", "Weight", "Battery Life"'
                    },
                    {
                        name: 'value',
                        title: 'Value',
                        type: 'string',
                        description: 'e.g., "6.8 inches", "37g", "5 days"'
                    }
                ],
                preview: {
                    select: {
                        title: 'label',
                        subtitle: 'value'
                    }
                }
            }]
        },
        {
            name: 'sizes',
            title: 'Available Sizes',
            type: 'array',
            description: 'For clothing items (leave empty for devices)',
            of: [{
                type: 'string'
            }],
            options: {
                list: [{
                        title: 'Extra Small',
                        value: 'XS'
                    },
                    {
                        title: 'Small',
                        value: 'S'
                    },
                    {
                        title: 'Medium',
                        value: 'M'
                    },
                    {
                        title: 'Large',
                        value: 'L'
                    },
                    {
                        title: 'Extra Large',
                        value: 'XL'
                    },
                    {
                        title: 'XXL',
                        value: 'XXL'
                    }
                ]
            }
        },
        {
            name: 'colors',
            title: 'Available Colors',
            type: 'array',
            of: [{
                type: 'string'
            }],
            description: 'Color options for this product'
        },
        {
            name: 'images',
            title: 'Product Images',
            type: 'array',
            of: [{
                type: 'image',
                options: {
                    hotspot: true,
                    metadata: ['blurhash', 'lqip', 'palette']
                },
                fields: [{
                        name: 'alt',
                        type: 'string',
                        title: 'Alternative Text',
                        description: 'Accessibility description',
                        validation: Rule => Rule.required()
                    },
                    {
                        name: 'caption',
                        type: 'string',
                        title: 'Caption',
                        description: 'Optional caption for this image'
                    }
                ]
            }],
            validation: Rule => Rule.required().min(1)
        },
        {
            name: 'mobileImages',
            title: 'Mobile-Optimized Images',
            type: 'array',
            description: 'Separate images for mobile devices (optional)',
            of: [{
                type: 'image',
                options: {
                    hotspot: true
                },
                fields: [{
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text'
                }]
            }]
        },
        {
            name: 'inStock',
            title: 'In Stock',
            type: 'boolean',
            description: 'Is this product available for purchase?',
            initialValue: true
        },
        {
            name: 'featured',
            title: 'Featured Product',
            type: 'boolean',
            description: 'Show prominently on homepage',
            initialValue: false
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in product listings (lower numbers first)',
            validation: Rule => Rule.integer().positive()
        },
        {
            name: 'relatedProducts',
            title: 'Related Products',
            type: 'array',
            description: 'Products to suggest to customers',
            of: [{
                type: 'reference',
                to: [{
                    type: 'product'
                }]
            }]
        },
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [{
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    validation: Rule => Rule.max(60)
                },
                {
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    validation: Rule => Rule.max(160)
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'category',
            media: 'images.0',
            price: 'price',
            currency: 'currency'
        },
        prepare({
            title,
            subtitle,
            media,
            price,
            currency
        }) {
            return {
                title,
                subtitle: `${subtitle} • ${currency} ${price}`,
                media
            }
        }
    },
    orderings: [{
            title: 'Display Order',
            name: 'orderAsc',
            by: [{
                field: 'order',
                direction: 'asc'
            }]
        },
        {
            title: 'Category',
            name: 'categoryAsc',
            by: [{
                field: 'category',
                direction: 'asc'
            }]
        },
        {
            title: 'Price (Low to High)',
            name: 'priceAsc',
            by: [{
                field: 'price',
                direction: 'asc'
            }]
        }
    ]
}