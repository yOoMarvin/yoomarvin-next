import React from "react";
import * as Styled from "./style";
import { ButtonProps } from "./types";

export default function PrimaryButton() {
  const { children } = props;
  return <Styled.PrimaryButton {...props}>{children}</Styled.PrimaryButton>;
}
