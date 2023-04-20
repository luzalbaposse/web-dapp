import React from "react";
import { string, number } from "prop-types";

const Celo = ({ className, style, width }) => (
  <svg
    className={className}
    viewBox={"0 0 25 24"}
    width={`${width}px`}
    height={`${width}px`}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={style}
  >
    <circle cx="12.8418" cy="12" r="12" fill="#FCFF52" />
    <g clipPath="url(#clip0_9270_14334)">
      <path
        d="M19.8053 5H5.8418V18.9635H19.8053V14.0891H17.4866C16.6882 15.8682 14.8908 17.1042 12.8345 17.1042C9.99805 17.1042 7.70117 14.7854 7.70117 11.9708C7.69753 9.15625 9.99805 6.85938 12.8345 6.85938C14.9309 6.85938 16.7283 8.13542 17.5267 9.95469H19.8053V5Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_9270_14334">
        <rect width="14" height="13.9635" fill="white" transform="translate(5.8418 5)" />
      </clipPath>
    </defs>
  </svg>
);

Celo.defaultProps = {
  className: "",
  pathClassName: "",
  width: 16
};

Celo.propTypes = {
  className: string,
  pathClassName: string,
  width: number
};

export default Celo;
