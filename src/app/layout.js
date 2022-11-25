import Header from '../components/Header'
import '../styles/globals.css'

export default function RootLayout({ children }) {
    //Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    return (
        <html lang="en">
            <body className="mx-auto max-w-screen-lg">
                <Header />
                {children}
            </body>
        </html>
    )
}
