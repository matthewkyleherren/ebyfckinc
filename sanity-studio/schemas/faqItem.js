/**
 * FAQ Item Schema
 * Individual FAQ question and answer
 */

export default {
    name: 'faqItem',
    title: 'FAQ Item',
    type: 'document',
    icon: () => '❓',
    fields: [{
            name: 'question',
            title: 'Question',
            type: 'string',
            description: 'The FAQ question',
            validation: Rule => Rule.required().max(200)
        },
        {
            name: 'answer',
            title: 'Answer',
            type: 'array',
            description: 'The detailed answer (supports rich text)',
            of: [{
                type: 'block',
                styles: [{
                    title: 'Normal',
                    value: 'normal'
                }],
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
                        }
                    ],
                    annotations: [{
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [{
                            name: 'href',
                            type: 'url',
                            title: 'URL'
                        }]
                    }]
                }
            }],
            validation: Rule => Rule.required()
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            description: 'Group related FAQs together',
            options: {
                list: [{
                        title: 'General',
                        value: 'general'
                    },
                    {
                        title: 'Product',
                        value: 'product'
                    },
                    {
                        title: 'Technical',
                        value: 'technical'
                    },
                    {
                        title: 'Shipping & Returns',
                        value: 'shipping'
                    },
                    {
                        title: 'Care & Maintenance',
                        value: 'care'
                    }
                ]
            },
            initialValue: 'general'
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in FAQ list (lower numbers appear first)',
            validation: Rule => Rule.required().integer().min(1)
        },
        {
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            description: 'Show in featured/important FAQs section',
            initialValue: false
        },
        {
            name: 'relatedProducts',
            title: 'Related Products',
            type: 'array',
            description: 'Products this FAQ is relevant to',
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
            title: 'question',
            subtitle: 'category',
            order: 'order'
        },
        prepare({
            title,
            subtitle,
            order
        }) {
            return {
                title: `${order}. ${title}`,
                subtitle: subtitle ? `Category: ${subtitle}` : 'No category'
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
                },
                {
                    field: 'order',
                    direction: 'asc'
                }
            ]
        }
    ]
}