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
`;

export const ButtonRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const Logo = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.text.default};
`;
