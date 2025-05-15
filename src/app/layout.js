import Footer from 'src/components/Footer'
import Navigation from 'src/components/Navigation'
import Provider from 'src/components/Provider'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/next'

export default function RootLayout({ children }) {
    //Layouts must accept a children prop.
    // This will be populated with nested layouts or pages

    return (
        <html lang="en">
            <body className="mx-auto">
                <Provider>
                    <Navigation />
                    <main className="mx-auto mt-24 max-w-screen-md px-2 sm:px-4 md:px-2">
                        {children}
                        <Analytics />
                    </main>
                    <Footer />
                </Provider>
            </body>
        </html>
    )
}
