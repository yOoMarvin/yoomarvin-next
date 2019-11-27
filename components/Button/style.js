import styled, { css } from "styled-components";
import { hexa, tint } from "../globals";
import { theme } from "../theme";

const getPadding = size => {
  switch (size) {
    case "small":
      return "4px 8px";
    case "default":
      return "10px 20px";
    case "large":
      return "14px 28px";
    default: {
      return "10px 20px";
    }
  }
};

const getFontSize = size => {
  switch (size) {
    case "small":
      return "14px";
    case "default":
      return "16px";
    case "large":
      return "18px";
    default: {
      return "16px";
    }
  }
};

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

export const Button = styled.button`
  ${base}
  border: 1px solid ${theme.border.default};
  color: ${theme.text.secondary};
  background-color: ${theme.bg.default};
  background-image: ${props =>
    `linear-gradient(to bottom, ${props.theme.bg.default}, ${props.theme.bg.wash})`};
  
  &:hover {
    color: ${theme.text.default};
  }
  &:active {
    border: 1px solid ${theme.border.active};
    background-image: ${props =>
      `linear-gradient(to top, ${props.theme.bg.default}, ${props.theme.bg.wash})`};
  }
  &:focus {
    box-shadow: 0 0 0 1px ${props => props.theme.bg.default}, 0 0 0 3px ${
  theme.border.default
};
  }
`;

export const PrimaryButton = styled.button`
  ${base}
  border: 1px solid ${theme.brand.default};
  color: ${theme.bg.default};
  background-color: ${theme.brand.alt};
  background-image: ${props =>
    `linear-gradient(to bottom, ${props.theme.brand.alt}, ${props.theme.brand.default})`};
  text-shadow: 0 1px 1px rgba(0,0,0,0.08);
  &:hover {
    color: ${theme.text.reverse};
    background-image: ${props =>
      `linear-gradient(to bottom, ${tint(props.theme.brand.alt, 16)}, ${tint(
        props.theme.brand.default,
        16
      )})`};
    box-shadow: ${props => (props.disabled ? "none" : theme.shadows.button)};
  }
  &:active {
    border: 1px solid ${theme.brand.default};
    background-image: ${props =>
      `linear-gradient(to top, ${props.theme.brand.alt}, ${props.theme.brand.default})`};
  }
  &:focus {
    box-shadow: 0 0 0 1px ${props =>
      props.theme.bg.default}, 0 0 0 3px ${props =>
  hexa(props.theme.brand.alt, 0.16)};
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

export const FacebookButton = styled.button`
  ${base}
  border: 1px solid ${theme.social.facebook};
  color: ${theme.bg.default};
  background-color: ${theme.social.facebook};
  background-image: ${props =>
    `linear-gradient(to bottom, ${props.theme.social.facebook}, ${props.theme.social.facebook})`};
  text-shadow: 0 1px 1px rgba(0,0,0,0.08);
  .icon {
    margin-right: 8px;
    margin-left: -4px;
  }
  &:hover {
    color: ${theme.text.reverse};
    background-image: ${props =>
      `linear-gradient(to bottom, ${tint(
        props.theme.social.facebook,
        16
      )}, ${tint(props.theme.social.facebook, 16)})`};
    box-shadow: ${props => (props.disabled ? "none" : theme.shadows.button)};
  }
  &:active {
    border: 1px solid ${theme.social.facebook};
    background-image: ${props =>
      `linear-gradient(to top, ${props.theme.social.facebook}, ${props.theme.social.facebook})`};
  }
  &:focus {
    box-shadow: 0 0 0 1px ${props =>
      props.theme.bg.default}, 0 0 0 3px ${props =>
  hexa(props.theme.social.facebook, 0.16)};
  }
`;

export const TwitterButton = styled.button`
  ${base}
  border: 1px solid ${theme.social.twitter};
  color: ${theme.bg.default};
  background-color: ${theme.social.twitter};
  background-image: ${props =>
    `linear-gradient(to bottom, ${props.theme.social.twitter}, ${props.theme.social.twitter})`};
  text-shadow: 0 1px 1px rgba(0,0,0,0.08);
  .icon {
    margin-right: 8px;
    margin-left: -4px;
  }
  &:hover {
    color: ${theme.text.reverse};
    background-image: ${props =>
      `linear-gradient(to bottom, ${tint(
        props.theme.social.twitter,
        4
      )}, ${tint(props.theme.social.twitter, 4)})`};
    box-shadow: ${props => (props.disabled ? "none" : theme.shadows.button)};
  }
  &:active {
    border: 1px solid ${theme.social.twitter};
    background-image: ${props =>
      `linear-gradient(to top, ${props.theme.social.twitter}, ${props.theme.social.twitter})`};
  }
  &:focus {
    box-shadow: 0 0 0 1px ${props =>
      props.theme.bg.default}, 0 0 0 3px ${props =>
  hexa(props.theme.social.twitter, 0.16)};
  }
`;

export const CopyLinkButton = styled.button`
  ${base}
  border: 1px solid ${props =>
    props.isClicked
      ? tint(props.theme.success.default, -10)
      : props.theme.border.default};
  color: ${props =>
    props.isClicked ? props.theme.bg.default : props.theme.text.secondary};
  background-color: ${props =>
    props.isClicked ? props.theme.success.default : props.theme.bg.default};
  background-image: ${props =>
    `linear-gradient(to bottom, ${
      props.isClicked ? props.theme.success.default : props.theme.bg.default
    }, ${
      props.isClicked
        ? tint(props.theme.success.default, -4)
        : props.theme.bg.wash
    })`};
  transition: border 0.2s ease-in-out, background-color 0.2s ease-in-out, background-image 0.2s ease-in-out;
  &:hover {
    transition: border 0.2s ease-in-out, background-color 0.2s ease-in-out, background-image 0.2s ease-in-out;
    color: ${props =>
      props.isClicked ? props.theme.bg.default : props.theme.text.default};
  }
  &:active {
    border: 1px solid ${props =>
      props.isClicked
        ? tint(props.theme.success.default, -10)
        : props.theme.border.active};
    background-image: ${props =>
      `linear-gradient(to bottom, ${
        props.isClicked
          ? tint(props.theme.success.default, -4)
          : props.theme.bg.default
      }, ${
        props.isClicked ? props.theme.success.default : props.theme.bg.wash
      })`};
  }
  .icon {
    margin-right: 8px;
    margin-left: -4px;
  }
  &:focus {
    box-shadow: 0 0 0 1px ${props =>
      props.theme.bg.default}, 0 0 0 3px ${props =>
  props.isClicked
    ? hexa(props.theme.success.default, 0.16)
    : props.theme.border.default};
  }
`;
