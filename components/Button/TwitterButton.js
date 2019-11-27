import React from "react";
import * as Styled from "./style";
import Icon from "../Icon";

export default function TwitterButton(props) {
  const { children } = props;
  return (
    <Styled.TwitterButton {...props}>
      <Icon glyph="twitter" size={24} />
      {children}
    </Styled.TwitterButton>
  );
}
