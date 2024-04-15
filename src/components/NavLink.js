'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ href, children }) {
    let path = usePathname()
    let active = path.includes(href)

    return (
        <Link
            className={
                active
                    ? 'rounded-xl bg-ui-neutral px-4 py-2 text-lg font-medium text-onUi-high sm:text-base'
                    : 'transition-base rounded-xl px-4 py-2 text-lg text-onUi-medium hover:bg-ui-low hover:text-onUi-high sm:text-base'
            }
            href={href}
        >
            {children}
        </Link>
    )
}

export function MobileNavLink({ href, children }) {
    let path = usePathname()
    let active = path.includes(href)
    return (
        <a
            className={
                active
                    ? 'rounded-xl bg-ui-neutral px-4 py-2 text-lg font-medium text-onUi-high sm:text-base'
                    : 'transition-base rounded-xl px-4 py-2 text-lg text-onUi-medium hover:bg-ui-low hover:text-onUi-high sm:text-base'
            }
            href={href}
        >
            {children}
        </a>
    )
}
