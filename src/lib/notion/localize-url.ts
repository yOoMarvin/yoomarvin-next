import manifest from '@/generated/notion-asset-manifest.json'

const assetManifest = manifest as Record<string, string>

// Rewrites Notion-hosted URLs to locally downloaded assets when a match exists
// in the build-time manifest. Falls back to the original URL so local dev works
// without running the sync script first (raw Notion URLs are valid for ~1 hour).
export function localizeNotionUrl(url: string): string
export function localizeNotionUrl(url: null | undefined): null
export function localizeNotionUrl(url: string | null | undefined): string | null
export function localizeNotionUrl(
    url: string | null | undefined
): string | null {
    if (!url) return null
    try {
        const { pathname } = new URL(url)
        return assetManifest[pathname] ?? url
    } catch {
        return url
    }
}
