import React from "react";
import "./style.css";

export const ButtonLabelLight = ({ size, layout, text = "Button", textStyle }) => {
  return (
    <div className={"button-label-light-size-small-layout-icon-leading"}>
      <React.Fragment>
        {layout === "icon leading" && (
          <React.Fragment>
            <img
              className={"button-label-light-img"}
              src={
                "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d25e1407823b44e634487b/img/heart@2x.png"
              }
            />
            <div
              className={"button-label-light-text"}
              style={{
                fontSize: size === "small" ? "14px" : size === "medium" ? "16px" : undefined,
              }}
            >
              {text}
            </div>
          </React.Fragment>
        )}

        {layout === "label only" && (
          <React.Fragment>
            <div
              className={"button-label-light-text"}
              style={{
                ...{
                  fontSize: size === "small" ? "14px" : size === "medium" ? "16px" : undefined,
                },
                ...textStyle,
              }}
            >
              {text}
            </div>
          </React.Fragment>
        )}

        {layout === "icon trailing" && (
          <React.Fragment>
            <div
              className={"button-label-light-text"}
              style={{
                fontSize: size === "small" ? "14px" : size === "medium" ? "16px" : undefined,
              }}
            >
              {text}
            </div>
            <img
              className={"button-label-light-img"}
              src={
                "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d25e1407823b44e634487b/img/carret@2x.png"
              }
            />
          </React.Fragment>
        )}

        {layout === "icon leading+trailing" && (
          <React.Fragment>
            <img
              className={"button-label-light-img"}
              src={
                "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d25e1407823b44e634487b/img/heart@2x.png"
              }
            />
            <div
              className={"button-label-light-text"}
              style={{
                fontSize: size === "small" ? "14px" : size === "medium" ? "16px" : undefined,
              }}
            >
              {text}
            </div>
            <img
              className={"button-label-light-img"}
              src={
                "https://anima-uploads.s3.amazonaws.com/projects/63d17b550d6f95510a75a056/releases/63d25e1407823b44e634487b/img/carret@2x.png"
              }
            />
          </React.Fragment>
        )}
      </React.Fragment>
    </div>
  );
};
