import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/footer'
import { Nav } from '@/components/nav'
import '../styles/globals.css'

export const metadata: Metadata = {
    title: {
        default: 'Marvin Messenzehl — Design Engineer',
        template: '%s — Marvin Messenzehl',
    },
    description: 'Design engineer based in Germany.',
    metadataBase: new URL('https://marvinmessenzehl.com'),
    openGraph: {
        title: 'Marvin Messenzehl — Design Engineer',
        description: 'Design engineer based in Germany.',
        url: 'https://marvinmessenzehl.com',
        siteName: 'Marvin Messenzehl',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Marvin Messenzehl — Design Engineer',
        description: 'Design engineer based in Germany.',
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    appleWebApp: {
        title: 'Marvin Messenzehl',
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Suspense>
                    <Nav />
                </Suspense>
                <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 pb-16 sm:py-32 space-y-16 sm:space-y-24">
                    {children}
                </main>
                <Footer />
                <Analytics />
            </body>
        </html>
    )
}
