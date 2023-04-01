import Link from 'next/link'
import HomeButton from './HomeButton'

export default function Footer() {
    return (
        <footer className="mt-16 mb-4 flex w-full flex-col justify-between border-t border-neutrals-50 py-8 text-text-secondary sm:flex-row mx-auto max-w-screen-md px-2 sm:px-4 md:px-2">
            <div className="mb-4">
                <HomeButton />
            </div>

            <div className="text-tertiary max-w-lg text-sm">
                <p className="mb-4">
                    I'm a designer and UX consultant based in Germany. For
                    project inquiries please email{' '}
                    <a
                        className="link-basic"
                        href="mailto:hello@marvinmessenzehl.com"
                    >
                        hello@marvinmessenzehl.com.
                    </a>
                </p>
                <p className="mb-4">
                    The website uses no cookies, no tracking. Just simple,
                    privacy focused analytics
                </p>

                {/* Footer Links, Legal Stuff */}
                <div className="flex flex-row space-x-1">
                    <Link className="link-basic" href="/sitemap">
                        Sitemap
                    </Link>
                    <span>‧</span>
                    <Link className="link-basic" href="/imprint">
                        Imprint
                    </Link>
                    <span>‧</span>
                    <Link className="link-basic" href="/privacy">
                        Privacy
                    </Link>
                </div>
            </div>
        </footer>
    )
}
