import styled from "styled-components";
import { Shadows } from "../theme";

export const StyledCard = styled.div`
  position: relative;
  background: ${theme.bg.default};
  border-radius: 8px;
  ${Shadows.default};

  &:hover {
    ${Shadows.hover};
  }

  &:active {
    ${Shadows.active};
  }
`;
