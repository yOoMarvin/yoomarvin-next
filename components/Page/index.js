import React from "react";
import { ThemeProvider } from "styled-components";
import Header from "../Header";
import { theme } from "../theme";
import {
  Container,
  SectionHeading,
  Heading,
  Subheading,
  Paragraph,
  LargeHeading,
  LargeSubheading,
  InnerContainer
} from "./style";
import Footer from "../Footer";

// export to use it in pages/index.js
export {
  SectionHeading,
  Heading,
  Subheading,
  LargeHeading,
  LargeSubheading,
  Paragraph
};

export default function Page(props) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        <InnerContainer>{props.children}</InnerContainer>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
