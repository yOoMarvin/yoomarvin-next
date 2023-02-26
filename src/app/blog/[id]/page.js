import { Fragment } from 'react'
import { getDatabase, getPage, getBlocks } from '../../../lib/notion'
import { databaseId } from '../page'
import Text from '../../../components/Text'

function renderBlock(block) {
    const { type, id } = block
    const value = block[type]

    switch (type) {
        case 'paragraph':
            return (
                <p className="mb-4 text-lg">
                    <Text text={value.rich_text} />
                </p>
            )
        case 'code':
            return (
                <div className="mb-4 rounded-2xl bg-neutrals-50 p-4 font-mono">
                    <code className="text-sm">
                        <Text text={value.rich_text} />
                    </code>
                </div>
            )
        case 'heading_1':
            return (
                <h1 className="mb-6 text-2xl font-bold">
                    <Text text={value.rich_text} />
                </h1>
            )
        case 'heading_2':
            return (
                <h2 className="mb-2 text-xl font-bold">
                    <Text text={value.rich_text} />
                </h2>
            )
        case 'heading_3':
            return (
                <h3 className="mb-2 text-lg font-bold">
                    <Text text={value.rich_text} />
                </h3>
            )
        case 'bulleted_list_item':
        case 'numbered_list_item':
            return (
                <li className="-mt-2 text-lg">
                    <Text text={value.rich_text} />
                </li>
            )
        case 'image':
            const src =
                value.type === 'external' ? value.external.url : value.file.url
            const caption = value.caption ? value.caption[0].plain_text : ''
            return (
                <figure>
                    <img src={src} alt={caption} className="mb-4 rounded-2xl" />
                    {caption && (
                        <figcaption className="-mt-2 text-sm text-text-secondary">
                            {caption}
                        </figcaption>
                    )}
                </figure>
            )
        default:
            return `❌ Unsupported block (${
                type === 'unsupported' ? 'unsupported by Notion API' : type
            })`
    }
}

export default async function PostPage({ params, page, blocks }) {
    page = await getPage(params.id)
    blocks = await getBlocks(params.id)

    return (
        <article className="mx-auto mt-8 max-w-screen-sm">
            <h1 className="mb-8 text-3xl font-bold">
                <Text text={page.properties.Name.title} />
            </h1>
            <section>
                {blocks.map((block) => (
                    <div key={block.id} className="mb-2">
                        {renderBlock(block)}
                    </div>
                ))}
            </section>
        </article>
    )
}
