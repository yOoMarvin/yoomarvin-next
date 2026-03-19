import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import { Footer } from '@/components/footer'
import { Nav } from '@/components/nav'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Marvin Messenzehl',
    template: '%s — Marvin Messenzehl',
  },
  description: 'Design engineer based in Germany.',
  metadataBase: new URL('https://marvinmessenzehl.com'),
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Nav />
          <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 pb-16 sm:py-32 space-y-16 sm:space-y-24">
            {children}
          </main>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
