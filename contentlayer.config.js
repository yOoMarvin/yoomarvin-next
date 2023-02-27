import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const getSlug = (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '')

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `**/*.mdx`,
    fields: {
        title: {
            type: 'string',
            description: 'The title of the post',
            required: true,
        },
        date: {
            type: 'date',
            description: 'The date of the post',
            required: true,
        },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => getSlug(doc),
        },
        image: {
            type: 'string',
            resolve: (doc) => `/blog/${getSlug(doc)}/image.png`,
        },
        og: {
            type: 'string',
            resolve: (doc) => `/blog/${getSlug(doc)}/og.jpg`,
        },
    },
}))

export default makeSource({
    contentDirPath: 'data',
    documentTypes: [Post],
})
