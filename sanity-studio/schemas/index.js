/**
 * Schema Index
 * Exports all schema types for Sanity Studio
 */

import siteSettings from './siteSettings'
import product from './product'
import faqItem from './faqItem'
import aboutSection from './aboutSection'
import lookbookImage from './lookbookImage'
import navigationMenu from './navigationMenu'

export const schemaTypes = [
    // Singleton documents (only one instance)
    siteSettings,
    aboutSection,
    navigationMenu,

    // Collection documents (multiple instances)
    product,
    faqItem,
    lookbookImage
]