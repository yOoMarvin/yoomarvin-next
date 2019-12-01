import * as React from "react";
import Head from "next/head";
import Page, { SectionHeading, Heading, Subheading } from "../components/Page";
import BooksGrid from "../components/BooksGrid";

export default function Books() {
  return (
    <Page>
      <Head>
        <title>Marvin Messenzehl · Books</title>
        <meta
          content="Marvin Messenzehl · Books"
          name="og:title"
          key="og:title"
        />
        <meta
          content="What I’m reading"
          name="og:description"
          key="og:description"
        />
        <meta
          content="Marvin Messenzehl · Books"
          name="twitter:title"
          key="og:image"
        />
      </Head>

      <SectionHeading>
        <Heading>Books</Heading>
        <Subheading>What I’m reading</Subheading>
      </SectionHeading>

      <BooksGrid />
    </Page>
  );
}
