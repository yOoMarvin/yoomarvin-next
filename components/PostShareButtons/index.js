import * as React from "react";
import { FacebookButton, TwitterButton, CopyLinkButton } from "../Button";
import { Container } from "./style";

export default function PostShareButtons(props) {
  const { post } = props;

  return (
    <Container>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=https://marvinmessenzehl.com/blog/${post.slug}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookButton>Share</FacebookButton>
      </a>

      <a
        href={`https://twitter.com/share?text=${post.title} by @yoomarvin&url=https://marvinmessenzehl.com/blog/${post.slug}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TwitterButton>Tweet</TwitterButton>
      </a>

      <CopyLinkButton text={`https://marvinmessenzehl.com/blog/${post.slug}`}>
        Copy
      </CopyLinkButton>
    </Container>
  );
}
