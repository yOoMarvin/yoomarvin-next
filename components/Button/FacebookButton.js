import React from "react";
import * as Styled from "./style";
import Icon from "../Icon";

export default function FacebookButton(props) {
  const { children } = props;
  return (
    <Styled.FacebookButton {...props}>
      <Icon glyph="facebook" size={24} />
      {children}
    </Styled.FacebookButton>
  );
}
