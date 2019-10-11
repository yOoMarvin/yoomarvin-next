// global helpers and functions

import { css } from "styled-components";
import { theme } from "../theme";

export const Shadows = {
  default: css`
    box-shadow: ${theme.shadows.default};
    transition: ${theme.animations.default};
  `,
  hover: css`
    box-shadow: ${theme.shadows.hover};
    transition: ${theme.animations.hover};
  `,
  active: css`
    box-shadow: ${theme.shadows.active};
    transition: ${theme.animations.active};
  `
};

// css for blog content (written), so I mean content is THE REAL content
export const Content = css`
  h1 {
    font-size: 40px;
    font-weight: 700;
    color: ${theme.text.default};
    margin-top: 28px;
  }

  h2 {
    font-size: 32px;
    font-weight: 700;
    color: ${theme.text.default};
    margin-top: 26px;
  }

  h3 {
    font-size: 24px;
    font-weight: 600;
    color: ${theme.text.default};
    margin-top: 24px;
  }

  h4 {
    font-size: 20px;
    font-weight: 600;
    color: ${theme.text.default};
    margin-top: 16px;
  }

  h5 {
    font-size: 18px;
    font-weight: 600;
    color: ${theme.text.default};
    margin-top: 16px;
  }

  h6 {
    font-size: 16px;
    font-weight: 500;
    color: ${theme.text.default};
    margin-top: 16px;
    text-transform: uppercase;
  }

  p {
    font-size: 18px;
    font-weight: 400;
    line-height: 1.6;
    color: ${theme.text.secondary};
    margin-top: 16px;
  }

  a {
    color: ${theme.brand.default};
    font-weight: 500;
  }

  a:hover {
    text-decoration: underline;
  }

  a:hover button {
    text-decoration: none !important;
  }

  ul,
  ol {
    margin-left: 24px;
    margin-top: 12px;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.text.secondary};
    margin-top: 16px;
  }

  li {
    line-height: 1.6;
    padding: 4px 0;
  }

  strong {
    font-weight: 600;
  }
`;
