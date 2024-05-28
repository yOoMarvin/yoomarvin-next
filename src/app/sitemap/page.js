import Link from 'next/link'

export default function SitemapPage() {
    return (
        <>
            <section>
                <h1 className="section__title">Sitemap</h1>
                <h2 className="section__subtitle">Main Pages</h2>
                <ul className="list-disc">
                    <li className="link-basic">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="link-basic">
                        <Link href="/">About myself</Link>
                    </li>
                    <li className="link-basic">
                        <Link href="/">Blog</Link>
                    </li>
                    <li className="link-basic">
                        <Link href="/">Work</Link>
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="section__subtitle">Hidden Gems</h2>
                <ul className="list-disc">
                    <li className="link-basic">
                        <Link href="/">Uses</Link>
                    </li>
                    <li className="link-basic">
                        <Link href="/">Work With Me</Link>
                    </li>
                    <li className="link-basic">
                        <Link href="/">Now</Link>
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="section__subtitle">Here for a reason</h2>
                <ul className="list-disc">
                    <li className="link-basic">
                        <Link href="/">Imprint</Link>
                    </li>
                    <li className="link-basic">
                        <Link href="/">Privacy</Link>
                    </li>
                </ul>
            </section>
        </>
    )
}
