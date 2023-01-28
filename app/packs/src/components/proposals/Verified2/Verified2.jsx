import React from "react";
import "./style.css";

export const Verified2 = ({ style }) => {
  return (
    <div
      className={"verified-2-verified"}
      style={{
        ...{
          backgroundImage:
            "url(https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/subtract-8@2x.png)",
        },
        ...style,
      }}
    />
  );
};
