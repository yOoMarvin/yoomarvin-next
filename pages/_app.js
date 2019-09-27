import React from "react";
import App from "next/app";
import Head from "next/head";
import { GlobalStyles } from "../static/normalize";

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <GlobalStyles />

        <Head>
          <title>Marvin Messenzehl</title>
          <meta content="@yoomarvin" name="twitter:site" key="twitter:site" />
          <meta content="Marvin Messenzehl" name="og:title" key="og:title" />
          <meta
            content="Developer"
            name="og:description"
            key="og:description"
          />
          <meta
            content="Marvin Messenzehl"
            name="twitter:title"
            key="twitter:title"
          />
          <meta name="og:type" content="website" key="og:type" />
          <meta
            name="og:site_name"
            content="Marvin Messenzehl"
            key="og:site_name"
          />
          <meta name="theme-color" content="#16171A" key="theme-color" />
          <meta name="description" content="Developer" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="static/meta/apple-touch-icon.png"
          />
        </Head>
        <Component {...pageProps} />
      </div>
    );
  }
}

export default MyApp;
