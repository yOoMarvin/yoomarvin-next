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
                    ? 'rounded-xl bg-neutrals-50 bg-opacity-90 px-4 py-2 font-medium text-text-primary'
                    : 'transition-base rounded-xl px-4 py-2 text-text-secondary  hover:bg-neutrals-50 hover:bg-opacity-60 hover:text-text-primary'
            }
            href={href}
        >
            {children}
        </Link>
    )
}
