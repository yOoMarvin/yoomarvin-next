import styled from "styled-components";
import { theme } from "../theme";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;

  @media (max-width: 968px) {
    padding: 8px 16px;
    background-color: ${theme.bg.wash};
  }
`;

export const ButtonRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 968px) {
  }
`;

export const Logo = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.text.default};
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;

  a {
    color: ${theme.text.tertiary};
    display: flex;
    align-items: center;
  }

  a:hover {
    color: ${theme.text.default};
  }

  .icon {
    margin-right: 16px;
  }
`;
