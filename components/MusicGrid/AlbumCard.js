import * as React from "react";
import { Artwork } from "./style";
import Image from "../Image";

export default function AlbumCard(props) {
  const {
    album: { name, url, artworkUrl }
  } = props;
  const src = `${artworkUrl}.jpg`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Image alt={name} src={src} Component={Artwork} />
    </a>
  );
}
