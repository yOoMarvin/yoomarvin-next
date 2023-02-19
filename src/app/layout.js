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
            <body className="mx-auto max-w-screen-lg p-2">
                <Provider>
                    <header>
                        <div className="top-0 mb-8 flex flex-row items-center justify-between py-2 backdrop-blur-lg">
                            <Link href="/">
                                <div className="h-10 w-10 rounded-full bg-neutral-500" />
                            </Link>
                            <div className="flex flex-row items-center space-x-2">
                                <NavLink href="/about">About</NavLink>
                                <NavLink href="/blog">Blog</NavLink>
                                <NavLink href="/work">Work</NavLink>
                            </div>
                            <ToggleThemeButton />
                        </div>
                    </header>
                    {children}
                </Provider>
            </body>
        </html>
    )
}
