import Link from 'next/link'

export default function SitemapPage() {
  return (
    <>
      <section>
        <h1>Sitemap</h1>
        <p>
          I&apos;ll chuck some links up here soon, so you can easily find those
          not-so-obvious pages, too.
        </p>
      </section>

      <section>
        <h2>Sideprojects</h2>
        <Link href="/fighill">FigHill</Link> - My very first Figma widget, that
        makes design progress visible.
      </section>

      <section>
        <h2>Pages</h2>
        <Link href="/now">Now</Link> - What I&apos;m focused on right now.
      </section>
    </>
  )
}
