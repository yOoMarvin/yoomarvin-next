function getEnv(name: string): string {
    const value = process.env[name]
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`)
    }
    return value
}

export function getNotionToken(): string {
    return getEnv('NOTION_TOKEN')
}

export function getWritingDbId(): string {
    return getEnv('NOTION_WRITING_DB_ID')
}

export function getWorkDbId(): string {
    return getEnv('NOTION_WORK_DB_ID')
}
