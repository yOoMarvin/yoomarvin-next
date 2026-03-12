import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import { Footer } from '@/components/footer'
import { Nav } from '@/components/nav'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Marvin Messenzehl',
  description: 'Design engineer based in Germany.',
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
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
