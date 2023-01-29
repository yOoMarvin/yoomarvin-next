'use client'

import Link from 'next/Link'
import { usePathname } from 'next/navigation'

export default function NavLink({ href, children }) {
    let path = usePathname()
    let active = path.includes(href)

    return (
        <Link
            className={
                active
                    ? 'rounded-md bg-white px-4 py-2 text-black dark:bg-neutral-900 dark:text-white'
                    : 'transition-base rounded-md px-4 py-2 text-neutral-500  hover:text-black  dark:hover:text-white'
            }
            href={href}
        >
            {children}
        </Link>
    )
}
