import {
    defineConfig
} from 'sanity'
import {
    structureTool
} from 'sanity/structure'
import {
    visionTool
} from '@sanity/vision'
import {
    media
} from 'sanity-plugin-media'
import {
    schemaTypes
} from './schemas'

export default defineConfig({
    name: 'default',
    title: 'EliteCMS',

    projectId: 'duqxb9hm', // ⚠️ REPLACE with your Sanity project ID
    dataset: 'production',

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                .title('Content')
                .items([
                    // Singleton documents
                    S.listItem()
                    .title('Site Settings')
                    .icon(() => '⚙️')
                    .child(
                        S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                    ),

                    S.listItem()
                    .title('About Section')
                    .icon(() => 'ℹ️')
                    .child(
                        S.document()
                        .schemaType('aboutSection')
                        .documentId('aboutSection')
                    ),

                    S.listItem()
                    .title('Navigation Menu')
                    .icon(() => '🧭')
                    .child(
                        S.document()
                        .schemaType('navigationMenu')
                        .documentId('navigationMenu')
                    ),

                    S.divider(),

                    // Collection documents
                    S.listItem()
                    .title('Products')
                    .icon(() => '🛍️')
                    .child(
                        S.documentTypeList('product')
                        .title('Products')
                        .defaultOrdering([{
                            field: 'order',
                            direction: 'asc'
                        }])
                    ),

                    S.listItem()
                    .title('FAQ')
                    .icon(() => '❓')
                    .child(
                        S.documentTypeList('faqItem')
                        .title('FAQ Items')
                        .defaultOrdering([{
                            field: 'order',
                            direction: 'asc'
                        }])
                    ),

                    S.listItem()
                    .title('Lookbook Gallery')
                    .icon(() => '📸')
                    .child(
                        S.documentTypeList('lookbookImage')
                        .title('Lookbook Images')
                        .defaultOrdering([{
                            field: 'order',
                            direction: 'asc'
                        }])
                    ),
                ]),
        }),
        visionTool(), // GROQ query testing tool
        media() // Enhanced media library
    ],

    schema: {
        types: schemaTypes,
    },
})