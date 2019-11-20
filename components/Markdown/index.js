import * as React from "react";
import { Notes } from "./style";

export default function Markdown(props) {
  const { children } = props;
  return <Notes>{children}</Notes>;
}
