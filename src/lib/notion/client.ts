import { Client } from '@notionhq/client'

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const WRITING_DB_ID = process.env.NOTION_WRITING_DB_ID!
