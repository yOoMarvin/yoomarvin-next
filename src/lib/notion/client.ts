import { Client } from '@notionhq/client'
import { getNotionToken } from './config'

export const notion = new Client({
    auth: getNotionToken(),
})
