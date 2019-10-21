import styled from "styled-components";
import { theme } from "../theme";

export const Container = styled.div`
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

export const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 24px 0 0;

  @media (max-width: 968px) {
    align-items: flex-start;
    max-width: 100%;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: ${theme.border.default};
  margin: 32px 0;
`;
