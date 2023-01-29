import '../styles/globals.css'
import NavLink from '../components/NavLink'
import ToggleModeButton from '../components/ToggleModeButton'

export default function RootLayout({ children }) {
    //Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    return (
        <html lang="en">
            <body className="mx-auto max-w-screen-lg p-2">
                <header>
                    <div className="mb-8 flex flex-row items-center justify-between">
                        <div />
                        <div className="flex flex-row items-center space-x-2 rounded-md bg-neutral-50 p-0.5 dark:bg-opacity-5">
                            <NavLink href="/about">About</NavLink>
                            <NavLink href="/blog">Blog</NavLink>
                            <NavLink href="/work">Work</NavLink>
                        </div>
                        <ToggleModeButton />
                    </div>
                </header>
                {children}
            </body>
        </html>
    )
}
