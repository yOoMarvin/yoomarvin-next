import styled from "styled-components";
import { theme } from "../theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  max-width: 100%;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1 0 auto;
  padding-top: 64px;
  padding-left: 32px;
  padding-right: 32px;
  position: relative;
  width: 100%;
  max-width: 768px;
  @media (max-width: 752px) {
    align-items: flex-start;
    max-width: 100%;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 48px;
  }
`;

export const SectionHeading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 72px 0 0;
  @media (max-width: 968px) {
    align-items: flex-start;
    max-width: 100%;
  }
`;

export const Heading = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.text.default};
  @media (max-width: 968px) {
    max-width: 100%;
  }
`;

export const Subheading = styled.h4`
  font-size: 18px;
  font-weight: 400;
  color: ${theme.text.tertiary};
  a {
    color: ${theme.text.default};
    font-weight: 500;
  }
  @media (max-width: 968px) {
    max-width: 100%;
  }
`;

export const Paragraph = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: ${theme.text.tertiary};
  margin-bottom: 16px;
  a {
    color: ${theme.text.default};
    font-weight: 500;
  }
  @media (max-width: 968px) {
    max-width: 100%;
  }
`;

export const LargeHeading = styled(Heading)`
  font-size: 32px;
`;

export const LargeSubheading = styled(Subheading)`
  font-size: 20px;
`;
