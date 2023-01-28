import React from "react";
import "./style.css";

export const SwitchLight = ({ layout, stat, style }) => {
  return (
    <div
      className={"switch-light-layout-on-stat-enable"}
      style={{
        ...{
          backgroundColor:
            layout === "on" && stat === "enable"
              ? "#7857ed"
              : stat === "disable"
              ? "#f2f3f5"
              : layout === "off" && stat === "enable"
              ? "#aebbc5"
              : undefined,
          borderRadius: layout === "on" ? "48px" : layout === "off" ? "72px" : undefined,
        },
        ...style,
      }}
    >
      <div
        className={"switch-light-ellipse"}
        style={{
          backgroundColor: stat === "enable" ? "#ffffff" : stat === "disable" ? "#aebbc5" : undefined,
          left: layout === "on" ? "22px" : layout === "off" ? "2px" : undefined,
        }}
      />
    </div>
  );
};
