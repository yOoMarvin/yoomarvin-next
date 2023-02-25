'use client'

import Link from 'next/link'
import NavLink, { MobileNavLink } from './NavLink'
import ToggleThemeButton from './ToggleThemeButton'
import HomeButton from './HomeButton'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Work', href: '/work' },
]

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="fixed top-0 z-10 w-screen bg-neutrals-default bg-opacity-60 px-2 backdrop-blur-md sm:px-4">
            <nav className="mx-auto flex flex-row items-center justify-between py-4 md:w-[768px]">
                {/* Home Button. Always visible */}
                <HomeButton />
                {/* Mobile Menu Icon*/}
                <div className="flex md:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-4 text-text-primary"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                {/* Desktop menu */}
                <div className="hidden space-x-2 md:flex md:flex-row md:items-center">
                    {navigation.map((item) => (
                        <NavLink key={item.name} href={item.href}>
                            {item.name}
                        </NavLink>
                    ))}
                </div>
                <div className="hidden md:block">
                    <ToggleThemeButton />
                </div>
            </nav>

            {/* Mobile Dialog, which will be shown based on the state*/}
            <Dialog
                as="div"
                className="md:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-20" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-30 w-full overflow-y-auto bg-neutrals-default bg-opacity-80 py-4 px-2 backdrop-blur-lg sm:px-4">
                    <div className="flex items-center justify-between">
                        <HomeButton />
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-4 text-text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-8">
                        <div className="mb-8 flex flex-col space-y-4 py-4">
                            {navigation.map((item) => (
                                <MobileNavLink key={item.name} href={item.href}>
                                    {item.name}
                                </MobileNavLink>
                            ))}
                        </div>

                        <ToggleThemeButton />
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
