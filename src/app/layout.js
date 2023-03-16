import '../styles/globals.css'
import ToggleThemeButton from '../components/ToggleThemeButton'
import Provider from '../components/Provider'
import Image from 'next/image'
import Navigation from '../components/Navigation'
import Footer from 'src/components/Footer'

export default function RootLayout({ children }) {
    //Layouts must accept a children prop.
    // This will be populated with nested layouts or pages

    return (
        <html lang="en">
            <body className="mx-auto">
                <Provider>
                    <Navigation />
                    <main className="mx-auto mt-24 min-h-screen max-w-screen-md px-2 sm:px-4 md:px-2">
                        {children}
                        <Footer />
                    </main>
                </Provider>
            </body>
        </html>
    )
}
