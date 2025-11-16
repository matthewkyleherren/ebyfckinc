/**
 * Site Settings Schema
 * Manages global site configuration: brand name, contact info, tagline, etc.
 */

export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    icon: () => '⚙️',
    fields: [{
            name: 'brandName',
            title: 'Brand Name',
            type: 'string',
            description: 'Main brand name (e.g., "Elite." or "WE+AR TRBL")',
            validation: Rule => Rule.required()
        },
        {
            name: 'brandNameLowercase',
            title: 'Brand Name (Lowercase)',
            type: 'string',
            description: 'Lowercase version for certain displays'
        },
        {
            name: 'tagline',
            title: 'Tagline / Value Proposition',
            type: 'string',
            description: 'Main tagline shown on homepage (e.g., "Massages that will blow your mind. And more.")',
            validation: Rule => Rule.required().max(200)
        },
        {
            name: 'slogan',
            title: 'Main Slogan',
            type: 'object',
            description: 'Three-line slogan displayed on homepage',
            fields: [{
                    name: 'line1',
                    title: 'Line 1',
                    type: 'string',
                    description: 'e.g., "I am"'
                },
                {
                    name: 'line2',
                    title: 'Line 2',
                    type: 'string',
                    description: 'e.g., "what"'
                },
                {
                    name: 'line3',
                    title: 'Line 3',
                    type: 'string',
                    description: 'e.g., "And more. "'
                }
            ]
        },
        {
            name: 'hashtag',
            title: 'Brand Hashtag',
            type: 'string',
            description: 'Social media hashtag (e.g., "#wearTRBL")',
            validation: Rule => Rule.regex(/^#\w+$/, {
                name: 'hashtag',
                invert: false
            }).error('Must start with # and contain no spaces')
        },
        {
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            description: 'Primary contact email address',
            validation: Rule => Rule.required().email()
        },
        {
            name: 'website',
            title: 'Website Domain',
            type: 'url',
            description: 'Main website URL'
        },
        {
            name: 'storeAddress',
            title: 'Physical Store Address',
            type: 'object',
            fields: [{
                    name: 'street',
                    title: 'Street Address',
                    type: 'string'
                },
                {
                    name: 'city',
                    title: 'City',
                    type: 'string'
                },
                {
                    name: 'postalCode',
                    title: 'Postal Code',
                    type: 'string'
                },
                {
                    name: 'country',
                    title: 'Country',
                    type: 'string'
                },
                {
                    name: 'isOnlineOnly',
                    title: 'Online-Only (No Physical Store)',
                    type: 'boolean',
                    description: 'Check if this is an online-only business'
                }
            ]
        },
        {
            name: 'storeHours',
            title: 'Store Hours',
            type: 'object',
            description: 'Operating hours (leave empty if online-only)',
            fields: [{
                    name: 'monday',
                    title: 'Monday - Friday',
                    type: 'string',
                    placeholder: '11:00 - 18:30'
                },
                {
                    name: 'saturday',
                    title: 'Saturday',
                    type: 'string',
                    placeholder: '11:00 - 17:00'
                },
                {
                    name: 'sunday',
                    title: 'Sunday',
                    type: 'string',
                    placeholder: '12:30 - 16:30'
                },
                {
                    name: 'isAlwaysOpen',
                    title: '24/7 Online',
                    type: 'boolean'
                }
            ]
        },
        {
            name: 'companyInfo',
            title: 'Company Information',
            type: 'object',
            fields: [{
                    name: 'legalName',
                    title: 'Legal Company Name',
                    type: 'string',
                    description: 'For terms & conditions'
                },
                {
                    name: 'parentCompany',
                    title: 'Parent Company',
                    type: 'string',
                    description: 'e.g., "Parrot Drones SAS"'
                }
            ]
        },
        {
            name: 'currency',
            title: 'Default Currency',
            type: 'string',
            options: {
                list: [{
                        title: 'Euro (EUR)',
                        value: 'EUR'
                    },
                    {
                        title: 'US Dollar (USD)',
                        value: 'USD'
                    },
                    {
                        title: 'British Pound (GBP)',
                        value: 'GBP'
                    }
                ]
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'discountRate',
            title: 'Site-Wide Discount Rate',
            type: 'number',
            description: 'Percentage discount (e.g., 10 for 10% off)',
            validation: Rule => Rule.min(0).max(100)
        },
        {
            name: 'lookbookCallToAction',
            title: 'Lookbook Gallery Call-to-Action',
            type: 'text',
            description: 'Text shown above lookbook gallery',
            placeholder: 'Tag your images with #wearTRBL to be featured in our gallery.'
        }
    ],
    preview: {
        select: {
            title: 'brandName',
            subtitle: 'tagline'
        }
    }
}