import React from "react";
import { TagLabelLight } from "../TagLabelLight";
import "./style.css";

export const TagLight = ({ size, layout, color, tagLabelLightText = "tag label" }) => {
  return (
    <div
      className={"tag-light-size-small-layout-stroke-color-neutral"}
      style={{
        backgroundColor:
          layout === "subtle" && color === "primary"
            ? "#ececff"
            : layout === "fill" && color === "primary"
            ? "#7857ed"
            : layout === "subtle" && color === "green"
            ? "#edf9f1"
            : layout === "fill" && color === "green"
            ? "#4ac776"
            : layout === "subtle" && color === "yellow"
            ? "#fff1d1"
            : layout === "fill" && color === "yellow"
            ? "#b38312"
            : layout === "subtle" && color === "red"
            ? "#fff3f3"
            : layout === "fill" && color === "red"
            ? "#ff2222"
            : undefined,
        border:
          layout === "stroke" ||
          (color === "neutral" && layout === "fill") ||
          (color === "neutral" && layout === "subtle")
            ? "1px solid"
            : undefined,
        borderColor:
          layout === "stroke" ||
          (color === "neutral" && layout === "fill") ||
          (color === "neutral" && layout === "subtle")
            ? "#dadde1"
            : undefined,
        padding:
          (color === "primary" && layout === "stroke") ||
          (color === "yellow" && layout === "stroke") ||
          (color === "neutral" && layout === "fill") ||
          (color === "neutral" && layout === "subtle") ||
          (color === "green" && layout === "stroke") ||
          (color === "red" && layout === "stroke") ||
          (color === "primary" && layout === "fill" && size === "small") ||
          (color === "primary" && layout === "subtle" && size === "small") ||
          (color === "yellow" && layout === "fill" && size === "small") ||
          (color === "yellow" && layout === "subtle" && size === "small") ||
          (color === "neutral" && layout === "stroke" && size === "small") ||
          (color === "green" && layout === "fill" && size === "small") ||
          (color === "green" && layout === "subtle" && size === "small") ||
          (color === "red" && layout === "fill" && size === "small") ||
          (color === "red" && layout === "subtle" && size === "small")
            ? "0px 8px"
            : (size === "medium" && layout === "stroke" && color === "neutral") ||
              (size === "medium" && layout === "subtle" && color === "primary") ||
              (size === "medium" && layout === "subtle" && color === "green") ||
              (size === "medium" && layout === "subtle" && color === "yellow") ||
              (size === "medium" && layout === "subtle" && color === "red") ||
              (size === "medium" && layout === "fill" && color === "primary") ||
              (size === "medium" && layout === "fill" && color === "green") ||
              (size === "medium" && layout === "fill" && color === "yellow") ||
              (size === "medium" && layout === "fill" && color === "red")
            ? "2px 8px"
            : undefined,
      }}
    >
      <TagLabelLight
        layout="label only"
        size={
          (color === "primary" && layout === "stroke") ||
          (color === "yellow" && layout === "stroke") ||
          (color === "neutral" && layout === "fill") ||
          (color === "neutral" && layout === "subtle") ||
          (color === "green" && layout === "stroke") ||
          (color === "red" && layout === "stroke") ||
          (color === "primary" && layout === "fill" && size === "small") ||
          (color === "primary" && layout === "subtle" && size === "small") ||
          (color === "yellow" && layout === "fill" && size === "small") ||
          (color === "yellow" && layout === "subtle" && size === "small") ||
          (color === "neutral" && layout === "stroke" && size === "small") ||
          (color === "green" && layout === "fill" && size === "small") ||
          (color === "green" && layout === "subtle" && size === "small") ||
          (color === "red" && layout === "fill" && size === "small") ||
          (color === "red" && layout === "subtle" && size === "small")
            ? "small"
            : (size === "medium" && layout === "stroke" && color === "neutral") ||
              (size === "medium" && layout === "subtle" && color === "primary") ||
              (size === "medium" && layout === "subtle" && color === "green") ||
              (size === "medium" && layout === "subtle" && color === "yellow") ||
              (size === "medium" && layout === "subtle" && color === "red") ||
              (size === "medium" && layout === "fill" && color === "primary") ||
              (size === "medium" && layout === "fill" && color === "green") ||
              (size === "medium" && layout === "fill" && color === "yellow") ||
              (size === "medium" && layout === "fill" && color === "red")
            ? "medium"
            : undefined
        }
        tagLabelStyle={
          layout === "subtle" && color === "primary"
            ? {
                color: "#6244cc",
              }
            : layout === "fill" && (color === "primary" || color === "green" || color === "yellow" || color === "red")
            ? {
                color: "#fafafb",
              }
            : layout === "subtle" && color === "green"
            ? {
                color: "#3b9f5e",
              }
            : layout === "subtle" && color === "yellow"
            ? {
                color: "#b38312",
              }
            : layout === "subtle" && color === "red"
            ? {
                color: "#ff2222",
              }
            : undefined
        }
        text={tagLabelLightText}
      />
    </div>
  );
};
