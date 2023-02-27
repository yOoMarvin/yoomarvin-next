import { defineDocumentType, makeSource } from 'contentlayer/source-files'

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
        slug: {
            type: 'string',
            description: 'The identifier of each post',
            required: true,
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (post) => `/data/blog/${post._raw.flattenedPath}`,
        },
    },
}))

export default makeSource({
    contentDirPath: 'data',
    documentTypes: [Post],
})
