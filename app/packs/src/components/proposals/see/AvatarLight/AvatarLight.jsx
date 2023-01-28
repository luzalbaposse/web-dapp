import React from "react";
import { AvatarPlaceholderLight } from "../AvatarPlaceholderLight";
import "./style.css";

export const AvatarLight = ({
  size,
  token,
  state,
  avatarPlaceholderLightPhotoTrueSizeXsColorDefaultStyle,
  text = "John Doe",
}) => {
  return (
    <div className={"avatar-light-size-sm-token-false-state-default"}>
      <AvatarPlaceholderLight
        color="default"
        photo
        size={size === "sm" ? "xs" : size === "md" ? "sm" : undefined}
        style={
          size === "sm"
            ? {
                minWidth: "24px",
                width: "unset",
              }
            : size === "md"
            ? avatarPlaceholderLightPhotoTrueSizeXsColorDefaultStyle
            : undefined
        }
      />
      <div
        className={"avatar-light-text"}
        style={{
          alignItems: token ? "flex-start" : undefined,
          color:
            !token && (state === "Default" || state === "hover")
              ? "#1c2126"
              : !token && state === "disable"
              ? "#aebbc5"
              : undefined,
          display: token ? "flex" : undefined,
          fontFamily: !token ? "'Acid Grotesk TP-Medium', Helvetica" : undefined,
          fontSize: !token ? "14px" : undefined,
          fontWeight: !token ? "500" : undefined,
          gap: token ? "4px" : undefined,
          letterSpacing: !token ? "0" : undefined,
          lineHeight: !token ? "24px" : undefined,
          marginTop: size === "sm" && !token ? "-1.00px" : undefined,
          textDecoration: !token && state === "hover" ? "underline" : undefined,
          whiteSpace: !token ? "nowrap" : undefined,
        }}
      >
        <React.Fragment>
          {!token && <React.Fragment>{text}</React.Fragment>}

          {token && (
            <React.Fragment>
              <div
                className={"avatar-light-text-1-970"}
                style={{
                  color:
                    state === "Default" || state === "hover" ? "#1c2126" : state === "disable" ? "#aebbc5" : undefined,
                  textDecoration: state === "hover" ? "underline" : undefined,
                }}
              >
                {text}
              </div>
              <div
                className={"avatar-light-text-1-971"}
                style={{
                  color:
                    state === "Default" || state === "hover" ? "#536471" : state === "disable" ? "#aebbc5" : undefined,
                }}
              >
                $DOE
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </div>
    </div>
  );
};
