import * as React from "react";
import { Artwork } from "./style";
import Image from "../Image";

export default function Bookcard(props) {
  const {
    book: { name, url, artworkUrl }
  } = props;
  const src = `${artworkUrl}.lo.jpeg`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Image alt={name} src={src} Component={Artwork} />
    </a>
  );
}
