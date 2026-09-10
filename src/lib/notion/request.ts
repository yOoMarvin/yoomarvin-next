import 'server-only'
import {
    APIErrorCode,
    ClientErrorCode,
    isNotionClientError,
} from '@notionhq/client'

// The SDK retries 429s on its own, honouring retry-after. What it does not
// retry is a 5xx on a POST — which is what every data-source query is — or a
// timeout, or a network-level failure. Those gaps are what turned a momentary
// Notion blip into a permanently prerendered 404.
//
// Kept deliberately short: these run inside `use cache`, and a prerender cache
// fill that takes longer than 50s fails the build.
const MAX_ATTEMPTS = 3
const BASE_DELAY_MS = 400

// Deterministic failures — retrying them only makes the build slower.
const PERMANENT_ERROR_CODES = new Set<string>([
    APIErrorCode.Unauthorized,
    APIErrorCode.RestrictedResource,
    APIErrorCode.ObjectNotFound,
    APIErrorCode.InvalidJSON,
    APIErrorCode.InvalidRequestURL,
    APIErrorCode.InvalidRequest,
    APIErrorCode.ValidationError,
    ClientErrorCode.InvalidPathParameter,
])

function isRetryable(error: unknown): boolean {
    if (isNotionClientError(error)) {
        return !PERMANENT_ERROR_CODES.has(error.code)
    }
    // Network-level failures (`fetch failed`, DNS, socket resets) never reach
    // the SDK's error types. Everything routed through here is a read, so
    // retrying is safe.
    return true
}

function backoffMs(attempt: number): number {
    return Math.round(BASE_DELAY_MS * 2 ** attempt * (0.5 + Math.random()))
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Runs a read-only Notion call, retrying the transient failures the SDK leaves
 * unhandled. Errors still throw once the attempts are exhausted — callers must
 * not turn them into empty results, or a blip becomes a cached 404.
 */
export async function notionRequest<T>(fn: () => Promise<T>): Promise<T> {
    for (let attempt = 0; ; attempt++) {
        try {
            return await fn()
        } catch (error) {
            if (attempt >= MAX_ATTEMPTS - 1 || !isRetryable(error)) {
                throw error
            }
            await sleep(backoffMs(attempt))
        }
    }
}
