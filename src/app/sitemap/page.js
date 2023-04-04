'use client'
import { useTheme } from 'next-themes'

export default function SitemapPage() {
    const { theme, setTheme } = useTheme()

    return (
        <section>
            <h1 className="section__title">Sitemap</h1>
            <p>
                I'll chuck some links up here soon, so you can easily find those
                not-so-obvious pages.
            </p>
            <p>The current theme is: {theme}</p>
        </section>
    )
}
