/**
 * Lookbook Image Schema
 * Gallery images for the lookbook/showcase section
 */

export default {
    name: 'lookbookImage',
    title: 'Lookbook Image',
    type: 'document',
    icon: () => '📸',
    fields: [{
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Internal title for organization',
            validation: Rule => Rule.required()
        },
        {
            name: 'image',
            title: 'Full-Size Image',
            type: 'image',
            description: 'High-resolution image for full view',
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
                    description: 'Optional caption shown with image'
                },
                {
                    name: 'credit',
                    type: 'string',
                    title: 'Photo Credit',
                    description: 'Photographer or source attribution'
                }
            ],
            validation: Rule => Rule.required()
        },
        {
            name: 'thumbnail',
            title: 'Thumbnail Image',
            type: 'image',
            description: 'Smaller version for gallery grid (optional - will use full image if not provided)',
            options: {
                hotspot: true
            }
        },
        {
            name: 'mobileImage',
            title: 'Mobile-Optimized Image',
            type: 'image',
            description: 'Optimized for mobile devices (optional)',
            options: {
                hotspot: true
            }
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            description: 'Categorize images (e.g., style, season, product)',
            of: [{
                type: 'string'
            }],
            options: {
                layout: 'tags'
            }
        },
        {
            name: 'instagramPost',
            title: 'Instagram Post URL',
            type: 'url',
            description: 'Link to original Instagram post (if applicable)'
        },
        {
            name: 'userSubmitted',
            title: 'User-Submitted',
            type: 'boolean',
            description: 'Is this from a customer/user?',
            initialValue: false
        },
        {
            name: 'userName',
            title: 'User Name',
            type: 'string',
            description: 'Name of person featured or who submitted',
            hidden: ({
                document
            }) => !document?.userSubmitted
        },
        {
            name: 'userHandle',
            title: 'Social Media Handle',
            type: 'string',
            description: 'e.g., @username',
            hidden: ({
                document
            }) => !document?.userSubmitted
        },
        {
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            description: 'Highlight in featured gallery section',
            initialValue: false
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in gallery (lower numbers first)',
            validation: Rule => Rule.required().integer().min(1),
            initialValue: 1
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            description: 'When to publish this image',
            initialValue: () => new Date().toISOString()
        },
        {
            name: 'relatedProducts',
            title: 'Related Products',
            type: 'array',
            description: 'Products featured in this image',
            of: [{
                type: 'reference',
                to: [{
                    type: 'product'
                }]
            }]
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'userName',
            media: 'image',
            order: 'order',
            featured: 'featured'
        },
        prepare({
            title,
            subtitle,
            media,
            order,
            featured
        }) {
            return {
                title: `${order}. ${title}${featured ? ' ⭐' : ''}`,
                subtitle: subtitle || 'No attribution',
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
            title: 'Recently Published',
            name: 'publishedDesc',
            by: [{
                field: 'publishedAt',
                direction: 'desc'
            }]
        },
        {
            title: 'Featured First',
            name: 'featuredFirst',
            by: [{
                    field: 'featured',
                    direction: 'desc'
                },
                {
                    field: 'order',
                    direction: 'asc'
                }
            ]
        }
    ]
}