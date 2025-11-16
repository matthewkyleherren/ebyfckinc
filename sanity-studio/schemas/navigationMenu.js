/**
 * Navigation Menu Schema
 * Manages site navigation items
 */

export default {
    name: 'navigationMenu',
    title: 'Navigation Menu',
    type: 'document',
    icon: () => '🧭',
    fields: [{
            name: 'title',
            title: 'Menu Title',
            type: 'string',
            description: 'Internal name for this menu',
            validation: Rule => Rule.required()
        },
        {
            name: 'menuItems',
            title: 'Menu Items',
            type: 'array',
            of: [{
                type: 'object',
                fields: [{
                        name: 'label',
                        title: 'Label',
                        type: 'string',
                        description: 'Text shown in menu',
                        validation: Rule => Rule.required()
                    },
                    {
                        name: 'url',
                        title: 'URL',
                        type: 'string',
                        description: 'Link destination (e.g., "/about", "/products")',
                        validation: Rule => Rule.required()
                    },
                    {
                        name: 'order',
                        title: 'Order',
                        type: 'number',
                        description: 'Position in menu',
                        validation: Rule => Rule.integer().min(1)
                    },
                    {
                        name: 'openInNewTab',
                        title: 'Open in New Tab',
                        type: 'boolean',
                        initialValue: false
                    }
                ],
                preview: {
                    select: {
                        title: 'label',
                        subtitle: 'url',
                        order: 'order'
                    },
                    prepare({
                        title,
                        subtitle,
                        order
                    }) {
                        return {
                            title: `${order}. ${title}`,
                            subtitle
                        }
                    }
                }
            }]
        }
    ],
    preview: {
        select: {
            title: 'title',
            itemCount: 'menuItems.length'
        },
        prepare({
            title,
            itemCount
        }) {
            return {
                title,
                subtitle: `${itemCount || 0} items`
            }
        }
    }
}