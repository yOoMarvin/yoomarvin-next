import Head from 'next/head'
import Script from 'next/script'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <Script
                    type="text/javascript"
                    src="https://cdn.reportic.de/r.js"
                    data-site="411867"
                />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
