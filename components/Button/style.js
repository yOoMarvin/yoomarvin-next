import styled, { css } from "styled-components";
import { hexa, tint } from "../globals";
import { theme } from "../theme";

const base = css`
  -webkit-appearance: none;
  display: flex;
  flex: none;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 1em;
  font-weight: 500;
  white-space: nowrap;
  word-break: keep-all;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  line-height: 1;
  position: relative;
  text-align: center;
  padding: 0.5em 1em 0.5em 1em;
  box-shadow: "0 1px 2px rgba(0,0,0,0.04)"
};

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    transition: all 0.2s ease-in-out;
    box-shadow: ${theme.shadows.button};
  }
`;

export const OutlineButton = styled.button`
  ${base}
  border: 1px solid ${theme.border.default};
  color: ${theme.text.secondary};
  background-color: transparent;
  background-image: none;

  &:hover {
    color: ${theme.text.default};
    border: 1px solid ${theme.border.active};
    box-shadow: none;
  }

  &:active {
    border: 1px solid ${theme.text.placeholder};
  }
`;

export const GhostButton = styled.button`
  ${base}
  border: none;
  color: ${theme.text.secondary};
  box-shadow: none;
  background-color: transparent;
  background-image: none;

  &:hover {
    background: ${tint(theme.bg.wash, -3)};
    color: ${theme.text.default};
    box-shadow: none;
  }

  &:focus {
    box-shadow: 0 0 0 1px ${theme.bg.default},
      0 0 0 3px ${hexa(theme.text.tertiary, 0.08)};
  }
`;
