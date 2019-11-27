import * as React from "react";
import Head from "next/head";
import Page, { SectionHeading, Heading, Subheading } from "../components/Page";
import OpenSourceGrid from "../components/OpenSourceGrid";

export default function OSS() {
  return (
    <Page>
      <Head>
        <title>Marvin Messenzehl · Open Source</title>
        <meta
          content="Marvin Messenzehl · Open Source™"
          name="og:title"
          key="og:title"
        />
        <meta
          content="What I’m working on"
          name="og:description"
          key="og:description"
        />
        <meta
          content="Marvin Messenzehl · Open Source™"
          name="twitter:title"
          key="og:image"
        />
      </Head>

      <SectionHeading>
        <Heading>Open Source</Heading>
        <Subheading>What I’m working on</Subheading>
      </SectionHeading>

      <OpenSourceGrid />
    </Page>
  );
}
