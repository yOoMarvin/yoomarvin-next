import type {
    RichTextItemResponse,
    BulletedListItemBlockObjectResponse,
    NumberedListItemBlockObjectResponse,
    ParagraphBlockObjectResponse,
    Heading1BlockObjectResponse,
    Heading2BlockObjectResponse,
    Heading3BlockObjectResponse,
    QuoteBlockObjectResponse,
    CodeBlockObjectResponse,
    ImageBlockObjectResponse,
    VideoBlockObjectResponse,
    EmbedBlockObjectResponse,
    ColumnBlockObjectResponse,
    ColumnListBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { inlineLinkClass } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { NotionBlock } from '@/lib/notion/types'
import { localizeNotionUrl } from '@/lib/notion/localize-url'

export function renderBlocks(blocks: NotionBlock[]) {
    const elements: React.ReactNode[] = []
    let i = 0

    while (i < blocks.length) {
        const block = blocks[i]

        if (block.type === 'bulleted_list_item') {
            const items: BulletedListItemBlockObjectResponse[] = []
            while (
                i < blocks.length &&
                blocks[i].type === 'bulleted_list_item'
            ) {
                items.push(blocks[i] as BulletedListItemBlockObjectResponse)
                i++
            }
            elements.push(
                <ul key={items[0].id}>
                    {items.map((item) => (
                        <li key={item.id}>
                            {renderRichText(item.bulleted_list_item.rich_text)}
                            {renderNested(item)}
                        </li>
                    ))}
                </ul>
            )
            continue
        }

        if (block.type === 'numbered_list_item') {
            const items: NumberedListItemBlockObjectResponse[] = []
            while (
                i < blocks.length &&
                blocks[i].type === 'numbered_list_item'
            ) {
                items.push(blocks[i] as NumberedListItemBlockObjectResponse)
                i++
            }
            elements.push(
                <ol key={items[0].id}>
                    {items.map((item) => (
                        <li key={item.id}>
                            {renderRichText(item.numbered_list_item.rich_text)}
                            {renderNested(item)}
                        </li>
                    ))}
                </ol>
            )
            continue
        }

        elements.push(<Block key={block.id} block={block} />)
        i++
    }

    return elements
}

function Block({ block }: { block: NotionBlock }) {
    switch (block.type) {
        case 'paragraph': {
            const b = block as ParagraphBlockObjectResponse
            return <p>{renderRichText(b.paragraph.rich_text)}</p>
        }
        case 'heading_1': {
            const b = block as Heading1BlockObjectResponse
            return <h1>{renderRichText(b.heading_1.rich_text)}</h1>
        }
        case 'heading_2': {
            const b = block as Heading2BlockObjectResponse
            return <h2>{renderRichText(b.heading_2.rich_text)}</h2>
        }
        case 'heading_3': {
            const b = block as Heading3BlockObjectResponse
            return <h3>{renderRichText(b.heading_3.rich_text)}</h3>
        }
        case 'quote': {
            const b = block as QuoteBlockObjectResponse
            return <blockquote>{renderRichText(b.quote.rich_text)}</blockquote>
        }
        case 'code': {
            const b = block as CodeBlockObjectResponse
            return (
                <pre>
                    <code>{renderRichText(b.code.rich_text)}</code>
                </pre>
            )
        }
        case 'image': {
            const b = block as ImageBlockObjectResponse
            const rawImageSrc =
                b.image.type === 'external'
                    ? b.image.external.url
                    : b.image.file.url
            const src = localizeNotionUrl(rawImageSrc)
            const caption = b.image.caption?.[0]?.plain_text ?? ''
            return (
                <figure>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt={caption}
                        className="w-full rounded-lg"
                    />
                    {caption && (
                        <figcaption className="mt-2 text-center text-sm text-[var(--text-tertiary)]">
                            {caption}
                        </figcaption>
                    )}
                </figure>
            )
        }
        case 'video': {
            const b = block as VideoBlockObjectResponse
            const rawSrc =
                b.video.type === 'external'
                    ? b.video.external.url
                    : b.video.file.url
            const localized = localizeNotionUrl(rawSrc)
            const src = getEmbeddableUrl(localized)
            const caption = b.video.caption?.[0]?.plain_text ?? ''
            const isEmbed = /^https?:\/\//.test(src)

            return (
                <figure className="space-y-2">
                    {isEmbed ? (
                        <div className="aspect-video overflow-hidden rounded-xl ring-1 ring-inset ring-[var(--border-default)]">
                            <iframe
                                src={src}
                                title={caption || 'Embedded video'}
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <video
                            controls
                            className="w-full rounded-xl ring-1 ring-inset ring-[var(--border-default)]"
                        >
                            <source src={src} />
                        </video>
                    )}
                    {caption && (
                        <figcaption className="text-center text-sm text-[var(--text-tertiary)]">
                            {caption}
                        </figcaption>
                    )}
                </figure>
            )
        }
        case 'embed': {
            const b = block as EmbedBlockObjectResponse
            const src = getEmbeddableUrl(b.embed.url)
            return (
                <div className="aspect-video overflow-hidden rounded-xl ring-1 ring-inset ring-[var(--border-default)]">
                    <iframe
                        src={src}
                        title="Embedded content"
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            )
        }
        case 'column_list': {
            const b = block as ColumnListBlockObjectResponse & NotionBlock
            const columns = b.children?.filter(
                (child): child is ColumnBlockObjectResponse & NotionBlock =>
                    child.type === 'column'
            )

            if (!columns?.length) return null

            const gridClass =
                columns.length === 1
                    ? 'grid-cols-1'
                    : columns.length === 2
                      ? 'grid-cols-1 md:grid-cols-2'
                      : columns.length === 3
                        ? 'grid-cols-1 md:grid-cols-3'
                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'

            return (
                <div className={cn('grid gap-4', gridClass)}>
                    {columns.map((column) => (
                        <div key={column.id} className="space-y-4">
                            {renderBlocks(column.children ?? [])}
                        </div>
                    ))}
                </div>
            )
        }
        case 'divider':
            return <hr />
        default:
            return null
    }
}

function renderNested(
    block:
        | BulletedListItemBlockObjectResponse
        | NumberedListItemBlockObjectResponse
) {
    const nested = (block as unknown as NotionBlock).children ?? []
    if (!nested.length) return null
    return <div className="mt-2">{renderBlocks(nested)}</div>
}

function getEmbeddableUrl(url: string): string {
    try {
        const parsed = new URL(url)
        const host = parsed.hostname.replace(/^www\./, '')

        if (host === 'youtube.com' || host === 'm.youtube.com') {
            const videoId =
                parsed.searchParams.get('v') ??
                getPathSegmentAfter(parsed.pathname, 'shorts')
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`
            }
        }

        if (host === 'youtu.be') {
            const videoId = parsed.pathname.split('/').filter(Boolean)[0]
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`
            }
        }

        if (host === 'loom.com') {
            const parts = parsed.pathname.split('/').filter(Boolean)
            const isSharePath = parts[0] === 'share' || parts[0] === 'embed'
            const videoId = isSharePath ? parts[1] : parts[0]
            if (videoId) {
                return `https://www.loom.com/embed/${videoId}`
            }
        }

        return url
    } catch {
        return url
    }
}

function getPathSegmentAfter(pathname: string, segment: string): string | null {
    const parts = pathname.split('/').filter(Boolean)
    const index = parts.indexOf(segment)
    if (index < 0) return null
    return parts[index + 1] ?? null
}

function renderRichText(richText: RichTextItemResponse[]) {
    if (!richText?.length) return null
    return richText.map((t, i) => {
        let node: React.ReactNode = t.plain_text

        if (t.annotations.bold)
            node = (
                <strong key={i} className="font-semibold">
                    {node}
                </strong>
            )
        if (t.annotations.italic) node = <em key={i}>{node}</em>
        if (t.annotations.strikethrough) node = <s key={i}>{node}</s>
        if (t.annotations.underline) node = <u key={i}>{node}</u>
        if (t.annotations.code) node = <code key={i}>{node}</code>
        if (t.href)
            node = (
                <a key={i} href={t.href} className={inlineLinkClass}>
                    {node}
                </a>
            )

        const hasAnnotation =
            t.annotations.bold ||
            t.annotations.italic ||
            t.annotations.strikethrough ||
            t.annotations.underline ||
            t.annotations.code ||
            t.href
        if (hasAnnotation) return node
        return richText.length > 1 ? <span key={i}>{node}</span> : node
    })
}
