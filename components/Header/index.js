import * as React from "react";
import Link from "next/link";
import Icon from "../Icon";
import { Container, Logo, ButtonRowContainer, Icons } from "./style";
import { OutlineButton } from "../Button";

export default function Header() {
  return (
    <Container>
      <Link href="/">
        <a style={{ display: "flex", alignItems: "center" }}>
          <Logo>Marvin Messenzehl</Logo>
        </a>
      </Link>
      <ButtonRowContainer>
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
        <Link href="/about">
          <a>
            <OutlineButton>About</OutlineButton>
          </a>
        </Link>
      </ButtonRowContainer>
    </Container>
  );
}
