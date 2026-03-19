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
  blocks: BlockObjectResponse[]
}

export type { PageObjectResponse, BlockObjectResponse }
