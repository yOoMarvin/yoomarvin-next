import 'server-only'
import { notion } from './client'

const dataSourceIds = new Map<string, string>()

export async function resolveDataSourceId(databaseId: string): Promise<string> {
    const cached = dataSourceIds.get(databaseId)
    if (cached) return cached

    const db = await notion.databases.retrieve({ database_id: databaseId })
    const dataSources = (db as Record<string, unknown>).data_sources as
        | Array<{ id: string }>
        | undefined

    if (!dataSources?.length) {
        throw new Error(
            `No data sources found on database ${databaseId}. ` +
                'Ensure the database is shared with the integration.'
        )
    }

    const dataSourceId = dataSources[0].id
    dataSourceIds.set(databaseId, dataSourceId)
    return dataSourceId
}
