import * as React from "react";
import { Img } from "./style";

export default function AtvImage(props) {
  const { src, Component, alt } = props;

  return (
    <div>
      {Component ? (
        <Component
          className="atvImg-layer"
          data-img={src}
          src={src}
          alt={alt}
        />
      ) : (
        <Img className="atvImg-layer" data-img={src} src={src} alt={alt} />
      )}
    </div>
  );
}
