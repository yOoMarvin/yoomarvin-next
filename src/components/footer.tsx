import Link from 'next/link'
import { socialLinks } from '@/lib/config'
import { isExternalHref } from '@/lib/utils'

export function Footer() {
    return (
        <footer>
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
                <div className="flex justify-center gap-6 py-8">
                    {socialLinks.map(({ label, href }) => {
                        const isExternal = isExternalHref(href)
                        return (
                            <Link
                                key={label}
                                href={href}
                                target={isExternal ? '_blank' : undefined}
                                rel={
                                    isExternal
                                        ? 'noopener noreferrer'
                                        : undefined
                                }
                                className="text-base text-[var(--text-secondary)] transition-colors duration-100 hover:text-[var(--text-primary)] hover:underline"
                            >
                                {label}
                            </Link>
                        )
                    })}
                </div>
                <hr className="border-[var(--border-default)]" />
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                    <span className="font-mono text-sm text-[var(--text-primary)]">
                        Keep creating awesome stuff
                    </span>
                    <span className="text-sm text-[var(--text-tertiary)]">
                        © 2026 Marvin Messenzehl
                    </span>
                    <div className="flex gap-4 text-sm text-[var(--text-tertiary)]">
                        <Link
                            href="/imprint"
                            className="transition-colors duration-100 hover:text-[var(--text-primary)] hover:underline"
                        >
                            Imprint
                        </Link>
                        <Link
                            href="/privacy"
                            className="transition-colors duration-100 hover:text-[var(--text-primary)] hover:underline"
                        >
                            Privacy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
