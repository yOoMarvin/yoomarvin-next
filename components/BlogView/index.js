import React from "react";
import Head from "next/head";
import Link from "next/link";
import { blog } from "../../data";
import {
  LargeHeading,
  LargeSubheading,
  SectionHeading,
  Heading
} from "../Page";
import BlogGrid from "../BlogGrid";
//import PostShareButtons from "../PostShareButtons";
import Markdown from "../Markdown";
import { Container, HeadingContainer, Divider } from "./style";

export default function BlogView(props) {
  const { post } = props;

  const datestring = post.createdAt;
  const title = `Marvin Messenzehl · Blog · ${post.title}`;
  const subheading = `${datestring}`;

  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta content={title} name="og:title" key="og:title" />
        <meta
          content={post.description}
          name="og:description"
          key="og:description"
        />
        <meta
          content={`Marvin Messenzehl · Blog · ${post.title}`}
          name="twitter:title"
          key="og:image"
        />
      </Head>

      <HeadingContainer>
        <LargeHeading>{post.title}</LargeHeading>
        <LargeSubheading>{subheading}</LargeSubheading>
      </HeadingContainer>

      <div style={{ padding: "16px" }} />

      {/*<PostShareButtons post={post} /> */}

      <div style={{ padding: "16px" }} />

      <Markdown>{post.content}</Markdown>

      {/*<PostShareButtons post={post} /> */}
      <Divider />

      <SectionHeading>
        <Heading>Recent blog posts</Heading>
      </SectionHeading>
      <BlogGrid truncated={true} />
    </Container>
  );
}
