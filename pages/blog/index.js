import * as React from "react";
import Head from "next/head";
import Page, {
  SectionHeading,
  Heading,
  Subheading
} from "../../components/Page";
import BlogGrid from "../../components/BlogGrid";

export default function Blog() {
  return (
    <Page>
      <Head>
        <title>Marvin Messenzehl · Blog</title>
        <meta
          content="Marvin Messenzehl · Blog"
          name="og:title"
          key="og:title"
        />
        <meta
          content="Short updates about tech and life"
          name="og:description"
          key="og:description"
        />
      </Head>

      <SectionHeading>
        <Heading>Blog</Heading>
        <Subheading>Short updates about tech and life</Subheading>
      </SectionHeading>

      <BlogGrid truncated={false} />
    </Page>
  );
}
