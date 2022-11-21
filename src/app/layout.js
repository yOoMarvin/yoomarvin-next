import '../styles/globals.css'

export default function RootLayout({
    //Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}) {
    return (
        <html lang="en">
            <body className="mx-auto max-w-screen-lg">{children}</body>
        </html>
    )
}
