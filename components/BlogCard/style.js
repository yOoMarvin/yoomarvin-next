import styled from "styled-components";
import { theme } from "../theme";
import { Shadows } from "../globals";

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 12px 16px;
  padding-left: 72px;
`;

export const DetailsText = styled.p`
  font-size: 14px;
  color: ${theme.text.tertiary};
`;

export const Title = styled.p`
  font-size: 18px;
  color: ${theme.text.default};
  font-weight: 600;
`;

// currently not used...need an idea for the content here
export const DateContainer = styled.span`
  background: ${theme.bg.default};
  width: 64px;
  height: 64px;
  position: absolute;
  color: ${theme.text.default};
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  left: -8px;
  top: -8px;
  border-radius: 16px;
  ${Shadows.default};

  &:hover {
    ${Shadows.hover};
  }

  &:active {
    ${Shadows.active};
  }
`;
