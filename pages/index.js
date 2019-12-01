import React from "react";
import Link from "next/link";
import Page, { SectionHeading, Heading, Subheading } from "../components/Page";

import BlogGrid from "../components/BlogGrid";
import OpenSourceGrid from "../components/OpenSourceGrid";
import BooksGrid from "../components/BooksGrid";

// uses the Page component as global page structure
// headings are references from the styles of the Page component
function Home() {
  return (
    <Page>
      <SectionHeading>
        <Link href="/blog">
          <a>
            <Heading>Blog</Heading>
          </a>
        </Link>
        <Subheading>Short updates about tech and life</Subheading>
      </SectionHeading>

      <BlogGrid truncated />

      <SectionHeading>
        <Link href="/oss">
          <a>
            <Heading>Open Source</Heading>
          </a>
        </Link>
        <Subheading>What I'm working on</Subheading>
      </SectionHeading>

      <OpenSourceGrid />

      <SectionHeading>
        <Link href="/books">
          <a>
            <Heading>Books</Heading>
          </a>
        </Link>
        <Subheading>What I'm reading</Subheading>
      </SectionHeading>

      <BooksGrid />

      <SectionHeading>
        <Link href="/music">
          <a>
            <Heading>Music</Heading>
          </a>
        </Link>
        <Subheading>Monthly playlists</Subheading>
      </SectionHeading>
    </Page>
  );
}

export default Home;
