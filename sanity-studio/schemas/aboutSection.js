/**
 * About Section Schema
 * Single document for the About page/section content
 */

export default {
    name: 'aboutSection',
    title: 'About Section',
    type: 'document',
    icon: () => 'ℹ️',
    fields: [{
            name: 'title',
            title: 'Section Title',
            type: 'string',
            description: 'Main title for About section (optional)',
            placeholder: 'About Us'
        },
        {
            name: 'paragraph1',
            title: 'Paragraph 1: Brand Introduction',
            type: 'array',
            description: 'Who you are, your mission',
            of: [{
                type: 'block',
                styles: [{
                    title: 'Normal',
                    value: 'normal'
                }],
                marks: {
                    decorators: [{
                            title: 'Strong',
                            value: 'strong'
                        },
                        {
                            title: 'Emphasis',
                            value: 'em'
                        }
                    ]
                }
            }],
            validation: Rule => Rule.required()
        },
        {
            name: 'paragraph2',
            title: 'Paragraph 2: Origin Story',
            type: 'array',
            description: 'What inspired the creation, what problem you solve',
            of: [{
                type: 'block',
                styles: [{
                    title: 'Normal',
                    value: 'normal'
                }],
                marks: {
                    decorators: [{
                            title: 'Strong',
                            value: 'strong'
                        },
                        {
                            title: 'Emphasis',
                            value: 'em'
                        }
                    ]
                }
            }],
            validation: Rule => Rule.required()
        },
        {
            name: 'paragraph3',
            title: 'Paragraph 3: Innovation & Technology',
            type: 'array',
            description: 'What makes your product innovative, technology details',
            of: [{
                type: 'block',
                styles: [{
                    title: 'Normal',
                    value: 'normal'
                }],
                marks: {
                    decorators: [{
                            title: 'Strong',
                            value: 'strong'
                        },
                        {
                            title: 'Emphasis',
                            value: 'em'
                        }
                    ]
                }
            }],
            validation: Rule => Rule.required()
        },
        {
            name: 'paragraph4',
            title: 'Paragraph 4: Vision & Impact',
            type: 'array',
            description: 'Your vision for the brand, how it empowers users',
            of: [{
                type: 'block',
                styles: [{
                    title: 'Normal',
                    value: 'normal'
                }],
                marks: {
                    decorators: [{
                            title: 'Strong',
                            value: 'strong'
                        },
                        {
                            title: 'Emphasis',
                            value: 'em'
                        }
                    ]
                }
            }],
            validation: Rule => Rule.required()
        },
        {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            description: 'Optional hero image for About section',
            options: {
                hotspot: true
            },
            fields: [{
                name: 'alt',
                type: 'string',
                title: 'Alternative Text'
            }]
        },
        {
            name: 'teamImages',
            title: 'Team Images',
            type: 'array',
            description: 'Optional team/founder photos',
            of: [{
                type: 'image',
                options: {
                    hotspot: true
                },
                fields: [{
                        name: 'alt',
                        type: 'string',
                        title: 'Alternative Text'
                    },
                    {
                        name: 'caption',
                        type: 'string',
                        title: 'Caption',
                        description: 'Name and role'
                    }
                ]
            }]
        }
    ],
    preview: {
        select: {
            title: 'title'
        },
        prepare({
            title
        }) {
            return {
                title: title || 'About Section Content',
                subtitle: '4 Paragraphs'
            }
        }
    }
}