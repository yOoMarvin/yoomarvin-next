import type {
    PageObjectResponse,
    BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type PostStatus = 'Draft' | 'Published' | 'Archived'

export interface PostMeta {
    id: string
    title: string
    slug: string
    status: PostStatus
    date: string | null
    excerpt: string
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

export type NotionBlock = BlockObjectResponse & {
    children?: NotionBlock[]
}

export type { PageObjectResponse, BlockObjectResponse }
