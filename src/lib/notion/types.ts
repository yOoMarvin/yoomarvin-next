import type {
    PageObjectResponse,
    BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type PostStatus =
    | 'Proposal'
    | 'Ready to draft'
    | 'Needs input'
    | 'Ready for review'
    | 'Draft'
    | 'Published'
    | 'Archived'

export interface PostMeta {
    id: string
    title: string
    slug: string
    status: PostStatus
    date: string | null
    excerpt: string
    likes: number
}

export interface Post extends PostMeta {
    blocks: NotionBlock[]
}

export type WorkType = 'Personal' | 'Inhouse' | 'Freelance' | 'Others'
export type WorkLinkMode = 'Internal' | 'External'
export type WorkStatus = 'Draft' | 'Published' | 'Archived'

export interface WorkMeta {
    id: string
    title: string
    slug: string
    status: WorkStatus
    type: WorkType
    date: string | null
    dateEnd: string | null
    excerpt: string
    coverImage: string | null
    linkMode: WorkLinkMode
    externalUrl: string
    icon: string
}

export interface WorkItem extends WorkMeta {
    blocks: NotionBlock[]
}

export interface TilMeta {
    id: string
    title: string
    status: PostStatus
    date: string | null
    likes: number
}

export interface TilEntry extends TilMeta {
    blocks: NotionBlock[]
}

export type NotionBlock = BlockObjectResponse & {
    children?: NotionBlock[]
}

export type { PageObjectResponse, BlockObjectResponse }

/**
 * A build-time copy of everything the site renders from Notion. The prebuild
 * asset sync already walks every page and block, so it writes this out and the
 * app reads it instead of crawling Notion a second time — see the note in
 * `content.ts`.
 */
export interface DatabaseSnapshot {
    pages: PageObjectResponse[]
    /** Page id -> that page's block tree, nested children included. */
    blocks: Record<string, NotionBlock[]>
}

export interface ContentSnapshot {
    generatedAt: string
    writing: DatabaseSnapshot
    work: DatabaseSnapshot
    til: DatabaseSnapshot
}

export type SnapshotKey = 'writing' | 'work' | 'til'
