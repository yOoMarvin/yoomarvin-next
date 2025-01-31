import Link from 'next/link'

export default function SitemapPage() {
    return (
        <>
            <section>
                <h1 className="section__title">Sitemap</h1>
                <p>
                    I'll chuck some links up here soon, so you can easily find
                    those not-so-obvious pages, too.
                </p>
            </section>

            <section>
                <h2 className="section__subtitle">Sideprojects</h2>
                <Link href="/fighill" className="link-basic">
                    FigHill
                </Link>{' '}
                - My very first Figma widget, that makes design progress
                visible.
            </section>
        </>
    )
}
