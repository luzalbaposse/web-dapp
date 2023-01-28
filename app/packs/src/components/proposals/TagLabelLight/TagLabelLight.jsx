import React from "react";
import "./style.css";

export const TagLabelLight = ({ size, layout, tagLabelStyle, text = "tag label" }) => {
  return (
    <div
      className={"tag-label-light-size-small-layout-label-only"}
      style={{
        alignItems:
          layout === "label only"
            ? "flex-start"
            : layout === "icon leading" || layout === "icon trailing" || layout === "icon leading + icon trailing"
            ? "center"
            : undefined,
        justifyContent:
          layout === "icon leading" || layout === "icon trailing" || layout === "icon leading + icon trailing"
            ? "center"
            : undefined,
      }}
    >
      <React.Fragment>
        {layout === "label only" && (
          <React.Fragment>
            <div
              className={"tag-label-light-tag-label"}
              style={{
                ...{
                  color: size === "small" || size === "medium" ? "#37434b" : size === "input" ? "#1c2126" : undefined,
                  fontFamily:
                    size === "small" || size === "medium"
                      ? "'Acid Grotesk TP-Medium', Helvetica"
                      : size === "input"
                      ? "'Acid Grotesk TP-Normal', Helvetica"
                      : undefined,
                  fontSize: size === "small" ? "12px" : size === "input" || size === "medium" ? "14px" : undefined,
                  fontWeight: size === "small" || size === "medium" ? "500" : size === "input" ? "400" : undefined,
                },
                ...tagLabelStyle,
              }}
            >
              {text}
            </div>
          </React.Fragment>
        )}

        {layout === "icon leading" && (
          <React.Fragment>
            <div
              className={"tag-label-light-add"}
              style={{
                backgroundImage:
                  "url(https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/union-6@2x.png)",
              }}
            />
            <div
              className={"tag-label-light-tag-label"}
              style={{
                color: size === "small" || size === "medium" ? "#37434b" : size === "input" ? "#1c2126" : undefined,
                fontFamily:
                  size === "small" || size === "medium"
                    ? "'Acid Grotesk TP-Medium', Helvetica"
                    : size === "input"
                    ? "'Acid Grotesk TP-Normal', Helvetica"
                    : undefined,
                fontSize: size === "small" ? "12px" : size === "input" || size === "medium" ? "14px" : undefined,
                fontWeight: size === "small" || size === "medium" ? "500" : size === "input" ? "400" : undefined,
              }}
            >
              {text}
            </div>
          </React.Fragment>
        )}

        {layout === "icon trailing" && (
          <React.Fragment>
            <div
              className={"tag-label-light-tag-label"}
              style={{
                color: size === "small" || size === "medium" ? "#37434b" : size === "input" ? "#1c2126" : undefined,
                fontFamily:
                  size === "small" || size === "medium"
                    ? "'Acid Grotesk TP-Medium', Helvetica"
                    : size === "input"
                    ? "'Acid Grotesk TP-Normal', Helvetica"
                    : undefined,
                fontSize: size === "small" ? "12px" : size === "input" || size === "medium" ? "14px" : undefined,
                fontWeight: size === "small" || size === "medium" ? "500" : size === "input" ? "400" : undefined,
              }}
            >
              {text}
            </div>
            <img
              className={"tag-label-light-img"}
              src={
                "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/add-6@2x.png"
              }
            />
          </React.Fragment>
        )}

        {layout === "icon leading + icon trailing" && (
          <React.Fragment>
            <div
              className={"tag-label-light-add"}
              style={{
                backgroundImage:
                  "url(https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/union-6@2x.png)",
              }}
            />
            <div
              className={"tag-label-light-tag-label"}
              style={{
                color: size === "small" || size === "medium" ? "#37434b" : size === "input" ? "#1c2126" : undefined,
                fontFamily:
                  size === "small" || size === "medium"
                    ? "'Acid Grotesk TP-Medium', Helvetica"
                    : size === "input"
                    ? "'Acid Grotesk TP-Normal', Helvetica"
                    : undefined,
                fontSize: size === "small" ? "12px" : size === "input" || size === "medium" ? "14px" : undefined,
                fontWeight: size === "small" || size === "medium" ? "500" : size === "input" ? "400" : undefined,
              }}
            >
              {text}
            </div>
            <img
              className={"tag-label-light-img"}
              src={
                "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/add-6@2x.png"
              }
            />
          </React.Fragment>
        )}
      </React.Fragment>
    </div>
  );
};
