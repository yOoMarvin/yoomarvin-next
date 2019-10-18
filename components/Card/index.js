import * as React from "react";
import { StyledCard } from "./style";

export default function Card(props) {
  const { style, children } = props;
  return <StyledCard style={style}>{children}</StyledCard>;
}
