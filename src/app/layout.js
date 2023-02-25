import '../styles/globals.css'
import NavLink from '../components/NavLink'
import ToggleThemeButton from '../components/ToggleThemeButton'
import Provider from './Provider'
import Image from 'next/image'
import Link from 'next/link'

export default function RootLayout({ children }) {
    //Layouts must accept a children prop.
    // This will be populated with nested layouts or pages

    return (
        <html lang="en">
            <body className="mx-auto">
                <Provider>
                    <header className="fixed top-0 z-50 w-screen bg-neutrals-default bg-opacity-60 backdrop-blur-md">
                        <div className="mx-auto flex w-[768px] flex-row items-center justify-between py-2">
                            <Link href="/">
                                <div className="flex h-10 w-10 flex-row items-center justify-center rounded-xl bg-neutrals-100 bg-opacity-80 text-lg font-bold text-text-primary transition">
                                    M
                                </div>
                            </Link>
                            <div className="flex flex-row items-center space-x-2 rounded-xl px-2">
                                <NavLink href="/about">About</NavLink>
                                <NavLink href="/blog">Blog</NavLink>
                                <NavLink href="/work">Work</NavLink>
                            </div>
                            <ToggleThemeButton />
                        </div>
                    </header>
                    <main className="mx-auto mt-24 max-w-screen-md p-2">
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}
