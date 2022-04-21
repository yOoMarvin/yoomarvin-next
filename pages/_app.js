import Script from 'next/script'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Script
                type="text/javascript"
                src="https://cdn.reportic.de/r.js"
                data-site="338191"
            />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
