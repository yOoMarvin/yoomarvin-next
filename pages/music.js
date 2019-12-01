import * as React from "react";
import Head from "next/head";
import Page, { SectionHeading, Heading, Subheading } from "../components/Page";
import MusicGrid from "../components/MusicGrid";

export default function Music() {
  return (
    <Page>
      <Head>
        <title>Marvin Messenzehl · Music</title>
        <meta
          content="Marvin Messenzehl · Music"
          name="og:title"
          key="og:title"
        />
        <meta
          content="Albums on repeat"
          name="og:description"
          key="og:description"
        />
        <meta
          content="Marvin Messenzehl · Music"
          name="twitter:title"
          key="og:image"
        />
      </Head>

      <SectionHeading>
        <Heading>Music</Heading>
        <Subheading>Albums on repeat</Subheading>
      </SectionHeading>

      <MusicGrid />
    </Page>
  );
}
