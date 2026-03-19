import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

export function renderBlocks(blocks: BlockObjectResponse[]) {
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < blocks.length) {
    const block = blocks[i]

    if (block.type === 'bulleted_list_item') {
      const items: BlockObjectResponse[] = []
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        items.push(blocks[i])
        i++
      }
      elements.push(
        <ul key={items[0].id}>
          {items.map((item) => (
            <li key={item.id}>
              {renderRichText((item as any).bulleted_list_item.rich_text)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    if (block.type === 'numbered_list_item') {
      const items: BlockObjectResponse[] = []
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        items.push(blocks[i])
        i++
      }
      elements.push(
        <ol key={items[0].id}>
          {items.map((item) => (
            <li key={item.id}>
              {renderRichText((item as any).numbered_list_item.rich_text)}
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

function Block({ block }: { block: BlockObjectResponse }) {
  const b = block as any

  switch (block.type) {
    case 'paragraph':
      return <p>{renderRichText(b.paragraph.rich_text)}</p>
    case 'heading_1':
      return <h1>{renderRichText(b.heading_1.rich_text)}</h1>
    case 'heading_2':
      return <h2>{renderRichText(b.heading_2.rich_text)}</h2>
    case 'heading_3':
      return <h3>{renderRichText(b.heading_3.rich_text)}</h3>
    case 'quote':
      return <blockquote>{renderRichText(b.quote.rich_text)}</blockquote>
    case 'code':
      return (
        <pre>
          <code>{renderRichText(b.code.rich_text)}</code>
        </pre>
      )
    case 'image': {
      const src =
        b.image.type === 'external'
          ? b.image.external.url
          : b.image.file.url
      const caption = b.image.caption?.[0]?.plain_text ?? ''
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={caption} className="w-full rounded-lg" />
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-[var(--text-tertiary)]">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    }
    case 'divider':
      return <hr />
    default:
      return null
  }
}

function renderRichText(richText: RichTextItemResponse[]) {
  if (!richText?.length) return null
  return richText.map((t, i) => {
    let node: React.ReactNode = t.plain_text

    if (t.annotations.bold) node = <strong key={i}>{node}</strong>
    if (t.annotations.italic) node = <em key={i}>{node}</em>
    if (t.annotations.strikethrough) node = <s key={i}>{node}</s>
    if (t.annotations.underline) node = <u key={i}>{node}</u>
    if (t.annotations.code) node = <code key={i}>{node}</code>
    if (t.href)
      node = (
        <a key={i} href={t.href}>
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
