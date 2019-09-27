// @flow
import * as React from "react";
import styled from "styled-components";

export const InlineSvg = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  color: inherit;
  fill: currentColor;
`;

export const SvgWrapper = styled.div`
  display: inline-block;
  flex: 0 0 ${props => (props.size ? `${props.size}px` : "32px")};
  width: ${props => (props.size ? `${props.size}px` : "32px")};
  height: ${props => (props.size ? `${props.size}px` : "32px")};
  min-width: ${props => (props.size ? `${props.size}px` : "32px")};
  min-height: ${props => (props.size ? `${props.size}px` : "32px")};
  position: relative;
  color: inherit;
`;

export const Glyph = ({ glyph }) => {
  switch (glyph) {
    case "facebook":
      return (
        <g>
          <path d="M19.491,27.944c7.731,-0.319 8.509,-2.242 8.509,-11.944c0,-11 -1,-12 -12,-12c-11,0 -12,1 -12,12c0,10.985 0.997,11.997 11.956,12l0,-7.667l-2.956,0l0,-3.377l2.956,0l0,-2.491c0,-2.891 1.789,-4.465 4.403,-4.465c1.251,0 2.327,0.092 2.641,0.133l0,3.021l-1.813,0.001c-1.421,0 -1.696,0.666 -1.696,1.644l0,2.157l3.39,0l-0.442,3.377l-2.948,0l0,7.611Z" />
        </g>
      );
    case "link":
      return (
        <g>
          <path d="M16.693,16.664c0.376,-0.375 1.001,-0.413 1.377,-0.038l0.083,0.084c0.358,0.357 0.386,0.93 0.032,1.291c-0.026,0.026 -0.051,0.052 -0.077,0.078c-0.867,0.866 -1.671,1.438 -2.514,1.655c0,0 -0.001,0 -0.001,0c-0.078,0.02 -0.157,0.037 -0.236,0.051c0,0 0,0 0,0c-0.802,0.142 -1.646,-0.036 -2.616,-0.582l0,0c-0.907,-0.511 -1.923,-1.343 -3.119,-2.539c-3.959,-3.959 -3.939,-5.959 -1.414,-8.485c2.526,-2.525 4.526,-2.545 8.485,1.414c0.439,0.439 0.828,0.853 1.171,1.247c0.102,0.117 -0.009,0.3 -0.162,0.28c0,0 0,0 -0.001,0c-0.559,-0.074 -1.083,-0.035 -1.58,0.094c-0.299,0.078 -0.624,0.012 -0.842,-0.206c-1.958,-1.958 -3.035,-2.492 -3.63,-2.571c-0.366,-0.049 -0.902,0.032 -2.027,1.156c-1.124,1.125 -1.205,1.661 -1.156,2.027c0.079,0.595 0.613,1.672 2.571,3.63c0.432,0.433 0.822,0.796 1.173,1.1c0,0 0,0 0,0c0.046,0.04 0.091,0.079 0.136,0.117c0,0 0,0 0,0c0.841,0.712 1.45,1.073 1.891,1.24c0,0 0,0 0,0c0.166,0.062 0.308,0.098 0.429,0.114c0,0 0,0 0,0c0.367,0.049 0.903,-0.032 2.027,-1.157Zm3.07,-1.099c-0.912,-0.79 -1.563,-1.181 -2.027,-1.357c0,0 0,0 0,0c-0.166,-0.063 -0.308,-0.098 -0.43,-0.114c0,0 0,0 0,0c-0.367,-0.049 -0.902,0.032 -2.027,1.156c-0.375,0.376 -1.001,0.414 -1.376,0.038l-0.083,-0.083c-0.358,-0.358 -0.387,-0.931 -0.032,-1.291c0.025,-0.026 0.051,-0.052 0.077,-0.078c0.866,-0.866 1.671,-1.438 2.514,-1.655l0,0c0.873,-0.225 1.786,-0.07 2.853,0.531c0,0 0,0 0,0c0.906,0.51 1.923,1.343 3.118,2.538c3.96,3.96 3.94,5.96 1.414,8.486c-2.525,2.525 -4.525,2.545 -8.485,-1.415c-0.438,-0.438 -0.828,-0.852 -1.171,-1.246c-0.102,-0.117 0.009,-0.301 0.163,-0.28c0.559,0.074 1.083,0.035 1.581,-0.094c0.299,-0.078 0.623,-0.012 0.841,0.206c1.958,1.958 3.035,2.492 3.63,2.571c0.367,0.049 0.903,-0.032 2.027,-1.157c1.125,-1.124 1.206,-1.66 1.157,-2.027c-0.079,-0.595 -0.613,-1.672 -2.571,-3.63c-0.433,-0.432 -0.822,-0.795 -1.173,-1.099Z" />
        </g>
      );
    case "share":
      return (
        <g fillRule="nonzero">
          <path d="M16.707,5.294c-0.39,-0.39 -1.024,-0.39 -1.414,0l-3,3c-0.391,0.391 -0.391,1.024 0,1.415c0.39,0.39 1.024,0.39 1.414,0l1.293,-1.293l0,9.585c0,0.553 0.448,1 1,1c0.552,0 1,-0.447 1,-1l0,-9.585l1.293,1.293c0.39,0.39 1.024,0.39 1.414,0c0.391,-0.391 0.391,-1.024 0,-1.415l-3,-3Zm-5.817,7.023c0.588,-0.114 1.11,0.36 1.11,0.959l0,0.426c0,0.265 -0.198,0.487 -0.459,0.531l-0.002,0c-1.042,0.17 -1.486,0.416 -1.706,0.612c-0.191,0.171 -0.42,0.489 -0.588,1.31l-0.007,0.03c-0.191,0.926 -0.238,2.106 -0.238,3.815l0,0.003c0,1.709 0.047,2.889 0.238,3.814l0.007,0.031c0.168,0.821 0.397,1.139 0.588,1.309c0.219,0.197 0.662,0.442 1.699,0.612l0.017,0.002c1.094,0.182 2.493,0.231 4.45,0.23l0.002,0c1.957,0.001 3.356,-0.048 4.45,-0.23l0.017,-0.002c1.037,-0.17 1.48,-0.415 1.699,-0.611c0.191,-0.171 0.42,-0.489 0.588,-1.31l0.007,-0.031c0.191,-0.925 0.238,-2.105 0.238,-3.814l0,-0.003c0,-1.709 -0.047,-2.889 -0.238,-3.815l-0.007,-0.03c-0.168,-0.821 -0.397,-1.139 -0.588,-1.31c-0.22,-0.196 -0.664,-0.442 -1.706,-0.612l-0.002,0c-0.262,-0.044 -0.459,-0.266 -0.459,-0.531l0,-0.426c0,-0.599 0.522,-1.073 1.11,-0.959c3.362,0.655 3.89,2.553 3.89,7.684c0,7.059 -1,8 -9,8c-8,0 -9,-0.941 -9,-8c0,-5.131 0.528,-7.029 3.89,-7.684Z" />
        </g>
      );
    case "twitter":
      return (
        <g>
          <path d="M16,28c11,0 12,-1 12,-12c0,-11 -1,-12 -12,-12c-11,0 -12,1 -12,12c0,11 1,12 12,12Zm5.825,-13.901c0,3.669 -2.889,7.901 -8.172,7.901l0,0c-1.622,0 -3.132,-0.46 -4.403,-1.248c0.225,0.026 0.454,0.039 0.685,0.039c1.346,0 2.585,-0.444 3.568,-1.189c-1.258,-0.022 -2.318,-0.825 -2.684,-1.928c0.175,0.032 0.355,0.05 0.54,0.05c0.262,0 0.516,-0.034 0.758,-0.098c-1.315,-0.255 -2.305,-1.377 -2.305,-2.722c0,-0.013 0,-0.024 0.001,-0.036c0.387,0.208 0.829,0.333 1.301,0.348c-0.772,-0.498 -1.279,-1.348 -1.279,-2.312c0,-0.509 0.143,-0.985 0.389,-1.396c1.417,1.681 3.534,2.786 5.921,2.902c-0.049,-0.204 -0.074,-0.416 -0.074,-0.633c0,-1.533 1.286,-2.777 2.872,-2.777c0.826,0 1.573,0.338 2.097,0.877c0.654,-0.124 1.269,-0.356 1.824,-0.674c-0.215,0.649 -0.67,1.192 -1.263,1.536c0.581,-0.067 1.134,-0.216 1.649,-0.437c-0.384,0.557 -0.872,1.046 -1.433,1.438c0.006,0.119 0.008,0.239 0.008,0.359Z" />
        </g>
      );
    case "view-forward":
      return (
        <g>
          <path d="M12.982,23.89c-0.354,-0.424 -0.296,-1.055 0.128,-1.408c1.645,-1.377 5.465,-4.762 6.774,-6.482c-1.331,-1.749 -5.1,-5.085 -6.774,-6.482c-0.424,-0.353 -0.482,-0.984 -0.128,-1.408c0.353,-0.425 0.984,-0.482 1.409,-0.128c1.839,1.532 5.799,4.993 7.2,6.964c0.219,0.312 0.409,0.664 0.409,1.054c0,0.39 -0.19,0.742 -0.409,1.053c-1.373,1.932 -5.399,5.462 -7.2,6.964l-0.001,0.001c-0.424,0.354 -1.055,0.296 -1.408,-0.128Z" />
        </g>
      );
    case "github":
      return (
        <g>
          <path d="M18.837,27.966c8.342,-0.241 9.163,-1.997 9.163,-11.966c0,-11 -1,-12 -12,-12c-11,0 -12,1 -12,12c0,9.995 0.826,11.734 9.228,11.968c0.073,-0.091 0.1,-0.205 0.1,-0.321c0,-0.25 -0.01,-2.816 -0.015,-3.699c-3.037,0.639 -3.678,-1.419 -3.678,-1.419c-0.497,-1.222 -1.213,-1.548 -1.213,-1.548c-0.991,-0.656 0.075,-0.643 0.075,-0.643c1.096,0.075 1.673,1.091 1.673,1.091c0.974,1.617 2.556,1.15 3.178,0.879c0.099,-0.683 0.381,-1.15 0.693,-1.414c-2.425,-0.267 -4.974,-1.175 -4.974,-5.23c0,-1.155 0.426,-2.099 1.124,-2.839c-0.113,-0.268 -0.487,-1.344 0.107,-2.8c0,0 0.917,-0.285 3.003,1.084c0.871,-0.235 1.805,-0.352 2.734,-0.356c0.927,0.004 1.861,0.121 2.734,0.356c2.085,-1.369 3,-1.084 3,-1.084c0.596,1.456 0.221,2.532 0.108,2.8c0.7,0.74 1.123,1.684 1.123,2.839c0,4.065 -2.553,4.96 -4.986,5.221c0.392,0.327 0.741,0.973 0.741,1.96c0,0.946 -0.006,2.619 -0.01,3.728c-0.002,0.549 -0.003,0.959 -0.003,1.074c0,0.109 0.029,0.224 0.095,0.319Z" />
        </g>
      );
    case "pause":
      return (
        <g>
          <rect width="5" height="26" rx="2" />
          <rect x="11" width="5" height="26" rx="2" />
        </g>
      );
    case "play":
      return (
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 3C1 1.35191 2.88153 0.411146 4.2 1.4L18.8667 12.4C19.9333 13.2 19.9333 14.8 18.8667 15.6L4.2 26.6C2.88153 27.5889 1 26.6481 1 25V3Z"
          />
        </g>
      );
    default:
      return null;
  }
};

export default function Icon(props) {
  const { size = 32, glyph } = props;

  return (
    <SvgWrapper size={size} className="icon">
      <InlineSvg
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="1.414"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={glyph}
        viewBox="0 0 32 32"
        preserveAspectRatio="xMidYMid meet"
        fit
      >
        <title>{glyph}</title>
        <Glyph glyph={glyph} />
      </InlineSvg>
    </SvgWrapper>
  );
}
