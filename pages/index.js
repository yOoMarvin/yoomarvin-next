import React from "react";
import Link from "next/link";
import Page, { SectionHeading, Heading, Subheading } from "../components/Page";

import BlogCard from "../components/BlogCard";

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

      <BlogCard title="Hello World" details="a story about life" slug="life" />

      <SectionHeading>
        <Link href="/oss">
          <a>
            <Heading>Open Source</Heading>
          </a>
        </Link>
        <Subheading>What I'm working on</Subheading>
      </SectionHeading>
      <SectionHeading>
        <Link href="/books">
          <a>
            <Heading>Books</Heading>
          </a>
        </Link>
        <Subheading>What I'm reading</Subheading>
      </SectionHeading>
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
