import React from "react";
import { Container, Description, Icons } from "./style";
import Link from "next/link";
import Icon from "../Icon";

export default function Footer() {
  return (
    <Container data-cy="footer">
      <Icons>
        <a
          href="https://twitter.com/yoomarvin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon glyph="twitter" />
        </a>

        <a
          href="https://github.com/yoomarvin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon glyph="github" />
        </a>
      </Icons>

      <Description>
        Copyright whenever. This is
        <a
          href="https://github.com/yoomarvin/yoomarvin-next"
          target="_blank"
          rel="noopener noreferrer"
        >
          open source
        </a>
        .
      </Description>
      <Description>
        Read the <Link href="/imprint">imprint</Link>.
      </Description>
    </Container>
  );
}
