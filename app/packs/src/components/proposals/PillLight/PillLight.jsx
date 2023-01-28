import React from "react";
import { ButtonLabelLight } from "../ButtonLabelLight";
import "./style.css";

export const PillLight = ({ state, buttonLabelLightText = "Label" }) => {
  return (
    <div
      className={"pill-light-state-default"}
      style={{
        backgroundColor: state === "active" ? "#1c2126" : state === "disable" ? "#f2f3f5" : undefined,
        border: state === "default" || state === "hover" ? "1px solid" : undefined,
        borderColor: state === "default" ? "#dadde1" : state === "hover" ? "#1c2126" : undefined,
      }}
    >
      <ButtonLabelLight
        layout="label only"
        size="small"
        text={buttonLabelLightText}
        textStyle={
          state === "active"
            ? {
                color: "#fafafb",
              }
            : state === "disable"
            ? {
                color: "#aebbc5",
              }
            : undefined
        }
      />
    </div>
  );
};
