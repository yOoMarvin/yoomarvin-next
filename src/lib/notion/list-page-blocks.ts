import 'server-only'
import { notion } from './client'
import type { BlockObjectResponse, NotionBlock } from './types'

export async function listPageBlocks(pageId: string): Promise<NotionBlock[]> {
    const blocks: NotionBlock[] = []
    let cursor: string | undefined

    do {
        const response = await notion.blocks.children.list({
            block_id: pageId,
            start_cursor: cursor,
            page_size: 100,
        })
        const enriched = await Promise.all(
            (response.results as BlockObjectResponse[]).map((block) =>
                withNestedChildren(block)
            )
        )
        blocks.push(...enriched)
        cursor = response.has_more
            ? (response.next_cursor ?? undefined)
            : undefined
    } while (cursor)

    return blocks
}

async function withNestedChildren(
    block: BlockObjectResponse
): Promise<NotionBlock> {
    if (!block.has_children) return block as NotionBlock

    const children = await listPageBlocks(block.id)
    return {
        ...(block as NotionBlock),
        children,
    }
}
