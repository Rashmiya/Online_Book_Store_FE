import React from "react";

const BackButtonIcon = ({ ...props }) => {
  return (
    <svg
      {...props}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 12L13.5 15L16.5 18"
        stroke="#939292"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 15C5 10.286 5 7.92893 6.46447 6.46447C7.92893 5 10.286 5 15 5C19.714 5 22.0711 5 23.5355 6.46447C25 7.92893 25 10.286 25 15C25 19.714 25 22.0711 23.5355 23.5355C22.0711 25 19.714 25 15 25C10.286 25 7.92893 25 6.46447 23.5355C5 22.0711 5 19.714 5 15Z"
        stroke="#939292"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default BackButtonIcon;
