import * as React from "react";
import Link from "next/link";
import { Container, Logo, ButtonRowContainer, Icons } from "./style";

export default function Header() {
  return (
    <Container>
      <Link href="/">
        <Logo>Marvin Messenzehl</Logo>
      </Link>
      <ButtonRowContainer>
        <Link>Link 1</Link>
        <Link>Link 2</Link>
        <button>About</button>
      </ButtonRowContainer>
    </Container>
  );
}
